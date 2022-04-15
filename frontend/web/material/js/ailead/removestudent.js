$(function(){
    'use strict';
    var DataObj={};
    var newObj = {};
    init();


    function init(){

        getSchool();
        getGradeCode();
        // getSubjectCode();
        getSonschool();
        //getSchoolclass();

        newObj = initObj();


        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();


        });
        $('#check-student').on('click',function(e){
            e.preventDefault();
            checkstudent();

        });



        $('#delete-student-btn').on('click',function(e){
            e.preventDefault();
            deletestudent();
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
                'url': '/admin/student/get-all-student-list',
                'data':function(data){
                    data.school_id = $('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.check_close=$('input[id=check-close]:checked').val();
                    data.name=$('#txt-search').val();
                    data.son_school_id=$('#select-son-school').val();
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

                    //location.href =  '/admin/schoolclass/view_data?id=' + data['schoolclass_id'];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    getGradeCode();
                    getSonschool();
                    newObj.tblist.draw();
                });

                $('#select-son-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();

                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();

                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#check-close').on('change',function(e){
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
                newObj.tblist.rows().every(function () {
                    var item = this.data();
                    var tags = item['grade_id'];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function (key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item['grade_id'] = newTags;

                    //var mystring = item[5];
                    //var newchar = '<br>'
                    //item[5] = mystring.split('|').join(newchar);

                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });


            },
            'columns': [
                {
                    'data': 'user_id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '總校名稱',
                    'data': 'parent_school_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '分校名稱',
                    'data': 'school_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '學號',
                    'data': 'user_no',
                    'width':10,
                    'orderable': true
                },
                {
                    'title': '姓名',
                    'data': 'first_name',
                    'width': 10,
                    'orderable': true

                },
                {
                    'title': '帳號',
                    'data': 'username',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '年級',
                    'data': 'grade_id',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '目前班級',
                    'data': 'schoolclass_info',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '家長',
                    'data': 'parent_str',
                    'width': 10,
                    'orderable': false,
                    "visible": false
                },
                {
                    'title': '狀態',
                    'data': 'status',
                    'width': 10,
                    'orderable': true
                },


            ],
            'columnDefs': [{
                'targets': 0,
                'checkboxes': {
                    'selectRow': true
                }
            }, {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }

    //搜尋總機構
    function getSchool() {
        $.ajax({
            url: '/admin/school/get-school',
            type: 'post',
            success: function(res) {
                $('#select-school option').remove();
                $('#select-school').append('<option value="-1">請選擇總校名稱</option>');
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

    //搜尋子機構
    function getSonschool(){
        var dataObj={}
        dataObj.father_school_id=$('#select-school').val();
        $.ajax({
            url: '/admin/school/get-son-school',
            type: 'post',
            data:dataObj,
            success: function(res) {
                $('#select-son-school option').remove();
                $('#select-son-school').append('<option value="-1">請選擇分校名稱</option>');
                $.each(res, function(key, item) {
                    $('#select-son-school').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-son-school').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }


    //搜尋班級
    // function getSchoolclass() {
    //     var dataObj = {};
    //     dataObj.school_id = $('#select-school').val();
    //     dataObj.grade_code = $('#select-grade').val();
    //     dataObj.status = -1;
    //     $.ajax({
    //         url: '/admin/school/get-schoolclass',
    //         type: 'post',
    //         data: dataObj,
    //         success: function(res) {
    //
    //             $('#select-schoolclass option').remove();
    //             $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
    //             $.each(res, function(key, item) {
    //                 $('#select-schoolclass').append('<option value="' + item.id + '" status ="'+item.status+'" >' + item.name + '</option>');
    //             });
    //             $('#select-schoolclass').select2({
    //                 theme: "bootstrap",
    //                 minimumResultsForSearch: Infinity
    //             });
    //         },
    //         error: bs.errorHandler
    //     });
    // }

    function getGradeCode() {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">請選擇年級</option>');
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


    function checkstudent(){

        var check_rows_selected=newObj.tblist.column(0).checkboxes.selected();
        if (check_rows_selected.length==0){
            swal("至少選擇一個學生刪除");
            return false;
        }
        $('#delete-student-modal').modal('toggle');

    }

    function deletestudent(){
        var dataObj={};
        // var schoolclass= $('#select-schoolclass :selected').val();
        // var schoolclass_name=$('#select-schoolclass :selected').text();
        var grade_code=$('#select-grade :selected').val();
        var school_id=$('#select-school :selected').val();
        //dataObj.schoolclass_id=schoolclass;
        // dataObj.grade_code=grade_code;
        // dataObj.school_id=school_id;

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        // Iterate over all selected checkboxes
        var delete_student_ids=[];

        $.each(rows_selected, function(index, rowId){
            delete_student_ids.push(rowId);
        });

        dataObj.delete_student_ids=delete_student_ids;



        $('#delete-student-modal').modal('hide');

        //alert(schoolclass+"  "+schoolclass_name);


        $.ajax({
            url: '/admin/student/delete-student',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.data=='success'){
                    alert('成功刪除'+res.count+'個學生：'+res.student_name);
                }
                location.reload();
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }

});