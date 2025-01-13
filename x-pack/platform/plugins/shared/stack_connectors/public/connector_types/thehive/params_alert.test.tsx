/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ActionConnector } from '@kbn/triggers-actions-ui-plugin/public/types';
import { TheHiveParamsAlertFields } from './params_alert';
import { SUB_ACTION } from '../../../common/thehive/constants';
import { ExecutorParams, ExecutorSubActionCreateAlertParams } from '../../../common/thehive/types';

describe('TheHiveParamsFields renders', () => {
  const subActionParams: ExecutorSubActionCreateAlertParams = {
    title: 'title {test}',
    description: 'description test',
    tlp: 2,
    severity: 2,
    tags: ['test1'],
    source: 'source test',
    type: 'sourceType test',
    sourceRef: 'sourceRef test',
    body: JSON.stringify(
      {
        observables: [
          {
            dataType: 'ip',
            data: '127.0.0.1',
            tags: ['source.ip'],
          },
        ],
        procedures: [
          {
            patternId: 'T1132',
            occurDate: 1640000000000,
            tactic: 'command-and-control',
          },
        ],
      },
      null,
      2
    ),
  };
  const actionParams: ExecutorParams = {
    subAction: SUB_ACTION.CREATE_ALERT,
    subActionParams,
  };
  const connector: ActionConnector = {
    secrets: {},
    config: {},
    id: 'test',
    actionTypeId: '.test',
    name: 'Test',
    isPreconfigured: false,
    isDeprecated: false,
    isSystemAction: false as const,
  };

  const editAction = jest.fn();
  const defaultProps = {
    actionConnector: connector,
    actionParams,
    editAction,
    errors: { 'subActionParams.incident.title': [] },
    index: 0,
    messageVariables: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('all Params fields is rendered', () => {
    const { getByTestId } = render(<TheHiveParamsAlertFields {...defaultProps} />);

    expect(getByTestId('titleInput')).toBeInTheDocument();
    expect(getByTestId('descriptionTextArea')).toBeInTheDocument();
    expect(getByTestId('tagsInput')).toBeInTheDocument();
    expect(getByTestId('severitySelectInput')).toBeInTheDocument();
    expect(getByTestId('tlpSelectInput')).toBeInTheDocument();
    expect(getByTestId('typeInput')).toBeInTheDocument();
    expect(getByTestId('sourceInput')).toBeInTheDocument();
    expect(getByTestId('sourceRefInput')).toBeInTheDocument();
    expect(getByTestId('bodyJsonEditor')).toBeInTheDocument();
    expect(getByTestId('templateSelectInput')).toBeInTheDocument();

    expect(getByTestId('severitySelectInput')).toHaveValue('2');
    expect(getByTestId('tlpSelectInput')).toHaveValue('2');
    expect(getByTestId('templateSelectInput')).toHaveValue('0');
  });
});
