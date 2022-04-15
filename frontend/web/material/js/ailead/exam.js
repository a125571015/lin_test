$(function() {
    'use strict';
    var newObj = {};
    newObj.quiz_state_ary = [];
    newObj.current_idx = 0;
    newObj.current_quiz_id = 0;
    newObj.checked_count = 0;
    newObj.need_count = 0;
    newObj.option_randstate = 0;
    newObj.exam_times = 0;
    newObj.costsec_flag;
    newObj.current_sec = 0;
    newObj.grade_code='';
    newObj.is_login = 1;
    init();

    function init() {
        getQuizpaper();



        $('#quiz-ask-content').summernote({
            height: 250,
            width:  "100%",
            tooltip: false,
            toolbar: [
                ['insert', [ 'picture']],
            ],
        });
        try {
            $('#quiz-ask-content').summernote('code', summernoteContent);
        }
        catch (e) {
        }
        $('.note-group-image-url').attr('style','display:none');
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
            sendQuizresultPresave();
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
            sendQuizresultPresave();
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
            sendQuizresultPresave();
        })

        $('#btnDashboard').on('click', function(e) {
            sendQuizresultPresave();
        });

        $('#btnLeave').on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/stuboard';
        });

        $('#btnSend').on('click', function(e) {
            e.preventDefault();
            var extra_message = '';
            $('#no-check-count').text(newObj.quiz_state_ary.length - newObj.checked_count);
            $('#need-count').text(newObj.need_count);
            if (newObj.need_count > 0 || newObj.quiz_state_ary.length >= newObj.checked_count) {
                extra_message = $('#extraMessage').html();
            }

            swal({
                title: '是否確認交卷？',
                text: extra_message,
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認交卷</span>'
            }).then(function() {
                stopAddCostSec();
                sendQuizresult();
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });

		$('#btn-ask-confirm').on('click', function(e) {
			e.preventDefault();

			if (!newObj.qid) {

                $.unblockUI();
			    swal('請選擇要發問的題目');
				return false;
			}

            //發問改用編輯器
			if ($('#quiz-ask-content').summernote('isEmpty')){
                $.unblockUI();
                swal('請輸入要發問的內容');
                return false;
            }


			// if (!$('#quiz-ask-content').val()) {
            //
            //     $.unblockUI();
			//     swal('請輸入要發問的內容');
			// 	return false;
			// }
            //平板blockUI跟sweet-alert2衝突 有呼叫swal 的話樣先unblockUI()
			$.unblockUI();


			swal({
				title: '確認送出您的發問嗎？',
				type: 'warning',
				showCloseButton: true,
				showCancelButton: true,
				cancelButtonText: '<span>No<br>取消</span>',
				confirmButtonText: '<span>Yes<br>確認</span>'
			}).then(function() {
                $.unblockUI();
			    // $('#ask-modal').modal('hide');
				var dataObj = {};
				dataObj.tid = bs.getUrlVar('tid');
				dataObj.rid = bs.getUrlVar('rid');
				dataObj.qid = newObj.qid;
                dataObj.ask_content=$('#quiz-ask-content').summernote('code');
				//dataObj.ask_content = $('#quiz-ask-content').val();
                dataObj.kind=1;
                //錯誤回報是1
				bs.sendQuizAskContent(dataObj);
                $('#quiz-ask-content').summernote('reset');
				//$('#quiz-ask-content').val('');
			}, function(dismiss) {
				if (dismiss === 'cancel') {
					return false;
				}
			});
		});

		$('.close').on('click',function(e){
            $.unblockUI();
        });

        window.document.body.onbeforeunload = function() {
            sendQuizresultPresave();
        }
    }

    function getQuizpaper() {
        $.ajax({
            url: '/admin/exam/get-quizpaper?tid=' + bs.getUrlVar('tid') + '&pid=' + bs.getUrlVar('pid'),
            type: 'GET',
            success: function(res) {
                var quizpaper = res.data;
                $('#task-name').text(quizpaper.task_name);
				$('#task-name').attr('title',quizpaper.full_task_name);
                newObj.grade_code=quizpaper.grade_code;
                newObj.exam_times = quizpaper.exam_times * 60;
                newObj.quiz_randstate = quizpaper.quiz_randstate;
                newObj.option_randstate = quizpaper.option_randstate;
				if (quizpaper.mediafile_read) {
                    $('#btn-quizpaper-audio').show();
                    $('#btn-quizpaper-audio').attr('for','audio-quizpaper');
                    $('#div-quizpaper-audio').append('<audio id="audio-quizpaper" style="display:none"><source src="' + quizpaper.mediafile_read + '" type="audio/mpeg" /></audio>');
                }

				newObj.user_from=quizpaper.user_from;
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
        $.ajax({
            url: '/admin/exam/send-quizresult-preload',
            type: 'POST',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
            success: function(res) {
                if (res.quiz_state_ary.length != 0) {
                    newObj.quiz_state_ary = res.quiz_state_ary;
                    newObj.current_idx = res.current_idx;
                    newObj.current_quiz_id = res.current_quiz_id;
                    getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                    window.ART.blackBoard.switch(newObj.current_idx);
                    newObj.checked_count = res.checked_count;
                    newObj.need_count = res.need_count;
                    newObj.current_sec = res.costsec;
                } else {

                    if (newObj.quiz_randstate == 1) {
                        paperdetail.quiz_content = Shuffle(paperdetail.quiz_content);
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
                sendQuizresultPresave();

                $('#quizview .quizset').off('click').on('click', function(key) {
                    $(this).removeClass('quizid-color quizid-color-checked').addClass('quizid-color-selected');
                    stopAddCostSec();
                    setTimeout(startAddCostSec, 1000);
                    newObj.current_idx = parseInt($(this).attr('data-idx'));
                    newObj.current_quiz_id = parseInt($(this).attr('data-id'));
                    getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                    window.ART.blackBoard.switch(newObj.current_idx);
                    sendQuizresultPresave();
                    checkArrowShow();
                });
            },
            error: bs.errorHandler
        });
    }

    function getQuizContent(idx, qid) {
        if(newObj.is_login == 0){
            //因error而再次觸發考卷紀錄功能，無法設置setTimeOut、無法設置別的location.replace網址
            return false;
        }

        $.ajax({
            url: '/admin/exam/get-quiz-content?qid=' + qid,
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var quizObj = res.data;
                var innerHtml = '';

                var quiz_category_id=quizObj.quiz_category_id;
				var mediafile_read=quizObj.mediafile_read;
				var multi_choice_text=(quiz_category_id==2)?' - 多選題':'';
                var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                var qa_html = '';
                var qa_aHtml = '';
                var qa_bHtml = '';
                var qa_cHtml = '';
                var qa_dHtml = '';
                var qa_eHtml = '';

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

                var input_type=(quiz_category_id==1)?'radio':'checkbox';

                if (quizObj.qa_a) {
                    qa_aHtml = getOptionHtml(input_type,opt_a,new_opt_a,quizObj.qa_a)
                }

                if (quizObj.qa_b) {
                    qa_bHtml = getOptionHtml(input_type,opt_b,new_opt_b,quizObj.qa_b);
                }

                if (quizObj.qa_c) {
                    qa_cHtml = getOptionHtml(input_type,opt_c,new_opt_c,quizObj.qa_c);
                }

                if (quizObj.qa_d) {
                    qa_dHtml = getOptionHtml(input_type,opt_d,new_opt_d,quizObj.qa_d);
                }

                if (quizObj.qa_e) {
                    qa_eHtml = getOptionHtml(input_type,opt_e,new_opt_e,quizObj.qa_e);
                }

                var qa_ary = [];
                qa_ary.push(qa_aHtml);
                qa_ary.push(qa_bHtml);
                qa_ary.push(qa_cHtml);
                qa_ary.push(qa_dHtml);
                qa_ary.push(qa_eHtml);
                if (newObj.option_randstate == 1) {
                    qa_ary = Shuffle(qa_ary);
                }
                $.each(qa_ary, function(key, item) {
                    qa_html += item;
                });

				var btn_ask_class='';
				if (newObj.user_from=='aidux') {
					btn_ask_class='btn-ask-aidux';
				}
				else {
					btn_ask_class='btn-ask-quiz';
				}

                innerHtml +=
                    '<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                    <h2 class="padding-8px bg-090 color-white text-left">\
                        <i class="fa fa-pencil"></i> 第 ' + (idx + 1) + ' 題'+multi_choice_text+'\
						<i class="fa fa-question-circle-o fa-2x '+ btn_ask_class +' cursor-pointer m-r-5" data-id="' + qid + '" style="float:right"></i>\
                    </h2>\
                    <div class="quiz-content" data-idx="' + idx + '" style="padding-left:5px">\
                        '+ qg_html +'\
                        <div id="imgQA"><img class="img-quiz" src="' + quizObj.qa + '"></div><br>\
                        ' + qa_html + '\
                    </div>\
                 </td></tr></table></div>';

                $('#normalExam').html(innerHtml);
                checkQuizState(idx);

                $('.opt-label').eq(0).text(opt_a);
                $('.opt-label').eq(1).text(opt_b);
                $('.opt-label').eq(2).text(opt_c);
                $('.opt-label').eq(3).text(opt_d);
                $('.opt-label').eq(4).text(opt_e);

				if (mediafile_read) {
					var audio_obj={};
					audio_obj.id='mediafile_read_'+idx;
					audio_obj.src=mediafile_read;
					audio_obj.btn_css='btn-audio-read';
					audio_obj.btn_dom=$('.btn-audio-read');
					audio_obj.btn_text='題目音檔';
					audio_obj.btn_for='mediafile_read_'+idx;

					$('#div-audio-read').html(bs.getAudioHtml(audio_obj));
					$('#div-audio-read').append(bs.getBtnAudioHtml(audio_obj));

					$('.'+audio_obj.btn_css).off('click').on('click', function(e) {
						var audio_obj={};
						audio_obj.id='mediafile_read_'+idx;
						audio_obj.btn_dom=$('.btn-audio-read');
						audio_obj.btn_text='題目音檔';
						bs.setAudioPlay(audio_obj);
			        });
				}
				else {
					$('#div-audio-read').empty();
				}

                $('.opt-image').off('click').on('click', function(e) {

                    var input = $(this).parent().parent().find('.form-check-input');

                    if ($(input).attr('type')=='radio') {
                        $(input).prop('checked',true);
                    }

                    if ($(input).attr('type')=='checkbox') {
                        if ($(input).prop('checked')) {
                            $(input).prop('checked',false);
                        }
                        else {
                            $(input).prop('checked',true);
                        }
                    }

                    var all_input = $(this).parent().parent().parent().parent().find('.form-check-input');

                    var user_ans = getInputValue(all_input);
                    newObj.quiz_state_ary[$(input).parent().parent().parent().attr('data-idx')].user_ans = user_ans;

                    var checked_count = newObj.checked_count;
                    if (newObj.quiz_state_ary[$(input).parent().parent().parent().attr('data-idx')].checked != 1 && user_ans!='-') {
                        newObj.checked_count = checked_count != newObj.quiz_state_ary.length ? (++checked_count) : checked_count;
                    }

                    if (user_ans!='-') {
                        newObj.quiz_state_ary[$(input).parent().parent().parent().attr('data-idx')].checked = 1;
                    }
                    else {
                        newObj.quiz_state_ary[$(input).parent().parent().parent().attr('data-idx')].checked = 0;
                        newObj.checked_count = checked_count != 0 ? (--checked_count) : checked_count;
                    }

                    checkQuizState($(input).parent().parent().parent().attr('data-idx'));
                    sendQuizresultPresave();
                });

                $('input[name="inputQuiz"]').off('click').on('click', function(e) {

                    var all_input = $(this).parent().parent().parent().find('.form-check-input');

                    var user_ans = getInputValue(all_input);
                    newObj.quiz_state_ary[$(this).parent().parent().parent().attr('data-idx')].user_ans = user_ans;

                    var checked_count = newObj.checked_count;
                    if (newObj.quiz_state_ary[$(this).parent().parent().parent().attr('data-idx')].checked != 1 && user_ans!='-') {
                        newObj.checked_count = checked_count != newObj.quiz_state_ary.length ? (++checked_count) : checked_count;
                    }

                    if (user_ans!='-') {
                        newObj.quiz_state_ary[$(this).parent().parent().parent().attr('data-idx')].checked = 1;
                    }
                    else {
                        newObj.quiz_state_ary[$(this).parent().parent().parent().attr('data-idx')].checked = 0;
                        newObj.checked_count = checked_count != 0 ? (--checked_count) : checked_count;
                    }

                    checkQuizState($(this).parent().parent().parent().attr('data-idx'));
                    sendQuizresultPresave();
                });

                $('.ans-remove').off('click').on('click', function(e) {

                    $(this).parent().parent().find('.form-check-input').prop('checked', false);
                    var idx = $(this).parent().parent().parent().attr('data-idx');
                    var input_value = $(this).parent().parent().find('input[name="inputQuiz"]').val();

                    var user_ans =newObj.quiz_state_ary[idx].user_ans;
                    if (user_ans!='-') {

                        user_ans=user_ans.replace(';'+input_value,'').replace(input_value+';','').replace(input_value,'');
                        user_ans=(user_ans)? user_ans:'-';
                        newObj.quiz_state_ary[idx].user_ans=user_ans;

                        if (user_ans=='-') {
                            var checked_count = newObj.checked_count;
                            newObj.checked_count = checked_count != 0 ? (--checked_count) : checked_count;
                            newObj.quiz_state_ary[idx].checked=0;
                        }
                    }
                    else {
                        newObj.quiz_state_ary[idx].checked=0;
                    }

                    var dom = $(this).parent().siblings().find('.opt-label');
                    if (dom.hasClass('ans-state')) {
                        dom.removeClass('ans-state');
                        dom.attr('disabled', false);
                        var ans_remove_idx = newObj.quiz_state_ary[idx].ans_remove.indexOf(input_value);
                        if (ans_remove_idx > -1) {
                            newObj.quiz_state_ary[idx].ans_remove.splice(ans_remove_idx, 1);
                        }
                        $(this).parent().parent().find('.form-check-input').attr('disabled', false);
                    } else {
                        dom.addClass('ans-state');
                        dom.attr('disabled', true);
                        newObj.quiz_state_ary[idx].ans_remove.push(input_value);
                        newObj.quiz_state_ary[idx].ans_remove.sort();
                        $(this).parent().parent().find('.form-check-input').attr('disabled', true);
                    }

                    checkQuizState(idx);
                    sendQuizresultPresave();
                });

				$('.btn-ask-quiz').off('click').on('click', function(e) {
					e.preventDefault();
					$.blockUI({
		                message: $('#ask-modal'),
		                onOverlayClick: $.unblockUI(),
		                css: {
		                    top: '10%',
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
					newObj.qid = qid;
				});

				$('.btn-ask-aidux').on('click',function(e){
					e.preventDefault();
					newObj.qid=qid;
					// getQuizContentToAidux(newObj.qid);
                    //為避免被封鎖彈跳視窗，改用先開新頁再導頁
                    window.open('/admin/exam/aidux_ask_preload?qid='+qid, '_blank')
				});
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: function(xhr, status, error) {
                newObj.is_login = 0;
                alert('偵測到您已登出是或是無系統使用權限，即將返回登入頁');
                //因error後接著會離開此頁面，離開前會執行考卷紀錄，故結束動作寫在考卷紀錄開始時
            }
        });
    }

    function checkQuizState(current_idx) {
        $.each(newObj.quiz_state_ary, function(key, item) {
            if (item.checked == 1) {
                if (item.user_ans) {
                    var user_ans_ary=item.user_ans.split(';');
                    $.each(user_ans_ary,function(key2,item2){
                        $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').prop('checked', true);
                    });
                }

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
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').prop('checked', false);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').attr('disabled', true);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').next().addClass('ans-state');
                });
            }

        });
    }

    function sendQuizresultPresave() {
        if(newObj.is_login == 0){
            //因error而再次觸發考卷紀錄功能，無法設置setTimeOut、無法設置別的location.replace網址？
            return false;
        }

        var dataObj = {};
        dataObj.quiz_state_ary = newObj.quiz_state_ary;
        dataObj.tid = bs.getUrlVar('tid');
        dataObj.pid = bs.getUrlVar('pid');
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.current_idx = newObj.current_idx;
        dataObj.current_quiz_id = newObj.current_quiz_id;
        dataObj.current_sec = newObj.current_sec;
        $.ajax({
            url: '/admin/exam/send-quizresult-presave',
            type: 'POST',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/stuboard');
                    }, 1000);
                    return false;
                }
            },
            error: function(xhr, status, error) {
                newObj.is_login = 0;
                alert('偵測到您已登出是或是無系統使用權限，即將返回登入頁');
                //因error後接著會離開此頁面，離開前會執行考卷紀錄，故結束動作寫在考卷紀錄開始時
            }
        });
    }

    function sendQuizresult() {
        var dataObj = {};
        newObj.quiz_state_ary = newObj.quiz_state_ary.sort(function(a, b) {
            return parseInt(a.origin_idx) > parseInt(b.origin_idx) ? 1 : -1;
        });
        dataObj.quiz_state_ary = newObj.quiz_state_ary;
        dataObj.tid = bs.getUrlVar('tid');
        dataObj.pid = bs.getUrlVar('pid');
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.current_sec = newObj.current_sec;
        $.ajax({
            url: '/admin/exam/send-quizresult',
            type: 'POST',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                window.document.body.onbeforeunload = function() {}
                var res_url = res.res_url;
                var send_state=res.send_state;


                if (send_state=='2'){
                    swal('『交卷完成，將依規定時間發放考試結果』！');

                    setTimeout(function () {
                        location.replace(res_url);
                    }, 3000);

                }else{
                     location.replace(res_url);
                }
                return false;
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function showTime() {
        newObj.current_sec += 1;

        //正數計時
        var hhh = Math.floor(newObj.current_sec / 3600);

        var mmm = Math.floor((newObj.current_sec - (hhh * 3600)) / 60);
        var sss = newObj.current_sec % 60;

        if (hhh.toString().length < 2) {
            hhh = "0" + hhh;
        }
        if (mmm.toString().length < 2) {
            mmm = "0" + mmm;
        }
        if (sss.toString().length < 2) {
            sss = "0" + sss;
        }

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




        if (newObj.exam_times!=0){
            $('#exam_time').html(back_hhh + ":" + back_mmm + ":" + back_sss);
        }else{
            $('#exam_time').html(hhh + ":" + mmm + ":" + sss);
        }



        if (newObj.exam_times != 0 && newObj.current_sec >= newObj.exam_times) {
            stopAddCostSec();
            sendQuizresult();
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

    function checkArrowShow() {
        if (newObj.current_idx == 0) {
            $('.prevQuiz').hide();
            $('.nextQuiz').show();
        } else if (newObj.current_idx == newObj.quiz_state_ary.length - 1) {
            $('.prevQuiz').show();
            $('.nextQuiz').hide();
        } else {
            $('.nextQuiz').show();
            $('.prevQuiz').show();
        }
    }

    function getOptionHtml(input_type,opt,new_opt,qa_opt){
        var inner_html='';

        inner_html=
        '<div id="imgQA-'+new_opt+'">\
            <div class="form-check form-check-inline">\
                <input class="form-check-input" type="'+input_type+'" name="inputQuiz" id="'+input_type+'QA-'+new_opt+'" value="'+new_opt+'">\
                <label class="form-check-label opt-label" for="'+input_type+'QA-'+new_opt+'" style="font-size:24px">'+opt+'</label>\
                <div style="display:inline-block;margin-left:10px">\
                    <img class="opt-image img-quiz" src="' + qa_opt + '" alt="">\
                </div>\
            </div>\
            <div style="float:right;display:inline-block;font-size:24px">\
                <i class="fa fa-times-circle-o ans-remove"></i>\
            </div>\
            <hr>\
        </div>';

        return inner_html;
    }

    function getInputValue(dom){
        var ary=[];
        $.each($(dom),function(key,item){
           if (item.checked) {
               ary.push(item.value);
           }
        });
        ary = ary.sort();
        if (ary.length==0) {
            ary.push('-');
        }
        var str=ary.join(';');
        return str;
    }

	function getQuizContentToAidux(qid) {
        $.ajax({
            url: '/admin/exam/get-quiz-content?qid=' + qid + '&key=' + qid + '&aidux=1',
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                window.open(res,'_blank');
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: function(xhr, status, error) {
                newObj.is_login = 0;
                alert('偵測到您已登出是或是無系統使用權限，即將返回登入頁');
                //因error後接著會離開此頁面，離開前會執行考卷紀錄，故結束動作寫在考卷紀錄開始時
            }
        });
    }

});
