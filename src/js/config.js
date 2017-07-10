angular.module('app')
.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('index');

    $stateProvider
        .state({
            name:'index',
            url:'/index',
            templateUrl:'src/index.html',
            resolve:{
                 sideList:function ($http) {
                     return $http.get('mock/entry.json');
                 }
            },
            controller:'indexCtrl'
        })
        .state({
            name:'index.birthday',
            url:'/birthday?id',
            templateUrl:'src/pages/index.html',
            controller:'birthCtrl'
        })
        .state({
            name:'index.five',
            url:'/five?id',
            templateUrl:'src/pages/index.html'
        })
        .state({
            name:'index.birthday.common',
            url:'/common',
            templateUrl:'src/pages/common_service.html',
            controller:'commonCtrl'
        })
        .state({
            name:'index.birthday.simple',
            url:'/simple',
            template:'simple'
        })
        .state({
            name:'index.birthday.common.infomanage',
            url:'/infomanage',
            templateUrl:'src/pages/info_manage.html',
            controller:'imCtrl'
        })
        .state({
            name:'index.birthday.common.actmanage',
            url:'/actmanage',
            templateUrl:'src/pages/act_manage.html',
            controller:'actCtrl'
        })

});