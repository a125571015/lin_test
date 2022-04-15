$(function() {
    'use strict';
    var newObj = {};
    newObj.complete_count = 0;
    init();

    function init() {
        getExtravideo();

        $('#btn-send').on('click', function(e) {
            e.preventDefault();
            if (!$('.select-subject').val() || $('.select-subject').val()=='-1') {
                swal('分類資料請選擇科目後再派出影片');
                return false;
            }
            location.href = '/admin/schoolvideo/sendvideo?vid=' + bs.getUrlVar('id');
        });

        $('#btn-delete').on('click', function(e) {
            e.preventDefault();
            if (confirm('是否確定刪除自派影片？請注意，刪除後學生將無法再觀看此影片。')) {
                disableVideo();
            }
        });
    }

    function getExtravideo() {
        $.ajax({
            url: '/admin/schoolvideo/get-extravideo?id=' + bs.getUrlVar('id'),
            type: 'GET',
            success: function(res) {
                var video_name = res.data.video_name;
                var title_name = res.data.video_title;
                var vid = res.data.vid;
                $('#title-name').html(title_name);

                var video_html =
                    '<video id="mp4_' + vid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  data-setup="{}" autoplay>\
                  <source src="' + video_name + '" type="video/mp4">\
              </video>';

                video_html += '<br>';
                video_html += '<p>調速功能(限電腦版有效)</p>';
                video_html += '<div class="btn-group m-b-10 m-r-10">';
                video_html += '<button class="btn btn-primary" id="speed-07"> Speed X 0.7 </button>';
                video_html += '</div>';
                video_html += '<div class="btn-group m-b-10 m-r-10">';
                video_html += '<button class="btn btn-primary" id="speed-10"> Speed X 1 </button>';
                video_html += '</div>';
                video_html += '<div class="btn-group m-b-10 m-r-10">';
                video_html += '<button class="btn btn-primary" id="speed-15"> Speed X 1.5 </button>';
                video_html += '</div>';
                video_html += '<div class="btn-group m-b-10 m-r-10">';
                video_html += '<button class="btn btn-primary" id="speed-20"> Speed X 2 </button>';
                video_html += '</div>';
                video_html += '<div class="btn-group m-b-10 m-r-10">';
                video_html += '<button class="btn btn-primary" id="go-fullscreen"> Fullscreen </button>';
                video_html += '</div>';

                $('.videocontent').html(video_html);

                $('#speed-07').on('click', function(e) {
                    e.preventDefault();
                    goSpeedChange('mp4_' + vid + 'mp4video_html5_api', 0.7);
                });

                $('#speed-10').on('click', function(e) {
                    e.preventDefault();
                    goSpeedChange('mp4_' + vid + 'mp4video_html5_api', 1);
                });

                $('#speed-15').on('click', function(e) {
                    e.preventDefault();
                    goSpeedChange('mp4_' + vid + 'mp4video_html5_api', 1.5);
                });

                $('#speed-20').on('click', function(e) {
                    e.preventDefault();
                    goSpeedChange('mp4_' + vid + 'mp4video_html5_api', 2);
                });

                $('#go-fullscreen').on('click', function(e) {
                    e.preventDefault();
                    goFullscreen('mp4_' + vid + 'mp4video_html5_api');
                });

                var player = videojs('mp4_' + vid + 'mp4video');
                player.src({
                    src: video_name
                });

                initDropzone(res.data);
            },
            error: bs.errorHandler
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

    function getSchool(id,school_id) {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
                $('#' + id + ' option').remove();
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                if (school_id) {
                    $('#' + id).val(school_id);
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getGradeCode(id,grade_code) {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                $('#' + id + ' option').remove();
                $('#' + id).append('<option value="-1">選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                if (grade_code) {
                    $('#' + id).val(grade_code);
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getSchoolclass(id, school_id, grade_code,schoolclass_id) {
        var dataObj = {};
        if (school_id) {
            dataObj.school_id = school_id;
        }
        if (grade_code) {
            dataObj.grade_code = grade_code;
        }
        $.ajax({
            url: '/admin/quizpaper/get-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#' + id + ' option').remove();
                $('#' + id).append('<option value="-1">選擇班級</option>');
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                if (schoolclass_id) {
                    $('#' + id).val(schoolclass_id);
                }
                if (!grade_code || grade_code=='-1') {
                    $('#' + id + ' option').remove();
                    $('#' + id).append('<option value="-1">選擇班級</option>');
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(id,subject_code,cid) {
        var dataObj={};
        if (cid) {
            dataObj.cid=cid;
        }
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#' + id + ' option').remove();
                $('#' + id).append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                if (subject_code) {
                    $('#' + id).val(subject_code);
                }
                if (!cid || cid==-1) {
                    $('#' + id + ' option').remove();
                    $('#' + id).append('<option value="-1">選擇科目</option>');
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                newObj.complete_count++;
            },
            error: bs.errorHandler
        });
    }

    function getVideoTag(id,video_tags) {
        $.ajax({
            url: '/admin/schoolvideo/get-video-tag',
            type: 'post',
            success: function(res) {
                $('#' + id + ' option').remove();
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#' + id).select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇任務標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });

                var tag_ids=[];
                $.each(video_tags, function(key, item) {
                    tag_ids.push(parseInt(item.id));
                });

                var myInterval = setInterval(function() {
                    bs.disableSubmits(true);
                    if (newObj.complete_count >= 4) {
                        clearInterval(myInterval);
                        $('#' + id).val(tag_ids).trigger('change');
                        bs.disableSubmits(false);
                    }
                }, 1000);


            },
            error: bs.errorHandler
        });
    }

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function initDropzone(info) {

        var vid = info.vid;
        var video_title = info.video_title;
        var video_size = info.video_size;
        var video_notes = info.video_notes;
        var video_at = info.video_at;
        var school_id = info.school_id;
        var grade_code = info.grade_code;
        var schoolclass_id = info.schoolclass_id;
        var subject_code = info.subject_code;
        var video_tags = info.video_tags;

        var video_info_html = '';

        video_info_html += '<div class="card m-b-30">';
        video_info_html += '<div class="card-body">';

        video_info_html +=
            '<div class="row strictRow">\
                <div class="col-sm-12">\
                    <h5>影片資料</h5>\
                </div>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
                <label class="col-sm-2" for="">影片名稱</label>\
                <div class="col-sm-10">\
                    <div class="btn-group">\
                        <input type="text" class="form-control txt-videotitle" id="txt-videotitle-' + vid + '">\
                    </div>\
                </div>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
                <label class="col-sm-2">檔案大小</label>\
                <strong class="col-sm-10">' + roundDecimal(info.video_size / 1000000, 1) + 'MB</strong>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
              <label class="col-sm-2" for="txt-notes">備註</label>\
              <div class="col-sm-10">\
                <div class="input-group">\
                  <textarea class="txt-videonotes" id="txt-videonotes-' + vid + '" rows="5"></textarea>\
                </div>\
              </div>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
                <div class="col-sm-12">\
                    <h5>分類資料</h5>\
                </div>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
                <label class="col-sm-2">日期</label>\
                <div class="col-sm-10">\
                    <div class="form-check form-check-inline">\
                        <div class="input-group">\
                            <input type="text" class="form-control date-vtime" autocomplete="off" id="date-vtime-' + vid + '" readonly>\
                            <div class="input-group-append bg-custom b-0">\
                                <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>';

        video_info_html +=
            '<div class="row strictRow">\
                <label class="col-sm-2">分類</label>\
                <div class="col-sm-10">\
                    <div class="btn-group m-b-10">\
                        <select class="select2-single select-school" id="select-school-' + vid + '"></select>\
                    </div>\
                    <div class="btn-group m-b-10">\
                        <select class="select2-single select-grade" id="select-grade-' + vid + '"></select>\
                    </div>\
                    <div class="btn-group m-b-10">\
                        <select class="select2-single select-schoolclass" id="select-schoolclass-' + vid + '"></select>\
                    </div>\
                    <div class="btn-group m-b-10">\
                        <select class="select2-single select-subject" id="select-subject-' + vid + '"></select>\
                    </div>\
                    <div class="btn-group m-b-10">\
                        <select class="select2-multiple select-videotags" multiple="multiple" id="select-videotags-' + vid + '"></select>\
                    </div>\
                </div>\
            </div>';

        video_info_html += '</div>';
        video_info_html += '</div>';

        $('#video-info').append(video_info_html);

        getSchool('select-school-' + vid, school_id);
        getGradeCode('select-grade-' + vid, grade_code);
        getSchoolclass('select-schoolclass-' + vid, school_id, grade_code, schoolclass_id);
        getSubjectCode('select-subject-' + vid, subject_code,schoolclass_id);
        getVideoTag('select-videotags-' + vid, video_tags);

        $('#date-vtime-' + vid).datetimepicker({
            step: 30,
            format: 'Y/m/d',
            timepicker: false,
            onChangeDateTime: function(dp, $input) {
                updateVideoInfo(vid);
            }
        });

        $('#txt-videotitle-' + vid).val(video_title);
        $('#txt-videonotes-' + vid).val(video_notes);
        $('#date-vtime-' + vid).val(video_at);


        $('.txt-videotitle').off('blur').on('blur', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('txt-videotitle-', '');
            updateVideoInfo(vid);
        });

        $('.txt-videonotes').off('blur').on('blur', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('txt-videonotes-', '');
            updateVideoInfo(vid);
        });

        $('.select-school').off('change').on('change', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('select-school-', '');
            getGradeCode('select-grade-' + vid);
            var school_id = $(this).val();
            var grade_code = $('#select-grade-' + vid).val();
            getSchoolclass('select-schoolclass-' + vid, school_id, grade_code);
            getSubjectCode('select-subject-' + vid);
            updateVideoInfo(vid);
        });

        $('.select-grade').off('change').on('change', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('select-grade-', '');
            var school_id = $('#select-school-' + vid).val();
            var grade_code = $(this).val();
            getSchoolclass('select-schoolclass-' + vid, school_id, grade_code);
            getSubjectCode('select-subject-' + vid);
            updateVideoInfo(vid);
        });

        $('.select-schoolclass').off('change').on('change', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('select-schoolclass-', '');
            getSubjectCode('select-subject-' + vid,'',$('#select-schoolclass-' + vid).val());
            updateVideoInfo(vid);
        });

        $('.select-subject').off('change').on('change', function(e) {
            e.preventDefault();
            $(this).attr('id').replace('select-subject-', '');
            updateVideoInfo(vid);
        });

        $('.select-videotags').off('change').on('change', function(e) {
            e.preventDefault();
            vid = $(this).attr('id').replace('select-videotags-', '');
            updateVideoInfo(vid);
        });
    }

    function updateVideoInfo(vid) {
        var dataObj = {};
        dataObj.id = parseInt(vid);
        dataObj.video_title = $('#txt-videotitle-' + vid).val();
        dataObj.video_notes = $('#txt-videonotes-' + vid).val();
        dataObj.video_at = ($('#date-vtime-' + vid).val()) ? Math.floor(new Date($('#date-vtime-' + vid).val()).getTime() / 1000) : Math.floor(new Date().getTime() / 1000);
        dataObj.school_id = $('#select-school-' + vid).val();
        dataObj.grade_code = $('#select-grade-' + vid).val();
        dataObj.schoolclass_id = $('#select-schoolclass-' + vid).val();
        dataObj.subject_code = $('#select-subject-' + vid).val();
        dataObj.video_tags = [];
        var tagObj = $('#select-videotags-' + vid).select2('data');
        $.each(tagObj, function(key, item) {
            dataObj.video_tags.push(item.text);
        });
        dataObj.video_tags.sort();

        $.ajax({
            url: '/admin/schoolvideo/update-video-info',
            type: 'POST',
            data: dataObj,
            success: function(res) {

            },
            error: bs.errorHandler
        });
    }

    function disableVideo(){
        var dataObj = {};
        dataObj.vid=[];
        dataObj.vid.push(parseInt(bs.getUrlVar('id')));
        $.ajax({
            url: '/admin/schoolvideo/disable-extravideo',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message != 'success') {
                    swal(message);
                    return false;
                }
                location.replace('/admin/schoolvideo/extra');
            },
            error: bs.errorHandler
        });
    }

    function roundDecimal(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }
});
