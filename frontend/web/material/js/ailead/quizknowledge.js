$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        bs.initSelectElement('#select-source', '/admin/quiz/get-spec-quiz-source-kind', '', '', '');



        bs.initSelectElement('#select-grade', '/admin/quizpaper/get-spec-grade-code', '選擇年級', '-1', '');
        getSubjectCode();
        //bs.initSelectElement('#select-subject', '/admin/quizpaper/get-all-subject-code', '選擇科目', '-1', '')-
        bs.initSelectElement('#select-status', '/admin/quiz/get-quiz-status', '選擇狀態', '-1', '1');

		$('#select-quiz-status').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});

        newObj = initObj();

        //啟用
        $('#btn-quizknowledge-active').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('尚未選取知識點');
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            var dataObj = {};
            dataObj.quizknowledge_id = pid;
            $.ajax({
                url: '/admin/quiz/quizknowledge-active',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                async: false,
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        newObj.tblist.ajax.reload(null, false);
                        alert(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.href = r.reurl;
                    }
                },
                error: bs.errorHandler,
            });
        });

        //停用
        $('#btn-quizknowledge-close').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('尚未選取知識點');
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            var dataObj = {};
            dataObj.quizknowledge_id = pid;
            $.ajax({
                url: '/admin/quiz/quizknowledge-close',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                async: false,
                contentType: 'application/json',
                cache: false,
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        newObj.tblist.ajax.reload(null, false);
                        alert(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.href = r.reurl;
                    }
                },
                error: bs.errorHandler,
            });
        });
    }

    function initObj() {

        newObj.tblist=$('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[30], ['30']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [[4, 'desc']], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true,//等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //==========請求數據start
            'serverSide': true,
            'ajax': {
                'type' : 'post',
                'url': '/admin/quiz/quiz-knowledge-list',
                'data':function(data){

                    data.source_kind_id=$('#select-source').val();
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.status_code=$('#select-status').val();
					data.quiz_status=$('#select-quiz-status').val();
                    //data.check_close=$('input[id=check-close]:checked').val();
                    data.name=$('#txt-search').val();
                }
            },
            'initComplete': function () {


                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    //var data = newObj.tblist.row(this).data();
                    //location.href = '/admin/quiz/quizknowledge_view_data?knowledge_id=' + data[0];

                });

                $('#select-source').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    //升私中
                    getSubjectCode($(this).val());
                    newObj.tblist.draw();
                });


                $('#select-subject').on('change',function(e){
                    e.preventDefault();

                    newObj.tblist.draw();
                });

                $('#select-status').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-quiz-status').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#check-close').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-tags').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#txt-search').on('keypress',function(e){
                    if (e.which==13) {
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


            },
            'drawCallback':function(){
                //跳至第Ｘ頁程式碼
                var _this = $(this);
                var tableId = _this.attr('id');
                var pageDiv = $('#' + tableId + '_paginate');
                var add_html='';
                add_html='<input id="' + tableId + '_gotoPage" type="text" placeholder="跳至頁面[請輸入頁碼] " style="height:36px;line-height:28px;width:20%; margin:0px 0px 0px 0px"/>' +
                    '<button class="paginate_button btn btn-outline-success "    type="button"  id="' + tableId + '_goto"><i class="fa fa-arrow-right" aria-hidden="true"></i></button><ul class="pagination">';
                pageDiv.append(add_html);
                $('#' + tableId + '_goto').click(function (obj) {
                    var page = $('#' + tableId + '_gotoPage').val();
                    var thisDataTable = $('#' + tableId).DataTable();
                    var pageInfo = thisDataTable.page.info();
                    if (isNaN(page)) {
                        $('#' + tableId + '_gotoPage').val('');
                        return;
                    } else {
                        var maxPage = pageInfo.pages;
                        var page = Number(page) - 1;
                        if (page < 0) {
                            page = 0;
                        } else if (page >= maxPage) {
                            page = maxPage - 1;
                        }
                        $('#' + tableId + '_gotoPage').val(page + 1);
                        thisDataTable.page(page).draw('page');
                    }
                });
                newObj.tblist.rows().every(function(){
                    var item=this.data();

                    var knowledge_id = item[1];
                    var name = item[5];
                    var quiz_knowledge_count = item[6];


                    item[5] = '<a target="_blank" href="/admin/quiz/quizknowledge_view_data?knowledge_id='+knowledge_id+'">'+name+'</a>';
                    item[6] = '<a target="_blank" href="/admin/quiz/quiz?knowledge_id='+knowledge_id+'&status='+ $('#select-quiz-status').val() +'">'+quiz_knowledge_count+'</a>';

                    var status = item[7];
                    if (status == '1') {
                        item[7] = '啟用';
                    } else {
                        item[7] = '<font color="red">停用</font>';
                    }

                    // var tags = item[4];
                    // var newTags = '';
                    // if (tags) {
                    //     var tagAry = tags.split(';');
                    //     $.each(tagAry, function(key, item) {
                    //         newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                    //     });
                    // }
                    // item[4]=newTags;
                    //invalidate the data DataTables has cached for this row


                    this.invalidate();
                });
            },
            'columnDefs': [
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                },{
                    'targets': [0,2], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                // },{
                //     'targets': [6], // column or columns numbers
                //     'visible': false,  // set visible for selected columns
                },
            ],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }
});

//升私中更動
function getSubjectCode() {
    var dataObj = {};
    dataObj.type = 'coursevideo';
    dataObj.grade_code=$('#select-grade').val();
    $.ajax({
        url: '/admin/quizpaper/get-all-subject-code',
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
