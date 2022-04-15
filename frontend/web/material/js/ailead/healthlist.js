$(function() {
    'use strict';
    var newObj = {};
    newObj.id = bs.getUrlVar('id');
    init();

    function init() {
        getGradeLevel();
        getGradeCode();
        getSubjectCode();
        getFactoryCode();
        initObj();
    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [
                [10],
                ['10']
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
                [10, 'desc']
            ], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/knowhow/get-health-list',
                'type':'POST',
                'data': function(data) {
                    data.stu_grade_level = $('#select-gradelevel').val();
                    data.stu_grade_code = $('#select-grade').val();
                    data.subject_code = $('#select-subject').val();
                    data.factory_code = $('#select-factory').val();
                    data.stime = $('#date-stime').val();
                    data.etime = $('#date-etime').val();
                    data.stu_school = $('#txt-stuschool').val();
                    data.stu_info = $('#txt-stuinfo').val();
                }
            },
            'initComplete': function() {

                $('#select-gradelevel').on('change', function(e) {
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

                $('#select-factory').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                jQuery('#date-stime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker: false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });

                jQuery('#date-etime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker: false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });

                $('#txt-stuschool').on('keypress', function(e) {
                    if (e.which == 13) {
                        newObj.tblist.draw();
                    }
                });

                $('#txt-stuinfo').on('keypress', function(e) {
                    if (e.which == 13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });
            },
            'drawCallback': function() {
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    if(item[9] == '--'){
                        item[10]=item[10].split(' ').slice(0,1).join(' ');
                        item[11]='<a href="'+item[14]+'" target="_blank">開始檢測</a>';
                        item[12]='';
                        item[13]='';
                    }else{
                        item[10]=item[10].split(' ').slice(0,1).join(' ');
                        item[11]='<a href="'+item[11]+'" target="_blank">檢視報表</a>';
                        item[12]='<a href="'+item[12]+'" target="_blank">完整版報告</a>';
                        item[13]='<a href="'+item[13]+'" target="_blank">摘要版報告</a>';
                    }

                    this.invalidate();
                });
            },
            'columnDefs': [{
                'targets': [0], // column or columns numbers
                'visible': false, // set orderable for selected columns
            },{
                'targets': [11,12,13], // column or columns numbers
                'orderable': false // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getGradeLevel() {
        $('#select-gradelevel').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getGradeCode() {

        $('#select-grade').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getSubjectCode() {

        $('#select-subject').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getFactoryCode() {

        $('#select-factory').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

});
