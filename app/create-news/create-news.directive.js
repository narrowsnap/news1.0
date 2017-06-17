/**
 * Created by richard on 17-6-17.
 */
angular.module('createNews')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {
                let model = $parse(attrs.fileModel);
                let modelSetter = model.assign;
                element.bind('change', function(event){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile();
                });
            }
        };
    }]);

angular.module('createNews')
    .factory('fileReader', ["$q", "$log", function($q, $log) {
        let onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        let onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        let getReader = function (deferred, scope) {
            let reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

        let readAsDataURL = function (file, scope) {
            let deferred = $q.defer();
            let reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    }]);