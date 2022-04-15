$(function (){
    'use strict';
    var newObj={};
    init();
    function init(){

        GetEditBookindexData();

        $('#btn-cancel').on('click',function (e){
            e.preventDefault();
            history.go(-1);
        });

        $('#btn-bookindex-save').on('click',function(e){
            e.preventDefault();
            OnlineUpdateBookindex();


        });


    }

    function GetEditBookindexData(){
        var bookindex_ids=bs.getUrlVar('bid');
        var dataObj={};
        dataObj.bookindex_ids=bookindex_ids;
        $.ajax({
            url: '/admin/quiz/get-edit-bookindex-data',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    alert(res.message);
                }else{

                    $('#tbList_info').html('');
                    //初始化組成datatable的第一列
                    var table_html='';
                    table_html+= '<div class="table-responsive">';
                    table_html+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList">';
                    table_html+='<thead>';
                    table_html+='<tr>';
                    table_html+='<th>版本對照編號</th>';
                    table_html+='<th>教材版本</th>';
                    table_html+='<th>年級</th>';
                    table_html+='<th>科目</th>';
                    table_html+='<th>冊次</th>';
                    table_html+='<th>版本</th>';
                    table_html+='<th>學期</th>';
                    table_html+='<th>課程類別</th>';
                    table_html+='<th>周次</th>';
                    table_html+='<th>二次段考</th>';
                    table_html+='<th>三次段考</th>';
                    table_html+='<th>單元序號</th>';
                    table_html+='<th>單元名稱</th>';
                    table_html+='<th>主題序號</th>';
                    table_html+='<th>主題名稱</th>';
                    table_html+='<th>基底版課綱</th>';
                    table_html+='<th>基底版年級</th>';
                    table_html+='<th>基底版單元序號</th>';
                    table_html+='<th>基底版單元名稱</th>';
                    table_html+='<th>基底版主題序號</th>';
                    table_html+='<th>基底版主題名稱</th>';
                    table_html+='<th>基底版對應內碼</th>';
                    table_html+='<th>排序</th>';
                    table_html+='<th>備註</th>';
                    table_html+='<th>是否跟課程總覽有連結</th>';
                    table_html+='<th>大考題數</th>';
                    table_html+= '</tr>';
                    table_html+='</thead>';
                    table_html+='<tfoot></tfoot>';
                    table_html+='<tbody id="tbinfo"></tbody>'
                    table_html+=' </table>';
                    table_html+='</div>';

                    $('#tbList_info').append(table_html);

                    //datatable內頁
                    $('#tbinfo').empty().html(getTbinfoHtml(res.data));

                    $.each(res.data,function(key,item){
                        var bookindex_id=item.id;
                        var text_year=item.text_year;
                        var grade_code=item.grade_code;
                        var subject_code=item.subject_code;
                        var sub_subject_code=item.sub_subject_code;
                        var factory_code=item.factory_code;
                        var term_code=item.term_code;
                        var course_code=item.course_code;
                        var weeks =item.weeks;
                        var exam_twice=item.exam_twice;
                        var exam_thrice=item.exam_thrice;
                        var unit =item.unit;
                        var unit_name=item.unit_name;
                        var topic=item.topic;
                        var topic_name=item.topic_name;
                        var ailead_edition_code=item.ailead_edition_code;
                        var ailead_grade_code=item.ailead_grade_code;
                        var ailead_unit=item.ailead_unit;
                        var ailead_unit_name=item.ailead_unit_name;
                        var ailead_topic=item.ailead_topic;
                        var ailead_topic_name=item.ailead_topic_name;
                        var ailead_parent_code=item.ailead_parent_code;
                        var sort=item.sort;
                        var notes=item.notes;
                        var is_ailead_parent_code=item.is_ailead_parent_code;
                        var ai_quiz_count=item.ai_quiz_count;



                        getTextyear(bookindex_id,text_year);
                        getGradeCode(bookindex_id,grade_code,ailead_grade_code);
                        getSubjectCode(bookindex_id,subject_code);
                        getSubSubjectCode(bookindex_id,sub_subject_code);
                        getFactoryCode(bookindex_id,factory_code);
                        getTermCode(bookindex_id,term_code);
                        getCourseCode(bookindex_id,course_code);
                        $('#input-weeks-'+bookindex_id).val(weeks);
                        $('#input-exam-twice-'+bookindex_id).val(exam_twice);
                        $('#input-exam-thrice-'+bookindex_id).val(exam_thrice);
                        $('#input-unit-'+bookindex_id).val(unit);
                        $('#input-unit-name-'+bookindex_id).val(unit_name);
                        $('#input-topic-'+bookindex_id).val(topic);
                        $('#input-topic-name-'+bookindex_id).val(topic_name);
                        getAileadEditionCode(bookindex_id,ailead_edition_code)
                        $('#input-ailead-unit-'+bookindex_id).val(ailead_unit);
                        $('#input-ailead-unit-name-'+bookindex_id).val(ailead_unit_name);
                        $('#input-ailead-topic-'+bookindex_id).val(ailead_topic);
                        $('#input-ailead-topic-name-'+bookindex_id).val(ailead_topic_name);
                        $('#input-ailead-parent-code-'+bookindex_id).val(ailead_parent_code);
                        $('#input-sort-'+bookindex_id).val(sort);
                        $('#input-notes-'+bookindex_id).val(notes);
                        $('#input-ai-quiz-count-'+bookindex_id).val(ai_quiz_count);








                    });




                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }


    function getTextyear(bookindex_id,text_year){

        $('#select-text-year-'+bookindex_id+' option').remove();
        $('#select-text-year-'+bookindex_id).append('<option value="-1">請選擇教材版本</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="110">110</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="109">109</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="108">108</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="107">107</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="106">106</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="105">105</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="104">104</option>');
        $('#select-text-year-'+bookindex_id).append('<option value="103">103</option>');

        $('#select-text-year-'+bookindex_id).val(text_year);


        $('#select-text-year-'+bookindex_id).select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getGradeCode(bookindex_id,grade_code,ailead_grade_code){
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                $('#select-grade-code-'+bookindex_id+' option').remove();
                $('#select-grade-code-'+bookindex_id).append('<option value="-1">選擇年級</option>');
                $('#select-grade-code-'+bookindex_id).append('<option value="E0">國小</option>');
                $('#select-grade-code-'+bookindex_id).append('<option value="J0">國中</option>');
                $('#select-grade-code-'+bookindex_id).append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-grade-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade-code-'+bookindex_id).val(grade_code);
                $('#select-grade-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

                $('#select-ailead-grade-code-'+bookindex_id+' option').remove();
                $('#select-ailead-grade-code-'+bookindex_id).append('<option value="-1">選擇年級</option>');
                $('#select-ailead-grade-code-'+bookindex_id).append('<option value="E0">國小</option>');
                $('#select-ailead-grade-code-'+bookindex_id).append('<option value="J0">國中</option>');
                $('#select-ailead-grade-code-'+bookindex_id).append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-ailead-grade-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-ailead-grade-code-'+bookindex_id).val(ailead_grade_code);
                $('#select-ailead-grade-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });





            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(bookindex_id,subject_code){
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-subject-code-'+bookindex_id+' option').remove();
                $('#select-subject-code-'+bookindex_id).append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#select-subject-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject-code-'+bookindex_id).val(subject_code);
                $('#select-subject-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getSubSubjectCode(bookindex_id,sub_subject_code){
        $.ajax({
            url: '/admin/quiz/get-all-sub-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-sub-subject-code-'+bookindex_id+' option').remove();
                $('#select-sub-subject-code-'+bookindex_id).append('<option value="-1">選擇冊次</option>');
                $.each(res, function(key, item) {
                    $('#select-sub-subject-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                if (sub_subject_code==''){
                    sub_subject_code='-1';
                };
                $('#select-sub-subject-code-'+bookindex_id).val(sub_subject_code);

                $('#select-sub-subject-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getFactoryCode(bookindex_id,factory_code){
        $.ajax({
            url: '/admin/quiz/get-factory-code',
            type: 'post',
            success: function(res) {
                $('#select-factory-code-'+bookindex_id+' option').remove();
                $('#select-factory-code-'+bookindex_id).append('<option value="-1">選擇版本</option>');
                $.each(res, function(key, item) {
                    $('#select-factory-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                if (factory_code==''){
                    factory_code='-1';
                };
                $('#select-factory-code-'+bookindex_id).val(factory_code);
                $('#select-factory-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getTermCode(bookindex_id,term_code){
        $.ajax({
            url: '/admin/quiz/get-term-code',
            type: 'post',
            success: function(res) {
                $('#select-term-code-'+bookindex_id+' option').remove();
                $('#select-term-code-'+bookindex_id).append('<option value="-1">選擇學期</option>');
                $.each(res, function(key, item) {
                    $('#select-term-code-'+bookindex_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-term-code-'+bookindex_id+' option[value=C]').remove();
                $('#select-term-code-'+bookindex_id+' option[value=D]').remove();

                $('#select-term-code-'+bookindex_id).val(term_code);
                $('#select-term-code-'+bookindex_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getCourseCode(bookindex_id,course_code){

        $('#select-course-code-'+bookindex_id+' option').remove();
        $('#select-course-code-'+bookindex_id).append('<option value="-1">選擇課程類別</option>');
        $('#select-course-code-'+bookindex_id).append('<option value="B">進度課程</option>');
        $('#select-course-code-'+bookindex_id).append('<option value="F">段考</option>');
        $('#select-course-code-'+bookindex_id).append('<option value="H">總複習</option>');
        $('#select-course-code-'+bookindex_id).val(course_code);

        $('#select-course-code-'+bookindex_id).select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getAileadEditionCode(bookindex_id,ailead_edition_code){

        $('#select-ailead-edition-code-'+bookindex_id+' option').remove();
        $('#select-ailead-edition-code-'+bookindex_id).append('<option value="-1">請選擇課綱</option>');
        $('#select-ailead-edition-code-'+bookindex_id).append('<option value="99">99</option>');
        $('#select-ailead-edition-code-'+bookindex_id).append('<option value="100">100</option>');
        $('#select-ailead-edition-code-'+bookindex_id).append('<option value="108">108</option>');

        $('#select-ailead-edition-code-'+bookindex_id).val(ailead_edition_code);




        $('#select-ailead-edition-code-'+bookindex_id).select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }



    function getTbinfoHtml(resdata){
        var inner_html='';
        $.each(resdata,function(key,item) {
           var bookindex_id=item.id;
           var text_year=item.text_year;
           var grade_code=item.grade_code;
           var subject_code=item.subject_code;
           var sub_subject_code=item.sub_subject_code;
           var factory_code=item.factory_code;
           var term_code=item.term_code;
           var course_code=item.course_code;
           var weeks =item.weeks;
           var exam_twice=item.exam_twice;
           var exam_thrice=item.exam_thrice;
           var unit =item.unit;
           var unit_name=item.unit_name;
           var topic=item.topic;
           var topic_name=item.topic_name;
           var ailead_edition_code=item.ailead_edition_code;
           var ailead_grade_code=item.ailead_grade_code;
           var ailead_unit=item.ailead_unit;
           var ailead_unit_name=item.ailead_unit_name;
           var ailead_topic=item.ailead_topic;
           var ailead_topic_name=item.ailead_topic_name;
           var ailead_parent_code=item.ailead_parent_code;
           var sort=item.sort;
           var notes=item.notes;
           var is_ailead_parent_code=item.is_ailead_parent_code;
           var ai_quiz_count=item.ai_quiz_count;
            inner_html+='<tr>';
            inner_html+='<td>'+bookindex_id+'</td>';

            var select2_text_year_html='<select class="select2-single" id="select-text-year-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_text_year_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-text-year-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+text_year+'</td>';


            var select2_grade_code_html='<select class="select2-single" id="select-grade-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_grade_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-grade-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+grade_code+'</td>';

            var select2_subject_code_html='<select class="select2-single" id="select-subject-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_subject_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-subject-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+subject_code+'</td>';


            var select2_sub_subject_code_html='<select class="select2-single" id="select-sub-subject-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_sub_subject_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-sub-subject-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+sub_subject_code+'</td>';

            var select2_factory_code_html='<select class="select2-single" id="select-factory-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_factory_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-factory-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+factory_code+'</td>';

            var select2_term_code_html='<select class="select2-single" id="select-term-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_term_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-term-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+term_code+'</td>';

            var select2_course_code_html='<select class="select2-single" id="select-course-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_course_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-course-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+course_code+'</td>';

            inner_html+='<td><input  type=text style="width:55px" id="input-weeks-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+weeks+'</td>';

            inner_html+='<td><input  type=text style="width:55px" id="input-exam-twice-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+exam_twice+'</td>';

            inner_html+='<td><input  type=text style="width:55px" id="input-exam-thrice-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+exam_thrice+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-unit-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+unit+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-unit-name-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+unit_name+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-topic-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+topic+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-topic-name-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+topic_name+'</td>';


            var select2_ailead_edition_code_html='<select class="select2-single" id="select-ailead-edition-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_ailead_edition_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-ailead-edition-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_edition_code+'</td>';


            var select2_ailead_grade_code_html='<select class="select2-single" id="select-ailead-grade-code-'+bookindex_id+'" ></select>';
            inner_html+='<td>'+select2_ailead_grade_code_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-ailead-grade-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_grade_code+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-ailead-unit-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_unit+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-ailead-unit-name-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_unit_name+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-ailead-topic-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_topic+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-ailead-topic-name-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_topic_name+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-ailead-parent-code-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ailead_parent_code+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-sort-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+sort+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-notes-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+notes+'</td>';
            inner_html+='<td>'+is_ailead_parent_code+'</td>';
            inner_html+='<td><input  type=text style="width:250px" id="input-ai-quiz-count-'+bookindex_id+'"></td>';
            //inner_html+='<td>'+ai_quiz_count+'</td>';

            inner_html+='</tr>';



        });
        return inner_html;

    }


    function  OnlineUpdateBookindex(){
        var save_bookindex_ids=bs.getUrlVar('bid');
        var save_bookindex_array=[];
        save_bookindex_array = save_bookindex_ids.split('-');

        newObj.save_ary=[];
        $.each(save_bookindex_array,function(key,item){
            var bookindex_obj={};
            bookindex_obj.index=key;
            bookindex_obj.bookindex_id=item;
            bookindex_obj.text_year=$('#select-text-year-'+item+' option:selected').val();
            bookindex_obj.grade_code=$('#select-grade-code-'+item+' option:selected').val();
            bookindex_obj.subject_code=$('#select-subject-code-'+item+' option:selected').val();
            bookindex_obj.sub_subject_code=$('#select-sub-subject-code-'+item+' option:selected').val();
            bookindex_obj.factory_code=$('#select-factory-code-'+item+' option:selected').val();
            bookindex_obj.term_code=$('#select-term-code-'+item+' option:selected').val();
            bookindex_obj.course_code=$('#select-course-code-'+item+' option:selected').val();
            bookindex_obj.weeks=$('#input-weeks-'+item).val();
            bookindex_obj.exam_twice=$('#input-exam-twice-'+item).val();
            bookindex_obj.exam_thrice=$('#input-exam-thrice-'+item).val();
            bookindex_obj.unit=$('#input-unit-'+item).val();
            bookindex_obj.unit_name=$('#input-unit-name-'+item).val();
            bookindex_obj.topic=$('#input-topic-'+item).val();
            bookindex_obj.topic_name=$('#input-topic-name-'+item).val();
            bookindex_obj.ailead_edition_code=$('#select-ailead-edition-code-'+item+' option:selected').val();
            bookindex_obj.ailead_grade_code=$('#select-ailead-grade-code-'+item+' option:selected').val();
            bookindex_obj.ailead_unit=$('#input-ailead-unit-'+item).val();
            bookindex_obj.ailead_unit_name=$('#input-ailead-unit-name-'+item).val();
            bookindex_obj.ailead_topic=$('#input-ailead-topic-'+item).val();
            bookindex_obj.ailead_topic_name=$('#input-ailead-topic-name-'+item).val();
            bookindex_obj.ailead_parent_code=$('#input-ailead-parent-code-'+item).val();
            bookindex_obj.sort=$('#input-sort-'+item).val();
            bookindex_obj.notes=$('#input-notes-'+item).val();
            bookindex_obj.ai_quiz_count=$('#input-ai-quiz-count-'+item).val();
            newObj.save_ary.push(bookindex_obj);

        });
        var dataObj={};
        dataObj.save_data=newObj.save_ary;



        $.ajax({
            url: '/admin/quiz/online-update-bookindex',
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
                    location.reload();
                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });



    }


});