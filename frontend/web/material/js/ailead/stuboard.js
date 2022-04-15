$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        getVideoShow();
        initObj();
        getAllTask();
        checkSerialnoExpire();
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
                [ 7, "desc" ], [ 0, "Asc" ]
            ], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true, //等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //==========請求數據start
            'serverSide': true,
            'ajax': {
                'url': '/admin/stuboard/get-task-list',
				'type':'POST',
                'data': function(data) {
                    data.taskkinds = newObj.kind == null ? [1,3,4] : newObj.kind;
                }
            },
            'initComplete': function() {

                // console.log(data.aoData[0]._aData);
                $('#tbList tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();

                    if($('#parent_id').val() == parseInt($('#parent_id').val(), 10) && $('#parent_id').val()==0){
                        if (data["task_kind_id"]=='3') {
                            location.href= '/admin/exam/videoexam?tid=' + data["id"]+'&fid='+data["source_id_or_quizresult_id"]+'&kind=1';
                        }
                        else if (data["task_kind_id"]=='4') {
                            location.href= '/admin/exam/videoexam?tid=' + data["id"]+'&vid='+data["source_id_or_quizresult_id"]+'&kind=1';
                        }
						else if (data["task_kind_id"]=='5') {
                            location.href= '/admin/exam/ask-viewans?aid=' + data["id"];
                        }
                        else {
                            location.href= '/admin/exam?tid=' + data["id"]+'&pid='+data["source_id_or_quizresult_id"];
                        }
                    }
                });

                $('.btnSel').on('click', function(e) {
                    e.preventDefault();
                    newObj.kind=[];
                    var data_id = parseInt($(this).attr('data-id'));
                    if (data_id===-1) {
                        newObj.kind= null;
                    }
                    else if (data_id===1)
                    {
                        newObj.kind=[1];
                    }
                    else {
                        newObj.kind=[3,4];
                    }
                    newObj.tblist.draw();
                });

            },
            'drawCallback': function() {
                newObj.tblist.rows().every(function() {
                    var item=this.data();
                    item["start_at"]=item["start_at"].split(':').slice(0,2).join(':');
                    item["end_at"]=item["end_at"].split(':').slice(0,2).join(':');
                    this.invalidate();
                });
            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false,
                    'visible': false,
                },
                {
                    'title': '來源id或報表id',
                    'data': 'source_id_or_quizresult_id',
                    'width':10,
                    'orderalbe':false,
                    'visible': false,
                },
                {
                    'title': '任務種類',
                    'data': 'task_kind_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '班級',
                    'data': 'schoolclass_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '影片單元/試卷名稱',
                    'data': 'task_name',
                    'width':10,
                    'orderable': true,


                },
                {
                    'title': '題數',
                    'data': 'amount',
                    'width': 10,
                    'orderable': false,



                },
                {
                    'title': '影片時間/測驗作答時間',
                    'data': 'exam_or_video_time',
                    'width': 10,
                    'orderable': true,



                },
                {
                    'title': '開始時間/補(考/看)開始時間',
                    'data': 'start_at',
                    'width': 10,
                    'orderable': true,


                },
                {
                    'title': '結束時間/補(考/看)結束時間',
                    'data': 'end_at',
                    'width': 10,
                    'orderable': true

                },
                {
                    'title': '倒數計時',
                    'data': 'remain_time',
                    'width': 10,
                    'orderable': false,
                    'visible': false,

                },
                {
                    'title': '任務種類id',
                    'data': 'task_kind_id',
                    'width': 10,
                    'orderable': false,
                    'visible': false,

                },



            ],


            //==========請求數據end
            // 'aoColumns': [
            //     {'sTitle': ''       ,'name': 'check'},
            //     {'sTitle': '機構編號', 'name': 'id'},   //, 'sClass': 'center', sWidth: '50px'
            //     {'sTitle': '機構名稱', 'name': 'name'}, //'bSortable': false 禁止此列排序
            //     {'sTitle': '顯示名稱', 'name': 'viewname'},
            //     {'sTitle': '班級數量', 'name': 'calss_total', 'bSortable': false},
            //     {'sTitle': '學生數量', 'name': 'user_total', 'bSortable': false},
            // ],
            // 'columnDefs': [{
            //         'targets': [0,1],
            //         'visible': false
            //     }
            // ],
            // 'select': {
            //     'style': 'multi'
            // },
        });
    }

    function getAllTask(){
        $.ajax({
          url: '/admin/stuboard/get-all-task',
          type: 'POST',
          success: function (res) {

              var un_finish_paper=res.un_finish_paper;
              var all_finish_paper=res.all_finish_paper;
              var all_finish_quiz=res.all_finish_quiz;
              var un_finish_video=res.un_finish_video;
              var all_finish_video=res.all_finish_video;
              var all_finish_minute=res.all_finish_minute;

              $('#un_finish_paper').text(un_finish_paper);
              $('#all_finish_paper').text(all_finish_paper);
              $('#all_finish_quiz').text(all_finish_quiz);

              $('#un_finish_video').text(un_finish_video);
              $('#all_finish_video').text(all_finish_video);
              $('#all_finish_minute').text(all_finish_minute);


          },
          error: bs.errorHandler
        });
    }

    function checkSerialnoExpire(){
        $.ajax({
            url: '/admin/stuboard/serialno-check',
            type: 'POST',
            success: function(res){
                var response = res.data;
                // var serialno_id = response.serialno_id;
                var subject = response.subject;
                var schoolclass_name = response.schoolclass_name;
                // var left_days = response.left_days;
                // var alert_change = response.alert_change;

                for(var i=0; i<subject.length; i++){
                    // var left_days_html = '';
                    // if(left_days[i] > 0){
                    //     left_days_html = '剩餘 ' + left_days[i];
                    // }else{
                    //     left_days_html = '剩不到 1 ';
                    // }

                    var content_html = '您的'+ subject[i] + '科，班級： ' + schoolclass_name[i] + ' 使用期限即將到期，若要繼續使用請與補習班聯繫';
                    alert(content_html);
                }

                if(subject.length > 0){
                    afterSerialnoAlert(response);
                }

            },
            error: bs.errorHandler
        });
    }

    function afterSerialnoAlert(serialno_data){
        $.ajax({
            url: '/admin/stuboard/update-serialno-alert',
            type: 'POST',
            data: serialno_data,
            success: function(res){

            },
            error: bs.errorHandler
        });
    }

    function getVideoShow(){
        var dataObj={};

        $.ajax({
            url: '/admin/stuboard/get-video-show',
            type: 'POST',
            data: dataObj,
            success: function(res){
                if (res==0){
                    $('.video-view').hide();
                }
            },
            error: bs.errorHandler
        });
    }


});
