angular.module('app')
    .directive('sideList',function () {
        return {
            template:`<div class="side-list-wrap"></div>`,
            scope:{
                data:'='
            },
            controller:function ($scope,$element,$compile) {
                let tpl1='';
                angular.forEach($scope.data,function (value,index) {
                    tpl1+=`<div>
                    <p class="" data-target="#${value.type}" data-toggle="collapse">${value.name}</p>
                    <ul class="collapse" id="${value.type}">
                        ${
                            function () {
                                let tpl2 = '';
                                angular.forEach(value.submenus,function (v,i) {
                                    tpl2+=`<li ui-sref="index.${v.subType}({id:${v.id}})">${v.name}</li>`
                                });   
                                return tpl2
                            }()
                        }
                    </ul>
                    </div>`
                });

                let tplDom = $compile(tpl1)($scope);

                tplDom.find('.collapse').on('show.bs.collapse',function () {
                    tplDom.find('.collapse').collapse('hide')
                });

                $element.find('.side-list-wrap').append(tplDom);

            }
        };
    });
