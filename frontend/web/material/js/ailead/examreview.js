$(function() {
    'use strict';
    var newObj = {};
    newObj.quiz_state_ary = [];
    newObj.current_idx = 0;
    newObj.current_quiz_id = 0;
    newObj.grade_code='';
    init();

    function init() {

        //發問改用編輯器
        $('#quiz-ask-content').summernote({
            height: 250,
            width: 900,
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
        $('[id*="all-"]').parent().hide();

        newObj = initObj();
        newObj.getQuizpaper();

        $('#btn-set').on('click', function(e) {
            e.preventDefault();
            $.blockUI({
                message: $('.confirm-modal'),
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
        });

        $('.close').on('click',function(e){
            $.unblockUI();
        });

        $('#btn-confirm').on('click', function(e) {
            e.preventDefault();
            if ($('input:radio:checked[name="radio-fullscreen"]').val() == '1') {
                openFullscreen();
            } else {
                closeFullscreen();
            }

            if ($('input:radio:checked[name="radio-sort"]').val() == '1') {
                setQuizSort('data-idx');
            } else {
                setQuizSort('right-percent');
            }

            setRangeColor();

            $.unblockUI();
        });

        $('.option-right').on('click', function(e) {
            $('.for-option-right').toggle();
        });
        $('.list-times').on('click', function(e) {
            $('.for-list-times').toggle();
        });
        $('.option-A').on('click', function(e) {
            $('.for-option-A').toggle();
        });
        $('.option-B').on('click', function(e) {
            $('.for-option-B').toggle();
        });
        $('.option-C').on('click', function(e) {
            $('.for-option-C').toggle();
        });
        $('.option-D').on('click', function(e) {
            $('.for-option-D').toggle();
        });
        $('.option-E').on('click', function(e) {
            $('.for-option-E').toggle();
        });
        $('.option-no').on('click', function(e) {
            $('.for-option-no').toggle();
        });
        $('.list-A').on('click', function(e) {
            $('.for-list-A').toggle();
        });
        $('.list-B').on('click', function(e) {
            $('.for-list-B').toggle();
        });
        $('.list-C').on('click', function(e) {
            $('.for-list-C').toggle();
        });
        $('.list-D').on('click', function(e) {
            $('.for-list-D').toggle();
        });
        $('.list-E').on('click', function(e) {
            $('.for-list-E').toggle();
        });
        $('.list-no').on('click', function(e) {
            $('.for-list-no').toggle();
        });

		$('#btn-ask-confirm').on('click',function(e){
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
            //
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
				var dataObj={};
				dataObj.tid=bs.getUrlVar('tid');
				dataObj.rid=bs.getUrlVar('rid');
		        dataObj.qid=newObj.qid;
                dataObj.ask_content=$('#quiz-ask-content').summernote('code');
		        //dataObj.ask_content=$('#quiz-ask-content').val();
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

        setRangeColor();

    }

    function initObj() {
        newObj.getQuizpaper = function() {
            $.ajax({
                url: '/admin/exam/get-quizpaper?tid=' + bs.getUrlVar('tid'),
                type: 'GET',
                success: function(res) {
                    var quizpaper = res.data;
                    //$('#papername').html(quizpaper.task_name);
                    newObj.grade_code=quizpaper.grade_code;
                    getQuizView(JSON.parse(quizpaper.paperdetail));
                },
                error: bs.errorHandler
            });
        };

        return newObj;
    }



    function getQuizView(paperdetail) {
        var outerHtml = '';
        var innerHtml = '';
        var quiz_state_ary = [];
        $.each(paperdetail.quiz_content, function(key, item) {
            innerHtml += '<button class="btn btn-danger quizset" style="margin-right:5px;margin-bottom:5px;width:42px" type="button" origin-idx="' + key + '" data-idx="' + key + '" data-id="' + item.quiz_id + '" >' + (key + 1) + '</button>';
            if (key != 0 && (key + 1) % 5 == 0) {
                var divGroup = $('<div></div>');
                divGroup.append(innerHtml);
                outerHtml += '<div class="btn">' + divGroup.html() + '</div>';
                innerHtml = '';
            }

            var quiz_state = {};
            quiz_state.origin_idx = key;
            quiz_state.data_idx = key;
            quiz_state.quiz_id = parseInt(item.quiz_id);
            quiz_state.ans_remove = [];
            quiz_state_ary.push(quiz_state);
        });

        newObj.quiz_state_ary = quiz_state_ary;

        // 非5的倍數加最後一次html
        if (innerHtml != '') {
            var divGroup = $('<div></div>');
            divGroup.append(innerHtml);
            outerHtml += '<div class="btn">' + divGroup.html() + '</div>';
            innerHtml = '';
        }

        $('#quizview').html('').append(outerHtml);
        getExamreviewQuiz();
    }

    function getExamreviewQuiz() {
        $.ajax({
            url: '/admin/banwu/get-examreview-quiz?id=' + bs.getUrlVar('tid'),
            type: 'GET',
            success: function(res) {
                newObj.quizset=res.data;
                var info = res.data;
                var innerHtml = '';
                $.each(info, function(key, item) {
                    var button_color = '';
                    if (item.right_percent > 60) {
                        button_color = 'btn-info';
                    } else if (item.right_percent >= 40 && item.right_percent <= 60) {
                        button_color = 'btn-orange';
                    } else {
                        button_color = 'btn-danger';
                    }
                    $('#quizview .quizset[data-id="' + item.quiz_id + '"]').removeClass('btn-info').removeClass('btn-orange').removeClass('btn-danger').addClass(button_color);
                    $('#quizview .quizset[data-id="' + item.quiz_id + '"]').attr('right-percent', item.right_percent);
                });
                setQuizSort('right-percent');
            },
            error: bs.errorHandler
        });
    }

    function getExamreview(idx, qid) {
        $.ajax({
            url: '/admin/banwu/get-examreview?qid=' + qid + '&tid=' + bs.getUrlVar('tid'),
            type: 'GET',
            success: function(res) {
                var check_collect=res.check_collect;
                var task_name=res.task_name;
                var quizpaper_name=res.quizpaper_name;
                $('#papername').html(task_name);
                $('#quizpapername').html(quizpaper_name);
                var quizObj = res.data;
                var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                var qa = quizObj.qa;
                var qa_a = quizObj.qa_a;
                var qa_b = quizObj.qa_b;
                var qa_c = quizObj.qa_c;
                var qa_d = quizObj.qa_d;
                var qa_e = quizObj.qa_e;
                var sa = (quizObj.sa) ? quizObj.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quizObj.sa;
                var aa = quizObj.aa;
                var aa_a = quizObj.aa_a;
                var aa_b = quizObj.aa_b;
                var aa_c = quizObj.aa_c;
                var aa_d = quizObj.aa_d;
                var aa_e = quizObj.aa_e;
                var cls_right_percent = quizObj.cls_right_percent;
                var cls_avg_costsec = quizObj.cls_avg_costsec;
                var all_right_percent = quizObj.all_right_percent;
                var all_avg_costsec = quizObj.all_avg_costsec;
                var cls_percent_a = quizObj.cls_percent_a;
                var cls_percent_b = quizObj.cls_percent_b;
                var cls_percent_c = quizObj.cls_percent_c;
                var cls_percent_d = quizObj.cls_percent_d;
                var cls_percent_e = quizObj.cls_percent_e;
                var cls_percent_no = quizObj.cls_percent_no;
                var all_percent_a = quizObj.all_percent_a;
                var all_percent_b = quizObj.all_percent_b;
                var all_percent_c = quizObj.all_percent_c;
                var all_percent_d = quizObj.all_percent_d;
                var all_percent_e = quizObj.all_percent_e;
                var all_percent_no = quizObj.all_percent_no;
                var user_name_a = quizObj.user_name_a;
                var user_name_b = quizObj.user_name_b;
                var user_name_c = quizObj.user_name_c;
                var user_name_d = quizObj.user_name_d;
                var user_name_e = quizObj.user_name_e;
                var user_name_no = quizObj.user_name_no;
                var mediafile=quizObj.mediafile;
				var mediafile_read=quizObj.mediafile_read;
                var mediamp4=quizObj.mediamp4;
                var m3u8=quizObj.m3u8;
                var qid=quizObj.id;
                var startTime;
                var innerHtml = '';
                var qa_a_html = '';
                var qa_b_html = '';
                var qa_c_html = '';
                var qa_d_html = '';
                var qa_e_html = '';

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

                $('#span-opt-a').text(new_opt_a);
                $('#span-opt-b').text(new_opt_b);
                $('#span-opt-c').text(new_opt_c);
                $('#span-opt-d').text(new_opt_d);
                $('#span-opt-e').text(new_opt_e);

                if (qa_a) {
                    qa_a_html = getOptionHtml(idx,new_opt_a,opt_a,qa_a);
                }

                if (qa_b) {
                    qa_b_html = getOptionHtml(idx,new_opt_b,opt_b,qa_b);
                }

                if (qa_c) {
                    qa_c_html = getOptionHtml(idx,new_opt_c,opt_c,qa_c);
                }

                if (qa_d) {
                    qa_d_html = getOptionHtml(idx,new_opt_d,opt_d,qa_d);
                }

                if (qa_e) {
                    qa_e_html = getOptionHtml(idx,new_opt_e,opt_e,qa_e);
                    $('#opt-list-E').show();
                }

                var aa_html = '';
                var aa_a_html = '';
                var aa_b_html = '';
                var aa_c_html = '';
                var aa_d_html = '';
                var aa_e_html = '';

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
                    aa_title = '<h4 style="color:green">解析</h4>';
                }

                var quiz_difficulty_name = quizObj.quiz_difficulty_name;
                var knowledge_name = quizObj.knowledge_name;

                var hide_mp4_html='';
                var hide_btn_mp4_html='';
                var mp4_html='';
                var btn_mp4_html='';
                if (mediamp4!='') {

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
                var video_html='';
                if (mediamp4) {
                    video_html =
                        '<br><br><video id="m3u8_' + qid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  style="display:none;"  data-setup=\'{ "playbackRates": [0.5,0.7, 1,1.25, 1.5, 2] }\'>\
                    <source src="' + mediamp4 + '" type="video/mp4">\
                 </video>';


                    //
                    // var currentTime = 0;
                    //
                    // player.on('play', function () {
                    //     if(!startTime){
                    //         startTime = new Date().getTime();
                    //     }
                    //
                    //
                    //     currentTime = Math.floor(player.currentTime());
                    // });
                    //
                    // player.on('timeupdate', function(e) {
                    //     if(currentTime < Math.floor(player.currentTime())){
                    //
                    //         currentTime = Math.floor(player.currentTime());
                    //     }
                    // });
                }


                innerHtml +=
                '<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                  <h2 class="padding-8px bg-090 color-white text-left">\
                     <i class="fa fa-pencil"></i> 第 ' + (idx + 1) + ' 題\
                  </h2>\
                  <div class="quiz-content" data-idx="' + idx + '">\
                    '+ qg_html +'\
                    <div id="imgQA"><img class="img-quiz" src="' + qa + '"></div><br>\
                    ' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
                    <button type="button" for="imgAA-' + idx + '" sa="' + sa + '" class="btn btn-primary btnAA">顯示答案解析</button>\
                    '+ audio_html + btn_audio_html+btn_mp4_html+hide_btn_mp4_html+'\
                    <div id="imgAA-' + idx + '" style="display:none">\
                      ' + aa_title + '\
                      ' + aa_html + '\
                      ' + aa_a_html + '\
                      ' + aa_b_html + '\
                      ' + aa_c_html + '\
                      ' + aa_d_html + '\
                      ' + aa_e_html + '\
                     <div id="diffAA-' + idx + '" class="m-t-20">\
                        <h4><span style="color:green">難易度</span>：' + quiz_difficulty_name + '</h4>\
                      </div>\
                      <div id="knowAA-' + idx + '" class="m-t-20">\
                        <h4><span style="color:green">知識點</span>：' + knowledge_name + '</h4>\
                      </div>\
                    </div>\
                    ' + video_html + '\
                  </div>\
                 </td></tr></table></div>';

                $('#normalExam').html(innerHtml);

                // $.each($('.video-js'),function(key,item){
                //     initVideo($(item).attr('id'),$(this).find('source').attr('src'));
                // });



                setDisplay();



                $('.ans-remove').off('click').on('click', function(e) {
                    e.preventDefault();

                    $(this).parent().parent().find('.form-check-input').prop('checked', false);
                    var idx = $(this).parent().parent().parent().attr('data-idx');
                    var radio_value = $(this).parent().parent().find('input[name="radioQuiz"]').val();

                    var dom = $(this).parent().siblings().find('.opt-label');
                    if (dom.hasClass('ans-state')) {
                        dom.removeClass('ans-state');
                        dom.attr('disabled', false);
                        var ans_remove_idx = newObj.quiz_state_ary[idx].ans_remove.indexOf(radio_value);
                        if (ans_remove_idx > -1) {
                            newObj.quiz_state_ary[idx].ans_remove.splice(ans_remove_idx, 1);
                        }
                    } else {
                        dom.addClass('ans-state');
                        dom.attr('disabled', true);
                        newObj.quiz_state_ary[idx].ans_remove.push(radio_value);
                        newObj.quiz_state_ary[idx].ans_remove.sort();
                    }

                });

                $('.btnAA').on('click', function(e) {
                    $(this).hide();
                    $('#' + $(this).attr('for')).show();

                    var idx = $(this).attr('for').replace('imgAA-', '');

                    var sa=$(this).attr('sa');
                    var bool_a = (sa.indexOf('A')!=-1 || sa.indexOf('①')!=-1);
                    var bool_b = (sa.indexOf('B')!=-1 || sa.indexOf('②')!=-1);
                    var bool_c = (sa.indexOf('C')!=-1 || sa.indexOf('③')!=-1);
                    var bool_d = (sa.indexOf('D')!=-1 || sa.indexOf('④')!=-1);
                    var bool_e = (sa.indexOf('E')!=-1 || sa.indexOf('⑤')!=-1);

                    if (bool_a) {
                        $('#q' + idx + '-A' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-①' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_b) {
                        $('#q' + idx + '-B' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-②' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_c) {
                        $('#q' + idx + '-C' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-③' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_d) {
                        $('#q' + idx + '-D' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-④' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_e) {
                        $('#q' + idx + '-E' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-⑤' + ' i.ion-arrow-right-c').show();
                    }
                });


                $('.btn-mp4').on('click',function (e){
                    e.preventDefault();

                    var openqid = $(this).attr('qid');
                    var openm3u8=$(this).attr('m3u8');
                    var openvideoid='m3u8_' + openqid + 'mp4video';

                    var player = videojs(openvideoid);
                    player.src({
                        src: openm3u8,
                        type: 'application/x-mpegURL',
                    });


                    $('#'+openvideoid).show();
                    $('#'+openvideoid+'_html5_api').show();





                });
                $('.btn-hide-mp4').on('click',function (e){
                    e.preventDefault();

                    var closeqid = $(this).attr('qid');
                    var closem3u8=$(this).attr('m3u8');
                    var closevideoid='m3u8_' + closeqid + 'mp4video';
                    var player = videojs('m3u8_'+closeqid+'mp4video');
                    player.pause();


                    $('#'+closevideoid).hide();
                    $('#'+closevideoid+'_html5_api').hide();


                });


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

                $('.btn-audio').off('click').on('click', function(e) {
					var audio_obj={};
					audio_obj.id=$(this).attr('for');
					audio_obj.btn_dom=$(this);
					audio_obj.btn_text='答案音檔';
					bs.setAudioPlay(audio_obj);
                });

                $('#cls-right-percent').text(cls_right_percent + '%');
                $('#cls-avg-costsec').text(cls_avg_costsec + 's');
                $('#all-right-percent').text(all_right_percent + '%');
                $('#all-avg-costsec').text(all_avg_costsec + 's');

                $('#cls-percent-a').text(cls_percent_a + '%');
                $('#cls-percent-b').text(cls_percent_b + '%');
                $('#cls-percent-c').text(cls_percent_c + '%');
                $('#cls-percent-d').text(cls_percent_d + '%');
                $('#cls-percent-e').text(cls_percent_e + '%');
                $('#cls-percent-no').text(cls_percent_no + '%');
                $('#all-percent-a').text(all_percent_a + '%');
                $('#all-percent-b').text(all_percent_b + '%');
                $('#all-percent-c').text(all_percent_c + '%');
                $('#all-percent-d').text(all_percent_d + '%');
                $('#all-percent-e').text(all_percent_e + '%');
                $('#all-percent-no').text(all_percent_no + '%');

                var opt_ary = [];
                var opt_obj = {};

                if (sa.indexOf(new_opt_a)==-1) {
                    opt_obj = {};
                    opt_obj.key = 'opt-a';
                    opt_obj.percent = cls_percent_a;
                    opt_ary.push(opt_obj);
                }

                if (sa.indexOf(new_opt_b)==-1) {
                    opt_obj = {};
                    opt_obj.key = 'opt-b';
                    opt_obj.percent = cls_percent_b;
                    opt_ary.push(opt_obj);
                }

                if (sa.indexOf(new_opt_c)==-1) {
                    opt_obj = {};
                    opt_obj.key = 'opt-c';
                    opt_obj.percent = cls_percent_c;
                    opt_ary.push(opt_obj);
                }

                if (sa.indexOf(new_opt_d)==-1) {
                    opt_obj = {};
                    opt_obj.key = 'opt-d';
                    opt_obj.percent = cls_percent_d;
                    opt_ary.push(opt_obj);
                }

                if (sa.indexOf(new_opt_e)==-1) {
                    opt_obj = {};
                    opt_obj.key = 'opt-e';
                    opt_obj.percent = cls_percent_e;
                    opt_ary.push(opt_obj);
                }

                opt_ary = opt_ary.sort(function(a, b) {
                    return a.percent > b.percent ? -1 : 1;
                });

                var color_temp = '';
                for (var i = 0; i < opt_ary.length; i++) {
                    if (i == 0) {
						color_temp='card-red';
                        $('.' + opt_ary[i].key).removeClass().addClass(opt_ary[i].key + ' m-t-5 ' + color_temp);
                    }
                    if (i == 1) {
                        if (opt_ary[i].percent < opt_ary[i - 1].percent) {
                            color_temp = 'card-darkpink';
                        }
                        $('.' + opt_ary[i].key).removeClass().addClass(opt_ary[i].key + ' m-t-5 ' + color_temp);
                    }
                    if (i == 2) {
                        if (opt_ary[i].percent < opt_ary[i - 1].percent) {
                            color_temp = 'card-pink';
                        }
                        $('.' + opt_ary[i].key).removeClass().addClass(opt_ary[i].key + ' m-t-5 ' + color_temp);
                    }
                    if (i == 3) {
                        if (opt_ary[i].percent < opt_ary[i - 1].percent) {
                            color_temp = 'card-lightpink';
                        }
                        $('.' + opt_ary[i].key).removeClass().addClass(opt_ary[i].key + ' m-t-5 ' + color_temp);
                    }
                    if (i == 4) {
                        if (opt_ary[i].percent < opt_ary[i - 1].percent) {
                            color_temp = 'card-lightpink';
                        }
                        $('.' + opt_ary[i].key).removeClass().addClass(opt_ary[i].key + ' m-t-5 ' + color_temp);
                    }
                }

                if (sa.indexOf(new_opt_a)!=-1) {
                    $('.opt-a').removeClass().addClass('opt-a m-t-5 card-darkgreen');
                }

                if (sa.indexOf(new_opt_b)!=-1) {
                    $('.opt-b').removeClass().addClass('opt-b m-t-5 card-darkgreen');
                }

                if (sa.indexOf(new_opt_c)!=-1) {
                    $('.opt-c').removeClass().addClass('opt-c m-t-5 card-darkgreen');
                }

                if (sa.indexOf(new_opt_d)!=-1) {
                    $('.opt-d').removeClass().addClass('opt-d m-t-5 card-darkgreen');
                }

                if (sa.indexOf(new_opt_e)!=-1) {
                    $('.opt-e').removeClass().addClass('opt-e m-t-5 card-darkgreen');
                }

                var user_name_a_str = '';
                $.each(user_name_a, function(key, item) {
                    user_name_a_str += '<label>' + item + '</label><br>';
                });
                var user_name_b_str = '';
                $.each(user_name_b, function(key, item) {
                    user_name_b_str += '<label>' + item + '</label><br>';
                });
                var user_name_c_str = '';
                $.each(user_name_c, function(key, item) {
                    user_name_c_str += '<label>' + item + '</label><br>';
                });
                var user_name_d_str = '';
                $.each(user_name_d, function(key, item) {
                    user_name_d_str += '<label>' + item + '</label><br>';
                });
                var user_name_e_str = '';
                $.each(user_name_e, function(key, item) {
                    user_name_e_str += '<label>' + item + '</label><br>';
                });
                var user_name_no_str = '';
                $.each(user_name_no, function(key, item) {
                    user_name_no_str += '<label>' + item + '</label><br>';
                });

                $('.for-list-A').empty().html(user_name_a_str);
                $('.for-list-B').empty().html(user_name_b_str);
                $('.for-list-C').empty().html(user_name_c_str);
                $('.for-list-D').empty().html(user_name_d_str);
                $('.for-list-E').empty().html(user_name_e_str);
                $('.for-list-no').empty().html(user_name_no_str);

                var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
                $('#quiz-collect').html(collect_html);

                $('#quiz-collect').off('click').on('click',function(e){
                    e.preventDefault();
                    quizCollect(qid);
                });

				$('.btn-ask-quiz').off('click').on('click',function(e){
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
					newObj.qid=qid;
				});
            },
            error: bs.errorHandler
        });
    }

    /* View in fullscreen */
    function openFullscreen() {
        if (document.fullscreen || document.webkitIsFullScreen) {
            return;
        }
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    function closeFullscreen() {
        if (!document.fullscreen || !document.webkitIsFullScreen) {
            return;
        }
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

    // 排序
    function setQuizSort(sort_type) {
        $('#quizview').html($('#quizview .quizset').sort(function(a, b) {
            var contentA = parseInt($(a).attr(sort_type));
            var contentB = parseInt($(b).attr(sort_type));
            return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
        }));

        newObj.current_idx = parseInt($('#quizview .quizset').eq(0).attr('data-idx'));
        newObj.current_quiz_id = parseInt($('#quizview .quizset').eq(0).attr('data-id'));
        getExamreview(newObj.current_idx, newObj.current_quiz_id);
        window.ART.blackBoard.switch(newObj.current_idx);

        $('#quizview .quizset').off('click').on('click', function(e) {
            newObj.current_idx = parseInt($(this).attr('data-idx'));
            newObj.current_quiz_id = parseInt($(this).attr('data-id'));
            getExamreview(newObj.current_idx, newObj.current_quiz_id);
            window.ART.blackBoard.switch(newObj.current_idx);
        });
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
            $.each(newObj.quizset, function(key, item) {
                var button_color = '';
                if (item.right_percent > data.to) {
                    button_color = 'btn-info';
                } else if (item.right_percent >= data.from && item.right_percent <= data.to) {
                    button_color = 'btn-orange';
                } else {
                    button_color = 'btn-danger';
                }
                $('#quizview .quizset[data-id="' + item.quiz_id + '"]').removeClass('btn-info').removeClass('btn-orange').removeClass('btn-danger').addClass(button_color);
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

    // 決定答案、解析是否顯示
    function setDisplay(){
        if ($('input:radio:checked[name="radio-ans"]').val()=='1') {
            var idx = $('.btnAA').attr('for').replace('imgAA-', '');
            var sa=$('.btnAA').attr('sa');
            var bool_a = sa.indexOf('A')!=-1;
            var bool_b = sa.indexOf('B')!=-1;
            var bool_c = sa.indexOf('C')!=-1;
            var bool_d = sa.indexOf('D')!=-1;
            var bool_e = sa.indexOf('E')!=-1;

            if (bool_a) {
                $('#q' + idx + '-A' + ' i.ion-arrow-right-c').show();
            }
            if (bool_b) {
                $('#q' + idx + '-B' + ' i.ion-arrow-right-c').show();
            }
            if (bool_c) {
                $('#q' + idx + '-C' + ' i.ion-arrow-right-c').show();
            }
            if (bool_d) {
                $('#q' + idx + '-D' + ' i.ion-arrow-right-c').show();
            }
            if (bool_e) {
                $('#q' + idx + '-E' + ' i.ion-arrow-right-c').show();
            }
        }
        else {
            var idx = $('.btnAA').attr('for').replace('imgAA-', '');
            $('i.ion-arrow-right-c').hide();
        }

        if ($('input:radio:checked[name="radio-display"]').val()=='1') {
            $('#' + $('.btnAA').attr('for')).show();
        }
        else {
            $('#' + $('.btnAA').attr('for')).hide();
        }

        if ($('input:radio:checked[name="radio-ans"]').val()=='1' && $('input:radio:checked[name="radio-display"]').val()=='1') {
            $('.btnAA').hide();
        }

        if ($('input:radio:checked[name="radio-ans"]').val()=='2' && $('input:radio:checked[name="radio-display"]').val()=='2') {
            $('.btnAA').show();
        }
    }

    function quizCollect(qid){
        var dataObj={};
        dataObj.tid=bs.getUrlVar('tid');
        dataObj.qid=qid;
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
              var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
              $('#quiz-collect').html(collect_html);
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

    function getOptionHtml(idx,new_opt,opt,qa_opt){

        var inner_html='';

        inner_html=
        '<div id="imgQA-'+new_opt+'">\
            <div class="form-check form-check-inline">\
                <div id="q' + idx + '-'+new_opt+'" style="display:inline-block;width:15px">\
                    <i class="ion-arrow-right-c"></i>\
                </div>\
                <label class="form-check-label opt-label" style="font-size:24px">'+opt+'</label>\
                <div style="display:inline-block;margin-left:10px">\
                    <img class="img-quiz" src="' + qa_opt + '" alt="">\
                </div>\
            </div>\
            <div style="float:right;display:inline-block;font-size:24px">\
                <i class="fa fa-times-circle-o ans-remove"></i>\
            </div>\
            <hr>\
        </div>';

        return inner_html;
    }
});
