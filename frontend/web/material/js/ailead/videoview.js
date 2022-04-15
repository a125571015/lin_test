$(function() {
    'use strict';
    var newObj = {};
    var track=[];
    var startTime;
    var recordData = {};
    var record_id = '';
    init();

    function init() {
        getSchoolvideo();


    }

    function getSchoolvideo(){
        $.ajax({
          url: '/admin/schoolvideo/get-schoolvideo?id='+bs.getUrlVar('id'),
          type: 'GET',
          success: function (res) {
              var m3u8=res.data.m3u8;
              var vid = res.data.vid;
              var video_length=res.video_length;
              var title_name=res.data.title_name;
              $('#title-name').html(title_name);

              //教師的觀看紀錄狀態每秒自動儲存、狀態沒有已看完、班級id=0、都是自選

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

              // jwplayer("videojwplayercontent").setup({
              //     playlist: {file:m3u8},
              //     aspectratio: "16:9",
              //     playbackRates:[0.5, 0.7, 1, 1.25,1.5,1.75,2],
              //     mute:false,
              // });

              // const dp = new DPlayer({
              //     container: document.getElementById('dplayer'),
              //     video: {
              //         url: m3u8,
              //         type: 'customHls',
              //         lang:'zh-tw',
              //         screenshot: true,
              //         autoplay: true,
              //         customType: {
              //             customHls: function (video, player) {
              //                 const hls = new Hls();
              //                 hls.loadSource(video.src);
              //                 hls.attachMedia(video);
              //             },
              //         },
              //     },
              // });





              var video_html=
              '<video id="m3u8_'+bs.getUrlVar('id')+'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  data-setup="{}" autoplay  >\
                  <source src="'+m3u8+'" type="video/mp4">\
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

              $('.videocontent').html(video_html);

              $('#speed-07').on('click',function(e){
                 e.preventDefault();
                 goSpeedChange('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api',0.7);
              });

              $('#speed-10').on('click',function(e){
                 e.preventDefault();
                 goSpeedChange('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api',1);
              });

              $('#speed-125').on('click',function(e){
                  e.preventDefault();
                  goSpeedChange('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api',1.25);
              });

              $('#speed-15').on('click',function(e){
                 e.preventDefault();
                 goSpeedChange('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api',1.5);
              });

              $('#speed-20').on('click',function(e){
                 e.preventDefault();
                 goSpeedChange('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api',2);
              });

              $('#go-fullscreen').on('click',function(e){
                 e.preventDefault();
                 goFullscreen('m3u8_'+bs.getUrlVar('id')+'mp4video_html5_api');
              });

              $('#btn-send').on('click',function(e){
                  e.preventDefault();
                  const is_complete=0;
                  //studyLog(vid, sec.totalSec, video_length, track,is_complete);
                  location.href='/admin/schoolvideo/sendvideo?fid='+bs.getUrlVar('id');
              });

              var player = videojs('m3u8_'+bs.getUrlVar('id')+'mp4video');
              player.src({
                  src: m3u8,
                  type: 'application/x-mpegURL',
              });

              var currentTime = 0;

              // player.on('play', function () {
              //     if(!startTime){
              //         startTime = new Date().getTime();
              //     }
              //
              //     studyLog();
              //     currentTime = Math.floor(player.currentTime());
              // });
              //
              // player.on('timeupdate', function(e) {
              //     if(currentTime < Math.floor(player.currentTime())){
              //         studyLog();
              //         currentTime = Math.floor(player.currentTime());
              //     }
              // });

              // dp.on('timeupdate', function (e) {
              //
              //     var currentTime=dp.video.currentTime;
              //     var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
              //     if (index) {
              //         track[index].status='1';
              //     }
              // });



              // player.on('timeupdate', function(e) {
              //     var currentTime=player.currentTime();
              //     var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
              //     if (index) {
              //         track[index].status='1';
              //     }
              // });

              var start = 0;
              var tmpSec = 0;
              var totalSec = 0;
              var sec = new Sec();

              // dp.on('play', function (e) {
              //     sec.Start();
              //
              //     if(start == 0){
              //
              //         //cycleStudyLog();
              //
              //         start = 1;
              //     }
              // });

              player.on('play', function(e) {
                  sec.Start();

                  if(start == 0){
                      //cycleStudyLog();
                      start = 1;
                  }
              });

              // dp.on('pause', function() {
              //     sec.Stop();
              //     const is_complete=0;
              //     //改用每分鐘自動儲存
              //
              //     studyLog(vid, sec.totalSec, video_length, track,is_complete);
              //     sec.CleartotalSec();
              // });



              player.on('pause', function() {
                  sec.Stop();
                  const is_complete=0;
                  //改用每分鐘自動儲存
                  studyLog(vid, sec.totalSec, video_length, track,is_complete);
                  sec.CleartotalSec();
              });

              // dp.on('ended', function() {
              //     sec.Stop();
              //     const is_complete=0;
              //     //改用每分鐘自動儲存
              //      //studyLog(vid, sec.totalSec, video_length, track,is_complete);
              //     //sec.CleartotalSec();
              //
              // });

              player.on('ended', function() {
                  sec.Stop();
                  const is_complete=0;
                  //改用每分鐘自動儲存
                  // studyLog(vid, sec.totalSec, video_length, track,is_complete);

              });

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
                  sec.CleartotalSec();
                  console.log('觸發');
                  //console.log('重整');
              }

              function cycleStudyLog(){
                  //var currentTime=jwplay.getPosition();
                  var currentTime=player.currentTime();
                  //var currentTime=dp.video.currentTime;
                  var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
                  if (index) {
                      track[index].status='1';
                  }

                  const is_complete=0;
                  totalSec = sec.totalSec - tmpSec;

                  if(totalSec < 0){
                      totalSec = sec.totalSec;
                  }

                  studyLog(vid, totalSec, video_length, track);
                  tmpSec = sec.totalSec;
                  setTimeout(cycleStudyLog,60000);

              }

              function studyLog(vid, sec, video_length,track,is_complete){
                  //20200811暫時關閉
                  // if(startTime) {
                  //     let endTime = new Date().getTime();
                  //     let duration = (endTime - startTime) / 1000;
                  //     recordData.sec = Math.round(duration);
                  // }

                  var currentTime=player.currentTime();
                  //var currentTime=dp.video.currentTime;
                  var index=findIndexByKey(track,'track_id',Math.floor(currentTime).toString());
                  if (index) {
                      track[index].status='1';
                  }
                  recordData.record_id = record_id;
                  recordData.fid = bs.getUrlVar('id');
                  recordData.vid = vid;
                  recordData.video_length = video_length;
                  recordData.track = track;
                  recordData.sec = sec;

                  $.ajax({
                      url: '/admin/exam/send-video-record-manager',
                      type: 'POST',
                      data: JSON.stringify(recordData),
                      contentType: 'application/json',
                      async:false,
                      success: function (res) {
                          record_id = res.record_id;
                          if(res.record_id){
                              startTime = new Date().getTime();
                          }
                      },
                      error: function(xhr) {
                          console.error(xhr);
                      }
                  });

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
        this.CleartotalSec=function(){
             this.totalSec = 0;
        }
    }

    function goFullscreen(id) {
        var element = document.getElementById(id);
        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }

    function goSpeedChange(id,sp){
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



});
