$(function() {
    'use strict';
    var newObj = {};
    init();
    function init(){

        getTextYear();
        getGradeCode();
        getSubjectCode();
        getSubSubjectCode();
        getFactoryCode();
        getTermCode();
        getCourseCode();
        getAileadEditionCode();

        $('#btn-cancel').on('click',function (e){
            e.preventDefault();
            history.go(-1);
        });

        $('#btn-insert').on('click',function (e) {
            e.preventDefault();
            var dataObj={}
            dataObj.text_year=$('#select-text-year option:selected').val();
            dataObj.grade_code=$('#select-grade option:selected').val();
            dataObj.subject_code=$('#select-subject option:selected').val();
            dataObj.sub_subject_code=$('#select-sub-subject-code option:selected').val();
            dataObj.factory_code=$('#select-factory-code option:selected').val();
            dataObj.term_code=$('#select-term-code option:selected').val();
            dataObj.course_code=$('#select-course-code option:selected').val();
            dataObj.weeks=$('#weeks').val();
            dataObj.exam_twice=$('#exam_twice').val();
            dataObj.exam_thrice=$('#exam_thrice').val();
            dataObj.unit=$('#unit').val();
            dataObj.unit_name=$('#unit_name').val();
            dataObj.topic=$('#topic').val();
            dataObj.topic_name=$('#topic_name').val();
            dataObj.ailead_edition_code=$('#select-ailead-edition-code option:selected').val();
            dataObj.ailead_grade_code=$('#select-ailead-grade-code option:selected').val();
            dataObj.ailead_unit=$('#ailead_unit').val();
            dataObj.ailead_unit_name=$('#ailead_unit_name').val();
            dataObj.ailead_topic=$('#ailead_topic').val();
            dataObj.ailead_topic_name=$('#ailead_topic_name').val();
            dataObj.sort=$('#sort').val();
            dataObj.notes=$('#notes').val();
            dataObj.ai_quiz_count=$('#ai_quiz_count').val();

            $.ajax({
                url: '/admin/quiz/online-insert-bookindex',
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

    function getTextYear(){
        $('#select-text-year-code').select2({
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

                //基底版年級
                $('#select-ailead-grade-code option').remove();
                $('#select-ailead-grade-code').append('<option value="-1">選擇年級</option>');
                $('#select-ailead-grade-code').append('<option value="E0">國小</option>');
                $('#select-ailead-grade-code').append('<option value="J0">國中</option>');
                $('#select-ailead-grade-code').append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-ailead-grade-code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-ailead-grade-code').select2({
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

    function getFactoryCode() {
        $.ajax({
            url: '/admin/quiz/get-factory-code',
            type: 'post',
            success: function (res) {
                $('#select-factory-code option').remove();
                $('#select-factory-code').append('<option value="-1">選擇版本</option>');
                $.each(res, function (key, item) {
                    $('#select-factory-code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });


                $('#select-factory-code').select2({
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

    function getAileadEditionCode(){
        $('#select-ailead-edition-code').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }



});