/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  SubActionConnectorType,
  ValidatorType,
} from '@kbn/actions-plugin/server/sub_action_framework/types';
import { SecurityConnectorFeatureId } from '@kbn/actions-plugin/common';
import { urlAllowListValidator } from '@kbn/actions-plugin/server';
import { XSOAR_CONNECTOR_ID, XSOAR_TITLE } from '../../../common/xsoar/constants';
import { ConfigSchema, SecretsSchema } from '../../../common/xsoar/schema';
import { Config, Secrets } from '../../../common/xsoar/types';
import { XSOARConnector } from './xsoar';

export type XSOARConnectorType = SubActionConnectorType<Config, Secrets>;

export function getConnectorType(): XSOARConnectorType{
  return {
    id: XSOAR_CONNECTOR_ID,
    minimumLicenseRequired: 'gold',
    name: XSOAR_TITLE,
    getService: (params) => new XSOARConnector(params),
    supportedFeatureIds: [SecurityConnectorFeatureId],
    schema: {
      config: ConfigSchema,
      secrets: SecretsSchema,
    },
    validators: [{ type: ValidatorType.CONFIG, validator: urlAllowListValidator('url') }],
  };
}
