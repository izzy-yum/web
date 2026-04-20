#!/usr/bin/env node
// Generate the Apple OAuth client_secret JWT that Supabase's Dashboard requires
// in the "Secret Key (for OAuth)" field for the Apple provider.
//
// Apple's client_secret is an ES256-signed JWT (not the raw .p8). Max lifetime
// is ~6 months, so this runs on a rotation schedule. See
// infrastructure/RUNBOOK_OAUTH_SETUP.md for the end-to-end procedure.
//
// Usage:
//   APPLE_TEAM_ID=VWFHD2N44D \
//   APPLE_KEY_ID=RY499TP287 \
//   APPLE_CLIENT_ID=com.izzyyum.app.web-signin \
//   APPLE_P8_PATH=/path/to/AuthKey_RY499TP287.p8 \
//   node scripts/generate-apple-client-secret.js

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const required = ['APPLE_TEAM_ID', 'APPLE_KEY_ID', 'APPLE_CLIENT_ID', 'APPLE_P8_PATH'];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const privateKey = fs.readFileSync(path.resolve(process.env.APPLE_P8_PATH), 'utf8');

const now = Math.floor(Date.now() / 1000);
const exp = now + 15552000; // 180 days — under Apple's ~182.5-day cap.

const header = { alg: 'ES256', kid: process.env.APPLE_KEY_ID, typ: 'JWT' };
const payload = {
  iss: process.env.APPLE_TEAM_ID,
  iat: now,
  exp,
  aud: 'https://appleid.apple.com',
  sub: process.env.APPLE_CLIENT_ID,
};

const b64url = (obj) =>
  Buffer.from(JSON.stringify(obj))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const signingInput = `${b64url(header)}.${b64url(payload)}`;
const signer = crypto.createSign('SHA256');
signer.update(signingInput);
signer.end();
// Apple requires JOSE's IEEE P1363 signature format (r||s), not DER.
const signature = signer.sign({ key: privateKey, dsaEncoding: 'ieee-p1363' });
const sigB64 = signature
  .toString('base64')
  .replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

console.error(`# JWT expires: ${new Date(exp * 1000).toISOString()}  (rotate before then)`);
console.log(`${signingInput}.${sigB64}`);
