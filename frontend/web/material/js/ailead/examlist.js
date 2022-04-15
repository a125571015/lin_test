$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        getSchool();
        getGradeCode();
        getSchoolclass();
        initObj();

        $('#select-school').on('change', function(e) {
            e.preventDefault();
            getGradeCode();
            getSchoolclass();
        });

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            getSchoolclass();
        });

        jQuery('#date-stime').datetimepicker({
            format: 'Y/m/d',
            timepicker: false
        });

        jQuery('#date-etime').datetimepicker({
            format: 'Y/m/d',
            timepicker: false
        });

        $('#btn-export').on('click',function (e){
            e.preventDefault();
            var stime = $("#date-stime").val();
            var etime = $("#date-etime").val();

            if(stime != '' && etime != ''){
                location.href='/admin/exam/export-school-examresult?&stime='+stime+'&etime='+etime;
            }else if(stime == '' && etime == ''){
                location.href='/admin/exam/export-school-examresult';
            }else{
                alert('請設定完整的使用區間或不設定');
            }

        });


    }

    function initObj() {
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
            // 'order': [[0, 'asc']], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true,//當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/banwu/get-examlist',
                'data': function(data) {
                    data.school_id = $('#select-school').val();
                    data.grade_code = $('#select-grade').val();
                    data.schoolclass_id=$('#select-schoolclass').val();
                    data.stuname = $('#txt-stuname').val();
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
                    window.open('/admin/banwu/examlistview?id='+ data[0],'_blank');

                });

                $('#select-school').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#txt-stuname').on('keypress', function(e) {
                    if (e.which == 13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-stuname-search').on('click', function(e) {
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
                    var item = this.data();
                    var tags = item[4];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function(key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item[4] = newTags;
                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            'columnDefs': [{
                'targets': [0], // column or columns numbers
                'visible': false // set orderable for selected columns
            }],
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
		dataObj.status=-1;
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
});
