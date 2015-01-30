'use strict';

var css = require('css');
var re = /url\(["\']?(.*?)["\']?\)/gi;

module.exports = function(str, fn) {
  if (str instanceof Buffer) str = str.toString();

  var ast = css.parse(str);
  var rules = ast.stylesheet.rules;
  var ret = [];

  rules.forEach(function(rule) {
    if (!rule.declarations) return;
    rule.declarations.forEach(function(d) {
      var m;
      var found = [];
      while (m = re.exec(d.value)) {
        found.push({
          property: d.property,
          string: m[0],
          path: m[1]
        });
      }
      if (fn) {
        found.forEach(function(f) {
          d.value = d.value.replace(f.string, fn(f));
        });
      }
      ret = ret.concat(found);
    });
  });

  if (fn) {
    if (ret.length) {
      return css.stringify(ast);
    } else {
      return str;
    }
  } else {
    return ret;
  }
};
