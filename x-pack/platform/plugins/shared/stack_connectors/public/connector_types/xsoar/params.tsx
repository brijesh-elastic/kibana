/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  const [eventAction, setEventAction] = useState(
    actionParams.subAction ?? SUB_ACTION.RUN
  );
  const actionConnectorRef = useRef(actionConnector?.id ?? '');
  const isTest = useMemo(() => executionMode === ActionConnectorMode.Test, [executionMode]);

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

  useEffect(() => {
    editAction('subAction', eventAction, index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventAction]);

  const setEventActionType = (eventActionType: SUB_ACTION) => {
    const subActionParams =
      eventActionType === SUB_ACTION.TEST
        ? {
          tlp: 2,
          severity: 2,
          tags: [],
          sourceRef: isTest ? undefined : '{{alert.uuid}}',
        }
        : {
          incident: {
            tlp: 2,
            severity: 2,
            tags: [],
          },
          comments: [],
        };

    // setEventAction(eventActionType);
    editAction('subActionParams', subActionParams, index);
  };

  return (
    <>
      {eventAction === SUB_ACTION.RUN ? "hii" : "loll"}
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export { XSOARParamsFields as default };
