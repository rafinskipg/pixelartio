'use strict';

describe('Service: rafSrv', function () {

  // load the service's module
  beforeEach(module('pixelartioApp'));

  // instantiate service
  var rafSrv;
  beforeEach(inject(function (_rafSrv_) {
    rafSrv = _rafSrv_;
  }));

  it('should do something', function () {
    expect(!!rafSrv).toBe(true);
  });

});
