import { i18n } from '@kbn/i18n';
import { TheHiveSeverity, TheHiveTLP } from '../../../common/thehive/constants';

export const eventActionOptions = [
    {
        value: 'case',
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Create Case',
            }
        ),
    },
    {
        value: 'alert',
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Create Alert',
            }
        ),
    }
];
export const severityOptions = [
    {
        value: TheHiveSeverity.LOW,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Low',
            }
        )
    },
    {
        value: TheHiveSeverity.MEDIUM,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Medium',
            }
        ),
    },
    {
        value: TheHiveSeverity.HIGH,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'High',
            }
        ),
    },
    {
        value: TheHiveSeverity.CRITICAL,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Critical',
            }
        ),
    },
];

export const tlpOptions = [
    {
        value: TheHiveTLP.CLEAR,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Clear',
            }
        ),
    },
    {
        value: TheHiveTLP.GREEN,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Green',
            }
        ),
    },
    {
        value: TheHiveTLP.AMBER,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Amber',
            }
        ),
    },
    {
        value: TheHiveTLP.AMBER_STRICT,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Amber Strict',
            }
        ),
    },
    {
        value: TheHiveTLP.RED,
        text: i18n.translate(
            'xpack.stackConnectors.components.thehive.eventSelectTriggerOptionLabel',
            {
                defaultMessage: 'Red',
            }
        ),
    }
];