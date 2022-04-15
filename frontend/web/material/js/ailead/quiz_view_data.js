$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {


        newObj = initObj();
        newObj.getQuiz();
        newObj.getKnowledgeInfo();
        //newObj.getQuizIscheck();
        newObj.getQuizInfo();





        // $('.switch-checkbox').bootstrapSwitch();
        // $('input[name="toggleChk"]').on('switchChange.bootstrapSwitch', function (event, state) {
        //     alert('1');
        //     //console.log(this); // DOM element
        //     //console.log(event); // jQuery event
        //     //console.log(state); // true | false
        // });


        // $('#ischeck').change(function () {
        //     var dataObj = {};
        //     dataObj.qid = +bs.getUrlVar('qid');
        //     if ($('input[name="ischeck"]:checked').val() == '1') {
        //         dataObj.ischeck = 1;
        //     } else {
        //         dataObj.ischeck = 0;
        //     }
        //     if ($('input[name="status"]:checked').val() == '1') {
        //         dataObj.status = 1;
        //     } else {
        //         dataObj.status = 0;
        //     }
        //
        //     $.ajax({
        //         url: '/admin/quiz/set-quiz-ischeck?qid='+bs.getUrlVar('qid'),
        //         type: 'post',
        //         data: dataObj,
        //         cache: false,
        //         success: function(res) {
        //             alert('完成更新');
        //             // var data = res.data;
        //             // //alert(data);
        //             // if (data == 0) {
        //             //     $('#ischeck').bootstrapSwitch('state', true);
        //             // }
        //         },
        //         error: bs.errorHandler
        //     });
        //
        // });

        // 儲存題目
        $('#btn-quiz-save').on('click',function(e){
            e.preventDefault();
            var dataObj = {};
            dataObj.qid = +bs.getUrlVar('qid');
            dataObj.source_type_id = $('#source_type_id').val();
            if ($('input[name="ischeck"]:checked').val() == '1') {
                dataObj.ischeck = 1;
            } else {
                dataObj.ischeck = 0;
            }
            if ($('input[name="quiz_status"]:checked').val() == '1') {
                dataObj.status = 1;
            } else {
                dataObj.status = 0;
            }

            $.ajax({
                url: '/admin/quiz/set-quiz-info',
                type: 'post',
                data: dataObj,
                cache: false,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {

                    var dataObj = {};
                    dataObj.qid = bs.getUrlVar('qid');
                    dataObj.knowledge_ids = $('#select-knowledge').val();

                    $.ajax({
                        url: '/admin/quiz/set-knowledge-info',
                        type: 'post',
                        data: dataObj,
                        cache: false,
                        beforeSend: function() {
                            bs.disableSubmits(true);
                        },
                        success: function(res) {
                            alert('完成更新');
                            //bs.disableSubmits(false);
                            //location.replace('/admin/banwu/tasklist');
                        },
                        complete: function() {
                            bs.disableSubmits(false);
                        },
                        error: bs.errorHandler
                    });

                    //alert('完成更新');
                    //bs.disableSubmits(false);
                    //location.replace('/admin/banwu/tasklist');
                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });
        });


        // 儲存題目知識點
        // $('#btn-knowledge-save').on('click',function(e){
        //     e.preventDefault();
        //
        //     var dataObj = {};
        //     dataObj.qid = bs.getUrlVar('qid');
        //     dataObj.knowledge_ids = $('#select-knowledge').val();
        //
        //     $.ajax({
        //         url: '/admin/quiz/set-knowledge-info',
        //         type: 'post',
        //         data: dataObj,
        //         cache: false,
        //         beforeSend: function() {
        //             bs.disableSubmits(true);
        //         },
        //         success: function(res) {
        //             alert('完成更新');
        //             //bs.disableSubmits(false);
        //             //location.replace('/admin/banwu/tasklist');
        //         },
        //         complete: function() {
        //             bs.disableSubmits(false);
        //         },
        //         error: bs.errorHandler
        //     });
        // });

    }

    function initObj() {

        // newObj.getQuizIscheck = function() {
        //     var dataObj = {};
        //     dataObj.qid = +bs.getUrlVar('qid');
        //     $.ajax({
        //         url: '/admin/quiz/get-quiz-ischeck?qid='+bs.getUrlVar('qid'),
        //         type: 'post',
        //         data: dataObj,
        //         cache: false,
        //         success: function(res) {
        //             var data = res.data;
        //             if (data == 1) {
        //                 $('#ischeck').bootstrapSwitch('state', true);
        //             }
        //         },
        //         error: bs.errorHandler
        //     });
        // }

        newObj.getQuizInfo = function() {
            var dataObj = {};
            dataObj.qid = +bs.getUrlVar('qid');
            $.ajax({
                url: '/admin/quiz/get-quiz-info?qid='+bs.getUrlVar('qid'),
                type: 'post',
                data: dataObj,
                cache: false,
                success: function(r) {
                    if ((r != '[]') && (r != '')) {
                        // edit
                        bs.initSelectElement('#source_type_id', '/admin/quiz/get-spec2-quiz-source-type', '', '', r[0].source_type_id, '');

                        // view
                        $('[data-field="item_type_category"]').html(r[0].item_type_category);
                        $('[data-field="item_type_name"]').html(r[0].item_type_name);
                        $('[data-field="source_id"]').html(r[0].source_id);
                        $('[data-field="source_kind_name"]').html(r[0].source_kind_name);
                        $('[data-field="source"]').html(r[0].source);
                        $('[data-field="content_source"]').html(r[0].content_source);
                        $('[data-field="immediately"]').html(r[0].immediately);
                        if (r[0].ischeck == 1) {
                            $('#ischeck').prop('checked',true);
                        } else {
                            $('#ischeck').prop('checked',false);
                        }
                        if (r[0].status == 1) {
                            $('#quiz_status').prop('checked',true);
                        } else {
                            $('#quiz_status').prop('checked',false);
                        }
                    } else {
                        alert('無此資料！');
                        location.href = '/admin/quiz/quiz';
                    }
                },
                error: bs.errorHandler
            });
        }

        newObj.getKnowledgeInfo = function() {
            $.ajax({
                url: '/admin/quiz/get-knowledge-info?qid='+bs.getUrlVar('qid'),
                type: 'GET',
                cache: false,
                success: function(res) {
                    var info=res.data;

                    //設定Select2預設值
                    $('#select-knowledge option').remove();
                    $.each(info.knowledges, function(key, item) {
                        $('#select-knowledge').append('<option value="' + item.id + '">' + item.name + '</option>');
                    });

                    var s2= $('#select-knowledge').select2({
                        theme: "bootstrap",
                        language: 'zh-TW'
                    });

                    var knowledge_ids=[];
                    $.each(info.knowledges, function(key, item) {
                        knowledge_ids.push(item.id);
                    });
                    s2.val(knowledge_ids).trigger('change');


                    //select2-ajax 資料量大會用的到
                    $('#select-knowledge').select2({
                        language: 'zh-TW',
                        width: '100%',
                        theme: "bootstrap",
                        placeholder: {
                            id: '-1',
                            text: '選擇知識點'
                        },
                        minimumInputLength: 1,
                        tags: true,
                        ajax: {
                            url: '/admin/quizpaper/get-quiz-knowledge?qid='+bs.getUrlVar('qid'),
                            type: 'get',
                            quietMillis: 250,
                            data: function(params) {
                                var query = {
                                    search: params.term
                                }

                                // Query parameters will be ?search=[term]&type=public
                                return query;
                            },
                            processResults: function(data, params) {
                                // Tranforms the top-level key of the response object from 'items' to 'results'
                                return {
                                    results: data
                                };
                            },
                            cache: true
                        }
                    });

                },
                error: bs.errorHandler
            });
        }




        newObj.getQuiz = function() {
            var idx=0;
            $.ajax({
                url: '/admin/exam/get-quiz-content?qid=' + bs.getUrlVar('qid'),
                type: 'GET',
                cache: false,
                success: function(res) {
                    var quizObj = res.data;
                    var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                    var qa = quizObj.qa;
                    var qid=quizObj.id;
                    var startTime;
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
                    var mediamp4=quizObj.mediamp4;
                    var m3u8=quizObj.m3u8;
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
                    var mp4_html='';
                    var btn_mp4_html='';
                    if (mediamp4!='') {

                        var mp4_obj={};
                        mp4_obj.id='mp4-'+idx;
                        mp4_obj.btn_css='btn-mp4';
                        mp4_obj.btn_dom=$('.btn-mp4');
                        mp4_obj.btn_text='解題影片';
                        mp4_obj.btn_for='audio-read-'+idx;
                        mp4_obj.btn_qid=qid;

                        // mp4_html=bs.getAudioHtml(mp4_obj);
                        btn_mp4_html=bs.getBtnAudioHtml(mp4_obj);



                    }
                    var video_html='';
                    if (mediamp4!='') {
                        video_html =
                            '<br><br><video id="m3u8_' + qid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  data-setup=\'{ "playbackRates": [0.5,0.7, 1,1.2, 1.5, 2] }\'>\
                    <source src="' + mediamp4 + '" type="video/mp4">\
                 </video>';

                        // video_html+='<br>';
                        // video_html+='<p>調速功能(限電腦版有效)</p>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="speed-07"> Speed X 0.7 </button>';
                        // video_html+='</div>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="speed-10"> Speed X 1 </button>';
                        // video_html+='</div>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="speed-125"> Speed X 1.25 </button>';
                        // video_html+='</div>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="speed-15"> Speed X 1.5 </button>';
                        // video_html+='</div>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="speed-20"> Speed X 2 </button>';
                        // video_html+='</div>';
                        // video_html+='<div class="btn-group m-b-10 m-r-10">';
                        // video_html+='<button class="btn btn-primary" id="go-fullscreen"> Fullscreen </button>';
                        // video_html+='</div>';


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
                                ' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html+mp4_html+btn_mp4_html+'\
                                </div>\
                        </td></tr></table></div>';


                    $('#quizContent').html('').append(innerHtml);

                    $('.videocontent').html('').append(video_html);

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


                    $('#speed-07').on('click',function(e){
                        e.preventDefault();
                        goSpeedChange('m3u8_' + qid + 'mp4videomp4video_html5_api',0.7);
                    });

                    $('#speed-10').on('click',function(e){
                        e.preventDefault();
                        goSpeedChange('m3u8_' + qid + 'mp4videomp4video_html5_api',1);
                    });

                    $('#speed-125').on('click',function(e){
                        e.preventDefault();
                        goSpeedChange('m3u8_' + qid + 'mp4videomp4video_html5_api',1.25);
                    });

                    $('#speed-15').on('click',function(e){
                        e.preventDefault();
                        goSpeedChange('m3u8_' + qid + 'mp4videomp4video_html5_api',1.5);
                    });

                    $('#speed-20').on('click',function(e){
                        e.preventDefault();
                        goSpeedChange('m3u8_' + qid + 'mp4videomp4video_html5_api',2);
                    });

                    $('#go-fullscreen').on('click',function(e){
                        e.preventDefault();
                        goFullscreen('m3u8_' + qid + 'mp4videomp4video_html5_api');
                    });

	                $('.btn-mp4').on('click',function (e){
                        e.preventDefault();
	                     $('.videocontent').show();
                        // var jwplay = jwplayer('videojwplayercontent');
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

                },
                error: bs.errorHandler
            });
        };


        newObj.tblist=$('#NaniList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': "full_numbers",
            'aLengthMenu': [[100], ['100']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
            'bLengthChange': false,  //將顯示一頁多少條紀錄的選項關閉
            'paging': true, //分頁開關
            'oLanguage': {
                'sLengthMenu': '每頁顯示 _MENU_ 筆紀錄',
                'sZeroRecords': '找不到相關數據',
                'sInfo': '顯示 _START_ 到 _END_ 筆，共 _TOTAL_ 筆紀錄',
                'sInfoEmtpy': '對不起，查詢不到任何相關數據',
                'sInfoFiltered': '(總筆數 _MAX_ )',
                'sProcessing': '載入中...',
                'sSearch': '搜尋',
                'sUrl': '', //多語言配置文件，可將oLanguage的設置放在一個txt文件中，例：Javascript/datatable/dtCH.txt
                'oPaginate': {
                    'sFirst': '第一頁',
                    'sPrevious': '上一頁 ',
                    'sNext': '下一頁 ',
                    'sLast': '最終頁 '
                },
            }, //多語言配置
            'bFilter': false, //搜尋欄開關
            'bSortClasses': true,
            'bSort': true,
            'order': [[1, 'desc']], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true,//等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //==========請求數據start
            'serverSide': true,
            'ajax': {
                'type': 'post',
                'url': '/admin/quiz/get-quiz-nani-chapter?qid=' + bs.getUrlVar('id'),
            },
            'initComplete': function () {

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#check-close').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-tags').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#txt-search').on('keypress',function(e){
                    if (e.which==13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


            },
            'drawCallback':function(){
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    //item[1] = '<a target="_blank" href="/admin/quiz/view_data?id='+item[1]+'">'+item[1]+'</a>';
                    // var tags = item[4];
                    // var newTags = '';
                    // if (tags) {
                    //     var tagAry = tags.split(';');
                    //     $.each(tagAry, function(key, item) {
                    //         newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                    //     });
                    // }
                    // item[4]=newTags;
                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            'columnDefs': [
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                },{
                    'targets': [0,1,2,3,4,5,6,7,8,9,10], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                },{
                    'targets': [0], // column or columns numbers
                    'visible': false,  // set orderable for selected columns
                },
            ],
            'select': {
                'style': 'multi'
            },
        });




        return newObj;
    }

    function initVideo(vid,m3u8){
        var player = videojs(vid);
        player.src({
            src: m3u8,
            type: 'application/x-mpegURL',
        });
    }
    // function goSpeedChange(id, sp) {
    //     var element = document.getElementById(id);
    //     element.playbackRate = sp;
    // }
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
