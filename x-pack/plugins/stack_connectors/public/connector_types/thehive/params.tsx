/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { i18n } from '@kbn/i18n';
import { ActionParamsProps, TextAreaWithMessageVariables } from '@kbn/triggers-actions-ui-plugin/public';
import { SUB_ACTION, TheHiveSeverity, TheHiveTLP } from '../../../common/thehive/constants';
import { ExecutorParams, ExecutorSubActionPushParams, ExecutorSubActionCreateAlertParams } from '../../../common/thehive/types';
import {
  EuiFormRow,
  EuiSelect,
  EuiFieldText,
  EuiText,
  EuiComboBox,
} from '@elastic/eui';
import {
  TextFieldWithMessageVariables
} from '@kbn/triggers-actions-ui-plugin/public'

const TheHiveParamsFields: React.FunctionComponent<ActionParamsProps<ExecutorParams>> = ({
  actionConnector,
  actionParams,
  editAction,
  index,
  errors,
  messageVariables
}) => {
  const actionConnectorRef = useRef(actionConnector?.id ?? '');
  // const { subAction, subActionParams } = actionParams;
  console.log(actionParams);
  useEffect(() => {
    if (actionConnector != null && actionConnectorRef.current !== actionConnector.id) {
      actionConnectorRef.current = actionConnector.id;
      editAction(
        'subActionParams',
        {
          incident: {
            tlp: 2,
            severity: 2,
            tags: []
          },
          comments: [],
        },
        index
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionConnector]);

  const { incident, comments } = useMemo(
    () =>
      actionParams.subActionParams as ExecutorSubActionPushParams ??
      ({
        incident: {
          tlp: 2,
          severity: 2,
          tags: []
        },
        comments: [],
      } as unknown as ExecutorSubActionPushParams),
    [actionParams.subActionParams]
  );
  const alert = useMemo(
    () =>
      actionParams.subActionParams as ExecutorSubActionCreateAlertParams ??
      ({} as unknown as ExecutorSubActionCreateAlertParams),
    [actionParams.subActionParams]
  );
  const editSubActionProperty = useCallback(
    (key: string, value: any) => {
      const newProps =
        key !== 'comments'
          ? {
            incident: { ...incident, [key]: value },
            comments,
          }
          : { incident, [key]: value };
      editAction('subActionParams', newProps, index);
    },
    [comments, editAction, incident, index]
  );
  const editComment = useCallback(
    (key, value) => {
      editSubActionProperty(key, [{ commentId: '1', comment: value }]);
    },
    [editSubActionProperty]
  );

  const [eventAction, setEventAction] = useState('case');
  const setEventActionType = (eventActionType: string) => {
    const subActionParams =
      eventActionType === 'alert'
        ? {
          tlp: 2,
          severity: 2,
          tags: [],
        }
        : {
          incident: {
            tlp: 2,
            severity: 2,
            tags: [],
          },
          comments: [],
        };

    setEventAction(eventActionType);
    editAction('subActionParams', subActionParams, index);
  };

  useEffect(() => {
    const subAction =
      eventAction === 'alert' ? SUB_ACTION.CREATE_ALERT : SUB_ACTION.PUSH_TO_SERVICE;
    editAction('subAction', subAction, index);

  }, [eventAction]);

  useEffect(() => {
    if (!actionParams.subAction) {
      editAction('subAction', SUB_ACTION.PUSH_TO_SERVICE, index);
    }
    if (!actionParams.subActionParams) {
      editAction(
        'subActionParams',
        {
          incident: {
            tlp: 2,
            severity: 2,
            tags: []
          },
          comments: [],
        },
        index
      );
    }

  }, [actionParams]);

  const eventActionOptions = [
    {
      value: 'case',
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
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
  const severityOptions = [
    {
      value: TheHiveSeverity.LOW,
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
        {
          defaultMessage: 'Low',
        }
      )
    },
    {
      value: TheHiveSeverity.MEDIUM,
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
        {
          defaultMessage: 'Medium',
        }
      ),
    },
    {
      value: TheHiveSeverity.HIGH,
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
        {
          defaultMessage: 'High',
        }
      ),
    },
    {
      value: TheHiveSeverity.CRITICAL,
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
        {
          defaultMessage: 'Critical',
        }
      ),
    },
  ];
  const tlpOptions = [
    {
      value: TheHiveTLP.CLEAR,
      text: i18n.translate(
        'xpack.stackConnectors.components.thehive.eventSelectResolveOptionLabel',
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

  //do we need it? if we are using the props from parent components
  const [severity, setSeverity] = useState(severityOptions[1].value);
  const [tlp, setTlp] = useState(tlpOptions[2].value);

  const [selectedOptions, setSelected] = useState<Array<{ label: string }>>([]);
  const [isInvalid, setInvalid] = useState(false);
  const onCreateOption = (searchValue: string) => {

    const newOption = {
      label: searchValue,
    };

    setSelected([...selectedOptions, newOption]);
    if (eventAction === 'case') {
      editSubActionProperty('tags', [...incident.tags ?? [], searchValue])
    } else {
      editAction('subActionParams', { ...alert, tags: [...alert.tags ?? [], searchValue] }, index);
    }
  };

  const onSearchChange = (searchValue: string) => {
    if (!searchValue) {
      setInvalid(false);
      return;
    }
  };

  const onChange = (selectedOptions: Array<{ label: string }>) => {
    setSelected(selectedOptions);
    if (eventAction === 'case') {
      editSubActionProperty('tags', selectedOptions.map((option) => option.label));
    } else {
      editAction('subActionParams', { ...alert, tags: selectedOptions.map((option) => option.label) }, index);
    }

  }
  return (
    <>
      <EuiFormRow
        fullWidth
        label={i18n.translate(
          'xpack.stackConnectors.components.pagerDuty.eventActionSelectFieldLabel',
          {
            defaultMessage: 'Event Action',
          }
        )}
      >
        <EuiSelect
          fullWidth
          data-test-subj="eventActionSelect"
          options={eventActionOptions}
          value={eventAction}
          onChange={(e) => setEventActionType(e.target.value)}
        />
      </EuiFormRow>
      {eventAction === 'case' ?
        <>
          <EuiFormRow
            data-test-subj="title-row"
            fullWidth
            error={errors['pushToServiceParam.incident.title']}
            isInvalid={
              errors['pushToServiceParam.incident.title'] !== undefined &&
              errors['pushToServiceParam.incident.title'].length > 0 &&
              incident.title !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Title',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={editSubActionProperty}
              messageVariables={messageVariables}
              paramsProperty={'title'}
              inputTargetValue={incident.title ?? undefined}
              errors={errors['pushToServiceParam.incident.title'] as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            data-test-subj="description-row"
            fullWidth
            error={errors['pushToServiceParam.incident.description']}
            isInvalid={
              errors['pushToServiceParam.incident.description'] !== undefined &&
              errors['pushToServiceParam.incident.description'].length > 0 &&
              incident.description !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Description',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={editSubActionProperty}
              messageVariables={messageVariables}
              paramsProperty={'description'}
              inputTargetValue={incident.description ?? undefined}
              errors={errors['pushToServiceParam.incident.description'] as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            error={errors.tlp}
            isInvalid={false}
            label={i18n.translate('xpack.stackConnectors.components.thehivesecurity.eventTypeFieldLabel', {
              defaultMessage: 'TLP',
            })}>
            <EuiSelect
              fullWidth
              data-test-subj="eventTlpSelect"
              options={tlpOptions}
              value={tlp}
              onChange={(e) => {
                editSubActionProperty('tlp', parseInt(e.target.value));
                setTlp(tlpOptions[e.target.options.selectedIndex].value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            error={errors.severity}
            label={i18n.translate('xpack.stackConnectors.components.thehivesecurity.severityFieldLabel', {
              defaultMessage: 'Severity',
            })}
          >
            <EuiSelect
              fullWidth
              data-test-subj="eventSeveritySelect"
              options={severityOptions}
              value={severity}
              onChange={(e) => {
                editSubActionProperty('severity', parseInt(e.target.value))
                setSeverity(severityOptions[e.target.options.selectedIndex].value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            label={i18n.translate(
              'xpack.stackConnectors.components.pagerDuty.eventActionSelectFieldLabel',
              {
                defaultMessage: 'Tags',
              }
            )}
            labelAppend={
              <EuiText size="xs">
                optional
              </EuiText>
            }
          >
            <EuiComboBox
              fullWidth
              noSuggestions
              placeholder="Create some tags"
              selectedOptions={selectedOptions}
              onCreateOption={onCreateOption}
              onChange={onChange}
              onSearchChange={onSearchChange}
              isInvalid={isInvalid}
            />
          </EuiFormRow>
          <TextAreaWithMessageVariables
            index={index}
            editAction={editComment}
            messageVariables={messageVariables}
            paramsProperty={'comments'}
            inputTargetValue={comments && comments.length > 0 ? comments[0].comment : undefined}
            label={i18n.translate(
              'xpack.stackConnectors.components.thehive.commentsTextAreaFieldLabel',
              {
                defaultMessage: 'Additional comments',
              }
            )}
          />
        </>
        :
        <>
          <EuiFormRow
            data-test-subj="title-row"
            fullWidth
            error={errors['createAlertParam.title']}
            isInvalid={
              errors['createAlertParam.title'] !== undefined &&
              errors['createAlertParam.title'].length > 0 &&
              alert.title !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Title',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={(key, value) => {
                editAction('subActionParams', { ...alert, [key]: value }, index);
              }}
              messageVariables={messageVariables}
              paramsProperty={'title'}
              inputTargetValue={alert.title ?? undefined}
              errors={errors['createAlertParam.title'] as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            data-test-subj="description-row"
            fullWidth
            error={errors['createAlertParam.description']}
            isInvalid={
              errors['createAlertParam.description'] !== undefined &&
              errors['createAlertParam.description'].length > 0 &&
              alert.description !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Description',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={(key, value) => {
                editAction('subActionParams', { ...alert, [key]: value }, index);
              }}
              messageVariables={messageVariables}
              paramsProperty={'description'}
              inputTargetValue={alert.description ?? undefined}
              errors={errors['createAlertParam.description'] as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            error={errors['createAlertParam.type']}
            isInvalid={
              errors['createAlertParam.type'] !== undefined &&
              errors['createAlertParam.type'].length > 0 &&
              alert.type !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Type',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={(key, value) => {
                editAction('subActionParams', { ...alert, [key]: value }, index);
              }}
              messageVariables={messageVariables}
              paramsProperty={'type'}
              inputTargetValue={alert.type ?? undefined}
              errors={(errors['createAlertParam.type'] ?? []) as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            error={errors['createAlertParam.source']}
            isInvalid={
              errors['createAlertParam.source'] !== undefined &&
              errors['createAlertParam.source'].length > 0 &&
              alert.source !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Source',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={(key, value) => {
                editAction('subActionParams', { ...alert, [key]: value }, index);
              }}
              messageVariables={messageVariables}
              paramsProperty={'source'}
              inputTargetValue={alert.source ?? undefined}
              errors={(errors['createAlertParam.source'] ?? []) as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            error={errors['createAlertParam.sourceRef']}
            isInvalid={
              errors['createAlertParam.sourceRef'] !== undefined &&
              errors['createAlertParam.sourceRef'].length > 0 &&
              alert.sourceRef !== undefined
            }
            label={i18n.translate('xpack.stackConnectors.components.thehive.FieldLabel', {
              defaultMessage: 'Source Ref',
            })}
            labelAppend={
              <EuiText size="xs" color="subdued">
                Required
              </EuiText>
            }
          >
            <TextFieldWithMessageVariables
              index={index}
              editAction={(key, value) => {
                editAction('subActionParams', { ...alert, [key]: value }, index);
              }}
              messageVariables={messageVariables}
              paramsProperty={'sourceRef'}
              inputTargetValue={alert.sourceRef ?? undefined}
              errors={(errors['createAlertParam.sourceRef'] ?? []) as string[]}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            isInvalid={false}
            label={i18n.translate('xpack.stackConnectors.components.thehivesecurity.eventTypeFieldLabel', {
              defaultMessage: 'TLP',
            })}>
            <EuiSelect
              fullWidth
              data-test-subj="eventTlpSelect"
              options={tlpOptions}
              value={tlp}
              onChange={(e) => {
                editAction('subActionParams', { ...alert, tlp: parseInt(e.target.value) }, index);
                setTlp(tlpOptions[e.target.options.selectedIndex].value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            label={i18n.translate('xpack.stackConnectors.components.thehivesecurity.severityFieldLabel', {
              defaultMessage: 'Severity',
            })}
          >
            <EuiSelect
              fullWidth
              data-test-subj="eventSeveritySelect"
              options={severityOptions}
              value={severity}
              onChange={(e) => {
                editAction('subActionParams', { ...alert, severity: parseInt(e.target.value) }, index);
                setSeverity(severityOptions[e.target.options.selectedIndex].value);
              }}
            />
          </EuiFormRow>
          <EuiFormRow
            fullWidth
            label={i18n.translate(
              'xpack.stackConnectors.components.pagerDuty.eventActionSelectFieldLabel',
              {
                defaultMessage: 'Tags',
              }
            )}
            labelAppend={
              <EuiText size="xs">
                optional
              </EuiText>
            }
          >
            <EuiComboBox
              fullWidth
              noSuggestions
              placeholder="Create some tags"
              selectedOptions={selectedOptions}
              onCreateOption={onCreateOption}
              onChange={onChange}
              onSearchChange={onSearchChange}
              isInvalid={isInvalid}
            />
          </EuiFormRow>
        </>
      }
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export { TheHiveParamsFields as default };