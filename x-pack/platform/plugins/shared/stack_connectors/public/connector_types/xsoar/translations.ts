/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';

export const URL_LABEL = i18n.translate(
  'xpack.stackConnectors.components.xsoar.urlFieldLabel',
  {
    defaultMessage: 'URL',
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
    defaultMessage: 'For the cloud instance, the API Key ID is required, that is your unique token used to authenticate the API Key.',
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

export const EVENT_ACTION_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.eventActionSelectFieldLabel',
  {
    defaultMessage: 'Event action',
  }
);

export const TITLE_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.titleFieldLabel',
  {
    defaultMessage: 'Title',
  }
);

export const DESCRIPTION_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.descriptionFieldLabel',
  {
    defaultMessage: 'Description',
  }
);

export const TLP_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.tlpSelectFieldLabel',
  {
    defaultMessage: 'TLP',
  }
);

export const SEVERITY_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.severitySelectFieldLabel',
  {
    defaultMessage: 'Severity',
  }
);

export const TAGS_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.TagsMultiSelectFieldLabel',
  {
    defaultMessage: 'Tags',
  }
);

export const COMMENTS_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.commentsTextAreaFieldLabel',
  {
    defaultMessage: 'Additional comments',
  }
);

export const TYPE_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.typeFieldLabel',
  {
    defaultMessage: 'Type',
  }
);

export const SOURCE_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.sourceFieldLabel',
  {
    defaultMessage: 'Source',
  }
);

export const SOURCE_REF_LABEL = i18n.translate(
  'xpack.stackConnectors.components.thehive.sourceRefFieldLabel',
  {
    defaultMessage: 'Source reference',
  }
);

export const TITLE_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.thehive.requiredTitleText',
  {
    defaultMessage: 'Title is required.',
  }
);

export const DESCRIPTION_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.thehive.requiredDescriptionText',
  {
    defaultMessage: 'Description is required.',
  }
);

export const TYPE_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.thehive.requiredTypeText',
  {
    defaultMessage: 'Type is required.',
  }
);

export const SOURCE_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.thehive.requiredSourceText',
  {
    defaultMessage: 'Source is required.',
  }
);

export const SOURCE_REF_REQUIRED = i18n.translate(
  'xpack.stackConnectors.components.thehive.requiredSourceRefText',
  {
    defaultMessage: 'Source reference is required.',
  }
);

export const API_URL_LABEL = i18n.translate(
  'xpack.stackConnectors.components.bedrock.apiUrlTextFieldLabel',
  {
    defaultMessage: 'URL',
  }
);

export const ACCESS_KEY_LABEL = i18n.translate(
  'xpack.stackConnectors.components.bedrock.accessKeySecret',
  {
    defaultMessage: 'Access Key',
  }
);
export const DEFAULT_MODEL_LABEL = i18n.translate(
  'xpack.stackConnectors.components.bedrock.defaultModelTextFieldLabel',
  {
    defaultMessage: 'Default model',
  }
);

export const SECRET = i18n.translate('xpack.stackConnectors.components.bedrock.secret', {
  defaultMessage: 'Secret',
});

export const BEDROCK = i18n.translate('xpack.stackConnectors.components.bedrock.title', {
  defaultMessage: 'Amazon Bedrock',
});

export const DOCUMENTATION = i18n.translate(
  'xpack.stackConnectors.components.bedrock.documentation',
  {
    defaultMessage: 'documentation',
  }
);

export const BODY = i18n.translate('xpack.stackConnectors.components.bedrock.bodyFieldLabel', {
  defaultMessage: 'Body',
});
export const BODY_DESCRIPTION = i18n.translate(
  'xpack.stackConnectors.components.bedrock.bodyCodeEditorAriaLabel',
  {
    defaultMessage: 'Code editor',
  }
);

export const MODEL = i18n.translate('xpack.stackConnectors.components.bedrock.model', {
  defaultMessage: 'Model',
});
