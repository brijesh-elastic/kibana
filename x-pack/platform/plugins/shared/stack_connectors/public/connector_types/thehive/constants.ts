/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { TheHiveSeverity, TheHiveTLP, SUB_ACTION } from '../../../common/thehive/constants';

export const eventActionOptions = [
  {
    value: SUB_ACTION.PUSH_TO_SERVICE,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectCreateCaseOptionLabel',
      {
        defaultMessage: 'Create case',
      }
    ),
  },
  {
    value: SUB_ACTION.CREATE_ALERT,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectCreateAlertOptionLabel',
      {
        defaultMessage: 'Create alert',
      }
    ),
  },
];

export const severityOptions = [
  {
    value: TheHiveSeverity.LOW,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectSeverityLowOptionLabel',
      {
        defaultMessage: 'LOW',
      }
    ),
  },
  {
    value: TheHiveSeverity.MEDIUM,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectSeverityMediumOptionLabel',
      {
        defaultMessage: 'MEDIUM',
      }
    ),
  },
  {
    value: TheHiveSeverity.HIGH,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectSeverityHighOptionLabel',
      {
        defaultMessage: 'HIGH',
      }
    ),
  },
  {
    value: TheHiveSeverity.CRITICAL,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectSeverityCriticalOptionLabel',
      {
        defaultMessage: 'CRITICAL',
      }
    ),
  },
];

export const tlpOptions = [
  {
    value: TheHiveTLP.CLEAR,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTlpClearOptionLabel',
      {
        defaultMessage: 'CLEAR',
      }
    ),
  },
  {
    value: TheHiveTLP.GREEN,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTlpGreenOptionLabel',
      {
        defaultMessage: 'GREEN',
      }
    ),
  },
  {
    value: TheHiveTLP.AMBER,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTlpAmberOptionLabel',
      {
        defaultMessage: 'AMBER',
      }
    ),
  },
  {
    value: TheHiveTLP.AMBER_STRICT,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTlpAmberStrictOptionLabel',
      {
        defaultMessage: 'AMBER+STRICT',
      }
    ),
  },
  {
    value: TheHiveTLP.RED,
    text: i18n.translate('xpack.stackConnectors.components.thehive.eventSelectTlpRedOptionLabel', {
      defaultMessage: 'RED',
    }),
  },
];

export const templateOptions = [
  {
    value: 0,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate1OptionLabel',
      {
        defaultMessage: 'Template1',
      }
    ),
  },
  {
    value: 1,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate2OptionLabel',
      {
        defaultMessage: 'Template2',
      }
    ),
  },
];

export const bodyOptions = [
  '{"observables":[{"dataType":"ip","data":"{{#context.alerts}}{{source.ip}}12{{/context.alerts}}","tags":["source.ip"]},{"dataType":"hostname","data":"{{#context.alerts}}{{host.hostname}}34{{/context.alerts}}","tags":["Fortigate-FW"]}],"procedures":[{{#context.rule.threat}}{"patternId":"{{technique.0.id}}","occurDate":"{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}","tactic":"{{tactic.name}}"}{{#technique.0.subtechnique}},{"patternId":"{{id}}","occurDate":"{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}","tactic":"{{tactic.name}}"}{{/technique.0.subtechnique}}{{^technique.0.subtechnique}}{{^@last}},{{/@last}}{{/technique.0.subtechnique}}{{/context.rule.threat}}]}',
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'hostname',
          data: '{{#context.alerts}}{{host.hostname}}{{/context.alerts}}',
          tags: ['Fortigate-FW'],
        },
      ],
    },
    null,
    2
  ),
];

export const testBodyOptions = [
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'ip',
          data: '127.0.0.1',
          tags: ['source.ip'],
        },
      ],
    },
    null,
    2
  ),
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'hostname',
          data: '{{#context.alerts}}{{host.hostname}}{{/context.alerts}}',
          tags: ['Fortigate-FW'],
        },
      ],
    },
    null,
    2
  ),
];
