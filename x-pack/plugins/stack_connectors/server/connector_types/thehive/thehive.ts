/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ServiceParams, CaseConnector } from '@kbn/actions-plugin/server';
import { schema } from '@kbn/config-schema';
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
  TheHiveFailureResponse,
} from '../../../common/thehive/types';

export const API_VERSION = 'v1';

export class TheHiveConnector extends CaseConnector<TheHiveConfig, TheHiveSecrets> {
  private url;
  private api_token;
  private organisation;

  constructor(params: ServiceParams<TheHiveConfig, TheHiveSecrets>) {
    super(params);

    this.registerSubAction({
      name: SUB_ACTION.CREATE_ALERT,
      method: 'createAlert',
      schema: ExecutorSubActionCreateAlertParamsSchema,
    });

    this.url = this.config.url;
    this.organisation = this.config.organisation;
    this.api_token = this.secrets.api_token;
  }

  protected getResponseErrorMessage(error: AxiosError<TheHiveFailureResponse>): string {
    if (!error.response?.status) {
      return 'Unknown API Error';
    }
    return `API Error: ${error.response?.data?.type} - ${error.response?.data?.message}`;
  }

  public async createIncident(incident: ExecutorSubActionPushParams["incident"]): Promise<ExternalServiceIncidentResponse> {
    const res = await this.request({
      method: 'post',
      url: `${this.url}/api/${API_VERSION}/case`,
      data: incident,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organisation': this.organisation },
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
      url: `${this.url}/api/${API_VERSION}/case/${incidentId}/comment`,
      data: { message: comment },
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organisation': this.organisation },
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
      url: `${this.url}/api/${API_VERSION}/case/${incidentId}`,
      data: incident,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organisation': this.organisation },
      responseSchema: schema.any(),
    });

    return {
      id: incidentId,
      title: incident.title,
      url: `${res.config.baseURL}/cases/${incidentId}`,
      pushedDate: new Date().toISOString(),
    };
  }

  public async getIncident({ id }: { id: string }): Promise<ExternalServiceIncidentResponse> {
    const res = await this.request({
      url: `${this.url}/api/${API_VERSION}/case/${id}`,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organisation': this.organisation },
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
    await this.request({
      method: 'post',
      url: `${this.url}/api/${API_VERSION}/alert`,
      data: alert,
      headers: { Authorization: `Bearer ${this.api_token}`, 'X-Organisation': this.organisation },
      responseSchema: TheHiveCreateAlertResponseSchema,
    });
  }

}