$(function() {
    'use strict';
    var newObj = {};
    newObj.quiz_state_ary = [];
    newObj.current_idx = 0;
    newObj.current_quiz_id = 0;
    newObj.checked_count = 0;
    newObj.need_count = 0;
    newObj.option_randstate=0;
    newObj.exam_times=0;
    newObj.costsec_flag;
    newObj.current_sec = 0;
    init();

    function init() {
        getHealthpaper();

        $('.prevQuiz').on('click', function(e) {
            if (newObj.current_idx == 0) {
                return false;
            } else {
                stopAddCostSec();
                setTimeout(startAddCostSec, 1000);
                var prevIdx = newObj.current_idx - 1;
                var prevQuizId = newObj.quiz_state_ary[prevIdx].quiz_id;
                newObj.current_idx = prevIdx;
                newObj.current_quiz_id = prevQuizId;
                getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                window.ART.blackBoard.switch(newObj.current_idx);
            }
            sendHealthresultPresave();
            checkArrowShow();
        });

        $('.nextQuiz').on('click', function(e) {
            if (newObj.current_idx == newObj.quiz_state_ary.length - 1) {
                return false;
            } else {
                stopAddCostSec();
                setTimeout(startAddCostSec, 1000);
                var nextIdx = newObj.current_idx + 1;
                var nextQuizId = newObj.quiz_state_ary[nextIdx].quiz_id;
                newObj.current_idx = nextIdx;
                newObj.current_quiz_id = nextQuizId;
                getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                window.ART.blackBoard.switch(newObj.current_idx);
            }
            sendHealthresultPresave();
            checkArrowShow();
        });

        $('#btnNeedCheck').on('click', function(e) {
            var current_idx = newObj.current_idx;
            var current_quiz_id = newObj.current_quiz_id;
            var need_count = newObj.need_count;

            if (newObj.quiz_state_ary[current_idx].need_check == 0) {
                newObj.quiz_state_ary[current_idx].need_check = 1;
                newObj.need_count = need_count != newObj.quiz_state_ary.length ? (++need_count) : need_count;
                $('.quizset[data-idx="' + current_idx + '"]').addClass('need-check');
            } else {
                newObj.quiz_state_ary[current_idx].need_check = 0;
                $('.quizset[data-idx="' + current_idx + '"]').removeClass('need-check');
                newObj.need_count = need_count != 0 ? (--need_count) : need_count;
            }
            sendHealthresultPresave();
        })

        $('#btnDashboard').on('click', function(e) {
            sendHealthresultPresave();
        });

        $('#btnLeave').on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/knowhow';
        });

        $('#btnSend').on('click', function(e) {
            e.preventDefault();
            var extra_message='';
            $('#no-check-count').text(newObj.quiz_state_ary.length-newObj.checked_count);
            $('#need-count').text(newObj.need_count);
            if (newObj.need_count>0 || newObj.quiz_state_ary.length>=newObj.checked_count) {
                extra_message=$('#extraMessage').html();
            }

            swal({
                title: '是否確認交卷？',
                text: extra_message,
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認交卷</span>'
            }).then(function () {
                stopAddCostSec();
                sendHealthresult();
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });

        window.document.body.onbeforeunload = function() {
            sendHealthresultPresave();
        }
    }

    function getHealthpaper() {
        $.ajax({
            url: '/admin/knowhow/get-healthpaper?pid=' + bs.getUrlVar('pid'),
            type: 'GET',
            success: function(res) {
                var quizpaper = res.data;
                $('#paper-name').text(quizpaper.papername);
                newObj.exam_times = quizpaper.exam_times * 60;
                newObj.quiz_randstate=quizpaper.quiz_randstate;
                newObj.option_randstate=quizpaper.option_randstate;
                newObj.grade_code=quizpaper.grade_code;
                getQuizView(JSON.parse(quizpaper.paperdetail));
            },
            error: bs.errorHandler
        });
    }

    function getQuizView(paperdetail) {
        var outerHtml = '';
        var innerHtml = '';
        var quiz_state_ary = [];

        var dataObj = {};
        dataObj.quizpaper_id = bs.getUrlVar('pid');
        dataObj.task_id = bs.getUrlVar('tid');
        dataObj.uid = bs.getUrlVar('uid');
        $.ajax({
            url: '/admin/knowhow/send-healthresult-preload',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                if (res.quiz_state_ary.length != 0) {
                    newObj.quiz_state_ary = res.quiz_state_ary;
                    newObj.current_idx = res.current_idx;
                    newObj.current_quiz_id = res.current_quiz_id;
                    getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                    window.ART.blackBoard.switch(newObj.current_idx);
                    newObj.checked_count = res.checked_count;
                    newObj.need_count = res.need_count;
                    newObj.current_sec= res.costsec;
                    newObj.exam_times-=res.costsec;
                }
                else {

                    if (newObj.quiz_randstate==1) {
                        paperdetail.quiz_content=Shuffle(paperdetail.quiz_content);
                    }

                    $.each(paperdetail.quiz_content, function(key, item) {
                        var quiz_state = {};
                        quiz_state.origin_idx = item.index;
                        quiz_state.data_idx = key;
                        quiz_state.quiz_id = parseInt(item.quiz_id);
                        quiz_state.checked = 0;
                        quiz_state.user_ans = '-';
                        quiz_state.need_check = 0;
                        quiz_state.costsec = 0;
                        quiz_state.ans_remove = [];
                        quiz_state_ary.push(quiz_state);
                    });
                    newObj.quiz_state_ary = quiz_state_ary;
                    newObj.quiz_state_ary = newObj.quiz_state_ary.sort(function(a, b) {
                        return parseInt(a.data_idx) > parseInt(b.data_idx) ? 1 : -1;
                    });
                    newObj.current_idx = newObj.quiz_state_ary[0].data_idx;
                    newObj.current_quiz_id = newObj.quiz_state_ary[0].quiz_id;
                    getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                    window.ART.blackBoard.switch(newObj.current_idx);
                }

                checkArrowShow();

                $.each(newObj.quiz_state_ary, function(key, item) {
                    innerHtml += '<button class="btn btn-default white quizset quizid-color" type="button" origin-idx="' + item.origin_idx + '" data-idx="' + item.data_idx + '" data-id="' + item.quiz_id + '" >' + (key + 1) + '</button>&nbsp;';
                    if (key != 0 && (key + 1) % 5 == 0) {
                        var divGroup = $('<div></div>');
                        divGroup.append(innerHtml);
                        outerHtml += '<div class="btn">' + divGroup.html() + '</div>';
                        innerHtml = '';
                    }
                });

                if (innerHtml != '') {
                    var divGroup = $('<div></div>');
                    divGroup.append(innerHtml);
                    outerHtml += '<div class="btn">' + divGroup.html() + '</div>';
                    innerHtml = '';
                }

                $('#quizview').html('').append(outerHtml);

                //初始化
                showTime();
                stopAddCostSec();
                startAddCostSec();
                sendHealthresultPresave();

                $('#quizview .quizset').off('click').on('click', function(key) {
                    $(this).removeClass('quizid-color quizid-color-checked').addClass('quizid-color-selected');
                    stopAddCostSec();
                    setTimeout(startAddCostSec, 1000);
                    newObj.current_idx = parseInt($(this).attr('data-idx'));
                    newObj.current_quiz_id = parseInt($(this).attr('data-id'));
                    getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                    window.ART.blackBoard.switch(newObj.current_idx);
                    sendHealthresultPresave();
                    checkArrowShow();
                });
            },
            error: bs.errorHandler
        });
    }

    function getQuizContent(idx, qid) {
        $.ajax({
            url: '/admin/knowhow/get-quiz-content?qid=' + qid,
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var quizObj = res.data;
                var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                var innerHtml = '';

                var opt_a= '';
                var opt_b= '';
                var opt_c= '';
                var opt_d= '';
                var opt_e= '';
                switch (newObj.grade_code) {
                    case 'E0':
                    case 'E1':
                    case 'E2':
                    case 'E3':
                    case 'E4':
                    case 'E5':
                    case 'E6':
                        opt_a='①';
                        opt_b='②';
                        opt_c='③';
                        opt_d='④';
                        opt_e='⑤';
                        break;
                    default:
                        opt_a='(A)';
                        opt_b='(B)';
                        opt_c='(C)';
                        opt_d='(D)';
                        opt_e='(E)';
                        break;
                }
                var new_opt_a = opt_a.replace('(', '').replace(')', '');
                var new_opt_b = opt_b.replace('(', '').replace(')', '');
                var new_opt_c = opt_c.replace('(', '').replace(')', '');
                var new_opt_d = opt_d.replace('(', '').replace(')', '');
                var new_opt_e = opt_e.replace('(', '').replace(')', '');

                var display_opt_a='';
                var display_opt_b='';
                var display_opt_c='';
                var display_opt_d='';
                var display_opt_e='';

                if (bs.getNormalGrade(newObj.grade_code)=='E0') {
                    display_opt_a='1';
                    display_opt_b='2';
                    display_opt_c='3';
                    display_opt_d='4';
                    display_opt_e='5';
                }
                else {
                    display_opt_a=new_opt_a;
                    display_opt_b=new_opt_b;
                    display_opt_c=new_opt_c;
                    display_opt_d=new_opt_d;
                    display_opt_e=new_opt_e;
                }

                var qa_html=
               '<br>\
                <div class="btn-group-toggle" data-toggle="buttons" style="text-align:left" >\
                    <label class="btn btn-outline-danger rounded-circle">\
                        <input class="form-check-input" type="radio" name="radioQuiz" id="radioQA-'+new_opt_a+'" value="'+new_opt_a+'"> '+display_opt_a+'\
                    </label>\
                    <label class="btn btn-outline-danger rounded-circle">\
                        <input class="form-check-input" type="radio" name="radioQuiz" id="radioQA-'+new_opt_b+'" value="'+new_opt_b+'"> '+display_opt_b+'\
                    </label>\
                    <label class="btn btn-outline-danger rounded-circle">\
                        <input class="form-check-input" type="radio" name="radioQuiz" id="radioQA-'+new_opt_c+'" value="'+new_opt_c+'"> '+display_opt_c+'\
                    </label>\
                    <label class="btn btn-outline-danger rounded-circle">\
                        <input class="form-check-input" type="radio" name="radioQuiz" id="radioQA-'+new_opt_d+'" value="'+new_opt_d+'"> '+display_opt_d+'\
                    </label>\
                </div>\
                <br>';

                innerHtml +=
                '<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                    <h2 class="padding-8px bg-090 color-white text-left">\
                        <i class="fa fa-pencil"></i> 第 ' + (idx + 1) + ' 題\
                    </h2>\
                    <div class="quiz-content" data-idx="' + idx + '">\
                        '+ qg_html +'\
                        <div id="imgQA"><img class="img-quiz" src="' + quizObj.qa + '"></div><br>\
                        ' + qa_html + '\
                    </div>\
                 </td></tr></table></div>';

                $('#normalExam').html(innerHtml);
                checkQuizState(idx);

                $('.rounded-circle').off('click').on('click', function(e) {
                    var checked_count = newObj.checked_count;
                    var radio=$(this).children();
                    if (newObj.quiz_state_ary[radio.parent().parent().parent().attr('data-idx')].checked!=1) {
                        newObj.checked_count = checked_count != newObj.quiz_state_ary.length ? (++checked_count) : checked_count;
                    }
                    newObj.quiz_state_ary[radio.parent().parent().parent().attr('data-idx')].checked = 1;
                    newObj.quiz_state_ary[radio.parent().parent().parent().attr('data-idx')].user_ans = radio.val();
                    checkQuizState(radio.parent().parent().parent().attr('data-idx'));
                    sendHealthresultPresave();
                });
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function checkQuizState(current_idx) {
        $.each(newObj.quiz_state_ary, function(key, item) {
            if (item.checked == 1) {
                $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"]').parent().removeClass('active');
                $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"][value="' + item.user_ans + '"]').parent().addClass('active');
                $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"][value="' + item.user_ans + '"]').prop('checked', true);
                if (item.data_idx != current_idx) {
                    $('.quizset[data-idx="' + item.data_idx + '"]').removeClass('quizid-color quizid-color-selected').addClass('quizid-color-checked');
                } else {
                    $('.quizset[data-idx="' + item.data_idx + '"]').removeClass('quizid-color quizid-color-checked').addClass('quizid-color-selected');
                }
            } else {
                if (item.data_idx != current_idx) {
                    $('.quizset[data-idx="' + item.data_idx + '"]').removeClass('quizid-color-checked quizid-color-selected').addClass('quizid-color');
                } else {
                    $('.quizset[data-idx="' + item.data_idx + '"]').removeClass('quizid-color quizid-color-checked').addClass('quizid-color-selected');
                }
            }

            if (item.need_check == 1) {
                $('.quizset[data-idx="' + item.data_idx + '"]').addClass('need-check');
            } else {
                $('.quizset[data-idx="' + item.data_idx + '"]').removeClass('need-check');
            }

            if (item.ans_remove) {
                $.each(item.ans_remove, function(key2, item2) {
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"][value="' + item2 + '"]').prop('checked', false);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"][value="' + item2 + '"]').attr('disabled', true);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input:radio[name="radioQuiz"][value="' + item2 + '"]').next().addClass('ans-state');
                });
            }

        });
    }

    function sendHealthresultPresave() {
        var dataObj = {};
        dataObj.quiz_state_ary = newObj.quiz_state_ary;
        dataObj.tid = bs.getUrlVar('tid');
        dataObj.pid = bs.getUrlVar('pid');
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.uid = bs.getUrlVar('uid');
        dataObj.current_idx = newObj.current_idx;
        dataObj.current_quiz_id = newObj.current_quiz_id;
        dataObj.current_sec=newObj.current_sec;
        $.ajax({
            url: '/admin/knowhow/send-healthresult-presave',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var msg=res.message;
                if (msg!='success') {
                    swal(msg);
                    setTimeout(function(){ location.replace('/admin/knowhow'); },1000);
                    return false;
                }
            },
            error: bs.errorHandler
        });
    }

    function sendHealthresult() {
        var dataObj = {};
        newObj.quiz_state_ary = newObj.quiz_state_ary.sort(function(a, b) {
            return parseInt(a.origin_idx) > parseInt(b.origin_idx) ? 1 : -1;
        });
        dataObj.quiz_state_ary = newObj.quiz_state_ary;
        dataObj.tid = bs.getUrlVar('tid');
        dataObj.pid = bs.getUrlVar('pid');
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.uid = bs.getUrlVar('uid');
        dataObj.current_sec=newObj.current_sec;
        $.ajax({
            url: '/admin/knowhow/send-healthresult',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                window.document.body.onbeforeunload = function() {}
                var res_url=res.res_url;
                location.replace(res_url);
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function showTime() {
        // newObj.exam_times -= 1;
        //
        // var hhh = Math.floor(newObj.exam_times / 3600);
        //
        // var mmm = Math.floor((newObj.exam_times - (hhh * 3600)) / 60);
        // var sss = newObj.exam_times % 60;
        //
        // if (hhh.toString().length < 2) {
        //     hhh = "0" + hhh;
        // }
        // if (mmm.toString().length < 2) {
        //     mmm = "0" + mmm;
        // }
        // if (sss.toString().length < 2) {
        //     sss = "0" + sss;
        // }
        //
        // $('#exam_time').html(hhh + ":" + mmm + ":" + sss);

        newObj.current_sec += 1;

        //倒數計時
        var back_hhh=Math.floor((newObj.exam_times-newObj.current_sec)/3600);

        var back_mmm=Math.floor(((newObj.exam_times-newObj.current_sec)/60)-(back_hhh*60));


        var back_sss=(newObj.exam_times-newObj.current_sec)% 60;


        if (back_hhh.toString().length < 2) {
            back_hhh = "0" + back_hhh;
        }
        if (back_mmm.toString().length < 2) {
            back_mmm = "0" + back_mmm;
        }
        if (back_sss.toString().length < 2) {
            back_sss = "0" + back_sss;
        }

        $('#exam_time').html(back_hhh + ":" + back_mmm + ":" + back_sss);



        if (newObj.exam_times<=0) {
            stopAddCostSec();
            sendHealthresult();
        } else {
            //每秒執行一次
            setTimeout(showTime, 1000);
        }
    }

    function startAddCostSec() {
        newObj.quiz_state_ary[newObj.current_idx].costsec++;
        newObj.costsec_flag = setTimeout(startAddCostSec, 1000);
    }

    function stopAddCostSec() {
        clearTimeout(newObj.costsec_flag);
    }

    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    function checkArrowShow(){
        if (newObj.current_idx == 0) {
            $('.prevQuiz').hide();
            $('.nextQuiz').show();
        }
        else if (newObj.current_idx == newObj.quiz_state_ary.length - 1) {
            $('.prevQuiz').show();
            $('.nextQuiz').hide();
        }
        else {
            $('.nextQuiz').show();
            $('.prevQuiz').show();
        }
    }
});
