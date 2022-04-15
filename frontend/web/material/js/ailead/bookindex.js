$(function() {
    'use strict';
    var newObj = {};
    init();
    function init(){
        getTextYearCode();
        getGradeCode();
        getSubjectCode();
        getSubSubjectCode();
        getFactoryCode();
        getTermCode();
        getCourseCode();
        getAileadEditionCode();
        getIsAileadParentCode()
        initObj();

        $('#btn-bookindex-edit').on('click',function(e){
            e.preventDefault();
            var bid='';
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0){
                swal('沒有勾選任何版本對照編號');
                return false;
            }
            $.each(rows_selected, function(key, item){
                bid+=item+'-';
            });
            bid=bid.slice(0,-1);

            location.href = '/admin/quiz/bookindex_edit?bid=' +bid;
        });

        $('#btn-bookindex-delete').on('click',function(e){
            e.preventDefault();
            DeleteBookindex();
        });





        $('#select-text-year-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });


        $('#select-grade-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });


        $('#select-subject-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });

        $('#select-factory-code-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });


        $('#select-term-code-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });

        $('#select-course-code-jstree').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });




    }
    function initObj(){
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': "full_numbers",
            'aLengthMenu': [
                [30],
                ['30']
            ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
            'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
            'paging': true, //分頁開關
            'oLanguage': {
                'sLengthMenu': '每頁顯示 _MENU_ 筆紀錄',
                'sZeroRecords': '找不到相關數據',
                'sInfo': '顯示 _START_ 到 _END_ 筆，共 _TOTAL_ 筆紀錄',
                'sInfoEmtpy': '對不起，查詢不到任何相關數據',
                'sInfoFiltered': '(總筆數 _MAX_ )',
                'sProcessing': '載入中...',
                'sSearch': '搜尋',
                'sUrl': '', //多語言配置文件，可將oLanguage的設置放在一個txt文件中，例：Javascript/datatable/dtCH.txt
                'oPaginate': {
                    'sFirst': '第一頁',
                    'sPrevious': '上一頁 ',
                    'sNext': '下一頁 ',
                    'sLast': '最終頁 '
                },
            }, //多語言配置
            'bFilter': false, //搜尋欄開關
            'bSortClasses': true,
            'bSort': true,
            'order': [
                [1, 'desc']
            ], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true, //等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //"pagingType": "input",//加入跳頁插件
            //==========請求數據start
            'serverSide': true,
            'ajax': {
                'type': 'post',
                'url': '/admin/quiz/get-bookindex-list',
                'data': function(data) {
                    data.text_year=$('#select-text-year').val();
                    data.grade_code = $('#select-grade').val();
                    data.subject_code = $('#select-subject').val();
                    data.sub_subject_code=$('#select-sub-subject-code').val();
                    data.factory_code=$('#select-factory-code').val();
                    data.term_code=$('#select-term-code').val();
                    data.course_code=$('#select-course-code').val();
                    data.weeks=$('#weeks').val();
                    data.exam_twice=$('#exam_twice').val();
                    data.exam_thrice=$('#exam_thrice').val();
                    data.unit=$('#unit').val();
                    data.unit_name=$('#unit_name').val();
                    data.topic=$('#topic').val();
                    data.topic_name=$('#topic_name').val();
                    data.ailead_edition_code=$('#select-ailead-edition-code').val();
                    data.ailead_grade_code=$('#select-ailead-grade').val();
                    data.ailead_unit=$('#ailead_unit').val();
                    data.ailead_unit_name=$('#ailead_unit_name').val();
                    data.ailead_topic=$('#ailead_topic').val();
                    data.ailead_topic_name=$('#ailead_topic_name').val();
                    data.ailead_parent_code=$('#ailead_parent_code').val();
                    data.sort=$('#sort').val();
                    data.notes=$('#notes').val();
                    data.is_ailead_parent_code=$('#select-is-ailead-parent-code').val();
                    data.ai_quiz_count=$('#ai_quiz_count').val();

                    data.bookindex_id=$('#bookindex_id').val();



                }
            },
            'initComplete': function() {

                $('#select-text-year').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-sub-subject-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-factory-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


                $('#select-term-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


                $('#select-course-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-ailead-edition-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-ailead-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-is-ailead-parent-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });



                $('#btn-search').on('click', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });





            },
            'drawCallback': function() {

                //跳至第Ｘ頁程式碼
                var _this = $(this);
                var tableId = _this.attr('id');
                var pageDiv = $('#' + tableId + '_paginate');
                var add_html='';
                add_html='<input id="' + tableId + '_gotoPage" type="text" placeholder="跳至頁面[請輸入頁碼] " style="height:36px;line-height:28px;width:20%; margin:0px 0px 0px 0px"/>' +
                    '<button class="paginate_button btn btn-outline-success "    type="button"  id="' + tableId + '_goto"><i class="fa fa-arrow-right" aria-hidden="true"></i></button><ul class="pagination">';
                pageDiv.append(add_html);
                $('#' + tableId + '_goto').click(function (obj) {
                    var page = $('#' + tableId + '_gotoPage').val();
                    var thisDataTable = $('#' + tableId).DataTable();
                    var pageInfo = thisDataTable.page.info();
                    if (isNaN(page)) {
                        $('#' + tableId + '_gotoPage').val('');
                        return;
                    } else {
                        var maxPage = pageInfo.pages;
                        var page = Number(page) - 1;
                        if (page < 0) {
                            page = 0;
                        } else if (page >= maxPage) {
                            page = maxPage - 1;
                        }
                        $('#' + tableId + '_gotoPage').val(page + 1);
                        thisDataTable.page(page).draw('page');
                    }
                });

                newObj.tblist.rows().every(function() {


                    this.invalidate();
                });
            },
            'columns': [
                {
                    'data': 'id',
                },
                {
                    'title':'版本對照編號',
                    'data': 'show_id',

                },
                {
                    'title': '教材年度',
                    'data': 'text_year',
                    'width': 30,
                },
                {
                    'title': '年級',
                    'data': 'grade_name',
                    'width': 30,
                },
                {
                    'title': '科目',
                    'data': 'subject_name',
                    'width': 30,
                },
                {
                    'title': '冊次',
                    'data': 'sub_subject_code_name',
                    'width': 30,
                },
                {
                    'title': '版本',
                    'data': 'factory_code_name',
                    'width': 30,
                },
                {
                    'title': '學期',
                    'data': 'term_code_name',
                    'width': 30,
                },
                {
                    'title': '課程類別',
                    'data': 'course_code_name',
                    'width': 30,
                },
                {
                    'title': '周次',
                    'data': 'weeks',
                    'width': 30,
                },
                {
                    'title': '二次段考',
                    'data': 'exam_twice',
                    'width': 30,
                },
                {
                    'title': '三次段考',
                    'data': 'exam_thrice',
                    'width': 30,
                },
                {
                    'title': '單元序號',
                    'data': 'unit',
                    'width': 30,
                },
                {
                    'title': '單元名稱',
                    'data': 'unit_name',
                    'width': 30,
                },
                {
                    'title': '主題序號',
                    'data': 'topic',
                    'width': 30,
                },
                {
                    'title': '主題名稱',
                    'data': 'topic_name',
                    'width': 30,
                },
                {
                    'title': '基底版課綱',
                    'data': 'ailead_edition_code',
                    'width': 30,
                },
                {
                    'title': '基底版年級',
                    'data': 'ailead_grade_code',
                    'width': 30,
                },
                {
                    'title': '基底版單元序號',
                    'data': 'ailead_unit',
                    'width': 30,
                },
                {
                    'title': '基底版單元名稱',
                    'data': 'ailead_unit_name',
                    'width': 30,
                },
                {
                    'title': '基底版主題序號',
                    'data': 'ailead_topic',
                    'width': 30,
                },
                {
                    'title': '基底版主題名稱',
                    'data': 'ailead_topic_name',
                    'width': 30,
                },
                {
                    'title': '基底版對應內碼',
                    'data': 'ailead_parent_code',
                    'width': 30,
                },
                {
                    'title': '排序',
                    'data': 'sort',
                    'width': 30,
                },
                {
                    'title': '備註',
                    'data': 'notes',
                    'width': 30,
                },
                {
                    'title': '是否與課程總覽有連結',
                    'data': 'is_ailead_parent_code',
                    'width': 30,
                },
                {
                    'title': '大考題數',
                    'data': 'ai_quiz_count',
                    'width': 30,
                },
                {
                    'title': '與課程總覽連結編號',
                    'data': 'link_classinfo_ids',
                    'orderable':false,
                    'width': 30,
                }
            ],
            'columnDefs': [{
                'targets': 0,
                'checkboxes': {
                    'selectRow': true
                }
            }, {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }

    function getTextYearCode(){
        $('#select-text-year').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });

        //jstree select
        $('#select-text-year-jstree').select2({
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

                //jstree select
                $('#select-grade-jstree option').remove();
                $('#select-grade-jstree').append('<option value="-1">選擇年級</option>');
                $('#select-grade-jstree').append('<option value="E0">國小</option>');
                $('#select-grade-jstree').append('<option value="J0">國中</option>');
                $('#select-grade-jstree').append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-grade-jstree').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade-jstree').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });


                $('#select-ailead-grade option').remove();
                $('#select-ailead-grade').append('<option value="-1">選擇基底版年級</option>');
                $('#select-ailead-grade').append('<optiocn value="E0">國小</optiocn>');
                $('#select-ailead-grade').append('<option value="J0">國中</option>');
                $('#select-ailead-grade').append('<option value="H0">高中</option>');
                $.each(res, function(key, item) {
                    $('#select-ailead-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-ailead-grade').select2({
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
                $('#select-subject').append('<option value="N2">理化</option>');
                $.each(res, function(key, item) {
                    $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

                //jstree select
                $('#select-subject-jstree option').remove();
                $('#select-subject-jstree').append('<option value="-1">選擇科目</option>');
                $('#select-subject-jstree').append('<option value="N2">理化</option>');
                $.each(res, function(key, item) {
                    $('#select-subject-jstree').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject-jstree').select2({
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

                $('#select-sub-subject-code-jstree option').remove();
                $('#select-sub-subject-code-jstree').append('<option value="-1">選擇冊次</option>');
                $.each(res, function(key, item) {
                    $('#select-sub-subject-code-jstree').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-sub-subject-code-jstree').select2({
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

                //jstree select
                $('#select-factory-code-jstree option').remove();
                $('#select-factory-code-jstree').append('<option value="-1">選擇版本</option>');
                $.each(res, function (key, item) {
                    $('#select-factory-code-jstree').append('<option value="' + item.code + '">' + item.name + '</option>');
                });


                $('#select-factory-code-jstree').select2({
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

                //jstree select
                $('#select-term-code-jstree option').remove();
                $('#select-term-code-jstree').append('<option value="-1">選擇學期</option>');
                $.each(res, function(key, item) {
                    $('#select-term-code-jstree').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-term-code-jstree option[value=C]').remove();
                $('#select-term-code-jstree option[value=D]').remove();

                $('#select-term-code-jstree').select2({
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

        //jstree select
        $('#select-course-code-jstree').select2({
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

    function getIsAileadParentCode(){
        $('#select-is-ailead-parent-code').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function DeleteBookindex(){
        var dataObj={}
        var bookindex_ids=[];

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        if (rows_selected.length==0){
            swal('沒有勾選任何課程總覽編號');
            return false;
        }

        $.each(rows_selected, function(index, rowId){
            bookindex_ids.push(rowId);
        });
        dataObj.bookindex_ids=bookindex_ids;

        $.ajax({
            url: '/admin/quiz/delete-bookindex',
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
                    // location.reload();
                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }


    function checkChange(){
        //let 變量 const 定量 es6寫法
        const text_year= $('#select-text-year-jstree').val();
        const grade_code=$('#select-grade-jstree').val();
        const subject_code=$('#select-subject-jstree').val();
        const factory_code=$('#select-factory-code-jstree').val();
        const term_code=$('#select-term-code-jstree').val();
        const course_code=$('#select-course-code-jstree').val();
        const sub_subject_code=$('#select-sub-subject-code-jstree').val();
        const show_str = `text_year: ${text_year}
                          grade_code: ${grade_code}
                          subject_code: ${subject_code}
                          factory_code: ${factory_code}
                          term_code: ${term_code}
                          course_code: ${course_code}
                          sub_subject_code:${sub_subject_code}`;

        if (text_year!=-1 && grade_code!=-1 && subject_code!=-1 && factory_code!=-1 && term_code!=-1 && course_code!=-1)
        {
            getRange();
        }

    }

    function getRange(){
        const text_year= $('#select-text-year-jstree').val();
        const grade_code=$('#select-grade-jstree').val();
        const subject_code=$('#select-subject-jstree').val();
        const factory_code=$('#select-factory-code-jstree').val();
        const term_code=$('#select-term-code-jstree').val();
        const course_code=$('#select-course-code-jstree').val();
        let sub_subject_code=$('#select-sub-subject-code-jstree').val();
        if(sub_subject_code==-1){
            sub_subject_code=0;
        }


        var dataObj={};
        dataObj.text_year=text_year;
        dataObj.grade_code=grade_code;
        dataObj.subject_code=subject_code;
        dataObj.factory_code=factory_code;
        dataObj.term_code=term_code;
        dataObj.course_code=course_code;
        dataObj.sub_subject_code=sub_subject_code;

        $.ajax({
            url: '/admin/quizpaper/get-bookindex-classinfo',
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
                    getJsTree(res.data);


                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }

    function getJsTree(jsonData) {
        $('#jstree_div').jstree({
            'core': {
                'data': jsonData
            },
            'types': {
                "default": {
                    "icon": "ion-android-book"
                },
                "file": {
                    "icon": false
                }
            },
            'checkbox': {
                'keep_selected_style': true
            },
            'plugins': ['wholerow', 'checkbox', 'types']
        });

        $('#jstree_div').jstree(true).settings.core.data = jsonData;
        $('#jstree_div').jstree(true).refresh();
    }



});