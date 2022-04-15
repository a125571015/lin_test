$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {

        newObj.cid = bs.getUrlVar('cid');
        newObj.uids = bs.getUrlVar('uids');

        getSchool();
        getGradeCode();
        getSchoolTag();
        getTaskTag();



        if (bs.getUrlVar('type') !== 'manual') {
            $('.step3').remove();
            $('.page-title').html('線上派卷');
            $('#sendtypeName').html('任務時間設定');
            $('.online').show();
        } else {
            $('.page-title').html('紙本派卷');
            $('#sendtypeName').html('任務時間設定');
            $('.online').hide();
        }
        $("#sendpaper-wizard").steps({
            headerTag: "h6",
            bodyTag: "section",
            transitionEffect: "fade",
            titleTemplate: '<span class="step">#index#</span> #title#',
            enablePagination: false,
            onStepChanging: function(event, currentIndex, newIndex) {
                if (currentIndex == 0) {
                    var selectCount = 0;
                    //var rows_selected = newObj.tblist.column(0).checkboxes.selected();

                    var rows_selected_length = newObj['tbList2_' + newObj.cid].column(0).checkboxes.selected().length;
                    selectCount += rows_selected_length;

                    if (selectCount == 0) {
                        swal('請至少選擇一個學生');
                        return false;
                    }
                }

                if (currentIndex == 1 && newIndex >= 1) {
                    var radioStart = $('input:radio:checked[name="start_at"]').val();
                    if (radioStart == 2) {
                        if (!$('#date-stime').val()) {
                            swal('請指定開放考試時間');
                            return false;
                        }
                    }
                }


                return true;
            },
            onStepChanged: function(event, currentIndex, priorIndex) {

                if (currentIndex == 0) {
                    $('.cancel-btn').show();
                    $('.prev-btn').hide();
                    $('.next-btn').show();
                    $('.finish-btn').hide();

                }

                if (currentIndex == 1) {
                    $('.cancel-btn').hide();
                    $('.prev-btn').show();
                    $('.next-btn').show();
                    $('.finish-btn').hide();
                    getQuizpaper(bs.getUrlVar('pid'));

                }

                if (currentIndex >= 1) {
                    $('.cancel-btn').hide();
                    $('.prev-btn').show();
                    $('.next-btn').show();
                    $('.finish-btn').hide();

                    var print_html = '';
                    var dd = $('.dd-item');
                    $.each(dd, function(key, item) {
                        print_html +=
                            '<div class="form-check">\
                            <input class="form-check-input" type="radio" name="print-paper" id="print-' + $(item).attr('data-id') + '" value="' + $(item).attr('data-id') + '">\
                            <label class="form-check-label" for="print-' + $(item).attr('data-id') + '">' + $(item).attr('data-pname') + '</label>\
                        </div>';
                    });
                    $('#print-strict').empty('').html(print_html);
                }

                if (bs.getUrlVar('type') === 'manual') {
                    if (currentIndex == 2) {
                        $('.cancel-btn').hide();
                        $('.prev-btn').show();
                        $('.next-btn').hide();
                        $('.finish-btn').show();
                    }
                } else {
                    if (currentIndex == 1) {
                        $('.cancel-btn').hide();
                        $('.prev-btn').show();
                        $('.next-btn').hide();
                        $('.finish-btn').show();
                    }
                }
            }
        });

        initObj();
        $('.off').hide();


        $('.levellbl').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).find('.on').hide();
                $(this).find('.off').show();
            } else {
                $(this).find('.on').show();
                $(this).find('.off').hide();
            }
        });

        $(".cancel-btn").on('click', function(e) {
            e.preventDefault();
            location.href = '/admin/quizpaper';
        });

        $(".prev-btn").on("click", function(e) {
            e.preventDefault();
            $('#sendpaper-wizard').steps("previous");
            $('.steps ul').find('.done').addClass('disabled');
        });

        $(".next-btn").on("click", function(e) {
            e.preventDefault();
            $('#sendpaper-wizard').steps('next');
            $('.steps ul').find('.done').addClass('disabled');
        });

        $(".finish-btn").on("click", function(e) {
            e.preventDefault();

            if (bs.getUrlVar('type') == 'online') {
                var radioStart = $('input:radio:checked[name="start_at"]').val();
                if (radioStart == 2) {
                    if (!$('#date-stime').val()) {
                        swal('請指定開放考試時間');
                        return false;
                    }

                    if ($('#date-stime').val()) {
                        if (new Date($('#date-stime').val()).getTime() < new Date().getTime()) {
                            swal('指定開始時間已過期，請重新指定');
                            return false;
                        }
                    }
                }

                var radioEnd = $('input:radio:checked[name="end_at"]').val();
                if (radioEnd == 2) {
                    if (!$('#txt-enddays').val()) {
                        swal('請輸入考試開始後結束的天數');
                        return false;
                    }

                    if ($('#txt-enddays').val() <= 0) {
                        swal('請輸入正整數');
                        return false;
                    }

                } else if (radioEnd == 3) {
                    if (!$('#date-etime').val()) {
                        swal('請指定結束考試時間');
                        return false;
                    }

                    if ($('#date-etime').val()) {
                        if (new Date($('#date-etime').val()).getTime() < new Date().getTime()) {
                            swal('指定結束時間已過期，請重新指定');
                            return false;
                        }
                    }
                }

                if (radioStart == 2 && radioEnd == 3) {
                    if ($('#date-stime').val() && $('#date-etime').val()) {
                        if (new Date($('#date-etime').val()).getTime() <= new Date($('#date-stime').val()).getTime()) {
                            swal('指定結束時間早於或等於指定開始時間，請重新指定');
                            return false;
                        }
                    }
                }

                var radioEndDeal = $('input:radio:checked[name="end_deal"]').val();
                if (radioEndDeal == 2) {
                    if (!$('#txt-delaydays').val()) {
                        swal('請輸入延續開放天數');
                        return false;
                    }

                    if ($('#txt-delaydays').val() <= 0) {
                        swal('請輸入正整數');
                        return false;
                    }
                }

                var radioExamtimes = $('input:radio:checked[name="exam_times"]').val();
                if (radioEndDeal == 2) {
                    if (!$('#txt-examtimes').val()) {
                        swal('請輸入作答時間');
                        return false;
                    }

                    if ($('#txt-examtimes').val() <= 0) {
                        swal('請輸入正整數');
                        return false;
                    }
                }

            } else {
                if ($('input:checkbox:checked[name="paper_content"]').length == 0) {
                    swal('請至少選擇一種試卷內容');
                    return false;
                }

                if (!$('#txt-filename').val()) {
                    swal('請輸入檔案名稱');
                    return false;
                }
            }

            createTask();
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

        $('.down-btn').on('click', function(e) {
            e.preventDefault();

            if ($('input:checkbox:checked[name="paper_content"]').length == 0) {
                swal('請至少選擇一種試卷內容');
                return false;
            }

            if (!$('#txt-filename').val()) {
                swal('請輸入檔案名稱');
                return false;
            }

            $('#print-modal').modal('show');
        });

        $('.print-btn').on('click', function(e) {
            e.preventDefault();

            $('#print-modal').modal('hide');

            if ($('input:checkbox:checked[name="paper_content"]').length == 0) {
                swal('請至少選擇一種試卷內容');
                return false;
            }

            if (!$('#txt-filename').val()) {
                swal('請輸入檔案名稱');
                return false;
            }

            if ($('input:radio:checked[name="print-paper"]').length == 0) {
                swal('請選擇一份考卷列印');
                return false;
            }

            newObj.call_times = 0;
            $.blockUI({
                message: '<img class="img-fluid" src="/admin/material/images/quizimg/出卷中.gif" />',
                css: {
                    top: '30%',
                    left: '50%',
                    marginLeft: '-45%',
                    width: "90%",
                    cursor: '',
                    border: 'none',
                    background: 'none'
                },
            });
            var myInterval =
                setInterval(
                    function() {
                        exportQuizpaper(myInterval);
                        newObj.call_times++;
                        if (newObj.call_times >= 20) {
                            clearInterval(myInterval);
                            bs.disableSubmits(false);
                            swal('檔案尚未產生完成，請稍候再試。');
                            return false;
                        }
                    }, 5000
                );
        });
    }

    function initObj() {



        newObj.multiTbSet = function() {
            var dataObj = {};
            dataObj.school_class_ary = [];
            dataObj.school_class_ary.push(newObj.cid);
            // var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            // $.each(rows_selected, function(key, item) {
            //     dataObj.school_class_ary.push(item);
            // });

            var levelAry = [];
            $.each($('input:checkbox:checked[name="level-checkbox"]'), function(key, item) {
                levelAry.push(item.value);
            });
            levelAry.sort();
            dataObj.levelAry = levelAry;

            var facAry = [];
            $.each($('input:checkbox:checked[name="fac-checkbox"]'), function(key, item) {
                facAry.push(item.value);
            });
            facAry.sort();
            dataObj.facAry = facAry;
            dataObj.type='exam';
            dataObj.pid=bs.getUrlVar('pid');

            $.ajax({
                url: '/admin/quizpaper/sendpaper-user-list',
                type: 'post',
                data: dataObj,
                success: function(res) {

                    $('#tbList2').html('');
                    $.each(res.data, function(key, item) {
                        var html = '<div class="col-sm-12 m-t-10">\
                        <strong>' + res.dataname[key] + '</strong>\
                        <a href="/admin/schoolclass/schoolclass_detail?cid=' + key + '" target="_blank">調整學生資訊</a>\
                        </div>\
                        <div class="col-sm-12 m-t-10">\
                        <div class="table-responsive">\
                        <table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList2-' + key + '" style="cursor:pointer">\
                        <thead>\
                        <tr>\
                        <th></th>\
                        <th>姓名</th>\
                    	<th>學號</th>\
                    	<th>測驗</th>\
                    	<th>影片</th>\
                    	<th>座號</th>\
                    	<th>學生程度</th>\
                    	<th>教材版本</th>\
                    	<th>前次測驗成績</th>\
                    	<th>作答狀況</th>\
                        </tr>\
                        </thead>\
                        <tfoot></tfoot>\
                        </table>\
                        </div>\
                        </div>';
                        $('#tbList2').append(html);



                        // 選擇學生
                        newObj['tbList2_' + key] = $('#tbList2-' + key).DataTable({
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
                            'bSort': true,
                            'order': [
                                [2, 'asc']
                            ], //指定默認的次序
                            'bInfo': false,
                            'processing': true, //等待加載效果
                            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                            'serverSide': false,
                            'data': item,
                            'initComplete': function() {


                                this.api().rows().every(function() {
                                    var item = this.data();
                                    var check_allow_exam=item[3];
                                    var check_allow_video=item[4];

                                    if (check_allow_exam==1){
                                        item[3]='是';
                                    }else{
                                        item[3]='否';
                                    };

                                    if (check_allow_video==1){
                                        item[4]='是';
                                    }else{
                                        item[4]='否';
                                    };
                                    this.invalidate();
                                    //要等invaldate它生效html才會生成
                                });
                                this.api().column(0).checkboxes.select();




                                if (newObj.uids) {

                                    this.api().column(0).checkboxes.deselect();
                                    var i = 0;
                                    this.api().rows().every(function(key_sel) {

                                        if (newObj.uids.split('-').indexOf(item[key_sel][0]) > -1) {
                                            this.row().cell(':eq(' + i + ')', null, {
                                                page: 'current'
                                            }).checkboxes.select();
                                        }
                                        i+=10;
                                        //i加的數字為多少欄

                                    });
                                }


                            },
                            'columnDefs': [{
                                'targets': 0,
                                'checkboxes': {
                                    'selectRow': true,
                                    'checked': true
                                }
                            }, {
                                'targets': [0], // column or columns numbers
                                'orderable': false, // set orderable for selected columns
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
        newObj.multiTbSet();

        $('input:checkbox:checked[name="fac-checkbox"]').on('change', function(e) {
            e.preventDefault();
            newObj.multiTbSet();
        });

        $('input:checkbox:checked[name="level-checkbox"]').on('change', function(e) {
            e.preventDefault();
            newObj.multiTbSet();
        });

    }

    function getSchool() {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
                // index.php
                $('#select-school option').remove();
                $('#select-school').append('<option value="-1">選擇機構</option>');
                $.each(res, function(key, item) {
                    $('#select-school').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-school').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getGradeCode() {

        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {
                // index.php
                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getSchoolTag() {
        $.ajax({
            url: '/admin/quizpaper/get-school-tag',
            type: 'post',
            success: function(res) {
                // index.php
                $('#select-schooltags option').remove();
                $.each(res, function(key, item) {
                    $('#select-schooltags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#select-schooltags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇班級標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });

            },
            error: bs.errorHandler
        });
    }

    function getTaskTag() {
        $.ajax({
            url: '/admin/quizpaper/get-task-tag',
            type: 'post',
            success: function(res) {
                // index.php
                $('#select-tasktags option').remove();
                $.each(res, function(key, item) {
                    $('#select-tasktags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#select-tasktags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇任務標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });

            },
            error: bs.errorHandler
        });
    }

    function getQuizpaper(pid) {
        var dataObj = {};
        dataObj.pidAry = pid.split('-');
        var user_id_ary=[];
        var rows_selected2 = newObj['tbList2_' + newObj.cid].column(0).checkboxes.selected();
        $.each(rows_selected2, function(key2, item2) {
            user_id_ary.push(item2);
        });

        dataObj.uidAry=user_id_ary;

        $.ajax({
            url: '/admin/quizpaper/get-quizpaper-multi',
            type: 'post',
            data: dataObj,
            success: function(res) {
                var innerHtml = '<ol class="dd-list">';
                $.each(res, function(key, item) {
                    innerHtml +=
                        '<li class="dd-item" data-id="' + item.id + '" data-pname="' + item.papername + '">\
                        <div class="dd-handle" style="background-color:#D8D8D8;color:black">\
                            <span class="pnum">' + (key + 1) + '</span><span>.</span>\
                            <span style="display:inline-block;width:210px" class="edit-text">' + item.papername + '</span>\
                            <input style="display:none;width:210px" class="dd-nodrag edit-input" value="' + item.papername + '" />\
                            <span class="dd-nodrag btn-orange btn-sm edit-btn">修改名稱</span>\
                            <span style="display:none" class="dd-nodrag btn-orange btn-sm save-btn">確定</span>\
                            <a class="dd-nodrag btn-orange btn-sm" href="/admin/quizpaper/paperview?id=' + item.id + '" target="_blank">檢視考卷</a>\
                        </div>\
                    </li>';
                });
                innerHtml += '</ol>';
                $('#nestable_list_1').html('').append(innerHtml);

                $('#nestable_list_1').nestable({
                    maxDepth: 1
                });

                $('#nestable_list_1').on('change', function(e) {
                    $.each($('.pnum'), function(key, item) {
                        $(item).html(key + 1);
                    })
                });

                $('.edit-btn').on('click', function(e) {
                    e.preventDefault();
                    $(this).parent().find('.edit-text').hide();
                    $(this).parent().find('.edit-btn').hide();
                    $(this).parent().find('.edit-input').show();
                    $(this).parent().find('.save-btn').show();
                    $(this).hide();
                });

                $('.save-btn').on('click', function(e) {
                    e.preventDefault();
                    $(this).parent().find('.edit-text').show();
                    $(this).parent().find('.edit-text').text($(this).parent().find('.edit-input').val());
                    $(this).parent().parent().attr('data-pname', $(this).parent().find('.edit-input').val());
                    $(this).parent().find('.edit-btn').show();
                    $(this).parent().find('.edit-input').hide();
                    $(this).parent().find('.save-btn').hide();
                    $(this).hide();
                });


            },
            error: bs.errorHandler
        });
    }

    function exportQuizpaper(myInterval) {
        var dataObj = {};

        dataObj.pidAry = [];
        var pid = $('input:radio:checked[name="print-paper"]').val();
        dataObj.pidAry.push(pid);

        dataObj.size = 0;
        var size = $('input:radio:checked[name="size"]').val();
        if (size) {
            dataObj.size = size;
        }

        dataObj.typeset = 0;
        var typeset = $('input:radio:checked[name="typeset"]').val();
        if (typeset) {
            dataObj.typeset = typeset;
        }

        var paper_content = [];
        $.each($('input:checkbox:checked[name="paper_content"]'), function(key, item) {
            paper_content.push(item.value);
        });
        paper_content.sort();
        dataObj.paper_content = paper_content;

        dataObj.filename = '';
        var filename = $('#txt-filename').val();
        if (filename) {
            dataObj.filename = $('#txt-filename').val();
        }

        dataObj.filetype = 0;
        var filetype = $('input:radio:checked[name="filetype"]').val();
        if (filetype) {
            dataObj.filetype = filetype;
        }

        $.ajax({
            url: '/admin/quizpaper/export-quizpaper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message != 'success' && message != 'continue') {
                    clearInterval(myInterval);
                    bs.disableSubmits(false);
                    swal(message);
                    return false;
                } else if (message == 'success') {
                    clearInterval(myInterval);
                    bs.disableSubmits(false);
                    setTimeout(function() {
                        location.href = res.url;
                    }, 500);
                }
            },
            error: bs.errorHandler
        });
    }

    function createTask() {

        var dataObj = {};

        dataObj.task_kind_id = 0;
        if (bs.getUrlVar('type') == 'online') {
            dataObj.task_kind_id = 1;
        } else {
            dataObj.task_kind_id = 2;
        }

        dataObj.school_class_ary = [];
        dataObj.school_class_ary.push(newObj.cid);

        // var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        // $.each(rows_selected, function(key, item) {
        //     dataObj.school_class_ary.push(item);
        // });
        // dataObj.school_class_ary.sort();

        dataObj.user_id_obj = {};
        var user_id_ary = [];

        var rows_selected2 = newObj['tbList2_' + newObj.cid].column(0).checkboxes.selected();
        $.each(rows_selected2, function(key2, item2) {
            user_id_ary.push(item2);
        });
        user_id_ary.sort();
        dataObj.user_id_obj[newObj.cid] = user_id_ary;



        // 試卷編號已有排序，此處不做
        //20200330 名稱要加上排序號
        dataObj.pidAry = [];
        var dd = $('.dd-item');
        $.each(dd, function(key, item) {
            dataObj.pidAry.push([$(item).attr('data-id'), $(item).find('.pnum').text() + '. ' + $(item).attr('data-pname')]);
        });

        dataObj.tasktagAry = [];
        var tagObj = $('#select-tasktags').select2('data');
        $.each(tagObj, function(key, item) {
            dataObj.tasktagAry.push(item.text);
        });
        dataObj.tasktagAry.sort();

        dataObj.start_at = 0;
        if ($('input:radio:checked[name="start_at"]').val() == 1) {
            //立即開始，但是派完進任務清單看不到被視為未派出，故減1秒緩衝
            dataObj.start_at = Math.floor(new Date().getTime() / 1000) - 1;
        } else {
            dataObj.start_at = Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        }

        dataObj.end_at = 0;
        var optEnd_at = $('input:radio:checked[name="end_at"]').val();
        if (optEnd_at == '1') {
            dataObj.end_at = 0;
        } else if (optEnd_at == '2') {
            // var end_date=new Date();
            // end_date.setDate(new Date().getDate()+parseInt($('#txt-enddays').val()));
            // dataObj.end_at=Math.floor(end_date.getTime() / 1000);
            dataObj.end_at = dataObj.start_at + (parseInt($('#txt-enddays').val()) * 86400);
        } else {
            dataObj.end_at = Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
        }

        dataObj.end_deal = 0;
        var end_deal = $('input:radio:checked[name="end_deal"]').val();
        if (end_deal == 1) {
            dataObj.end_deal = 0;
        } else if (end_deal == 2) {
            dataObj.end_deal = parseInt($('#txt-delaydays').val());
        } else {
            dataObj.end_deal = -1;
        }

        if (dataObj.task_kind_id == 2) {
            dataObj.end_at = 0;
            dataObj.end_deal = 0;
        }

        dataObj.exam_times = 0;
        var exam_times = $('input:radio:checked[name="exam_times"]').val();
        if (exam_times == 1) {
            dataObj.exam_times = 0;
        } else {
            dataObj.exam_times = parseInt($('#txt-examtimes').val());
        }

        dataObj.option_randstate = $('input:radio:checked[name="option_randstate"]').val();
        dataObj.quiz_randstate = $('input:radio:checked[name="quiz_randstate"]').val();
        dataObj.send_state = $('input:radio:checked[name="send_state"]').val();

        dataObj.size = 0;
        var size = $('input:radio:checked[name="size"]').val();
        if (size) {
            dataObj.size = size;
        }

        dataObj.typeset = 0;
        var typeset = $('input:radio:checked[name="typeset"]').val();
        if (typeset) {
            dataObj.typeset = typeset;
        }

        var paper_content = [];
        $.each($('input:checkbox:checked[name="paper_content"]'), function(key, item) {
            paper_content.push(item.value);
        });
        paper_content.sort();
        dataObj.paper_content = paper_content;

        dataObj.filename = '';
        var filename = $('#txt-filename').val();
        if (filename) {
            dataObj.filename = $('#txt-filename').val();
        }

        dataObj.filetype = 0;
        var filetype = $('input:radio:checked[name="filetype"]').val();
        if (filetype) {
            dataObj.filetype = filetype;
        }

        $.ajax({
            url: '/admin/quizpaper/create-person-task',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);

                location.replace('/admin/banwu/tasklist');
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });

    }
});
