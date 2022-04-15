$(function() {
    'use strict';
    var newObj = {};
    init();

    var id = bs.getUrlVar('id');
    if (id == '') {
        // 新增
    } else {
        // 修改
    }

    function init() {
        newObj = initObj();

        jQuery('#date-stime').datetimepicker({
            format: 'Y/m/d',
            timepicker: false
        });

        jQuery('#date-etime').datetimepicker({
            format: 'Y/m/d',
            timepicker: false
        });

        $('#btn-export-school').on('click', function (e) {
            e.preventDefault();

            var stime = $("#date-stime").val();
            var etime = $("#date-etime").val();

            if(stime != '' && etime != ''){
                location.href='/admin/school/get-school-use-condition?stime='+stime+'&etime='+etime;
            }else if(stime == '' && etime == ''){
                location.href='/admin/school/get-school-use-condition';
            }else{
                alert('請設定完整的使用區間或不設定');
            }
        });

        $('#btn-export-schoolclass').on('click', function (e) {
            e.preventDefault();

            var stime = $("#date-stime").val();
            var etime = $("#date-etime").val();

            if(stime != '' && etime != ''){
                location.href='/admin/school/get-schoolclass-use-condition?stime='+stime+'&etime='+etime;
            }else if(stime == '' && etime == ''){
                location.href='/admin/school/get-schoolclass-use-condition';
            }else{
                alert('請設定完整的使用區間或不設定');
            }
        });

    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[50], ['50']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [[2, 'asc']], //指定默認的次序
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
                'url': '/admin/school/get-school-list',
            },
            'initComplete': function () {
                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }

                    // 連結
                    var data = newObj.tblist.row(this).data();
                    location.href =  '/admin/school/view_data?id=' + data[2];
                });
            },
            //==========請求數據end
            'aoColumns': [
                {'sTitle': '機構名稱', 'name': 'name'}, //'bSortable': false 禁止此列排序
                {'sTitle': '顯示名稱', 'name': 'viewname'},
                {'sTitle': '機構代碼', 'name': 'id'},   //, 'sClass': 'center', sWidth: '50px'
                {'sTitle': '班級數', 'name': 'schoolclass_count', 'bSortable': false},
                {'sTitle': '學生人數', 'name': 'user_total', 'bSortable': false},
            ],
        });

        return newObj;
    }
});
