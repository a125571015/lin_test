$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        GetMakeupButtonStatus();
        getVideoSituation();
        reloadExamSituation();

        $('#btn-over').on('click',function(e){
            e.preventDefault();
            overExam();
        });

        $('.levellbl').on('click',function(e){
            e.preventDefault();
            $(this).find('input').prop('checked',true);
            checkState();
        });

        $('#show-makeup-open').on('click',function(e){
            e.preventDefault();
            $('#makup-modal').modal('show');
            GetMakeupVideoUser();
        });

        $('#btn-makup-open').on('click',function(e){
            e.preventDefault();
            MakeupOpen();

        });

    }

    function getVideoSituation() {
        $.ajax({
            url: '/admin/banwu/get-video-situation?id='+bs.getUrlVar('id'),
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                // if (res.taskStatus==0) {
                //     location.replace('/admin/banwu/examstate?id='+bs.getUrlVar('id'));
                // }
                $('#class-name').text(res.className);
                $('#task-name').text(res.taskName);
                $('#page_title').text(res.page_title_name);
                var info=res.data;
                var processUserCount=0;
                var unInitUserCount=0;
                var finishUserCount=0;
                $.each(info,function(key,item){
                    if(item.video_state==1){
                        processUserCount++;
                    }
                    if(item.video_state==2){
                        unInitUserCount++;
                    }
                    if(item.video_state==3){
                        finishUserCount++;
                    }
                });
                $('.chkAll').html('&nbsp;'+(finishUserCount+processUserCount+unInitUserCount));
                $('.chkOnline').html('&nbsp;'+processUserCount);
                $('.chkOffline').html('&nbsp;'+unInitUserCount);
                $('.chkAlready').html('&nbsp;'+finishUserCount);

                var innerHtml='';
                var quizCount=0;
                $.each(info,function(key,item){
                    var videoState=item.video_state;
                    var stateText='';
                    var trClass='';
                    var tdClass='';
                    var completeShow=0;
                    //video_state  1 ???????????? 2 ???????????? 3 ???????????? 4 ????????????
                    if (videoState==1) {
                        stateText='?????????';
                        trClass='trOnline';
                        tdClass='tdOnline';
                    }
                    else if (videoState==2){
						stateText='?????????';
						trClass='trOverline';
						tdClass='tdOverline';
                    }else if (videoState==3){
                        stateText='?????????';
                        trClass='trOverline';
                        tdClass='tdOverline';
                    }
					else  {
						stateText='?????????';
                        trClass='trOffline';
                        tdClass='tdOffline';
                        completeShow='--';
					}

                    var seatNo=item.seat_no;
                    var userName=item.user_name;
                    var createdAt=(item.created_at)?item.created_at:'--';
                    var costsec=(item.costsec)?item.costsec:'--';
                    var origin_sec=item.origin_sec;
                    var video_length=item.video_length;
                    var track='';
                    if (item.track) {
                        track=JSON.parse(item.track);
                    }
                    var progress_response=getVideoProgress(track);
                    if (track.length>0) {
                        completeShow=Math.round((progress_response.complete_count / track.length) * 100)+'%';
                    }
                    var track_html=progress_response.re_html;

                    innerHtml+=
                    '<tr class="trBase '+trClass+'">\
                        <td>'+stateText+'</td>\
                        <td>'+seatNo+'</td>\
                        <td>'+userName+'</td>\
                        <td>'+createdAt+'</td>\
                        <td>'+costsec+'</td>\
                        <td>'+completeShow+'</td>\
                        <td style="text-align:left">'+track_html+'</td>\
                    </tr>';
                });
                $('#tbody-situation').html('').append(innerHtml);
                checkState();
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function overExam(){
        $.ajax({
          url: '/admin/banwu/over-exam?id='+bs.getUrlVar('id'),
          type: 'GET',
          beforeSend: function() {
              bs.disableSubmits(true);
          },
          success: function (res) {
              bs.disableSubmits(false);
              location.replace('/admin/banwu/examstate?id='+bs.getUrlVar('id'));
          },
          complete: function() {
              bs.disableSubmits(false);
          },
          error: bs.errorHandler
        });
    }

    function reloadExamSituation(){
        getVideoSituation();
        setTimeout(reloadExamSituation,60000);
    }

    //??????????????????
    function MakeupOpen(){
        var dataObj={};
        var tid=bs.getUrlVar('id');
        dataObj.tid=tid;

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length==0) {
            swal('?????????????????????!,????????????????????????');
            return false;
        }

        var uid='';
        $.each(rows_selected, function(key, item){
            uid+=item+'-';


        });
        uid=uid.slice(0,-1);
        dataObj.uid=uid;

        dataObj.makeup_start_at = 0;
        if ($('input:radio:checked[name="start_at"]').val() == 1) {
            //??????????????????????????????????????????????????????????????????????????????1?????????
            dataObj.makeup_start_at = Math.floor(new Date().getTime() / 1000) - 1;
        } else {
            dataObj.makeup_start_at = Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        }

        dataObj.makeup_end_at = 0;
        var optEnd_at = $('input:radio:checked[name="end_at"]').val();
        if (optEnd_at == '1') {
            dataObj.makeup_end_at = 0;
        } else if (optEnd_at == '2') {
            // var end_date=new Date();
            // end_date.setDate(new Date().getDate()+parseInt($('#txt-enddays').val()));
            // dataObj.end_at=Math.floor(end_date.getTime() / 1000);
            dataObj.makeup_end_at = dataObj.makeup_start_at + (parseInt($('#txt-enddays').val()) * 86400);
        } else if (optEnd_at == '3') {
            dataObj.makeup_end_at = Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
        }



        $.ajax({
            url: '/admin/banwu/makeup-open',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message!='success'){
                    swal(message);
                }else{
                    $('#makup-modal').modal('hide');
                    location.href='/admin/banwu/tasklist';
                }

            },
            error: bs.errorHandler
        });
    };

    function GetMakeupButtonStatus(){
        var dataObj={};
        dataObj.tid=bs.getUrlVar('id');
        $.ajax({
            url: '/admin/banwu/get-makeup-button-status',
            data:dataObj,
            type: 'post',
            success: function(res) {

                if (res.message!='success'){
                    swal(res.message);
                    return false;
                }else{
                   var show_button_status=res.show_button_status;
                   if (show_button_status==0){
                       $('#show-makeup-open').hide();
                   }

                }






            },
            error: bs.errorHandler
        });

    }

    //????????????????????????????????????
    function GetMakeupVideoUser(){
        var dataObj={};
        dataObj.tid=bs.getUrlVar('id');
        $.ajax({
            url: '/admin/banwu/get-makeup-video-user',
            data:dataObj,
            type: 'post',
            success: function(res) {

                if (res.message!='success'){
                    swal(res.message);
                    return false;
                }else{
                    //  var have_lose_user=res.have_lose_user;//?????????????????????????????????
                    var lose_user_info_array=res.lose_user_info_array//????????????????????????


                    newObj.tblist = $('#tbList').DataTable(  {
                            'bJQueryUI': false, //????????????????????????????????????????????????
                            'sPaginationType': 'full_numbers',
                            'aLengthMenu': [[10], ['10']],  //???????????????????????????????????????[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
                            'bLengthChange': false,  //?????????????????????????????????????????????
                            'paging': true, //????????????
                            'oLanguage': {
                                'sLengthMenu': '???????????? _MENU_ ?????????',
                                'sZeroRecords': '?????????????????????',
                                'sInfo': '?????? _START_ ??? _END_ ????????? _TOTAL_ ?????????',
                                'sInfoEmtpy': '??????????????????????????????????????????',
                                'sInfoFiltered': '(????????? _MAX_ )',
                                'sProcessing': '?????????...',
                                'sSearch': '??????',
                                'sUrl': '', //??????????????????????????????oLanguage?????????????????????txt??????????????????Javascript/datatable/dtCH.txt
                                'oPaginate': {
                                    'sFirst': '?????????',
                                    'sPrevious': '????????? ',
                                    'sNext': '????????? ',
                                    'sLast': '????????? '
                                },
                            }, //???????????????
                            'bFilter': false, //???????????????
                            'bSortClasses': true,
                            'bSort': true,
                            'order': [[0, 'desc']], //?????????????????????
                            'bInfo': true,
                            'destroy':true,//????????????????????????tblist???????????????
                            //'sScrollX': '100%', //???????????????
                            //'sScrollY': '60%',
                            //'sScrollX': '2000px',
                            'processing': true,//??????????????????
                            //?????????????????????????????????????????????????????????Datatables????????????
                            'deferRender': true,
                            //==========????????????start
                            //??????ajax?????? ?????? get-exam-condition ???????????????????????????
                            // 'serverSide': true,
                            // 'ajax': {
                            //     'type': 'post',
                            //     'url': '/admin/student/get-school-student-list',
                            //     'data':function(data){
                            //         data.school_id=$('#school_id').val();
                            //         data.grade_code=$('#select-grade').val();
                            //         data.schoolclass_id=$('#select-schoolclass').val();
                            //         data.name=$('#txt-search').val();
                            //     }
                            // },
                            'data': lose_user_info_array,
                            'initComplete': function () {},
                            'columnDefs': [
                                {
                                    'targets': 0,
                                    'width': 1,
                                }, {
                                    'targets': 0,
                                    'checkboxes': {'selectRow': true , 'selectAllPages': false}//?????????data??????json????????? ?????????selectAllPages???false ??????checkbox ???????????????????????????,ajax???????????????
                                }, {
                                    'targets': [0], // column or columns numbers
                                    'orderable': false,  // set orderable for selected columns
                                }
                            ],
                            'select': {
                                'style': 'multi'
                            },
                            'columns': [
                                { data: 'select_user_id' },
                                { data: 'first_name' }

                            ],

                        });



                    jQuery('#date-stime').datetimepicker({
                        step: 30,
                        format: 'Y/m/d H:i'
                    });

                    jQuery('#date-etime').datetimepicker({
                        step: 30,
                        format: 'Y/m/d H:i'
                    });

                    $('#date-stime').on('click', function(e) {
                        e.preventDefault();
                        $('input[name="start_at"][value="2"]').prop('checked', true);
                    });

                    $('#date-etime').on('click', function(e) {
                        e.preventDefault();
                        $('input[name="end_at"][value="3"]').prop('checked', true);
                    });

                }






            },
            error: bs.errorHandler
        });
    }


    function checkState(){
        var value=parseInt($('input:radio:checked[name="level-checkbox"]').val());
        switch (value) {
            case -1:
            $('.trBase').hide();
            $('.trOnline').show();
            $('.trOffline').show();
            $('.trAlready').show();
                break;
            case 1:
            $('.trBase').hide();
            $('.trOnline').show();
            $('.trOffline').hide();
            $('.trAlready').hide();
                break;
            case 2:
            $('.trBase').hide();
            $('.trOnline').hide();
            $('.trOffline').show();
            $('.trAlready').hide();
                break;
            case 3:
            $('.trBase').hide();
            $('.trOnline').hide();
            $('.trOffline').hide();
            $('.trAlready').show();
                break;
            default:
            $('.trBase').show();
            break;
        }
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
