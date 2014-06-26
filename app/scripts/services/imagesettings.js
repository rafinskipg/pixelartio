'use strict';

angular.module('pixelartioApp')
  .provider('imageSettings', function () {

    // Private variables
    var currentColor = 'red';

    // Private constructor
    function Settings() {
      this.getColor = function () {
        return currentColor;
      };
    }

    // Public API for configuration
    this.setColor = function (color) {
      currentColor = color;
    };

    // Method for instantiating
    this.$get = function () {
      return new Settings();
    };
  });
