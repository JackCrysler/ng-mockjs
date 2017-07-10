let app = angular.module('app',['ui.router']);
app.run(function ($rootScope,$state,$transitions) {
    $transitions.onStart({
        to:function (a) {
            console.log(a.name)
            $rootScope.path = a.name
        }
    })

});