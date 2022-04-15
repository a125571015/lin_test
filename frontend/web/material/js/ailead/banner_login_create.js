$(function() {
    'use strict';

    $('#file_upload').on('change', function(e) {
        e.preventDefault();
        uploadImage();
    });

    $('#file-trans').on('click',function(){

        if (!$('#file_path').val()) {
            return false;
        }

        var dataObj={};
        dataObj.file_path=$('#file_path').val();

        $.ajax({
          url: '/admin/banner-login/banner-transfer',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              $('#img-photo').attr('src',res+'?v='+Math.random());
          },
          error: bs.errorHandler
        });
    });

    function uploadImage() {
        var formdata = new FormData();
        formdata.append('id',bs.getUrlVar('id'));
        var files = $('#file_upload').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        $.ajax({
            url: '/admin/banner-login/banner-login-upload-image',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(r) {
                $('#file_path').val(r.fullfilename);
                $('#img-photo').attr('src', r.fullfilename+'?v='+Math.random());
            },
            error: bs.errorHandler
        });
    };

    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.banner-login-data-view').hide();
        $('.banner-login-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url:  '/admin/banner-login/get-banner-login-data',
            data: JSON.stringify({ 'data': dataObj }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r != '[]') && (r != '')) {
                    // edit
                    bs.initSelectElement('#status', '/admin/quiz/get-status', '', '', r[0].status, '');

                    $('#status').val(r[0].status);
                    $('#hot_sort').val(r[0].hot_sort);

                    $('#file_path').val(r[0].file_path);
                    if (r[0].file_path != '') {
                        $('#img-photo').attr('src', r[0].file_path+'?v='+Math.random());
                    }

                    // view
                    //$('[data-field="status"]').html(r[0].status);
                    $('[data-field="status"]').html($('#status option:selected').text());

                    $('[data-field="hot_sort"]').html(r[0].hot_sort);
                } else {
                    alert('無此資料！');
                    location.href = '/admin/banner-login/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.banner-login-data-view').show();
        $('.banner-login-data-edit').hide();
    }

    $('#btn-banner-login-edit').on('click',function(e){
        e.preventDefault();
        $('.banner-login-data-view').hide();
        $('.banner-login-data-edit').show();
    });

    jQuery.validator.addMethod('check_upload_image', function(value, element) {
            if ($('#file_path').val() == '') {
                return false;
            } else {
                return true;
            }
        }, '請選擇圖片.'
    );

    $('#banner-login-form').submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            file_upload : { check_upload_image : true },
            hot_sort: {required: true, digits: true},
        },
        messages: {
            file_upload: '請選擇圖片',
            hot_sort: '排序必需為數字',
        },
    });



    $('#banner-login-submit').on('click', function() {
        if ($('#banner-login-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.hot_sort = $('#hot_sort').val();
            dataObj.status = $('#status').val();
            dataObj.file_path = $('#file_path').val();

            $.ajax({
                url: '/admin/banner-login/banner-login-add',
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
