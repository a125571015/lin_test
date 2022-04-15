$(function(){
    'use strict';

    var teacherObj = {};

    var studentObj={};

    var schoolclassObj={};

    var checkhlcdataObj={};
    init();
    function init(){
        //getHlcSchool();
        teacherObj=teacherdataTable();
        studentObj=studentdataTable();
        schoolclassObj=schoolclassdataTable();
        checkhlcdataObj=checkHlcdatadataTable();

        $('#btn-update-hlc-data').on('click',function(e){
            e.preventDefault();



        });

    }

    function teacherdataTable() {
        teacherObj.tblist = $('#tbList-teacher').DataTable({
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
                'url': '/admin/openid/check-userinfolist',
                'data':function(data){

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
                    var data = teacherObj.tblist.row(this).data();

                    //location.href =  '/admin/schoolclass/view_data?id=' + data['schoolclass_id'];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                // $('#select-school').on('change',function(e){
                //     e.preventDefault();
                //     getGradeCode();
                //     getSonschool();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-son-school').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                //
                // });
                //
                // $('#select-grade').on('change',function(e){
                //     e.preventDefault();
                //     getSubjectCode();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-subject').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#check-close').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#txt-search').on('keypress',function(e){
                //     if (e.which==13) {
                //         teacherObj.tblist.draw();
                //     }
                // });

                // $('#btn-search').on('click',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });



            },
            'drawCallback':function(){

            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '花蓮縣api_學校編號',
                    'data': 'hlc_schoolcode',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '花蓮縣api_uuid',
                    'data': 'hlc_uuid',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '學校編號',
                    'data': 'school_ids',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '學校名稱',
                    'data': 'school_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '使用者編號',
                    'data': 'user_ids',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '姓名',
                    'data': 'first_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '使用者類型',
                    'data': 'user_type',
                    'width': 20,
                    'orderable': true
                },



            ],
            'columnDefs': [ {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });

        return teacherObj;
    }

    function studentdataTable() {

        studentObj.tblist = $('#tbList-student').DataTable({
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
                'url': '/admin/openid/check-studentclasslist',
                'data':function(data){

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
                    var data = studentObj.tblist.row(this).data();

                    //location.href =  '/admin/schoolclass/view_data?id=' + data['schoolclass_id'];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                // $('#select-school').on('change',function(e){
                //     e.preventDefault();
                //     getGradeCode();
                //     getSonschool();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-son-school').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                //
                // });
                //
                // $('#select-grade').on('change',function(e){
                //     e.preventDefault();
                //     getSubjectCode();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-subject').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#check-close').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#txt-search').on('keypress',function(e){
                //     if (e.which==13) {
                //         teacherObj.tblist.draw();
                //     }
                // });

                // $('#btn-search').on('click',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });



            },
            'drawCallback':function(){

            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '學校名稱',
                    'data': 'school_name',
                    'width': 20,
                    'orderable': true
                },

                {
                    'title': '使用者編號',
                    'data': 'user_id',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '名子',
                    'data': 'frist_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '綁定班級數',
                    'data': 'detail_count',
                    'width':10,
                    'orderalbe':false
                },





            ],
            'columnDefs': [ {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });

        return studentObj;
    }

    function schoolclassdataTable() {

        schoolclassObj.tblist = $('#tbList-shoolclass').DataTable({
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
                'url': '/admin/openid/check-classinfolist',
                'data':function(data){

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
                    var data = schoolclassObj.tblist.row(this).data();

                    //location.href =  '/admin/schoolclass/view_data?id=' + data['schoolclass_id'];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                // $('#select-school').on('change',function(e){
                //     e.preventDefault();
                //     getGradeCode();
                //     getSonschool();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-son-school').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                //
                // });
                //
                // $('#select-grade').on('change',function(e){
                //     e.preventDefault();
                //     getSubjectCode();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-subject').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#check-close').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#txt-search').on('keypress',function(e){
                //     if (e.which==13) {
                //         teacherObj.tblist.draw();
                //     }
                // });

                // $('#btn-search').on('click',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });



            },
            'drawCallback':function(){

            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '警吿標頭',
                    'data': 'wrong_title',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '學校名稱',
                    'data': 'ailead_school_name',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '花蓮縣api_學校編號',
                    'data': 'hlc_schoolcode',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '花蓮縣api_班級編號',
                    'data': 'hlc_class_id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '缺少科目代碼',
                    'data': 'lose_subject',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '力宇班級代碼',
                    'data': 'ailead_class_id',
                    'width': 20,
                    'orderable': true
                },



            ],
            'columnDefs': [ {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });


        return schoolclassObj;
    }

    function checkHlcdatadataTable() {

        checkhlcdataObj.tblist = $('#tbList-checkhlcdata').DataTable({
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
                'url': '/admin/openid/check-hlcdatalist',
                'data':function(data){

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
                    var data = checkhlcdataObj.tblist.row(this).data();

                    //location.href =  '/admin/schoolclass/view_data?id=' + data['schoolclass_id'];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                // $('#select-school').on('change',function(e){
                //     e.preventDefault();
                //     getGradeCode();
                //     getSonschool();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-son-school').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                //
                // });
                //
                // $('#select-grade').on('change',function(e){
                //     e.preventDefault();
                //     getSubjectCode();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#select-subject').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#check-close').on('change',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });
                //
                // $('#txt-search').on('keypress',function(e){
                //     if (e.which==13) {
                //         teacherObj.tblist.draw();
                //     }
                // });

                // $('#btn-search').on('click',function(e){
                //     e.preventDefault();
                //     teacherObj.tblist.draw();
                // });



            },
            'drawCallback':function(){

            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '力宇學校編號',
                    'data': 'school_id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '花蓮縣api_學校編號',
                    'data': 'hlc_schoolcode',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '學校名稱',
                    'data': 'hlc_schoolname',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '中介老師總筆數',
                    'data': 'teacher_data_status',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '中介老師email為空',
                    'data': 'teacher_null_count',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '老師筆數',
                    'data': 'teacher_count',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '中介學生總筆數',
                    'data': 'student_data_status',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '中介學生email為空',
                    'data': 'student_null_count',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '學生筆數',
                    'data': 'student_count',
                    'width':10,
                    'orderalbe':false
                },

                {
                    'title': '課程資料筆數',
                    'data': 'schoolclass_data_status',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '老師資料狀態',
                    'data': 'check_teacher_str',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '學生資料狀態',
                    'data': 'check_student_str',
                    'width': 20,
                    'orderable': true
                },




            ],
            'columnDefs': [ {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });


        return checkhlcdataObj;
    }

    //搜尋總機構
    function getHlcSchool() {
        $.ajax({
            url: '/admin/school/get-hlc-school',
            type: 'post',
            success: function(res) {
                $('#select-school option').remove();
                $('#select-school').append('<option value="-1">請選擇學校名稱</option>');
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




});