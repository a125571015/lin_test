$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        bs.initSelectElement('#select-school', '/admin/quizpaper/get-school', '選擇分校', '-1', '');
        $('#select-status').select2({
            theme: 'bootstrap',
            minimumResultsForSearch: Infinity
        });

        newObj = initObj();

        $('.btnCreate').on('click',function(e){
            e.preventDefault();

            if($("#serialno-count").val() < 1 || $("#serialno-period").val() < 1){
                alert('數量及天數最少為 1');
                return false;
            }

            var dataObj = {};
            dataObj.count = $('#serialno-count').val();
            dataObj.period = $('#serialno-period').val();

            $.ajax({
                url: '/admin/school/create-serialno',
                type: 'POST',
                data: dataObj,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res){
                    $('.bs-serialno-modal').modal('hide');
                    $('#serialno-count').val(1);
                    $('#serialno-period').val(1);
                    swal('已新增序號');
                    newObj.tblist.draw();
                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });
        });

    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[20], ['20']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [[8, 'desc']], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true,//等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //==========請求數據start
            'serverSide': true,
            'ajax': {
                'type': 'post',
                'url': '/admin/school/get-serialno-list',
                'data':function(data){
                    data.school_id=$('#select-school').val();
                    // data.class_id=$('#select-class').val();
                    // data.user_id=$('#select-user').val();
                    data.status=$('#select-status').val();
                    data.name=$('#txt-search').val();
                }
            },
            'initComplete': function () {

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-status').on('change',function(e){
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

            },
            'columnDefs': [
                {
                    'targets': 0,
                    'visible': false,
                },
                {
                    'targets': [3],
                    'data': function(row, type, set, meta){
                        //row[3] = school_name, row[10] = school_id
                        if (row[3] != '--') {
                            return '<a href="/admin/school/view_data?id='+ row[10] +'" target="_blank">' + row[3] + '</a>';
                        }

                        return row[3];
                    },
                },
                {
                    'targets': [4],
                    'data': function(row, type, set, meta){
                        //row[4] = class_name, row[11] = class_id
                        if (row[4] != '--') {
                            return '<a href="/admin/schoolclass/view_data?id='+ row[11] +'" target="_blank">' + row[4] + '</a>';
                        }

                        return row[4];
                    },
                },
                {
                    'targets': [5],
                    'data': function(row, type, set, meta){
                        //row[5] = student_name, row[12] = user_id
                        if (row[5] != '--') {
                            return '<a href="/admin/student/view_data?id='+ row[12] +'" target="_blank">' + row[5] + '</a>';
                        }

                        return row[5];
                    },
                },
            ],
            // 'select': {
            //     'style': 'multi'
            // },
        });

        return newObj;
    }
});
