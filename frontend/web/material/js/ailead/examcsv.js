$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {

        $('#btn-cancel').on('click', function(e) {
            location.href = '/admin/banwu/examstate?id=' + bs.getUrlVar('id');
        });

        $('#btn-check').on('click', function(e) {
            e.preventDefault();
            checkCSV();
        });

        $('#btn-import').on('click',function(e){
            e.preventDefault();
            calculateScore();
        });

    }

    function checkCSV() {

        var formdata = new FormData();
        formdata.append('id',bs.getUrlVar('id'));
        var files = $("#file-upload").get(0).files;
        if (files.length > 0) {
            formdata.append("file", files[0]);
        }

        $.ajax({
            url: '/admin/banwu/examcsv-check',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(response) {
                var res =response.data;
                var tid=res.tid;
                var pid=res.pid;
                var normal_grade=res.normal_grade;
                var user_input_ary=res.user_input_ary;
                var display_ary=res.display_ary;
                var quiz_count=res.quiz_count;
                var valid=res.valid;

                var check_html='<table class="table table-bordered text-nowrap quiz-group">';
                var th_html='';
                for (var i = 0; i < quiz_count; i++) {
                    th_html+='<th>'+(i+1)+'</th>';
                }
                check_html+=
                '<tr>\
                <th>學號</th>\
                '+th_html+'\
                <th>訊息</th>\
                </tr>';
                $.each(display_ary,function(key,item){
                    check_html+='<tr>';
                    check_html+='<td>'+item['學號']+'</td>';
                    for (var i = 0; i < quiz_count; i++) {
                        if (!item[i+1]) {
                            item[i+1]='';
                        }
                        var ans_val='';
                        if (normal_grade=='E0') {
                            switch (item[i+1].toString()) {
                                case '1':
                                case 'A':
                                    ans_val='①';
                                    break;
                                case '2':
                                case 'B':
                                    ans_val='②';
                                    break;
                                case '3':
                                case 'C':
                                    ans_val='③';
                                    break;
                                case '4':
                                case 'D':
                                    ans_val='④';
                                    break;
                                case '5':
                                case 'E':
                                    ans_val='⑤';
                                    break;
                                default:
                                    ans_val=item[i+1];
                                    break;
                            }
                        }
                        else {
                            if (parseInt(item[i+1])) {
                                ans_val = bs.numToAlphabet(item[i+1]);
                            }
                            else {
                                ans_val=item[i+1];
                            }
                        }

                        check_html+='<td>'+ans_val+'</td>';
                    }
                    check_html+='<td>'+item['message']+'</td>';
                    check_html+='</tr>';
                });
                check_html+='</table>';
                $('#table-check').empty().html(check_html);

                if (valid==1) {
                    $('#btn-import').show();
                    newObj.tid=tid;
                    newObj.pid=pid;

                    $.each(user_input_ary,function(key){
                        $.each(user_input_ary[key].quiz_state_ary,function(key2){
                            if (user_input_ary[key].quiz_state_ary[key2].user_ans.length>1) {
                                var temp='';
                                for (var i = 0; i < user_input_ary[key].quiz_state_ary[key2].user_ans.length; i++) {
                                    temp+=user_input_ary[key].quiz_state_ary[key2].user_ans.substr(i,1)+';';
                                }
                                temp=temp.slice(0,-1);
                                user_input_ary[key].quiz_state_ary[key2].user_ans=temp;
                            }
                        });
                    });

                    newObj.user_input_ary=user_input_ary;
                }
                else {
                    $('#btn-import').hide();
                }

            },
            error: bs.errorHandler
        });
    };


    function calculateScore() {
        var dataObj = {};
        dataObj.tid = newObj.tid;
        dataObj.pid = newObj.pid;
        dataObj.user_input_ary = JSON.stringify(newObj.user_input_ary);

        $.ajax({
            url: '/admin/banwu/calculate-score',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                location.replace('/admin/banwu/examstate?id=' + bs.getUrlVar('id'));
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

});
