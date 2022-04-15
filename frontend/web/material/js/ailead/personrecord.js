$(function() {
    'use strict';
    var newObj = {};
    newObj.check_subject_ary = [];
    var schoolclassObj={};
    schoolclassObj.check_schoolclass_ary=[];
    var protocol = location.protocol;
    var hostname = location.hostname;
    init();

    function init() {
        getSchoolclass();
        getSubjectCode($('#select-schoolclass').val());
        getQuizpaperCategory();
        initObj();

        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();
            getSubjectCode($('#select-schoolclass').val());
        });

        $('#btn-wrong').on('click', function(e) {
            e.preventDefault();
            startWrongPractice();
        });

        if($('#parent_id').val() == parseInt($('#parent_id').val(), 10) && $('#parent_id').val()!=0){
            $('#label-wrong').remove();
            $('#btn-wrong').remove();
        }

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
            'order': [[1, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/stuquiz/get-personrecord',
                'type':'POST',
                'data': function(data) {
                    data.schoolclass_detail_id = newObj.id;
                    data.subject_code = $('#select-subject').val();
                    data.schoolclass_id = $('#select-schoolclass').val();
                    if((protocol + '//' + hostname)=='https://aidux.ailead365.com'){
                        data.quizpaper_category_id = '6';
                    }else{
                        data.quizpaper_category_id = $('#select-category').val();
                    }
                    data.stime = $('#date-stime').val();
                    data.etime = $('#date-etime').val();
                    data.unfinished = ($('input:checkbox:checked[name="chk-unfinished"]').val()) ? 1 : -1;
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
                    if (data[2] == '已交卷') {
                        window.open('/admin/exam/result?rid=' + data[0], '_blank');
                    }
                });

                $('#select-subject').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-category').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#chk-unfinished').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                })

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

                $('.dt-checkboxes-cell').off('change').on('change', function(e) {
                    e.preventDefault();
                    if ($(this).find('.dt-checkboxes').prop('checked')) {
                        if (!findIndexByKey(newObj.check_subject_ary, 'id', newObj.tblist.row(this).data()[0])) {

                            var subject_obj = {};

                            subject_obj.id = newObj.tblist.row(this).data()[0];
                            subject_obj.subject_name = newObj.tblist.row(this).data()[4];
                            newObj.check_subject_ary.push(subject_obj);

                        }

                        if (!findIndexByKey(schoolclassObj.check_schoolclass_ary, 'id', newObj.tblist.row(this).data()[0])) {
                            var schoolclass_obj = {};
                            schoolclass_obj.id = newObj.tblist.row(this).data()[0];
                            schoolclass_obj.schoolclass_id = newObj.tblist.row(this).data()[12];
                            schoolclassObj.check_schoolclass_ary.push(schoolclass_obj);

                        }



                    } else {

                        var index = findIndexByKey(newObj.check_subject_ary, 'id', newObj.tblist.row(this).data()[0]);
                        if (index > -1) {
                            newObj.check_subject_ary.splice(index, 1);
                        }
                        var schoolclass_index=findIndexByKey(schoolclassObj.check_schoolclass_ary, 'id', newObj.tblist.row(this).data()[0]);
                        if (schoolclass_index > -1) {
                            schoolclassObj.check_schoolclass_ary.splice(schoolclass_index, 1);
                        }
                    }
                    checkState();
                });

                $('.dt-checkboxes-select-all').off('change').on('change', function(e) {
                    e.preventDefault();
                    if ($('.dt-checkboxes-select-all').find('input:checkbox').prop('checked')) {
                        $.each(newObj.tblist.rows().data(), function(key, item) {
                            if (!findIndexByKey(newObj.check_subject_ary, 'id', item[0])) {
                                var subject_obj = {};
                                subject_obj.id = item[0];
                                subject_obj.subject_name = item[4];
                                newObj.check_subject_ary.push(subject_obj);

                            }
                            if (!findIndexByKey(schoolclassObj.check_schoolclass_ary, 'id', item[0])) {
                                var schoolclass_obj = {};
                                schoolclass_obj.id = item[0];
                                schoolclass_obj.schoolclass_id = item[12];
                                schoolclassObj.check_schoolclass_ary.push(schoolclass_obj);

                            }



                        });
                    } else {
                        $.each(newObj.tblist.rows().data(), function(key, item) {
                            var index = findIndexByKey(newObj.check_subject_ary, 'id', item[0]);
                            if (index > -1) {
                                newObj.check_subject_ary.splice(index, 1);
                            }
                            var schoolclass_index=findIndexByKey(schoolclassObj.check_schoolclass_ary, 'id', item[0]);
                            if (schoolclass_index > -1) {
                                schoolclassObj.check_schoolclass_ary.splice(schoolclass_index, 1);
                            }
                        });
                    }
                    checkState();
                });

                newObj.tblist.rows().every(function(key, item) {

                    var item = this.data();
                    var state_str=item[2];
                    var allscore = item[8];
                    var review_percent = item[9];
                    var review_complete = item[10];
                    var review_count = item[11];

                    var review_percent_html = '';
                    if (review_percent != '--' && state_str != '未交卷' && state_str!='待發放') {
                        review_percent_html =
                        '<div class="progress" style="width:75%;display:inline-block">\
                            <div class="progress-bar-purple" role="progressbar" aria-valuenow="' + review_complete + '" aria-valuemin="0" aria-valuemax="' + review_count + '" style="width: ' + review_percent + '"><div style="display:inline-block">' + review_complete + '/' + review_count + '</div></div>\
                        </div><span style="width:25%;display:inline-block">' + review_percent+'</span>';
                    } else {
                        review_percent_html = '--';
                    }

                    if (allscore>=100) {
                        review_percent_html='--';
                    }

                    item[9] = review_percent_html;

                    this.invalidate();

                    if (state_str == '未交卷' || state_str=='待發放') {
                        $('.dt-checkboxes').eq(key).hide();
                    }
                    else {
                        $('#tbList tbody tr').eq(key).attr('style','cursor:pointer');
                    }
                });


            },
            'columnDefs':
            [{
                'targets': [0], // column or columns numbers
                'orderable': false, // set orderable for selected columns
                'checkboxes': {
                    'selectRow': true
                }
            },
            {
                'targets': [3],
                'visible': false,
            },
            {
                'targets': [9],
                'orderable': false,
            }],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getSubjectCode(cid) {
        var dataObj = {};
        dataObj.cid = cid;
        dataObj.append_et = 1;
        //dataObj.append_P0 = 1;
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getSchoolclass() {
		var dataObj={};
		dataObj.status=-1;
		dataObj.hide_P0=1;
        $.ajax({
            url: '/admin/quizpaper/get-schoolclass',
            type: 'post',
			data: dataObj,
            success: function(res) {
                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">選擇班級</option>');
                $.each(res, function(key, item) {
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

    function getQuizpaperCategory() {
        $.ajax({
            url: '/admin/quizpaper/get-quizpaper-category',
            type: 'post',
            success: function(res) {

                $('#select-category option').remove();

                if((protocol + '//' + hostname)!=('https://aidux.ailead365.com' && 'https://zlsy.ailead365.com')){
                    $('#select-category').append('<option value="-1">選擇考試類別</option>');
                    $.each(res, function(key, item) {
                        $('#select-category').append('<option value="' + item.id + '">' + item.name + '</option>');
                    });
                }
                $('#select-category').append('<option value="6">自我練習</option>');
                $('#select-category').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function startWrongPractice() {

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length == 0) {
            swal('請至少選擇一份要複習的考卷');
            return false;
        }

        var result_ids_or_persave_reust_ids=[];
        $.each(rows_selected, function(key, item) {
            result_ids_or_persave_reust_ids.push(item);

        });



        if (rows_selected.length == 1 && rows_selected[0] == 0) {
            swal('您選擇的這份試卷尚未交卷');
            return false;
        }

        var subject_count = 0;
        var subject_temp = '';
        $.each(newObj.check_subject_ary, function(key, item) {
            if (subject_temp == '') {
                subject_temp = item.subject_name;
                subject_count++;

            }
            if (subject_temp != item.subject_name) {
                subject_count++;
            }
        });
        var check_schoolclass_list=[];
        $.each(schoolclassObj.check_schoolclass_ary, function(key, item) {

            check_schoolclass_list.push(item.schoolclass_id);

        });
        var unqine_check_schoolclass = Array.from(new Set(check_schoolclass_list));

        if (subject_count > 1) {
            swal('請選擇同一科目的試卷進行派卷');
            return false;
        }

        var rids = '';
        $.each(rows_selected, function(key, item) {
            if (rids == '') {
                rids += item;
            } else {
                rids += '-' + item;
            }
        });


        var checkObj = {};
        checkObj.schoolclass_id_array = unqine_check_schoolclass;
        checkObj.result_ids=result_ids_or_persave_reust_ids;
        $.ajax({
            url: '/admin/stuquiz/check-student-wrong-paper',
            type: 'POST',
            data: checkObj,
            success: function(res) {
                var message = res.message;

                if (message != 'success') {
                    swal(message);
                    return false;
                }
                location.href = '/admin/exam/wrong?rids=' + rids;

            },
            error: bs.errorHandler
        });



    }

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function checkState() {
        $.each($('.dt-checkboxes'), function(key, item) {
            if ($(item).prop('checked')) {
                $('#btn-wrong').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {
                $('#btn-wrong').removeClass('btn-orange').addClass('btn-secondary');
            }
        });
    }

});
