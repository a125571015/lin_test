$(function() {
    'use strict';
    var newObj={};


   init();
    function init(){

        initObj();
        getGradeCode();
        getSubjectCode();
        getAuthor();

        $('#btn-healthpaper-create').on('click',function(e){
            e.preventDefault();
            location.href='/admin/knowhow/setting?type=create';
        });

        $('#btn-delete').on('click', function(e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請選擇您要刪除的考卷');
                return false;
            }

            swal({
                title: '是否確認刪除考卷? 刪除後的考卷將無法還原,相關健檢紀錄會一併刪除。',
                text: '',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                var dataObj = {};
                var pid=[];
                $.each(rows_selected, function(key, item){
                    pid.push(item);
                });
                dataObj.pid = pid;
                $.ajax({
                    url: '/admin/knowhow/delete-healthpaper',
                    type: 'POST',
                    data: dataObj,
                    success: function(res) {
                        var message = res.message;
                        if (message != 'success') {
                            swal(message);
                            return false;
                        }
                        newObj.tblist.draw();
                        swal('成功刪除');
                    },
                    error: bs.errorHandler
                });
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });


    }



    function initObj() {

        newObj.tblist=$('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[10], ['10']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
            'bLengthChange': false,  //將顯示一頁多少條紀錄的選項關閉
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
            'order': [[1, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true,//等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'type':'POST',
            'ajax': {
                'url': '/admin/knowhow/healthpaper-list',
                'type':'POST',
                'data':function(data){
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.created_by=$('#select-author').val();
                    data.name=$('#txt-search').val();
                }
            },
            'initComplete': function () {

                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    window.open('/admin/knowhow/healthpaperview?id='+ data["id"],'_blank');
                });



                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    //升私中
                    getSubjectCode($(this).val());
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();

                    newObj.tblist.draw();
                });

                $('#select-author').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


                $('#txt-search').on('keypress',function(e){
                    if (e.which==13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


            },
            'drawCallback':function(){

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

                // $('.dt-checkboxes-cell').off('change').on('change',function(e){
                //     e.preventDefault();
                //     if ($(this).find('.dt-checkboxes').prop('checked')) {
                //
                //         if(!findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var grade_obj={};
                //             grade_obj.id=newObj.tblist.row(this).data()[0];
                //             grade_obj.grade_name=newObj.tblist.row(this).data()[2];
                //             newObj.check_grade_ary.push(grade_obj);
                //         }
                //
                //         if(!findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var subject_obj={};
                //             subject_obj.id=newObj.tblist.row(this).data()[0];
                //             subject_obj.subject_name=newObj.tblist.row(this).data()[3];
                //             newObj.check_subject_ary.push(subject_obj);
                //         }
                //
                //         if(!findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var source_obj={};
                //             source_obj.id=newObj.tblist.row(this).data()[0];
                //             source_obj.source=newObj.tblist.row(this).data()[5];
                //             newObj.check_source_ary.push(source_obj);
                //         }
                //
                //     }
                //     else {
                //         var index = findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_grade_ary.splice(index, 1);
                //         }
                //
                //         index = findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_subject_ary.splice(index, 1);
                //         }
                //
                //         index = findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_source_ary.splice(index, 1);
                //         }
                //     }
                // });
                //
                // $('.dt-checkboxes-select-all').off('change').on('change',function(e){
                //     e.preventDefault();
                //     if ($('.dt-checkboxes-select-all').find('input:checkbox').prop('checked')) {
                //         $.each(newObj.tblist.rows().data(),function(key,item){
                //
                //             if (!findIndexByKey(newObj.check_grade_ary,'id',item[0])) {
                //                 var grade_obj={};
                //                 grade_obj.id=item[0];
                //                 grade_obj.grade_name=item[2];
                //                 newObj.check_grade_ary.push(grade_obj);
                //             }
                //
                //             if (!findIndexByKey(newObj.check_subject_ary,'id',item[0])) {
                //                 var subject_obj={};
                //                 subject_obj.id=item[0];
                //                 subject_obj.subject_name=item[3];
                //                 newObj.check_subject_ary.push(subject_obj);
                //             }
                //
                //             if (!findIndexByKey(newObj.check_source_ary,'id',item[0])) {
                //                 var source_obj={};
                //                 source_obj.id=item[0];
                //                 source_obj.source=item[5];
                //                 newObj.check_source_ary.push(source_obj);
                //             }
                //
                //         });
                //     }
                //     else {
                //         $.each(newObj.tblist.rows().data(),function(key,item){
                //
                //             var index = findIndexByKey(newObj.check_grade_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_grade_ary.splice(index, 1);
                //             }
                //
                //             var index = findIndexByKey(newObj.check_subject_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_subject_ary.splice(index, 1);
                //             }
                //
                //             index = findIndexByKey(newObj.check_source_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_source_ary.splice(index, 1);
                //             }
                //         });
                //     }
                // });

                newObj.tblist.rows().every(function(){

                });
            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '出卷日期',
                    'data': 'created_at',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '年級',
                    'data': 'grade_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '科目',
                    'data': 'subject_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '出卷者',
                    'data': 'author',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '考卷名稱',
                    'data': 'papername',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '作答數',
                    'data': 'ans_count',
                    'width':10,
                    'orderable': true
                },
                {
                    'title': '使用數',
                    'data': 'use_count',
                    'width': 10,
                    'orderable': false,


                },
                {
                    'title': '公開',
                    'data': 'public_status_name',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '作答時間',
                    'data': 'exam_times',
                    'width': 10,
                    'orderable': true
                },


            ],

            'columnDefs': [
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                }
            ],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getGradeCode() {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
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

                if (bs.getUrlVar('subject')) {
                    $('#select-grade').append('<option value="E0">國小</option>');
                    $('#select-grade').append('<option value="J0">國中</option>');
                    $('#select-grade').append('<option value="H0">高中</option>');
                    $('#select-grade').val(bs.getUrlVar('subject').split('-')[0]).trigger('change');
                }


            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(grade_code) {
        var dataObj = {};
        dataObj.grade_code=grade_code;
        console.log($('#select-grade').val());
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            // data: JSON.stringify(dataObj),
            data: dataObj,
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

                if (bs.getUrlVar('subject')) {
                    $('#select-subject').val(bs.getUrlVar('subject').split('-')[1]).trigger('change');
                }
            },
            error: bs.errorHandler
        });
    }

    function getAuthor() {
        $.ajax({
            url: '/admin/quizpaper/get-author',
            type: 'post',
            success: function(res) {
                $('#select-author option').remove();
                $('#select-author').append('<option value="-1">選擇出卷者</option>');
                $.each(res, function(key, item) {
                    $('#select-author').append('<option value="' + item.id + '">' + item.first_name + '</option>');
                });
                $('#select-author').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }


});