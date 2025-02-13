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
} from '../../../common/xsoar/types';

interface ValidationErrors {
  subAction: string[];
  body: string[];
}

export function getConnectorType(): XSOARConnector {
  return {
    id: XSOAR_CONNECTOR_ID,
    iconClass: lazy(() => import('./logo')),
    selectMessage: i18n.translate('xpack.stackConnectors.components.xsoar.descriptionText', {
      defaultMessage: 'Create incidents in XSOAR',
    }),
    actionTypeTitle: XSOAR_TITLE,
    validateParams: async (
      actionParams: ExecutorParams
    ): Promise<GenericValidationResult<ValidationErrors>> => {
      const translations = await import('./translations');
      const errors: ValidationErrors = {
        subAction: [],
        body: [],
      };
      const { subAction, subActionParams } = actionParams;

      if (subAction === SUB_ACTION.RUN) {
        if (!subActionParams?.body?.length) {
          errors.body.push(translations.BODY_REQUIRED);
        } else {
          try {
            const body = JSON.parse(subActionParams.body);
            if (body.hasOwnProperty('playbookId')) {
              errors.body.push(translations.PLAYBOOK_ID_PRESENT_IN_BODY);
            }
            if (!body.hasOwnProperty('name')) {
              errors.body.push(translations.NAME_KEY_REQUIRED);
            }
          } catch {
            errors.body.push(translations.BODY_INVALID);
          }
        }
      }

      if (subAction === SUB_ACTION.TEST) {
        if (!subActionParams?.body?.length) {
          errors.body.push(translations.BODY_REQUIRED);
        } else {
          try {
            JSON.parse(subActionParams.body);
          } catch {
            errors.body.push(translations.BODY_INVALID);
          }
        }
      }

      if (errors.body.length) return { errors };

      // The internal "subAction" param should always be valid, ensure it is only if "subActionParams" are valid
      if (!subAction) {
        errors.subAction.push(translations.ACTION_REQUIRED);
      } else if (subAction !== SUB_ACTION.RUN && subAction !== SUB_ACTION.TEST) {
        errors.subAction.push(translations.INVALID_ACTION);
      }
      return { errors };
    },
    actionConnectorFields: lazy(() => import('./connector')),
    actionParamsFields: lazy(() => import('./params')),
  };
}
