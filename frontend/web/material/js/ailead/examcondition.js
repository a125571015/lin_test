$(function() {
    'use strict';
    var newObj = {};
    function init() {
        initObj();
        newObj.getExamCondition();

        $('#show-makeup-open').on('click',function(e){
            e.preventDefault();
            $('#makup-modal').modal('show');

        });

        $('#makeup-close').on('click',function(e){
            e.preventDefault();

            swal({
                title: '確定關閉補考嗎？,缺考不補考後永遠不會在開啟補考功能!',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>取消</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                MakeupClose();
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });




        });

        $('#btn-makup-open').on('click',function(e){
            e.preventDefault();
            MakeupOpen();

        });


    }

    function initObj() {

        newObj.getExamCondition = function() {
            $.ajax({
                url: '/admin/banwu/get-exam-condition?id='+bs.getUrlVar('id'),
                type: 'GET',
                success: function(res) {

                    newObj.testdata=res;
                    var info=res.data;
                    var quiz_ans=res.quiz_ans;
                    var task_name=res.task_name;


                    var have_lose_user=res.have_lose_user;//判斷顯示不顯示缺考按鈕
                    var lose_user_info_array=res.lose_user_info_array//取得缺考人員名單


                    newObj.tblist = $('#tbList').DataTable(  {
                        'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                        'sPaginationType': 'full_numbers',
                        'aLengthMenu': [[10], ['10']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
                        'order': [[0, 'desc']], //指定默認的次序
                        'bInfo': true,
                        'destroy':false,//上一步下一步時把tblist吹毀並重整
                        //'sScrollX': '100%', //橫向滾動條
                        //'sScrollY': '60%',
                        //'sScrollX': '2000px',
                        'processing': true,//等待加載效果
                        //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                        'deferRender': true,
                        //==========請求數據start
                        //不用ajax取得 在上 get-exam-condition 已取得缺考學生資料
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
                                'checkboxes': {'selectRow': true, 'selectAllPages': false}//如果是data是用json傳的話 就要加selectAllPages：false 避免checkbox 全選所有頁面的資料,ajax傳的不用加
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







                    newObj.lose_user_info_array=lose_user_info_array;

                    if (have_lose_user==0){
                        $('#show-makeup-open').hide();
                        $('#makeup-close').hide();
                    }

                    $('#page_title').text(task_name);
                    var inner_html='';
                    inner_html+='<thead class="thead-light">';
                    inner_html+='<tr>';
                    inner_html+='<th rowspan="2" class="align-middle">班級排名</th>';
                    // inner_html+='<th>全國排名</th>';
                    inner_html+='<th rowspan="2" class="align-middle">姓名</th>';
                    inner_html+='<th rowspan="2" class="align-middle">成績</th>';
                    inner_html+='<th rowspan="2" class="align-middle">複習率</th>';
                    inner_html+='<th rowspan="2" class="align-middle">已複習</th>';
                    inner_html+='<th rowspan="2" class="align-middle">錯題</th>';
                    $.each(info[0].detail,function(key,item){
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
                        var link_mark_l = '';
                        var link_mark_r = '';
                        if(item.result_id != null){
                            link_mark_l = '<a target="_blank" href="/admin/exam/result?rid='+item.result_id+'">';
                            link_mark_r = '</a>';
                        }

                        inner_html+='<tr>';
                        inner_html+='<td>'+item.cls_rank+'</td>';
                        // inner_html+='<td>'+item.all_rank+'/'+item.all_count+'</td>';
                        inner_html+='<td>'+link_mark_l + item.user_name + link_mark_r+'</td>';
                        inner_html+='<td>'+item.allscore+'</td>';
                        inner_html+='<td>'+item.review_percent+'</td>';
                        inner_html+='<td>'+item.review_complete+'</td>';
                        inner_html+='<td>'+item.review_count+'</td>';
                        $.each(item.detail,function(key2,item2){
                            var bg_color = (item2.user_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '') == quiz_ans[key2].replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, ''))? 'bg-success' : '';
                            inner_html+='<td class="'+bg_color+'">'+item2.user_ans.replace(/(\(*)/g, '').replace(/(\)*)/g,'').replace(/(\;*)/g, '')+'</td>';
                        });
                        inner_html+='</tr>';
                    });
                    var cls_right_percent_ary=[];
                    cls_right_percent_ary.push('班級');
                    $.each(info,function(key,item){
                        if (key==0) {
                            inner_html+='<tr>';
                            inner_html+='<td>班級正答率</td>';
                            // inner_html+='<td></td>';
                            inner_html+='<td></td>';
                            inner_html+='<td></td>';
                            inner_html+='<td></td>';
                            inner_html+='<td></td>';
                            inner_html+='<td></td>';
                            $.each(item.detail,function(key2,item2){
								var item2_cls_right_percent = (item2.cls_right_percent!='-')?item2.cls_right_percent+'%':item2.cls_right_percent;
                                inner_html+='<td>'+item2_cls_right_percent+'</td>';
                                cls_right_percent_ary.push(item2.cls_right_percent);
                            });
                            inner_html+='</tr>';
                        }
                    });

                    //先註解全國數據，不要刪
                    // var all_right_percent_ary=[];
                    // all_right_percent_ary.push('全國');
                    // $.each(info,function(key,item){
                    //     if (key==0) {
                    //         inner_html+='<tr>';
                    //         inner_html+='<td>全國正答率</td>';
                    //         inner_html+='<td></td>';
                    //         inner_html+='<td></td>';
                    //         inner_html+='<td></td>';
                    //         $.each(item.detail,function(key2,item2){
					// 			var item2_all_right_percent = (item2.all_right_percent!='-')?item2.all_right_percent+'%':item2.all_right_percent;
                    //             inner_html+='<td>'+ item2_all_right_percent +'</td>';
                    //             all_right_percent_ary.push(item2.all_right_percent);
                    //         });
                    //         inner_html+='</tr>';
                    //     }
                    // });
                    inner_html+='</tbody>';

                    $('#table-rank').html('').append(inner_html);

                    var quiz_ary=[];
                    for (var i = 0; i < info[0].detail.length; i++) {
                        quiz_ary.push(i+1);
                    }


                    c3.generate({
                        bindto: '#score-chart',
                        data: {
                            columns: [
								cls_right_percent_ary
                              // cls_right_percent_ary,all_right_percent_ary
                            ],
                            types: {
                                '班級': 'bar'
                                // '全國': 'line'
                            },
                            colors: {
                                '班級': '#9507a9'
                                // '全國': '#ff5b00'
                          }
                        },
                        bar: {
                          width: {
                            ratio: 0.5 // this makes bar width 50% of length between ticks
                          }
                        },
                        axis: {
                            // rotated: true,
                            x: {
                              type: 'categorized',
                              tick:{
                                multiline:false
                              },
                              categories:quiz_ary
                            },
                            y:{
                              tick: {
                                    format: function (d) { return d + "%"; }
                              },
                              max:91
                            }
                        }
                    });
                },
                error: bs.errorHandler
            });
        }

    }
    init();

    function MakeupOpen(){
        var dataObj={};
        var tid=bs.getUrlVar('id');
        dataObj.tid=tid;

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length==0) {
            swal('請選擇班級學生!,沒有學生無法補考');
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
            //立即開始，但是派完進任務清單看不到被視為未派出，故減1秒緩衝
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
            console.log('test');
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

    function MakeupClose(){
        var dataObj={};
        var tid=bs.getUrlVar('id');
        dataObj.tid=tid;
        $.ajax({
            url: '/admin/banwu/makeup-close',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message!='success'){
                    swal(message);
                }else{
                   swal('已關閉補考功能');
                   location.reload();
                    // $('#makup-modal').modal('close');
                    // location.href='/admin/banwu/tasklist';
                }

            },
            error: bs.errorHandler
        });
    };

});
