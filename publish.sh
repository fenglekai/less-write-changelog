#!/bin/sh

set -e

pnpm install --frozen-lockfile
pnpm build

cd dist
npm publish
cd -

echo "✔️ Publish completed"