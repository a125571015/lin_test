$(function() {
    'use strict';
    var newObj = {};
    newObj.quiz_state_ary = [];
    newObj.current_idx = 0;
    newObj.current_quiz_id = 0;
    newObj.checked_count = 0;
    newObj.grade_code='';
    var t = 0;
    init();

    function init() {
        if (bs.getUrlVar('qids')) {
            $('#page-title').text('複習收藏題');
        }
        else {
            $('#page-title').text('複習錯題');
        }
        getQuizpaper();
    }

    function getQuizpaper() {
        var dataObj = {};
        dataObj.qids = bs.getUrlVar('qids');
        dataObj.rids = bs.getUrlVar('rids');
        dataObj.kids = bs.getUrlVar('kids');
        dataObj.cid=bs.getUrlVar('cid');
        dataObj.sourcekind=bs.getUrlVar('sourcekind');
        $.ajax({
            url: '/admin/exam/get-wrong-result',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                if (res.message!='success') {
                    swal(res.message);
                    history.back();
                    return false;
                }
                var detail = res.data;
                if(detail.quiz_content.length == 0){
                    alert('錯題已練習完畢，將返回上一頁（若有題目被停用將暫時無法練習）');
                    history.back();
                    return false;
                }
                newObj.grade_code=res.grade_code;
                getQuizView(detail);
                newObj.current_idx = 0;
                newObj.current_quiz_id = detail.quiz_content[0].quiz_id;
                getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                window.ART.blackBoard.switch(newObj.current_idx);
            },
            error: bs.errorHandler
        });
    }

    function getQuizView(paperdetail) {
        var outerHtml = '';
        var innerHtml = '';
        var quiz_state_ary = [];
        $.each(paperdetail.quiz_content, function(key, item) {

            var quiz_state = {};
            quiz_state.origin_idx = key;
            quiz_state.data_idx = key;
            quiz_state.quiz_id = parseInt(item.quiz_id);
            quiz_state.checked = 0;
            quiz_state.user_ans = '-';
            quiz_state.rid=parseInt(item.rid);
            quiz_state.ans_remove = [];
            quiz_state_ary.push(quiz_state);
        });

        newObj.quiz_state_ary = quiz_state_ary;
    }

    function getQuizContent(idx, qid) {
        $.ajax({
            url: '/admin/exam/get-quiz-content?qid=' + qid + '&key=' + qid,
            type: 'GET',
            success: function(res) {
                var quizObj = res.data;
                var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                var qa = quizObj.qa;
                var qa_a = quizObj.qa_a;
                var qa_b = quizObj.qa_b;
                var qa_c = quizObj.qa_c;
                var qa_d = quizObj.qa_d;
                var qa_e = quizObj.qa_e;
                var quiz_category_id=quizObj.quiz_category_id;
				var mediafile_read=quizObj.mediafile_read;
				var multi_choice_text=(quiz_category_id==2)?' - 多選題':'';
                var quiz_ans = (quizObj.sa) ? quizObj.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quizObj.sa;
                var aa = quizObj.aa;
                var aa_a = quizObj.aa_a;
                var aa_b = quizObj.aa_b;
                var aa_c = quizObj.aa_c;
                var aa_d = quizObj.aa_d;
                var aa_e = quizObj.aa_e;

                var innerHtml = '';
                var qa_a_html = '';
                var qa_b_html = '';
                var qa_c_html = '';
                var qa_d_html = '';
                var qa_e_html = '';
                var aa_html = '';
                var aa_a_html = '';
                var aa_b_html = '';
                var aa_c_html = '';
                var aa_d_html = '';
                var aa_e_html = '';
                var aa_title = '';
                var aa_res = '';

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

                if (qa_a) {
                    qa_a_html = getOptionHtml(input_type,idx,new_opt_a,opt_a,qa_a);
                }

                if (qa_b) {
                    qa_b_html = getOptionHtml(input_type,idx,new_opt_b,opt_b,qa_b);
                }

                if (qa_c) {
                    qa_c_html = getOptionHtml(input_type,idx,new_opt_c,opt_c,qa_c);
                }

                if (qa_d) {
                    qa_d_html = getOptionHtml(input_type,idx,new_opt_d,opt_d,qa_d);
                }

                if (qa_e) {
                    qa_e_html = getOptionHtml(input_type,idx,new_opt_e,opt_e,qa_e);
                }

                if (aa) {
                    aa_html = '<img class="img-quiz" src="' + aa + '"><br><br>';
                }
                if (aa_a) {
                    aa_a_html = '<label class="form-check-label" style="font-size:24px">'+opt_a+'</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_a + '"><br><br>';
                }
                if (aa_b) {
                    aa_b_html = '<label class="form-check-label" style="font-size:24px">'+opt_b+'</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_b + '"><br><br>';
                }
                if (aa_c) {
                    aa_c_html = '<label class="form-check-label" style="font-size:24px">'+opt_c+'</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_c + '"><br><br>';
                }
                if (aa_d) {
                    aa_d_html = '<label class="form-check-label" style="font-size:24px">'+opt_d+'</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_d + '"><br><br>';
                }
                if (aa_e) {
                    aa_e_html = '<label class="form-check-label" style="font-size:24px">'+opt_e+'</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_e + '"><br><br>';
                }

                if (aa_html != '' || aa_a_html != '' || aa_b_html != '' || aa_c_html != '' || aa_d_html != '' || aa_e_html != '') {
                    aa_title = '<h4>解析</h4>';
                }

                aa_res = '<h6 id="aa_res"></h6>';

                innerHtml +=
                '<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                    <h2 class="padding-8px bg-090 color-white text-left">\
                        <i class="fa fa-pencil"></i> 第 ' + (idx + 1) + ' 題'+multi_choice_text+'\
                    </h2>\
                    <div class="quiz-content" data-idx="' + idx + '">\
                    '+ qg_html +'\
                     <div id="imgQA"><img class="img-quiz" src="' + quizObj.qa + '"></div><br>\
                     ' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
                     <button type="button" for="imgAA-' + idx + '" quiz_ans="' + quiz_ans + '" class="btn btn-success btnAA">檢查答案</button>\
                     <div id="imgAA-' + idx + '" style="display:none">\
                       ' + aa_res + '\
                       ' + aa_title + '\
                       ' + aa_html + '\
                       ' + aa_a_html + '\
                       ' + aa_b_html + '\
                       ' + aa_c_html + '\
                       ' + aa_d_html + '\
                       ' + aa_e_html + '\
                     </div>\
                    </div>\
               </td></tr></table></div>';

                $('#wrong-review').html(innerHtml);
                checkQuizState(idx);

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
                    $('.btnAA').attr('user_ans', user_ans.replace(/(\;*)/g, ''));

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
                });

                $('input[name="inputQuiz"]').off('click').on('click', function(e) {

                    var all_input = $(this).parent().parent().parent().find('.form-check-input');

                    var user_ans = getInputValue(all_input);
                    newObj.quiz_state_ary[$(this).parent().parent().parent().attr('data-idx')].user_ans = user_ans;
                    $('.btnAA').attr('user_ans', user_ans.replace(/(\;*)/g, ''));

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
                    $('.btnAA').attr('user_ans', user_ans.replace(/(\;*)/g, ''));

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
                });

                $('.btnAA').on('click', function(e) {
                    $(this).hide();
                    $('#aa_res').empty();
                    $('#' + $(this).attr('for')).show();
                    var idx = $(this).attr('for').replace('imgAA-', '');

                    var quiz_ans=$(this).attr('quiz_ans');
                    var bool_a = (quiz_ans.indexOf('A')!=-1 || quiz_ans.indexOf('①')!=-1);
                    var bool_b = (quiz_ans.indexOf('B')!=-1 || quiz_ans.indexOf('②')!=-1);
                    var bool_c = (quiz_ans.indexOf('C')!=-1 || quiz_ans.indexOf('③')!=-1);
                    var bool_d = (quiz_ans.indexOf('D')!=-1 || quiz_ans.indexOf('④')!=-1);
                    var bool_e = (quiz_ans.indexOf('E')!=-1 || quiz_ans.indexOf('⑤')!=-1);
                    var user_ans = ($(this).attr('user_ans'))?$(this).attr('user_ans'):'';

                    if (bool_a) {
                        $('#q' + idx + '-A' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-①' + ' i.ion-arrow-right-c').show();
                    }
                    else {
                        if (user_ans.indexOf('A')!=-1 || user_ans.indexOf('①')!=-1) {
                            $('#q' + idx + '-A' + ' i.ion-close').show();
                            $('#q' + idx + '-①' + ' i.ion-close').show();
                        }
                    }

                    if (bool_b) {
                        $('#q' + idx + '-B' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-②' + ' i.ion-arrow-right-c').show();
                    }
                    else {
                        if (user_ans.indexOf('B')!=-1 || user_ans.indexOf('②')!=-1) {
                            $('#q' + idx + '-B' + ' i.ion-close').show();
                            $('#q' + idx + '-②' + ' i.ion-close').show();
                        }
                    }

                    if (bool_c) {
                        $('#q' + idx + '-C' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-③' + ' i.ion-arrow-right-c').show();
                    }
                    else {
                        if (user_ans.indexOf('C')!=-1 || user_ans.indexOf('③')!=-1) {
                            $('#q' + idx + '-C' + ' i.ion-close').show();
                            $('#q' + idx + '-③' + ' i.ion-close').show();
                        }
                    }

                    if (bool_d) {
                        $('#q' + idx + '-D' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-④' + ' i.ion-arrow-right-c').show();
                    }
                    else {
                        if (user_ans.indexOf('D')!=-1 || user_ans.indexOf('④')!=-1) {
                            $('#q' + idx + '-D' + ' i.ion-close').show();
                            $('#q' + idx + '-④' + ' i.ion-close').show();
                        }
                    }

                    if (bool_e) {
                        $('#q' + idx + '-E' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-⑤' + ' i.ion-arrow-right-c').show();
                    }
                    else {
                        if (user_ans.indexOf('E')!=-1 || user_ans.indexOf('⑤')!=-1) {
                            $('#q' + idx + '-E' + ' i.ion-close').show();
                            $('#q' + idx + '-⑤' + ' i.ion-close').show();
                        }
                    }

                    if ($(this).attr('quiz_ans') != user_ans) {
                        $('#aa_res').html('<button class="btn btn-danger" type="button" id="aa_res">答錯</button>&nbsp;');
                    } else {
                        $('#aa_res').html('答對');
                        $('#aa_res').html('<button class="btn btn-success" type="button" id="aa_res">答對</button>&nbsp;');
                    }

                    var dataObj={};
                    dataObj.rid=newObj.quiz_state_ary[parseInt(idx)].rid;
                    dataObj.quiz_id=newObj.quiz_state_ary[parseInt(idx)].quiz_id;
                    dataObj.quiz_ans=$(this).attr('quiz_ans');
                    dataObj.user_ans=$(this).attr('user_ans');
                    if (bs.getUrlVar('rids')) {
                        sendCurrentReview(dataObj);
                    }

                    if (newObj.current_idx == newObj.quiz_state_ary.length - 1) {
                        $('#aa_res').append('<button class="btn btn-orange" type="button" id="btn-over">結束</button>');
                        $('#btn-over').on('click',function(e){
                            e.preventDefault();
                            window.history.back();
                        });
                    }
                    else {
                        $('#aa_res').append('<button class="btn btn-info" type="button" id="btn-next">下一題</button>');
                    }

                    $('#btn-next').off('click').on('click', function(e) {
                        e.preventDefault();
                        if (newObj.current_idx == newObj.quiz_state_ary.length - 1) {
                            return false;
                        } else {
                            var nextIdx = newObj.current_idx + 1;
                            var nextQuizId = newObj.quiz_state_ary[nextIdx].quiz_id;
                            newObj.current_idx = nextIdx;
                            newObj.current_quiz_id = nextQuizId;
                            getQuizContent(newObj.current_idx, newObj.current_quiz_id);
                            window.ART.blackBoard.switch(newObj.current_idx);
                        }
                    })
                });
            },
            error: bs.errorHandler
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

            if (item.ans_remove) {
                $.each(item.ans_remove, function(key2, item2) {
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').prop('checked', false);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').attr('disabled', true);
                    $('.quiz-content[data-idx="' + item.data_idx + '"]').find('input[name="inputQuiz"][value="' + item2 + '"]').next().addClass('ans-state');
                });
            }
        });
    }

    function sendCurrentReview(dataObj) {
        $.ajax({
            url: '/admin/exam/send-current-review',
            type: 'POST',
            data:dataObj,
            success: function(res) {},
            error: bs.errorHandler
        });
    }

    function getOptionHtml(input_type,idx,new_opt,opt,qa_opt){

        var inner_html='';

        inner_html=
        '<div id="imgQA-'+new_opt+'">\
            <div class="form-check form-check-inline">\
                <div id="q' + idx + '-'+new_opt+'" style="display:inline-block;width:20px">\
                    <i class="ion-arrow-right-c"></i>\
                    <i class="ion-close"></i>\
                </div>\
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
});
