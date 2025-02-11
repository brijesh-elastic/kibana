/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ExecutorParams } from '@kbn/actions-plugin/server/sub_action_framework/types';
import { renderMustacheString } from '@kbn/actions-plugin/server/lib/mustache_renderer';
import { RenderParameterTemplates } from '@kbn/actions-plugin/server/types';
import { SUB_ACTION } from '../../../common/thehive/constants';

function mapSeverity(severity: string): number {
  switch (severity) {
    case 'low':
      return 1;
    case 'medium':
      return 2;
    case 'high':
      return 3;
    case 'critical':
      return 4;
    default:
      return 2;
  }
}

export const renderParameterTemplates: RenderParameterTemplates<ExecutorParams> = (
  logger,
  params,
  variables
) => {
  if (params?.subAction === SUB_ACTION.PUSH_TO_SERVICE) return params;

  return {
    ...params,
    subActionParams: {
      ...params.subActionParams,
      ...Object.fromEntries(
        Object.entries(params.subActionParams).map(([key, value]) => {
          if (typeof value !== 'string') return [key, value];
          return [key, renderMustacheString(logger, value as string, variables, 'json')];
        })
      ),
      severity:
        params.subActionParams.severity === 5
          ? mapSeverity((variables.rule as { params: { severity: string } }).params.severity)
          : params.subActionParams.severity,
    },
  };
};
