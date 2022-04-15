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
            url: '/admin/about-us/about-us-upload-image',
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
        $('.about-us-data-view').hide();
        $('.about-us-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url: '/admin/about-us/get-about-us-data',
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
                    $('[data-field="description"]').html(r[0].description);
                    $('[data-field="phone"]').html(r[0].phone);
                    $('[data-field="address"]').html(r[0].address);

                    // edit
                    $('#description').val(r[0].description);
                    $('#phone').val(r[0].phone);
                    $('#address').val(r[0].address);

                    $('#thumbnail').val(r[0].thumbnail);
                    if (r[0].thumbnail != '') {
                        $('#img-photo').attr('src', r[0].thumbnail);
                    }

                } else {
                    alert('無此資料！');
                    location.href = '/admin/about-us/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.about-us-data-view').show();
        $('.about-us-data-edit').hide();
    }

    $('#btn-about-us-edit').on('click', function (e) {
        e.preventDefault();
        $('.about-us-data-view').hide();
        $('.about-us-data-edit').show();
    });

    jQuery.validator.addMethod('check_upload_image', function (value, element) {
            if ($('#thumbnail').val() == '') {
                return false;
            } else {
                return true;
            }
        }, '請選擇圖片.'
    );

    $('#about-us-form').submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            file_upload: {check_upload_image: true},
            description: {required: true},
            phone: {required: true},
            address: {required: true},
        },
        messages: {
            file_upload: '請選擇圖片',
            description: '請輸入描述',
            phone: '請輸入電話',
            address: '請輸入地址',
        },
    });


    $('#about-us-submit').on('click', function () {
        if ($('#about-us-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.description = $('#description').val();
            dataObj.phone = $('#phone').val();
            dataObj.address = $('#address').val();
            dataObj.thumbnail = $('#thumbnail').val();

            $.ajax({
                url: '/admin/about-us/about-us-add',
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
