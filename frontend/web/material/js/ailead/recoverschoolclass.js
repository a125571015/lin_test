$(function(){
    'use strict';
    var DataObj={};
    var newObj = {};
    newObj.need_check=0;
    init();

    function init(){

        getSchool();
        getGradeCode();
        getSubjectCode();
        getSonschool();
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

        $('#recover-schoolclass-btn').on('click',function(e){
            e.preventDefault();
           RecoverSchoolclass();

        });







    }
    //開始結束日期控制相關
    jQuery('#date-end-time').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

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
                'url': '/admin/schoolclass/get-recover-all-list',
                'data':function(data){
                    data.school_id = $('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.check_close=$('input[id=check-close]:checked').val();
                    data.name=$('#txt-search').val();
                    data.son_school_id=$('#select-son-school').val();
                    data.schoolclass_id=$('#schoolclass-number').val();
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
                    'title': '班級編號',
                    'data': 'schoolclass_id2',
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
                    'title': '結業人數',
                    'data': 'detail_close_count',
                    'width': 10,
                    'orderable': true
                },
                {
                    'title': '離班人數',
                    'data': 'detail_leave_count',
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
        var dataObj = { 'append_et':1 ,'append_P0':1};
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
                            if (check_subject=='C0' ||check_subject=='E0'   ){

                                $('#select-subject').append('<option value="' + item.code + '">' + changsubjectname + '</option>');

                            }else if (check_subject=='M0'){
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
            swal("至少選擇一個班級恢復");
            return false;
        }

        showRecoverModal();



    }

    function showRecoverModal(){
        var dataObj={};



        var schoolclass_ids=[];

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        $.each(rows_selected, function(index, rowId){
            schoolclass_ids.push(rowId);
        });

        dataObj.schoolclass_ids=schoolclass_ids;
        $.ajax({
            url: '/admin/schoolclass/show-rocover-modal',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    alert(res.message);
                }
                else{
                    var html="";
                    var error_html="";

                    //機構現有額度
                    var data=res.data;
                    //機構上限額度
                    var school_Max=res.school_Max;
                    //要的恢復的才顯示
                    var recover_show=res.recover_show;
                    //恢復的額度
                    var recover_count_ary=res.recover_count_ary;
                    //若機構現有額度為零
                    var zero_show=res.zero_show;

                    //檢查機構額度為零（避免多重顯示）
                    var have_show_zero={};
                    have_show_zero.E0C0=0;
                    have_show_zero.E0E0=0;
                    have_show_zero.E0M0=0;
                    have_show_zero.E0N0=0;
                    have_show_zero.E0S0=0;
                    have_show_zero.EPC0=0;
                    have_show_zero.EPE0=0;
                    have_show_zero.EPM0=0;
                    have_show_zero.EPN0=0;
                    have_show_zero.EPS0=0;
                    have_show_zero.EPE11=0;
                    have_show_zero.EPE13=0;
                    have_show_zero.EPE14=0;
                    have_show_zero.EPE12=0;
                    have_show_zero.EPE21=0;
                    have_show_zero.EPZ0=0;
                    have_show_zero.J0C0=0;
                    have_show_zero.J0E0=0;
                    have_show_zero.J0M0=0;
                    have_show_zero.J0N0=0;
                    have_show_zero.J0S0=0;
                    have_show_zero.H0C0=0;
                    have_show_zero.H0E0=0;
                    have_show_zero.H0M0=0;
                    have_show_zero.H0N1=0;
                    have_show_zero.H0N4=0;
                    have_show_zero.H0N5=0;
                    have_show_zero.H0N3=0;
                    have_show_zero.H0S2=0;
                    have_show_zero.H0S1=0;
                    have_show_zero.H0S3=0;
                    have_show_zero.ET=0;
                    have_show_zero.P0=0;

                    have_show_zero.video_E0C0=0;
                    have_show_zero.video_E0E0=0;
                    have_show_zero.video_E0M0=0;
                    have_show_zero.video_E0N0=0;
                    have_show_zero.video_E0S0=0;
                    have_show_zero.video_EPC0=0;
                    have_show_zero.video_EPE0=0;
                    have_show_zero.video_EPM0=0;
                    have_show_zero.video_EPN0=0;
                    have_show_zero.video_EPS0=0;
                    have_show_zero.video_EPE11=0;
                    have_show_zero.video_EPE13=0;
                    have_show_zero.video_EPE14=0;
                    have_show_zero.video_EPE12=0;
                    have_show_zero.video_EPE21=0;
                    have_show_zero.video_EPZ0=0;
                    have_show_zero.video_J0C0=0;
                    have_show_zero.video_J0E0=0;
                    have_show_zero.video_J0M0=0;
                    have_show_zero.video_J0N0=0;
                    have_show_zero.video_J0S0=0;
                    have_show_zero.video_H0C0=0;
                    have_show_zero.video_H0E0=0;
                    have_show_zero.video_H0M0=0;
                    have_show_zero.video_H0N1=0;
                    have_show_zero.video_H0N4=0;
                    have_show_zero.video_H0N5=0;
                    have_show_zero.video_H0N3=0;
                    have_show_zero.video_H0S2=0;
                    have_show_zero.video_H0S1=0;
                    have_show_zero.video_H0S3=0;
                    have_show_zero.video_ET=0;
                    have_show_zero.video_P0=0;







                    //若恢復額度超過機構上限的檢查時代碼
                    newObj.need_check=0;

                    html+="<h6>恢復結業只會恢復已結業之學生,離班學生等恢復後,請分校自行加入</h6>";

                    html+='<table>';
                    html+='<tr>';
                    html+='<th>年級科目</th>';
                    html+='<th>目前額度</th>';
                    html+='<th>恢復後額度</th>';
                    html+='<th>狀態</th>';
                    html+='</tr>';


                    $.each(data,function(key,item){
                        //國小
                        if ( recover_show.E0C0_recover_show==1 ){
                            if (item.role_subject=="E0C0_Count"){
                                html+='<tr>';
                                html+='<td>國小國文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0C0_Max+')</td>';
                                var E0C0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0C0_recover_count);
                                html+='<td>('+E0C0_recover_after_count+'/'+school_Max.Allow_E0C0_Max+')</td>';
                                if (E0C0_recover_after_count>parseInt(school_Max.Allow_E0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0C0_zero_show==0 && have_show_zero.E0C0==0){
                                html+='<tr>';
                                html+='<td>國小國文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0C0_Max+')</td>';
                                var E0C0_recover_after_count=0+parseInt(recover_count_ary.E0C0_recover_count);
                                html+='<td>('+E0C0_recover_after_count+'/'+school_Max.Allow_E0C0_Max+')</td>';
                                if (E0C0_recover_after_count>parseInt(school_Max.Allow_E0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.E0C0=1;
                            }
                            if (item.role_subject=="E0C0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國小國文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0C0_CourseVideo_Max+')</td>';
                                var E0C0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0C0_video_recover_count);
                                html+='<td>('+E0C0_video_recover_after_count+'/'+school_Max.Allow_E0C0_CourseVideo_Max+')</td>';
                                if (E0C0_video_recover_after_count>parseInt(school_Max.Allow_E0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0C0_video_zero_show==0 && have_show_zero.video_E0C0==0){
                                html+='<tr>';
                                html+='<td>國小國文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0C0_CourseVideo_Max+')</td>';
                                var E0C0_video_recover_after_count=0+parseInt(recover_count_ary.E0C0_video_recover_count);
                                html+='<td>('+E0C0_video_recover_after_count+'/'+school_Max.Allow_E0C0_CourseVideo_Max+')</td>';
                                if (E0C0_video_recover_after_count>parseInt(school_Max.Allow_E0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_E0C0=1;
                            }


                        }


                        if ( recover_show.E0E0_recover_show==1 ){
                            if (item.role_subject=="E0E0_Count"){
                                html+='<tr>';
                                html+='<td>國小英文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0E0_Max+')</td>';
                                var E0E0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0E0_recover_count);
                                html+='<td>('+E0E0_recover_after_count+'/'+school_Max.Allow_E0E0_Max+')</td>';
                                if (E0E0_recover_after_count>parseInt(school_Max.Allow_E0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0E0_zero_show==0 && have_show_zero.E0E0==0){
                                html+='<tr>';
                                html+='<td>國小英文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0E0_Max+')</td>';
                                var E0E0_recover_after_count=0+parseInt(recover_count_ary.E0E0_recover_count);
                                html+='<td>('+E0E0_recover_after_count+'/'+school_Max.Allow_E0E0_Max+')</td>';
                                if (E0E0_recover_after_count>parseInt(school_Max.Allow_E0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.E0E0=1;
                            }

                            if (item.role_subject=="E0E0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國小英文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0E0_CourseVideo_Max+')</td>';
                                var E0E0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0E0_video_recover_count);
                                html+='<td>('+E0E0_video_recover_after_count+'/'+school_Max.Allow_E0E0_CourseVideo_Max+')</td>';
                                if (E0E0_video_recover_after_count>parseInt(school_Max.Allow_E0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0E0_video_zero_show==0 && have_show_zero.video_E0E0==0 ){
                                html+='<tr>';
                                html+='<td>國小英文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0E0_CourseVideo_Max+')</td>';
                                var E0E0_video_recover_after_count=0+parseInt(recover_count_ary.E0E0_video_recover_count);
                                html+='<td>('+E0E0_video_recover_after_count+'/'+school_Max.Allow_E0E0_CourseVideo_Max+')</td>';
                                if (E0E0_video_recover_after_count>parseInt(school_Max.Allow_E0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_E0E0=1;
                            }


                        }


                        if ( recover_show.E0M0_recover_show==1){
                            if (item.role_subject=="E0M0_Count"){
                                html+='<tr>';
                                html+='<td>國小數學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0M0_Max+')</td>';
                                var E0M0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0M0_recover_count);
                                html+='<td>('+E0M0_recover_after_count+'/'+school_Max.Allow_E0M0_Max+')</td>';
                                if (E0M0_recover_after_count>parseInt(school_Max.Allow_E0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0M0_zero_show==0 && have_show_zero.E0M0==0){
                                html+='<tr>';
                                html+='<td>國小數學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0M0_Max+')</td>';
                                var E0M0_recover_after_count=0+parseInt(recover_count_ary.E0M0_recover_count);
                                html+='<td>('+E0M0_recover_after_count+'/'+school_Max.Allow_E0M0_Max+')</td>';
                                if (E0M0_recover_after_count>parseInt(school_Max.Allow_E0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.E0M0=1;
                            }

                            if (item.role_subject=="E0M0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國小數學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0M0_CourseVideo_Max+')</td>';
                                var E0M0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0M0_video_recover_count);
                                html+='<td>('+E0M0_video_recover_after_count+'/'+school_Max.Allow_E0M0_CourseVideo_Max+')</td>';
                                if (E0M0_video_recover_after_count>parseInt(school_Max.Allow_E0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0M0_video_zero_show==0 && have_show_zero.video_E0M0==0){
                                html+='<tr>';
                                html+='<td>國小數學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0M0_CourseVideo_Max+')</td>';
                                var E0M0_video_recover_after_count=0+parseInt(recover_count_ary.E0M0_video_recover_count);
                                html+='<td>('+E0M0_video_recover_after_count+'/'+school_Max.Allow_E0M0_CourseVideo_Max+')</td>';
                                if (E0M0_video_recover_after_count>parseInt(school_Max.Allow_E0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_E0M0=1;
                            }


                        }

                        if ( recover_show.E0N0_recover_show==1){
                            if (item.role_subject=="E0N0_Count"){
                                html+='<tr>';
                                html+='<td>國小自然：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0N0_Max+')</td>';
                                var E0N0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0N0_recover_count);
                                html+='<td>('+E0N0_recover_after_count+'/'+school_Max.Allow_E0N0_Max+')</td>';
                                if (E0N0_recover_after_count>parseInt(school_Max.Allow_E0N0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0N0_zero_show==0 && have_show_zero.E0N0==0){
                                html+='<tr>';
                                html+='<td>國小自然：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0N0_Max+')</td>';
                                var E0N0_recover_after_count=0+parseInt(recover_count_ary.E0N0_recover_count);
                                html+='<td>('+E0N0_recover_after_count+'/'+school_Max.Allow_E0N0_Max+')</td>';
                                if (E0N0_recover_after_count>parseInt(school_Max.Allow_E0N0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.E0N0=1;
                            }

                            if (item.role_subject=="E0N0_CourseVideo_Count" ){
                                html+='<tr>';
                                html+='<td>國小自然教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0N0_CourseVideo_Max+')</td>';
                                var E0N0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0N0_video_recover_count);
                                html+='<td>('+E0N0_video_recover_after_count+'/'+school_Max.Allow_E0N0_CourseVideo_Max+')</td>';
                                if (E0N0_video_recover_after_count>parseInt(school_Max.Allow_E0N0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0N0_video_zero_show==0 && have_show_zero.video_E0N0==0){
                                html+='<tr>';
                                html+='<td>國小自然教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0N0_CourseVideo_Max+')</td>';
                                var E0N0_video_recover_after_count=0+parseInt(recover_count_ary.E0N0_video_recover_count);
                                html+='<td>('+E0N0_video_recover_after_count+'/'+school_Max.Allow_E0N0_CourseVideo_Max+')</td>';
                                if (E0N0_video_recover_after_count>parseInt(school_Max.Allow_E0N0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_E0N0=1;
                            }


                        }


                        if ( recover_show.E0S0_recover_show==1){
                            if (item.role_subject=="E0S0_Count" ){
                                html+='<tr>';
                                html+='<td>國小社會：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0S0_Max+')</td>';
                                var E0S0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0S0_recover_count);
                                html+='<td>('+E0S0_recover_after_count+'/'+school_Max.Allow_E0S0_Max+')</td>';
                                if (E0S0_recover_after_count>parseInt(school_Max.Allow_E0S0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0S0_zero_show==0 && have_show_zero.E0S0==0){
                                html+='<tr>';
                                html+='<td>國小社會：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0S0_Max+')</td>';
                                var E0S0_recover_after_count=0+parseInt(recover_count_ary.E0S0_recover_count);
                                html+='<td>('+E0S0_recover_after_count+'/'+school_Max.Allow_E0S0_Max+')</td>';
                                if (E0S0_recover_after_count>parseInt(school_Max.Allow_E0S0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.E0S0=1;
                            }

                            if (item.role_subject=="E0S0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國小社會教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_E0S0_CourseVideo_Max+')</td>';
                                var E0S0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.E0S0_video_recover_count);
                                html+='<td>('+E0S0_video_recover_after_count+'/'+school_Max.Allow_E0S0_CourseVideo_Max+')</td>';
                                if (E0S0_video_recover_after_count>parseInt(school_Max.Allow_E0S0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.E0S0_video_zero_show==0 && have_show_zero.video_E0S0==0){
                                html+='<tr>';
                                html+='<td>國小社會教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_E0S0_CourseVideo_Max+')</td>';
                                var E0S0_video_recover_after_count=0+parseInt(recover_count_ary.E0S0_video_recover_count);
                                html+='<td>('+E0S0_video_recover_after_count+'/'+school_Max.Allow_E0S0_CourseVideo_Max+')</td>';
                                if (E0S0_video_recover_after_count>parseInt(school_Max.Allow_E0S0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_E0S0=1;
                            }

                        }


                        //主題式課程
                        if ( recover_show.EPC0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPC0_over_time==1){
                                error_html+="升私中國文不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPC0_Count"){
                                html+='<tr>';
                                html+='<td>升私中國文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPC0_Max+')</td>';
                                var EPC0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPC0_recover_count);
                                html+='<td>('+EPC0_recover_after_count+'/'+school_Max.Allow_EPC0_Max+')</td>';
                                if (EPC0_recover_after_count>parseInt(school_Max.Allow_EPC0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPC0_zero_show==0 && have_show_zero.EPC0==0 ){
                                html+='<tr>';
                                html+='<td>升私中國文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPC0_Max+')</td>';
                                var EPC0_recover_after_count=0+parseInt(recover_count_ary.EPC0_recover_count);
                                html+='<td>('+EPC0_recover_after_count+'/'+school_Max.Allow_EPC0_Max+')</td>';
                                if (EPC0_recover_after_count>parseInt(school_Max.Allow_EPC0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPC0=1;
                            }

                            if (item.role_subject=="EPC0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>升私中國文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPC0_CourseVideo_Max+')</td>';
                                var EPC0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPC0_video_recover_count);
                                html+='<td>('+EPC0_video_recover_after_count+'/'+school_Max.Allow_EPC0_CourseVideo_Max+')</td>';
                                if (EPC0_video_recover_after_count>parseInt(school_Max.Allow_EPC0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPC0_video_zero_show==0 && have_show_zero.video_EPC0==0){
                                html+='<tr>';
                                html+='<td>升私中國文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPC0_CourseVideo_Max+')</td>';
                                var EPC0_video_recover_after_count=0+parseInt(recover_count_ary.EPC0_video_recover_count);
                                html+='<td>('+EPC0_video_recover_after_count+'/'+school_Max.Allow_EPC0_CourseVideo_Max+')</td>';
                                if (EPC0_video_recover_after_count>parseInt(school_Max.Allow_EPC0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPC0=1;
                            }

                        }


                        if ( recover_show.EPE0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE0_over_time==1){
                                error_html+="升私中英文不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPE0_Count"){
                                html+='<tr>';
                                html+='<td>升私中英文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE0_Max+')</td>';
                                var EPE0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE0_recover_count);
                                html+='<td>('+EPE0_recover_after_count+'/'+school_Max.Allow_EPE0_Max+')</td>';
                                if (EPE0_recover_after_count>parseInt(school_Max.Allow_EPE0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE0_zero_show==0 && have_show_zero.EPE0==0 ){
                                html+='<tr>';
                                html+='<td>升私中英文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE0_Max+')</td>';
                                var EPE0_recover_after_count=0+parseInt(recover_count_ary.EPE0_recover_count);
                                html+='<td>('+EPE0_recover_after_count+'/'+school_Max.Allow_EPE0_Max+')</td>';
                                if (EPE0_recover_after_count>parseInt(school_Max.Allow_EPE0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE0=1;
                            }

                            if (item.role_subject=="EPE0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>升私中英文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE0_CourseVideo_Max+')</td>';
                                var EPE0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE0_video_recover_count);
                                html+='<td>('+EPE0_video_recover_after_count+'/'+school_Max.Allow_EPE0_CourseVideo_Max+')</td>';
                                if (EPE0_video_recover_after_count>parseInt(school_Max.Allow_EPE0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE0_video_zero_show==0 && have_show_zero.video_EPE0==0){
                                html+='<tr>';
                                html+='<td>升私中英文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE0_CourseVideo_Max+')</td>';
                                var EPE0_video_recover_after_count=0+parseInt(recover_count_ary.EPE0_video_recover_count);
                                html+='<td>('+EPE0_video_recover_after_count+'/'+school_Max.Allow_EPE0_CourseVideo_Max+')</td>';
                                if (EPE0_video_recover_after_count>parseInt(school_Max.Allow_EPE0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE0=1;
                            }


                        }


                        if (  recover_show.EPM0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPM0_over_time==1){
                                error_html+="國小資優數學不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPM0_Count"){
                                html+='<tr>';
                                html+='<td>國小資優數學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPM0_Max+')</td>';
                                var EPM0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPM0_recover_count);
                                html+='<td>('+EPM0_recover_after_count+'/'+school_Max.Allow_EPM0_Max+')</td>';
                                if (EPM0_recover_after_count>parseInt(school_Max.Allow_EPM0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPM0_zero_show==0 && have_show_zero.EPM0==0){
                                html+='<tr>';
                                html+='<td>國小資優數學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPM0_Max+')</td>';
                                var EPM0_recover_after_count=0+parseInt(recover_count_ary.EPM0_recover_count);
                                html+='<td>('+EPM0_recover_after_count+'/'+school_Max.Allow_EPM0_Max+')</td>';
                                if (EPM0_recover_after_count>parseInt(school_Max.Allow_EPM0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPM0=1;
                            }

                            if (item.role_subject=="EPM0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國小資優數學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPM0_CourseVideo_Max+')</td>';
                                var EPM0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPM0_video_recover_count);
                                html+='<td>('+EPM0_video_recover_after_count+'/'+school_Max.Allow_EPM0_CourseVideo_Max+')</td>';
                                if (EPM0_video_recover_after_count>parseInt(school_Max.Allow_EPM0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPM0_video_zero_show==0 && have_show_zero.video_EPM0==0){
                                html+='<tr>';
                                html+='<td>國小資優數學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPM0_CourseVideo_Max+')</td>';
                                var EPM0_video_recover_after_count=0+parseInt(recover_count_ary.EPM0_video_recover_count);
                                html+='<td>('+EPM0_video_recover_after_count+'/'+school_Max.Allow_EPM0_CourseVideo_Max+')</td>';
                                if (EPM0_video_recover_after_count>parseInt(school_Max.Allow_EPM0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPM0=1;
                            }


                        }


                        if ( recover_show.EPN0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPN0_over_time==1){
                                error_html+="升私中自然不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPN0_Count") {
                                html+='<tr>';
                                html+='<td>升私中自然：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPN0_Max+')</td>';
                                var EPN0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPN0_recover_count);
                                html+='<td>('+EPN0_recover_after_count+'/'+school_Max.Allow_EPN0_Max+')</td>';
                                if (EPN0_recover_after_count>parseInt(school_Max.Allow_EPN0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPN0_zero_show==0 && have_show_zero.EPN0==0){
                                html+='<tr>';
                                html+='<td>升私中自然：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPN0_Max+')</td>';
                                var EPN0_recover_after_count=0+parseInt(recover_count_ary.EPN0_recover_count);
                                html+='<td>('+EPN0_recover_after_count+'/'+school_Max.Allow_EPN0_Max+')</td>';
                                if (EPN0_recover_after_count>parseInt(school_Max.Allow_EPN0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPN0=1;

                            }

                            if (item.role_subject=="EPN0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>升私中自然教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPN0_CourseVideo_Max+')</td>';
                                var EPN0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPN0_video_recover_count);
                                html+='<td>('+EPN0_video_recover_after_count+'/'+school_Max.Allow_EPN0_CourseVideo_Max+')</td>';
                                if (EPN0_video_recover_after_count>parseInt(school_Max.Allow_EPN0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPN0_video_zero_show==0 && have_show_zero.video_EPN0==0){
                                html+='<tr>';
                                html+='<td>升私中自然教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPN0_CourseVideo_Max+')</td>';
                                var EPN0_video_recover_after_count=0+parseInt(recover_count_ary.EPN0_video_recover_count);
                                html+='<td>('+EPN0_video_recover_after_count+'/'+school_Max.Allow_EPN0_CourseVideo_Max+')</td>';
                                if (EPN0_video_recover_after_count>parseInt(school_Max.Allow_EPN0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPN0=1;
                            }

                        }


                        if ( recover_show.EPS0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPS0_over_time==1){
                                error_html+="升私中社會不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPS0_Count"){
                                html+='<tr>';
                                html+='<td>升私中社會：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPS0_Max+')</td>';
                                var EPS0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPS0_recover_count);
                                html+='<td>('+EPS0_recover_after_count+'/'+school_Max.Allow_EPS0_Max+')</td>';
                                if (EPS0_recover_after_count>parseInt(school_Max.Allow_EPS0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPS0_zero_show==0 && have_show_zero.EPS0==0){
                                html+='<tr>';
                                html+='<td>升私中社會：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPS0_Max+')</td>';
                                var EPS0_recover_after_count=0+parseInt(recover_count_ary.EPS0_recover_count);
                                html+='<td>('+EPS0_recover_after_count+'/'+school_Max.Allow_EPS0_Max+')</td>';
                                if (EPS0_recover_after_count>parseInt(school_Max.Allow_EPS0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPS0=1;
                            }

                            if (item.role_subject=="EPS0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>升私中社會教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPS0_CourseVideo_Max+')</td>';
                                var EPS0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPS0_video_recover_count);
                                html+='<td>('+EPS0_video_recover_after_count+'/'+school_Max.Allow_EPS0_CourseVideo_Max+')</td>';
                                if (EPS0_video_recover_after_count>parseInt(school_Max.Allow_EPS0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPS0_video_zero_show==0 && have_show_zero.video_EPS0==0){
                                html+='<tr>';
                                html+='<td>升私中社會教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPS0_CourseVideo_Max+')</td>';
                                var EPS0_video_recover_after_count=0+parseInt(recover_count_ary.EPS0_video_recover_count);
                                html+='<td>('+EPS0_video_recover_after_count+'/'+school_Max.Allow_EPS0_CourseVideo_Max+')</td>';
                                if (EPS0_video_recover_after_count>parseInt(school_Max.Allow_EPS0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPS0=1;
                            }


                        }


                        if (  recover_show.EPE11_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE11_over_time==1){
                                error_html+="英語常用單字2000不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPE11_Count"){
                                html+='<tr>';
                                html+='<td>英語常用單字2000：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE11_Max+')</td>';
                                var EPE11_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE11_recover_count);
                                html+='<td>('+EPE11_recover_after_count+'/'+school_Max.Allow_EPE11_Max+')</td>';
                                if (EPE11_recover_after_count>parseInt(school_Max.Allow_EPE11_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE11_zero_show==0 && have_show_zero.EPE11==0){
                                html+='<tr>';
                                html+='<td>英語常用單字2000：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE11_Max+')</td>';
                                var EPE11_recover_after_count=0+parseInt(recover_count_ary.EPE11_recover_count);
                                html+='<td>('+EPE11_recover_after_count+'/'+school_Max.Allow_EPE11_Max+')</td>';
                                if (EPE11_recover_after_count>parseInt(school_Max.Allow_EPE11_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE11=1;
                            }

                            if (item.role_subject=="EPE11_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>英語常用單字2000教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE11_CourseVideo_Max+')</td>';
                                var EPE11_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE11_video_recover_count);
                                html+='<td>('+EPE11_video_recover_after_count+'/'+school_Max.Allow_EPE11_CourseVideo_Max+')</td>';
                                if (EPE11_video_recover_after_count>parseInt(school_Max.Allow_EPE11_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE11_video_zero_show==0 && have_show_zero.video_EPE11==0){
                                html+='<tr>';
                                html+='<td>英語常用單字2000教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE11_CourseVideo_Max+')</td>';
                                var EPE11_video_recover_after_count=0+parseInt(recover_count_ary.EPE11_video_recover_count);
                                html+='<td>('+EPE11_video_recover_after_count+'/'+school_Max.Allow_EPE11_CourseVideo_Max+')</td>';
                                if (EPE11_video_recover_after_count>parseInt(school_Max.Allow_EPE11_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE11=1;
                            }

                        }




                        if (  recover_show.EPE13_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE13_over_time==1){
                                error_html+="英語高頻單字2001~4500不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPE13_Count"){
                                html+='<tr>';
                                html+='<td>英語高頻單字2001~4500：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE13_Max+')</td>';
                                var EPE13_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE13_recover_count);
                                html+='<td>('+EPE13_recover_after_count+'/'+school_Max.Allow_EPE13_Max+')</td>';
                                if (EPE13_recover_after_count>parseInt(school_Max.Allow_EPE13_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE13_zero_show==0 && have_show_zero.EPE13==0){
                                html+='<tr>';
                                html+='<td>英語高頻單字2001~4500：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE13_Max+')</td>';
                                var EPE13_recover_after_count=0+parseInt(recover_count_ary.EPE13_recover_count);
                                html+='<td>('+EPE13_recover_after_count+'/'+school_Max.Allow_EPE13_Max+')</td>';
                                if (EPE13_recover_after_count>parseInt(school_Max.Allow_EPE13_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE13=1;
                            }

                            if (item.role_subject=="EPE13_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>英語高頻單字2001~4500教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE13_CourseVideo_Max+')</td>';
                                var EPE13_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE13_video_recover_count);
                                html+='<td>('+EPE13_video_recover_after_count+'/'+school_Max.Allow_EPE13_CourseVideo_Max+')</td>';
                                if (EPE13_video_recover_after_count>parseInt(school_Max.Allow_EPE13_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE13_video_zero_show==0 && have_show_zero.video_EPE13==0){
                                html+='<tr>';
                                html+='<td>英語高頻單字2001~4500教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE13_CourseVideo_Max+')</td>';
                                var EPE13_video_recover_after_count=0+parseInt(recover_count_ary.EPE13_video_recover_count);
                                html+='<td>('+EPE13_video_recover_after_count+'/'+school_Max.Allow_EPE13_CourseVideo_Max+')</td>';
                                if (EPE13_video_recover_after_count>parseInt(school_Max.Allow_EPE13_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE13=1;
                            }

                        }


                        if (  recover_show.EPE14_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE14_over_time==1){
                                error_html+="英語終極單字4501~7000不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPE14_Count"){
                                html+='<tr>';
                                html+='<td>英語終極單字4501~7000：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE14_Max+')</td>';
                                var EPE14_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE14_recover_count);
                                html+='<td>('+EPE14_recover_after_count+'/'+school_Max.Allow_EPE14_Max+')</td>';
                                if (EPE14_recover_after_count>parseInt(school_Max.Allow_EPE14_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE14_zero_show==0 && have_show_zero.EPE14==0){
                                html+='<tr>';
                                html+='<td>英語終極單字4501~7000：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE14_Max+')</td>';
                                var EPE14_recover_after_count=0+parseInt(recover_count_ary.EPE14_recover_count);
                                html+='<td>('+EPE14_recover_after_count+'/'+school_Max.Allow_EPE14_Max+')</td>';
                                if (EPE14_recover_after_count>parseInt(school_Max.Allow_EPE14_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE14=1;
                            }

                            if (item.role_subject=="EPE14_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>英語終極單字4501~7000教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE14_CourseVideo_Max+')</td>';
                                var EPE14_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE14_video_recover_count);
                                html+='<td>('+EPE14_video_recover_after_count+'/'+school_Max.Allow_EPE14_CourseVideo_Max+')</td>';
                                if (EPE14_video_recover_after_count>parseInt(school_Max.Allow_EPE14_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE14_video_zero_show==0 && have_show_zero.video_EPE14==0){
                                html+='<tr>';
                                html+='<td>英語終極單字4501~7000教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE14_CourseVideo_Max+')</td>';
                                var EPE14_video_recover_after_count=0+parseInt(recover_count_ary.EPE14_video_recover_count);
                                html+='<td>('+EPE14_video_recover_after_count+'/'+school_Max.Allow_EPE14_CourseVideo_Max+')</td>';
                                if (EPE14_video_recover_after_count>parseInt(school_Max.Allow_EPE14_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE14=1;
                            }

                        }





                        if ( recover_show.EPE12_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE12_over_time==1){
                                error_html+="英單字根字首拼圖法不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }if (item.role_subject=="EPE12_Count"){
                                html+='<tr>';
                                html+='<td>英單字根字首拼圖法：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE12_Max+')</td>';
                                var EPE12_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE12_recover_count);
                                html+='<td>('+EPE12_recover_after_count+'/'+school_Max.Allow_EPE12_Max+')</td>';
                                if (EPE12_recover_after_count>parseInt(school_Max.Allow_EPE12_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE12_zero_show==0  && have_show_zero.EPE12==0){
                                html+='<tr>';
                                html+='<td>英單字根字首拼圖法：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE12_Max+')</td>';
                                var EPE12_recover_after_count=0+parseInt(recover_count_ary.EPE12_recover_count);
                                html+='<td>('+EPE12_recover_after_count+'/'+school_Max.Allow_EPE12_Max+')</td>';
                                if (EPE12_recover_after_count>parseInt(school_Max.Allow_EPE12_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE12=1;
                            }

                            if (item.role_subject=="EPE12_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>英單字根字首拼圖法教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE12_CourseVideo_Max+')</td>';
                                var EPE12_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE12_video_recover_count);
                                html+='<td>('+EPE12_video_recover_after_count+'/'+school_Max.Allow_EPE12_CourseVideo_Max+')</td>';
                                if (EPE12_video_recover_after_count>parseInt(school_Max.Allow_EPE12_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE12_video_zero_show==0 && have_show_zero.video_EPE12==0){
                                html+='<tr>';
                                html+='<td>英單字根字首拼圖法教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE12_CourseVideo_Max+')</td>';
                                var EPE12_video_recover_after_count=0+parseInt(recover_count_ary.EPE12_video_recover_count);
                                html+='<td>('+EPE12_video_recover_after_count+'/'+school_Max.Allow_EPE12_CourseVideo_Max+')</td>';
                                if (EPE12_video_recover_after_count>parseInt(school_Max.Allow_EPE12_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE12=0;
                            }


                        }



                        if ( recover_show.EPE21_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPE21_over_time==1){
                                error_html+="全民英檢GEPT初級不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }
                            if (item.role_subject=="EPE21_Count"){
                                html+='<tr>';
                                html+='<td>全民英檢GEPT初級：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE21_Max+')</td>';
                                var EPE21_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE21_recover_count);
                                html+='<td>('+EPE21_recover_after_count+'/'+school_Max.Allow_EPE21_Max+')</td>';
                                if (EPE21_recover_after_count>parseInt(school_Max.Allow_EPE21_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';

                            }else if (zero_show.EPE21_zero_show==0 && have_show_zero.EPE21==0){
                                html+='<tr>';
                                html+='<td>全民英檢GEPT初級：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE21_Max+')</td>';
                                var EPE21_recover_after_count=0+parseInt(recover_count_ary.EPE21_recover_count);
                                html+='<td>('+EPE21_recover_after_count+'/'+school_Max.Allow_EPE21_Max+')</td>';
                                if (EPE21_recover_after_count>parseInt(school_Max.Allow_EPE21_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPE21=1;
                            }

                            if (item.role_subject=="EPE21_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>全民英檢GEPT初級教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPE21_CourseVideo_Max+')</td>';
                                var EPE21_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPE21_video_recover_count);
                                html+='<td>('+EPE21_video_recover_after_count+'/'+school_Max.Allow_EPE21_CourseVideo_Max+')</td>';
                                if (EPE21_video_recover_after_count>parseInt(school_Max.Allow_EPE21_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPE21_video_zero_show==0 &&  have_show_zero.video_EPE21==0){
                                html+='<tr>';
                                html+='<td>全民英檢GEPT初級教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPE21_CourseVideo_Max+')</td>';
                                var EPE21_video_recover_after_count=0+parseInt(recover_count_ary.EPE21_video_recover_count);
                                html+='<td>('+EPE21_video_recover_after_count+'/'+school_Max.Allow_EPE21_CourseVideo_Max+')</td>';
                                if (EPE21_video_recover_after_count>parseInt(school_Max.Allow_EPE21_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPE21=1;
                            }

                        }



                        if ( recover_show.EPZ0_recover_show==1){
                            //檢查主題課程日期有沒有超過 有=1 沒有=0
                            if (school_Max.check_EPZ0_over_time==1){
                                error_html+="紫微斗數輕鬆學不在使用期限內請先調整使用期限";
                                error_html+="<br>";
                            }if (item.role_subject=="EPZ0_Count"){
                                html+='<tr>';
                                html+='<td>紫微斗數輕鬆學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPZ0_Max+')</td>';
                                var EPZ0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPZ0_recover_count);
                                html+='<td>('+EPZ0_recover_after_count+'/'+school_Max.Allow_EPZ0_Max+')</td>';
                                if (EPZ0_recover_after_count>parseInt(school_Max.Allow_EPZ0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.EPZ0_zero_show==0 && have_show_zero.EPZ0==0){
                                html+='<tr>';
                                html+='<td>紫微斗數輕鬆學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPZ0_Max+')</td>';
                                var EPZ0_recover_after_count=0+parseInt(recover_count_ary.EPZ0_recover_count);
                                html+='<td>('+EPZ0_recover_after_count+'/'+school_Max.Allow_EPZ0_Max+')</td>';
                                if (EPZ0_recover_after_count>parseInt(school_Max.Allow_EPZ0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.EPZ0=1;
                            }

                            if (item.role_subject=="EPZ0_CourseVideo_Count" ){
                                html+='<tr>';
                                html+='<td>紫微斗數輕鬆學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_EPZ0_CourseVideo_Max+')</td>';
                                var EPZ0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.EPZ0_video_recover_count);
                                html+='<td>('+EPZ0_video_recover_after_count+'/'+school_Max.Allow_EPZ0_CourseVideo_Max+')</td>';
                                if (EPZ0_video_recover_after_count>parseInt(school_Max.Allow_EPZ0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';

                            }else if (zero_show.EPZ0_video_zero_show==0 && have_show_zero.video_EPZ0==0){
                                html+='<tr>';
                                html+='<td>紫微斗數輕鬆學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_EPZ0_CourseVideo_Max+')</td>';
                                var EPZ0_video_recover_after_count=0+parseInt(recover_count_ary.EPZ0_video_recover_count);
                                html+='<td>('+EPZ0_video_recover_after_count+'/'+school_Max.Allow_EPZ0_CourseVideo_Max+')</td>';
                                if (EPZ0_video_recover_after_count>parseInt(school_Max.Allow_EPZ0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_EPZ0=1;
                            }

                        }


                        //國中
                        if ( recover_show.J0C0_recover_show==1){
                            if (item.role_subject=="J0C0_Count"){
                                html+='<tr>';
                                html+='<td>國中國文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0C0_Max+')</td>';
                                var J0C0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0C0_recover_count);
                                html+='<td>('+J0C0_recover_after_count+'/'+school_Max.Allow_J0C0_Max+')</td>';
                                if (J0C0_recover_after_count>parseInt(school_Max.Allow_J0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0C0_zero_show==0 && have_show_zero.J0C0==0){
                                html+='<tr>';
                                html+='<td>國中國文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0C0_Max+')</td>';
                                var J0C0_recover_after_count=0+parseInt(recover_count_ary.J0C0_recover_count);
                                html+='<td>('+J0C0_recover_after_count+'/'+school_Max.Allow_J0C0_Max+')</td>';
                                if (J0C0_recover_after_count>parseInt(school_Max.Allow_J0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.J0C0=1;
                            }

                            if (item.role_subject=="J0C0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國中國文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0C0_CourseVideo_Max+')</td>';
                                var J0C0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0C0_video_recover_count);
                                html+='<td>('+J0C0_video_recover_after_count+'/'+school_Max.Allow_J0C0_CourseVideo_Max+')</td>';
                                if (J0C0_video_recover_after_count>parseInt(school_Max.Allow_J0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0C0_video_zero_show==0 && have_show_zero.video_J0C0==0){
                                html+='<tr>';
                                html+='<td>國中國文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0C0_CourseVideo_Max+')</td>';
                                var J0C0_video_recover_after_count=0+parseInt(recover_count_ary.J0C0_video_recover_count);
                                html+='<td>('+J0C0_video_recover_after_count+'/'+school_Max.Allow_J0C0_CourseVideo_Max+')</td>';
                                if (J0C0_video_recover_after_count>parseInt(school_Max.Allow_J0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>'
                                have_show_zero.video_J0C0=1;
                            }


                        }


                        if (  recover_show.J0E0_recover_show==1){
                            if (item.role_subject=="J0E0_Count"){
                                html+='<tr>';
                                html+='<td>國中英文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0E0_Max+')</td>';
                                var J0E0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0E0_recover_count);
                                html+='<td>('+J0E0_recover_after_count+'/'+school_Max.Allow_J0E0_Max+')</td>';
                                if (J0E0_recover_after_count>parseInt(school_Max.Allow_J0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0E0_zero_show==0 && have_show_zero.J0E0==0){
                                html+='<tr>';
                                html+='<td>國中英文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0E0_Max+')</td>';
                                var J0E0_recover_after_count=0+parseInt(recover_count_ary.J0E0_recover_count);
                                html+='<td>('+J0E0_recover_after_count+'/'+school_Max.Allow_J0E0_Max+')</td>';
                                if (J0E0_recover_after_count>parseInt(school_Max.Allow_J0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.J0E0=1;
                            }

                            if (item.role_subject=="J0E0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國中英文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0E0_CourseVideo_Max+')</td>';
                                var J0E0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0E0_video_recover_count);
                                html+='<td>('+J0E0_video_recover_after_count+'/'+school_Max.Allow_J0E0_CourseVideo_Max+')</td>';
                                if (J0E0_video_recover_after_count>parseInt(school_Max.Allow_J0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0E0_video_zero_show==0 && have_show_zero.video_J0E0==0){
                                html+='<tr>';
                                html+='<td>國中英文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0E0_CourseVideo_Max+')</td>';
                                var J0E0_video_recover_after_count=0+parseInt(recover_count_ary.J0E0_video_recover_count);
                                html+='<td>('+J0E0_video_recover_after_count+'/'+school_Max.Allow_J0E0_CourseVideo_Max+')</td>';
                                if (J0E0_video_recover_after_count>parseInt(school_Max.Allow_J0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_J0E0=1;
                            }



                        }

                        if ( recover_show.J0M0_recover_show==1){
                            if (item.role_subject=="J0M0_Count"){
                                html+='<tr>';
                                html+='<td>國中數學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0M0_Max+')</td>';
                                var J0M0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0M0_recover_count);
                                html+='<td>('+J0M0_recover_after_count+'/'+school_Max.Allow_J0M0_Max+')</td>';
                                if (J0M0_recover_after_count>parseInt(school_Max.Allow_J0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }
                            else if (zero_show.J0M0_zero_show==0 && have_show_zero.J0M0==0){
                                html+='<tr>';
                                html+='<td>國中數學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0M0_Max+')</td>';
                                var J0M0_recover_after_count=0+parseInt(recover_count_ary.J0M0_recover_count);
                                html+='<td>('+J0M0_recover_after_count+'/'+school_Max.Allow_J0M0_Max+')</td>';
                                if (J0M0_recover_after_count>parseInt(school_Max.Allow_J0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.J0M0=1;
                            }

                            if (item.role_subject=="J0M0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國中數學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0M0_CourseVideo_Max+')</td>';
                                var J0M0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0M0_video_recover_count);
                                html+='<td>('+J0M0_video_recover_after_count+'/'+school_Max.Allow_J0M0_CourseVideo_Max+')</td>';
                                if (J0M0_video_recover_after_count>parseInt(school_Max.Allow_J0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0M0_video_zero_show==0 && have_show_zero.video_J0M0==0){
                                html+='<tr>';
                                html+='<td>國中數學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0M0_CourseVideo_Max+')</td>';
                                var J0M0_video_recover_after_count=0+parseInt(recover_count_ary.J0M0_video_recover_count);
                                html+='<td>('+J0M0_video_recover_after_count+'/'+school_Max.Allow_J0M0_CourseVideo_Max+')</td>';
                                if (J0M0_video_recover_after_count>parseInt(school_Max.Allow_J0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_J0M0=1;
                            }


                        }



                        if ( recover_show.J0N0_recover_show==1){
                            if (item.role_subject=="J0N0_Count"){
                                html+='<tr>';
                                html+='<td>國中自然：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0N0_Max+')</td>';
                                var J0N0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0N0_recover_count);
                                html+='<td>('+J0N0_recover_after_count+'/'+school_Max.Allow_J0N0_Max+')</td>';
                                if (J0N0_recover_after_count>parseInt(school_Max.Allow_J0N0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0N0_zero_show==0 && have_show_zero.J0N0==0){
                                html+='<tr>';
                                html+='<td>國中自然：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0N0_Max+')</td>';
                                var J0N0_recover_after_count=0+parseInt(recover_count_ary.J0N0_recover_count);
                                html+='<td>('+J0N0_recover_after_count+'/'+school_Max.Allow_J0N0_Max+')</td>';
                                if (J0N0_recover_after_count>parseInt(school_Max.Allow_J0N0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.J0N0=1;
                            }

                            if (item.role_subject=="J0N0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>國中自然教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0N0_CourseVideo_Max+')</td>';
                                var J0N0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0N0_video_recover_count);
                                html+='<td>('+J0N0_video_recover_after_count+'/'+school_Max.Allow_J0N0_CourseVideo_Max+')</td>';
                                if (J0N0_video_recover_after_count>parseInt(school_Max.Allow_J0N0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0N0_video_zero_show==0 && have_show_zero.video_J0N0==0){
                                html+='<tr>';
                                html+='<td>國中自然教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0N0_CourseVideo_Max+')</td>';
                                var J0N0_video_recover_after_count=0+parseInt(recover_count_ary.J0N0_video_recover_count);
                                html+='<td>('+J0N0_video_recover_after_count+'/'+school_Max.Allow_J0N0_CourseVideo_Max+')</td>';
                                if (J0N0_video_recover_after_count>parseInt(school_Max.Allow_J0N0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_J0N0=1;
                            }


                        }



                        if ( recover_show.J0S0_recover_show==1){
                            if (item.role_subject=="J0S0_Count"){
                                html+='<tr>';
                                html+='<td>國中社會：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0S0_Max+')</td>';
                                var J0S0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0S0_recover_count);
                                html+='<td>('+J0S0_recover_after_count+'/'+school_Max.Allow_J0S0_Max+')</td>';
                                if (J0S0_recover_after_count>parseInt(school_Max.Allow_J0S0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0S0_zero_show==0 && have_show_zero.J0S0==0){
                                html+='<tr>';
                                html+='<td>國中社會：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0S0_Max+')</td>';
                                var J0S0_recover_after_count=0+parseInt(recover_count_ary.J0S0_recover_count);
                                html+='<td>('+J0S0_recover_after_count+'/'+school_Max.Allow_J0S0_Max+')</td>';
                                if (J0S0_recover_after_count>parseInt(school_Max.Allow_J0S0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.J0S0=1;
                            }

                            if (item.role_subject=="J0S0_CourseVideo_Count" ){
                                html+='<tr>';
                                html+='<td>國中社會教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_J0S0_CourseVideo_Max+')</td>';
                                var J0S0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.J0S0_video_recover_count);
                                html+='<td>('+J0S0_video_recover_after_count+'/'+school_Max.Allow_J0S0_CourseVideo_Max+')</td>';
                                if (J0S0_video_recover_after_count>parseInt(school_Max.Allow_J0S0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.J0S0_video_zero_show==0 && have_show_zero.video_J0S0==0){
                                html+='<tr>';
                                html+='<td>國中社會教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_J0S0_CourseVideo_Max+')</td>';
                                var J0S0_video_recover_after_count=0+parseInt(recover_count_ary.J0S0_video_recover_count);
                                html+='<td>('+J0S0_video_recover_after_count+'/'+school_Max.Allow_J0S0_CourseVideo_Max+')</td>';
                                if (J0S0_video_recover_after_count>parseInt(school_Max.Allow_J0S0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_J0S0=1;
                            }


                        }



                        //高中
                        if (  recover_show.H0C0_recover_show==1){
                            if (item.role_subject=="H0C0_Count"){
                                html+='<tr>';
                                html+='<td>高中國文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0C0_Max+')</td>';
                                var H0C0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0C0_recover_count);
                                html+='<td>('+H0C0_recover_after_count+'/'+school_Max.Allow_H0C0_Max+')</td>';
                                if (H0C0_recover_after_count>parseInt(school_Max.Allow_H0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0C0_zero_show==0 && have_show_zero.H0C0==0){
                                html+='<tr>';
                                html+='<td>高中國文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0C0_Max+')</td>';
                                var H0C0_recover_after_count=0+parseInt(recover_count_ary.H0C0_recover_count);
                                html+='<td>('+H0C0_recover_after_count+'/'+school_Max.Allow_H0C0_Max+')</td>';
                                if (H0C0_recover_after_count>parseInt(school_Max.Allow_H0C0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0C0=1;
                            }

                            if (item.role_subject=="H0C0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中國文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0C0_CourseVideo_Max+')</td>';
                                var H0C0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0C0_video_recover_count);
                                html+='<td>('+H0C0_video_recover_after_count+'/'+school_Max.Allow_H0C0_CourseVideo_Max+')</td>';
                                if (H0C0_video_recover_after_count>parseInt(school_Max.Allow_H0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0C0_video_zero_show==0 && have_show_zero.video_H0C0==0){
                                html+='<tr>';
                                html+='<td>高中國文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0C0_CourseVideo_Max+')</td>';
                                var H0C0_video_recover_after_count=0+parseInt(recover_count_ary.H0C0_video_recover_count);
                                html+='<td>('+H0C0_video_recover_after_count+'/'+school_Max.Allow_H0C0_CourseVideo_Max+')</td>';
                                if (H0C0_video_recover_after_count>parseInt(school_Max.Allow_H0C0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0C0=1;
                            }

                        }


                        if (  recover_show.H0E0_recover_show==1){
                            if (item.role_subject=="H0E0_Count"){
                                html+='<tr>';
                                html+='<td>高中英文：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0E0_Max+')</td>';
                                var H0E0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0E0_recover_count);
                                html+='<td>('+H0E0_recover_after_count+'/'+school_Max.Allow_H0E0_Max+')</td>';
                                if (H0E0_recover_after_count>parseInt(school_Max.Allow_H0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0E0_zero_show==0 && have_show_zero.H0E0==0){
                                html+='<tr>';
                                html+='<td>高中英文：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0E0_Max+')</td>';
                                var H0E0_recover_after_count=0+parseInt(recover_count_ary.H0E0_recover_count);
                                html+='<td>('+H0E0_recover_after_count+'/'+school_Max.Allow_H0E0_Max+')</td>';
                                if (H0E0_recover_after_count>parseInt(school_Max.Allow_H0E0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0E0=1;
                            }

                            if (item.role_subject=="H0E0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中英文教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0E0_CourseVideo_Max+')</td>';
                                var H0E0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0E0_video_recover_count);
                                html+='<td>('+H0E0_video_recover_after_count+'/'+school_Max.Allow_H0E0_CourseVideo_Max+')</td>';
                                if (H0E0_video_recover_after_count>parseInt(school_Max.Allow_H0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0E0_video_zero_show==0 && have_show_zero.video_H0E0==0){
                                html+='<tr>';
                                html+='<td>高中英文教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0E0_CourseVideo_Max+')</td>';
                                var H0E0_video_recover_after_count=0+parseInt(recover_count_ary.H0E0_video_recover_count);
                                html+='<td>('+H0E0_video_recover_after_count+'/'+school_Max.Allow_H0E0_CourseVideo_Max+')</td>';
                                if (H0E0_video_recover_after_count>parseInt(school_Max.Allow_H0E0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0E0=1;
                            }

                        }


                        if (  recover_show.H0M0_recover_show==1){
                            if (item.role_subject=="H0M0_Count"){
                                html+='<tr>';
                                html+='<td>高中數學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0M0_Max+')</td>';
                                var H0M0_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0M0_recover_count);
                                html+='<td>('+H0M0_recover_after_count+'/'+school_Max.Allow_H0M0_Max+')</td>';
                                if (H0M0_recover_after_count>parseInt(school_Max.Allow_H0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0M0_zero_show==0 && have_show_zero.H0M0==0){
                                html+='<tr>';
                                html+='<td>高中數學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0M0_Max+')</td>';
                                var H0M0_recover_after_count=0+parseInt(recover_count_ary.H0M0_recover_count);
                                html+='<td>('+H0M0_recover_after_count+'/'+school_Max.Allow_H0M0_Max+')</td>';
                                if (H0M0_recover_after_count>parseInt(school_Max.Allow_H0M0_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0M0=1;
                            }

                            if (item.role_subject=="H0M0_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中數學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0M0_CourseVideo_Max+')</td>';
                                var H0M0_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0M0_video_recover_count);
                                html+='<td>('+H0M0_video_recover_after_count+'/'+school_Max.Allow_H0M0_CourseVideo_Max+')</td>';
                                if (H0M0_video_recover_after_count>parseInt(school_Max.Allow_H0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0M0_video_zero_show==0 && have_show_zero.video_H0M0==0){
                                html+='<tr>';
                                html+='<td>高中數學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0M0_CourseVideo_Max+')</td>';
                                var H0M0_video_recover_after_count=0+parseInt(recover_count_ary.H0M0_video_recover_count);
                                html+='<td>('+H0M0_video_recover_after_count+'/'+school_Max.Allow_H0M0_CourseVideo_Max+')</td>';
                                if (H0M0_video_recover_after_count>parseInt(school_Max.Allow_H0M0_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0M0=1;
                            }

                        }




                        if (  recover_show.H0N1_recover_show==1){
                            if (item.role_subject=="H0N1_Count"){
                                html+='<tr>';
                                html+='<td>高中生物：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N1_Max+')</td>';
                                var H0N1_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N1_recover_count);
                                html+='<td>('+H0N1_recover_after_count+'/'+school_Max.Allow_H0N1_Max+')</td>';
                                if (H0N1_recover_after_count>parseInt(school_Max.Allow_H0N1_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N1_zero_show==0 && have_show_zero.H0N1==0){
                                html+='<tr>';
                                html+='<td>高中生物：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N1_Max+')</td>';
                                var H0N1_recover_after_count=0+parseInt(recover_count_ary.H0N1_recover_count);
                                html+='<td>('+H0N1_recover_after_count+'/'+school_Max.Allow_H0N1_Max+')</td>';
                                if (H0N1_recover_after_count>parseInt(school_Max.Allow_H0N1_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0N1=1;
                            }

                            if (item.role_subject=="H0N1_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中生物教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N1_CourseVideo_Max+')</td>';
                                var H0N1_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N1_video_recover_count);
                                html+='<td>('+H0N1_video_recover_after_count+'/'+school_Max.Allow_H0N1_CourseVideo_Max+')</td>';
                                if (H0N1_video_recover_after_count>parseInt(school_Max.Allow_H0N1_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N1_video_zero_show==0 && have_show_zero.video_H0N1==0){
                                html+='<tr>';
                                html+='<td>高中生物教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N1_CourseVideo_Max+')</td>';
                                var H0N1_video_recover_after_count=0+parseInt(recover_count_ary.H0N1_video_recover_count);
                                html+='<td>('+H0N1_video_recover_after_count+'/'+school_Max.Allow_H0N1_CourseVideo_Max+')</td>';
                                if (H0N1_video_recover_after_count>parseInt(school_Max.Allow_H0N1_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0N1=1;
                            }


                        }




                        if (  recover_show.H0N4_recover_show==1){
                            if (item.role_subject=="H0N4_Count"){
                                html+='<tr>';
                                html+='<td>高中物理：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N4_Max+')</td>';
                                var H0N4_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N4_recover_count);
                                html+='<td>('+H0N4_recover_after_count+'/'+school_Max.Allow_H0N4_Max+')</td>';
                                if (H0N4_recover_after_count>parseInt(school_Max.Allow_H0N4_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N4_zero_show==0 && have_show_zero.H0N4==0){
                                html+='<tr>';
                                html+='<td>高中物理：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N4_Max+')</td>';
                                var H0N4_recover_after_count=0+parseInt(recover_count_ary.H0N4_recover_count);
                                html+='<td>('+H0N4_recover_after_count+'/'+school_Max.Allow_H0N4_Max+')</td>';
                                if (H0N4_recover_after_count>parseInt(school_Max.Allow_H0N4_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0N4=1;
                            }

                            if (item.role_subject=="H0N4_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中物理教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N4_CourseVideo_Max+')</td>';
                                var H0N4_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N4_video_recover_count);
                                html+='<td>('+H0N4_video_recover_after_count+'/'+school_Max.Allow_H0N4_CourseVideo_Max+')</td>';
                                if (H0N4_video_recover_after_count>parseInt(school_Max.Allow_H0N4_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N4_video_zero_show==0 && have_show_zero.video_H0N4==0){
                                html+='<tr>';
                                html+='<td>高中物理教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N4_CourseVideo_Max+')</td>';
                                var H0N4_video_recover_after_count=0+parseInt(recover_count_ary.H0N4_video_recover_count);
                                html+='<td>('+H0N4_video_recover_after_count+'/'+school_Max.Allow_H0N4_CourseVideo_Max+')</td>';
                                if (H0N4_video_recover_after_count>parseInt(school_Max.Allow_H0N4_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0N4=1;
                            }

                        }





                        if (  recover_show.H0N5_recover_show==1){
                            if (item.role_subject=="H0N5_Count"){
                                html+='<tr>';
                                html+='<td>高中化學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N5_Max+')</td>';
                                var H0N5_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N5_recover_count);
                                html+='<td>('+H0N5_recover_after_count+'/'+school_Max.Allow_H0N5_Max+')</td>';
                                if (H0N5_recover_after_count>parseInt(school_Max.Allow_H0N5_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N5_zero_show==0 && have_show_zero.H0N5==0 ){
                                html+='<tr>';
                                html+='<td>高中化學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N5_Max+')</td>';
                                var H0N5_recover_after_count=0+parseInt(recover_count_ary.H0N5_recover_count);
                                html+='<td>('+H0N5_recover_after_count+'/'+school_Max.Allow_H0N5_Max+')</td>';
                                if (H0N5_recover_after_count>parseInt(school_Max.Allow_H0N5_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0N5=1;
                            }


                            if (item.role_subject=="H0N5_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中化學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N5_CourseVideo_Max+')</td>';
                                var H0N5_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N5_video_recover_count);
                                html+='<td>('+H0N5_video_recover_after_count+'/'+school_Max.Allow_H0N5_CourseVideo_Max+')</td>';
                                if (H0N5_video_recover_after_count>parseInt(school_Max.Allow_H0N5_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N5_video_zero_show==0 && have_show_zero.video_H0N5==0){
                                html+='<tr>';
                                html+='<td>高中化學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N5_CourseVideo_Max+')</td>';
                                var H0N5_video_recover_after_count=0+parseInt(recover_count_ary.H0N5_video_recover_count);
                                html+='<td>('+H0N5_video_recover_after_count+'/'+school_Max.Allow_H0N5_CourseVideo_Max+')</td>';
                                if (H0N5_video_recover_after_count>parseInt(school_Max.Allow_H0N5_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0N5=1;
                            }



                        }



                        if (  recover_show.H0N3_recover_show==1){
                            if (item.role_subject=="H0N3_Count"){
                                html+='<tr>';
                                html+='<td>高中地球科學：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N3_Max+')</td>';
                                var H0N3_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N3_recover_count);
                                html+='<td>('+H0N3_recover_after_count+'/'+school_Max.Allow_H0N3_Max+')</td>';
                                if (H0N3_recover_after_count>parseInt(school_Max.Allow_H0N3_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N3_zero_show==0 && have_show_zero.H0N3==0){
                                html+='<tr>';
                                html+='<td>高中地球科學：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N3_Max+')</td>';
                                var H0N3_recover_after_count=0+parseInt(recover_count_ary.H0N3_recover_count);
                                html+='<td>('+H0N3_recover_after_count+'/'+school_Max.Allow_H0N3_Max+')</td>';
                                if (H0N3_recover_after_count>parseInt(school_Max.Allow_H0N3_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0N3=1;
                            }

                            if (item.role_subject=="H0N3_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中地球科學教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0N3_CourseVideo_Max+')</td>';
                                var H0N3_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0N3_video_recover_count);
                                html+='<td>('+H0N3_video_recover_after_count+'/'+school_Max.Allow_H0N3_CourseVideo_Max+')</td>';
                                if (H0N3_video_recover_after_count>parseInt(school_Max.Allow_H0N3_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0N3_video_zero_show==0 && have_show_zero.video_H0N3==0){
                                html+='<tr>';
                                html+='<td>高中地球科學教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0N3_CourseVideo_Max+')</td>';
                                var H0N3_video_recover_after_count=0+parseInt(recover_count_ary.H0N3_video_recover_count);
                                html+='<td>('+H0N3_video_recover_after_count+'/'+school_Max.Allow_H0N3_CourseVideo_Max+')</td>';
                                if (H0N3_video_recover_after_count>parseInt(school_Max.Allow_H0N3_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0N3=1;
                            }


                        }




                        if ( recover_show.H0S2_recover_show==1){
                            if (item.role_subject=="H0S2_Count"){
                                html+='<tr>';
                                html+='<td>高中地理：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S2_Max+')</td>';
                                var H0S2_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S2_recover_count);
                                html+='<td>('+H0S2_recover_after_count+'/'+school_Max.Allow_H0S2_Max+')</td>';
                                if (H0S2_recover_after_count>parseInt(school_Max.Allow_H0S2_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0S2_zero_show==0 && have_show_zero.H0S2==0){
                                html+='<tr>';
                                html+='<td>高中地理：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S2_Max+')</td>';
                                var H0S2_recover_after_count=0+parseInt(recover_count_ary.H0S2_recover_count);
                                html+='<td>('+H0S2_recover_after_count+'/'+school_Max.Allow_H0S2_Max+')</td>';
                                if (H0S2_recover_after_count>parseInt(school_Max.Allow_H0S2_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0S2=1;
                            }

                            if (item.role_subject=="H0S2_CourseVideo_Count" ){
                                html+='<tr>';
                                html+='<td>高中地理教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S2_CourseVideo_Max+')</td>';
                                var H0S2_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S2_video_recover_count);
                                html+='<td>('+H0S2_video_recover_after_count+'/'+school_Max.Allow_H0S2_CourseVideo_Max+')</td>';
                                if (H0S2_video_recover_after_count>parseInt(school_Max.Allow_H0S2_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0S2_video_zero_show==0 && have_show_zero.video_H0S2==0){
                                html+='<tr>';
                                html+='<td>高中地理教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S2_CourseVideo_Max+')</td>';
                                var H0S2_video_recover_after_count=0+parseInt(recover_count_ary.H0S2_video_recover_count);
                                html+='<td>('+H0S2_video_recover_after_count+'/'+school_Max.Allow_H0S2_CourseVideo_Max+')</td>';
                                if (H0S2_video_recover_after_count>parseInt(school_Max.Allow_H0S2_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0S2=1;
                            }




                        }



                        if (  recover_show.H0S1_recover_show==1){
                            if (item.role_subject=="H0S1_Count"){
                                html+='<tr>';
                                html+='<td>高中歷史：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S1_Max+')</td>';
                                var H0S1_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S1_recover_count);
                                html+='<td>('+H0S1_recover_after_count+'/'+school_Max.Allow_H0S1_Max+')</td>';
                                if (H0S1_recover_after_count>parseInt(school_Max.Allow_H0S1_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0S1_zero_show==0 && have_show_zero.H0S1==0){
                                html+='<tr>';
                                html+='<td>高中歷史：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S1_Max+')</td>';
                                var H0S1_recover_after_count=0+parseInt(recover_count_ary.H0S1_recover_count);
                                html+='<td>('+H0S1_recover_after_count+'/'+school_Max.Allow_H0S1_Max+')</td>';
                                if (H0S1_recover_after_count>parseInt(school_Max.Allow_H0S1_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0S1=1;
                            }

                            if (item.role_subject=="H0S1_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中歷史教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S1_CourseVideo_Max+')</td>';
                                var H0S1_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S1_video_recover_count);
                                html+='<td>('+H0S1_video_recover_after_count+'/'+school_Max.Allow_H0S1_CourseVideo_Max+')</td>';
                                if (H0S1_video_recover_after_count>parseInt(school_Max.Allow_H0S1_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                            }else if (zero_show.H0S1_video_zero_show==0 && have_show_zero.video_H0S1==0){
                                html+='<tr>';
                                html+='<td>高中歷史教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S1_CourseVideo_Max+')</td>';
                                var H0S1_video_recover_after_count=0+parseInt(recover_count_ary.H0S1_video_recover_count);
                                html+='<td>('+H0S1_video_recover_after_count+'/'+school_Max.Allow_H0S1_CourseVideo_Max+')</td>';
                                if (H0S1_video_recover_after_count>parseInt(school_Max.Allow_H0S1_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0S1=1;
                            }


                        }



                        if (  recover_show.H0S3_recover_show==1){
                            if (item.role_subject=="H0S3_Count"){
                                html+='<tr>';
                                html+='<td>高中公民：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S3_Max+')</td>';
                                var H0S3_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S3_recover_count);
                                html+='<td>('+H0S3_recover_after_count+'/'+school_Max.Allow_H0S3_Max+')</td>';
                                if (H0S3_recover_after_count>parseInt(school_Max.Allow_H0S3_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0S3_zero_show==0 && have_show_zero.H0S3==0){
                                html+='<tr>';
                                html+='<td>高中公民：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S3_Max+')</td>';
                                var H0S3_recover_after_count=0+parseInt(recover_count_ary.H0S3_recover_count);
                                html+='<td>('+H0S3_recover_after_count+'/'+school_Max.Allow_H0S3_Max+')</td>';
                                if (H0S3_recover_after_count>parseInt(school_Max.Allow_H0S3_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.H0S3=1;
                            }

                            if (item.role_subject=="H0S3_CourseVideo_Count"){
                                html+='<tr>';
                                html+='<td>高中公民教學影片：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_H0S3_CourseVideo_Max+')</td>';
                                var H0S3_video_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.H0S3_video_recover_count);
                                html+='<td>('+H0S3_video_recover_after_count+'/'+school_Max.Allow_H0S3_CourseVideo_Max+')</td>';
                                if (H0S3_video_recover_after_count>parseInt(school_Max.Allow_H0S3_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                            }else if (zero_show.H0S3_video_zero_show==0 && have_show_zero.video_H0S3==0){
                                html+='<tr>';
                                html+='<td>高中公民教學影片：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_H0S3_CourseVideo_Max+')</td>';
                                var H0S3_video_recover_after_count=0+parseInt(recover_count_ary.H0S3_video_recover_count);
                                html+='<td>('+H0S3_video_recover_after_count+'/'+school_Max.Allow_H0S3_CourseVideo_Max+')</td>';
                                if (H0S3_video_recover_after_count>parseInt(school_Max.Allow_H0S3_CourseVideo_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                                have_show_zero.video_H0S3=1;
                            }


                        }



                        if ( recover_show.ET_recover_show==1){
                            if (item.role_subject=="ET_Count" ){
                                html+='<tr>';
                                html+='<td>MYET：</td>';
                                html+='<td>('+item.role_count+'/'+school_Max.Allow_ET_Max+')</td>';
                                var ET_recover_after_count=parseInt(item.role_count)+parseInt(recover_count_ary.ET_recover_count);
                                html+='<td>('+ET_recover_after_count+'/'+school_Max.Allow_ET_Max+')</td>';
                                if (ET_recover_after_count>parseInt(school_Max.Allow_ET_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }else if (zero_show.H0ET_zero_show==0 ){
                                html+='<tr>';
                                html+='<td>MYET：</td>';
                                html+='<td>('+0+'/'+school_Max.Allow_ET_Max+')</td>';
                                var ET_recover_after_count=0+parseInt(recover_count_ary.ET_recover_count);
                                html+='<td>('+ET_recover_after_count+'/'+school_Max.Allow_ET_Max+')</td>';
                                if (ET_recover_after_count>parseInt(school_Max.Allow_ET_Max)){
                                    html+='<td><font color="red">需要調整額度</td>';
                                    newObj.need_check=1;
                                }else{
                                    html+='<td><font color="green">可恢復</td>';
                                }
                                html+='</tr>';
                            }


                        }

                        if (recover_show.P0_recover_show==1 && have_show_zero.P0==0){
                            html+='<tr>';
                            html+='<td>安親：</td>';
                            html+='<td>安親沒有額度限制</td>';
                            html+='<td>恢復幾'+recover_count_ary.P0_recover_count+'人</td>';
                            html+='<td><font color="green">可恢復</td>';
                            html+='</tr>';
                            have_show_zero.P0=1;
                        }





                    });
                    html+='</tbale>';

                    $('#recover-content').html(html);

                    if (newObj.need_check==1){
                        $('#recover-schoolclass-btn').removeClass('btn-orange').addClass('btn-secondary');
                        $('#recover-schoolclass-btn').prop('disabled', true);
                    }else if (newObj.need_check==0){
                        var check_disalbe_class= $('#recover-schoolclass-btn').hasClass('btn-secondary');
                        if (check_disalbe_class==true){
                            $('#recover-schoolclass-btn').removeClass('btn-secondary').addClass('btn-orange');
                        }
                        $('#recover-schoolclass-btn').prop('disabled', false);
                    }






                    $('#recover-schoolclass-modal').modal('toggle');




                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }

    function RecoverSchoolclass(){
        var dataObj={};
        var schoolclass_ids=[];
        var end_at=Math.floor(new Date($('#date-end-time').val()).getTime() / 1000)+81000;//避免timestamp有時計算會有誤差所以提前到原本是23:59:59->22:30:00 86399->81000

        if ($('#date-end-time').val()==''){
            alert("請選擇結業日");
            return false;
        }
        dataObj.end_at = end_at;

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();

        $.each(rows_selected, function(index, rowId){
            schoolclass_ids.push(rowId);
        });

        dataObj.schoolclass_ids=schoolclass_ids;

        $.ajax({
            url: '/admin/schoolclass/recover-schoolclass',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                if (res.message!='success'){
                    alert(res.message);
                }
                else{
                    $('#recover-schoolclass-modal').modal('hide');
                    alert("已恢復班級："+res.success_log);
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