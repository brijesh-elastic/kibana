/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PluginInitializerContext } from '@kbn/core/public';
import type { HeatmapPublicConfig } from '../server/config';
import { VisTypeHeatmapPlugin } from './plugin';

export { heatmapVisType } from './vis_type';

export const plugin = (initializerContext: PluginInitializerContext<HeatmapPublicConfig>) =>
  new VisTypeHeatmapPlugin(initializerContext);
