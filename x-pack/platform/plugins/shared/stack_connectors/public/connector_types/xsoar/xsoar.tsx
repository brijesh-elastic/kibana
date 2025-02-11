/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { i18n } from '@kbn/i18n';
import { GenericValidationResult } from '@kbn/triggers-actions-ui-plugin/public/types';
import { XSOARConnector } from './types';
import { XSOAR_CONNECTOR_ID, SUB_ACTION, XSOAR_TITLE } from '../../../common/xsoar/constants';
import {
  ExecutorParams,
  XSOARRunActionParams,
  XSOARPlaybooksActionParams,
} from '../../../common/xsoar/types';

export function getConnectorType(): XSOARConnector {
  return {
    id: XSOAR_CONNECTOR_ID,
    iconClass: lazy(() => import('./logo')),
    selectMessage: i18n.translate('xpack.stackConnectors.components.xsoar.descriptionText', {
      defaultMessage: 'Create incidents in xSOAR',
    }),
    actionTypeTitle: XSOAR_TITLE,
    validateParams: async (
      actionParams: ExecutorParams
    ): Promise<GenericValidationResult<unknown>> => {

      const errors = {
        body: [],
        subAction: [],
      };
      return { errors };
    },
    actionConnectorFields: lazy(() => import('./connector')),
    actionParamsFields: lazy(() => import('./params')),
  };
}
