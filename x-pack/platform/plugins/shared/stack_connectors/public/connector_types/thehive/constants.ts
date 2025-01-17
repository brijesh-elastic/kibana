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
        defaultMessage: 'none',
      }
    ),
  },
  {
    value: 1,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate2OptionLabel',
      {
        defaultMessage: 'Suspicious Network Activity',
      }
    ),
  },
  {
    value: 2,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate3OptionLabel',
      {
        defaultMessage: 'Compromised User Account Investigation',
      }
    ),
  },
  {
    value: 3,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate4OptionLabel',
      {
        defaultMessage: 'Malicious File Analysis',
      }
    ),
  },
];

export const bodyOptions = [
  null,
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'ip',
          data: '{{threat.indicator.ip}}',
          tags: ['source', 'malicious-activity'],
        },
      ],
      procedures: [
        {
          patternId: '{{threat.technique.id}}',
          occurDate:
            '{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}',
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
          dataType: 'email',
          data: '{{user.email}}',
          tags: ['phishing', 'targeted-user'],
        },
        {
          dataType: 'username',
          data: '{{user.name}}',
          tags: ['compromised-account', 'unauthorized-access'],
        },
      ],
      procedures: [
        {
          patternId: '{{threat.technique.id}}',
          occurDate:
            '{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}',
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
          dataType: 'hash',
          data: '{{file.hash.md5}}',
          tags: ['malware', 'file-analysis'],
        },
        {
          dataType: 'hash',
          data: '{{file.hash.sha256}}',
          tags: ['malware', 'suspicious-file'],
        },
      ],
    },
    null,
    2
  ),
];

export const testBodyOptions = [
  null,
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'ip',
          data: '127.0.0.1',
          tags: ['source'],
        },
      ],
      procedures: [
        {
          patternId: 'T1132',
          occurDate: 1737105104000,
          tactic: 'command-and-control',
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
          dataType: 'email',
          data: 'john@example.com',
          tags: ['iam-user'],
        },
        {
          dataType: 'username',
          data: 'user1',
        },
      ],
      procedures: [
        {
          patternId: 'T1132',
          occurDate: 1737103254000,
        },
      ],
      customFields: {
        reason: 'N/A',
      },
    },
    null,
    2
  ),
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'hash',
          data: '5d41402abc4b2a76b9719d911017c592',
          tags: ['md5'],
        },
      ],
      procedures: [
        {
          patternId: 'T1612',
          occurDate: 1737107904000,
          tactic: 'Defense Evasion',
        },
      ],
    },
    null,
    2
  ),
];
