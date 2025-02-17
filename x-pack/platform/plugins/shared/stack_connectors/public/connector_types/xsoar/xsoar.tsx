/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { lazy } from 'react';
import { GenericValidationResult } from '@kbn/triggers-actions-ui-plugin/public/types';
import { XSOARConnector } from './types';
import { XSOAR_CONNECTOR_ID, SUB_ACTION, XSOAR_TITLE } from '../../../common/xsoar/constants';
import { ExecutorParams } from '../../../common/xsoar/types';
import * as i18n from './translations';

interface ValidationErrors {
  subAction: string[];
  body: string[];
  playbook: string[];
}

export function getConnectorType(): XSOARConnector {
  return {
    id: XSOAR_CONNECTOR_ID,
    iconClass: lazy(() => import('./logo')),
    selectMessage: i18n.SELECT_MESSAGE,
    actionTypeTitle: XSOAR_TITLE,
    validateParams: async (
      actionParams: ExecutorParams
    ): Promise<GenericValidationResult<ValidationErrors>> => {
      const translations = await import('./translations');
      const errors: ValidationErrors = {
        subAction: [],
        body: [],
        playbook: [],
      };
      const { subAction, subActionParams } = actionParams;

      if (subAction === SUB_ACTION.TEST) {
        if (!subActionParams?.playbookId?.length) {
          errors.playbook.push(translations.PLAYBOOK_REQUIRED);
        }
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

      if (subAction === SUB_ACTION.RUN) {
        if (!subActionParams?.playbookId?.length) {
          errors.playbook.push(translations.PLAYBOOK_REQUIRED);
        }
        if (!subActionParams?.body?.length) {
          errors.body.push(translations.BODY_REQUIRED);
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
