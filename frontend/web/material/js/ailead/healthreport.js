$(function() {
    "use strict";
    var newObj = {};
    newObj.complete_count = 0;
    init();

    function init() {
        //暫時不用FireShot
        // Set this to *false* to avoid addon auto-installation if missed.
        // FireShotAPI.AutoInstall = true;
        // document.addEventListener("DOMContentLoaded", checkAvailability);
        // var myInterval = setInterval(function(){
        //     if (FireShotAPI.isAvailable()) {
        //         clearInterval(myInterval);
        //         $('.fsapi-check').hide();
        //     }
        //     else {
        //         if(typeof(FireShotAPI)!= "undefined")
        //         {
        //             clearInterval(myInterval);
        //             $('.fsapi-check').show();
        //         }
        //     }
        // },1000);

        getHealthResult();
        getHealthUserInfo();
        getHealthResultKnowledge();
        getHealthResultSpeed();
        getHealthResultRight();
        getHealthResultWrong();
        gettype();

        $('#btn-complete').on('click', function(e) {
            e.preventDefault();
            if (newObj.usertype==0){
                location.href='/admin';
            }else{
                location.href = '/admin/knowhow/list';
            }

        });

        //暫時不用FireShot
        // $('#btn-full').on('click', function(e) {
        //     e.preventDefault();
        //     createFullResult('pdf');
        // });

        $('#btn-full-print').on('click', function(e) {
            e.preventDefault();
            createFullResult('print');
        });

        //暫時不用FireShot
        // $('#btn-simple').on('click', function(e) {
        //     e.preventDefault();
        //     createSimpleResult('pdf');
        // });

        $('#btn-simple-print').on('click', function(e) {
            e.preventDefault();
            createSimpleResult('print');
        });

        if (bs.getUrlVar('type')) {
            var myInterval =
                setInterval(
                    function() {
                        bs.disableSubmits(true);
                        if (newObj.complete_count >= 5) {
                            clearInterval(myInterval);
                            bs.disableSubmits(false);
                            createResult();
                        }
                    }, 1000
                );
        }
    }

    function gettype(){
        $.ajax({
            url:'/admin/knowhow/check-usertype',
            type:'GET',
            success: function(res){
             newObj.usertype=res;
            },error:bs.errorHandler
        })
    }

    function getHealthResult() {
        $.ajax({
            url: '/admin/knowhow/get-healthresult?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }

                var data = res.data;

                $('#exam-created').html('測驗日期 '+data.created_at);
                $('#grade-id').html(data.grade_id);
                $('#subject-name').html(data.subject_name);
                $('#factory-name').html(data.factory_name);
                $('#quiz-count').html(data.quiz_count+' 題');

                var shotime= parseInt(data.costsec/60)+'分'+parseInt(data.costsec)%60+'秒';
                $('#costsec-times').html(shotime);
                $('#all-score').html(data.allscore+' 分');
                var score=data.allscore;

                var score_config = {
                    type: 'horizontalBar',
                    data: {
                        labels: ["測驗成績"],
                        datasets: [{
                            label: data.user_name,
                            backgroundColor: "rgb(255,157,157)",
                            hoverBackgroundColor: "rgb(255,114,142)",
                            data: [score],
                        }, ]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                };

                 // var ctx = $('#score-chart').get(0).getContext("2d");
                 // new Chart(ctx, score_config);

                var score_progress_html='';

                score_progress_html+='<div class="progress">';
                score_progress_html+=' <div class="progress-bar-red" role="progressbar" aria-valuenow="'+score+'" aria-valuemin="0" aria-valuemax="100" style="width: '+score+'%" ></div>';
                score_progress_html+='</div>';
                $('#score-progress').html(score_progress_html);



                // var inner_html = '';
                // inner_html +=
                //     '<tbody>\
                //     <tr><td>日期</td><td>' + data.created_at + '</td></tr>\
                //     <tr><td>年級</td><td>' + data.grade_id + '</td></tr>\
                //     <tr><td>科目</td><td>' + data.subject_name + '</td></tr>\
                //     <tr><td>版本</td><td>' + data.factory_name + '</td></tr>\
                //     <tr><td>難易度</td><td>' + '自選難易度' + '</td></tr>\
                //     <tr><td>題數</td><td>' + data.quiz_count + '</td></tr>\
                //     <tr><td>時間</td><td>' + data.exam_times + '(分)</td></tr>\
                //     <tr><td>得分</td><td>' + data.allscore + '</td></tr>\
                //   </tbody>';

               // $('#table-info').empty().html(inner_html);
                var logo=(data.logo)? data.logo :'/admin/material/images/logo.png';
                $('#img-logo').attr('src',logo);
                $('#strong-username').text(data.user_name);
                $('#strong-viewname').text(data.viewname);
                $('#strong-phone').text(data.phone);
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    };

    function getHealthUserInfo(){
        var dataObj={};
        dataObj.uid=bs.getUrlVar('uid');
        $.ajax({
            url: '/admin/knowhow/get-health-user-info',
            type: 'Post',
            data:dataObj,
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }

                var stu_name=res.data.stu_name;
                var stu_school=res.data.stu_school;
                var stu_class=res.data.stu_class;
                var stu_grade_code=res.data.stu_grade_code;
                $('#txt-stu-name').html('');
                $('#txt-stu-school').html('');
                $('#txt-stu-grade-code').html('');
                $('#txt-stu-class').html('');
                $('#txt-stu-name').html(stu_name);
                $('#txt-stu-school').html(stu_school);
                $('#txt-stu-grade-code').html(stu_grade_code);
                $('#txt-stu-class').html(stu_class);


            },
            error: bs.errorHandler
        });

    }

    function getHealthResultKnowledge() {
        $.ajax({
            url: '/admin/knowhow/get-healthresult-knowledge?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            success: function(res) {
                var msg = res.message;
                var subject_code = res.subject_code;
                var data = res.data;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }




                //計算知識點的等級並統計
                var level_C=0;
                var level_B=0;
                var level_A=0;

                var level_C_knowledge_html='';
                var level_B_knowledge_html='';
                var level_A_knowledge_html='';

                $.each(data, function(key, item) {

                    if (item.right_percent<60){
                        level_C=level_C+1;

                        //知識分析待加強
                        level_C_knowledge_html+='<div class="inline-font-16-px">';
                        level_C_knowledge_html+=item.knowledge_name;
                        level_C_knowledge_html+='</div>';
                        var right_count=parseInt(item.right_count_sum);
                        var wrong_count=parseInt(item.wrong_count_sum);
                        var all_quiz_count=right_count+wrong_count;
                        var know_percent = Math.round((right_count / all_quiz_count) * 100);
                        level_C_knowledge_html+='<div class="progress inline-margin-bottom" >';
                        level_C_knowledge_html+='<div class="progress-bar-red" role="progressbar" aria-valuenow="'+right_count+'" aria-valuemin="0" aria-valuemax="'+all_quiz_count+'" style="width: '+know_percent+'%;" >';
                        level_C_knowledge_html+='<div style="display:inline-block;">' + right_count + '/' + all_quiz_count + '</div>';
                        level_C_knowledge_html+='</div>';
                        level_C_knowledge_html+='</div>';

                    }else if (item.right_percent>61 && item.right_percent<80){
                        level_B=level_B+1;

                        //知識分析基礎
                        level_B_knowledge_html+='<div class="inline-font-16-px">';
                        level_B_knowledge_html+=item.knowledge_name;
                        level_B_knowledge_html+='</div>';
                        var right_count=parseInt(item.right_count_sum);
                        var wrong_count=parseInt(item.wrong_count_sum);
                        var all_quiz_count=right_count+wrong_count;
                        var know_percent = Math.round((right_count / all_quiz_count) * 100);
                        level_B_knowledge_html+='<div class="progress inline-margin-bottom" >';
                        level_B_knowledge_html+='<div class="progress-bar-green" role="progressbar" aria-valuenow="'+right_count+'" aria-valuemin="0" aria-valuemax="'+all_quiz_count+'" style="width: '+know_percent+'%;" >';
                        level_B_knowledge_html+='<div style="display:inline-block;">' + right_count + '/' + all_quiz_count + '</div>';
                        level_B_knowledge_html+='</div>';
                        level_B_knowledge_html+='</div>';

                    }else if (item.right_percent>81){
                        level_A=level_A+1;

                        //知識分析精熟
                        level_A_knowledge_html+='<div class="inline-font-16-px">';
                        level_A_knowledge_html+=item.knowledge_name;
                        level_A_knowledge_html+='</div>';
                        var right_count=parseInt(item.right_count_sum);
                        var wrong_count=parseInt(item.wrong_count_sum);
                        var all_quiz_count=right_count+wrong_count;
                        var know_percent = Math.round((right_count / all_quiz_count) * 100);
                        level_A_knowledge_html+='<div class="progress inline-margin-bottom" >';
                        level_A_knowledge_html+='<div class="progress-bar-purple" role="progressbar" aria-valuenow="'+right_count+'" aria-valuemin="0" aria-valuemax="'+all_quiz_count+'" style="width: '+know_percent+'%;" >';
                        level_A_knowledge_html+='<div style="display:inline-block;">' + right_count + '/' + all_quiz_count + '</div>';
                        level_A_knowledge_html+='</div>';
                        level_A_knowledge_html+='</div>';


                    }

                });

                $('#level-C-knowledge-weak').html(level_C_knowledge_html);
                $('#level-B-knowledge-weak').html(level_B_knowledge_html);
                $('#level-A-knowledge-weak').html(level_A_knowledge_html);


                var labels= ['待加強(未滿60%)','基礎(60~80%)','精熟(超過80%)'];

                var ctx = document.getElementById('canvasPie').getContext('2d');





                var pieChart = new Chart(ctx, {
                    type: 'pie',
                    data : {
                        labels:labels,

                        datasets: [{
                            //預設資料
                            data:[level_C,level_B,level_A],
                            backgroundColor: [
                                //資料顏色
                                "#d00000",
                                "#bbff98",
                                "#d7a7ff"
                            ],
                        }],
                    },
                    options: {
                        plugins:{
                            legend: {
                                display: true,
                                position:"right" // 圖示位置
                            },
                        }
                    },

                });



                // if (subject_code == 'C0' || subject_code == 'E0') {
                //     var keyword_name_ary = res.keyword_name_ary;
                //     var keyword_value_ary = res.keyword_value_ary;
                //
                //
                //
                //     var radarChart = {
                //         labels: keyword_name_ary,
                //         datasets: [
                //             {
                //                 backgroundColor: "rgba(103, 168, 228, 0.2)",
                //                 borderColor: "#67a8e4",
                //                 pointBackgroundColor: "#67a8e4",
                //                 pointBorderColor: "#fff",
                //                 pointHoverBackgroundColor: "#fff",
                //                 pointHoverBorderColor: "#67a8e4",
                //                 data: keyword_value_ary
                //             }
                //         ]
                //     };
                //
                //     var chartOptions = {
                //         scale: {
                //             ticks: {
                //                 beginAtZero: true,
                //                 min: 0,
                //                 max: 3,
                //                 stepSize: 1,
                //                 maxTicksLimit: 5
                //             },
                //             pointLabels: {
                //                 fontSize: 18
                //             }
                //         },
                //         legend: {
                //             display: false
                //         }
                //     };
                //
                //     var ctx = $('#keyword-chart').get(0).getContext("2d");
                //     new Chart(ctx, {
                //         type: 'radar',
                //         data: radarChart,
                //         options: chartOptions
                //     });
                //
                //     var inner_html = '';
                //     inner_html += '<thead class="thead-light"><tr><th class="text-nowrap">知識項度</th><th>說明</th></tr></thead>';
                //     $.each(data, function(key, item) {
                //         inner_html +=
                //             '<tr><td>' + item.knowledge_name + '</td><td>' + item.knowledge_explain + '</td></tr>';
                //     });
                //     $('#keyword-explain').empty().html(inner_html);
                //     $('#knowledge-strict').remove();
                //
                //
                //
                //
                //
                // } else {
                //
                //     var right_percent_ary = [];
                //     var knowledge_name_ary = [];
                //     right_percent_ary.push('答對率');
                //     $.each(data, function(key, item) {
                //         right_percent_ary.push(item.right_percent);
                //         knowledge_name_ary.push(item.knowledge_name);
                //     });
                //     //knowledge-chart
                //     c3.generate({
                //         size: {
                //             height: '600'
                //         },
                //         bindto: '#knowledge-chart',
                //         data: {
                //             columns: [
                //                 right_percent_ary
                //             ],
                //             types: {
                //                 '答對率': 'bar'
                //             },
                //             colors: {
                //                 '答對率': '#77c949'
                //             },
                //             labels: true
                //         },
                //         bar: {
                //             width: {
                //                 ratio: 0.5 // this makes bar width 50% of length between ticks
                //             }
                //         },
                //         axis: {
                //             rotated: true,
                //             x: {
                //                 type: 'categorized',
                //                 tick: {
                //                     multiline: false
                //                 },
                //                 categories: knowledge_name_ary
                //             },
                //             y: {
                //                 tick: {
                //                     format: function(d) {
                //                         return d + "%";
                //                     }
                //                 },
                //                 max: 93
                //             }
                //         }
                //     });
                //
                //     $('#keyword-strict').remove();
                // }

                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getHealthResultSpeed() {
        $.ajax({
            url: '/admin/knowhow/get-healthresult-speed?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }

                $('#total-costsec').text(parseInt(res.total_costsec / 60) + '分' + parseInt(res.total_costsec) % 60 + '秒');
                $('#fast-anscount').text(res.fast_ans_count + ' 題');
                $('#slow-anscount').text(res.slow_ans_count + ' 題');
                $('#fast-quiz').text(res.fast_tick_ary);
                $('#slow-quiz').text(res.slow_tick_ary);

                var ans_right_ary = res.ans_right_ary;
                var ans_wrong_ary = res.ans_wrong_ary;
                var tick_ary = res.tick_ary;


                var fast_right_count=0;
                var fast_wrong_count=0;
                var slow_right_count=0;
                var slow_wrong_count=0;

                $.each(ans_right_ary, function(key, item) {

                     const slow_check = /\-\d+/;
                     const fast_check = /\d+/;
                     const zero_check=/0/;
                    if (slow_check.test(item)==true || zero_check.test(item)==true ){
                        slow_right_count=slow_right_count+1;
                    }else if ( fast_check.test(item)==true){
                        fast_right_count=fast_right_count+1;
                    }



                });




                $.each(ans_wrong_ary, function(key, item) {
                    const slow_check = /\-\d+/;
                    const fast_check = /\d+/;
                    const zero_check=/0/;
                    if (slow_check.test(item)==true || zero_check.test(item)==true){
                        slow_wrong_count=slow_wrong_count+1;

                    }else if ( fast_check.test(item)==true){
                        fast_wrong_count=fast_wrong_count+1;
                    }


                });






                const labels = ["快答題","慢答題"];
                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: '作答正確',
                            data: [fast_right_count,slow_right_count],
                            backgroundColor: "#d7a7ff",
                        },
                        {
                            label: '作答錯誤',
                            data: [fast_wrong_count,slow_wrong_count],
                            backgroundColor: "#d00000",
                        },

                    ]
                };


                const answer_speed_config = {
                    type: 'bar',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: true,
                                position:"bottom", // 圖示位置

                                },
                        },
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }
                };

                 var ctx = $('#answer-speed-canavas').get(0).getContext("2d");
                 new Chart(ctx, answer_speed_config);


                // speed-chart
                // c3.generate({
                //     bindto: '#speed-chart',
                //     data: {
                //         columns: [
                //             ans_wrong_ary,
                //             ans_right_ary
                //         ],
                //         groups: [
                //             ['作答正確', '作答錯誤']
                //         ],
                //         type: 'bar',
                //         colors: {
                //             '作答正確': '#007bff',
                //             '作答錯誤': '#DCDCDC'
                //         }
                //     },
                //     bar: {
                //         width: {
                //             ratio: 0.1 // this makes bar width 50% of length between ticks
                //         }
                //     },
                //     grid: {
                //         y: {
                //             lines: [{
                //                 value: 0
                //             }]
                //         }
                //     },
                //     axis: {
                //         // rotated: true,
                //         x: {
                //             type: 'categorized',
                //             tick: {
                //                 multiline: false
                //             },
                //             categories: tick_ary
                //         },
                //         y: {
                //             tick: {
                //                 values: ['0', '30', '60', '90']
                //             }
                //         }
                //     }
                // });
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getHealthResultRight() {
        $.ajax({
            url: '/admin/knowhow/get-healthresult-right?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }

                $('#total-quizcount').text(res.quiz_count);
                $('#right-quizcount').text(res.right_count);
                $('#wrong-quizcount').text(res.wrong_count);
                $('#ans-ratio').text(res.wrong_count + ' / ' + res.quiz_count);
                $('#quiz-right').text(res.right_tick_ary);
                $('#quiz-wrong').text(res.wrong_tick_ary);
                var ans_right_ary = res.ans_right_ary;
                var ans_wrong_ary = res.ans_wrong_ary;
                var tick_ary = res.tick_ary;
                var notice_tick_ary =res.notice_tick_ary;


                // right-chart
                c3.generate({
                    bindto: '#right-chart',
                    data: {
                        columns: [
                            notice_tick_ary,
                            ans_wrong_ary,
                            ans_right_ary,
                        ],
                        groups: [
                            ['作答正確', '作答錯誤','需注意（全國答對率高於80%，應試學生卻作答錯誤的題目)']
                        ],
                        type: 'bar',
                        colors: {
                            '作答正確': '#007bff',
                            '作答錯誤': '#DCDCDC',
                            '需注意（全國答對率高於80%，應試學生卻作答錯誤的題目)':'#d00000'
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
                            type: 'categorized',//分類排序
                            tick: {
                                multiline: false
                            },
                            categories: tick_ary
                        },
                        y: {
                            tick: {
                                format: function(d) {
                                    return d + "%";
                                }
                            },
                            max: 91
                        }
                    }
                    ,
                    grid: {
                        x: {
                            show: false
                        },
                        y: {
                            show: true
                        }
                    }
                });



                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getHealthResultWrong() {
        $.ajax({
            url: '/admin/knowhow/get-healthresult-wrong?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/knowhow');
                    }, 1000);
                    return false;
                }

                var data = res.data;
                var inner_html = '';
                $.each(data, function(key, item) {
                    var no = parseInt(item.origin_idx) + 1;
                    var qg = item.quizList.qg;
                    var qg_html=(qg)?'<div style="text-align:left;margin-top:10px"><img  class="img-fluid" src="' + qg + '"></div>':'';
                    var qa = item.quizList.qa;
                    var aa = item.quizList.aa;
                    var quiz_difficulty_name = item.quizList.quiz_difficulty_name;
                    var quiz_ans = item.quizList.sa;
                    var user_ans = item.user_ans;
                    var showtime = ('0' + parseInt(item.costsec / 60)).slice(-2) + ':' + ('0' + parseInt(item.costsec % 60)).slice(-2);
                    var need_check=item.quizList.need_check;
                    var need_check_str='';
                    if (need_check==1){
                        need_check_str='有'
                    }else{
                        need_check_str='無'
                    }

                    inner_html+='<tr>';
                    inner_html+='<td rowspan="3">'+no+'</td>'
                    inner_html+='<td>'+quiz_difficulty_name+'</td>';
                    inner_html+='<td class="red_font">'+quiz_ans+'</td>';
                    inner_html+='<td>'+user_ans+'</td>';
                    inner_html+='<td>'+showtime+'</td>';
                    inner_html+='<td>'+need_check_str+'</td>';
                    inner_html+='</tr>';
                    inner_html+='<tr>';
                    inner_html+='<td colspan="5">'+qg_html+'<div style="text-align:left;margin-top:10px"><img  class="img-fluid" src="' + qa + '"></div></td>';
                    inner_html+='</tr>';
                    inner_html+='<tr>';
                    inner_html+='<td colspan="5"><div style="text-align:left;margin-top:10px"><img  class="img-fluid" src="' + aa + '"></div></td>';
                    inner_html+='</tr>';









                    // inner_html +=
                    //     '<tr>\
                    //   <td>' + no + '</td>\
                    //   <td>\
                    //     <h5 style="text-align:left">題目</h5>\
                    //     '+qg_html+'\
                    //     <div style="text-align:left;margin-top:10px"><img  class="img-fluid" src="' + qa + '"></div>\
                    //     <br>\
                    //     <h5 style="text-align:left">解析</h5>\
                    //     <div style="text-align:left;margin-top:10px"><img  class="img-fluid" src="' + aa + '"></div>\
                    //   </td>\
                    //   <td>' + quiz_difficulty_name + '</td>\
                    //   <td>' + quiz_ans + '</td>\
                    //   <td>' + user_ans + '</td>\
                    //   <td>' + showtime + '</td>\
                    //   <td>N</td>\
                    //  </tr>';
                });

                $('#table-wrong').empty().html(inner_html);
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function printResult() {

        // var doc = new jsPDF();
        // //

        // // img.crossOrigin = '';
        // doc.fromHTML(source,15,15);
        // // doc.text(20, 20, 'Welcome to hangge.com');
        // doc.save('Test.pdf');
        // var doc = new jsPDF();
        // var dataURL;
        // html2canvas(source, {
        //     useCORS: true,
        //     logging: true,
        //     width: 1200,
        //     height: 1200
        // }).then(canvas => {
        //     document.body.appendChild(canvas);
        //     $("canvas").hide();
        //     dataURL = canvas.toDataURL("image/png");
        //     doc.addImage(dataURL, 'JPEG', 15, 40, canvas.width, canvas.height);
        //     doc.save('test.pdf');
        // });
        // var elementLength = $(".h-report").length;
        // var lableDivLength = 0;
        // var sources = window.document.getElementsByClassName("h-report");
        // var dataURL;
        // var pdf = new jsPDF('p','pt','a4');
        // $.each(sources,function(key,item){
        //     html2canvas(item).then(canvas => {
        //         dataURL = canvas.toDataURL("image/jpeg");
        //         pdf.addImage(dataURL, 'JPEG', 50, 50, 400, 400);
        //         pdf.addPage();
        //         lableDivLength ++;
        //     });
        // });
        //
        //
        // var myInterval =setInterval(function(){
        //        if(lableDivLength == elementLength){
        //            clearInterval(myInterval);
        //            pdf.save('bonsontest.pdf');
        //        }
        //    },1000);

        // var doc = new jsPDF();
        // doc.addHtml(document.body);
        // doc.save('bonson.pdf');
        // var sources = window.document.getElementsByClassName("h-report");

        // var pdf = new jsPDF('p', 'px', 'a4');
        // pdf.addFont("msjh-normal.ttf", "msjh", "normal");
        // pdf.setFont('msjh');
        // pdf.setFontSize(16);
        // pdf.text(10, 20, '感謝您完成試卷，這份評估報告針對您目前知識學習的現況分析如下：本報告書');
        // pdf.text(10, 40, '將分成五個部份，分別是【測驗內容】、【知識分析】、【答題速度】、');
        // pdf.text(10, 60, '【答對比例】、【錯題解析】； 透過這五項指標，我們可以得知您目前的學習');
        // pdf.text(10, 80, '狀況，更重要的是老師將在未來求學的過程中幫您「加強與補弱」，針對弱點單');
        // pdf.text(10, 100, '元與能力加強，而減少不必要的時間浪費在重複的練習上。不論您目前的學習狀');
        // pdf.text(10, 120, '況如何，我們都相信有效的學習會幫助您迎向未來！');
        // pdf.setFontSize(24);
        // pdf.setFontType('bold');
        // pdf.text(10, 160, '知識健檢報告');
        // pdf.setFontSize(16);
        // pdf.setFontType('normal');
        // pdf.text(10, 200, '本班每位學生都會有如下的學習紀錄與分析，每位學生學習成效一目了然，針對');
        // pdf.text(10, 220, '個人弱點加強補救');
        // pdf.setFontSize(20);
        // pdf.setFontType('bold');
        // pdf.text(10, 250, '一、測驗內容');
        //
        // var source = window.document.getElementsByClassName("h-report")[0];
        // var flag=1;
        // var dataURL='';
        // html2canvas(source, {
        //     useCORS: true,
        //     logging: true
        // }).then(canvas => {
        //     dataURL = canvas.toDataURL("image/png");
        //     pdf.addImage(dataURL, 'JPEG', 15, 40, canvas.width, canvas.height);
        //     pdf.save('test.pdf');
        // });
        //
        // var myInterval = setInterval(function() {
        //     if (flag == 0) {
        //         clearInterval(myInterval);
        //     }
        // }, 1000);

        // pdf.addPage();
        // pdf.text(10,160,'');


        // pdf.addHTML(sources, function() {
        //     pdf.addPage();
        //
        // });

        // sources = $('#bbb');

    }

    function createResult() {
        if (bs.getUrlVar('type') === 'full') {
            createFullResult('print');
        } else if (bs.getUrlVar('type') === 'simple') {
            createSimpleResult('print');
        }
    }

    function createFullResult(mode) {
        if(mode == 'print'){
            $('header').hide();
            $('.logo-strict').show();
            $('.no-print').hide();
            $('footer').hide();
            //$("p").css("background-color", "yellow");
            window.print();
            $('header').show();
            $('.logo-strict').hide();
            $('.no-print').show();
            $('footer').show();
        }else if(mode == 'pdf'){
            if(checkFSAPI('pdf')){
                prepareReport('full');
                FireShotAPI.printPage(true);
                recoverView('full');
            }
        }
    }

    function createSimpleResult(mode) {
        if(mode == 'print'){
            $('header').hide();
            $('.logo-strict').show();
            $('.no-print').hide();
            $('.wrong-strict').hide();
            $('footer').hide();
            window.print();
            $('header').show();
            $('.logo-strict').hide();
            $('.no-print').show();
            $('.wrong-strict').show();
            $('footer').show();
        }else if(mode == 'pdf'){
            if(checkFSAPI('pdf')){
                prepareReport('simple');
                FireShotAPI.printPage(true);
                recoverView('simple');
            }
        }
    }

    function checkAvailability() {
        // We need to wait a little bit for the FS API initialization.
        setTimeout(function() {
            FireShotAPI.checkAvailability();
        }, 1000);
    }

    function prepareReport(mode){
        $('.wrapper').attr('style', 'background: #ffffff; padding: 0');
        $('.card').attr('style', 'box-shadow: none');
        $('body').addClass('p-0');
        $('header').hide();
        $('.preloader').hide();
        $('.page-title-box').hide();
        $('.logo-strict').show();
        $('.no-print').hide();
        if(mode == 'simple'){
            $('.wrong-strict').hide();
        }else if(mode == 'full'){
            //do nothing
        }
        $('footer').hide();
    }

    function recoverView(mode){
        setTimeout( function() {
            $('.wrapper').removeAttr('style');
            $('.card').attr('style', 'box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.05)');
            $('body').removeClass('p-0');
            $('header').show();
            $('.preloader').show();
            $('.page-title-box').show();
            $('.logo-strict').hide();
            $('.no-print').show();
            if(mode == 'simple'){
                $('.wrong-strict').show();
            }else if(mode == 'full'){
                //do nothing
            }
            $('footer').show();
        }, 15000);
    }

    function checkFSAPI(mode) {
        if (typeof (FireShotAPI) != "undefined" && FireShotAPI.isAvailable()){
            $('.fsapi-check').hide();
            return true;
        }else{
            $('.fsapi-check').show();
            if(mode == 'pdf'){
                if(confirm("請在瀏覽器上安裝FireShot以進行PDF轉換")){
                    window.open("https://chrome.google.com/webstore/detail/take-webpage-screenshots/mcbpblocgmgfnpjjppndjkmgjaogfceg", '_blank');
                }
            }
            return false;
        }
    }
});
