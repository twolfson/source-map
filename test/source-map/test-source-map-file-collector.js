/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
define(function (require, exports, module) {

  var SourceMapFileCollector = require('source-map/source-map-file-collector').SourceMapFileCollector;
  var SourceMapGenerator = require('source-map/source-map-generator').SourceMapGenerator;

  // Generate test data for mapping
  var input = [
        '// First line comment',
        'var test = {',
        '  a: "b"',
        '};'
      ].join('\n'),
      output = 'var test={a:"b"};',
      srcFile = 'input.js';
  // Generated by node-jsmin2
  var coordmap = {"22":0,"23":1,"24":2,"25":3,"26":4,"27":5,"28":6,"29":7,"31":8,"33":9,"37":10,"38":11,"40":12,"41":13,"42":14,"44":15,"45":16};

  var orig = [],
      minFile = [],
      keys = Object.getOwnPropertyNames(coordmap);
  keys.sort();
  keys.forEach(function (srcIndex) {
    var destIndex = coordmap[srcIndex];
    orig.push(input.charAt(srcIndex));
    minFile.push(output.charAt(destIndex));
  });
  console.log('xx');
  console.log(orig.join(''));
  console.log(minFile.join(''));

  // Generated by hand ;_;
  var propmap = [{
        generated: {'line': 1, 'column': 0}, // v
        original:  {'line': 2, 'column': 0},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 1}, // a
        original:  {'line': 2, 'column': 1},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 2}, // r
        original:  {'line': 2, 'column': 2},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 3}, //
        original:  {'line': 2, 'column': 3},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 4}, // t
        original:  {'line': 2, 'column': 4},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 5}, // e
        original:  {'line': 2, 'column': 5},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 6}, // s
        original:  {'line': 2, 'column': 6},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 7}, // t
        original:  {'line': 2, 'column': 7},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 8}, // =
        original:  {'line': 2, 'column': 9},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 9}, // {
        original:  {'line': 2, 'column': 11},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 10}, // a
        original:  {'line': 3, 'column': 2},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 11}, // :
        original:  {'line': 3, 'column': 3},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 12}, // "
        original:  {'line': 3, 'column': 5},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 13}, // b
        original:  {'line': 3, 'column': 6},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 14}, // "
        original:  {'line': 3, 'column': 7},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 15}, // }
        original:  {'line': 4, 'column': 0},
        source: srcFile
      }, {
        generated: {'line': 1, 'column': 16}, // ;
        original:  {'line': 4, 'column': 1},
        source: srcFile
      }];

  exports['test some simple stuff'] = function (assert, util) {
    var map = new SourceMapFileCollector({
      file: 'foo.js',
      sourceRoot: '.'
    });

    assert.ok(true);
  };

  exports['test generates the same mapping as SourceMapGenerator'] = function (assert, util) {
    var generatorProps = {
          file: 'min.js'
        },
        generator = new SourceMapGenerator(generatorProps);

    // Loop over the property map and add it to the SourceMapGenerator
    var i = 0,
        len = propmap.length;
    for (; i < len; i++) {
      // propmap[i].generated.column += 1;
      // propmap[i].original.column += 1;
      generator.addMapping(propmap[i]);
    }

    // Collect the source map
    var genSourceMap = generator.toString();

    // Generate another source map via SourceMapFileCollector
    var fileCollector = new SourceMapFileCollector(generatorProps);

    // Add the file coordinate mapping
    fileCollector.addIndexMapping({
      src: srcFile,
      input: input,
      output: output,
      map: coordmap
    });

    // Collect the second source map
    var fileSourceMap = fileCollector.toString();

    // Debug source map differences
    console.log('');
    console.log(genSourceMap);
    console.log(fileSourceMap);
  };

});
