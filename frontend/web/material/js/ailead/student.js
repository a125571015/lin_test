$(function () {
    'use strict';
    var newObj = {};
    init();

    function init() {
        bs.initSelectElement('#select-school', '/admin/quizpaper/get-school', '選擇機構', '-1', bs.getUrlVar('school_id'));
        //bs.initSelectElement('#select-grade', '/admin/quizpaper/get-grade-code', '選擇年級', '-1', '', 'EP');
        bs.initSelectElement('#select-grade', '/admin/quizpaper/get-grade-code', '選擇年級', '-1', '', 'EP');
        bs.initSelectElement('#select-schoolclass', '/admin/quizpaper/get-schoolclass', '選擇班級', '-1', bs.getUrlVar('schoolclass_id'));
       // getE0byEP();

        newObj = initObj();

        //匯出CSV
        $('#btn-student-export').on('click', function (e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length == 0) {
                swal('尚未選取學生');
                return false;
            }

            var pid = '';
            $.each(rows_selected, function (key, item) {
                pid += item + '-';
            });
            pid = pid.slice(0, -1);

            location.href = 'schoolclassclose?type=manual&pid=' + pid;
        });

        //帳號停用
        $('#btn-student-close').on('click', function (e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length == 0) {
                swal('尚未選取學生');
                return false;
            }

            //彈跳班級視窗
            $('#modal-student-close').modal('show');
        });

        //帳號啟用
        $('#btn-student-open').on('click', function (e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length == 0) {
                swal('尚未選取學生');
                return false;
            }

            //彈跳班級視窗
            $('#modal-student-open').modal('show');
        });

        //帳號停用-儲存
        $('#btnsave-student-close').on('click', function (e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length == 0) {
                swal('尚未選取學生');
                return false;
            }

            var pid = '';
            $.each(rows_selected, function (key, item) {
                pid += item + '-';
            });
            pid = pid.slice(0, -1);


            var dataObj = {};
            dataObj.student_id = pid;
            $.ajax({
                url: '/admin/student/student-inactive',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                        //swal(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.href = r.reurl;
                    }
                },
                error: bs.errorHandler,
            });
        });

		//帳號啟用-儲存
        $('#btnsave-student-open').on('click', function (e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length == 0) {
                swal('尚未選取學生');
                return false;
            }

            var pid = '';
            $.each(rows_selected, function (key, item) {
                pid += item + '-';
            });
            pid = pid.slice(0, -1);


            var dataObj = {};
            dataObj.student_id = pid;
            $.ajax({
                url: '/admin/student/student-active',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                        //swal(r.stateinfo);
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
            'order': [[1, 'desc']], //指定默認的次序
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
                'url': '/admin/student/get-student-list',
                'data': function (data) {
                    data.school_id = $('#select-school').val();
                    data.grade_code = $('#select-grade').val();
                    data.schoolclass_id = $('#select-schoolclass').val();
                    data.check_nocourse = $('input[id=check-nocourse]:checked').val();
                    data.check_close = $('input[id=check-close]:checked').val();
                    data.name = $('#txt-search').val();
                }
            },
            'initComplete': function () {

                // console.log(data.aoData[0]._aData);
                $('#tbList tbody').on('click', 'tr', function (e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    location.href = 'view_data?id=' + data[0];

                });

                $('#select-school').on('change', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#check-nocourse').on('change', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#check-close').on('change', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#txt-search').on('keypress', function (e) {
                    if (e.which == 13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click', function (e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });


            },
            'drawCallback': function () {
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

                newObj.tblist.rows().every(function () {
                    var item = this.data();
                    var tags = item[4];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function (key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item[4] = newTags;

                    //var mystring = item[5];
                    //var newchar = '<br>'
                    //item[5] = mystring.split('|').join(newchar);

                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            fixedColumns: true,
            'columnDefs': [
                {
                    'targets': 0,
                    'width': 1,
                }, {
                    'targets': 0,
                    'checkboxes': {'selectRow': true}
                }, {
                    'targets': [0, 3, 4, 5, 6, 7], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                }
            ],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }

    // //升私中的特例,可以選國小生六年級
    // function getE0byEP(){
    //     $.ajax({
    //         url: '/admin/school/check_e0_ep',
    //         type: 'POST',
    //         cache: false,
    //         success: function (r) {
    //             if(r == '1'){
    //                 $('#select-grade').append('' +
    //                     '<option value="E1">國小一年級</option>' +
    //                     '<option value="E2">國小二年級</option>' +
    //                     '<option value="E3">國小三年級</option>' +
    //                     '<option value="E4">國小四年級</option>' +
    //                     '<option value="E5">國小五年級</option>' +
    //                     '<option value="E6">國小六年級</option>' );
    //             }
    //         },
    //         error: bs.errorHandler,
    //     });
    // }


});
