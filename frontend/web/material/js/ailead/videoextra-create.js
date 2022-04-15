$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        initDropzone();
    }

    function getSchool(id) {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
                $('#' + id + ' option').remove();
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getGradeCode(id) {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                $('#' + id + ' option').remove();
                $('#' + id).append('<option value="-1">選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#' + id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getSchoolclass(id, school_id, grade_code) {
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
                if (!grade_code || grade_code=='-1') {
                    $('#' + id + ' option').remove();
                    $('#' + id).append('<option value="-1">選擇班級</option>');
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(id,cid) {
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
                if (!cid || cid==-1) {
                    $('#' + id + ' option').remove();
                    $('#' + id).append('<option value="-1">選擇科目</option>');
                }
                $('#' + id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getVideoTag(id) {
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

    function initDropzone() {
        $("#dropz").dropzone({
            url: "/admin/schoolvideo/video-upload",
            maxFiles: 10,
            maxFilesize: 1024,
            acceptedFiles: ".mp4",
            dictDefaultMessage: "點擊此處<br>或<br>將檔案拖曳至此",
            init: function() {
                this.on('addedfile', function(file) {
                    window.document.body.onbeforeunload = function() {
                        return false;
                    }
                });

                this.on("success", function(file, res) {

                    window.document.body.onbeforeunload = function() {}

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
                                    <input type="text" class="form-control txt-videotitle" id="txt-videotitle-' + res.id + '" value="'+res.video_title+'">\
                                </div>\
                            </div>\
                        </div>';

                    video_info_html +=
                        '<div class="row strictRow">\
                            <label class="col-sm-2">檔案大小</label>\
                            <strong class="col-sm-10">' + roundDecimal(file.size / 1000000, 1) + 'MB</strong>\
                        </div>';

                    video_info_html +=
                        '<div class="row strictRow">\
                          <label class="col-sm-2" for="txt-notes">備註</label>\
                          <div class="col-sm-10">\
                            <div class="input-group">\
                              <textarea class="txt-videonotes" id="txt-videonotes-' + res.id + '" rows="5"></textarea>\
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
                                        <input type="text" class="form-control date-vtime" autocomplete="off" id="date-vtime-' + res.id + '" readonly>\
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
                                    <select class="select2-single select-school" id="select-school-' + res.id + '"></select>\
                                </div>\
                                <div class="btn-group m-b-10">\
                                    <select class="select2-single select-grade" id="select-grade-' + res.id + '"></select>\
                                </div>\
                                <div class="btn-group m-b-10">\
                                    <select class="select2-single select-schoolclass" id="select-schoolclass-' + res.id + '"></select>\
                                </div>\
                                <div class="btn-group m-b-10">\
                                    <select class="select2-single select-subject" id="select-subject-' + res.id + '"></select>\
                                </div>\
                                <div class="btn-group m-b-10">\
                                    <select class="select2-multiple select-videotags" multiple="multiple" id="select-videotags-' + res.id + '"></select>\
                                </div>\
                            </div>\
                        </div>';

                    video_info_html += '</div>';
                    video_info_html += '</div>';

                    $('#video-info').append(video_info_html);

                    getSchool('select-school-' + res.id);
                    getGradeCode('select-grade-' + res.id);
                    getSchoolclass('select-schoolclass-' + res.id);
                    getSubjectCode('select-subject-' + res.id);
                    getVideoTag('select-videotags-' + res.id);

                    $('#date-vtime-' + res.id).datetimepicker({
                        step: 30,
                        format: 'Y/m/d',
                        timepicker: false,
                        onChangeDateTime: function(dp, $input) {
                            updateVideoInfo(res.id);
                        }
                    });
                    var year = new Date().getFullYear();
                    var month = ("0" + (new Date().getMonth() + 1).toString()).slice(-2);
                    var day = ("0" + new Date().getDate()).slice(-2);
                    var fullDate =  year+'/'+month+'/'+day;
                    $('#date-vtime-' + res.id).val(fullDate);

                    $('.txt-videotitle').off('blur').on('blur', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('txt-videotitle-', '');
                        updateVideoInfo(vid);
                    });

                    $('.txt-videonotes').off('blur').on('blur', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('txt-videonotes-', '');
                        updateVideoInfo(vid);
                    });

                    $('.select-school').off('change').on('change', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('select-school-', '');
                        getGradeCode('select-grade-' + vid);
                        var school_id = $(this).val();
                        var grade_code = $('#select-grade-' + vid).val();
                        getSchoolclass('select-schoolclass-' + vid, school_id, grade_code);
                        getSubjectCode('select-subject-' + vid);
                        updateVideoInfo(vid);
                    });

                    $('.select-grade').off('change').on('change', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('select-grade-', '');
                        var school_id = $('#select-school-' + vid).val();
                        var grade_code = $(this).val();
                        getSchoolclass('select-schoolclass-' + vid, school_id, grade_code);
                        getSubjectCode('select-subject-' + vid);
                        updateVideoInfo(vid);
                    });

                    $('.select-schoolclass').off('change').on('change', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('select-schoolclass-', '');
                        getSubjectCode('select-subject-' + vid,$('#select-schoolclass-' + vid).val());
                        updateVideoInfo(vid);
                    });

                    $('.select-subject').off('change').on('change', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('select-subject-', '');
                        updateVideoInfo(vid);
                    });

                    $('.select-videotags').off('change').on('change', function(e) {
                        e.preventDefault();
                        var vid = $(this).attr('id').replace('select-videotags-', '');
                        updateVideoInfo(vid);
                    });

                });
            }
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

    function roundDecimal(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (precision || 0));
    }
});
