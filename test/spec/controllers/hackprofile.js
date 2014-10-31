'use strict';

describe('Controller: HackprofileCtrl', function () {

  // load the controller's module
  beforeEach(module('hackproApp'));

  var HackprofileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HackprofileCtrl = $controller('HackprofileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
