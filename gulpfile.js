let gulp = require('gulp');
let server = require('gulp-webserver');
let Mock = require('mockjs');
let url = require('url');
let fs = require('fs');

Mock.Random.extend({
    status: function(date) {
        return this.pick(['WAIT','DOING',"END","SUMMARIZED"])
    }
});
Mock.Random.extend({
    location: function(date) {
        return this.pick(['棋牌室','老年活动中心',"宠物医院","广场"])
    }
});

gulp.task('server', function () {
    return gulp.src('./')
        .pipe(server({
            livereload: true,
            directoryListing: true,
            open: './entry.html',
            middleware: function (req, res, next) {

                let req_obj = url.parse(req.url, true);
                console.log(req_obj.query);
                let path = req_obj.pathname;
                if (path == '/admin/activity/getByCategory') {

                    var frame = {
                        "code": 1,
                        "msg": "SUCCESS",
                        "data": {
                            "recordsTotal": 2,  //总记录数
                            "data": [{
                                "id": 1,        //活动ID
                                "status": "WAIT",  //活动状态  WAIT: 未开始 DOING:进行中  END:已结束 SUMMARIZED:已总结
                                "name": "象棋大赛",   //活动名称
                                "imgPath": "",     //图片地址
                                "locationName": "棋牌室", //地点名称
                                "locationId": "1",   //地点id
                                "startDate": "",     //开始时间
                                "endDate": ""        //结束时间
                            }]
                        }
                    }

                    frame.data = Mock.mock({
                        'list|10': [{
                            "id|+1": 1,
                            "name": function () {
                                return Mock.mock('@cTitle')
                            },
                            "status":function () {
                                return Mock.mock('@status')
                            },
                            "imgPath":'',
                            "locationName": function () {
                                return Mock.mock('@location')
                            }, //地点名称
                            "locationId|+1": 1,   //地点id
                            "startDate": function () {
                                return Mock.mock('@date')
                            },     //开始时间
                            "endDate": function () {
                                return Mock.mock('@date')
                            }
                        }]
                    });
                    res.end(JSON.stringify(frame))
                }


                next()
            }
        }))
});



