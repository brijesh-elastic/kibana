/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ServiceParams, CaseConnector } from '@kbn/actions-plugin/server';
import type { AxiosError } from 'axios';
import { SUB_ACTION } from '../../../common/thehive/constants';
import {
  TheHiveIncidentResponseSchema,
  TheHiveAddCommentResponseSchema,
  TheHiveCreateAlertResponseSchema,
  ExecutorSubActionCreateAlertParamsSchema,
} from '../../../common/thehive/schema';
import type {
  TheHiveConfig,
  TheHiveSecrets,
  ExecutorSubActionPushParams,
  ExternalServiceIncidentResponse,
  ExecutorSubActionCreateAlertParams,
} from '../../../common/thehive/types';
import { schema } from '@kbn/config-schema';

export class TheHiveConnector extends CaseConnector<TheHiveConfig, TheHiveSecrets> {
  private url;
  private api_token;
  private organization;

  constructor(params: ServiceParams<TheHiveConfig, TheHiveSecrets>) {
    super(params);

    this.registerSubAction({
      name: SUB_ACTION.CREATE_ALERT,
      method: 'createAlert',
      schema: ExecutorSubActionCreateAlertParamsSchema,
    });

    this.url = this.config.url;
    this.organization = this.config.organization;
    this.api_token = this.secrets.api_token;
  }

  protected getResponseErrorMessage(error: AxiosError): string {
    if (!error.response?.status) {
      return 'Unknown API Error';
    }
    if (error.response.status === 401) {
      return 'Unauthorized API Error';
    }
    return `API Error: ${error.response?.status} - ${error.response?.statusText}`;
  }

  public async createIncident(incident: ExecutorSubActionPushParams["incident"]): Promise<ExternalServiceIncidentResponse> {
    console.log(incident);
    // incident.tlp = Number(incident.tlp);
    const res = await this.request({
      method: 'post',
      url: `${this.url}/api/v1/case`,
      data: incident,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organization': this.organization },
      responseSchema: TheHiveIncidentResponseSchema,
    });

    return {
      id: res.data._id,
      title: res.data.title,
      url: `${res.config.baseURL}/cases/${res.data._id}`,
      pushedDate: res.data._createdAt.toString(),
    };
  }

  public async addComment({
    incidentId,
    comment,
  }: {
    incidentId: string;
    comment: string;
  }): Promise<ExternalServiceIncidentResponse> {
    const res = await this.request({
      method: 'post',
      url: `${this.url}/api/v1/case/${incidentId}/comment`,
      data: { message: comment },
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organization': this.organization },
      responseSchema: TheHiveAddCommentResponseSchema,
    });

    return {
      id: res.data._id,
      title: res.data.message,
      url: `${res.config.baseURL}/cases/${res.data._id}`,
      pushedDate: res.data.createdAt.toString(),
    };
  }

  public async updateIncident({
    incidentId,
    incident,
  }: {
    incidentId: string;
    incident: ExecutorSubActionPushParams["incident"];
  }): Promise<ExternalServiceIncidentResponse> {
    const res = await this.request({
      method: 'patch',
      url: `${this.url}/api/v1/case/${incidentId}`,
      data: incident,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organization': this.organization },
      responseSchema: schema.any(),
    });

    return {
      id: incidentId,
      title: '',
      url: `${res.config.baseURL}/cases/${incidentId}`,
      pushedDate: '2022-05-06T09:41:00.401Z',
    };
  }

  public async getIncident({ id }: { id: string }): Promise<ExternalServiceIncidentResponse> {
    const res = await this.request({
      url: `${this.url}/api/v1/case/${id}`,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organization': this.organization },
      responseSchema: TheHiveIncidentResponseSchema,
    });

    return {
      id: res.data._id,
      title: res.data.title,
      url: `${res.config.baseURL}/cases/${res.data._id}`,
      pushedDate: res.data._createdAt.toString(),
    };
  }

  public async createAlert(alert: ExecutorSubActionCreateAlertParams) {

    // console.log(alert);
    // console.log(this.organization);
    await this.request({
      method: 'post',
      url: `${this.url}/api/v1/alert`,
      data: alert,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organization': this.organization },
      responseSchema: TheHiveCreateAlertResponseSchema,
    });
  }

}