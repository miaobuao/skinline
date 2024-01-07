#!/usr/bin/env node
const { exec } = require('child_process');
const { join } = require('path');
const { watch } = require('fs');

const SOURCE = join(__dirname, './openapi.json');
const TARGET = join(__dirname, 'dist');
const COMMAND = join(
  __dirname,
  '../../../node_modules/.bin/openapi-generator-cli'
);

watch(SOURCE, () => {
  console.log(`🔁 Updating ${SOURCE}`);
  run();
});
run();

function run() {
  exec(
    `${COMMAND} generate \
      -i ${SOURCE} \
      -o ${TARGET} \
      -g typescript-axios \
      --additional-properties=supportsES6=true,npmVersion=9.8.1,typescriptThreePlus=true \
      --skip-validate-spec
  `,
    (err, _, stderr) => {
      if (err) {
        console.log(`❌ Error generating API: ${err.message}`);
        console.log(stderr);
      } else {
        console.log(`⭐ API generated`);
      }
    }
  );
}
