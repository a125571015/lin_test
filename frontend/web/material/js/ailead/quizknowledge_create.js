$(function() {
    'use strict';
    var newObj = {};
    init();

    var knowledge_id = bs.getUrlVar('id');
    if (!knowledge_id){
        init();
    }
    if (knowledge_id.length == 0) {
        $('.quizknowledge-data-view').hide();
        $('.quizknowledge-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = knowledge_id;
        $.ajax({
            url:  '/admin/quiz/get-quizknowledge-data',
            data: JSON.stringify({ 'data': dataObj }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            async:false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r != '[]') && (r != '')) {
                    // edit
                    bs.initSelectElement('#select-source', '/admin/quiz/get-spec-quiz-source-kind', '', '', r[0].source_kind_id, '');
                    bs.initSelectElement('#select-grade', '/admin/quizpaper/get-spec-grade-code', '', '', r[0].grade_code, '');
                    bs.initSelectElement('#select-subject', '/admin/quizpaper/get-all-subject-code', '', '', r[0].subject_code, '' );
                    $('#name').val(r[0].name);

                    // view
                    $('[data-field="source_kind_id"]').html($('#select-source option:selected').text());
                    $('[data-field="grade_code"]').html($('#select-grade option:selected').text());

                    //升私中更動

                    var check_ep=$('#select-grade option:selected').text();
                    var get_subject_code=$('#select-subject option:selected').text();
                    if (check_ep=='主題課程'){
                        if (get_subject_code=='國語文'||get_subject_code=='英語文'){
                            var add_string='升私中';
                            var finish_string=add_string+get_subject_code;
                            $('[data-field="subject_code"]').html(finish_string);
                        }else if (get_subject_code=='數學'){
                           var EPMOString='國小資優數學';
                            $('[data-field="subject_code"]').html(EPMOString);
                        }
                        else
                        {
                            $('[data-field="subject_code"]').html($('#select-subject option:selected').text());
                        }

                    }
                    else{
                        $('[data-field="subject_code"]').html($('#select-subject option:selected').text());
                    }

                    //

                    //$('[data-field="subject_code"]').html($('#select-subject option:selected').text());
                    $('[data-field="name"]').html(r[0].name);
                } else {
                    alert('無此資料！');
                    location.replace('/admin/quiz/quizknowledge');
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.quizknowledge-data-view').show();
        $('.quizknowledge-data-edit').hide();
    }

    $('#btn-quizknowledge-edit').on('click',function(e){
        e.preventDefault();
        $('.quizknowledge-data-view').hide();
        $('.quizknowledge-data-edit').show();
    });


    $('#quizknowledge-form').submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            source_kind_id: 'required',
            grade_code: 'required',
            subject_code: 'required',
            name: 'required',
        },
        messages: {
            source_kind_id: '請選擇來源',
            grade_code: '請選擇年級',
            subject_code: '請選擇科目',
            name: '請輸入知識點',
        },
    });

    $('#quizknowledge-submit').on('click', function() {
        if ($('#quizknowledge-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.source_kind_id = $('#select-source').val();
            dataObj.grade_code = $('#select-grade').val();
            dataObj.subject_code = $('#select-subject').val();
            dataObj.name = $('#name').val();

            $.ajax({
                url: '/admin/quiz/quizknowledge-add',
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






    function init() {
        newObj = initObj();
    }

    function initObj() {
        bs.initSelectElement('#select-source', '/admin/quiz/get-spec-quiz-source-kind', '', '', '');
        bs.initSelectElement('#select-grade', '/admin/quizpaper/get-spec-grade-code', '', '', '');
        bs.initSelectElement('#select-subject', '/admin/quizpaper/get-all-subject-code', '', '', '');

    }
});
