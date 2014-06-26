'use strict';

describe('Service: settingsSrv', function () {

  // load the service's module
  beforeEach(module('pixelartioApp'));

  // instantiate service
  var settingsSrv;
  beforeEach(inject(function (_settingsSrv_) {
    settingsSrv = _settingsSrv_;
  }));

  it('should do something', function () {
    expect(!!settingsSrv).toBe(true);
  });

});
