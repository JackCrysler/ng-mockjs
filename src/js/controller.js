angular.module('app')
    .controller('indexCtrl', function ($scope, sideList, $http, $rootScope) {
        //请求侧边栏数据
        if (sideList.data.msg == 'SUCCESS') {
            $scope.sideList = sideList.data.data;
        }
    })
    .controller('commonCtrl', function ($state) {
        $state.go('index.birthday.common.infomanage', {})
    })
    .controller('birthCtrl', function ($stateParams, $rootScope) {
        $rootScope.currentId = $stateParams.id
    })
    .controller('imCtrl', function ($scope, $rootScope, $element, $http) {
        $http.get('mock/responsible.json').then(function (res) {
            $scope.responsiblelist = res.data.list
        });
        $http.get('mock/responsibleCom.json').then(function (res) {
            $scope.responsibleComlist = res.data.list
        });
        $element.find('.responsibleWrap').on('hide.bs.dropdown', function (e, a) {
            $(this).next('.responsible').val(a)
        });
        $element.find('.responsibleCompanyWrap').on('hide.bs.dropdown', function (e, a) {
            $(this).next('.responsibleCompany').val(a)
        });

        $scope.$on('activityInfo', function (e, data) {
            console.log(data)
        });

        $scope.saveAndPublic = function () {
            let ls = window.localStorage;
        }
    })
    .controller('actCtrl', function ($rootScope, $scope, $http,$element,$q) {

        $http.get('/admin/activity/getByCategory?count=1').then(function (data) {
            console.log(data.data);
            $scope.list = data.data.data.list
        });


        var options = {
            currentPage: 3,
            totalPages: 10,
            bootstrapMajorVersion:3,
            onPageChanged:function (e,o,n) {
                console.log(n)
                $http.get('/admin/activity/getByCategory?count='+n).then(function (data) {
                    console.log(data.data);
                    $scope.list = data.data.data.list
                });
            }
        };

        setTimeout(function () {
            $element.find('.myNav').bootstrapPaginator(options);
        },10);



        $scope.test = function () {

        }
    });