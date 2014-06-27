'use strict';

describe('Service: imageGenerationSrv', function () {

  // load the service's module
  beforeEach(module('pixelartioApp'));

  // instantiate service
  var imageGenerationSrv;
  beforeEach(inject(function (_imageGenerationSrv_) {
    imageGenerationSrv = _imageGenerationSrv_;
  }));

  it('should do something', function () {
    expect(!!imageGenerationSrv).toBe(true);
  });

});
