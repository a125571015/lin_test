$(function() {
    'use strict';
    var newObj = {};
    newObj.is_login = 1;
    newObj.username = '';
    var track=[];
    init();

    function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }

    function init() {
        getVideoExam();
        getDifficult();

        $('#btnLeave').on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/stuboard';
        });

    }

    function getVideoExam() {
        $.ajax({
            url: '/admin/exam/get-video-exam?cid='+ bs.getUrlVar('cid') + '&tid=' + bs.getUrlVar('tid') + '&fid=' + bs.getUrlVar('fid')+ '&vid=' + bs.getUrlVar('vid')+'&examrole='+bs.getUrlVar('examrole')+'&kind='+bs.getUrlVar('kind'),
            type: 'GET',
            success: function(res) {
                // if (res.message!='success'){
                //     swal(res.message);
                //     return false;
                // }
                var src = (bs.getUrlVar('fid'))?res.data.m3u8:res.data.video_name;
                var title_kind =(bs.getUrlVar('fid'))?'教學影片':'自派影片';
                var title_name = (bs.getUrlVar('fid'))?res.data.title_name:res.data.video_title;
                var src_type=(bs.getUrlVar('fid'))?'m3u8_':'mp4_';
                var play_obj=(bs.getUrlVar('fid'))?{src: src, type: 'application/x-mpegURL'}:{src: src};
                var video_kind=bs.getUrlVar('kind');


                var vid = res.data.vid;
                var video_length=res.video_length;
                var record_id=res.record_id;
                var check_collect=res.check_collect;
                var have_exam=res.have_exam;

                //限定課後窩才執行
                if(location.protocol +'//'+ location.hostname == 'https://afterclass.ailead365.com'){
                    newObj.username = res.username_en;
                    cycleAskStudentStatus();
                }

                $('#title-kind').html(title_kind);
                $('#title-name').html(title_name);

                if (res.track) {
                    if (res.track.length>0) {
                        track = res.track;
                    }
                }

                if (track.length==0) {
                    var track_inteval= Math.floor(parseInt(video_length)/50);
                    var temp=0;
                    for (var i = 0; i < 50; i++) {
                        var b = {};
                        b.track_id = temp.toString();
                        b.status = 0;
                        track.push(b);
                        temp+=track_inteval;
                    }
                    track[0].status=1;
                }

                $('#video-collect').attr('recordid', record_id);
                if($('#video-collect').attr('recordid') != ''){
                    $('#video-collect').show();
                }
                var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
                $('#video-collect').empty().html(collect_html);

                // var jwplay=jwplayer("videojwplayercontent");
                // //console.log(src);
                //
                // jwplay.setup({
                //     playlist: {file:src},
                //     aspectratio: "16:9",
                //     playbackRates:[0.5, 0.7, 1, 1.25,1.5,1.75,2],
                //     mute:false,
                //     autostart: false,
                //     floating: true
                //
                // });



                var video_html =
                '<video id="'+ src_type + bs.getUrlVar('id') + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  data-setup="{}" autoplay>\
                    <source src="' + src + '" type="video/mp4">\
                 </video>';

                 video_html+='<br>';
                 video_html+='<p>調速功能(限電腦版有效)</p>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="speed-07"> Speed X 0.7 </button>';
                 video_html+='</div>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="speed-10"> Speed X 1 </button>';
                 video_html+='</div>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="speed-125"> Speed X 1.25 </button>';
                 video_html+='</div>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="speed-15"> Speed X 1.5 </button>';
                 video_html+='</div>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="speed-20"> Speed X 2 </button>';
                 video_html+='</div>';
                 video_html+='<div class="btn-group m-b-10 m-r-10">';
                 video_html+='<button class="btn btn-primary" id="go-fullscreen"> Fullscreen </button>';
                 video_html+='</div>';
                 if (have_exam==1){
                     video_html+='<div class="btn-group m-b-10 m-r-10">';
                     video_html+='<button class="btn btn-orange" id="btn-selfexam-set"> 自我練習 </button>';
                     video_html+='</div>';
                 }


                $('.videocontent').html(video_html);

                checkSelfexamQuiz();

                $('#speed-07').on('click',function(e){
                   e.preventDefault();
                   goSpeedChange(src_type+bs.getUrlVar('id')+'mp4video_html5_api',0.7);
                });

                $('#speed-10').on('click',function(e){
                   e.preventDefault();
                   goSpeedChange(src_type+bs.getUrlVar('id')+'mp4video_html5_api',1);
                });

                $('#speed-125').on('click',function(e){
                   e.preventDefault();
                   goSpeedChange(src_type+bs.getUrlVar('id')+'mp4video_html5_api',1.25);
                });

                $('#speed-15').on('click',function(e){
                   e.preventDefault();
                   goSpeedChange(src_type+bs.getUrlVar('id')+'mp4video_html5_api',1.5);
                });

                $('#speed-20').on('click',function(e){
                   e.preventDefault();
                   goSpeedChange(src_type+bs.getUrlVar('id')+'mp4video_html5_api',2);
                });

                $('#go-fullscreen').on('click',function(e){
                   e.preventDefault();
                   goFullscreen(src_type+bs.getUrlVar('id')+'mp4video_html5_api');
                });

                $('#btn-selfexam-set').on('click',function(e){
                    e.preventDefault();
                    $('#confirm-modal').modal('toggle');
                });

                $('#btn-quiz').on('click', function(e) {
                    e.preventDefault();
                    createQuizPractice();
                });

                var player = videojs(src_type + bs.getUrlVar('id') + 'mp4video');
                player.src(play_obj);

                player.on('timeupdate', function(e) {
                    var currentTime=player.currentTime();
                    var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
                    if (index) {
                        track[index].status='1';
                    }
                });

                var start = 0;
                var tmpSec = 0;
                var totalSec = 0;
                var sec = new Sec();
                player.on('play', function(e) {
                    sec.Start();

                    if(start == 0){
                        cycleStudyLog();
                        start = 1;
                    }
                });

                player.on('pause', function() {
                    sec.Stop();
					const is_complete=0;
					//改用每分鐘自動儲存
                    // studyLog(vid, sec.totalSec, video_length, track,is_complete);
                });

                player.on('ended', function() {
                    sec.Stop();
					const is_complete=0;
                    //改用每分鐘自動儲存
                    // studyLog(vid, sec.totalSec, video_length, track,is_complete);
                });

                //jwplayer修改
                // jwplay.on('time',function (e){
                //     var position= e.position;
                //
                //     //console.log(position);
                // var index=findIndexByKey(track,'track_id',Math.floor(position).toString());
                // //console.log(index);
                // if (index) {
                //     track[index].status='1';
                // }
                //
                // });
                //
                // var start = 0;
                // var tmpSec = 0;
                // var totalSec = 0;
                // var sec = new Sec();
                //
                //
                // jwplay.on('play',function (e){
                //     sec.Start();
                //     //console.log("進去秒數計算");
                //
                //     if(start == 0){
                //         cycleStudyLog();
                //         //console.log("有進行紀錄");
                //         start = 1;
                //     }
                //     const is_complete=0;
                // });
                // jwplay.on('pause', function() {
                //     sec.Stop();
                //     const is_complete=0;
                //     //改用每分鐘自動儲存
                //     // studyLog(vid, sec.totalSec, video_length, track,is_complete);
                // });
                //
                // jwplay.on('complete',function (){
                //     sec.Stop();
                //     const is_complete=0;
                //     //改用每分鐘自動儲存
                //     // studyLog(vid, sec.totalSec, video_length, track,is_complete);
                // });


                window.document.body.onbeforeunload = function() {
                    sec.Stop();
					const is_complete=0;
                    // studyLog(vid, sec.totalSec, video_length, track,is_complete);

                    //改用每分鐘自動儲存-離開時儲存
                    totalSec = sec.totalSec - tmpSec;
                    if(totalSec < 0){
                        totalSec = sec.totalSec;
                    }
                    studyLog(vid, totalSec, video_length, track,is_complete);
                }

				$('#btnOver').on('click', function(e) {
		            e.preventDefault();

                    var warn_msg='';
					if (bs.getUrlVar('tid')) {
						warn_msg='點選「確認看完」後，您將無法再次點選觀看本影片';
					}

					swal({
						title: '是否確定影片已經看完？',
						text: warn_msg,
						type: 'warning',
						showCloseButton: true,
						showCancelButton: true,
						cancelButtonText: '<span>No<br>我還要再想想</span>',
						confirmButtonText: '<span>Yes<br>確定看完</span>'
					}).then(function() {
						window.document.body.onbeforeunload = function() {}
						sec.Stop();
						const is_complete=1;
                        // studyLog(vid, sec.totalSec, video_length, track,is_complete);

                        //改用每分鐘自動儲存-離開時儲存
                        totalSec = sec.totalSec - tmpSec;
                        if(totalSec < 0){
                            totalSec = sec.totalSec;
                        }
                        studyLog(vid, totalSec, video_length, track,is_complete);

                        //加入一秒延遲避免沒有存入紀錄
                        setTimeout(
                            function(){
                                location.href = '/admin/stuboard';
                            }
                            ,1000);


					},function (dismiss) {
						if (dismiss === 'cancel') {
							return false;
						}
					});

		        });

                $('#video-collect').on('click',function(e){
                    e.preventDefault();
                    var get_record_id = $('#video-collect').attr('recordid');

                    if(get_record_id != ''){
                        videoCollect(get_record_id);
                    }else{
                        swal('找不到觀看紀錄');
                        return false;
                    }
                });

                //每分鐘檢查學生在課後窩使用狀態
                function cycleAskStudentStatus(){
                    askStudentStatus();
                    setTimeout(cycleAskStudentStatus,60000);
                }

                function cycleStudyLog(){
                    //var currentTime=jwplay.getPosition();
                    var currentTime=player.currentTime();
                    var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
                    if (index) {
                        track[index].status='1';
                    }

                    const is_complete=0;
                    totalSec = sec.totalSec - tmpSec;

                    if(totalSec < 0){
                        totalSec = sec.totalSec;
                    }

                    studyLog(vid, totalSec, video_length, track,is_complete);
                    tmpSec = sec.totalSec;
                    setTimeout(cycleStudyLog,60000);

                }
            },
            error: bs.errorHandler
        });
    }

    function Sec() {
        if (!(this instanceof Sec))
            return new Sec();

        var self = this;
        this.sec = 0;
        this.totalSec = 0;
        this._started = false;
        this.runTime = setInterval(
            function() {
                if (self._started === true) {
                    self.sec++;
                    self.totalSec++;
                }
            }, 1000);
        this.Start = function() {
            this._started = true;
            this.totalSec = 0;
        };
        this.Stop = function() {
            this._started = false;
        }
    }

    function studyLog(vid, sec, video_length,track,is_complete) {
        if(newObj.is_login == 2){
            swal('您今日的使用時段已到期，將返回登入頁');
            setTimeout(
                function(){
                    location.replace('http://www.afterschool.url.tw/userlogin.html');
                }
                ,5000);
            return false;
        }else if(newObj.is_login == 0){
            //因error而再次觸發學習紀錄功能，無法設置setTimeOut、無法設置別的location.replace網址
            return false;
        }

        var dataObj = {};
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.tid = bs.getUrlVar('tid');
        dataObj.fid = bs.getUrlVar('fid');
        dataObj.vid = vid;
        dataObj.sec = sec;
        dataObj.kind=bs.getUrlVar('kind');
        dataObj.video_length = video_length;
        dataObj.track=track;
		dataObj.is_complete=is_complete;
        $.ajax({
            url: '/admin/exam/send-video-record',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                $('#video-collect').attr('recordid', res.record_id);
                $('#video-collect').show();
            },
            error: function(xhr, status, error) {
                newObj.is_login = 0;
                alert('偵測到您已登出是或是無系統使用權限，即將返回登入頁');
                //因error後接著會離開此頁面，離開前會執行學習紀錄，故結束動作寫在學習紀錄開始時
            }
        });
    }

    function goFullscreen(id) {
        var element = document.getElementById(id);
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }

    function goSpeedChange(id, sp) {
        var element = document.getElementById(id);
        element.playbackRate = sp;
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            vid.webkitRequestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function getDifficult() {
        $.ajax({
            url: '/admin/quizpaper/getdifficult',
            type: 'POST',
            success: function(res) {
                $('#div-difficulty').empty();
                $.each(res, function(key, item) {
                    $('#div-difficulty').append(
                        '<div class="form-check form-check-inline">\
                        <input class="form-check-input" type="checkbox" name="chk-difficulty" id="chk-difficulty' + (key + 1) + '" value="' + item.id + '" checked>\
                        <label class="form-check-label" for="chk-difficulty' + (key + 1) + '">' + item.name + '</label>\
                        </div>');
                });
            }
        });
    }

    function checkSelfexamQuiz() {
        var dataObj = {};
        dataObj.schoolclass_id = bs.getUrlVar('cid');
        dataObj.classinfo_id = bs.getUrlVar('fid');

        $.ajax({
            url: '/admin/stuquiz/check-selfexam-quiz',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var quiz_difficulty = res.quiz_difficulty;
                if (quiz_difficulty.length==0) {
                    // swal('目前沒有題目可以出卷');
                    $('#btn-selfexam-set').hide();
                    // return false;
                } else {
                    $('input:checkbox[name="chk-difficulty"]').parent().hide();
                    $('input:checkbox[name="chk-difficulty"]').prop('checked',false);

                    $.each(quiz_difficulty, function(key, item) {
                        var difficult = item.quiz_difficulty_id;
                        switch (difficult) {
                            case 1:
                                $('#chk-difficulty1').parent().show();
                                $('#chk-difficulty1').prop('checked',true);
                                break;
                            case 2:
                                $('#chk-difficulty2').parent().show();
                                $('#chk-difficulty2').prop('checked',true);
                                break;
                            case 3:
                                $('#chk-difficulty3').parent().show();
                                $('#chk-difficulty3').prop('checked',true);
                                break;
                            case 4:
                                $('#chk-difficulty4').parent().show();
                                $('#chk-difficulty4').prop('checked',true);
                                break;
                            case 5:
                                $('#chk-difficulty5').parent().show();
                                $('#chk-difficulty5').prop('checked',true);
                                break;
                        }
                    });
                }
            },
            error: bs.errorHandler
        });
    }

    function createQuizPractice() {
        var dataObj = {};

        dataObj.schoolclass_id = bs.getUrlVar('cid');
        dataObj.classinfo_id = bs.getUrlVar('fid');
        dataObj.difficulty_ary = [];
        var difficulty_ary = [];
        $.each($('input:checkbox:checked[name="chk-difficulty"]'), function(key, item) {
            difficulty_ary.push(item.value);
        });
        difficulty_ary.sort();
        dataObj.difficulty_ary = difficulty_ary;
        dataObj.quiz_count = parseInt($('input:radio:checked[name="radio-quiz"]').val());

        $.ajax({
            url: '/admin/stuquiz/create-selfexam-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                $('#confirm-modal').modal('toggle');
                var message = res.message;
                if (message != 'success' && message != 'already_test') {
                    swal(message);
                    return false;
                }
                var cid = res.cid;
                var pid = res.pid;
                if (message == 'already_test') {
                    var cid = res.cid;
                    $('#check-modal').modal('toggle');
                    $('#btn-retest').on('click', function(e) {
                        window.open('/admin/exam?cid=' + cid + '&pid=' + pid);
                    });
                } else {
                    window.open('/admin/exam?cid=' + bs.getUrlVar('cid') + '&pid=' + pid);
                }
            },
            error: bs.errorHandler
        });
    }

    function videoCollect(recordid){
        var dataObj={};
        dataObj.record_id=recordid;
        $.ajax({
            url: '/admin/stuvideo/set-video-collect',
            type: 'GET',
            data: dataObj,
            success: function (res) {
                var msg=res.message;
                var check_collect=res.check_collect;
                if (msg!='success') {
                    swal(msg);
                    return false;
                }
                var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
                $('#video-collect').empty().html(collect_html);
            },
            error: bs.errorHandler
        });
    }

    //查詢外校學生可持續登入狀況（課後窩）
    function askStudentStatus(){
        var username = newObj.username;

        $.ajax({
            url: 'https://www.afterschool.url.tw/API-checkvalid.php?UserAiledAccount=' + username,
            type: 'GET',
            success: function(res) {
                validStudentStatus(res);
            },
            error: bs.errorHandler
        });
    }

    //檢查外校學生可持續登入狀況（課後窩），若不可則登出導頁
    function validStudentStatus(info) {
        var dataObj = {};
        dataObj.info = info;

        $.ajax({
            url: '/admin/app/check-maintain',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                if(res == 'N'){
                    newObj.is_login = 2;
                    studyLog(0, 0, '', '',0);
                }
            },
            error: bs.errorHandler
        });
    }
});
