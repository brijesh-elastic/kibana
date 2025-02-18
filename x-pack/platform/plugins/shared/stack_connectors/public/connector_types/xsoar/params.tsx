/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useSubAction,
  useKibana,
  ActionParamsProps,
  JsonEditorWithMessageVariables,
} from '@kbn/triggers-actions-ui-plugin/public';
import {
  EuiFormRow,
  EuiComboBoxOptionOption,
  EuiComboBox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHighlight,
} from '@elastic/eui';
import { SUB_ACTION } from '../../../common/xsoar/constants';
import {
  ExecutorParams,
  XSOARRunActionParams,
  XSOARPlaybooksActionResponse,
  XSOARPlaybooksActionParams,
  XSOARPlaybooksObject,
} from '../../../common/xsoar/types';
import * as translations from './translations';

type PlaybookOption = EuiComboBoxOptionOption<XSOARPlaybooksObject>;

const createOption = (
  playbook: XSOARPlaybooksObject
): EuiComboBoxOptionOption<XSOARPlaybooksObject> => ({
  key: playbook.id,
  value: playbook,
  label: playbook.name,
});

const renderPlaybook = (
  { label }: PlaybookOption,
  searchValue: string,
  contentClassName: string
) => (
  <EuiFlexGroup className={contentClassName} direction="row" alignItems="center">
    <EuiFlexItem grow={false}>
      <EuiHighlight search={searchValue}>{label}</EuiHighlight>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const XSOARParamsFields: React.FunctionComponent<ActionParamsProps<ExecutorParams>> = ({
  actionConnector,
  actionParams,
  editAction,
  index,
  errors,
  messageVariables,
}) => {
  const { toasts } = useKibana().notifications;
  const { subAction, subActionParams } = actionParams;
  const { body, playbookId } = (subActionParams as XSOARRunActionParams) ?? {};

  const [connectorId, setConnectorId] = useState<string | undefined>(actionConnector?.id);
  const [selectedPlaybookOption, setSelectedPlaybookOption] = useState<
    PlaybookOption | null | undefined
  >();

  useEffect(() => {
    if (!subAction) {
      editAction('subAction', SUB_ACTION.RUN, index);
    }
  }, [editAction, index, subAction]);

  if (connectorId !== actionConnector?.id) {
    setSelectedPlaybookOption(null);
    // editAction('subActionParams', { body: undefined, playbookId: undefined }, index);
    setConnectorId(actionConnector?.id);
  }

  const {
    response: { playbooks } = {},
    isLoading: isLoadingPlaybooks,
    error: playbooksError,
  } = useSubAction<XSOARPlaybooksActionParams, XSOARPlaybooksActionResponse>({
    connectorId,
    subAction: 'getPlaybooks',
  });

  const playbooksOptions = useMemo(() => playbooks?.map(createOption) ?? [], [playbooks]);

  useEffect(() => {
    if (playbooksError) {
      toasts.danger({ title: translations.PLAYBOOKS_ERROR, body: playbooksError.message });
    }
  }, [toasts, playbooksError]);

  useEffect(() => {
    if (selectedPlaybookOption === undefined && playbookId && playbooks) {
      const selectedPlaybook = playbooks.find(({ id }) => id === playbookId);
      if (selectedPlaybook) {
        setSelectedPlaybookOption(createOption(selectedPlaybook));
      } else {
        toasts.warning({ title: translations.PLAYBOOK_NOT_FOUND_WARNING });
        editAction('subActionParams', { body, playbookId: undefined }, index);
      }
    }

    if (selectedPlaybookOption !== undefined && selectedPlaybookOption?.value?.id !== playbookId) {
      editAction('subActionParams', { body, playbookId: selectedPlaybookOption?.value?.id }, index);
    }
  }, [selectedPlaybookOption, playbookId, playbooks, toasts, editAction, body, index]);

  const selectedPlaybookOptions = useMemo(
    () => (selectedPlaybookOption ? [selectedPlaybookOption] : []),
    [selectedPlaybookOption]
  );

  const onChangePlaybook = useCallback(([selected]: PlaybookOption[]) => {
    setSelectedPlaybookOption(selected ?? null);
  }, []);

  return (
    <>
      <EuiFormRow
        fullWidth
        error={errors.playbook as string[]}
        isInvalid={!!errors.playbook?.length && selectedPlaybookOption !== undefined}
        label={translations.PLAYBOOK_LABEL}
        helpText={translations.PLAYBOOK_HELP}
      >
        <EuiComboBox
          aria-label={translations.PLAYBOOK_ARIA_LABEL}
          placeholder={translations.PLAYBOOK_PLACEHOLDER}
          singleSelection={{ asPlainText: true }}
          options={playbooksOptions}
          selectedOptions={selectedPlaybookOptions}
          onChange={onChangePlaybook}
          isDisabled={isLoadingPlaybooks}
          isLoading={isLoadingPlaybooks}
          renderOption={renderPlaybook}
          fullWidth
          data-test-subj="xsoar-playbookSelector"
        />
      </EuiFormRow>
      <JsonEditorWithMessageVariables
        messageVariables={messageVariables}
        paramsProperty={'body'}
        inputTargetValue={body}
        label={translations.BODY_LABEL}
        ariaLabel={translations.BODY_DESCRIPTION}
        errors={errors.body as string[]}
        onDocumentsChange={(json: string) =>
          editAction('subActionParams', { ...subActionParams, body: json }, index)
        }
        dataTestSubj="xsoar-body"
        onBlur={() => {
          if (!body) {
            editAction('subActionParams', { ...subActionParams, body: null }, index);
          }
        }}
      />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export { XSOARParamsFields as default };
