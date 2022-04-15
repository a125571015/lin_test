$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {

        newObj = initObj();

		$('#btn-close').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一筆資料進行停用');
                return false;
            }

            var id='';
            $.each(rows_selected, function(key, item){
                id+=item+'-';
            });
            id=id.slice(0,-1);

            var dataObj = {};
            dataObj.id = id;
            $.ajax({
                url: '/admin/teacher/inactive',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        swal(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.href = r.reurl;
                    }
                },
                error: bs.errorHandler,
            });
        });
    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
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
            'order': [[3, 'desc']], //指定默認的次序
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
                'url': '/admin/teacher/list',
                'data':function(data){
                    data.check_close=$('input[id=check-close]:checked').val();
                }
            },
            'initComplete': function () {

                // console.log(data.aoData[0]._aData);
                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    location.href =  '/admin/teacher/view_data?id=' + data[0];

                });

                $('#check-close').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

            },
            'drawCallback':function(){
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    var img = item[2];
                    var status = item[5];

                    if (img != '') {
                        item[2] = '<img src="' + img +'" style="width:200px" >';
                    }

                    if (status == '0') {
                        item[5] = '暫不發布';
                    } else if (status == '1') {
                        item[5] = '立即發布';
                    }


                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            'columnDefs': [
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                },{
                    'targets': [0,2], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                }
            ],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }
});
