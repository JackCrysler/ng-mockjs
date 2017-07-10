angular.module('app')
.directive('uploadImage',function ($http,$compile) {
    return {
        template:`<p><span><input type="text" placeholder="请输入栏目名称" ng-model="activityTitle"></span>
        <span class="text-primary" ng-click="addItem()">添加栏目</span></p>
        <label for="upload{{index}}" class="upload-file-wrap text-center">+</label>
        <input type="file" multiple id="upload{{index}}" class="upload-file-input">`,
        scope:{
            index:'@'
        },
        controller:function ($scope,$element) {
            let bg = $element.find('.upload-file-wrap')[0];
            let reader;
            $element.find('.upload-file-input')[0].onchange=function (e) {
                /*//上传图片
                var file = new FormData(this);
                $http.post('src/mock/entry.json',{data:file}).then(function (data) {
                    console.log(data)
                });*/
                let files = e.target.files;
                reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = function () {
                    bg.style.background = 'url('+this.result+')';
                    emitData();
                };
            };

            $scope.addItem = function () {
                $('.upload').append(
                    $compile(`<upload-image index="${$scope.index++}"></upload-image>`)($scope.$parent)
                )
            };

            $scope.$watch('activityTitle',function () {
                emitData();
            });

            function emitData() {
                if($scope.activityTitle&&reader&&reader.result){
                    $scope.$emit('activityInfo',{
                        title: $scope.activityTitle,
                        date: new Date()
                    })
                }
            }

        },
        link:function (scope,ele) {

        }
    }
});


