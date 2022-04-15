$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        geteplimitSchoolclass();
        initObj();
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
            'order': [[4, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/stuvideo/get-videorecord',
                'type':'POST',
                'data': function(data) {
                    // data.schoolclass_detail_id = newObj.id;
                    data.schoolclass_id = $('#select-schoolclass').val();
                    data.stime = $('#date-stime').val();
                    data.etime = $('#date-etime').val();
                    data.collected = ($('input:checkbox:checked[name="video-collected"]').val()) ? 1 : -1;
                }
            },
            'initComplete': function() {

				$('#tbList tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }
                });


                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#video-collected').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                jQuery('#date-stime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker: false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });

                jQuery('#date-etime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker: false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                    }
                });

            },
            'drawCallback': function() {
                $('.video-collect').on('click', function(e) {
                    var record_id = $(this).attr('recordid');
                    videoCollect(record_id);
                });
            },
            'columnDefs':
            [
            {
                'targets': [0],
                'orderable': false, // set orderable for selected columns
                'data': function(row, type, set, meta){
                    //row[0] = videorecord_id, row[12] = check_collect
                    var check_collect = row[12];
                    var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
                    if (row[13]==1){
                        return '<div id="vrecord_'+row[0]+'" class="video-collect" recordid="'+row[0]+'" style="display:inline-block;cursor:pointer;color:red">' + collect_html + '</div>';
                    }else{
                        return '';
                    }

                },
            },
            {
                'targets': [2],
                'data': function(row, type, set, meta){
                    //row[10] = schoolclass_id, row[11] = classinfo_id row[13]=check_role
                    if(row[10] && row[11]){

                        if (row[13]==1){
                            return '<a href="/admin/exam/videoexam?cid='+ row[10] +'&fid='+ row[11] +'&kind='+row[14]+'" target="_blank">' + row[2] + '</a>';
                        }else{
                            return row[2];
                        }

                    }else{
                        return row[2];
                    }
                },
            },
            {
                'targets': [3],
                'data': function(row, type, set, meta){
                    //row[3] = task_id
                    var taskState=row[3];
                    var video_kind=row[14];
                    let stateText='';
                    if (taskState!=0) {
                        stateText='老師指定';
                    }
                    else  {
                        if (video_kind==3){
                            stateText='弱點補強影片';
                        }else {
                            stateText='自選影片';
                        }

                    }

                    return stateText;
                },
            },
            {
                'targets': [6],
                'data': function(row, type, set, meta){
                    //row[8] = track
                    var track = '';
                    if (row[8]) {
                        track=JSON.parse(row[8]);
                    }
                    var completeShow=0;
                    var progress_response=getVideoProgress_simple(track);
                    if (track.length>0) {
                        completeShow=Math.round((progress_response.complete_count / track.length) * 100)+'%';
                    }
                    return completeShow;
                },
            },
            ],
            // 'select': {
            //     'style': 'multi'
            // },
        });
    }

    function geteplimitSchoolclass() {
        var dataObj = {};
        dataObj.type='video';
        $.ajax({
            url: '/admin/quizpaper/geteplimit-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {
                newObj.schoolclass_list = res;
                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                $.each(res, function(key, item) {
                    if (item.name.indexOf('結')!=-1) {return;}
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

    function getVideoProgress_simple(track){
        var response={};
        var complete_count=0;
        if (track) {
            $.each(track,function(key,item){
                if (item.status=='1') {
                    complete_count++;
                }
            });
        }
        response.complete_count=complete_count;
        return response;
    }

    function videoCollect(recordid){
        var dataObj={};
        dataObj.record_id=recordid;
        $.ajax({
            url: '/admin/stuvideo/set-video-collect',
            type: 'GET',
            data: dataObj,
            success: function (res) {
                var msg=res.message;
                var check_collect=res.check_collect;
                if (msg!='success') {
                    swal(msg);
                    return false;
                }
                var collect_html=check_collect==1?'<i class="fa fa-heart fa-2x"></i>':'<i class="fa fa-heart-o fa-2x"></i>';
                $('#vrecord_'+recordid).html(collect_html);
            },
            error: bs.errorHandler
        });
    }
});
