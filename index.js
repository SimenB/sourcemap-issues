'use strict';

const fs = require('fs');
const {transform} = require('babel-core');
const {SourceMapConsumer} = require('source-map');

const fileContent = fs.readFileSync(
  './test.js',
  'utf8',
);

const res = transform(fileContent, {
  plugins: ['transform-strict-mode'],
  sourceMaps: 'both',
});

const consumer = new SourceMapConsumer(JSON.stringify(res.map));

console.log(
  // 17:3 in `res.code` has the `it('also works', () => {`
  consumer.originalPositionFor({
    column: 3,
    line: 17,
  }),
);
