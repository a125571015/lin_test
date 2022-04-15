$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        getExamSituation();
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

    }

    function getExamSituation() {
        $.ajax({
            url: '/admin/banwu/get-exam-situation?id='+bs.getUrlVar('id'),
            type: 'GET',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                if (res.taskStatus==0) {
                    location.replace('/admin/banwu/examstate?id='+bs.getUrlVar('id'));
                }
                $('#class-name').text(res.className);
                $('#task-name').text(res.taskName);
                var info=res.data;
                var quiz_ans=res.quiz_ans;
                var processUserCount=0;
                var unInitUserCount=0;
                var finishUserCount=0;
                $.each(info,function(key,item){
                    if(item.quiz_state==1){
                        processUserCount++;
                    }
                    if(item.quiz_state==2){
                        unInitUserCount++;
                    }
                    if(item.quiz_state==3){
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
                    var quizState=item.quiz_state;
                    var trClass='';
                    var tdClass='';
                    var completeShow=0;
                    if (quizState==1) {
                        trClass='trOnline';
                        tdClass='tdOnline';
                    }
                    else if (quizState==2){
                        trClass='trOffline';
                        tdClass='tdOffline';
                        completeShow='--';
                    }
                    else {
                        trClass='trAlready';
                        tdClass='tdAlready';
                        completeShow=item.allscore+'分';
                    }
                    var seatNo=item.seat_no;
                    var link_mark_l = '';
                    var link_mark_r = '';
                    if(item.result_id != null){
                        link_mark_l = '<a target="_blank" href="/admin/exam/result?rid='+item.result_id+'">';
                        link_mark_r = '</a>';
                    }
                    var userName=link_mark_l + item.user_name + link_mark_r;
                    var createdAt=(item.created_at)?item.created_at:'--';
                    var examTimes=(item.exam_times)?item.exam_times:'--';


                    var ansFullHtml='';
                    var groupHtml=$('<div></div>');
                    var ansHtml='';

                    if (item.detail) {
                        var detail=JSON.parse(item.detail);
                        var ansContent= detail.ans_content;
                        ansContent = ansContent.sort(function (a, b) {
                            return parseInt(a.origin_idx) > parseInt(b.origin_idx) ? 1 : -1;
                        });
                        quizCount=ansContent.length;
                        var checkedCount=0;
                        $.each(ansContent,function(key2,item2){
                            var originIndex=item2.origin_idx;
                            var bgColor='';
                            if (item2.checked==1) {
                                bgColor='#CEE3F6';
                                checkedCount++;

                                if(item2.user_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '') == quiz_ans[key2].replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '')){
                                    bgColor='#6fd088';
                                }
                            }
                            else {
                                bgColor='white';
                            }

                            if (item.current_quiz_id==item2.quiz_id) {
                                bgColor='#81BEF7';
                            }

                            ansHtml+='<button class="btn btn-default white" type="button" data-idx="'+originIndex+'" style="background-color:'+bgColor+'">'+(parseInt(originIndex)+1)+'</button>&nbsp;';

                            if(key2!=0 && ((key2+1)%5)==0){
                                groupHtml.append(ansHtml);
                                ansFullHtml+='<div class="btn">' + groupHtml.html() + '</div>';
                                groupHtml.empty();
                                ansHtml='';
                            }
                        });

                        if (ansHtml != '') {
                            var divGroup = $('<div></div>');
                            divGroup.append(ansHtml);
                            ansFullHtml += '<div class="btn">' + divGroup.html() + '</div>';
                            ansHtml = '';
                        }

                        if (quizState==1) {
                            if (quizCount!=0) {
                                completeShow=Math.round((checkedCount / quizCount) * 100)+'%';
                            }
                        }

                    }
                    else {
                        for (var i = 0; i < quizCount; i++) {
                            ansHtml+='<button class="btn btn-default white" type="button" data-idx="'+(i+1)+'" style="background-color:white">'+(i+1)+'</button>&nbsp;';

                            if(i!=0 && ((i+1)%5)==0){
                                groupHtml.append(ansHtml);
                                ansFullHtml+='<div class="btn">' + groupHtml.html() + '</div>';
                                groupHtml.empty();
                                ansHtml='';
                            }
                        }

                        if (ansHtml != '') {
                            var divGroup = $('<div></div>');
                            divGroup.append(ansHtml);
                            ansFullHtml += '<div class="btn">' + divGroup.html() + '</div>';
                            ansHtml = '';
                        }
                    }

                    innerHtml+=
                    '<tr class="trBase '+trClass+'">\
                        <td class="'+tdClass+'"></td>\
                        <td>'+seatNo+'</td>\
                        <td>'+userName+'</td>\
                        <td>'+createdAt+'</td>\
                        <td>'+examTimes+'</td>\
                        <td>'+completeShow+'</td>\
                        <td>'+ansFullHtml+'</td>\
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
        getExamSituation();
        setTimeout(reloadExamSituation,10000);
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
});
