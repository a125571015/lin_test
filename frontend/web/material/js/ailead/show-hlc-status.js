$(function(){
    'use strict';

    var teacherObj = {};

    var studentObj={};

    var schoolclassObj={};
    init();
    function init(){
        getHlcSchool();
        teacherObj=teacherdataTable();
        studentObj=studentdataTable();
        schoolclassObj=schoolclassdataTable();

        $('#btn-tie-director-schoolclass').on('click',function(e){
            e.preventDefault();
            TieDirectorSchoolclass();



        });

        $('#btn-update-hlc-data').on('click',function(e){
            e.preventDefault();

            updatehlcdata();

        });

        $('#btn-export-teacher').on('click',function(e){
            e.preventDefault();

            location.href='/admin/openid/export-all-teacher';

        });

        $('#btn-export-student').on('click',function(e){
            e.preventDefault();

            location.href='/admin/openid/export-all-student';

        });

        $('#btn-export-schoolclass').on('click',function(e){
            e.preventDefault();

            location.href='/admin/openid/export-all-schoolclass';

        });

        $('#btn-export-course').on('click',function(e){
            e.preventDefault();
            location.href='/admin/openid/export-all-course';
        });

        $('#btn-check-teacher-status').on('click',function(e){
            e.preventDefault();

            CheckTeacherStatus();

        });


        $('#btn-check-student-status').on('click',function(e){
            e.preventDefault();

            CheckStudentStatus();

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
                'url': '/admin/openid/check-teacherlist',
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
                    'title': '學校名稱',
                    'data': 'school_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '資料內容是否異動',
                    'data': 'status',
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
                'url': '/admin/openid/check-studentlist',
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
                    'title': '花蓮縣api_學校編號',
                    'data': 'hlc_schoolcode',
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
                    'title': '資料內容是否異動',
                    'data': 'status',
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
                'url': '/admin/openid/check-schoolclasslist',
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
                    'title': '花蓮縣api_學校編號',
                    'data': 'hlc_schoolcode',
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
                    'title': '資料內容是否異動',
                    'data': 'status',
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

    //綁定老師校長帳號
    function  TieDirectorSchoolclass(){
        var dataObj = {};
        $.ajax({
            url: '/admin/openid/tie-director-schoolclass',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    swal(res.message);
                    return false;

                }else{
                    alert("成功");
                    location.reload();
                }

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function updatehlcdata(){
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        $.ajax({
            url: '/admin/openid/update-hlc-data',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    swal(res.message);
                    return false;

                }else{
                    alert("成功");
                    location.reload();
                }

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }


    function CheckStudentStatus(){
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        $.ajax({
            url: '/admin/openid/check-student-status',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    swal(res.message);
                    return false;

                }else{
                    alert("成功");
                    location.reload();
                }

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function CheckTeacherStatus(){
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        $.ajax({
            url: '/admin/openid/check-teacher-status',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    swal(res.message);
                    return false;

                }else{
                    alert("成功");
                    location.reload();
                }

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }



});