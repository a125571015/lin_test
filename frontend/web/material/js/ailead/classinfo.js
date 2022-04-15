$(function() {
    'use strict';

    var newObj = {};
    init();
    function init(){
        getEditionCode();
        getGradeCode();
        getSubjectCode();
        getSubSubjectCode();
        getTermCode();
        getCourseCode();
        initObj();
        $('#btn-classinfo-change-inline-code').on('click',function (e){
            e.preventDefault();
            ChangeInlineCode();

        });

        $('#btn-classinfo-delete').on('click',function(e){
           e.preventDefault();
           DeleteClassinfo();
        });

        $('#btn-classinfo-edit').on('click',function(e){
            e.preventDefault();
            var cid='';
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0){
                swal('沒有勾選任何課程總覽編號');
                return false;
            }
            $.each(rows_selected, function(key, item){
                cid+=item+'-';
            });
            cid=cid.slice(0,-1);

            location.href = '/admin/quiz/classinfo_edit?cid=' +cid;
        });

    }



    function initObj() {

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
                'url': '/admin/quiz/get-classinfo-list',
                'data': function(data) {
                    data.grade_code = $('#select-grade').val();
                    data.subject_code = $('#select-subject').val();
                    data.sub_subject_code=$('#select-sub-subject-code').val();
                    data.edition_code=$('#select-edition-code').val();
                    data.term_code=$('#select-term-code').val();
                    data.course_code=$('#select-course-code').val();
                    data.unit=$('#unit').val();
                    data.unit_name=$('#unit_name').val();
                    data.topic=$('#topic').val();
                    data.topic_name=$('#topic_name').val();
                    data.title_name=$('#title_name').val();
                    data.video_name=$('#video_name').val();
                    data.classinfo_id=$('#classinfo_id').val();
                    data.cd_code=$('#search_cd_code_name').val();
                    data.parent_code=$('#search_parent_code_name').val();
                    data.search_knowledge_name=$('#search_knowledge_name').val();
                    data.search_sub_knowledge_name=$('#search_sub_knowledge_name').val();


                }
            },
            'initComplete': function() {

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-edition-code').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-sub-subject-code').on('change',function(e){
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
                    'title':'課程總覽編號',
                    'data': 'show_id',

                },
                {
                    'title': '課綱',
                    'data': 'edition_code',
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
                    'data': 'sub_subject_name',
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
                    'title': '載體類別',
                    'data': 'carrier_code',
                    'width': 30,
                },
                {
                    'title': '內碼第一層',
                    'data': 'cd_code',
                    'width': 30,
                },
                {
                    'title': '內碼第二層',
                    'data': 'parent_code',
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
                    'title': '觀念序號、名稱',
                    'data': 'title_name',
                    'width': 30,
                },
                {
                    'title': '串流影片檔名',
                    'data': 'video_name',
                    'width': 30,
                },
                {
                    'title': '串流影片長度',
                    'data': 'video_length',
                    'width': 30,
                },
                {
                    'title': '串流影片尺寸',
                    'data': 'video_size',
                    'width': 30,
                },
                {
                    'title': '知識點(第一層)',
                    'data': 'knowledge',
                    'width': 30,
                },
                {
                    'title': '附屬知識點',
                    'data': 'sub_knowledge',
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
                $('#select-subject').append('<option value="N2">理化</option>');
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

   //更改內碼
    function ChangeInlineCode(){
        var dataObj={}
        var classinfo_ids=[];

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        if (rows_selected.length==0){
            swal('沒有勾選任何課程總覽編號');
            return false;
        }

        $.each(rows_selected, function(index, rowId){
            classinfo_ids.push(rowId);
        });
        dataObj.classinfo_ids=classinfo_ids;
        $.ajax({
            url: '/admin/quiz/change-classinfo-inline-code',
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

   //刪除課程總覽
    function DeleteClassinfo(){
        var dataObj={}
        var classinfo_ids=[];

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        if (rows_selected.length==0){
            swal('沒有勾選任何課程總覽編號');
            return false;
        }

        $.each(rows_selected, function(index, rowId){
            classinfo_ids.push(rowId);
        });
        dataObj.classinfo_ids=classinfo_ids;

        $.ajax({
            url: '/admin/quiz/delete-classinfo',
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












});