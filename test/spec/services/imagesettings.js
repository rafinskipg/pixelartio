'use strict';

describe('Service: imageSettings', function () {

  // load the service's module
  beforeEach(module('pixelartioApp'));

  // instantiate service
  var imageSettings;
  beforeEach(inject(function (_imageSettings_) {
    imageSettings = _imageSettings_;
  }));

  it('should do something', function () {
    expect(!!imageSettings).toBe(true);
  });

});
