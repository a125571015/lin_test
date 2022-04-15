$(function() {
    'use strict';
    var newObj = {};
    newObj.grade_code='';
    init();

    function init() {
        getQuizresult();

        $('#btnLeave').on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/stuboard';
        });

       //錯誤發問改用編輯器
        $('#quiz-ask-content').summernote({
            height: 250,
            width: 350,
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

        //我要發問改用編輯器
        $('#quiz-ask-teacher-content').summernote({
            height: 250,
            width: 350,
            tooltip: false,
            toolbar: [
                ['insert', [ 'picture']],
            ],
        });

        try {
            $('#quiz-ask-teacher-content').summernote('code', summernoteContent);
        }
        catch (e) {
        }

        $('.note-group-image-url').attr('style','display:none');


        $("[name='my-checkbox']").bootstrapSwitch({
            onSwitchChange: function(event, state) {
                if (state == true) {
                    $('.quiz-title:visible').next().show();
                    $('.btnAA').trigger('click');



                    $('.detail-with').removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
                } else {
                    $('.detail-with').removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
                    $('.imgAA-html').hide();
                    $('.imgBoard-html').hide();
                    $('.quiz-content').hide();
                    $('.btnAA').show();
                }
            }
        });

        $('#btn-wrong').on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/exam/wrong?rids=' + bs.getUrlVar('rid');
        });

        $('#btn-only-wrong').on('click', function(e) {
            e.preventDefault();
            if (!$(this).find('i').hasClass('wrong-btn')) {
                $(this).find('i').addClass('wrong-btn');
                $('i.fa.fa-circle-o').parent().parent().hide();
                $('i.fa.fa-close').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-circle-o').parent().parent().next().hide();
                    $('i.fa.fa-close').parent().parent().next().show();
                }
            } else {
                $(this).find('i').removeClass('wrong-btn');
                $('i.fa.fa-circle-o').parent().parent().show();
                $('i.fa.fa-close').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-circle-o').parent().parent().next().show();
                    $('i.fa.fa-close').parent().parent().next().show();
                }
            }
            $('#div-area').show();
        });

        $('#btn-only-slow').on('click', function(e) {
            e.preventDefault();
            if (!$(this).find('i').hasClass('slow-btn')) {
                $(this).find('i').addClass('slow-btn');
                $('i.fa.fa-plane').parent().parent().hide();
                $('i.fa.fa-normal').parent().parent().hide();
                $('i.fa.fa-bicycle').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-plane').parent().parent().next().hide();
                    $('i.fa.fa-normal').parent().parent().next().hide();
                    $('i.fa.fa-bicycle').parent().parent().next().show();
                }
            } else {
                $(this).find('i').removeClass('slow-btn');
                $('i.fa.fa-plane').parent().parent().show();
                $('i.fa.fa-normal').parent().parent().show();
                $('i.fa.fa-bicycle').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-plane').parent().parent().next().show();
                    $('i.fa.fa-normal').parent().parent().next().show();
                    $('i.fa.fa-bicycle').parent().parent().next().show();
                }
            }
            $('#div-area').show();
        });

        $('#btn-only-fast').on('click', function(e) {
            e.preventDefault();
            if (!$(this).find('i').hasClass('fast-btn')) {
                $(this).find('i').addClass('fast-btn');
                $('i.fa.fa-plane').parent().parent().show();
                $('i.fa.fa-normal').parent().parent().hide();
                $('i.fa.fa-bicycle').parent().parent().hide();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-plane').parent().parent().next().show();
                    $('i.fa.fa-normal').parent().parent().next().hide();
                    $('i.fa.fa-bicycle').parent().parent().next().hide();
                }

            } else {
                $(this).find('i').removeClass('fast-btn');
                $('i.fa.fa-plane').parent().parent().show();
                $('i.fa.fa-normal').parent().parent().show();
                $('i.fa.fa-bicycle').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-plane').parent().parent().next().show();
                    $('i.fa.fa-normal').parent().parent().next().show();
                    $('i.fa.fa-bicycle').parent().parent().next().show();
                }
            }
            $('#div-area').show();
        });

        $('#btn-only-check').on('click', function(e) {
            e.preventDefault();
            if (!$(this).find('i').hasClass('check-btn')) {
                $(this).find('i').addClass('check-btn');
                $('i.fa.fa-check').parent().parent().show();
                $('i.fa.fa-nocheck').parent().parent().hide();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-check').parent().parent().next().show();
                    $('i.fa.fa-nocheck').parent().parent().next().hide();
                }
            } else {
                $(this).find('i').removeClass('check-btn');
                $('i.fa.fa-check').parent().parent().show();
                $('i.fa.fa-nocheck').parent().parent().show();
                if ($('input:checkbox[name="my-checkbox"]').prop('checked')) {
                    $('i.fa.fa-check').parent().parent().next().show();
                    $('i.fa.fa-nocheck').parent().parent().next().show();
                }
            }
            $('#div-area').show();
        });
        //錯誤回報
        $('#btn-ask-confirm').on('click',function(e){
            e.preventDefault();

            if (!newObj.qid) {
                swal('請選擇要發問的題目');
                return false;
            }

            if ($('#quiz-ask-content').summernote('isEmpty')){
                swal('請輸入要發問的內容');
                return false;
            }
            // if (!$('#quiz-ask-content').val()) {
            // 	swal('請輸入要發問的內容');
            // 	return false;
            // }
            swal({
                title: '確認送出您的發問嗎？',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>取消</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                $('#ask-modal').modal('hide');
                var dataObj={};
                dataObj.tid=bs.getUrlVar('tid');
                dataObj.rid=bs.getUrlVar('rid');
                dataObj.qid=newObj.qid;
                dataObj.ask_content=$('#quiz-ask-content').summernote('code');
                dataObj.kind=1;
                //錯誤回報是1
                bs.sendQuizAskContent(dataObj);
                $('#quiz-ask-content').summernote('reset');
                //$('#quiz-ask-content').val('');
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });


        $('#btn-ask-teacher-confirm').on('click',function(e){
            e.preventDefault();

            if (!newObj.qid) {
                swal('請選擇要發問的題目');
                return false;
            }

            if ($('#quiz-ask-teacher-content').summernote('isEmpty')){
                swal('請輸入要發問的內容');
                return false;
            }


            // if (!$('#quiz-ask-teacher-content').val()) {
            //     swal('請輸入要發問的內容');
            //     return false;
            // }

            swal({
                title: '確認送出您的發問嗎？',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>取消</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                $('#ask-teacher-modal').modal('hide');
                var dataObj={};
                dataObj.tid=bs.getUrlVar('tid');
                dataObj.rid=bs.getUrlVar('rid');
                dataObj.qid=newObj.qid;
                //dataObj.ask_content=$('#quiz-ask-teacher-content').val();
                dataObj.ask_content=$('#quiz-ask-teacher-content').summernote('code');
                dataObj.kind=2;
                //題目發問是2
                bs.sendQuizAskContent(dataObj);
                //$('#quiz-ask-teacher-content').val('');
                $('#quiz-ask-teacher-content').summernote('reset');
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });

        if($('#parent_id').val() == parseInt($('#parent_id').val(), 10) && $('#parent_id').val()!=0){
            $('#btn-wrong').remove();
        }

		if($('#aidux_parent_id').val() == parseInt($('#aidux_parent_id').val(), 10) && $('#aidux_parent_id').val()!=0){
            $('#btn-wrong').remove();
            $('#btnLeave').remove();
        }
    }

    function getQuizresult() {
        $.ajax({
            url: '/admin/exam/get-quizresult?rid=' + bs.getUrlVar('rid'),
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    setTimeout(function() {
                        location.replace('/admin/stuboard');
                    }, 1000);
                    return false;
                }

                var resdata = res.data;

                newObj.grade_code=resdata.grade_code;
                $('#papername').text(resdata.papername);
                $('#papername').attr('title',resdata.full_papername);
                $('#created_at').text(resdata.created_at);
                $('#user-photo').attr('src',(resdata.photo)?resdata.photo:'/admin/uploads/photo/user_130.jpg');
                $('#realname').text(resdata.realname);
                $('#schoolname').text(resdata.schoolname);
                $('#grade_id').text(resdata.grade_id + '年級');
                $('#score').attr('aria-valuenow', resdata.allscore);
                $('#score').attr('style', 'width:' + resdata.allscore + '%');
                $('#show-score').text(resdata.allscore);
                $('#second').attr('aria-valuenow', resdata.costsec);
                var valuemax = 0;
                if (resdata.exam_times == 0) {
                    valuemax = resdata.costsec;
                } else {
                    valuemax = resdata.exam_times * 60;
                }
                $('#second').attr('aria-valuemax', valuemax);
                var allsec = valuemax;
                var second_avg=0;
                if (allsec!=0) {
                    second_avg = Math.round((resdata.costsec / allsec) * 100);
                }
                else {
                    second_avg=100;
                }
                $('#second').attr('style', 'width:' + second_avg + '%');
                var showsec= resdata.costsec;
                var shotime= parseInt(resdata.costsec/60)+'分'+parseInt(resdata.costsec)%60+'秒';
                $('#show-second').text(showsec+'（'+shotime+'）');

				if (resdata.subject_code=='ET') {
					$('.review-area').hide();
					$('.quizview-area').hide();
					var myet_info = JSON.parse(resdata.myet_info);
					var knowledge_html = '';
	                $.each(myet_info.score, function(key, item) {
						if (key!='total') {
							var name = '';
							switch (key) {
								case 'pronun':
									name='發音';
									break;
								case 'pitch':
									name='語調';
									break;
								case 'timing':
									name='流利度';
									break;
								case 'emphasis':
									name='音量';
									break;
								default:

							}
		                    var right_count = item;
		                    var all_count = 100;
		                    var know_percent = Math.round((right_count / all_count) * 100);
		                    knowledge_html +=
		                        '<tr>\
		                        <td style="width:95%;padding-top:20px">\
		                          <span>' + name + '<span style="padding-left:10px">' + know_percent + '%' + '</span>' + '</span>\
		                          <hr>\
		                          <div class="progress">\
		                            <div class="progress-bar-purple" role="progressbar" aria-valuenow="' + right_count + '" aria-valuemin="0" aria-valuemax="' + all_count + '" style="width:' + know_percent + '%">\
		                              <div style="display:inline-block">' + right_count + '/' + all_count + '</div>\
		                            </div>\
		                          </div>\
		                        </td>\
		                     </tr>';
						}
	                });
	                $('#table-knowledge').html(knowledge_html);
					return false;
				}

                var review_complete = resdata.review_complete;
                var review_count = resdata.review_count;
                var reviewPercent=0;
                if (review_count==0) {
                    reviewPercent=100;
                }
                else {
                    reviewPercent = Math.round((review_complete / review_count) * 100);
                }
                $('#review').attr('aria-valuenow', review_complete);
                $('#review').attr('aria-valuemax', review_count);
                $('#review').attr('style', 'width:' + reviewPercent + '%');
                $('#review').html('<div style="display:inline-block">' + review_complete + '/' + review_count + '</div>');
                $('#reviewPercent').text(reviewPercent + '%');

                var get_quiz_knowledge_weak = resdata.quiz_knowledge_weak;
                //依正答率由高到低排序
                var quiz_knowledge_weak = get_quiz_knowledge_weak.sort(function(a, b) {
                    var contentA = Math.round((a.right_count / (a.right_count + a.wrong_count)) * 100);
                    var contentB = Math.round((b.right_count / (b.right_count + b.wrong_count)) * 100);
                    return contentB - contentA;
                });

                var knowledge_html = '';
                var knowledge_good_html = '';
                var knowledge_normal_html = '';
                var knowledge_weak_html = '';
                var is_makeupvideo = resdata.is_makeupvideo;
                var makeupvideo_amount = resdata.makeupvideo_amount;
                var schoolclass_status=resdata.schoolclass_status;
                var check_role=resdata.check_role;
                var makeupstd = resdata.makeupstd;
                var knowledge_well_std = JSON.parse(resdata.knowledge_well_std);

                $.each(quiz_knowledge_weak, function(key, item) {
                    var name = item.name;
                    var right_count = item.right_count;
                    var wrong_count = item.wrong_count;
                    var all_count = right_count + wrong_count;
                    var know_percent = Math.round((right_count / all_count) * 100);
                    knowledge_html +=
                        '<tr>\
                        <td style="width:95%;padding-top:20px">\
                          <span>' + name + '<span style="padding-left:10px">' + know_percent + '%' + '</span>' + '</span>\
                          <hr>\
                          <div class="progress">\
                            <div class="progress-bar-purple" role="progressbar" aria-valuenow="' + right_count + '" aria-valuemin="0" aria-valuemax="' + all_count + '" style="width:' + know_percent + '%">\
                              <div style="display:inline-block">' + right_count + '/' + all_count + '</div>\
                            </div>\
                          </div>\
                        </td>\
                     </tr>';

                    if(know_percent > parseInt(knowledge_well_std[1])){
                        knowledge_good_html += name + '<br/>';
                    }else if(know_percent <= parseInt(knowledge_well_std[1]) && know_percent >= parseInt(knowledge_well_std[0])){
                        knowledge_normal_html += name + '<br/>';
                    }else{
                        knowledge_weak_html += name + '<br/>';
                    }

                });
                $('#table-knowledge').html(knowledge_html);
                $('.level-high').html(knowledge_well_std[1]);
                $('.level-low').html(knowledge_well_std[0]);
                $('#knowledge-good').html(knowledge_good_html);
                $('#knowledge-normal').html(knowledge_normal_html);
                $('#knowledge-weak').html(knowledge_weak_html);

                //補強影片
                //過濾後排序
                var filter_makeup_knowledge = get_quiz_knowledge_weak
                    .filter(function(element, index, arr){
                        return Math.round((element.right_count / (element.right_count + element.wrong_count)) * 100) < makeupstd;
                    })
                    .sort(function(a, b){
                        var contentA = Math.round((a.right_count / (a.right_count + a.wrong_count)) * 100);
                        var contentB = Math.round((b.right_count / (b.right_count + b.wrong_count)) * 100);
                        return contentA - contentB;
                    });
                var quizpaper_id =resdata.quizpaper_id;
                getMakeupVideo(resdata.schoolclass_id, resdata.is_schoolvideo, resdata.grade_code, resdata.subject_code, filter_makeup_knowledge, is_makeupvideo, makeupvideo_amount,quizpaper_id)

                $('#last_wrong_count').text(resdata.last_wrong_count + '題');
				if (resdata.last_wrong_count==0) {
					$('#btn-wrong').removeClass('btn-purple').addClass('btn-secondary');
					$('#btn-wrong').attr('disabled',true);
				}
                if (check_role==0){
                    $('#btn-wrong').removeClass('btn-purple').addClass('btn-secondary');
                    $('#btn-wrong').attr('disabled',true);
                }
				if (schoolclass_status==0){
                    $('#btn-wrong').removeClass('btn-purple').addClass('btn-secondary');
                    $('#btn-wrong').attr('disabled',true);
                    $('#last_wrong_count').text(resdata.last_wrong_count + '題, 班級已結業無法進行錯題複習 ');

                }

                if (resdata.mediafile_read) {
                    $('#btn-quizpaper-audio').show();
                    $('#btn-quizpaper-audio').attr('for','audio-quizpaper');
                    $('#div-quizpaper-audio').append('<audio id="audio-quizpaper" style="display:none"><source src="' + resdata.mediafile_read + '" type="audio/mpeg" /></audio>');
                }

                if (bs.getNormalGrade(newObj.grade_code)=='H0') {
                    $('#score-explain').html('高中配分說明');
                    $('#score-explain').on('click',function(e){
                        const content='<br>該題配分 ×﹙該題選項數 ﹣﹙2 × 答錯選項數﹚﹚／該題選項數<br>';
                        swal({
                            title: '<h4 style="color:#0f9cf3">高中配分說明</h4>',
                            text: content,
                            showCloseButton: true,
                            showCancelButton: false,
                            showConfirmButton: false
                        }).then(function() {},function (dismiss) {
                            if (dismiss === 'cancel') {
                                return false;
                            }
                        });
                    });
                }

				newObj.user_from=resdata.user_from;
                newObj.user_type=resdata.user_type;
                newObj.is_ask=resdata.is_ask;


                getQuizView(JSON.parse(resdata.resultdetail), JSON.parse(resdata.paperdetail).quiz_content,resdata.user_type,resdata.is_ask);

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getQuizView(resultdetail, paperdetail,user_type,is_ask) {

        var innerHtml = '';
        var wrongCount = 0;
        $.each(resultdetail, function(key, item) {
            var idx = parseInt(item.origin_idx);
            var no = parseInt(item.origin_idx) + 1;
            var user_result = item.result;
            var user_costsec = item.costsec;
            var checked = item.checked;
            var need_check = item.need_check;
            var qid=item.quizList.id;
            var check_collect=item.quizList.check_collect;
            var quiz_difficulty_name = item.quizList.quiz_difficulty_name;
            var knowledge = item.quizList.knowledge;
            var qg_html=(item.quizList.qg)?'<div><img class="img-quiz" src="' + item.quizList.qg + '"></div><br>':'';
            var qa = item.quizList.qa;
            var qa_a = item.quizList.qa_a;
            var qa_b = item.quizList.qa_b;
            var qa_c = item.quizList.qa_c;
            var qa_d = item.quizList.qa_d;
            var qa_e = item.quizList.qa_e;
            var quiz_ans = item.quizList.sa;
            var user_ans = item.user_ans;
            var aa = item.quizList.aa;
            var aa_a = item.quizList.aa_a;
            var aa_b = item.quizList.aa_b;
            var aa_c = item.quizList.aa_c;
            var aa_d = item.quizList.aa_d;
            var aa_e = item.quizList.aa_e;
            var mediafile=item.quizList.mediafile;
            var mediafile_read=item.quizList.mediafile_read;
            var mediamp4=item.quizList.mediamp4;
            var m3u8=item.quizList.m3u8;
            var startTime;
            var earn_score = item.quizList.earn_score;
            var all_avg_costsec = item.quizList.all_avg_costsec;
            var costsec_percent = Math.round((user_costsec / all_avg_costsec) * 100);
            var board_png= item.quizList.board_png;
            var board_img_html=(board_png)?'<img class="img-fluid" src="'+ board_png +'">':'';
            var mark_knowledges=item.quizList.mark_knowledges;
            var collectHtml=check_collect==1?'<i class="fa fa-heart"></i>':'<i class="fa fa-heart-o"></i>';
            var resultHtml = user_result == 1 ? '<i class="fa fa-circle-o"></i>' : '<i class="fa fa-close"></i>';
            var flashHtml = '';

            if (checked == 1 && costsec_percent < 25) {
                flashHtml = '<i class="fa fa-plane">';
            } else if (checked == 1 && costsec_percent > 75) {
                flashHtml = '<i class="fa fa-bicycle">';
            } else {
                flashHtml = '<i class="fa fa-normal">';
            }

            var need_checkHtml = need_check == 1 ? '<i class="fa fa-check"></i>' : '<i class="fa fa-nocheck"></i>';
            var difficultHtml = quiz_difficulty_name;

            var state_img_html = user_result == 1 ? '' : 'style="min-height:100px;background:url(/admin/material/images/quizimg/Testpaper_box_2.png) no-repeat"';
            if (user_result == 0) {
                wrongCount++;
            }

            var qa_a_html = '';
            var qa_b_html = '';
            var qa_c_html = '';
            var qa_d_html = '';
            var qa_e_html = '';
            if (quiz_ans) {
                quiz_ans = (quiz_ans) ? quiz_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quiz_ans;
            }

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

            var chk_a = '';
            var chk_b = '';
            var chk_c = '';
            var chk_d = '';
            var chk_e = '';
            if (user_ans) {
                var user_ans_ary=user_ans.split(';');
                $.each(user_ans_ary,function(key,item){
                    switch (item) {
                        case 'A':
                        case '①':
                            chk_a = 'checked';
                            break;
                        case 'B':
                        case '②':
                            chk_b = 'checked';
                            break;
                        case 'C':
                        case '③':
                            chk_c = 'checked';
                            break;
                        case 'D':
                        case '④':
                            chk_d = 'checked';
                            break;
                        case 'E':
                        case '⑤':
                            chk_e = 'checked';
                            break;
                        default:
                            break;
                    }
                });
            }


            var input_type=(paperdetail[key].quiz_category_id==1)?'radio':'checkbox';
            var input_str=(paperdetail[key].quiz_category_id==1)?'單選題':'多選題';

            if (qa_a) {
                qa_a_html = getOptionHtml(input_type,idx,new_opt_a,chk_a,opt_a,qa_a);
            }

            if (qa_b) {
                qa_b_html = getOptionHtml(input_type,idx,new_opt_b,chk_b,opt_b,qa_b);
            }

            if (qa_c) {
                qa_c_html = getOptionHtml(input_type,idx,new_opt_c,chk_c,opt_c,qa_c);
            }

            if (qa_d) {
                qa_d_html = getOptionHtml(input_type,idx,new_opt_d,chk_d,opt_d,qa_d);
            }

            if (qa_e) {
                qa_e_html = getOptionHtml(input_type,idx,new_opt_e,chk_e,opt_e,qa_e);
            }

            var aa_html = '';
            var aa_a_html = '';
            var aa_b_html = '';
            var aa_c_html = '';
            var aa_d_html = '';
            var aa_e_html = '';
            var video_html= '';

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

            var aa_title = '';
            if (aa_html != '' || aa_a_html != '' || aa_b_html != '' || aa_c_html != '' || aa_d_html != '' || aa_e_html != '') {
                aa_title = '<h4>解析</h4>';
            }

            // if (mediamp4) {
            //     video_html =
            //     '<br><br><video id="m3u8_' + qid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  data-setup="{}">\
            //         <source src="' + mediamp4 + '" type="video/mp4">\
            //      </video>';
            // }

            var btn_board_html=(board_png)?'<button type="button" for="imgBoard-' + idx + '" user_ans="' + user_ans + '" quiz_ans="' + quiz_ans + '" class="btn btn-primary btnBoard">顯示手寫板</button>':'';

			var audio_html='';
			var btn_audio_html='';
			if (mediafile) {
				var audio_obj={};
				audio_obj.id='audio-'+idx;
				audio_obj.src=mediafile;
				audio_obj.btn_css='btn-audio';
				audio_obj.btn_dom=$('.btn-audio');
				audio_obj.btn_text='答案音檔';
				audio_obj.btn_for='audio-'+idx;
				audio_html=bs.getAudioHtml(audio_obj);
				btn_audio_html=bs.getBtnAudioHtml(audio_obj);
			}

			var audio_read_html='';
			var btn_audio_read_html='';
			if (mediafile_read) {
				var audio_obj={};
				audio_obj.id='audio-read-'+idx;
				audio_obj.src=mediafile_read;
				audio_obj.btn_css='btn-audio-read';
				audio_obj.btn_dom=$('.btn-audio-read');
				audio_obj.btn_text='題目音檔';
				audio_obj.btn_for='audio-read-'+idx;
				audio_read_html=bs.getAudioHtml(audio_obj);
				btn_audio_read_html=bs.getBtnAudioHtml(audio_obj);
			}
            var video_html='';
			var hide_mp4_html='';
            var hide_btn_mp4_html='';
			var mp4_html='';
            var btn_mp4_html='';
            if (mediamp4!='') {
                var video_html=
                    '<video id="m3u8_'+qid+'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls" style="display:none"   data-setup=\'{ "playbackRates": [0.5,0.7, 1,1.25, 1.5, 2] }\' >\
                  <source src="'+m3u8+'" type="video/mp4">\
              </video>';


                var mp4_obj={};
                mp4_obj.id='mp4-'+idx;
                mp4_obj.btn_css='btn-mp4';
                mp4_obj.btn_dom=$('.btn-mp4');
                mp4_obj.btn_text='解題影片';
                mp4_obj.btn_qid=qid;
                mp4_obj.btn_m3u8=m3u8;
                // mp4_html=bs.getAudioHtml(mp4_obj);
                btn_mp4_html=bs.getBtnAudioHtml(mp4_obj);
                var hide_obj={};
                hide_obj.id='hide-mp4'+idx;
                hide_obj.btn_css='btn-hide-mp4';
                hide_obj.btn_dom=$('.btn-hide-mp4');
                hide_obj.btn_text='隱藏影片';
                hide_obj.btn_qid=qid;
                hide_obj.btn_m3u8=m3u8;
                hide_btn_mp4_html=bs.getHidemp4BtnHtml(hide_obj);



            }






            var mark_knowledge_html='';
            if (mark_knowledges.length>0) {
                mark_knowledge_html+='<br><br>';
                mark_knowledge_html+='<strong style="margin-right:10px;font-size:16px;vertical-align:middle">知識解說</strong>';
                $.each(mark_knowledges,function(mkey,mitem){
                    mark_knowledge_html+='<button type="button" id="know-'+mitem.id+'" class="btn btn-primary btn-mark-knowledge m-l-5">'+mitem.name+'</button>'
                });
            }
            var btn_ask_teacher='btn-ask-teacher';
			var btn_ask_class='';
			if (newObj.user_from=='aidux') {
				btn_ask_class='btn-ask-aidux';
			}
			else {
				btn_ask_class='btn-ask-quiz';
			}
            var check_location=location.host;

			//視窗大小會造成需要滑動的狀況,若需修改再打開並把下面knowldge改成new_knowledge
			// var knowledge_array=knowledge.split(';');
            //
            // var new_knowledge='';
			// knowledge_array.forEach(function(value,key ) {
            //     new_knowledge+=value+";";
			//     new_knowledge+='<br>';
            // });




            innerHtml+='<tr class="quiz-title tr-hover" for="q' + idx + '" style="text-align:center;white-space:nowrap">';
			innerHtml+='<td class="quiz-title-collect" style="width:1%;color:red" data-id="'+qid+'">' + collectHtml + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:1%">' + no + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:1%">' + resultHtml + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:1%">' + flashHtml + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:1%">' + need_checkHtml + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:1%">' + difficultHtml + '</td>';
			innerHtml+='<td class="quiz-title-sub" style="width:94%">' + knowledge + '</td>';
			innerHtml+='<td class="quiz-title-sub"><i class="fa fa-angle-double-down detail-with"></i></td>';
			innerHtml+='</tr>';
			innerHtml+='<tr class="quiz-content" id="q' + idx + '">';
			innerHtml+='<td colspan="8">';
			innerHtml+='<div class="">'+input_str+' 得分/配分 (' + earn_score + '/' + paperdetail[key].score + '分)';
			innerHtml+='<div style="margin-right: 12px  display: inline-block"><i class="fa fa-question-circle-o fa-2x '+btn_ask_class+' cursor-pointer" data-id="'+qid+'" style="float:right "></i> </div>';
			if (user_type==1 && check_location!='aidux.ailead365.com' && is_ask==1) {

			    innerHtml += '<div style="margin-right: 12px  display: inline-block"><i class="fa fa-user-circle-o  fa-2x ' + btn_ask_teacher + ' cursor-pointer"  data-id="' + qid + '"  style="float:right; margin-right:25px"></i></div>';
            }
			innerHtml+='</div>';
			innerHtml+='<div class="">個人/群體答對時間 (' + user_costsec + '/' + all_avg_costsec + '秒)';
			innerHtml+='</div>';
			innerHtml+='<div style="padding:10px">';
			innerHtml+=''+ qg_html +'';
			innerHtml+='<div id="imgQA-' + idx + '" ' + state_img_html + '>';
			innerHtml+='<img class="img-quiz" src="' + qa + '">';
			innerHtml+='</div>';
			innerHtml+='' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '';
			innerHtml+='<br>';
            innerHtml+='<button type="button" for="imgAA-' + idx + '" user_ans="' + user_ans + '" quiz_ans="' + quiz_ans + '" class="btn btn-primary btnAA" style="margin-right:5px">顯示答案解析</button>';
            innerHtml+= btn_board_html;
            innerHtml+='' +  audio_read_html + btn_audio_read_html + audio_html + btn_audio_html + mark_knowledge_html +btn_mp4_html+hide_btn_mp4_html+'';
            innerHtml+='<div id="imgAA-' + idx + '" class="imgAA-html" style="display:none">';
            innerHtml+='' + aa_title + '';
            innerHtml+='' + aa_html + '';
            innerHtml+='' + aa_a_html + '';
            innerHtml+='' + aa_b_html + '';
            innerHtml+='' + aa_c_html + '';
            innerHtml+='' + aa_d_html + '';
            innerHtml+=' '+ aa_e_html + '';
            innerHtml+='</div>';
            innerHtml+='<div id="imgBoard-' + idx + '" class="imgBoard-html" style="display:none" class="board-block">';
            innerHtml+='' + board_img_html + '';
            innerHtml+='</div>';
            innerHtml+='</div>';
            innerHtml+='' + video_html + '';
            innerHtml+='</td>';
            innerHtml+='</tr>';



            // innerHtml +=
            //     '<tr class="quiz-title tr-hover" for="q' + idx + '" style="text-align:center;white-space:nowrap">\
            // <td class="quiz-title-collect" style="width:1%;color:red" data-id="'+qid+'">' + collectHtml + '</td>\
            // <td class="quiz-title-sub" style="width:1%">' + no + '</td>\
            // <td class="quiz-title-sub" style="width:1%">' + resultHtml + '</td>\
            // <td class="quiz-title-sub" style="width:1%">' + flashHtml + '</td>\
            // <td class="quiz-title-sub" style="width:1%">' + need_checkHtml + '</td>\
            // <td class="quiz-title-sub" style="width:1%">' + difficultHtml + '</td>\
            // <td class="quiz-title-sub" style="width:94%">' + knowledge + '</td>\
            // <td class="quiz-title-sub"><i class="fa fa-angle-double-down detail-with"></i></td>\
            // </tr>\
            // <tr class="quiz-content" id="q' + idx + '">\
            // <td colspan="8">\
            // <div class="">'+input_str+' 得分/配分 (' + earn_score + '/' + paperdetail[key].score + '分)\
            // <div style="margin-right: 12px  display: inline-block"><i class="fa fa-question-circle-o fa-2x '+btn_ask_class+' cursor-pointer" data-id="'+qid+'" style="float:right "></i></div>\
            // <div style="margin-right: 12px  display: inline-block"><i class="fa fa-user-circle-o  fa-2x '+btn_ask_teacher+' cursor-pointer"  data-id="'+qid+'"  style="float:right "></i></div>\
            // </div>\
            // <div class="">個人/群體答對時間 (' + user_costsec + '/' + all_avg_costsec + '秒)\
            // </div>\
            // <div style="padding:10px">\
            // '+ qg_html +'\
            // <div id="imgQA-' + idx + '" ' + state_img_html + '>\
            // <img class="img-quiz" src="' + qa + '">\
            // </div>\
            // ' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
            // <br>\
            // <button type="button" for="imgAA-' + idx + '" user_ans="' + user_ans + '" quiz_ans="' + quiz_ans + '" class="btn btn-primary btnAA">顯示答案解析</button>\
            // ' + btn_board_html + '\
            // ' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html + mark_knowledge_html +btn_mp4_html+hide_btn_mp4_html+'\
            // <div id="imgAA-' + idx + '" class="imgAA-html" style="display:none">\
            // ' + aa_title + '\
            // ' + aa_html + '\
            // ' + aa_a_html + '\
            // ' + aa_b_html + '\
            // ' + aa_c_html + '\
            // ' + aa_d_html + '\
            // ' + aa_e_html + '\
            // </div>\
            // <div id="imgBoard-' + idx + '" class="imgBoard-html" style="display:none" class="board-block">\
            // ' + board_img_html + '\
            // </div>\
            // </div>\
            // ' + video_html + '\
            // </td>\
            // </tr>';


        });



        $('#quizBody').html('').append(innerHtml);


        $('.quiz-content').hide();

        $('.quiz-title-collect').on('click',function(e){
            e.preventDefault();
            quizCollect(this);
        })

        $('.quiz-title-sub').on('click', function(e) {
            e.preventDefault();
            $('#' + $(this).parent().attr('for')).toggle();
            if($(this).parent().find('.detail-with').hasClass('fa-angle-double-down')){
                $(this).parent().find('.detail-with').removeClass('fa-angle-double-down').addClass('fa-angle-double-up');
                return;
            }

            if($(this).parent().find('.detail-with').hasClass('fa-angle-double-up')){
                $(this).parent().find('.detail-with').removeClass('fa-angle-double-up').addClass('fa-angle-double-down');
                return;
            }
        });

        $('.btnAA').on('click', function(e) {
            $(this).hide();
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
        });

        $('.btnBoard').on('click', function(e) {
            $(this).hide();
            $('#' + $(this).attr('for')).show();
        });

		$('.btn-audio-read').off('click').on('click', function(e) {
			var audio_obj={};
			audio_obj.id=$(this).attr('for');
			audio_obj.btn_dom=$(this);
			audio_obj.btn_text='題目音檔';
			bs.setAudioPlay(audio_obj);
		});

		$('.btn-audio').off('click').on('click', function(e) {
			var audio_obj={};
			audio_obj.id=$(this).attr('for');
			audio_obj.btn_dom=$(this);
			audio_obj.btn_text='答案音檔';
			bs.setAudioPlay(audio_obj);
		});

        $('.btn-mp4').on('click',function (e){
            e.preventDefault();

            var openqid = $(this).attr('qid');
            var openm3u8=$(this).attr('m3u8');
            var openvideoid='m3u8_'+openqid+'mp4video';

            var player = videojs(openvideoid);
            player.src({
                src: openm3u8,
                type: 'application/x-mpegURL',
            });
            // $('#'+openvideoid)[0].style.display="block";
             $('#'+openvideoid).show();
             $('#'+openvideoid+'_html5_api').show();




        });
        $('.btn-hide-mp4').on('click',function (e){
            e.preventDefault();

            var closeqid = $(this).attr('qid');
            var closem3u8=$(this).attr('m3u8');
            var closevideoid='m3u8_'+closeqid+'mp4video';

            var player = videojs(closevideoid);
            player.pause();

            // $('#'+closevideoid)[0].style.display="none";
             $('#'+closevideoid).hide();
             $('#'+closevideoid+'_html5_api').hide();

        });

        $('.btn-mark-knowledge').on('click',function(e){
            var kid = $(this).attr('id').replace('know-','');
            var kname = $(this).text();
            showKnowledgeContent(kid,kname);
        });

		$('.btn-ask-quiz').on('click',function(e){
			e.preventDefault();
			$('#ask-modal').modal('show');
			newObj.qid=$(this).attr('data-id');
		});

		$('.btn-ask-teacher').on('click',function(e){
            e.preventDefault();
            $('#ask-teacher-modal').modal('show');
            newObj.qid=$(this).attr('data-id');

		});


		$('.btn-ask-aidux').on('click',function(e){
			e.preventDefault();
			newObj.qid=$(this).attr('data-id');
			getQuizContentToAidux(newObj.qid);
		});

        if($('#parent_id').val() == parseInt($('#parent_id').val(), 10) && $('#parent_id').val()!=0){
            $('#th-quiz-title-collect').remove();
            $('.quiz-title-collect').remove();
        }

		if($('#aidux_parent_id').val() == parseInt($('#aidux_parent_id').val(), 10) && $('#aidux_parent_id').val()!=0){
			$('#th-quiz-title-collect').remove();
            $('.quiz-title-collect').remove();
        }

    }

    function quizCollect(dom){
        var dataObj={};
        dataObj.rid=bs.getUrlVar('rid');
        dataObj.qid=$(dom).attr('data-id');
        $.ajax({
          url: '/admin/exam/set-quiz-collect',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var msg=res.message;
              var check_collect=res.check_collect;
              if (msg!='success') {
                  swal(msg);
                  return false;
              }
              var collect_html=check_collect==1?'<i class="fa fa-heart"></i>':'<i class="fa fa-heart-o"></i>';
              $(dom).html(collect_html);
          },
          error: bs.errorHandler
        });
    }

    function initVideo(vid,m3u8){
        var player = videojs(vid);
        player.src({
            src: m3u8,
            type: 'application/x-mpegURL',
        });
    }

    function showKnowledgeContent(kid,kname){

        $.ajax({
          url: '/admin/exam/get-mark-knowledge?kid='+kid,
          type: 'GET',
          success: function (res) {

              var collectHtml=res.check_collect==1?'<i class="fa fa-heart kcard" data-id="'+kid+'"></i>':'<i class="fa fa-heart-o kcard" data-id="'+kid+'"></i>';
              var title=collectHtml+kname;
              var content='<img class="img-fluid" src="'+'/admin/material/images/knowledge/'+ kid +'.png" />';
              content+='<br><br>';
              var mark_knowledges=res.mark_knowledge_ary;
              if (mark_knowledges.length>0) {
                  content+='<h5 style="text-align:left">相關知識解說</h5>';
                  $.each(mark_knowledges,function(mkey,mitem){
                      content+='<button type="button" id="know-'+mitem.id+'" class="btn btn-primary btn-link-knowledge float-left m-l-5 m-b-5">'+mitem.name+'</button>';
                  });
              }

              swal({
                  title: title,
                  text: content,
                  showCloseButton: true,
                  showCancelButton: false,
                  showConfirmButton: false
              }).then(function() {},function (dismiss) {
                  if (dismiss === 'cancel') {
                      return false;
                  }
              });

              $('.kcard').off('click').on('click',function(e){
                  e.preventDefault();
                  knowCollect(this);
              });

              $('.btn-link-knowledge').off('click').on('click',function(e){
                  var lid = $(this).attr('id').replace('know-','');
                  var kname = $(this).text();
                  showKnowledgeContent(lid,kname);
              });

          },
          error: bs.errorHandler
        });
    }

    function knowCollect(dom){
        var dataObj={};
        dataObj.rid=bs.getUrlVar('rid');
        dataObj.kid=$(dom).attr('data-id');

        $.ajax({
          url: '/admin/exam/set-know-collect',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var msg=res.message;
              if (msg!='success') {
                  swal(msg);
                  return false;
              }

              var check_collect=res.check_collect;
              if (check_collect==1) {
                  $(dom).removeClass('fa-heart-o').addClass('fa-heart');
              }
              else {
                  $(dom).removeClass('fa-heart').addClass('fa-heart-o');
              }
          },
          error: bs.errorHandler
        });
    }

    function getOptionHtml(input_type,idx,new_opt,checked,opt,qa_opt){

        var inner_html='';

        inner_html=
        '<div class="m-t-10">\
             <div class="form-check form-check-inline">\
                <div id="q' + idx + '-'+new_opt+'" style="display:inline-block;width:15px">\
                    <i class="ion-arrow-right-c"></i>\
                    <i class="ion-close"></i>\
                </div>\
                <input class="form-check-input" type="'+input_type+'" name="q' + idx + '" value="'+new_opt+'" disabled ' + checked + '>\
                <label class="form-check-label">'+opt+'</label>\
                <div style="display:inline-block;margin-left:10px">\
                    <img class="img-quiz" src="' + qa_opt + '" alt="">\
                </div>\
             </div>\
             <hr>\
         </div>';

        return inner_html;
    }

    function getMakeupVideo(schoolclass_id, is_schoolvideo, grade_code, subject_code, target_knowlwdge, is_makeupvideo, makeupvideo_amount,quizpaper_id){
        var dataObj={};
        dataObj.is_schoolvideo=is_schoolvideo;
        dataObj.grade_code=grade_code;
        dataObj.subject_code=subject_code;
        dataObj.target_knowlwdge=target_knowlwdge;
        dataObj.is_makeupvideo=is_makeupvideo;
        dataObj.makeupvideo_amount=makeupvideo_amount;
        dataObj.schoolclass_id=schoolclass_id;
        dataObj.quizpaper_id=quizpaper_id;

        $.ajax({
            url: '/admin/exam/get-makeup-video',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                if(res.message == 'success'){
                    var video_data = res.data;
                    var makeupvideo_html = '';
                    var user_type = res.user_type;
                    $.each(video_data, function(key, item){
                        let href = '';
                        if(user_type != '1'){
                            href = '/admin/schoolvideo/videoview?id='+ item.id;
                        }else{
                            href ='/admin/exam/videoexam?cid='+ schoolclass_id +'&fid='+ item.id+'&kind=3';
                        }
                        makeupvideo_html+=
                            '<tr>\
                                <td>'+ (key+1) +'</td>\
                                <td><a href="'+ href +'" target="_blank">'+ item.title_name +'</a></td>\
                                <td>'+ item.video_length +'</td>\
                            </tr>';
                    });

                    $('#table-makeupvideo').append(makeupvideo_html);

                    $('th#makeup_video_title').text('弱點補強影片 ,總共'+res.video_count+"支影片");

                }else{
                    $('.makeupvideo_zone').hide();
                }
            },
            error: bs.errorHandler
        });
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
            error: bs.errorHandler
        });
    }
});
