/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  TextFieldWithMessageVariables,
  TextAreaWithMessageVariables,
  ActionParamsProps,
  JsonEditorWithMessageVariables,
  ActionConnectorMode,
} from '@kbn/triggers-actions-ui-plugin/public';
import { ActionParamsProps, ActionConnectorMode } from '@kbn/triggers-actions-ui-plugin/public';
import { EuiFormRow, EuiSelect } from '@elastic/eui';
import { SUB_ACTION } from '../../../common/xsoar/constants';
import { ExecutorParams } from '../../../common/xsoar/types';
import * as translations from './translations';

const XSOARParamsFields: React.FunctionComponent<ActionParamsProps<ExecutorParams>> = ({
  actionConnector,
  actionParams,
  editAction,
  index,
  errors,
  messageVariables,
  executionMode,
}) => {
  const actionConnectorRef = useRef(actionConnector?.id ?? '');

  useEffect(() => {
    if (actionConnector != null && actionConnectorRef.current !== actionConnector.id) {
      actionConnectorRef.current = actionConnector.id;
      editAction(
        'subActionParams',
        {
          incident: {
            tlp: 2,
            severity: 2,
            tags: [],
          },
          comments: [],
        },
        index
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionConnector]);

  useEffect(() => {
    if (!actionParams.subAction) {
      editAction('subAction', SUB_ACTION.TEST, index);
    }
    if (!actionParams.subActionParams) {
      editAction(
        'subActionParams',
        {
          incident: {
            tlp: 2,
            severity: 2,
            tags: [],
          },
          comments: [],
        },
        index
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionParams]);

  return (
    <>
      <JsonEditorWithMessageVariables
        key={selectedTemplate}
        messageVariables={messageVariables}
        paramsProperty={'body'}
        inputTargetValue={alert.body}
        label={
          <>
            {translations.BODY_LABEL}
            <TemplateOptions
              buttonTitle={translations.SELECT_BODY_TEMPLATE_POPOVER_BUTTON}
              paramsProperty="body"
              onSelectEventHandler={onSelectMessageVariable}
            />
          </>
        }
        ariaLabel={translations.BODY_DESCRIPTION}
        errors={errors.body as string[]}
        onDocumentsChange={(json: string) =>
          editAction('subActionParams', { ...alert, body: json }, index)
        }
        dataTestSubj="thehive-body"
        onBlur={() => {
          if (!alert.body) {
            editAction('subActionParams', { ...alert, body: null }, index);
          }
        }}
      />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export { XSOARParamsFields as default };
