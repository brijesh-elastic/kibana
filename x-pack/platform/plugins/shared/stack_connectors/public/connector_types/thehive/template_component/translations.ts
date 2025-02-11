/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

// popover
export const LOADING_TEMPLATES = i18n.translate(
  'alertsUIShared.components.selectTemplateVariables.loadingMessage',
  {
    defaultMessage: 'Loading Templates',
  }
);

export const NO_TEMPLATES_AVAILABLE = i18n.translate(
  'alertsUIShared.components.selectTemplateVariables.noTemplateVariablesAvailable',
  {
    defaultMessage: 'No templates available',
  }
);

export const SELECT_TEMPLATES_POPOVER_BUTTON = i18n.translate(
  'alertsUIShared.components.selectTemplateVariables.selectTemplateVariablePopoverButton',
  {
    defaultMessage: 'Select body Template',
  }
);

export const SELECT_TEMPLATES_TITLE = i18n.translate(
  'alertsUIShared.components.selectTemplateVariables.selectRuleVariableTitle',
  {
    defaultMessage: 'Select body template',
  }
);
