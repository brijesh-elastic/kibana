import { i18n } from "@kbn/i18n";
import { XSOARSeverity } from "../../../common/xsoar/constants";

export const severityOptions = [
  {
    value: XSOARSeverity.UNKNOWN,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityUnknownOptionLabel',
      {
        defaultMessage: 'Unknown',
      }
    ),
  },
  {
    value: XSOARSeverity.INFORMATIONAL,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityInformationalOptionLabel',
      {
        defaultMessage: 'Informational',
      }
    ),
  },
  {
    value: XSOARSeverity.LOW,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityLowOptionLabel',
      {
        defaultMessage: 'Low',
      }
    ),
  },
  {
    value: XSOARSeverity.MEDIUM,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityMediumOptionLabel',
      {
        defaultMessage: 'Medium',
      }
    ),
  },
  {
    value: XSOARSeverity.HIGH,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityHighOptionLabel',
      {
        defaultMessage: 'High',
      }
    ),
  },
  {
    value: XSOARSeverity.CRITICAL,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityCriticalOptionLabel',
      {
        defaultMessage: 'Critical',
      }
    ),
  },
];
