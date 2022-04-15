$(function() {
    'use strict';
    var newObj = {};
    newObj.right_percent = [];
    init();

    function init() {
        initObj();
        newObj.getExamFull();

        $('#btn-set').on('click', function(e) {
            e.preventDefault();
            $.blockUI({
                message: $('.confirm-modal'),
                onOverlayClick: $.unblockUI(),
                css: {
                    top: '20%',
                    left: '50%',
                    marginLeft: '-30%',
                    width: "60%",
                    cursor: '',
                    border: 'none',
                    'border-top-left-radius':'.3rem',
                    'border-top-right-radius':'.3rem',
                    'text-align':'left'
                },
            });
        });

        $('.close').on('click',function(e){
            $.unblockUI();
        });

        $('#btn-confirm').on('click', function(e) {
            e.preventDefault();

            setRangeColor();

            $.unblockUI();
        });

    }

    function initObj() {

        newObj.getExamFull = function() {
            $.ajax({
                url: '/admin/banwu/get-exam-full?id='+bs.getUrlVar('id'),
                type: 'GET',
                success: function(res) {
                    newObj.testdata=res;

                    if (res.taskStatus==1) {
                        location.replace('/admin/banwu/examstate?id='+bs.getUrlVar('id'));
                    }
                    $('#task-name').text(res.task_name);
                    $('#start-at').text(res.start_at);
                    $('#end-at').text(res.end_at);

                    $('#bar-avg').attr('aria-valuenow',res.avg_score);
                    $('#bar-avg').attr('style','width:'+res.avg_score+'%');
                    $('#bar-avg').text(res.avg_score);

                    $('#bar-attend').attr('aria-valuenow',res.attend_percent);
                    $('#bar-attend').attr('style','width:'+res.attend_percent+'%');
                    $('#bar-attend').text(res.attend_percent+'%');

                    $('#bar-costsec').attr('aria-valuemax',res.stu_costsec_sum);
                    $('#bar-costsec').attr('aria-valuenow',res.avg_costsec);
                    $('#bar-costsec').attr('style','width:'+res.stu_costsec_percent+'%');
                    var showsec= res.avg_costsec;
                    var shotime= parseInt(res.avg_costsec/60)+'分'+parseInt(res.avg_costsec)%60+'秒';
                    $('#bar-costsec').text(showsec+'（'+shotime+'）');

                    var knowledge_weak_ary = res.knowledge_weak_ary;
                    //依正答率由低到高排序
                    knowledge_weak_ary = knowledge_weak_ary.sort(function(a, b) {
                        return a.right_percent - b.right_percent;
                    });

                    var right_percent_ary=[];
                    var knowledge_name_ary=[];
                    right_percent_ary.push('答對率');
                    $.each(knowledge_weak_ary,function(key,item){
                        right_percent_ary.push(item.right_percent);
                        knowledge_name_ary.push(item.knowledge_name);
                        newObj.right_percent.push(item.right_percent);
                    });

                    // 成績分佈圖
                    c3.generate({
                        bindto: '#score-chart',
                        data: {
                            columns: [
                              res.score_ary
                            ],
                            types: {
                                '人數': 'bar'
                            },
                            colors: {
                                '人數': '#77c949'
                          }
                        },
                        bar: {
                          width: {
                            ratio: 0.5 // this makes bar width 50% of length between ticks
                          }
                        },
                        axis: {
                            // rotated: true,
                            x: {
                              type: 'categorized',
                              tick:{
                                multiline:false
                              },
                              categories:[
                               '0~10',
                               '11~20',
                               '21~30',
                               '31~40',
                               '41~50',
                               '51~60',
                               '61~70',
                               '71~80',
                               '81~90',
                               '91~100'
                              ]
                            },
                            y:{
                              tick: {
                                values: ['0','5','10','15','20','25','30']
                              }
                            }
                        }
                    });

                    // 知識分析
                    c3.generate({
                        bindto: '#knowledge-chart',
                        data: {
                            columns: [
                              right_percent_ary
                            ],
                            types: {
                                '答對率': 'bar'
                            },
                            colors: {
                                '答對率': '#77c949'
                          }
                        },
                        bar: {
                          width: {
                            ratio: 0.5 // this makes bar width 50% of length between ticks
                          }
                        },
                        axis: {
                            rotated: true,
                            x: {
                              type: 'categorized',
                              tick:{
                                multiline:false
                              },
                              categories:knowledge_name_ary
                            },
                            y:{
                              tick: {
                                    format: function (d) { return d + "%"; }
                              },
                              max:91
                            }
                        }
                    });

                    setRangeColor();

                },
                error: bs.errorHandler
            });
        }

    }

    // 換色
    function setRangeColor() {
        var from=40;
        var to=60;

        var saveResult = function(data) {
            from = data.from;
            to = data.to;
            writeResult(data);
        };

        var writeResult = function(data) {
            $.each(newObj.right_percent, function(key, item) {
                var bar_class = '';
                if (item > data.to) {
                    bar_class = 'bar_green';
                } else if (item >= data.from && item <= data.to) {
                    bar_class = 'bar_orange';
                } else {
                    bar_class = 'bar_red';
                }
                $('#knowledge-chart .c3-chart-bars .c3-shape-'+key).removeClass('bar_green').removeClass('bar_orange').removeClass('bar_red').addClass(bar_class);
            });
        };

        $("#right-percent").ionRangeSlider({
            type: "double",
            grid: true,
            min: 0,
            max: 100,
            from: from,
            to: to,
            onStart: function(data) {
                saveResult(data);
            },
            onChange: saveResult,
            onFinish: saveResult
        });

    }
});
