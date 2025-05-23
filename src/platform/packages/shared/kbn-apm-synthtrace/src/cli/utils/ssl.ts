/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import * as Fs from 'fs';
import { CA_CERT_PATH } from '@kbn/dev-utils';
import https from 'https';

export function getFetchAgent(url: string) {
  const urlObj = new URL(url);
  const isHTTPS = urlObj.protocol === 'https:';
  const isLocalhost = urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1';
  return isHTTPS && isLocalhost ? new https.Agent({ rejectUnauthorized: false }) : undefined;
}

export function getEsClientTlsSettings(url: string) {
  const isHTTPS = new URL(url).protocol === 'https:';
  // load the CA cert from disk if necessary
  const caCert = isHTTPS ? Fs.readFileSync(CA_CERT_PATH) : null;
  const isLocalhost = new URL(url).hostname === 'localhost';

  return caCert && isLocalhost
    ? {
        ca: caCert,
        rejectUnauthorized: true,
      }
    : undefined;
}
