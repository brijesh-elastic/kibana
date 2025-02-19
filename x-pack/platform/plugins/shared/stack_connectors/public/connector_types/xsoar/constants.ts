import { i18n } from "@kbn/i18n";
import { XSOARSeverity } from "../../../common/xsoar/constants";

export const severityOptions = [
  {
    value: XSOARSeverity.UNKNOWN,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityUnknownOptionLabel',
      {
        defaultMessage: 'UNKNOWN',
      }
    ),
  },
  {
    value: XSOARSeverity.INFORMATIONAL,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityInformationalOptionLabel',
      {
        defaultMessage: 'INFORMATIONAL',
      }
    ),
  },
  {
    value: XSOARSeverity.LOW,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityLowOptionLabel',
      {
        defaultMessage: 'LOW',
      }
    ),
  },
  {
    value: XSOARSeverity.MEDIUM,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityMediumOptionLabel',
      {
        defaultMessage: 'MEDIUM',
      }
    ),
  },
  {
    value: XSOARSeverity.HIGH,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityHighOptionLabel',
      {
        defaultMessage: 'HIGH',
      }
    ),
  },
  {
    value: XSOARSeverity.CRITICAL,
    text: i18n.translate(
      'xpack.stackConnectors.components.xsoar.eventSelectSeverityCriticalOptionLabel',
      {
        defaultMessage: 'CRITICAL',
      }
    ),
  },
];