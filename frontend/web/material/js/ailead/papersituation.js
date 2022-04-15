$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {

        getExamCondition();

        $('#btn-over').on('click',function(e){
            e.preventDefault();
            overExam();
        });
    }

    function getExamCondition() {
        $.ajax({
            url: '/admin/banwu/get-exam-situation?id='+bs.getUrlVar('id'),
            type: 'GET',
            success: function(res) {
                var taskStatus=res.taskStatus;
                var taskName=res.taskName;
                var className=res.className;
                var info=res.data;
                var paper_detail=res.paper_detail;
                var quiz_ans=res.quiz_ans;

                if (taskStatus==0) {
                    location.replace('/admin/banwu/examstate?id='+bs.getUrlVar('id'));
                }

                $('#class-name').text(className);
                $('#task-name').text(taskName);

                var inner_html='';
                inner_html+='<thead class="thead-light">';
                inner_html+='<tr>';
                inner_html+='<th rowspan="2" class="align-middle">座號</th>';
                inner_html+='<th rowspan="2" class="align-middle">姓名</th>';
                inner_html+='<th rowspan="2" class="align-middle">成績</th>';
                $.each(JSON.parse(paper_detail).quiz_content,function(key,item){
                    inner_html+='<th>'+(key+1)+'</th>';
                });
                inner_html+='</tr>';

                inner_html+='<tr>';
                $.each(quiz_ans,function(key,item){
                    inner_html+='<th>'+item.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '')+'</th>';
                });
                inner_html+='</tr>';
                inner_html+='</thead>';

                inner_html+='<tbody>';
                $.each(info,function(key,item){
                    var seat_no=item.seat_no;
                    var user_name=item.user_name;
                    var allscore=(item.allscore)?item.allscore:'--';
                    var ans_detail=item.detail;

                    inner_html+='<tr>';
                    inner_html+='<td>'+seat_no+'</td>';
                    inner_html+='<td>'+user_name+'</td>';
                    inner_html+='<td>'+allscore+'</td>';
                    if (ans_detail) {
                        $.each(JSON.parse(ans_detail).ans_content,function(key2,item2){
                            var bg_color = (item2.user_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '') == quiz_ans[key2].replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, ''))? 'bg-success' : '';
                            inner_html+='<td class="'+bg_color+'">'+item2.user_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '')+'</td>';
                        });
                    }
                    else {
                        $.each(JSON.parse(paper_detail).quiz_content,function(key2,item2){
                            inner_html+='<td>--</td>';
                        });
                    }
                    inner_html+='</tr>';
                });
                inner_html+='</tbody>';

                $('#table-situation').html('').append(inner_html);

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

});
