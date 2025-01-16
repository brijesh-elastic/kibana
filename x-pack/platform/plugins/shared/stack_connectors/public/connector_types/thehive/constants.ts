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
        defaultMessage: 'Fortigate Firewall Threat Detection',
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
  {
    value: 4,
    text: i18n.translate(
      'xpack.stackConnectors.components.thehive.eventSelectTemplate5OptionLabel',
      {
        defaultMessage: 'Data Exfiltration Monitoring',
      }
    ),
  },
];

export const bodyOptions = [
  '{"observables":[{"dataType":"ip","data":"{{#context.alerts}}{{source.ip}}{{/context.alerts}}","tags":["source.ip"]},{"dataType":"hostname","data":"{{#context.alerts}}{{host.hostname}}{{/context.alerts}}","tags":["Fortigate-FW"]}],"procedures":[{{#context.rule.threat}}{"patternId":"{{technique.0.id}}","occurDate":"{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}","tactic":"{{tactic.name}}"}{{#technique.0.subtechnique}},{"patternId":"{{id}}","occurDate":"{{#context.alerts}}{{#signal.original_time}}{{#FormatDate}} {{{signal.original_time}}} ; ; x {{/FormatDate}}{{/signal.original_time}}{{^signal.original_time}}1640000000000{{/signal.original_time}}{{/context.alerts}}","tactic":"{{tactic.name}}"}{{/technique.0.subtechnique}}{{^technique.0.subtechnique}}{{^@last}},{{/@last}}{{/technique.0.subtechnique}}{{/context.rule.threat}}]}',
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'ip',
          data: '{{source.ip}}',
          tags: ['source', 'malicious-activity'],
        },
        {
          dataType: 'hostname',
          data: '{{host.hostname}}',
          tags: ['endpoint', 'suspicious'],
        },
        {
          dataType: 'url',
          data: '{{network.url}}',
          tags: ['malware-distribution', 'phishing-site'],
        },
      ],
      procedures: [
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Initial Access',
        },
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Command and Control',
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
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Credential Access',
        },
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Privilege Escalation',
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
      procedures: [
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Defense Evasion',
        },
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Execution',
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
          dataType: 'ip',
          data: '{{destination.ip}}',
          tags: ['exfiltration', 'suspicious'],
        },
        {
          dataType: 'hostname',
          data: '{{destination.hostname}}',
          tags: ['data-leakage', 'endpoint'],
        },
        {
          dataType: 'url',
          data: '{{destination.url}}',
          tags: ['data-exfiltration', 'command-and-control'],
        },
      ],
      procedures: [
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Exfiltration',
        },
        {
          patternId: '{{technique.id}}',
          occurDate: '{{timestamp}}',
          tactic: 'Command and Control',
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
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'hostname',
          data: 'test-host.example.com',
          tags: ['hostname'],
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
  JSON.stringify(
    {
      observables: [
        {
          dataType: 'email',
          data: 'john@ex.com',
          tags: ['phishing', 'targeted-user'],
        },
        {
          dataType: 'username',
          data: 'user1',
          tags: ['compromised-account', 'unauthorized-access'],
        },
      ],
      procedures: [
        {
          patternId: 'T1132',
          occurDate: '1640000000000',
          tactic: 'Credential Access',
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
          data: '5d41402abc4b2a76b9719d911017c592',
          tags: ['malware', 'file-analysis'],
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
          dataType: 'ip',
          data: '127.0.0.1',
          tags: ['exfiltration', 'suspicious'],
        },
        {
          dataType: 'hostname',
          data: 'www.example.com',
          tags: ['data-leakage', 'endpoint'],
        },
        {
          dataType: 'url',
          data: 'https://www.example.com',
          tags: ['data-exfiltration', 'command-and-control'],
        },
      ],
      procedures: [
        {
          patternId: 'TA0002',
          occurDate: '1736976000000',
          tactic: 'Exfiltration',
        },
        {
          patternId: 'TA0003',
          occurDate: '1704067199000',
          tactic: 'Command and Control',
        },
      ],
    },
    null,
    2
  ),
];
