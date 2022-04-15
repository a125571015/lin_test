$(function () {
    'use strict';

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
            url: '/admin/teacher/teacher-upload-image',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function (r) {
                $('#thumbnail').val(r.fullfilename);
                $('#img-photo').attr('src', r.fullfilename);
            },
            error: bs.errorHandler
        });
    };

    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.teacher-data-view').hide();
        $('.teacher-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url: '/admin/teacher/get-teacher-data',
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
                    $('[data-field="status"]').html(r[0].status);
                    $('[data-field="name"]').html(r[0].name);
                    $('[data-field="subject"]').html(r[0].subject);
                    $('[data-field="hot_sort"]').html(r[0].hot_sort);

                    // edit
                    bs.initSelectElement('#status', '/admin/quiz/get-status', '', '', r[0].status, '');
                    $('#name').val(r[0].name);
                    $('#subject').val(r[0].subject);
                    $('#hot_sort').val(r[0].hot_sort);

                    $('#thumbnail').val(r[0].thumbnail);
                    if (r[0].thumbnail != '') {
                        $('#img-photo').attr('src', r[0].thumbnail);
                    }

                } else {
                    alert('無此資料！');
                    location.href = '/admin/teacher/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.teacher-data-view').show();
        $('.teacher-data-edit').hide();
    }

    $('#btn-teacher-edit').on('click', function (e) {
        e.preventDefault();
        $('.teacher-data-view').hide();
        $('.teacher-data-edit').show();
    });

    jQuery.validator.addMethod('check_upload_image', function (value, element) {
            if ($('#thumbnail').val() == '') {
                return false;
            } else {
                return true;
            }
        }, '請選擇圖片.'
    );

    $('#teacher-form').submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            file_upload: {check_upload_image: true},
            name: {required: true},
            subject: {required: true},
            hot_sort: {required: true, digits: true},
        },
        messages: {
            file_upload: '請選擇圖片',
            name: '請輸入名稱',
            subject: '請輸入擅長科目',
            hot_sort: '排序必需為數字',
        },
    });


    $('#teacher-submit').on('click', function () {
        if ($('#teacher-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.hot_sort = $('#hot_sort').val();
            dataObj.name = $('#name').val();
            dataObj.subject = $('#subject').val();
            dataObj.status = $('#status').val();
            dataObj.thumbnail = $('#thumbnail').val();

            $.ajax({
                url: '/admin/teacher/teacher-add',
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
