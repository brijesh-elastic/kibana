/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ThreeWayDiffStorybookProviders } from '../../storybook/three_way_diff_storybook_providers';
import { RelatedIntegrationsReadOnly } from './related_integrations';

export default {
  component: RelatedIntegrationsReadOnly,
  title:
    'Rule Management/Prebuilt Rules/Upgrade Flyout/ThreeWayDiff/FieldReadOnly/related_integrations',
};

const mockedIntegrationsData = [
  {
    package_name: 'endpoint',
    package_title: 'Elastic Defend',
    latest_package_version: '8.15.1',
    installed_package_version: '8.16.0-prerelease.1',
    is_installed: true,
    is_enabled: false,
  },
];

function MockRelatedIntegrationsData({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  queryClient.setQueryData(['integrations'], mockedIntegrationsData);

  return <>{children}</>;
}

export const Default = () => (
  <ThreeWayDiffStorybookProviders>
    <MockRelatedIntegrationsData>
      <RelatedIntegrationsReadOnly
        relatedIntegrations={[{ package: 'endpoint', version: '^8.2.0' }]}
      />
    </MockRelatedIntegrationsData>
  </ThreeWayDiffStorybookProviders>
);

export const EmptyArrayValue = () => <RelatedIntegrationsReadOnly relatedIntegrations={[]} />;
