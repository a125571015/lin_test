$(function() {
    'use strict';
    var newObj = {};
    init();
    function init(){
        getSubjectCode();
        getGradeCode();
        getEditionCode();
        getSubSubjectCode();
        getTermCode();
        getCourseCode();
        getCarrierCode();

        $('#btn-cancel').on('click',function (e){
            e.preventDefault();
            history.go(-1);
        });

        $('#btn-insert').on('click',function (e){
            e.preventDefault();
            var dataObj={};
            dataObj.edition_code=$('#select-edition-code').val();
            dataObj.grade_code=$('#select-grade').val();
            dataObj.subject_code=$('#select-subject').val();
            dataObj.sub_subject_code=$('#select-sub-subject-code').val();
            dataObj.term_code=$('#select-term-code').val();
            dataObj.course_code=$('#select-course-code').val();
            dataObj.carrier_code=$('#select-carrier-code').val();
            dataObj.unit=$('#unit').val();
            dataObj.unit_name=$('#unit-name').val();
            dataObj.topic=$('#topic').val();
            dataObj.topic_name=$('#topic-name').val();
            dataObj.title_name=$('#title-name').val();
            dataObj.video_name=$('#video-name').val();
            dataObj.video_length=$('#video-length').val();
            dataObj.video_size=$('#video-size').val();
            dataObj.knowledge=$('#knowledge').val();
            dataObj.sub_knowledge=$('#sub-knowledge').val();
            dataObj.sort=$('#sort').val();
            dataObj.notes=$('#notes').val();

            $.ajax({
                url: '/admin/quiz/online-insert-classinfo',
                type: 'POST',
                data: dataObj,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {
                    if (res.message!='success'){
                        alert(res.message);
                    }
                    else{
                        //location.reload();
                    }
                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });

        });



    }

    function getEditionCode(){
        $('#select-edition-code').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getGradeCode(){
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {

                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');
                $('#select-grade').append('<option value="E0">國小</option>');
                $('#select-grade').append('<option value="J0">國中</option>');
                $('#select-grade').append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(){
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getSubSubjectCode(){
        $.ajax({
            url: '/admin/quiz/get-all-sub-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-sub-subject-code option').remove();
                $('#select-sub-subject-code').append('<option value="-1">選擇冊次</option>');
                $.each(res, function(key, item) {
                    $('#select-sub-subject-code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-sub-subject-code').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getTermCode(){
        $.ajax({
            url: '/admin/quiz/get-term-code',
            type: 'post',
            success: function(res) {
                $('#select-term-code option').remove();
                $('#select-term-code').append('<option value="-1">選擇學期</option>');
                $.each(res, function(key, item) {
                    $('#select-term-code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-term-code option[value=C]').remove();
                $('#select-term-code option[value=D]').remove();

                $('#select-term-code').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getCourseCode(){
        $('#select-course-code').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getCarrierCode(){
        $('#select-carrier-code').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }













});