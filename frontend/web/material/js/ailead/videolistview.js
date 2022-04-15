$(function() {
    'use strict';
    var newObj = {};
    newObj.id=bs.getUrlVar('id');
    init();

    function init() {

        getSchoolclassInfo();
        getTaskStatus();
        getVideoStatus();
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
            'order': [[3, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true,//當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/banwu/get-videolistview',
                'data': function(data) {
                    data.schoolclass_detail_id=newObj.id;
                    data.subject_code = $('#select-subject').val();
                    data.schoolclass_id=$('#select-schoolclass').val();
                    data.task_status=$('#select-task-status').val();
                    data.video_status=$('#select-video-status').val();
                    data.stime=$('#date-stime').val();
                    data.etime=$('#date-etime').val();
                },
            },
            'initComplete': function() {

                $('#select-subject').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-task-status').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-video-status').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                jQuery('#date-stime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker:false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });

                jQuery('#date-etime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker:false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });
            },
            'drawCallback': function(settings) {

                var user_id=settings.json.user_id;
                $('#btn-stuinfo').on('click',function(e){
                    e.preventDefault();
                    location.href='/admin/student/view_data?id='+user_id;
                });

             },
            'columnDefs': [
            {
                'targets': [0],
                'data': function(row, type, set, meta){
                    //row[0] = task_id
                    var taskState=row[0];
                    var kind=row[11];
                    let stateText='';
                    if (taskState!=0) {
                        stateText='老師指定';
                    }
                    else  {
                        if (kind==3){
                            stateText='弱點補強影片';
                        }else{
                            stateText='自選影片';
                        }


                    }

                    return stateText;
                },
            },
            {
                'targets': [1],
                'data': function(row, type, set, meta){
                    //row[1] = video_state
                    var videoState=row[1];
                    let stateText='';
                    if (videoState==1) {
                        stateText='已觀看未結束';
                    }
                    else if (videoState==2){
                        stateText='已結束';
                    }
                    else  {
                        stateText='未點播';
                    }

                    return stateText;
                },
            },
            {
                'targets': [2],
                'data': function(row, type, set, meta){
                    //row[8] = schoolclass_id, row[9] = classinfo_id, row[10] =have_video_role
                    if(row[8] && row[9] ){
                        if (row[10]==1){
                            return '<a href="/admin/schoolvideo/videoview?id='+ row[9] +'" target="_blank">' + row[2] + '</a>';
                        }else{
                            return '<p>'+row[2]+'</p>';
                        }

                    }else{
                        return row[2];
                    }
                },
            },
            {
                'targets': [5],
                'data': function(row, type, set, meta){
                    //row[7] = track
                    var track = '';
                    if (row['7']) {
                        track=JSON.parse(row['7']);
                    }
                    var completeShow=0;
                    var progress_response=getVideoProgress(track);
                    if (track.length>0) {
                        completeShow=Math.round((progress_response.complete_count / track.length) * 100)+'%';
                    }
                    return completeShow;
                },
            },
            {
                'targets': [6],
                'data': function(row, type, set, meta){
                    //row[7] = track
                    var track = '';
                    if (row['7']) {
                        track=JSON.parse(row['7']);
                    }
                    var progress_response=getVideoProgress(track);
                    var track_html=progress_response.re_html;

                    return track_html;
                },
            },
            ],
            // 'select': {
            //     'style': 'multi'
            // },
        });
    }

    function getSchoolclassInfo(){
        var dataObj={};
        dataObj.detail_id=newObj.id;
        $.ajax({
          url: '/admin/quizpaper/get-schoolclassinfo',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var schoolclass_id=res.schoolclass_id;
              var grade_code=res.grade_code;
              var subject_code=res.subject_code;
              var stu_user_name=res.stu_user_name;
              getSchoolclass(schoolclass_id);
              getSubjectCode(grade_code,subject_code);

              $('#user-name').text(stu_user_name);
          },
          error: bs.errorHandler
        });
    }

    function getSchoolclass(cid){
		var dataObj={};
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
                $('#select-schoolclass').val(cid);
                $('#select-schoolclass').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                initObj();
            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(grade_code,subject_code) {
        var dataObj = { 'append_et':1 };
        dataObj.grade_code=grade_code;
        // var test=getSchoolclassInfo(grade_code);
        // console.log(test);



        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
			data: dataObj,
            success: function(res) {


                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {

                    $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                //不預選科目
                //檢查他的權限如果沒有在下拉式選單中的話
                var check_subject=$('#select-subject option[value="'+subject_code+'"]').length;
                if (check_subject!=0){
                    $('#select-subject').val(subject_code);
                }
                else{
                    $('#select-subject').val(-1);
                }

                // $('#select-subject').val(subjec_code);
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                // initObj();

            },
            error: bs.errorHandler
        });
    }

    function getTaskStatus() {
        $('#select-task-status option').remove();
        $('#select-task-status').append('<option value="-1">選擇任務類別</option>');
        $('#select-task-status').append('' +
            '<option value="0">自選影片</option>' +
            '<option value="1">老師指定</option>' +
            '<option value="2">弱點補強影片</option>'
        );
        $('#select-task-status').val(-1);
        $('#select-task-status').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getVideoStatus() {
        $('#select-video-status option').remove();
        $('#select-video-status').append('<option value="-1">選擇點播狀況</option>');
        $('#select-video-status').append('' +
            '<option value="0">已觀看未結束</option>' +
            '<option value="1">已結束</option>');
        $('#select-video-status').val(-1);
        $('#select-video-status').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getVideoProgress(track){
        var response={};
        var complete_count=0;
        var re_html='';
        if (track) {
            re_html+='<div style="max-width:200px;inline-block;background-color:#f5f5f5;border:1px solid #dfdfdf;">';
            $.each(track,function(key,item){
                var background_color='';
                if (item.status=='1') {
                    var background_color='blue';
                    complete_count++;
                }
                re_html+='<div style="display:inline-block;width:4px;background-color:'+background_color+'">&nbsp;</div>';
            });
            re_html+='</div>';
        }
        response.re_html=re_html;
        response.complete_count=complete_count;
        return response;
    }

});
