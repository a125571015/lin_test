$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        initObj();
        newObj.getQuizpaper();

        $('#btn-cancel').on('click',function(e){
            location.href='/admin/banwu/examstate?id='+bs.getUrlVar('id');
        });

    }

    function initObj() {

        newObj.getQuizpaper = function() {
            $.ajax({
                url: '/admin/exam/get-quizpaper?tid=' + bs.getUrlVar('id'),
                type: 'GET',
                success: function(res) {
                    var quizpaper = res.data;
                    newObj.pid=quizpaper.id;
                    newObj.grade_code=quizpaper.grade_code;
                    $('#papername').html(quizpaper.task_name);
                    getQuizPaperView(JSON.parse(quizpaper.paperdetail));
                    getQuizFullContent(JSON.parse(quizpaper.paperdetail));
                },
                error: bs.errorHandler
            });
        };

    }

    function getQuizPaperView(paperdetail) {
        var quizno_html = '<th colspan="2">題號</th>';
        var score_html = '<th colspan="2">配分</th>';

        $.each(paperdetail.quiz_content, function(key, item) {
            var no=(item.index+1);
            var score=item.score;
            quizno_html+='<th>'+no+'</th>';
            score_html+='<td>'+score+'</td>';
        });

        $('#thead-quizno').empty().html(quizno_html);
        $('#tbody-score').empty().html(score_html);
    }

    function getQuizFullContent(paperdetail) {
        var dataObj={};
        dataObj.paperdetail=paperdetail;
        $.ajax({
            url: '/admin/exam/get-quiz-full-content',
            type: 'POST',
            data:dataObj,
            success: function(res) {
                var quizContents=res.data;
                var quizans_html = '<th colspan="2">標準答案</th>';
                $.each(quizContents,function(key,item){
                    var sa=item.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'');
                    quizans_html+='<td>'+sa+'</td>'
                });
                $('#tbody-quizans').empty().html(quizans_html);
                getTaskInfo(quizContents);
            },
            error: bs.errorHandler
        });
    }

    function getTaskInfo(quizContents) {
        $.ajax({
            url: '/admin/banwu/get-task-info?id='+bs.getUrlVar('id'),
            type: 'GET',
            success: function(res) {
                var info=res.data;
                $('.task-name').text(info.task_name);
                var users_html='';
                $.each(info.users,function(key,item){
                    var user_id=item.id;
                    var user_name=item.name;
                    var result_detail=item.result_detail;
                    users_html+='<tr>';
                    users_html+='<td><input type="checkbox" name="exam-lose" value="'+user_id+'">&nbsp;缺考</td>';
                    users_html+='<td>'+user_name+'</td>';

                    if (result_detail) {
                        $.each(JSON.parse(result_detail).ans_content,function(key2,item2){
                            var sa=quizContents[key2].sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'');
                            item2.user_ans=item2.user_ans.replace('-','');
                            item2.user_ans=item2.user_ans.replace(/(\;*)/g, '');
                            users_html+='<td><input class="form-control user-input" maxlength="'+sa.length+'" type="text" value="'+item2.user_ans+'"></td>';
                        });
                    }
                    else {
                        $.each(quizContents,function(key2,item2){
                            var sa=item2.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'');
                            users_html+='<td><input class="form-control user-input" maxlength="'+sa.length+'" type="text" value=""></td>';
                        });
                    }

                    users_html+='</tr>';
                });
                $('#tbody-all').append(users_html);

                $('input:checkbox[name="exam-lose"]').on('change',function(e){
                    e.preventDefault();
                    if ($(this).prop('checked')) {
                        $(this).parent().siblings().find('.user-input').attr('disabled',true);
                    }
                    else {
                        $(this).parent().siblings().find('.user-input').attr('disabled',false);
                    }
                });

                $('#tbody-all').find('.user-input').on('keyup',function(e){

                    var alphabet='';

                    if (bs.getNormalGrade(newObj.grade_code)==='E0') {
                        switch ($(this).val()) {
                            case '1':
                            case 'A':
                                alphabet='①';
                                break;
                            case '2':
                            case 'B':
                                alphabet='②';
                                break;
                            case '3':
                            case 'C':
                                alphabet='③';
                                break;
                            case '4':
                            case 'D':
                                alphabet='④';
                                break;
                            case '5':
                            case 'E':
                                alphabet='⑤';
                                break;
                            default:
                                alphabet=$(this).val();
                                break;
                        }
                    }
                    else {
                        for (var i = 0; i < $(this).val().length; i++) {
                            var temp=$(this).val().substr(i,1);
                            if (parseInt(temp)) {
                                alphabet += bs.numToAlphabet(temp);
                            }
                            else {
                                alphabet += temp;
                            }
                        }
                    }

                    $(this).val(alphabet);

                    switch (e.which) {
                        //backspace
                        case 8:
                        //Tab
                        case 9:
                        //shift
                        case 16:
                        //control
                        case 17:
                        //optioin
                        case 18:
                        //space
                        case 32:
                        //left
                        case 37:
                        //up
                        case 38:
                        //right
                        case 39:
                        //down
                        case 40:
                        //cmd
                        case 91:
                            return false;
                            break;
                    }

                    if ($(this).val().length>=parseInt($(this).attr('maxlength'))) {
                        $(this).parent().next().find('input').focus();
                    }

                });

                $('#btn-save').on('click',function(e){
                    calculateScore(quizContents);
                });
            },
            error: bs.errorHandler
        });
    }

    function calculateScore(quizContents){
        var dataObj={};
        dataObj.tid=bs.getUrlVar('id');
        dataObj.pid=newObj.pid;
        dataObj.user_input_ary=[];
        var user_input_ary=[];
        $.each($('#tbody-all tr'),function(key,item){

            if(key==0 || key==1){
                return true;
            }

            if($(item).find('input:checkbox').prop('checked')){
                return true;
            }

            var user_input_obj={};
            user_input_obj.user_id=$(item).find('input:checkbox').val();
            user_input_obj.quiz_state_ary=[];
            var ans_ary=[];
            var inputs=$(item).find('.user-input');
            $.each(inputs,function(key2,item2){
                var quiz_state = {};
                quiz_state.origin_idx = key2;
                quiz_state.data_idx = key2;
                quiz_state.quiz_id = parseInt(quizContents[key2].id);
                quiz_state.checked = 0;
                quiz_state.user_ans = (item2.value)?item2.value.toUpperCase():'-';
                if (quiz_state.user_ans.length>1) {
                    var temp='';
                    for (var i = 0; i < quiz_state.user_ans.length; i++) {
                        temp+=quiz_state.user_ans.substr(i,1)+';';
                    }
                    temp=temp.slice(0,-1);
                    quiz_state.user_ans=temp;
                }
                quiz_state.need_check = 0;
                quiz_state.costsec=0;
                ans_ary.push(quiz_state);
            });
            user_input_obj.quiz_state_ary=ans_ary;
            user_input_ary.push(user_input_obj);
        });
        dataObj.user_input_ary=JSON.stringify(user_input_ary);

        $.ajax({
            url: '/admin/banwu/calculate-score',
            type: 'POST',
            data:dataObj,
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
