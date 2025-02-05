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
      sourceRef: renderMustacheString(
        logger,
        params.subActionParams.sourceRef as string,
        variables,
        'json'
      ),
      severity: mapSeverity((variables.rule as any).params.severity as string),
      body: renderMustacheString(logger, params.subActionParams.body as string, variables, 'json'),
    },
  };
};
