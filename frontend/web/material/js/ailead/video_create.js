$(function () {
    'use strict';


    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.video-data-view').hide();
        $('.video-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url: '/admin/video/get-video-data',
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
                    $('[data-field="youtube_id"]').html(r[0].youtube_id);
                    $('[data-field="title"]').html(r[0].title);
                    $('[data-field="status"]').html(r[0].status);
                    $('[data-field="orderby"]').html(r[0].orderby);

                    // edit
                    bs.initSelectElement('#status', '/admin/quiz/get-status', '', '', r[0].status, '');
                    $('#youtube_id').val(r[0].youtube_id);
                    $('#title').val(r[0].title);
                    $('#orderby').val(r[0].orderby);
                } else {
                    alert('無此資料！');
                    location.href = '/admin/video/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.video-data-view').show();
        $('.video-data-edit').hide();
    }

    $('#btn-video-edit').on('click', function (e) {
        e.preventDefault();
        $('.video-data-view').hide();
        $('.video-data-edit').show();
    });

    $('#video-form').submit(function (e) {
        e.preventDefault();
    }).validate({
        rules: {
            youtube_id: {required: true},
            title: {required: true},
            orderby: {required: true, digits: true},
        },
        messages: {
            youtube_id: 'YoutubeID請輸入11碼',
            title: '請輸入影片標題',
            orderby: '排序必需為數字',
        },
    });


    $('#video-submit').on('click', function () {
        if ($('#video-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.orderby = $('#orderby').val();
            dataObj.title = $('#title').val();
            dataObj.youtube_id = $('#youtube_id').val();
            dataObj.status = $('#status').val();

            $.ajax({
                url: '/admin/video/video-add',
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
