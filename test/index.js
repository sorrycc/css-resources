'use strict';

var join = require('path').join;
var readFile = require('fs').readFileSync;
var resources = require('..');

describe('resources', function() {

  it('normal', function() {
    var str = readFile(join(__dirname, 'a.css'));
    resources(str).should.be.eql([
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.eot\')',
        path: '../fonts/glyphicons-halflings-regular.eot' },
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.eot?#iefix\')',
        path: '../fonts/glyphicons-halflings-regular.eot?#iefix' },
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.woff2\')',
        path: '../fonts/glyphicons-halflings-regular.woff2' },
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.woff\')',
        path: '../fonts/glyphicons-halflings-regular.woff' },
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.ttf\')',
        path: '../fonts/glyphicons-halflings-regular.ttf' },
      { property: 'src',
        string: 'url(\'../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular\')',
        path: '../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular' },
      { property: 'background',
        string: 'url(\'./a.png\')',
        path: './a.png' },
      { property: '_background',
        string: 'url(\'./a.png\')',
        path: './a.png' }
    ]);

    var expected = readFile(join(__dirname, 'expected.css'), 'utf-8');
    resources(str, function() {return 1}).should.be.eql(expected);
  });

});
