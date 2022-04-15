$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        multiTbSet();

        $('#btn-set').on('click', function(e) {
            e.preventDefault();
            swal({
                title: '更新學生資料',
                text: '確定要更新學生資料？',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                setStudenInfo();
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });
    }

    function multiTbSet() {

        var dataObj = {};
        dataObj.school_class_ary = [];
        dataObj.school_class_ary.push(bs.getUrlVar('cid'));

        dataObj.levelAry = ['00', 'A', 'B', 'C'];
        dataObj.facAry = ['-1', '1', '2', '3','4','5','6','7','8'];
        dataObj.type='all';

        $.ajax({
            url: '/admin/quizpaper/sendpaper-user-list',
            type: 'post',
            data: dataObj,
            success: function(res) {

                $('#tbList2').html('');

                $.each(res.data, function(key, item) {
                    var exam_alive_count=res.data_exam_alive_count[key];
                    var video_alive_count=res.data_video_alive_count[key];
                    $('#span-clsname').text(res.dataname[key]);

                    var html =
                        '<div class="table-responsive">\
                    <table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList2-' + key + '">\
                    <thead>\
                    <tr>\
                    <th></th>\
                    <th>姓名</th>\
                    <th>學號</th>\
                    <th><input type="checkbox" id="allow_exam_check_all"  value="1">測驗<br>剩餘'+exam_alive_count+'</th>\
                    <th><input type="checkbox" id="allow_video_check_all" value="1">影片<br>剩餘'+video_alive_count+'</th>\
                    <th>座號</th>\
                    <th>學生程度</th>\
                    <th>教材版本</th>\
                    <th>前次測驗成績</th>\
                        </tr>\
                    </thead>\
                    <tfoot></tfoot>\
                    </table>\
                    </div>';

                    $('#tbList2').append(html);

                    // 選擇學生
                    newObj.tbList2 = $('#tbList2-' + key).DataTable({
                        'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                        'sPaginationType': 'full_numbers',
                        'aLengthMenu': [
                            [10],
                            ['10']
                        ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
                        'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
                        'paging': false, //分頁開關
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
                        'bSort': false,
                        // 'order': [
                        //     [3, 'asc']
                        // ], //指定默認的次序
                        'bInfo': false,
                        'processing': true, //等待加載效果
                        'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                        'serverSide': false,
                        'data': item,
                        'initComplete': function() {

                            newObj.stu_ary = [];
                            this.api().rows().every(function(key) {
                                var item = this.data();
                                var user_id=item[0];
                                var check_allow_exam=item[3];
                                var check_allow_video=item[4];


                                item[3]='<input type="checkbox" id="allow_exam_'+user_id+'" name="allow_exam"  data-index="' + key + '"   value="1">';


                                item[4]='<input type="checkbox" id="allow_video_'+user_id+'" name="allow_video" data-index="' + key + '"  value="1">';

                                item[5] = '<input class="form-control" style="width:100px" maxlength="10" name="txt-seat" data-index="' + key + '" value="' + item[5] + '" />';

                                var level = item[6];
                                var level_0_sel = (level == '未分類') ? 'selected' : '';
                                var level_A_sel = (level == 'A') ? 'selected' : '';
                                var level_B_sel = (level == 'B') ? 'selected' : '';
                                var level_C_sel = (level == 'C') ? 'selected' : '';

                                var select2_html =
                                    '<select class="select2-single select2-level" data-index="' + key + '">\
                                    <option ' + level_0_sel + ' value="00">未分類</option>\
                                    <option ' + level_A_sel + ' value="A">A</option>\
                                    <option ' + level_B_sel + ' value="B">B</option>\
                                    <option ' + level_C_sel + ' value="C">C</option>\
                                 </select>';

                                item[6] = select2_html;

                                var fac = item[7];
                                var fac_0_sel = (fac == '未分類') ? 'selected' : '';
                                var fac_1_sel = (fac == '適南') ? 'selected' : '';
                                var fac_2_sel = (fac == '適康') ? 'selected' : '';
                                var fac_3_sel = (fac == '適翰') ? 'selected' : '';
                                var fac_4_sel = (fac == '龍騰') ? 'selected' : '';
                                var fac_6_sel = (fac == '三民') ? 'selected' : '';
                                var fac_7_sel = (fac == '全華') ? 'selected' : '';
                                var fac_8_sel = (fac == '泰宇') ? 'selected' : '';

                                select2_html =
                                    '<select class="select2-single select2-factory" data-index="' + key + '">\
                                    <option ' + fac_0_sel + ' value="-1">未分類</option>\
                                    <option ' + fac_1_sel + ' value="1">適南</option>\
                                    <option ' + fac_2_sel + ' value="2">適康</option>\
                                    <option ' + fac_3_sel + ' value="3">適翰</option>\
                                    <option ' + fac_4_sel + ' value="4">龍騰</option>\
                                    <option ' + fac_6_sel + ' value="6">三民</option>\
                                    <option ' + fac_7_sel + ' value="7">全華</option>\
                                    <option ' + fac_8_sel + ' value="8">泰宇</option>\
                                 </select>';

                                item[7] = select2_html;

                                this.invalidate();
                                //要等invaldate它生效html才會生成

                                $('input#allow_exam_'+user_id).prop('checked', (check_allow_exam== 1 ? true : false));
                                $('input#allow_video_'+user_id).prop('checked', (check_allow_video== 1 ? true : false));

                                var stu_obj = {};
                                stu_obj.index = key;
                                stu_obj.uid = item[0];
                                stu_obj.allow_exam=($('input#allow_exam_'+user_id+':checked').val() == '1' ? 1 : 0);
                                stu_obj.allow_video=($('input#allow_video_'+user_id+':checked').val() =='1' ? 1: 0);
                                stu_obj.seat_no = $(item[5]).val();
                                stu_obj.level = $(item[6]).val();
                                stu_obj.factory_code = $(item[7]).val();

                                newObj.stu_ary.push(stu_obj);
                            });

                            $('.select2-single').select2({
                                theme: "bootstrap",
                                minimumResultsForSearch: Infinity
                            });

                            $('input[name="allow_exam"]').change(function(e){
                                e.preventDefault();
                               var idx=$(this).attr('data-index');
                               var allow_exam_id=$(this).attr('id');
                               newObj.stu_ary[idx].allow_exam = ($('input#'+allow_exam_id+':checked').val()=='1'?1:0);
                            });

                            $('input[name="allow_video"]').on('change',function(e){
                                e.preventDefault();
                                var idx=$(this).attr('data-index');
                                var allow_video_id=$(this).attr('id');

                                newObj.stu_ary[idx].allow_video=($('input#'+allow_video_id+':checked').val()=='1'?1:0);

                            });

                            $("input#allow_exam_check_all").on('change', function(e) {
                                e.preventDefault();
                                if ($("input#allow_exam_check_all").prop('checked')) {
                                    $('input[name="allow_exam"]').prop('checked', true);
                                    $.each(newObj.stu_ary,function(key,val){
                                        newObj.stu_ary[key].allow_exam=1;
                                    });

                                } else {
                                    $('input[name="allow_exam"]').prop('checked', false);

                                    $.each(newObj.stu_ary,function(key,val){
                                        newObj.stu_ary[key].allow_exam=0;
                                    });
                                }

                            });

                            $("input#allow_video_check_all").on('change', function(e) {
                                e.preventDefault();
                                if ($("input#allow_video_check_all").prop('checked')) {
                                    $('input[name="allow_video"]').prop('checked', true);
                                    $.each(newObj.stu_ary,function(key,val){
                                        newObj.stu_ary[key].allow_video=1;
                                    });
                                } else {
                                    $('input[name="allow_video"]').prop('checked', false);
                                    $.each(newObj.stu_ary,function(key,val){
                                        newObj.stu_ary[key].allow_video=0;
                                    });
                                }

                            });


                            $('input[name="txt-seat"]').on('blur', function(e) {
                                e.preventDefault();
                                var idx = $(this).attr('data-index');
                                newObj.stu_ary[idx].seat_no = $(this).val();
                            });

                            $('.select2-level').on('change', function(e) {
                                e.preventDefault();
                                var idx = $(this).attr('data-index');
                                newObj.stu_ary[idx].level = $(this).val();
                            });

                            $('.select2-factory').on('change', function(e) {
                                e.preventDefault();
                                var idx = $(this).attr('data-index');
                                newObj.stu_ary[idx].factory_code = $(this).val();
                            });

                        },
                        'columnDefs': [{
                            'targets': [0], // column or columns numbers
                            'visible': false, // set orderable for selected columns
                        }],
                        'select': {
                            'style': 'multi'
                        },
                    });
                });

            },
            error: bs.errorHandler
        });
    }

    function setStudenInfo() {

        var dataObj = {};
        dataObj.cid = bs.getUrlVar('cid');
        dataObj.stu_ary = newObj.stu_ary;

        $.ajax({
            url: '/admin/quizpaper/set-user-info',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var msg = res.message;
                if (msg != 'success') {
                    swal(msg);
                    return false;
                }
				location.reload();
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }
});
