/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IndicesIndexSettings } from '@elastic/elasticsearch/lib/api/types';
import {
  DATA_QUALITY_URL_STATE_KEY,
  datasetQualityDetailsUrlSchemaV1,
  datasetQualityUrlSchemaV1,
  datasetQualityDetailsUrlSchemaV2,
} from '@kbn/data-quality-plugin/common';
import {
  DEFAULT_QUALITY_ISSUE_SORT_DIRECTION,
  DEFAULT_QUALITY_ISSUE_SORT_FIELD,
} from '@kbn/dataset-quality-plugin/common/constants';
import expect from '@kbn/expect';
import { WebElementWrapper } from '@kbn/ftr-common-functional-ui-services';
import rison from '@kbn/rison';
import querystring from 'querystring';
import { FtrProviderContext } from '../ftr_provider_context';

const defaultPageState: datasetQualityUrlSchemaV1.UrlSchema = {
  v: 1,
  table: {
    page: 0,
  },
  filters: {},
};

const defaultDetailsPageState: datasetQualityDetailsUrlSchemaV1.UrlSchema = {
  v: 1,
  dataStream: 'logs-synth.1-default',
  degradedFields: {
    table: {
      page: 0,
      rowsPerPage: 10,
      sort: {
        field: DEFAULT_QUALITY_ISSUE_SORT_FIELD,
        direction: DEFAULT_QUALITY_ISSUE_SORT_DIRECTION,
      },
    },
  },
};

const defaultDetailsPageStateV2: datasetQualityDetailsUrlSchemaV2.UrlSchema = {
  v: 2,
  dataStream: 'logs-synth.1-default',
  qualityIssues: {
    table: {
      page: 0,
      rowsPerPage: 10,
      sort: {
        field: DEFAULT_QUALITY_ISSUE_SORT_FIELD,
        direction: DEFAULT_QUALITY_ISSUE_SORT_DIRECTION,
      },
    },
  },
};

type SummaryPanelKpi = Record<
  | 'datasetHealthPoor'
  | 'datasetHealthDegraded'
  | 'datasetHealthGood'
  | 'activeDatasets'
  | 'estimatedData',
  string
>;

type SummaryPanelKPI = Record<
  'docsCountTotal' | 'size' | 'services' | 'hosts' | 'degradedDocs' | 'failedDocs',
  string
>;

const texts = {
  noActivityText: 'No activity in the selected timeframe',
  datasetHealthPoor: 'Poor',
  datasetHealthDegraded: 'Degraded',
  datasetHealthGood: 'Good',
  activeDatasets: 'Active Data Sets',
  estimatedData: 'Estimated Data',
  docsCountTotal: 'Total count',
  size: 'Size',
  services: 'Services',
  hosts: 'Hosts',
  degradedDocs: 'Degraded docs',
  failedDocs: 'Failed docs',
  datasetNameColumn: 'Data set name',
  datasetNamespaceColumn: 'Namespace',
  datasetTypeColumn: 'Type',
  datasetSizeColumn: 'Size',
  datasetQualityColumn: 'Data set quality',
  datasetDegradedDocsColumn: 'Degraded docs (%)',
  datasetFailedDocsColumn: 'Failed docs (%)',
  datasetLastActivityColumn: 'Last activity',
  datasetActionsColumn: 'Actions',
  datasetIssueColumn: 'Issue',
  datasetDocsCountColumn: 'Docs count',
  datasetLastOccurrenceColumn: 'Last Occurrence',
};

export function DatasetQualityPageObject({ getPageObjects, getService }: FtrProviderContext) {
  const PageObjects = getPageObjects(['common']);
  const testSubjects = getService('testSubjects');
  const euiSelectable = getService('selectable');
  const find = getService('find');
  const retry = getService('retry');
  const es = getService('es');

  const selectors = {
    datasetQualityTable: '[data-test-subj="datasetQualityTable"]',
    datasetQualityTableColumn: (column: number) =>
      `[data-test-subj="datasetQualityTable"] .euiTableRowCell:nth-child(${column})`,
    datasetSearchInput: '[placeholder="Filter data sets"]',
    showFullDatasetNamesSwitch: 'button[aria-label="Show full data set names"]',
    showInactiveDatasetsNamesSwitch: 'button[aria-label="Show inactive data sets"]',
    superDatePickerApplyButton: '[data-test-subj="superDatePickerQuickSelectApplyButton"]',
    qualityIssueDegradedChart: '.euiButtonGroupButton[data-test-subj="degraded"]',
    qualityIssueFailedChart: '.euiButtonGroupButton[data-test-subj="failed"]',
  };

  const testSubjectSelectors = {
    datasetQualityTable: 'datasetQualityTable',
    datasetQualityFiltersContainer: 'datasetQualityFiltersContainer',
    datasetQualityExpandButton: 'datasetQualityExpandButton',
    datasetQualityDetailsDegradedFieldsExpandButton:
      'datasetQualityDetailsQualityIssuesExpandButton',
    datasetQualityDetailsDegradedFieldFlyout: 'datasetQualityDetailsDegradedFieldFlyout',
    datasetDetailsContainer: 'datasetDetailsContainer',
    datasetQualityDetailsTitle: 'datasetQualityDetailsTitle',
    datasetQualityDetailsDegradedFieldTable: 'datasetQualityDetailsDegradedFieldTable',
    datasetQualityDetailsDegradedTableNoData: 'datasetQualityDetailsDegradedTableNoData',
    datasetQualitySparkPlot: 'datasetQualitySparkPlot',
    datasetQualityDetailsHeaderButton: 'datasetQualityDetailsHeaderButton',
    datasetQualityDetailsIntegrationLoading: 'datasetQualityDetailsIntegrationLoading',
    datasetQualityDetailsIntegrationActionsButton: 'datasetQualityDetailsIntegrationActionsButton',
    datasetQualityDetailsIntegrationAction: (action: string) =>
      `datasetQualityDetailsIntegrationAction${action}`,
    datasetQualityFilterBarFieldSearch: 'datasetQualityFilterBarFieldSearch',
    datasetQualityIntegrationsSelectable: 'datasetQualityIntegrationsSelectable',
    datasetQualityIntegrationsSelectableButton: 'datasetQualityIntegrationsSelectableButton',
    datasetQualityNamespacesSelectable: 'datasetQualityNamespacesSelectable',
    datasetQualityNamespacesSelectableButton: 'datasetQualityNamespacesSelectableButton',
    datasetQualityTypesSelectable: 'datasetQualityFilterType',
    datasetQualityQualitiesSelectable: 'datasetQualityQualitiesSelectable',
    datasetQualityQualitiesSelectableButton: 'datasetQualityQualitiesSelectableButton',
    datasetQualityDetailsEmptyPrompt: 'datasetQualityDetailsEmptyPrompt',
    datasetQualityDetailsEmptyPromptBody: 'datasetQualityDetailsEmptyPromptBody',
    datasetQualityDatasetHealthKpi: 'datasetQualityDatasetHealthKpi',
    datasetQualityDetailsSummaryKpiValue: 'datasetQualityDetailsSummaryKpiValue',
    datasetQualityDetailsIntegrationRowIntegration: 'datasetQualityDetailsFieldsList-integration',
    datasetQualityDetailsIntegrationRowVersion: 'datasetQualityDetailsFieldsList-version',
    datasetQualityDetailsLinkToDiscover: 'datasetQualityDetailsLinkToDiscover',
    datasetQualityInsufficientPrivileges: 'datasetQualityInsufficientPrivileges',
    datasetQualityNoDataEmptyState: 'datasetQualityTableNoData',
    datasetQualityNoPrivilegesEmptyState: 'datasetQualityNoPrivilegesEmptyState',
    superDatePickerToggleQuickMenuButton: 'superDatePickerToggleQuickMenuButton',
    superDatePickerApplyTimeButton: 'superDatePickerApplyTimeButton',
    superDatePickerQuickMenu: 'superDatePickerQuickMenu',
    unifiedHistogramBreakdownSelectorButton: 'unifiedHistogramBreakdownSelectorButton',
    unifiedHistogramBreakdownSelectorSelectorSearch:
      'unifiedHistogramBreakdownSelectorSelectorSearch',
    unifiedHistogramBreakdownSelectorSelectable: 'unifiedHistogramBreakdownSelectorSelectable',
    managementHome: 'managementHome',
    euiFlyoutCloseButton: 'euiFlyoutCloseButton',
    datasetQualityDetailsDegradedFieldFlyoutIssueDoesNotExist:
      'datasetQualityDetailsDegradedFieldFlyoutIssueDoesNotExist',
    datasetQualityDetailsOverviewDegradedFieldToggleSwitch:
      'datasetQualityDetailsOverviewDegradedFieldToggleSwitch',
    datasetQualityDetailsActionsDropdown: 'datasetQualityDetailsActionsDropdown',
    openInDiscover: 'openInDiscover',
  };

  return {
    selectors,
    testSubjectSelectors,
    texts,

    async navigateTo({
      pageState,
    }: {
      pageState?: datasetQualityUrlSchemaV1.UrlSchema;
    } = {}) {
      const queryStringParams = querystring.stringify({
        [DATA_QUALITY_URL_STATE_KEY]: rison.encode(
          datasetQualityUrlSchemaV1.urlSchemaRT.encode({
            ...defaultPageState,
            ...pageState,
          })
        ),
      });

      return PageObjects.common.navigateToUrlWithBrowserHistory(
        'management',
        '/data/data_quality',
        queryStringParams,
        {
          // the check sometimes is too slow for the page so it misses the point
          // in time before the app rewrites the URL
          ensureCurrentUrl: false,
        }
      );
    },

    async navigateToDetails(pageState: datasetQualityDetailsUrlSchemaV1.UrlSchema) {
      const queryStringParams = querystring.stringify({
        [DATA_QUALITY_URL_STATE_KEY]: rison.encode(
          datasetQualityDetailsUrlSchemaV1.urlSchemaRT.encode({
            ...defaultDetailsPageState,
            ...pageState,
          })
        ),
      });

      return PageObjects.common.navigateToUrlWithBrowserHistory(
        'management',
        '/data/data_quality/details',
        queryStringParams,
        {
          // the check sometimes is too slow for the page so it misses the point
          // in time before the app rewrites the URL
          ensureCurrentUrl: false,
        }
      );
    },

    async navigateToDetailsV2(pageState: datasetQualityDetailsUrlSchemaV2.UrlSchema) {
      const queryStringParams = querystring.stringify({
        [DATA_QUALITY_URL_STATE_KEY]: rison.encode(
          datasetQualityDetailsUrlSchemaV2.urlSchemaRT.encode({
            ...defaultDetailsPageStateV2,
            ...pageState,
          })
        ),
      });

      return PageObjects.common.navigateToUrlWithBrowserHistory(
        'management',
        '/data/data_quality/details',
        queryStringParams,
        {
          // the check sometimes is too slow for the page so it misses the point
          // in time before the app rewrites the URL
          ensureCurrentUrl: false,
        }
      );
    },

    async waitUntilTableLoaded() {
      await find.waitForDeletedByCssSelector('.euiBasicTable-loading', 20 * 1000);
    },

    async waitUntilSummaryPanelLoaded(isStateful: boolean = true) {
      await testSubjects.missingOrFail(`datasetQuality-${texts.activeDatasets}-loading`, {
        timeout: 5 * 1000, // Increasing timeout since tests were flaky
      });
      if (isStateful) {
        await testSubjects.missingOrFail(`datasetQuality-${texts.estimatedData}-loading`);
      }
    },

    async waitUntilPossibleMitigationsLoaded() {
      await find.waitForDeletedByCssSelector(
        '.euiFlyoutBody .datasetQualityDetailsFlyoutManualMitigationsLoading',
        20 * 1000
      );
    },

    async waitUntilDegradedFieldFlyoutLoaded() {
      await testSubjects.existOrFail(testSubjectSelectors.datasetQualityDetailsDegradedFieldFlyout);
    },

    async parseSummaryPanel(excludeKeys: string[] = []): Promise<SummaryPanelKpi> {
      const isStateful = !excludeKeys.includes('estimatedData');

      await this.waitUntilSummaryPanelLoaded(isStateful);

      const kpiTitleAndKeys = [
        { title: texts.datasetHealthPoor, key: 'datasetHealthPoor' },
        { title: texts.datasetHealthDegraded, key: 'datasetHealthDegraded' },
        { title: texts.datasetHealthGood, key: 'datasetHealthGood' },
        { title: texts.activeDatasets, key: 'activeDatasets' },
        { title: texts.estimatedData, key: 'estimatedData' },
      ].filter((item) => !excludeKeys.includes(item.key));

      const kpiTexts = await Promise.all(
        kpiTitleAndKeys.map(async ({ title, key }) => ({
          key,
          value: await testSubjects.getVisibleText(
            `${testSubjectSelectors.datasetQualityDatasetHealthKpi}-${title}`
          ),
        }))
      );

      return kpiTexts.reduce(
        (acc, { key, value }) => ({
          ...acc,
          [key]: value,
        }),
        {} as SummaryPanelKpi
      );
    },

    generateBackingIndexNameWithoutVersion({
      type = 'logs',
      dataset,
      namespace = 'default',
    }: {
      type?: string;
      dataset: string;
      namespace?: string;
    }) {
      return `.ds-${type}-${dataset}-${namespace}-${getCurrentDateFormatted()}`;
    },

    getDatasetsTable(): Promise<WebElementWrapper> {
      return testSubjects.find(testSubjectSelectors.datasetQualityTable);
    },

    getDatasetQualityDetailsDegradedFieldTable(): Promise<WebElementWrapper> {
      return testSubjects.find(testSubjectSelectors.datasetQualityDetailsDegradedFieldTable);
    },

    async getDatasetQualityDetailsDegradedFieldTableRows(): Promise<WebElementWrapper[]> {
      await this.waitUntilTableLoaded();
      const table = await testSubjects.find(
        testSubjectSelectors.datasetQualityDetailsDegradedFieldTable
      );
      const tBody = await table.findByTagName('tbody');
      return tBody.findAllByTagName('tr');
    },

    async refreshTable() {
      const filtersContainer = await testSubjects.find(
        testSubjectSelectors.datasetQualityFiltersContainer,
        20 * 1000
      );
      const refreshButton = await filtersContainer.findByTestSubject(
        testSubjectSelectors.superDatePickerApplyTimeButton
      );
      return refreshButton.click();
    },

    async getDatasetTableRows(): Promise<WebElementWrapper[]> {
      await this.waitUntilTableLoaded();
      const table = await testSubjects.find(testSubjectSelectors.datasetQualityTable);
      const tBody = await table.findByTagName('tbody');
      return tBody.findAllByTagName('tr');
    },

    async getDatasetTableHeaderTexts() {
      const table = await this.getDatasetsTable();
      return getDatasetTableHeaderTexts(table);
    },

    async parseDatasetTable() {
      await this.waitUntilTableLoaded();
      const table = await this.getDatasetsTable();
      return this.parseTable(table, [
        texts.datasetNameColumn,
        texts.datasetNamespaceColumn,
        texts.datasetTypeColumn,
        texts.datasetSizeColumn,
        texts.datasetQualityColumn,
        texts.datasetDegradedDocsColumn,
        texts.datasetFailedDocsColumn,
        texts.datasetLastActivityColumn,
        texts.datasetActionsColumn,
      ]);
    },

    async parseDegradedFieldTable() {
      await this.waitUntilTableLoaded();
      const table = await this.getDatasetQualityDetailsDegradedFieldTable();
      return this.parseTable(table, [
        '0',
        texts.datasetIssueColumn,
        texts.datasetDocsCountColumn,
        texts.datasetLastOccurrenceColumn,
      ]);
    },

    async filterForIntegrations(integrations: string[]) {
      return euiSelectable.selectOnlyOptionsWithText(
        testSubjectSelectors.datasetQualityIntegrationsSelectableButton,
        testSubjectSelectors.datasetQualityIntegrationsSelectable,
        integrations
      );
    },

    async filterForNamespaces(namespaces: string[]) {
      return euiSelectable.selectOnlyOptionsWithText(
        testSubjectSelectors.datasetQualityNamespacesSelectableButton,
        testSubjectSelectors.datasetQualityNamespacesSelectable,
        namespaces
      );
    },

    async filterForQualities(qualities: string[]) {
      return euiSelectable.selectOnlyOptionsWithText(
        testSubjectSelectors.datasetQualityQualitiesSelectableButton,
        testSubjectSelectors.datasetQualityQualitiesSelectable,
        qualities
      );
    },

    async toggleShowInactiveDatasets() {
      return find.clickByCssSelector(selectors.showInactiveDatasetsNamesSwitch);
    },

    async toggleShowFullDatasetNames() {
      return find.clickByCssSelector(selectors.showFullDatasetNamesSwitch);
    },

    async refreshDetailsPageData() {
      const datasetDetailsContainer: WebElementWrapper = await testSubjects.find(
        testSubjectSelectors.datasetDetailsContainer
      );
      const refreshButton = await datasetDetailsContainer.findByTestSubject(
        testSubjectSelectors.superDatePickerApplyTimeButton
      );
      return refreshButton.click();
    },

    async doesTextExist(selector: string, text: string) {
      const textValues = await testSubjects.getVisibleTextAll(selector);
      if (textValues && textValues.length > 0) {
        const values = textValues[0].split('\n');
        return values.includes(text);
      }

      return false;
    },

    getDatasetQualityDetailsHeaderButton() {
      return testSubjects.find(testSubjectSelectors.datasetQualityDetailsHeaderButton);
    },

    openDatasetQualityDetailsActionsButton() {
      return testSubjects.click(testSubjectSelectors.datasetQualityDetailsActionsDropdown);
    },

    getOpenInDiscoverButton() {
      return testSubjects.find(testSubjectSelectors.openInDiscover);
    },

    openIntegrationActionsMenu() {
      return testSubjects.click(testSubjectSelectors.datasetQualityDetailsIntegrationActionsButton);
    },

    getIntegrationActionButtonByAction(action: string) {
      return testSubjects.find(testSubjectSelectors.datasetQualityDetailsIntegrationAction(action));
    },

    getIntegrationDashboardButtons() {
      return testSubjects.findAll(
        testSubjectSelectors.datasetQualityDetailsIntegrationAction('Dashboard')
      );
    },

    // `excludeKeys` needed to circumvent `_stats` not available in Serverless  https://github.com/elastic/kibana/issues/178954
    // TODO: Remove `excludeKeys` when `_stats` is available in Serverless
    async parseOverviewSummaryPanelKpis(excludeKeys: string[] = []): Promise<SummaryPanelKPI> {
      const kpiTitleAndKeys = [
        { title: texts.docsCountTotal, key: 'docsCountTotal' },
        { title: texts.size, key: 'size' },
        { title: texts.services, key: 'services' },
        { title: texts.hosts, key: 'hosts' },
        { title: texts.degradedDocs, key: 'degradedDocs' },
        { title: texts.failedDocs, key: 'failedDocs' },
      ].filter((item) => !excludeKeys.includes(item.key));

      const kpiTexts = await Promise.all(
        kpiTitleAndKeys.map(async ({ title, key }) => ({
          key,
          value: await testSubjects.getVisibleText(
            `${testSubjectSelectors.datasetQualityDetailsSummaryKpiValue}-${title}`
          ),
        }))
      );

      return kpiTexts.reduce(
        (acc, { key, value }) => ({
          ...acc,
          [key]: value,
        }),
        {} as SummaryPanelKPI
      );
    },

    /**
     * Selects a breakdown field from the unified histogram breakdown selector
     * @param fieldText The text of the field to select. Use 'No breakdown' to clear the selection
     */
    async selectBreakdownField(fieldText: string) {
      return euiSelectable.searchAndSelectOption(
        testSubjectSelectors.unifiedHistogramBreakdownSelectorButton,
        testSubjectSelectors.unifiedHistogramBreakdownSelectorSelectable,
        testSubjectSelectors.unifiedHistogramBreakdownSelectorSelectorSearch,
        fieldText,
        fieldText
      );
    },

    async selectQualityIssueChart(type: 'degraded' | 'failed') {
      const chartSelector =
        type === 'degraded'
          ? selectors.qualityIssueDegradedChart
          : selectors.qualityIssueFailedChart;
      return find.clickByCssSelector(chartSelector);
    },

    async openDegradedFieldFlyout(fieldName: string) {
      await this.waitUntilTableLoaded();
      const cols = await this.parseDegradedFieldTable();
      const fieldNameCol = cols.Issue;
      const fieldNameColCellTexts = await fieldNameCol.getCellTexts();
      const testDatasetRowIndex = fieldNameColCellTexts.findIndex(
        (dName) => dName === `${fieldName} field ignored`
      );

      expect(testDatasetRowIndex).to.be.greaterThan(-1);

      const expandColumn = cols['0'];
      const expandButtons = await expandColumn.getCellChildren(
        `[data-test-subj=${testSubjectSelectors.datasetQualityDetailsDegradedFieldsExpandButton}]`
      );

      expect(expandButtons.length).to.be.greaterThan(0);

      const fieldExpandButton = expandButtons[testDatasetRowIndex];

      // Check if 'title' attribute is "Expand" or "Collapse"
      const isCollapsed = (await fieldExpandButton.getAttribute('title')) === 'Expand';

      // Open if collapsed
      if (isCollapsed) {
        await fieldExpandButton.click();
      }

      await this.waitUntilDegradedFieldFlyoutLoaded();
    },

    async openFailedDocsFlyout() {
      await this.waitUntilTableLoaded();
      const cols = await this.parseDegradedFieldTable();
      const fieldNameCol = cols.Issue;
      const fieldNameColCellTexts = await fieldNameCol.getCellTexts();
      const testDatasetRowIndex = fieldNameColCellTexts.findIndex(
        (dName) => dName === `Documents indexing failed`
      );

      expect(testDatasetRowIndex).to.be.greaterThan(-1);

      const expandColumn = cols['0'];
      const expandButtons = await expandColumn.getCellChildren(
        `[data-test-subj=${testSubjectSelectors.datasetQualityDetailsDegradedFieldsExpandButton}]`
      );

      expect(expandButtons.length).to.be.greaterThan(0);

      const fieldExpandButton = expandButtons[testDatasetRowIndex];

      // Check if 'title' attribute is "Expand" or "Collapse"
      const isCollapsed = (await fieldExpandButton.getAttribute('title')) === 'Expand';

      // Open if collapsed
      if (isCollapsed) {
        await fieldExpandButton.click();
      }

      await this.waitUntilDegradedFieldFlyoutLoaded();
    },

    async closeFlyout() {
      return testSubjects.click(testSubjectSelectors.euiFlyoutCloseButton);
    },

    async setDataStreamSettings(name: string, settings: IndicesIndexSettings) {
      return es.indices.putSettings({
        index: name,
        settings,
      });
    },

    async rolloverDataStream(name: string) {
      return es.indices.rollover({
        alias: name,
      });
    },

    async getQualityIssueSwitchState() {
      const isSelected = await testSubjects.getAttribute(
        testSubjectSelectors.datasetQualityDetailsOverviewDegradedFieldToggleSwitch,
        'aria-checked'
      );
      return isSelected === 'true';
    },

    async parseTable(tableWrapper: WebElementWrapper, columnNamesOrIndexes: string[]) {
      const headerElementWrappers = await tableWrapper.findAllByCssSelector('thead th, thead td');

      const result: Record<
        string,
        {
          columnNameOrIndex: string;
          sortDirection?: 'ascending' | 'descending';
          headerElement: WebElementWrapper;
          cellElements: WebElementWrapper[];
          cellContentElements: WebElementWrapper[];
          getSortDirection: () => Promise<'ascending' | 'descending' | undefined>;
          sort: (sortDirection: 'ascending' | 'descending') => Promise<void>;
          getCellTexts: (selector?: string) => Promise<string[]>;
          getCellChildren: (selector: string) => Promise<WebElementWrapper[]>;
        }
      > = {};

      for (let i = 0; i < headerElementWrappers.length; i++) {
        const tdSelector = `table > tbody > tr td:nth-child(${i + 1})`;
        const cellContentSelector = `${tdSelector} .euiTableCellContent`;
        const thWrapper = headerElementWrappers[i];
        const columnName = await thWrapper.getVisibleText();
        const columnIndex = `${i}`;
        const columnNameOrIndex = columnNamesOrIndexes.includes(columnName)
          ? columnName
          : columnNamesOrIndexes.includes(columnIndex)
          ? columnIndex
          : undefined;

        if (columnNameOrIndex) {
          const headerElement = thWrapper;

          const tdWrappers = await tableWrapper.findAllByCssSelector(tdSelector);
          const cellContentWrappers = await tableWrapper.findAllByCssSelector(cellContentSelector);

          const getSortDirection = () =>
            headerElement.getAttribute('aria-sort') as Promise<
              'ascending' | 'descending' | undefined
            >;

          result[columnNameOrIndex] = {
            columnNameOrIndex,
            headerElement,
            cellElements: tdWrappers,
            cellContentElements: cellContentWrappers,
            getSortDirection,
            sort: async (sortDirection: 'ascending' | 'descending') => {
              await retry.tryForTime(5000, async () => {
                while ((await getSortDirection()) !== sortDirection) {
                  await headerElement.click();
                }
              });
            },
            getCellTexts: async (textContainerSelector?: string) => {
              const cellContentContainerWrappers = textContainerSelector
                ? await tableWrapper.findAllByCssSelector(`${tdSelector} ${textContainerSelector}`)
                : cellContentWrappers;

              const cellContentContainerWrapperTexts: string[] = [];
              for (let j = 0; j < cellContentContainerWrappers.length; j++) {
                const cellContentContainerWrapper = cellContentContainerWrappers[j];
                const cellContentContainerWrapperText =
                  await cellContentContainerWrapper.getVisibleText();
                cellContentContainerWrapperTexts.push(cellContentContainerWrapperText);
              }

              return cellContentContainerWrapperTexts;
            },
            getCellChildren: (childSelector: string) => {
              return tableWrapper.findAllByCssSelector(`${cellContentSelector} ${childSelector}`);
            },
          };
        }
      }

      return result;
    },
  };
}

async function getDatasetTableHeaderTexts(tableWrapper: WebElementWrapper) {
  const headerElementWrappers = await tableWrapper.findAllByCssSelector('thead th, thead td');
  return Promise.all(
    headerElementWrappers.map((headerElementWrapper) => headerElementWrapper.getVisibleText())
  );
}

function getCurrentDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}
