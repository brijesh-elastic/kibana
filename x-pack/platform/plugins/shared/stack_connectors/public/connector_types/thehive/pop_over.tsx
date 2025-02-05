/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useMemo, useState } from 'react';
import {
  EuiPopover,
  EuiButtonIcon,
  EuiText,
  EuiButtonEmpty,
  EuiSelectable,
  EuiSpacer,
  EuiHighlight,
  useEuiTheme,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopoverFooter,
  EuiToolTip,
  EuiSelectableOption,
} from '@elastic/eui';
import type { ActionVariable } from '@kbn/alerting-types';
import './add_message_variables.scss';
import { TruncatedText } from './truncated_text';
import * as i18n from './translations';

interface Props {
  buttonTitle?: string;
  paramsProperty: string;
  onSelectEventHandler: (variable: ActionVariable) => void;
  showButtonTitle?: boolean;
}

const messageVariables: ActionVariable[] = [
  {
    name: 'Custom Template',
    description: 'Create Your Own Template',
    useWithTripleBracesInTemplates: false,
  },
  {
    name: 'Compromised User Account Investigation',
    description: 'Investigate potential account compromise using username and email observables.',
    useWithTripleBracesInTemplates: false,
  },
  {
    name: 'Malicious File Analysis',
    description: 'Analyze a potentially malicious file using its hash as an observable.',
    useWithTripleBracesInTemplates: false,
  },
  {
    name: 'Suspicious Network Activity',
    description:
      'Investigate suspicious network activity using threat indicator IP as an observable.',
    useWithTripleBracesInTemplates: false,
  },
];

export const TemplateVariables: React.FunctionComponent<Props> = ({
  buttonTitle,
  paramsProperty,
  showButtonTitle = false,
  onSelectEventHandler,
}) => {
  const [isVariablesPopoverOpen, setIsVariablesPopoverOpen] = useState<boolean>(false);

  const { euiTheme } = useEuiTheme();

  const messageVariablesObject: Record<string, ActionVariable> | undefined = useMemo(
    () =>
      messageVariables?.reduce((acc, variable) => {
        return {
          ...acc,
          [variable.name]: variable,
        };
      }, {}),
    [messageVariables]
  );

  // const messageVariablesToShow = useMemo(
  //   () =>
  //     isShowAllPressed
  //       ? messageVariables
  //       : messageVariables?.filter((variable) => !variable.deprecated),
  //   [messageVariables, isShowAllPressed]
  // );

  const optionsToShow = useMemo(() => {
    return messageVariables?.map((variable) => ({
      label: variable.name,
      ...(variable.deprecated ? { disabled: true } : {}),
      data: {
        description: variable.description,
      },
      'data-test-subj': `${variable.name}-selectableOption`,
    }));
  }, [messageVariables]);

  const addVariableButtonTitle = buttonTitle ? buttonTitle : i18n.ADD_VARIABLE_TITLE;

  const Button = useMemo(
    () =>
      showButtonTitle ? (
        <EuiButtonEmpty
          id={`${paramsProperty}AddVariableButton`}
          data-test-subj={`${paramsProperty}AddVariableButton-Title`}
          size="xs"
          onClick={() => setIsVariablesPopoverOpen(true)}
          aria-label={i18n.ADD_VARIABLE_POPOVER_BUTTON}
        >
          {addVariableButtonTitle}
        </EuiButtonEmpty>
      ) : (
        <EuiButtonIcon
          id={`${paramsProperty}AddVariableButton`}
          data-test-subj={`${paramsProperty}AddVariableButton`}
          title={addVariableButtonTitle}
          onClick={() => setIsVariablesPopoverOpen(true)}
          iconType="indexOpen"
          aria-label={i18n.ADD_VARIABLE_POPOVER_BUTTON}
        />
      ),
    [addVariableButtonTitle, paramsProperty, showButtonTitle]
  );
  if ((messageVariables?.length ?? 0) === 0) {
    return <></>;
  }

  const ToolTipContent = ({ description, label }: { description: string; label: string }) => {
    return (
      <>
        <EuiText
          size="s"
          style={{
            fontWeight: euiTheme.font.weight.bold,
          }}
        >
          {label}
        </EuiText>
        <EuiSpacer size="s" />
        <hr />
        <EuiSpacer size="s" />
        <EuiText size="xs">{description}</EuiText>
      </>
    );
  };

  const renderOption = (
    option: EuiSelectableOption<{ description?: string }>,
    searchValue: string
  ) => {
    return (
      <EuiFlexGroup data-test-subj={`variableMenuButton-${option.label}`}>
        <EuiFlexItem>
          <EuiText
            size="s"
            style={{
              fontWeight: euiTheme.font.weight.bold,
            }}
          >
            <EuiHighlight search={searchValue}>{option.label}</EuiHighlight>
          </EuiText>
          <EuiSpacer size="xs" />
          {option.description && (
            <>
              <EuiToolTip
                display="block"
                position="top"
                content={<ToolTipContent description={option.description} label={option.label} />}
                data-test-subj={`${option.label}-tooltip`}
              >
                <TruncatedText text={option.description || ''} />
              </EuiToolTip>
            </>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  return (
    <EuiPopover
      button={Button}
      isOpen={isVariablesPopoverOpen}
      closePopover={() => setIsVariablesPopoverOpen(false)}
      panelPaddingSize="s"
      anchorPosition="upLeft"
      panelStyle={{ minWidth: 350 }}
    >
      <EuiSelectable
        height={300}
        data-test-subj={'messageVariablesSelectableList'}
        isLoading={false}
        options={optionsToShow}
        listProps={{
          rowHeight: 70,
          showIcons: false,
          paddingSize: 'none',
          textWrap: 'wrap',
        }}
        loadingMessage={i18n.LOADING_VARIABLES}
        noMatchesMessage={i18n.NO_VARIABLES_FOUND}
        emptyMessage={i18n.NO_VARIABLES_AVAILABLE}
        renderOption={renderOption}
        onChange={(variables) => {
          variables.map((variable) => {
            if (variable.checked === 'on' && messageVariablesObject) {
              onSelectEventHandler(messageVariablesObject[variable.label]);
            }
          });
          setIsVariablesPopoverOpen(false);
        }}
        singleSelection
      >
        {(list) => (
          <>
            <EuiSpacer size="xs" />
            {list}
            <EuiPopoverFooter style={{ paddingTop: 0, paddingBottom: 0 }}>
              <EuiFlexGroup
                gutterSize="s"
                alignItems="center"
                justifyContent="spaceBetween"
                responsive={false}
                wrap={true}
              />
            </EuiPopoverFooter>
          </>
        )}
      </EuiSelectable>
    </EuiPopover>
  );
};
