$(function() {
    'use strict';
     var newObj = {};
     init();
     function init(){
         getHealthpaper();



         $('#btn-delete').on('click', function(e) {
             e.preventDefault();
             swal({
                 title: '是否確認刪除考卷? 刪除後的考卷將無法還原。',
                 text: '',
                 type: 'warning',
                 showCloseButton: true,
                 showCancelButton: true,
                 cancelButtonText: '<span>No<br>我還要再想想</span>',
                 confirmButtonText: '<span>Yes<br>確認</span>'
             }).then(function() {
                 var dataObj = {};
                 dataObj.pid=[];
                 dataObj.pid.push(parseInt(bs.getUrlVar('id')));
                 $.ajax({
                     url: '/admin/knowhow/delete-healthpaper',
                     type: 'POST',
                     data: dataObj,
                     success: function(res) {
                         var message = res.message;
                         if (message != 'success') {
                             swal(message);
                             return false;
                         }
                         location.replace('/admin/knowhow/healthpaper');
                     },
                     error: bs.errorHandler
                 });
             },function (dismiss) {
                 if (dismiss === 'cancel') {
                     return false;
                 }
             });
         });



     }

     function getHealthpaper(){
         $.ajax({
             url: '/admin/knowhow/get-healthpaper?pid=' + bs.getUrlVar('id'),
             type: 'GET',
             success: function(res) {
                 var quizpaper = res.data;
                 if (!quizpaper) {
                     location.replace('/admin/knowhow/healthpaper');
                 }
                 $('#paper-name').html(quizpaper.papername);
                 // if (quizpaper.status==0) {
                 //     $('#paper-name').html(quizpaper.papername+'『此卷已刪除』');
                 //     $('#btn-strict').hide();
                 // }

                 getQuizFullContent(JSON.parse(quizpaper.paperdetail));
                 getQuizFullInfo(JSON.parse(quizpaper.paperdetail));
                 $('#quizInfo4').html('<div class="row strictRow"><div class="col-sm-12">'+quizpaper.notes+'</div></div>');

             },
             error: bs.errorHandler
         });
     }


     function getQuizFullContent(paperdetail){
         var dataObj = {};
         dataObj.paperdetail = paperdetail;
         $.ajax({
             url: '/admin/knowhow/get-full-quiz-content',
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
                 //         location.replace('/admin/quizpaper');
                 //     }, 1000);
                 //     return false;
                 // }
                 var quizContents = res.data;
                 var innerHtml = '';
                 var temp_quiz_qtype_id=null;
                 var temp_quiz_qtype_sort=0;
                 var quiz_qtype_score_ary=[];

                 $.each(quizContents, function(key, item) {

                     var idx = key;
                     var no = key + 1;
                     var qid=item.id


                     var qg_html=(item.qg)?'<div><img class="img-quiz" src="' + item.qg + '"></div><br>':'';
                     var qa = item.qa;
                     if (!qa) {
                         qa = '';
                     }

                     var quiz_ans = item.sa;
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

                     var qa_a = item.qa_a;
                     var qa_a_html='';
                     if (qa_a) {
                         qa_a_html= getOptionHtml(idx,new_opt_a,display_a,opt_a,qa_a);
                     }

                     var qa_b = item.qa_b;
                     var qa_b_html='';
                     if (qa_b) {
                         qa_b_html= getOptionHtml(idx,new_opt_b,display_b,opt_b,qa_b);
                     }

                     var qa_c = item.qa_c;
                     var qa_c_html='';
                     if (qa_c) {
                         qa_c_html= getOptionHtml(idx,new_opt_c,display_c,opt_c,qa_c);
                     }

                     var qa_d = item.qa_d;
                     var qa_d_html='';
                     if (qa_d) {
                         qa_d_html= getOptionHtml(idx,new_opt_d,display_d,opt_d,qa_d);
                     }

                     var qa_e = item.qa_e;
                     var qa_e_html='';
                     if (qa_e) {
                         qa_e_html= getOptionHtml(idx,new_opt_e,display_e,opt_e,qa_e);
                     }

                     var aa = item.aa;
                     var aaHtml = '';
                     if (aa) {
                         aaHtml = '<img class="img-quiz" src="' + aa + '">';
                     }
                     var aa_a = item.aa_a;
                     var aa_aHtml = '';
                     if (aa_a) {
                         aa_aHtml = '<h4>'+opt_a+'<img class="img-quiz" src="' + aa_a + '"></h4>';
                     }
                     var aa_b = item.aa_b;
                     var aa_bHtml = '';
                     if (aa_b) {
                         aa_bHtml = '<h4>'+opt_b+'<img class="img-quiz" src="' + aa_b + '"></h4>';
                     }
                     var aa_c = item.aa_c;
                     var aa_cHtml = '';
                     if (aa_c) {
                         aa_cHtml = '<h4>'+opt_c+'<img class="img-quiz" src="' + aa_c + '"></h4>';
                     }
                     var aa_d = item.aa_d;
                     var aa_dHtml = '';
                     if (aa_d) {
                         aa_dHtml = '<h4>'+opt_d+'<img class="img-quiz" src="' + aa_d + '"></h4>';
                     }
                     var aa_e = item.aa_e;
                     var aa_eHtml = '';
                     if (aa_e) {
                         aa_eHtml = '<h4>'+opt_e+'<img class="img-quiz" src="' + aa_e + '"></h4>';
                     }

                     var aa_title = '';
                     if (aaHtml != '' || aa_aHtml != '' || aa_bHtml != '' || aa_cHtml != '' || aa_dHtml != '' || aa_eHtml != '') {
                         aa_title = '<h4><span style="color:green">解析</span></h4>';
                     }

                     var quiz_difficulty_name = item.quiz_difficulty_name;
                     var knowledge_name = item.knowledge_name;
                     var mediafile=item.mediafile;
                     var mediafile_read=item.mediafile_read;
                     var quiz_qtype_id=item.quiz_qtype_id;
                     var quiz_category_id=item.quiz_category_id;
                     var sa_png = item.sa_png;
                     var quiz_qtype_name=item.quiz_qtype_name;
                     var score=item.score;
                     var quiz_qtype_html='';
                     var mediamp4=item.mediamp4;
                     var m3u8=item.m3u8;

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


                     innerHtml +=
                         '<div class="m-b-30">\
                           '+quiz_qtype_html+'\
					\
                      <h4>' + no + '.</h4>\
                      '+ qg_html +'\
                      <div id="imgQA-' + idx + '">\
                        <img class="img-quiz" src="' + qa + '">\
                      </div>\
                      '+qa_a_html+'\
                      '+qa_b_html+'\
                      '+qa_c_html+'\
                      '+qa_d_html+'\
                      '+qa_e_html+'\
                      <div id="imgAA-' + idx + '" class="m-t-20">\
                        ' + sa_html + '\
                        ' + aa_title + '\
                        ' + aaHtml + '\
                        ' + aa_aHtml + '\
                        ' + aa_bHtml + '\
                        ' + aa_cHtml + '\
                        ' + aa_dHtml + '\
                        ' + aa_eHtml + '\
                      </div>\
                      <div id="diffAA-' + idx + '" class="m-t-20">\
                        <h4><span style="color:green">難易度</span>：' + quiz_difficulty_name + '</h4>\
                      </div>\
                      <div id="knowAA-' + idx + '" class="m-t-20">\
                        <h4><span style="color:green">知識點</span>：' + knowledge_name + '</h4>\
                      </div>\
                      <div id="audioAA-' + idx + '" class="m-t-20">\
                        ' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html+btn_mp4_html+hide_btn_mp4_html+'\
                      </div>\
                      ' + video_html + '\
                    </div>';
                 });

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

    function getQuizFullInfo(paperdetail) {
        var dataObj = {};
        dataObj.paperdetail = paperdetail;
        dataObj.pid=bs.getUrlVar('id');
        $.ajax({
            url: '/admin/knowhow/get-quiz-full-info',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var msg = res.message;
                if (msg != 'success') {
                    return false;
                }
                var quizInfo = res.data;
                var quizInfo2= res.data2;
                var quizInfo3= res.data3;
                var innerHtml = '';
                var innerHtml2 = '';
                var innerHtml3 = '';

                innerHtml+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="q-table">';
                innerHtml+='<tr>';
                innerHtml+='<th>題型名稱</th>';
                innerHtml+='<th>易</th>';
                innerHtml+='<th>中偏易</th>';
                innerHtml+='<th>中</th>';
                innerHtml+='<th>中偏難</th>';
                innerHtml+='<th>難</th>';
                innerHtml+='<th>答數</th>';
                innerHtml+='</tr>';
                innerHtml+='</table>';

                $('#quizInfo').empty().append(innerHtml);

                getQuizQtypeHtml(quizInfo);

                innerHtml2+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap">';
                innerHtml2+='<tr>';
                innerHtml2+='<th>知識點</th>';
                innerHtml2+='<th>易</th>';
                innerHtml2+='<th>中偏易</th>';
                innerHtml2+='<th>中</th>';
                innerHtml2+='<th>中偏難</th>';
                innerHtml2+='<th>難</th>';
                innerHtml2+='<th>答數</th>';
                innerHtml2+='</tr>';
                var sum_diff_1=0;
                var sum_diff_2=0;
                var sum_diff_3=0;
                var sum_diff_4=0;
                var sum_diff_5=0;
                var sum_q_count=0;
                $.each(quizInfo2,function(key,item){
                    innerHtml2+='<tr>';
                    innerHtml2+='<td>'+item.knowledge_name+'</td>';
                    innerHtml2+='<td>'+item.diff_1+'</td>';
                    innerHtml2+='<td>'+item.diff_2+'</td>';
                    innerHtml2+='<td>'+item.diff_3+'</td>';
                    innerHtml2+='<td>'+item.diff_4+'</td>';
                    innerHtml2+='<td>'+item.diff_5+'</td>';
                    innerHtml2+='<td>'+item.q_count+'</td>';
                    innerHtml2+='</tr>';
                    sum_diff_1+=item.diff_1;
                    sum_diff_2+=item.diff_2;
                    sum_diff_3+=item.diff_3;
                    sum_diff_4+=item.diff_4;
                    sum_diff_5+=item.diff_5;
                    sum_q_count+=item.q_count;
                });

                // innerHtml2+='<tr>';
                // innerHtml2+='<td>合計</td>';
                // innerHtml2+='<td>'+sum_diff_1+'</td>';
                // innerHtml2+='<td>'+sum_diff_2+'</td>';
                // innerHtml2+='<td>'+sum_diff_3+'</td>';
                // innerHtml2+='<td>'+sum_diff_4+'</td>';
                // innerHtml2+='<td>'+sum_diff_5+'</td>';
                // innerHtml2+='<td>'+sum_q_count+'</td>';
                // innerHtml2+='</tr>';

                innerHtml2+='</table>';

                $('#quizInfo2').html('').append(innerHtml2);

                $.each(quizInfo3,function(key,item){
                    innerHtml3+='<div class="row strictRow">';
                    innerHtml3+='<div class="col-sm-12">'+item+'</div>';
                    innerHtml3+='</div>';
                });

                $('#quizInfo3').html('').append(innerHtml3);

            },
            error: bs.errorHandler
        });
    }

    function getQuizQtypeHtml(quizInfo){

        var innerHtml='';
        var difficulty_1_html='';
        var difficulty_2_html='';
        var difficulty_3_html='';
        var difficulty_4_html='';
        var difficulty_5_html='';
        var ans_count=0;
        var temp_quiz_qtype_id=null;

        $.each(quizInfo,function(key,item){

            if (temp_quiz_qtype_id!=item.quiz_qtype_id) {

                temp_quiz_qtype_id=item.quiz_qtype_id;
                ans_count=0;

                innerHtml='<tr>';
                innerHtml+='<td>'+item.quiz_qtype_name+'</td>';
                difficulty_1_html='<td id="qd_1_'+item.quiz_qtype_id+'">0</td>';
                difficulty_2_html='<td id="qd_2_'+item.quiz_qtype_id+'">0</td>';
                difficulty_3_html='<td id="qd_3_'+item.quiz_qtype_id+'">0</td>';
                difficulty_4_html='<td id="qd_4_'+item.quiz_qtype_id+'">0</td>';
                difficulty_5_html='<td id="qd_5_'+item.quiz_qtype_id+'">0</td>';

                switch (item.quiz_difficulty_id) {
                    case '1':
                        difficulty_1_html='<td>'+item.difficulty_count+'</td>';
                        ans_count+=parseInt(item.q_count);
                        break;
                    case '2':
                        difficulty_2_html='<td>'+item.difficulty_count+'</td>';
                        ans_count+=parseInt(item.q_count);
                        break;
                    case '3':
                        difficulty_3_html='<td>'+item.difficulty_count+'</td>';
                        ans_count+=parseInt(item.q_count);
                        break;
                    case '4':
                        difficulty_4_html='<td>'+item.difficulty_count+'</td>';
                        ans_count+=parseInt(item.q_count);
                        break;
                    case '5':
                        difficulty_5_html='<td>'+item.difficulty_count+'</td>';
                        ans_count+=parseInt(item.q_count);
                        break;
                }

                innerHtml+=difficulty_1_html+difficulty_2_html+difficulty_3_html+difficulty_4_html+difficulty_5_html;
                innerHtml+='<td id="qa_'+item.quiz_qtype_id+'">'+ans_count+'</td>';
                innerHtml+='</tr>';

                $('#q-table').append(innerHtml);
            }
            else {
                $('#qd_'+item.quiz_difficulty_id+'_'+item.quiz_qtype_id).text(item.difficulty_count);
                $('#qa_'+item.quiz_qtype_id).text(parseInt($('#qa_'+item.quiz_qtype_id).text())+parseInt(item.q_count));
            }
        });

    }

    function initVideo(vid,m3u8){
        var player = videojs(vid);
        player.src({
            src: m3u8,
            type: 'application/x-mpegURL',
        });
    }

});