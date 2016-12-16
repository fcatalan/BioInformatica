'use strict';

angular.module('appBioinformaticaApp')
  .controller('MainCtrl', function ($scope) {

    $scope.files_names = [];

    $scope.add = function(item) {
      $scope.files_names.push({text: item.name});
    };

    $scope.initHtml = function () {
      $(function () {
        $scope.$upload_file = $('#upload_file').fileinput({showPreview: false});
        interactive();
      //   setTimeout(function () {
          eisen_plot();
      //   }, 1000);
      });
    };
    $scope.initHtml();

  });
