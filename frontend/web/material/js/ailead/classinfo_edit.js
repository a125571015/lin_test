$(function() {
    'use strict';
    var newObj = {};
    init();
    function init(){
        GetEditClassinfoData();

        $('#btn-cancel').on('click',function (e){
            e.preventDefault();
            history.go(-1);
        });

        $('#btn-classinfo-save').on('click',function(e){
            e.preventDefault();
            OnlineUpdateClassinfo();


        });

    }

    function OnlineUpdateClassinfo(){
        var save_classinfo_ids=bs.getUrlVar('cid');

        var save_classinfo_array=[];
        save_classinfo_array = save_classinfo_ids.split('-');

        newObj.save_ary=[];
        $.each(save_classinfo_array,function(key,item){
            var classinfo_obj = {};
            classinfo_obj.index = key;
            classinfo_obj.classinfo_id=item;
            classinfo_obj.edition_code=$('#select-edition-code-'+item).val();
            classinfo_obj.grade_code=$('#select-grade-code-'+item).val();
            classinfo_obj.subject_code=$('#select-subject-code-'+item).val();
            classinfo_obj.sub_subject_code=$('#select-sub-subject-code-'+item).val();
            classinfo_obj.term_code=$('#select-term-code-'+item).val();
            classinfo_obj.course_code=$('#select-course-code'+item).val();
            classinfo_obj.carrier_code=$('#input-carrier-code-'+item).val();
            classinfo_obj.cd_code=$('#input-cd-code-'+item).val();
            classinfo_obj.parent_code=$('#input-parent-code-'+item).val();
            classinfo_obj.unit=$('#input-unit-'+item).val();
            classinfo_obj.unit_name=$('#input-unit-name-'+item).val();
            classinfo_obj.topic=$('#input-topic-'+item).val();
            classinfo_obj.topic_name=$('#input-topic-name-'+item).val();
            classinfo_obj.title_name=$('#input-title-name-'+item).val();
            classinfo_obj.video_name=$('#input-video-name-'+item).val();
            classinfo_obj.video_length=$('#input-video-length-'+item).val();
            classinfo_obj.video_size=$('#input-video-size-'+item).val();
            classinfo_obj.knowledge=$('#input-knowledge-'+item).val();
            classinfo_obj.sub_knowledge=$('#input-sub-knowledge-'+item).val();
            classinfo_obj.sort=$('#input-sort-'+item).val();
            classinfo_obj.notes=$('#input-notes-'+item).val();
            newObj.save_ary.push(classinfo_obj);

        });
        var dataObj={};
        dataObj.save_data=newObj.save_ary;
        $.ajax({
            url: '/admin/quiz/online-update-classinfo',
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


    function GetEditClassinfoData(){
        var classinfo_ids=bs.getUrlVar('cid');
        var dataObj={};
        dataObj.classinfo_ids=classinfo_ids;
        $.ajax({
            url: '/admin/quiz/get-edit-classinfo-data',
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
                    $('#tbList_info').html('');

                    //初始化組成datatable的第一列
                    var table_html='';
                    table_html+= '<div class="table-responsive">';
                    table_html+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList">';
                    table_html+='<thead>';
                    table_html+='<tr>';
                    table_html+='<th>課程總覽編號</th>';
                    table_html+='<th>課綱</th>';
                    table_html+='<th>年級</th>';
                    table_html+='<th>科目</th>';
                    table_html+='<th>冊次</th>';
                    table_html+='<th>學期</th>';
                    table_html+='<th>課程類別</th>';
                    table_html+='<th>載體類別</th>';
                    table_html+='<th>內碼第一層</th>';
                    table_html+='<th>內碼第二層</th>';
                    table_html+='<th>單元序號</th>';
                    table_html+='<th>單元名稱</th>';
                    table_html+='<th>主題序號</th>';
                    table_html+='<th>主題名稱</th>';
                    table_html+='<th>觀念序號、名稱</th>';
                    table_html+='<th>串流影片檔名</th>';
                    table_html+='<th>串流影片長度</th>';
                    table_html+='<th>串流影片尺寸</th>';
                    table_html+='<th>知識點(第一層)</th>';
                    table_html+='<th>附屬知識點</th>';
                    table_html+='<th>排序</th>';
                    table_html+='<th>備註</th>';
                    table_html+= '</tr>';
                    table_html+='</thead>';
                    table_html+='<tfoot></tfoot>';
                    table_html+='<tbody id="tbinfo"></tbody>'
                    table_html+=' </table>';
                    table_html+='</div>';

                    $('#tbList_info').append(table_html);


                    //datatable內頁
                    $('#tbinfo').empty().html(getTbinfoHtml(res.data));

                    //datatable內頁寫入數值
                     $.each(res.data,function(key,item){
                         var classinfo_id=item.id;
                         var edition_code=item.edition_code;
                         var grade_code=item.grade_code;
                         var subject_code=item.subject_code;
                         var sub_subject_code=item.sub_subject_code;
                         var term_code=item.term_code;
                         var course_code=item.course_code;
                         var carrier_code=item.carrier_code;
                         var cd_code=item.cd_code;
                         var parent_code=item.parent_code;
                         var unit=item.unit;
                         var unit_name=item.unit_name;
                         var topic=item.topic;
                         var topic_name=item.topic_name;
                         var title_name=item.title_name;
                         var video_name=item.video_name;
                         var video_length=item.video_length;
                         var video_size=item.video_size;
                         var knowledge=item.knowledge;
                         var sub_knowledge=item.sub_knowledge;
                         var sort=item.sort;
                         var notes=item.notes;



                         getEditionCode(classinfo_id,edition_code);
                         getGradeCode(classinfo_id,grade_code);
                         getSubjectCode(classinfo_id,subject_code);
                         getSubSubjectCode(classinfo_id,sub_subject_code);
                         getTermCode(classinfo_id,term_code);
                         getCourseCode(classinfo_id,course_code);

                          // $('#input-edition-code-'+classinfo_id).val(edition_code);
                         // $('#input-grade-code-'+classinfo_id).val(grade_code);
                         // $('#input-subject-code-'+classinfo_id).val(subject_code);
                         // $('#input-sub-subject-code-'+classinfo_id).val(sub_subject_code);
                         // $('#input-term-code-'+classinfo_id).val(term_code);
                         // $('#input-course-code-'+classinfo_id).val(course_code);
                         $('#input-carrier-code-'+classinfo_id).val(carrier_code);
                         $('#input-cd-code-'+classinfo_id).val(cd_code);
                         $('#input-parent-code-'+classinfo_id).val(parent_code);
                         $('#input-unit-'+classinfo_id).val(unit);
                         $('#input-unit-name-'+classinfo_id).val(unit_name);
                         $('#input-topic-'+classinfo_id).val(topic);
                         $('#input-topic-name-'+classinfo_id).val(topic_name);
                         $('#input-title-name-'+classinfo_id).val(title_name);
                         $('#input-video-name-'+classinfo_id).val(video_name);
                         $('#input-video-length-'+classinfo_id).val(video_length);
                         $('#input-video-size-'+classinfo_id).val(video_size);
                         $('#input-knowledge-'+classinfo_id).val(knowledge);
                         $('#input-sub-knowledge-'+classinfo_id).val(sub_knowledge);
                         $('#input-sort-'+classinfo_id).val(sort);
                         $('#input-notes-'+classinfo_id).val(notes);

                    });





                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }


    function getEditionCode(classinfo_id,edition_code){

        $('#select-edition-code-'+classinfo_id+' option').remove();
        $('#select-edition-code-'+classinfo_id).append('<option value="-1">請選擇課綱</option>');
        $('#select-edition-code-'+classinfo_id).append('<option value="99">99</option>');
        $('#select-edition-code-'+classinfo_id).append('<option value="100">100</option>');
        $('#select-edition-code-'+classinfo_id).append('<option value="108">108</option>');

        $('#select-edition-code-'+classinfo_id).val(edition_code);




        $('#select-edition-code-'+classinfo_id).select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getGradeCode(classinfo_id,grade_code){

        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                $('#select-grade-code-'+classinfo_id+' option').remove();
                $('#select-grade-code-'+classinfo_id).append('<option value="-1">選擇年級</option>');
                $('#select-grade-code-'+classinfo_id).append('<option value="E0">國小</option>');
                $('#select-grade-code-'+classinfo_id).append('<option value="J0">國中</option>');
                $('#select-grade-code-'+classinfo_id).append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-grade-code-'+classinfo_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade-code-'+classinfo_id).val(grade_code);
                $('#select-grade-code-'+classinfo_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });


    }


    function getSubjectCode(classinfo_id,subject_code){
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-subject-code-'+classinfo_id+' option').remove();
                $('#select-subject-code-'+classinfo_id).append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#select-subject-code-'+classinfo_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject-code-'+classinfo_id).val(subject_code);
                $('#select-subject-code-'+classinfo_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getSubSubjectCode(classinfo_id,sub_subject_code){
        $.ajax({
            url: '/admin/quiz/get-all-sub-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-sub-subject-code-'+classinfo_id+' option').remove();
                $('#select-sub-subject-code-'+classinfo_id).append('<option value="-1">選擇冊次</option>');
                $.each(res, function(key, item) {
                    $('#select-sub-subject-code-'+classinfo_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                if (sub_subject_code==''){
                    sub_subject_code='-1';
                };
                $('#select-sub-subject-code-'+classinfo_id).val(sub_subject_code);

                $('#select-sub-subject-code-'+classinfo_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


            },
            error: bs.errorHandler
        });
    }

    function getTermCode(classinfo_id,term_code){
        $.ajax({
            url: '/admin/quiz/get-term-code',
            type: 'post',
            success: function(res) {
                $('#select-term-code-'+classinfo_id+' option').remove();
                $('#select-term-code-'+classinfo_id).append('<option value="-1">選擇學期</option>');
                $.each(res, function(key, item) {
                    $('#select-term-code-'+classinfo_id).append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-term-code-'+classinfo_id+' option[value=C]').remove();
                $('#select-term-code-'+classinfo_id+' option[value=D]').remove();

                $('#select-term-code-'+classinfo_id).val(term_code);
                $('#select-term-code-'+classinfo_id).select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getCourseCode(classinfo_id,course_code){

        $('#select-course-code-'+classinfo_id+' option').remove();
        $('#select-course-code-'+classinfo_id).append('<option value="-1">選擇課程類別</option>');
        $('#select-course-code-'+classinfo_id).append('<option value="B">進度課程</option>');
        $('#select-course-code-'+classinfo_id).append('<option value="F">段考</option>');
        $('#select-course-code-'+classinfo_id).append('<option value="H">總複習</option>');
        $('#select-course-code-'+classinfo_id).val(course_code);

        $('#select-course-code-'+classinfo_id).select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }







    function getTbinfoHtml(resdata){
        var inner_html='';
        $.each(resdata,function(key,item){
            var classinfo_id=item.id;
            var edition_code=item.edition_code;
            var grade_code=item.grade_code;
            var subject_code=item.subject_code;
            var sub_subject_code=item.sub_subject_code;
            var term_code=item.term_code;
            var course_code=item.course_code;
            var carrier_code=item.carrier_code;
            var cd_code=item.cd_code;
            var parent_code=item.parent_code;
            var unit=item.unit;
            var unit_name=item.unit_name;
            var topic=item.topic;
            var topic_name=item.topic_name;
            var title_name=item.title_name;
            var video_name=item.video_name;
            var video_length=item.video_length;
            var video_size=item.video_size;
            var knowledge=item.knowledge;
            var sub_knowledge=item.sub_knowledge;
            var sort=item.sort;
            var notes=item.notes;


            inner_html+='<tr>';
            inner_html+='<td>'+classinfo_id+'</td>';

            var select2_editon_html='<select class="select2-single" id="select-edition-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_editon_html+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-edition-code-'+classinfo_id+'"></td>';

            var select2_grade_code='<select class="select2-single" id="select-grade-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_grade_code+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-grade-code-'+classinfo_id+'"></td>';

            var select2_subject_code='<select class="select2-single" id="select-subject-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_subject_code+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-subject-code-'+classinfo_id+'"></td>';

            var select2_sub_subject_code='<select class="select2-single" id="select-sub-subject-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_sub_subject_code+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-sub-subject-code-'+classinfo_id+'"></td>';

            var select2_term_code='<select class="select2-single" id="select-term-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_term_code+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-term-code-'+classinfo_id+'"></td>';

            var select2_course_code='<select class="select2-single" id="select-course-code-'+classinfo_id+'" ></select>';
            inner_html+='<td>'+select2_course_code+'</td>';
            //inner_html+='<td><input  type=text style="width:55px" id="input-course-code-'+classinfo_id+'"></td>';


            inner_html+='<td><input  type=text style="width:55px" id="input-carrier-code-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+carrier_code+'</td>';

            inner_html+='<td><input  type=text style="width:350px"  id="input-cd-code-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+cd_code+'</td>';


            inner_html+='<td><input  type=text style="width:250px" id="input-parent-code-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+parent_code+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-unit-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+unit+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-unit-name-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+unit_name+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-topic-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+topic+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-topic-name-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+topic_name+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-title-name-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+title_name+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-video-name-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+video_name+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-video-length-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+video_length+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-video-size-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+video_size+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-knowledge-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+knowledge+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-sub-knowledge-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+sub_knowledge+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-sort-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+sort+'</td>';

            inner_html+='<td><input  type=text style="width:250px" id="input-notes-'+classinfo_id+'"></td>';
            //inner_html+='<td>'+notes+'</td>';
            inner_html+='</tr>';



        });

        return inner_html;

    }


});