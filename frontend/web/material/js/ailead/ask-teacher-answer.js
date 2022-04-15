$(function() {
    'use strict';
    var newObj = {};
    init();


    function init(){

        getAskTeacherInfo();

        $('#summernote').summernote({
            height: 350,
            tooltip: false,
            toolbar: [

                ['font', ['bold', 'underline']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', [ 'picture']]
            ],

        });

        $('.note-table-popover').hide();

        try {
            $('#summernote').summernote('code', summernoteContent);
        }
        catch (e) {
        }

        $('#btn-send').on('click',function(e){
            e.preventDefault();
            sendAnswer();
        });

        $('#btn-ask-confirm').on('click',function(e){
            e.preventDefault();

            if (!newObj.qid) {
                swal('請選擇要發問的題目');
                return false;
            }

            if (!$('#quiz-ask-content').val()) {
                swal('請輸入要發問的內容');
                return false;
            }

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
                dataObj.ask_content=$('#quiz-ask-content').val();
                dataObj.kind=1;
                //錯誤回報是1
                bs.sendQuizAskContent(dataObj);
                $('#quiz-ask-content').val('');
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });
    }



    function getAskTeacherInfo(){


        $.ajax({
            url: '/admin/ask/get-ask-teacher-info?id='+ bs.getUrlVar('id'),
            type: 'GET',
            success: function (res) {
                var message=res.message;
                var data=res.data;

                if (message!='success') {
                    location.replace('/admin/ask/ask-teacher-index');
                    return false;
                }


                $('#lbl-grade').html(data.grade_name);
                $('#lbl-subject').html(data.subject_name);
                $('#lbl-school-name').html(data.school_name);
                $('#lbl-schoolclass').html(data.schoolclass_name);
                newObj.quiz_id=data.quiz_id;
                newObj.quizpaper_id=data.quizpaper_id;
                $('#lbl-username').html(data.username);
                $('#lbl-first-name').html(data.first_name);
                $('#lbl-user-type-name').html(data.user_type_name);
                $('#lbl-created-at').html(data.created_at);
                $('#lbl-last-ans-teacher-name').html(data.last_ans_teacher_name);
                $('#div-content').html(data.content);
                $('#summernote').summernote('code',data.last_ans_content);
                // $('#select-is-best').val(data.is_best).trigger('change');
                // $('#select-status').val(data.status).trigger('change');

                getQuizFullContent(newObj.quiz_id,newObj.quizpaper_id);
            },
            error: bs.errorHandler
        });
    };

    function getQuizFullContent(quiz_id,quizpaper_id){
        var dataObj = {};
        dataObj.quiz_id = quiz_id;
        dataObj.quizpaper_id=quizpaper_id;

        $.ajax({
            url: '/admin/ask/get-ask-quiz-info',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var msg = res.message;
                // if (msg != 'success') {
                //     swal(msg);
                //     setTimeout(function() {
                //         location.replace('/admin/ask/ask-teacher-index');
                //     }, 1000);
                //     return false;
                // }
                var quiz_info = res.data;

                var idx = 0;
                var no =  quiz_info.quiz_nub;

                var innerHtml = '';
                var temp_quiz_qtype_id=null;
                var temp_quiz_qtype_sort=0;
                var quiz_qtype_score_ary=[];

                var qid=quiz_info.id;
                var qg_html=(quiz_info.qg)?'<div><img class="img-quiz" src="' + item.qg + '"></div><br>':'';
                var qa = quiz_info.qa;
                if (!qa) {
                    qa = '';
                }
                var quiz_ans=quiz_info.sa;
                if (quiz_ans) {
                    quiz_ans = (quiz_ans) ? quiz_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quiz_ans;
                }
                var display_a=(quiz_ans.indexOf('A')!=-1 || quiz_ans.indexOf('①')!=-1)?'inline-block':'none';
                var display_b=(quiz_ans.indexOf('B')!=-1 || quiz_ans.indexOf('②')!=-1)?'inline-block':'none';
                var display_c=(quiz_ans.indexOf('C')!=-1 || quiz_ans.indexOf('③')!=-1)?'inline-block':'none';
                var display_d=(quiz_ans.indexOf('D')!=-1 || quiz_ans.indexOf('④')!=-1)?'inline-block':'none';
                var display_e=(quiz_ans.indexOf('E')!=-1 || quiz_ans.indexOf('⑤')!=-1)?'inline-block':'none';

                var opt_a= '';
                var opt_b= '';
                var opt_c= '';
                var opt_d= '';
                var opt_e= '';

                switch (quiz_info.grade_code){
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

                var qa_a = quiz_info.qa_a;
                var qa_a_html='';
                if (qa_a) {
                    qa_a_html= getOptionHtml(idx,new_opt_a,display_a,opt_a,qa_a);
                }

                var qa_b = quiz_info.qa_b;
                var qa_b_html='';
                if (qa_b) {
                    qa_b_html= getOptionHtml(idx,new_opt_b,display_b,opt_b,qa_b);
                }

                var qa_c = quiz_info.qa_c;
                var qa_c_html='';
                if (qa_c) {
                    qa_c_html= getOptionHtml(idx,new_opt_c,display_c,opt_c,qa_c);
                }

                var qa_d = quiz_info.qa_d;
                var qa_d_html='';
                if (qa_d) {
                    qa_d_html= getOptionHtml(idx,new_opt_d,display_d,opt_d,qa_d);
                }

                var qa_e = quiz_info.qa_e;
                var qa_e_html='';
                if (qa_e) {
                    qa_e_html= getOptionHtml(idx,new_opt_e,display_e,opt_e,qa_e);
                }

                var aa = quiz_info.aa;
                var aaHtml = '';
                if (aa) {
                    aaHtml = '<img class="img-quiz" src="' + aa + '">';
                }
                var aa_a = quiz_info.aa_a;
                var aa_aHtml = '';
                if (aa_a) {
                    aa_aHtml = '<h4>'+opt_a+'<img class="img-quiz" src="' + aa_a + '"></h4>';
                }
                var aa_b = quiz_info.aa_b;
                var aa_bHtml = '';
                if (aa_b) {
                    aa_bHtml = '<h4>'+opt_b+'<img class="img-quiz" src="' + aa_b + '"></h4>';
                }
                var aa_c = quiz_info.aa_c;
                var aa_cHtml = '';
                if (aa_c) {
                    aa_cHtml = '<h4>'+opt_c+'<img class="img-quiz" src="' + aa_c + '"></h4>';
                }
                var aa_d = quiz_info.aa_d;
                var aa_dHtml = '';
                if (aa_d) {
                    aa_dHtml = '<h4>'+opt_d+'<img class="img-quiz" src="' + aa_d + '"></h4>';
                }
                var aa_e = quiz_info.aa_e;
                var aa_eHtml = '';
                if (aa_e) {
                    aa_eHtml = '<h4>'+opt_e+'<img class="img-quiz" src="' + aa_e + '"></h4>';
                }

                var aa_title = '';
                if (aaHtml != '' || aa_aHtml != '' || aa_bHtml != '' || aa_cHtml != '' || aa_dHtml != '' || aa_eHtml != '') {
                    aa_title = '<h4><span style="color:green">解析</span></h4>';
                }

                var quiz_difficulty_name = quiz_info.quiz_difficulty_name;
                var knowledge_name = quiz_info.knowledge_name;
                var mediafile=quiz_info.mediafile;
                var mediafile_read=quiz_info.mediafile_read;
                var quiz_qtype_id=quiz_info.quiz_qtype_id;
                var quiz_category_id=quiz_info.quiz_category_id;
                var sa_png = quiz_info.sa_png;
                var quiz_qtype_name=quiz_info.quiz_qtype_name;
                var score=quiz_info.score;
                var quiz_qtype_html='';
                var mediamp4=quiz_info.mediamp4;
                var m3u8=quiz_info.m3u8;


                if (temp_quiz_qtype_id!=quiz_qtype_id) {
                    temp_quiz_qtype_id=quiz_qtype_id;
                    temp_quiz_qtype_sort++;
                    quiz_qtype_html='<br><h4>'+bs.numberConvertToUppercase(temp_quiz_qtype_sort)+'、'+quiz_qtype_name+'：每題 '+score+' 分，共 <span id="score_'+quiz_qtype_id+'"></span> 分</h4><br>';

                    var quiz_qtype_score_obj={};
                    quiz_qtype_score_obj.quiz_qtype_id=quiz_qtype_id;
                    quiz_qtype_score_obj.score=0;
                    quiz_qtype_score_ary.push(quiz_qtype_score_obj);
                }

                var index = bs.findIndexByKey(quiz_qtype_score_ary,'quiz_qtype_id',quiz_qtype_id);
                quiz_qtype_score_ary[index].score+=parseFloat(score);

                var sa_html= '';
                if (quiz_category_id==3 && sa_png) {
                    sa_html='<h4><span style="color:green">解答</span></h4><img class="img-quiz" src="' + sa_png + '"><br><br>';
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

                var hide_mp4_html='';
                var hide_btn_mp4_html='';
                var video_html='';
                var mp4_html='';
                var btn_mp4_html='';

                if (mediamp4!='') {
                    var video_html=
                        '<br><br><video id="m3u8_' + qid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  style="display:none;"  data-setup=\'{ "playbackRates": [0.5,0.7, 1,1.25, 1.5, 2] }\'>\
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

                innerHtml +=' <div className="m-b-30">';
                //不需要分數
                //innerHtml +=quiz_qtype_html;
                //影藏錯誤回報
                //innerHtml +='<i class="fa fa-question-circle-o fa-2x btn-ask-quiz cursor-pointer m-r-10" data-id="'+qid+'" style="float:right"></i>';
                // 應該不用題號
                innerHtml += '<h4>' + no + '.</h4>';
                innerHtml +=qg_html;
                innerHtml +='<div id="imgQA-' + idx + '">';
                innerHtml +=' <img class="img-quiz" src="' + qa + '">';
                innerHtml +='</div>';
                innerHtml +=qa_a_html;
                innerHtml +=qa_b_html;
                innerHtml +=qa_c_html;
                innerHtml +=qa_d_html;
                innerHtml +=qa_e_html;
                innerHtml +='<div id="imgAA-' + idx + '" class="m-t-20">';
                innerHtml +=sa_html;
                innerHtml +=aa_title;
                innerHtml +=aa_aHtml;
                innerHtml +=aa_bHtml;
                innerHtml +=aa_cHtml;
                innerHtml +=aa_dHtml;
                innerHtml +=aa_eHtml;
                innerHtml +='</div>';
                innerHtml +='<div id="diffAA-' + idx + '" class="m-t-20">';
                innerHtml +='<h4><span style="color:green">難易度</span>：' + quiz_difficulty_name + '</h4>';
                innerHtml +='</div>'
                innerHtml +='<div id="knowAA-' + idx + '" class="m-t-20">';
                innerHtml +='<h4><span style="color:green">知識點</span>：' + knowledge_name + '</h4>';
                innerHtml +='</div>';
                innerHtml +=' <div id="audioAA-' + idx + '" class="m-t-20">';
                //先影藏影片
                //innerHtml +=audio_read_html + btn_audio_read_html + audio_html + btn_audio_html+btn_mp4_html+hide_btn_mp4_html;
                innerHtml +=audio_read_html + btn_audio_read_html + audio_html + btn_audio_html;
                innerHtml +='</div>';
                //innerHtml +=video_html;
                //innerHtml += '</div>';




                $('#quizBody').html('').append(innerHtml);

                $.each($('.video-js'),function(key,item){
                    initVideo($(item).attr('id'),$(this).find('source').attr('src'));
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

                    $('#'+openvideoid).show();
                    $('#'+openvideoid+'_html5_api').show();

                    var player = videojs(openvideoid);
                    player.src({
                        src: openm3u8,
                        type: 'application/x-mpegURL',
                    });





                    // var jwplay = jwplayer(videoid);
                    // jwplay.setup({
                    //     playlist: {file: m3u8},
                    //     aspectratio: "16:9",
                    //     playbackRates: [0.5, 0.7, 1, 1.25, 1.5, 1.75, 2],
                    //     mute: false,
                    //     autostart: false,
                    //     floating: true
                    //
                    // });



                });
                $('.btn-hide-mp4').on('click',function (e){
                    e.preventDefault();

                    var closeqid = $(this).attr('qid');
                    var closem3u8=$(this).attr('m3u8');
                    var closevideoid='m3u8_'+closeqid+'mp4video';

                    var player = videojs('m3u8_'+closeqid+'mp4video');
                    player.src({
                        src: closem3u8,
                        type: 'application/x-mpegURL',
                    });
                    player.pause();

                    // var jwplay = jwplayer(videoid);
                    // jwplay.stop();


                    $('#'+closevideoid).hide();
                    $('#'+closevideoid+'_html5_api').hide();

                });



                for (var i = 0; i < quiz_qtype_score_ary.length; i++) {
                    var dom_id= 'score_'+ quiz_qtype_score_ary[i].quiz_qtype_id;
                    var score=0;
                    if(quiz_qtype_score_ary[i].score == parseInt(quiz_qtype_score_ary[i].score, 10)) {
                        score=quiz_qtype_score_ary[i].score;
                    }
                    else {
                        score= quiz_qtype_score_ary[i].score.toFixed(1)
                    }
                    $('#'+dom_id).text(score);
                }

                $('.btn-ask-quiz').off('click').on('click',function(e){
                    e.preventDefault();
                    $('#ask-modal').modal('show');
                    newObj.qid=$(this).attr('data-id');
                });
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });


    }

    function getOptionHtml(idx,new_opt,display,opt,qa_opt){
        var inner_html='';

        inner_html='<div class="m-t-20">\
          <div class="form-check form-check-inline">\
              <div id="q' + idx + '-'+new_opt+'" style="display:inline-block;width:15px">\
                  <i class="ion-arrow-right-c" style="display:'+display+'"></i>\
              </div>\
              <label class="form-check-label" style="font-size:24px">'+opt+'</label>\
              <div style="display:inline-block;margin-left:10px;margin-top:2px">\
                  <img class="img-quiz" src="' + qa_opt + '" alt="">\
              </div>\
          </div>\
          <hr>\
        </div>';

        return inner_html;
    }

    function sendAnswer() {

        if ($('#summernote').summernote('isEmpty')){
            swal('老師回覆不得為空白');
            return false;
        }

        var dataObj={};
        dataObj.id=bs.getUrlVar('id');
        dataObj.last_ans_content=$('#summernote').summernote('code');
        dataObj.is_best=1;
        dataObj.status=1;

        $.ajax({
            url: '/admin/ask/send-answer',
            data: dataObj,
            type: 'POST',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                if (res.message!='success') {
                    swal(res.message);
                    return false;
                }

                location.href='/admin/ask/ask-teacher-index';
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }


});