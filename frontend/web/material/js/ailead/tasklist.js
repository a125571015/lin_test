$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        getSchool();
        getGradeCode();
        getSchoolclass();
        getSubjectCode();
        getTaskTag();
        initObj();

        $('#select-school').on('change', function(e) {
            e.preventDefault();
            getGradeCode();
            getSchoolclass();
        });

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            getSchoolclass();
            //升私中
            getSubjectCode();
        });

        $('#btn-over').on('click', function(e) {
            e.preventDefault();
            overTask();
        });

        $('#delete-task').on('click',function(e){
            e.preventDefault();
            deleteTask();
        });

        // 隱藏管理標籤
        $('#btn-tasktags').on('click',function(e){
            e.preventDefault();
            $('#tasktags-modal').modal('show');
            getUpdateTaskTag()


        });

        $('#btn-delete-tasktags').on('click',function(e){
            e.preventDefault();
            updateTaskTag();


        });
    }

    function initObj(){
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[10],['10']], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [[2, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true,//當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/banwu/get-task-list',
                'type':'POST',
                'data': function(data) {
                    data.school_id = $('#select-school').val();
                    data.schoolclass_id = $('#select-schoolclass').val();
                    data.grade_code = $('#select-grade').val();
                    data.subject_code = $('#select-subject').val();
                    data.tasktag_ids = $('#select-tasktags').val();
                    var taskkinds = [];
                    $.each($('input:checkbox:checked[name="chk-taskkinds"]'), function(key, item) {
                        taskkinds.push(item.value);
                    });
                    taskkinds.sort();
                    data.taskkinds = taskkinds;

                    var task_status = [];
                    $.each($('input:checkbox:checked[name="chk-status"]'), function(key, item) {
                        task_status.push(item.value);
                    });
                    task_status.sort();
                    data.task_status = task_status;
                }
            },
            'initComplete': function() {

                $('#tbList tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
					if (data["ask_kind"]=='5') {
						window.open('/admin/exam/ask-viewans?aid='+ data["id"],'_blank');
					}
					else {
						window.open('/admin/banwu/examstate?id='+ data["id"],'_blank');
					}

                });

                $('#select-school').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-tasktags').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('input:checkbox[name="chk-taskkinds"]').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('input:checkbox[name="chk-status"]').on('change',function(e){
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
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    item["start_at"]=item["start_at"].split(' ').slice(0,1).join(' ');
                    item["end_at"]=item["end_at"].split(' ').slice(0,1).join(' ');

                    var tags = item["task_tags"];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function(key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item["task_tags"]=newTags;

                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '任務類別',
                    'data': 'task_kind_name',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '開始時間',
                    'data': 'start_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '結束時間',
                    'data': 'end_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '補(考/看)開始時間',
                    'data': 'makeup_start_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '補(考/看)結束時間',
                    'data': 'makeup_end_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '機構',
                    'data': 'school_name',
                    'width':10,
                    'orderable': true
                },
                {
                    'title': '年級',
                    'data': 'grade_name',
                    'width': 10,
                    'orderable': true,
                    'visible': false,

                },
                {
                    'title': '班級',
                    'data': 'class_name',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '科目',
                    'data': 'subject_name',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '任務名稱',
                    'data': 'task_name',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '人數',
                    'data': 'user_status_count',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '任務標籤',
                    'data': 'task_tags',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '狀態',
                    'data': 'status_name',
                    'width': 10,
                    'orderable': true
                },


            ],
            'columnDefs': [
            //     {
            //     'targets': [0], // column or columns numbers
            //     'orderable': false, // set orderable for selected columns
            //     'visible':false
            // },
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                },
            //     {
            //     'targets': [9,10], // column or columns numbers
            //     'orderable': false // set orderable for selected columns
            // }
            ],
            'select': {
                'style': 'multi'
            }
        });
    }

    function getSchool() {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
                $('#select-school option').remove();
                $('#select-school').append('<option value="-1">選擇機構</option>');
                $.each(res, function(key, item) {
                    $('#select-school').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-school').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getGradeCode() {
       var dataObj={};
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');
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

    function getSchoolclass(){
        var dataObj={};
        if ($('#select-school').val()) {
            dataObj.school_id = $('#select-school').val();
        }
        if ($('#select-grade').val()) {
            dataObj.grade_code = $('#select-grade').val();
        }
        dataObj.hide_P0=1;
        $.ajax({
            url: '/admin/quizpaper/get-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">選擇班級</option>');
                $.each(res, function(key, item) {
                    $('#select-schoolclass').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-schoolclass').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode() {
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');

                //升私中更動
                var check_ep='';
                check_ep=$('#select-grade').find('option:selected').val();








                $.each(res, function(key, item) {
                    if( $("#select-grade").val() != null){

                        //$('#select_id').find('option:selected').val();

                        //$('input[name="check-all"]').prop('checked').attr('id')




                        // $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        if (check_ep=='EP')

                        {


                            var check_subject=item.code;

                            var changsubjectname='升私中'+item.name;
                            var EPMOsubjectname='國小資優數學';
                            if (check_subject=='C0' ||check_subject=='E0'  ){

                                $('#select-subject').append('<option value="' + item.code + '">' + changsubjectname + '</option>');

                            }else if ( check_subject=='M0'){
                                $('#select-subject').append('<option value="' + item.code + '">' + EPMOsubjectname + '</option>');
                            }
                            else
                            {   
                                $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                            }

                        }
                        else{
                            $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        }
                    }


                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getTaskTag() {
        $.ajax({
            url: '/admin/quizpaper/get-task-tag',
            type: 'post',
            success: function(res) {
                $('#select-tasktags option').remove();
                $.each(res, function(key, item) {
                    $('#select-tasktags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#select-tasktags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇任務標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });

            },
            error: bs.errorHandler
        });
    }

   //任務標籤管理-取得目前的標籤
    function getUpdateTaskTag() {
        $.ajax({
            url: '/admin/quizpaper/get-task-tag',
            type: 'post',
            success: function(res) {
                $('#select-update-tasktags option').remove();
                $('#select-insert-tasktags option').remove();
                $.each(res, function(key, item) {
                    $('#select-update-tasktags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#select-update-tasktags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇要刪除的任務標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });

                $('#select-insert-tasktags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '輸入要新增的任務標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });


            },
            error: bs.errorHandler
        });
    }


    function overTask(){
        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length==0) {
            swal('請至少選擇一項任務結束');
            return false;
        }

        swal({
            title: '請問您是否確認結束此任務？',
            text: '',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>No<br>取消</span>',
            confirmButtonText: '<span>Yes<br>確認</span>'
        }).then(function() {

            var dataObj={};
            var task_ids = [];
            $.each(rows_selected, function(key, item){
                task_ids.push(item);
            });
            dataObj.task_ids = task_ids;

            $.ajax({
                url: '/admin/banwu/bulk-over-task',
                type: 'post',
                data: dataObj,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {
                    bs.disableSubmits(false);
                    if (res.message!='success') {
                        swal(res.message);
                        return false;
                    }
                    newObj.tblist.draw();
                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });
    }

    function deleteTask(){
        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length==0) {
            swal('請至少選擇一項任務回收');
            return false;
        }

        swal({
            title: '請問您是否確認收回此任務？',
            text: '提醒您，任務收回之後，相關紀錄將會一併刪除',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>No<br>取消</span>',
            confirmButtonText: '<span>Yes<br>確認</span>'
        }).then(function() {

            var dataObj={};
            var task_ids = [];
            $.each(rows_selected, function(key, item){
                task_ids.push(item);
            });
            dataObj.task_ids = task_ids;

            $.ajax({
                url: '/admin/banwu/bulk-delete-task',
                type: 'post',
                data: dataObj,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {
                    bs.disableSubmits(false);
                    if (res.message!='success') {
                        swal(res.message);
                        return false;
                    }
                    newObj.tblist.draw();
                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });
    }

    function updateTaskTag(){
        var dataObj = {};
        var delete_tasktags=$('#select-update-tasktags').val();
        var insert_tasktags= $('#select-insert-tasktags').val();

        dataObj.deletetasktags = delete_tasktags;
        dataObj.insert_task_str = insert_tasktags;




        if (delete_tasktags==null && insert_tasktags==null){
            swal('請選擇要刪除的標籤,或新增新的標籤');
            return false;
        }


        $.ajax({
            url: '/admin/quizpaper/update-task-tag',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r.message != '') && (r.message !== undefined)) {
                    if (r.message=='success'){
                        swal('成功');
                        $('#tasktags-modal').modal('hide');
                        location.reload();

                    }else{
                        swal(r.message);
                        return false;
                    }

                }


            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });
    }
});
