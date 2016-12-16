'use strict';

angular.module('appBioinformaticaApp')
  .directive('ngFileModel', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.ngFileModel);
        var modelSetter = model.assign;
        element.bind('change', function () {
          var values = [];
          angular.forEach(element[0].files, function (item) {
            var value = {
              name: item.name,
              size: item.size,
              url: URL.createObjectURL(item),
              _file: item
            };
            values.push(value);
          });
          scope.$apply(function () { modelSetter(scope, values[0]); });
        });
      }
    }}]);

