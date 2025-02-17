/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

export const URL_LABEL = i18n.translate('xpack.stackConnectors.components.xsoar.urlFieldLabel', {
  defaultMessage: 'URL',
});

export const SELECT_MESSAGE = i18n.translate(
  'xpack.stackConnectors.components.xsoar.selectMessageText',
  {
    defaultMessage: 'Create incidents in XSOAR',
  }
);

export const API_KEY_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.apiKeyFieldLabel',
  {
    defaultMessage: 'API key',
  }
);

export const API_KEY_ID_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.apiKeyIDFieldLabel',
  {
    defaultMessage: 'API key ID',
  }
);

export const API_KEY_ID_HELP_TEXT = i18n.translate(
  'xpack.stackConnectors.components.xsoar.apiKeyIDFieldHelpText',
  {
    defaultMessage:
      'For the cloud instance, the API Key ID is required, that is your unique token used to authenticate the API Key.',
  }
);

export const ACTION_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.requiredActionText',
  {
    defaultMessage: 'Action is required.',
  }
);

export const INVALID_ACTION = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.invalidActionText',
  {
    defaultMessage: 'Invalid action name.',
  }
);

export const PLAYBOOK_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.requiredPlaybookSelection',
  {
    defaultMessage: 'Playbook selection is required.',
  }
);

export const BODY_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.requiredBodyText',
  {
    defaultMessage: 'Body is required.',
  }
);

export const BODY_INVALID = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.invalidBodyText',
  {
    defaultMessage: 'Body does not have a valid JSON format.',
  }
);

export const PLAYBOOK_ID_PRESENT_IN_BODY = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.playbookIdPresentInBodyText',
  {
    defaultMessage: 'playbookId field should not be present in the body.',
  }
);

export const NAME_KEY_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.error.requiredNameKeyText',
  {
    defaultMessage: 'Name key is required.',
  }
);

export const PLAYBOOKS_ERROR = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.componentError.playbooksRequestFailed',
  {
    defaultMessage: 'Error retrieving playbooks from XSOAR',
  }
);

export const PLAYBOOK_NOT_FOUND_WARNING = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.componentWarning.playbookNotFound',
  {
    defaultMessage:
      'Cannot find the saved playbook. Please select a valid playbook from the selector',
  }
);

export const BODY_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.bodyFieldLabel',
  {
    defaultMessage: 'Body',
  }
);

export const BODY_DESCRIPTION = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.bodyCodeEditorAriaLabel',
  {
    defaultMessage: 'Code editor',
  }
);

export const PLAYBOOK_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.playbookFieldLabel',
  {
    defaultMessage: 'XSOAR Playbooks',
  }
);

export const PLAYBOOK_HELP = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.playbookHelp',
  {
    defaultMessage: 'The XSOAR playbook to associate with incident.',
  }
);

export const PLAYBOOK_PLACEHOLDER = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.playbookPlaceholder',
  {
    defaultMessage: 'Select a playbook',
  }
);

export const PLAYBOOK_ARIA_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.params.playbookFieldAriaLabel',
  {
    defaultMessage: 'Select a XSOAR playbook',
  }
);
