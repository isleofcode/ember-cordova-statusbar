/*jshint node:true*/
var awaitCommand = require('../../lib/await-command');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  description: 'Installs the cordova statusbar plugin',

  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
    var checker = new VersionChecker(this);
    var dep = checker.for('ember-platform-cordova', 'npm');
    if (!dep.version) {
      throw new Error("ember-cordova-keyboard requires ember-platform-cordova.");
    }
    return awaitCommand('ember cordova plugin add cordova-plugin-statusbar --save');
  }
};
