$(function () {
    'use strict';

    // 活動起始時間
    $('#start_at').datetimepicker({
        step: 30,
        format: 'Y-m-d H:i:00'
    });

    // 活動結束時間
    $('#end_at').datetimepicker({
        step: 30,
        format: 'Y-m-d H:i:00'
    });

    // 報名起始時間
    $('#register_start_at').datetimepicker({
        step: 30,
        format: 'Y-m-d H:i:00'
    });

    // 報名結束時間
    $('#register_end_at').datetimepicker({
        step: 30,
        format: 'Y-m-d H:i:00'
    });

    $('#file_upload').on('change', function (e) {
        e.preventDefault();
        uploadImage();
    });

    function uploadImage() {
        var formdata = new FormData();
        formdata.append('id', bs.getUrlVar('id'));
        var files = $('#file_upload').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        $.ajax({
            url: '/admin/course/course-upload-image',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (r) {
                $('#img').val(r.fullfilename);
                $('#img-photo').attr('src', r.fullfilename);
            },
            error: bs.errorHandler
        });
    };

    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.course-data-view').hide();
        $('.course-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url: '/admin/course/get-course-data',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r != '[]') && (r != '')) {
                    // view
                    $('[data-field="title"]').html(r[0].title);
                    $('[data-field="description"]').html(r[0].description);
                    $('[data-field="start_at"]').html(r[0].start_at);
                    $('[data-field="end_at"]').html(r[0].end_at);
                    $('[data-field="register_start_at"]').html(r[0].register_start_at);
                    $('[data-field="register_end_at"]').html(r[0].register_end_at);
                    $('[data-field="status"]').html(r[0].status);
                    $('[data-field="hot_sort"]').html(r[0].hot_sort);
                    $('[data-field="url"]').html(r[0].url);

                    // edit
                    $('#title').val(r[0].title);
                    $('#description').val(r[0].description);
                    $('#start_at').val(r[0].start_at);
                    $('#end_at').val(r[0].end_at);
                    $('#register_start_at').val(r[0].register_start_at);
                    $('#register_end_at').val(r[0].register_end_at);
                    bs.initSelectElement('#status', '/admin/quiz/get-status', '', '', r[0].status, '');
                    $('#hot_sort').val(r[0].hot_sort);
                    $('#url').val(r[0].url);

                    $('#img').val(r[0].img);
                    if (r[0].img != '') {
                        $('#img-photo').attr('src', r[0].img);
                    }

                } else {
                    alert('無此資料！');
                    location.href = '/admin/course/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.course-data-view').show();
        $('.course-data-edit').hide();
    }

    $('#btn-course-edit').on('click', function (e) {
        e.preventDefault();
        $('.course-data-view').hide();
        $('.course-data-edit').show();
    });

    jQuery.validator.addMethod('check_upload_image', function (value, element) {
            if ($('#img').val() == '') {
                return false;
            } else {
                return true;
            }
        }, '請選擇圖片.'
    );

    $('#course-form').submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            file_upload: {check_upload_image: true},
            title: {required: true},
            description: {required: true},
            start_at: {required: true},
            end_at: {required: true},
            register_start_at: {required: true},
            register_end_at: {required: true},
            hot_sort: {required: true, digits: true},
        },
        messages: {
            file_upload: '請選擇圖片',
            title: '請輸入活動名稱',
            description: '請輸入簡介',
            start_at: '請選擇活動起始時間',
            end_at: '請選擇活動結束時間',
            register_start_at: '請選擇報名起始時間',
            register_end_at: '請選擇報名結束時間',
            hot_sort: '排序必需為數字',
        },
    });


    $('#course-submit').on('click', function () {
        if ($('#course-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.title = $('#title').val();
            dataObj.description = $('#description').val();
            dataObj.start_at = $('#start_at').val();
            dataObj.end_at = $('#end_at').val();
            dataObj.register_start_at = $('#register_start_at').val();
            dataObj.register_end_at = $('#register_end_at').val();
            dataObj.status = $('#status').val();
            dataObj.hot_sort = $('#hot_sort').val();
            dataObj.img = $('#img').val();
            dataObj.url =$('#url').val();

            $.ajax({
                url: '/admin/course/course-add',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.replace(r.reurl);
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });
        }
    });


    var newObj = {};
    init();

    function init() {
        newObj = initObj();
    }

    function initObj() {
        bs.initSelectElement('#status', '/admin/quiz/get-status', '', '', '');
    }
});
