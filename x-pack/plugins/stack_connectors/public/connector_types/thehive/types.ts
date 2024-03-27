/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ActionTypeModel as ConnectorTypeModel } from '@kbn/triggers-actions-ui-plugin/public';
import { SUB_ACTION } from '../../../common/thehive/constants';
import {
  TheHiveConfig,
  ExecutorSubActionPushParams,
  ExecutorSubActionCreateAlertParams,
  TheHiveSecrets,
  ExecutorParams,
} from '../../../common/thehive/types';

// export interface TheHiveActionParams {
//   subAction: SUB_ACTION.PUSH_TO_SERVICE | SUB_ACTION.CREATE_ALERT;
//   subActionParams: ExecutorSubActionPushParams | ExecutorSubActionCreateAlertParams;
// }

export type TheHiveConnector = ConnectorTypeModel<
  TheHiveConfig,
  TheHiveSecrets,
  ExecutorParams
>;
