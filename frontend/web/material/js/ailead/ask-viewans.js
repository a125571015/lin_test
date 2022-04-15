$(function() {
	'use strict';
    var newObj = {};
    init();

	function init() {
		getAskInfo();
	}

	function getAskInfo(){

		$.ajax({
		  url: '/admin/ask/get-ask-info?id=' + bs.getUrlVar('id'),
		  type: 'GET',
		  success: function (res) {
			  var message=res.message;
              var data=res.data;

              var ask_kind=data.kind;

              if (ask_kind==2){

				  var change_title='';
				  change_title+='<h1>題目發問</h1>';
				  $('#ask-title').html(change_title);
			  }
              else if (ask_kind==1){
				  var change_title='';
				  change_title+='<h1>試題疑義</h1>';
				  $('#ask-title').html(change_title);
			  }

              if (message!='success') {
                  location.replace('/admin/ask');
                  return false;
              }


			  $('#ask-content').html(data.content);
			  if (data.is_best==1) {
			  	$('#ask-last-content').html(data.last_ans_content);
			  }
			  getQuizContent(0,data.quiz_id);

		  },
		  error: bs.errorHandler
		});
	}

	function getQuizContent(idx,qid){

		$.ajax({
			url: '/admin/exam/get-quiz-content?qid=' + qid + '&key='+ qid,
			type: 'GET',
			cache: false,
			success: function(res) {
				var quizObj = res.data;
				var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
				var qa = quizObj.qa;
				var qa_a = quizObj.qa_a;
				var qa_b = quizObj.qa_b;
				var qa_c = quizObj.qa_c;
				var qa_d = quizObj.qa_d;
				var qa_e = quizObj.qa_e;
				var quiz_ans = (quizObj.sa) ? quizObj.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quizObj.sa;
				var quiz_category_id=quizObj.quiz_category_id;
				var sa_png = quizObj.sa_png;
				var aa = quizObj.aa;
				var aa_a = quizObj.aa_a;
				var aa_b = quizObj.aa_b;
				var aa_c = quizObj.aa_c;
				var aa_d = quizObj.aa_d;
				var aa_e = quizObj.aa_e;
				var grade_code=quizObj.grade_code;
				var mediafile=quizObj.mediafile;
				var mediafile_read=quizObj.mediafile_read;

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
				switch (grade_code) {
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

				if (qa_a) {
					qa_a_html= getOptionHtml(idx,new_opt_a,display_a,opt_a,qa_a);
				}

				if (qa_b) {
					qa_b_html= getOptionHtml(idx,new_opt_b,display_b,opt_b,qa_b);
				}

				if (qa_c) {
					qa_c_html= getOptionHtml(idx,new_opt_c,display_c,opt_c,qa_c);
				}

				if (qa_d) {
					qa_d_html= getOptionHtml(idx,new_opt_d,display_d,opt_d,qa_d);
				}

				if (qa_e) {
					qa_e_html= getOptionHtml(idx,new_opt_e,display_e,opt_e,qa_e);
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

				var sa_html= '';
				if (quiz_category_id==3 && sa_png) {
						sa_html='<h4><span style="color:green">解答</span></h4><img class="img-quiz" src="' + sa_png + '"><br><br>';
				}

				if (aa_html != '' || aa_a_html != '' || aa_b_html != '' || aa_c_html != '' || aa_d_html != '' || aa_e_html != '') {
					aa_title = '<h4 style="color:green">解析</h4><br>';
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

				innerHtml +=
					'<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
							'+ qg_html +'\
							<div id="imgQA"><img class="img-quiz" src="' + quizObj.qa + '"></div><br>\
							' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
							<div id="imgAA-' + idx + '">\
								' + sa_html + '\
								' + aa_title + '\
								' + aa_html + '\
								' + aa_a_html + '\
								' + aa_b_html + '\
								' + aa_c_html + '\
								' + aa_d_html + '\
								' + aa_e_html + '\
							</div>\
							<div id="audioAA-' + idx + '" class="m-t-20">\
							' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html+'\
							</div>\
					</td></tr></table></div>';

				$('#quizContent').html('').append(innerHtml);

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

			},
			error: bs.errorHandler
		});
	}

	function getOptionHtml(index,new_opt,display,opt,qa_opt){
        var inner_html='';

        inner_html='<div class="m-t-20">\
          <div class="form-check form-check-inline">\
              <div id="q' + index + '-'+new_opt+'" style="display:inline-block;width:15px">\
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



});
