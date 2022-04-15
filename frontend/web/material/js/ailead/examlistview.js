$(function() {
    'use strict';
    var newObj = {};
    newObj.id=bs.getUrlVar('id');
    init();

    function init() {

		var prev_Dates =new Date();
		prev_Dates.setMonth(new Date().getMonth()-1);
		const _year = prev_Dates.getFullYear();
		const _month = ("0" + (prev_Dates.getMonth() + 1).toString()).slice(-2);
		const _date = ("0" + prev_Dates.getDate()).slice(-2);
		$('#date-stime').val(_year+'/'+_month+'/'+_date);

		var fullDate = bs.getFullDate();
		$('#date-etime').val(fullDate.year+'/'+fullDate.month+'/'+fullDate.date);

        getSchoolclassInfo();
        getQuizpaperCategory();
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
            'deferRender': true,//當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'ajax': {
                'url': '/admin/banwu/get-examlistview',
                'data': function(data) {
                    data.schoolclass_detail_id=newObj.id;
                    data.subject_code = $('#select-subject').val();
                    data.schoolclass_id=$('#select-schoolclass').val();
                    data.quizpaper_category_id=$('#select-category').val();
                    data.stime=$('#date-stime').val();
                    data.etime=$('#date-etime').val();
                    data.complete=($('input:checkbox:checked[name="chk-complete"]').val())?1:0;
                }
            },
            'initComplete': function() {

                getQuizresultRecent();

                $('#select-subject').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                    getQuizresultRecent();
                });

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                    getQuizresultRecent();
                });

                $('#select-category').on('change', function(e) {
                    e.preventDefault();
                    newObj.tblist.draw();
                    getQuizresultRecent();
                });

                $('#chk-complete').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                    getQuizresultRecent();
                })

                jQuery('#date-stime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker:false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                        getQuizresultRecent();
                    }
                });

                jQuery('#date-etime').datetimepicker({
                    format: 'Y/m/d',
                    timepicker:false,
                    onSelectDate: function(dateText, inst) {
                        newObj.tblist.draw();
                        getQuizresultRecent();
                    }
                });

                $('#btn-export').on('click', function(e) {
                    e.preventDefault();

                    var dataObj={};
                    dataObj.schoolclass_detail_id=newObj.id;
                    dataObj.subject_code = $('#select-subject').val();
                    dataObj.schoolclass_id=$('#select-schoolclass').val();
                    dataObj.quizpaper_category_id=$('#select-category').val();
                    dataObj.stime=$('#date-stime').val();
                    dataObj.etime=$('#date-etime').val();
                    dataObj.complete=($('input:checkbox:checked[name="chk-complete"]').val())?1:0;
                    console.log(dataObj);
                    location.href='/admin/banwu/export-examlistview?schoolclass_detail_id=' + dataObj.schoolclass_detail_id
                                                                + '&subject_code='          + dataObj.subject_code
                                                                + '&schoolclass_id='        + dataObj.schoolclass_id
                                                                + '&quizpaper_category_id=' + dataObj.quizpaper_category_id
                                                                + '&stime='                 + dataObj.stime
                                                                + '&etime='                 + dataObj.etime
                                                                + '&complete='              + dataObj.complete;
                });
            },
            'drawCallback': function() {

                newObj.tblist.rows().every(function(key){
                    var item=this.data();
                    if (item[8]!='--') {
                        $('#tbList tbody tr').eq(key).attr('style','cursor:pointer');
                    }
                });

                $('#tbList tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var item = newObj.tblist.row(this).data();
                    if (item[8]!='--') {
                        window.open('/admin/exam/result?rid='+ item[0],'_blank');
                    }
                });

             },
            'columnDefs': [
            {
                'targets': [0], // column or columns numbers
                'visible': false, // set orderable for selected columns
            }
            ],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getSchoolclassInfo(){
        var dataObj={};
        dataObj.detail_id=newObj.id;
        $.ajax({
          url: '/admin/quizpaper/get-schoolclassinfo',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var schoolclass_id=res.schoolclass_id;
              var grade_code=res.grade_code;
              var subject_code=res.subject_code;

              var stu_user_name=res.stu_user_name;
              getSchoolclass(schoolclass_id);
              getSubjectCode(subject_code,grade_code);
              $('#user-name').text(stu_user_name);
          },
          error: bs.errorHandler
        });
    }

    function getSchoolclass(cid){
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
                $('#select-schoolclass').val(cid);
                $('#select-schoolclass').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(subject_code,grade_code) {
		//升私中更動
        var dataObj = { 'append_et':1 };
        dataObj.grade_code=grade_code;
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
                //檢查他的權限如果沒有在下拉式選單中的話
                var check_subject=$('#select-subject option[value="'+subject_code+'"]').length;
                if (check_subject!=0){
                    $('#select-subject').val(subject_code);
                }
                else{
                    $('#select-subject').val(-1);
                }



                // $('#select-subject').val(subject_code);

                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                initObj();

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
                $('#select-category').append('<option value="-1">選擇考試類別</option>');
                $.each(res, function(key, item) {
                    $('#select-category').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-category').append('<option value="6">自我練習</option>');
                $('#select-category').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getQuizresultRecent(){
        var dataObj={};
        dataObj.schoolclass_detail_id=newObj.id;
        dataObj.subject_code = $('#select-subject').val();
        dataObj.schoolclass_id=$('#select-schoolclass').val();
        dataObj.quizpaper_category_id=$('#select-category').val();
        dataObj.stime=$('#date-stime').val();
        dataObj.etime=$('#date-etime').val();
        dataObj.complete=($('input:checkbox:checked[name="chk-complete"]').val())?1:0;
        $.ajax({
            url: '/admin/banwu/get-quizresult-recent',
            type: 'POST',
            data:dataObj,
            success: function(response) {
                var quizpaper_name_ary=response.quizpaper_name_ary;
                var person_score_ary=response.person_score_ary;
                var cls_avg_score_ary=response.cls_avg_score_ary;
                var user_id=response.user_id;
                $('#btn-stuinfo').on('click',function(e){
                    e.preventDefault();
                    location.href='/admin/student/view_data?id='+user_id;
                });

                c3.generate({
                    bindto: '#stu-score-chart',
                    data: {
                        columns: [
                            person_score_ary,
                            cls_avg_score_ary
                        ],
                        types: {
                            '個人': 'line',
                            '全班': 'line'
                        },
                        colors: {
                            '個人': '#ff5b00',
                            '全班': '#007bff'
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
                            type: 'category',
                            tick:{
                                rotate: 30,
                                multiline:false
                            },
                            categories:quizpaper_name_ary
                        },
                        y:{
                            tick: {
                                values: [0,20,40,60,80,100]
                            },
                            max:100
                        }
                    }
                });
            },
            error: bs.errorHandler
        });
    }
});
