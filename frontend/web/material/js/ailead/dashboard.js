$(function () {
    'use strict';
    var newObj = {};
    init();


    //清除狀態
    function clearState() {
        $('#eventId').val('');
        $('#title').val('');
        $('#start_at').val('');
        $('#end_at').val('');
        $('#note').val('');
        $('#btnDel').hide();
    }

    function init() {

        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[10], ['10']], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            "order": [[ 2, "desc" ], [ 0, "Asc" ]], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true,//當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/banwu/get-task-list',
                'type': 'POST',
                'data': function (data) {
                    // var taskkinds = [1, 2, 3, 4];
                    // data.taskkinds = taskkinds;
                    data.taskkinds = newObj.kind == null ? [1,2,3,4] : newObj.kind;
                    var task_status = [0,1,2];
                    data.task_status = task_status;
                    data.page_source='dashboard';
                },
                'dataSrc': function (res) {

                    $('#task-count').text(res.all_task_count);
                    $('#all_finish_count').text(res.all_finish_count);
                    $('#all_unfinish_count').text(res.all_unfinish_count);

                    $('#video-task-count').text(res.video_all_task_count);
                    $('#video-all_finish_count').text(res.video_all_finish_count);
                    $('#video-all_unfinish_count').text(res.video_all_unfinish_count);

                    return res.data;
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
					if (data["task_kind_id"]=='5') {
					    if (data["ask_kind"]=='1'){
                            window.open('/admin/exam/ask-viewans?aid='+ data["id"],'_blank');
                        }
					    else if (data["ask_kind"]=='2'){
                            window.open('/admin/ask/ask-teacher-answer?id='+ data["id"],'_blank');
                        }



					}
					else {
						window.open('/admin/banwu/examstate?id='+ data["id"],'_blank');
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
                        newObj.kind=[1,2];
                    }
                    else {
                        newObj.kind=[3,4];
                    }
                    newObj.tblist.draw();
                });
            },
            'drawCallback': function () {
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    item["start_at"]=item["start_at"].split(' ').slice(0,1).join(' ');
                    item["end_at"]=item["end_at"].split(' ').slice(0,1).join(' ');
                    var tags = item["task_tags"];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function(key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item["task_tags"]=newTags;
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
                    'title': '任務類別',
                    'data': 'task_kind_name',
                    'width':10,
                    'orderalbe':false,
                    'visible': false,
                },
                {
                    'title': '開始時間',
                    'data': 'start_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '結束時間',
                    'data': 'end_at',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '機構',
                    'data': 'school_name',
                    'width':10,
                    'orderable': true,
                    'visible': false,

                },
                {
                    'title': '年級',
                    'data': 'grade_name',
                    'width': 10,
                    'orderable': true,
                    'visible': false,


                },
                {
                    'title': '班級',
                    'data': 'class_name',
                    'width': 10,
                    'orderable': true,
                    'visible': false,

                },
                {
                    'title': '科目',
                    'data': 'subject_name',
                    'width': 10,
                    'orderable': true

                },
                {
                    'title': '任務名稱',
                    'data': 'task_name',
                    'width': 10,
                    'orderable': true

                },
                {
                    'title': '人數',
                    'data': 'user_status_count',
                    'width': 10,
                    'orderable': false,

                },
                {
                    'title': '任務標籤',
                    'data': 'task_tags',
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': '狀態',
                    'data': 'status_name',
                    'width': 10,
                    'orderable': true

                },


            ],

            // 'columnDefs': [
            //     {
            //         'targets': [0, 1, 4, 5, 6], // column or columns numbers
            //         'visible': false
            //     },{
            //         'targets': [9], // column or columns numbers
            //         'orderable': false,  // set orderable for selected columns
            //     }
            // ],
            'select': {
                'style': 'multi'
            },
        });

        // 開課時間
        $('#start_at').datetimepicker({
            step: 30,
            format: 'Y-m-d H:i:00'
        });

        // 結束時間
        $('#end_at').datetimepicker({
            step: 30,
            format: 'Y-m-d H:i:00'
        });

        //新增行事曆
        $('#btnAdd').off('click').on('click', function () {
            //呼叫清除状态
            clearState();

            $('#myModal').modal('show');
            return false;
        });

        //儲存行事曆
        $('#btnSaveCal').off('click').on('click', function () {
            if (
                validateForm(document.getElementById('title'), 'NotBlank', '', '請輸入行事曆標題！') &&
                validateForm(document.getElementById('start_at'), 'NotBlank', '', '請選擇開始時間！') &&
                validateForm(document.getElementById('end_at'), 'NotBlank', '', '請選結束時間！')
            ) {
                // do nothing
            } else {
                return false;
            }

            var start_dt = moment($('#start_at').val(), 'YYYY-MM-DD HH:mm:ss');
            var end_dt = moment($('#end_at').val(), 'YYYY-MM-DD HH:mm:ss');
            if (end_dt <= start_dt) {
                 alert('「結束時間」請晚於「開始時間」!請您重新確認時間!');
                 return false;
            }

            var dataObj = {};
            dataObj.id = $('#eventId').val();
            dataObj.title = $('#title').val();
            dataObj.start_at = $('#start_at').val();
            dataObj.end_at = $('#end_at').val();
            dataObj.note = $('#note').val();

            $.ajax({
                url: '/admin/school/dashboardcalendardataadd',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if (r.stateinfo == 'success') {
                        $('#myModal').modal('hide');
                        $('#m_calendar').fullCalendar('refetchEvents', true);
                    }
                    else {
                        alert(r.stateinfo);
                    }
                },
                error: bs.errorHandler,
            });
        });

        //刪除行事曆
        $('#btnDel').off('click').on('click', function () {
            var dataObj = {};
            dataObj.id = $('#eventId').val();
            $.ajax({
                url: '/admin/school/dashboardcalendardatadel',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if (r.stateinfo == 'success') {
                        $('#myModal').modal('hide');
                        $('#m_calendar').fullCalendar('refetchEvents', true);
                    } else {
                        alert(r.stateinfo);
                    }
                },
                error: bs.errorHandler,
            });
        });

        // 測評統計
        // var dataObj = {};
        // dataObj.school_id = $('#select-school').val();
        // dataObj.schoolclass_id = $('#select-schoolclass').val();
        // dataObj.grade_code = $('#select-grade').val();
        // dataObj.subject_code = $('#select-subject').val();
        // dataObj.tasktag_ids = $('#select-tasktags').val();
        //
        // var taskkinds = [];
        // taskkinds.push('1');
        // taskkinds.push('2');
        // taskkinds.push('3');
        // taskkinds.push('4');
        // taskkinds.sort();
        // dataObj.taskkinds = taskkinds;
        //
        // var task_status = [];
        // task_status.push('0');
        // task_status.push('1');
        // task_status.push('2');
        // task_status.sort();
        // dataObj.task_status = task_status;
        //
        // dataObj.length = "10";
        // dataObj.start = "0";
        // dataObj.draw = "1";
        // $.ajax({
        //     url:  '/admin/banwu/get-task-list',
        //     type: "POST",
        //     data: dataObj,
        //     success: function (data) {
        //         var obj = jQuery.parseJSON(data);
        //         var r = jQuery.parseJSON(obj.data);
        //         alert(r.data.length);
        //         if (r.data.length > 0) {
        //             alert(r.data);
        //         } else {
        //             alert('not find');
        //         }
        //
        //         // //新闻资讯
        //         // var aHour, aDate, aCourse, aTitle;
        //         //
        //         // //學生統計
        //         // if (r.student_month_info.length > 0) {
        //         //     //学员报名
        //         //     $("#student_num").text("+"+r.student_month_info[0].student_num);
        //         //     //续费预警
        //         //     $("#pay_num").text(r.student_month_info[0].pay_num);
        //         //     //潛在学员
        //         //     $("#tastudent_num").text(r.student_month_info[0].tastudent_num);
        //         // }
        //         //
        //         // //教室上课时段今日
        //         // if (r.classes_today_info.length > 0) {
        //         //     for (var i = 0; i < r.classes_today_info.length; i++) {
        //         //         aHour   = r.classes_today_info[i].start_time.substring(0,5);
        //         //         aDate   = r.classes_today_info[i].start_date;
        //         //         aCourse = r.classes_today_info[i].classes_name;
        //         //         $("#m-timeline-3__items_today").append('<div class="m-timeline-3__item m-timeline-3__item--info"><span class="m-timeline-3__item-time">'+aHour+'</span><div class="m-timeline-3__item-desc"><span class="m-timeline-3__item-text">'+aDate+'<br>'+aCourse+'</span></div></div>');
        //         //     }
        //         // }
        //         //
        //         // //教室上课时段今月
        //         // if (r.classes_month_info.length > 0) {
        //         //     for (var i = 0; i < r.classes_month_info.length; i++) {
        //         //         aHour   = r.classes_month_info[i].start_time.substring(0,5);
        //         //         aDate   = r.classes_month_info[i].start_date;
        //         //         aCourse = r.classes_month_info[i].classes_name;
        //         //         $("#m-timeline-3__items_month").append('<div class="m-timeline-3__item m-timeline-3__item--info"><span class="m-timeline-3__item-time">'+aHour+'</span><div class="m-timeline-3__item-desc"><span class="m-timeline-3__item-text">'+aDate+'<br>'+aCourse+'</span></div></div>');
        //         //     }
        //         // }
        //         //
        //         // //新聞資訊-機構資訊
        //         // if (r.mynews_info.length > 0) {
        //         //     for (var i = 0; i < r.mynews_info.length; i++) {
        //         //         aHref   = '/admin/news/view/' + r.schoolxnews_info[i].id;
        //         //         aTitle  = r.mynews_info[i].subject;
        //         //         aDate   = r.mynews_info[i].newsdate;
        //         //         $("#m-widget5_mynews").append('<div class="m-widget5__item"><div class="m-widget5__content"><h4 class="m-widget5__title"><a href="'+aHref+'">'+aTitle+'</a></h4><div class="m-widget5__info"><span class="m-widget5__info-date m--font-info">'+aDate+'</span></div></div></div>');
        //         //     }
        //         // }
        //         //
        //         // //新聞資訊-思酷資訊
        //         // if (r.schoolxnews_info.length > 0) {
        //         //     for (var i = 0; i < r.schoolxnews_info.length; i++) {
        //         //         aHref   = '/admin/news/view/' + r.schoolxnews_info[i].id;
        //         //         aTitle  = r.schoolxnews_info[i].subject;
        //         //         aDate   = r.schoolxnews_info[i].newsdate;
        //         //         $("#m-widget5_schoolxnews").append('<div class="m-widget5__item"><div class="m-widget5__content"><h4 class="m-widget5__title"><a href="'+aHref+'">'+aTitle+'</a></h4><div class="m-widget5__info"><span class="m-widget5__info-date m--font-info">'+aDate+'</span></div></div></div>');
        //         //     }
        //         // }
        //
        //     },
        //     error: bs.errorHandler,
        // });


        // 派卷紀錄


        // 行事曆
        $('#m_calendar').fullCalendar({
                // header: {
                //     left: 'prev today next',
                //     center: 'title',
                //     right: 'month,agendaWeek,agendaDay'
                // },
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                dayNames: ['日', '一', '二', '三', '四', '五', '六'],
                dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
                today: ['今天'],
                buttonText: {//設置日曆頭部各按鈕的顯示文本信息
                    today: '今天/本週',
                    month: '月',
                    week: '週',
                    day: '日'
                },
                axisFormat: 'H(:mm)',
                defaultView: 'month',
                allDaySlot: true,
                allDayText: '全天',
                //editable: false,//不能進行編輯
                editable: !1,


                dayClick: function (date, allDay, jsEvent, view) {
                    //呼叫清除状态
                    clearState();

                    var year = new Date().getFullYear();
                    var month = ('0' + (new Date().getMonth() + 1).toString()).slice(-2);
                    var day = ('0' + new Date().getDate()).slice(-2);
                    var hour = ('0' + new Date().getHours()).slice(-2);
                    var minute = ('0' + new Date().getMinutes()).slice(-2);
                    var fullDate = moment(date).format('YYYY-MM-DD') + ' ' + hour + ':' + minute + ':00';

                    var newDate = new Date();
                    newDate.setHours(new Date().getHours() + 1);
                    var month2 = ('0' + (newDate.getMonth() + 1).toString()).slice(-2);
                    var day2 = ('0' + newDate.getDate()).slice(-2);
                    var hour2 = ('0' + newDate.getHours()).slice(-2);
                    var fullDate2 = moment(date).format('YYYY-MM-DD') + ' ' + hour2 + ':' + minute + ':00';

                    $('#start_at').val(fullDate);
                    $('#end_at').val(fullDate2);

                    $('#myModal').modal('show');
                    return false;
                },

                events: function (start, end, timezone, callback) {
                    $.ajax({
                        url: '/admin/school/dashboardcalendarlist',
                        type: 'POST',
                        contentType: 'application/json',
                        cache: false,
                        success: function (result) {
                            var events = [];
                            $.each(result, function (i, data) {
                                events.push({
                                    id: data.id,
                                    title: data.title,
                                    description: data.note,
                                    start: moment(data.start_at).format('YYYY-MM-DD HH:mm:ss'),
                                    end: moment(data.end_at).format('YYYY-MM-DD HH:mm:ss'),
                                    className: 'm-fc-event--solid-primary',
                                    // backgroundColor: "#9501fc",
                                    // borderColor: "#fc0101"
                                });
                            });
                            callback(events);
                        }
                    });
                },

                eventClick: function (event) {
                    if (event.id === '') {
                        return;
                    }
                    $('#eventId').val(event.id);

                    var dataObj = {};
                    dataObj.id = $('#eventId').val();
                    $.ajax({
                        url: '/admin/school/dashboardcalendardata',
                        data: JSON.stringify({'data': dataObj}),
                        type: 'POST',
                        contentType: 'application/json',
                        cache: false,
                        success: function (r) {
                            $('#eventId').val(r[0].id);
                            $('#title').val(r[0].title);
                            $('#start_at').val(r[0].start_at);
                            $('#end_at').val(r[0].end_at);
                            $('#note').val(r[0].note);
                            $('#btnDel').show();

                            //彈跳班級視窗
                            $('#myModal').modal('show');
                        },
                        error: bs.errorHandler,
                    });
                    return false;
                },

                eventRender: function (event, el) {
                    return '<a class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable"><div class="fc-content"> <span class="fc-title">' + event.title + '</span></div><div class="fc-resizer fc-end-resizer"></div></a>';
                },

            }
        );

        checkSchoolExpire();
    }

    function checkSchoolExpire(){
        $.ajax({
            url: '/admin/school/school-end-check',
            type: 'POST',
            success: function(res){
                var response = res.data;

                for(var i=0; i<response.length; i++){
                    var content_html = '您的系統使用期限即將到期，請與業務夥伴聯繫';
                    alert(content_html);
                }

                if(response.length > 0){
                    afterSchoolAlert(response);
                }

            },
            error: bs.errorHandler
        });
    }

    function afterSchoolAlert(update_data){
        $.ajax({
            url: '/admin/school/update-school-alert',
            type: 'POST',
            data: {alert_change : update_data},
            success: function(res){

            },
            error: bs.errorHandler
        });
    }

});
