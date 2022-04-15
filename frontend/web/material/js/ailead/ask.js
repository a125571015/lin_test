$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        initObj();
        getSpecGradeCode();
        getSubjectCode();
		getBestStatus();
        getStatus();

		jQuery('#date-stime').datetimepicker({
			format: 'Y/m/d',
			timepicker: false
		});

		jQuery('#date-etime').datetimepicker({
			format: 'Y/m/d',
			timepicker: false
		});
    }

    function initObj() {

        newObj.tblist=$('#tbList').DataTable({
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
            'processing': true,//等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'type':'POST',
            'ajax': {
                'url': '/admin/ask/ask-list',
                'type':'POST',
                'data':function(data){
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
					data.is_best=$('#select-is-best').val();
					data.status=$('#select-status').val();
					data.stime=$('#date-stime').val();
					data.etime=$('#date-etime').val();
					data.school_name=$('#txt-school-name').val();
					data.quiz_id=$('#txt-quizid').val();
                }
            },
            'initComplete': function () {

                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    window.open('/admin/ask/answer?id='+ data[0],'_blank');
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    //升私中更動
                    getSubjectCode();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-is-best').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-status').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

				$('#date-stime').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

				$('#date-etime').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });


                $('#txt-school-name').on('keypress',function(e){
                    if (e.which==13) {
                        newObj.tblist.draw();
                    }
                });

                $('#txt-quizid').on('keypress',function(e){
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
            },
            'columnDefs': [

            ],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getSpecGradeCode() {
        $.ajax({
            url: '/admin/quizpaper/get-spec-grade-code',
            type: 'post',
            success: function(res) {
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

    function getSubjectCode() {
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                //升私中更動
                var check_ep='';
                check_ep=$('#select-grade').find('option:selected').val();


                $.each(res, function(key, item) {
                    if( $("#select-grade").val() != null){

                        //$('#select_id').find('option:selected').val();

                        //$('input[name="check-all"]').prop('checked').attr('id')




                        // $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        if (check_ep=='EP')

                        {
                            var check_subject=item.code;
                            var changsubjectname='升私中'+item.name;
                            var EPMOsubjectname='國小資優數學';
                            if (check_subject=='C0' || check_subject=='E0'  ){

                                $('#select-subject').append('<option value="' + item.code + '">' + changsubjectname + '</option>');

                            }
                            else if ( check_subject=='M0'){
                                $('#select-subject').append('<option value="' + item.code + '">' + EPMOsubjectname + '</option>');
                            }
                            else
                            {
                                $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                            }

                        }
                        else{
                            $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                        }
                    }
                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

	function getBestStatus(){
		$('#select-is-best').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});
	}

	function getStatus(){
		$('#select-status').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});
	}

});
