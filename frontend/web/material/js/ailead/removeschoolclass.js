$(function(){
    'use strict';
    var DataObj={};
    var newObj = {};
    init();


    function init(){

        getSchool();
        getGradeCode();
        getSubjectCode();
        getSonschool();
        //getRemoveSchoolclass();
       // getupdateuser();
        //getupdateteacher();
        //getCys();
        // getSchoolclass();
        newObj = initObj();
        // $('#select-school').on('change', function(e) {
        //     e.preventDefault();
        //
        //     getGradeCode();
        //     //getSchoolclass();
        //
        // });
        //
        // $('#select-grade').on('change', function(e) {
        //     e.preventDefault();
        //     //getSchoolclass();
        //
        // });

        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();


        });
        $('#check-schoolclass').on('click',function(e){
            e.preventDefault();
            checkchoolclass();

        });



        $('#delete-schoolclass-btn').on('click',function(e){
            e.preventDefault();

            deleteschoolclass();
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
                'url': '/admin/schoolclass/getall-list',
                'data':function(data){
                    data.school_id = $('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
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
                    getSubjectCode();
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

            },
            'columns': [
                {
                    'data': 'schoolclass_id',
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
                    'title': '年級',
                    'data': 'grade_code_name',
                    'width':10,
                    'orderable': true
                },
                {
                    'title': '科目',
                    'data': 'subject_code_name',
                    'width': 10,
                    'orderable': true

                },
                {
                    'title': '班級名稱',
                    'data': 'schoolclass_name',
                    'width': 10,
                    'orderable': true
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


    //測試日藥ＡＰＩremoveschoolclass
    // function getRemoveSchoolclass(){
    //     var dataObj={};
    //     dataObj.key='19C9D721CB3C0D17191618C08D6C785F';
    //     $.ajax({
    //                 url: '/admin/csync/get-remove-schoolclass',
    //                 type: 'post',
    //                 data: JSON.stringify(dataObj),
    //                 contentType: 'application/json',
    //                 success: function(res) {
    //
    //                 },
    //                 error: bs.errorHandler
    //             });
    //
    // }

    // function getCys(){
    //     var dataObj={};
    //     dataObj.key='533023654E64166ECBAACE6A48D090D2';
    //     console.log(JSON.stringify(dataObj));
    //     $.ajax({
    //         url: '/admin/csync/get-teacher',
    //         type: 'post',
    //         data: JSON.stringify(dataObj),
    //         contentType: 'application/json',
    //         success: function(res) {
    //
    //         },
    //         error: bs.errorHandler
    //     });
    // }
    //
    // "op": "update",
    //     "sun_school_id": "sss001-1",
    //     "sun_user_id": "sss001-teacher-1",
    //     "user_type_id": "02",
    //     "username": "teacher1234",
    //     "first_name": "測試教師",
    //     "phone": "0912345678",
    //     "email": "test@gmail.com",
    //     "note": "",
    //     "card_no": "0123456",
    //     "birthday": "2020/03/04"

    // function getupdateuser(){
    //     var dataObj={}
    //     dataObj.op= "update";
    //     dataObj.sun_school_id="sss001-1";
    //     dataObj.sun_user_id="sss001-user-5";
    //     dataObj.user_no="1070016892";
    //     dataObj.username="1234567890";
    //     dataObj.first_name="測試學生2";
    //     dataObj.grade_code="09";
    //     dataObj.seat_no="01";
    //     dataObj.note="";
    //     dataObj.card_no="01234567";
    //     dataObj.birthday="2020/03/03";
    //     dataObj.phone="0912345677";
    //     dataObj.contact_person="王天天";
    //         $.ajax({
    //             url: '/admin/csync/user',
    //             type: 'post',
    //             data: JSON.stringify(dataObj),
    //             contentType: 'application/json',
    //             success: function(res) {
    //
    //             },
    //             error: bs.errorHandler
    //         });
    // }




    // function getupdateteacher(){
    //     var dataObj={};
    //     dataObj.op='update';
    //     dataObj.sun_school_id='sss001-1';
    //     dataObj.sun_user_id='sss001-teacher-2';
    //     dataObj.user_type_id='02';
    //     dataObj.username='teacher5566';
    //     dataObj.first_name='測試教師5566';
    //     dataObj.phone='0912345678';
    //     dataObj.email='test@gmail.com';
    //     dataObj.note='';
    //     dataObj.card_no='0123456';
    //     dataObj.birthday='2020/03/07'
    //
    //     $.ajax({
    //         url: '/admin/csync/teacher',
    //         type: 'post',
    //         data: JSON.stringify(dataObj),
    //         contentType: 'application/json',
    //         success: function(res) {
    //
    //         },
    //         error: bs.errorHandler
    //     });
    //
    // }


    function getSchoolclass() {
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        dataObj.status = -1;
        $.ajax({
            url: '/admin/school/get-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {

                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                $.each(res, function(key, item) {
                    $('#select-schoolclass').append('<option value="' + item.id + '" status ="'+item.status+'" >' + item.name + '</option>');
                });
                $('#select-schoolclass').select2({
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

    function getSubjectCode() {
        var dataObj = { 'append_et':1 };
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                //升私中更動
                var check_ep='';
                check_ep=$('#select-grade').find('option:selected').val();


                $.each(res, function(key, item) {
                    if( $("#select-grade").val() != null){

                        //$('#select_id').find('option:selected').val();

                        //$('input[name="check-all"]').prop('checked').attr('id')




                        // $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        if (check_ep=='EP')

                        {


                            var check_subject=item.code;
                            var changsubjectname='升私中'+item.name;
                            var EPMOsubjectname='國小資優數學';
                            if (check_subject=='C0' ||check_subject=='E0'  ){

                                $('#select-subject').append('<option value="' + item.code + '">' + changsubjectname + '</option>');

                            }else if ( check_subject=='M0'){
                                $('#select-subject').append('<option value="' + item.code + '">' + EPMOsubjectname + '</option>');
                            }
                            else
                            {
                                $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                            }

                        }
                        else{
                            $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        }
                    }
                });

                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }
    function checkchoolclass(){
      var schoolclass= $('#select-schoolclass :selected').val();
      var schoolclass_name=$('#select-schoolclass :selected').text();
      var check_rows_selected=newObj.tblist.column(0).checkboxes.selected();
      if (check_rows_selected.length==0){
          swal("至少選擇一個班級刪除");
          return false;
      }
        $('#delete-schoolclass-modal').modal('toggle');

    }

    function deleteschoolclass(){
        var dataObj={};
       // var schoolclass= $('#select-schoolclass :selected').val();
       // var schoolclass_name=$('#select-schoolclass :selected').text();
        var grade_code=$('#select-grade :selected').val();
        var school_id=$('#select-school :selected').val();
        //dataObj.schoolclass_id=schoolclass;
        dataObj.grade_code=grade_code;
        dataObj.school_id=school_id;

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        // Iterate over all selected checkboxes
        var delete_schoolclass_ids=[];

        $.each(rows_selected, function(index, rowId){
           delete_schoolclass_ids.push(rowId);
        });

        dataObj.delete_schoolclass_ids=delete_schoolclass_ids;



        $('#delete-schoolclass-modal').modal('hide');

        //alert(schoolclass+"  "+schoolclass_name);


        $.ajax({
            url: '/admin/schoolclass/delete-schoolclass',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
           if (res.data=='success'){
               alert('成功刪除'+res.count+'個班級：'+res.schoolclass_name);
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