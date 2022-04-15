$(function() {
    'use strict';
    var newObj = {};
    newObj.check_grade_ary=[];
    newObj.check_subject_ary=[];
    newObj.check_source_ary=[];
    init();

    function init() {
        initObj();
        getGradeCode();
        getSubjectCode();
        getAuthor();
        getQuizpaperCategory();
        getQuizpaperTag();
        getDifficult();

        $('#btn-sendpaper-online').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一份試卷進行線上派卷');
                return false;
            }

            var grade_count=0;
            var grade_temp='';
            $.each(newObj.check_grade_ary,function(key,item){
                var grade_level=item.grade_name.replace('一年級','').replace('二年級','').replace('三年級','').replace('四年級','').replace('五年級','').replace('六年級','');
                if (grade_temp=='') {
                    grade_temp=grade_level;
                    grade_count++;
                }
                if (grade_temp!=grade_level) {
                    grade_count++;
                }
            });

            if (grade_count>1) {
                swal('請選擇同一學制的試卷進行派卷');
                return false;
            }

            var subject_count=0;
            var subject_temp='';
            $.each(newObj.check_subject_ary,function(key,item){
                if (subject_temp=='') {
                    subject_temp=item.subject_name;
                    subject_count++;
                }
                if (subject_temp!=item.subject_name) {
                    subject_count++;
                }
            });

            if (subject_count>1) {
                swal('請選擇同一科目的試卷進行派卷');
                return false;
            }

            if (findIndexByKey(newObj.check_source_ary,'source','紙本考卷')==0) {
                swal('不得選擇紙本考卷進行派卷');
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            location.href='/admin/quizpaper/sendpaper?type=online&pid='+pid;
        });

        $('#btn-sendpaper-manual').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一份試卷進行紙本派卷');
                return false;
            }

            if (findIndexByKey(newObj.check_grade_ary,'grade_name','主題課程')==0) {
                swal('您所選的考卷含有升私中考卷，升私中考卷不提供紙本派卷');
                return false;
            }

            var grade_count=0;
            var grade_temp='';
            $.each(newObj.check_grade_ary,function(key,item){
                var grade_level=item.grade_name.replace('一年級','').replace('二年級','').replace('三年級','').replace('四年級','').replace('五年級','').replace('六年級','');
                if (grade_temp=='') {
                    grade_temp=grade_level;
                    grade_count++;
                }
                if (grade_temp!=grade_level) {
                    grade_count++;
                }
            });

            if (grade_count>1) {
                swal('請選擇同一學制的試卷進行派卷');
                return false;
            }

            var subject_count=0;
            var subject_temp='';
            $.each(newObj.check_subject_ary,function(key,item){
                if (subject_temp=='') {
                    subject_temp=item.subject_name;
                    subject_count++;
                }
                if (subject_temp!=item.subject_name) {
                    subject_count++;
                }
            });

            if (subject_count>1) {
                swal('請選擇同一科目的試卷進行派卷');
                return false;
            }

            if (findIndexByKey(newObj.check_source_ary,'source','紙本考卷')==0) {
                swal('不得選擇紙本考卷進行派卷');
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            location.href='/admin/quizpaper/sendpaper?type=manual&pid='+pid;
        });

        $('#btn-delete').on('click', function(e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請選擇您要刪除的考卷');
                return false;
            }

			swal({
                title: '是否確認刪除考卷? 刪除後的考卷將無法還原。',
                text: '',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
				var dataObj = {};
				var pid=[];
	            $.each(rows_selected, function(key, item){
	                pid.push(item);
	            });
                dataObj.pid = pid;
                $.ajax({
                    url: '/admin/quizpaper/delete-quizpaper',
                    type: 'POST',
                    data: dataObj,
                    success: function(res) {
                        var message = res.message;
                        if (message != 'success') {
                            swal(message);
                            return false;
                        }
                        newObj.tblist.draw();
                    },
                    error: bs.errorHandler
                });
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });

        $('#btn-public').on('click', function(e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請選擇您要公開的考卷');
                return false;
            }

			swal({
                title: '是否確認公開考卷?',
                text: '',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
				var dataObj = {};
				var pid=[];
	            $.each(rows_selected, function(key, item){
	                pid.push(item);
	            });
                dataObj.pid = pid;
                $.ajax({
                    url: '/admin/quizpaper/public-quizpaper',
                    type: 'POST',
                    data: dataObj,
                    success: function(res) {
                        var message = res.message;
                        if (message != 'success') {
                            swal(message);
                            return false;
                        }
                        newObj.tblist.draw();
                    },
                    error: bs.errorHandler
                });
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
        });

        $('#btn-private').on('click', function(e) {
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請選擇您要限用的考卷');
                return false;
            }

            swal({
                title: '是否確認限用考卷?',
                text: '',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function() {
                var dataObj = {};
                var pid=[];
                $.each(rows_selected, function(key, item){
                    pid.push(item);
                });
                dataObj.pid = pid;
                $.ajax({
                    url: '/admin/quizpaper/private-quizpaper',
                    type: 'POST',
                    data: dataObj,
                    success: function(res) {
                        var message = res.message;
                        if (message != 'success') {
                            swal(message);
                            return false;
                        }
                        newObj.tblist.draw();
                    },
                    error: bs.errorHandler
                });
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    return false;
                }
            });
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
            'order': [[1, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true,//等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'type':'POST',
            'ajax': {
                'url': '/admin/quizpaper/quizpaper-list',
                'type':'POST',
                'data':function(data){
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.created_by=$('#select-author').val();
                    data.quizpaper_category_id=$('#select-category').val();
                    data.quizpaper_tag_ids=$('#select-tags').val();
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
                    var data = newObj.tblist.row(this).data();
                    window.open('/admin/quizpaper/paperview?id='+ data[0],'_blank');
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

                $('#select-author').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-category').on('change',function(e){
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

                $('.dt-checkboxes-cell').off('change').on('change',function(e){
                    e.preventDefault();
                    if ($(this).find('.dt-checkboxes').prop('checked')) {

                        if(!findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0])){
                            var grade_obj={};
                            grade_obj.id=newObj.tblist.row(this).data()[0];
                            grade_obj.grade_name=newObj.tblist.row(this).data()[2];
                            newObj.check_grade_ary.push(grade_obj);
                        }

                        if(!findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0])){
                            var subject_obj={};
                            subject_obj.id=newObj.tblist.row(this).data()[0];
                            subject_obj.subject_name=newObj.tblist.row(this).data()[3];
                            newObj.check_subject_ary.push(subject_obj);
                        }

                        if(!findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0])){
                            var source_obj={};
                            source_obj.id=newObj.tblist.row(this).data()[0];
                            source_obj.source=newObj.tblist.row(this).data()[5];
                            newObj.check_source_ary.push(source_obj);
                        }

                    }
                    else {
                        var index = findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0]);
                        if (index > -1) {
                            newObj.check_grade_ary.splice(index, 1);
                        }

                        index = findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0]);
                        if (index > -1) {
                            newObj.check_subject_ary.splice(index, 1);
                        }

                        index = findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0]);
                        if (index > -1) {
                            newObj.check_source_ary.splice(index, 1);
                        }
                    }
                });

                $('.dt-checkboxes-select-all').off('change').on('change',function(e){
                    e.preventDefault();
                    if ($('.dt-checkboxes-select-all').find('input:checkbox').prop('checked')) {
                        $.each(newObj.tblist.rows().data(),function(key,item){

                            if (!findIndexByKey(newObj.check_grade_ary,'id',item[0])) {
                                var grade_obj={};
                                grade_obj.id=item[0];
                                grade_obj.grade_name=item[2];
                                newObj.check_grade_ary.push(grade_obj);
                            }

                            if (!findIndexByKey(newObj.check_subject_ary,'id',item[0])) {
                                var subject_obj={};
                                subject_obj.id=item[0];
                                subject_obj.subject_name=item[3];
                                newObj.check_subject_ary.push(subject_obj);
                            }

                            if (!findIndexByKey(newObj.check_source_ary,'id',item[0])) {
                                var source_obj={};
                                source_obj.id=item[0];
                                source_obj.source=item[5];
                                newObj.check_source_ary.push(source_obj);
                            }

                        });
                    }
                    else {
                        $.each(newObj.tblist.rows().data(),function(key,item){

                            var index = findIndexByKey(newObj.check_grade_ary,'id',item[0]);
                            if (index > -1) {
                                newObj.check_grade_ary.splice(index, 1);
                            }

                            var index = findIndexByKey(newObj.check_subject_ary,'id',item[0]);
                            if (index > -1) {
                                newObj.check_subject_ary.splice(index, 1);
                            }

                            index = findIndexByKey(newObj.check_source_ary,'id',item[0]);
                            if (index > -1) {
                                newObj.check_source_ary.splice(index, 1);
                            }
                        });
                    }
                });

                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    var tags = item[7];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function(key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item[7]=newTags;
                    item[1]=item[1].split(' ').slice(0,1).join(' ');

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
                    'targets': [0,9,10], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                }
            ],
            'select': {
                'style': 'multi'
            },
        });
    }

    function getGradeCode() {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
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

				if (bs.getUrlVar('subject')) {
					$('#select-grade').append('<option value="E0">國小</option>');
					$('#select-grade').append('<option value="J0">國中</option>');
					$('#select-grade').append('<option value="H0">高中</option>');
					$('#select-grade').val(bs.getUrlVar('subject').split('-')[0]).trigger('change');
				}

                //出卷用
                $('#select-grade2 option').remove();
                $('#select-grade2').append('<option value="-1">請選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#select-grade2').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade2').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(grade_code) {
        var dataObj = {};
        dataObj.grade_code=grade_code;
        console.log($('#select-grade').val());
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            // data: JSON.stringify(dataObj),
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

				if (bs.getUrlVar('subject')) {
					$('#select-subject').val(bs.getUrlVar('subject').split('-')[1]).trigger('change');
				}
            },
            error: bs.errorHandler
        });
    }

    function getAuthor() {
        $.ajax({
            url: '/admin/quizpaper/get-author',
            type: 'post',
            success: function(res) {
                $('#select-author option').remove();
                $('#select-author').append('<option value="-1">選擇出卷者</option>');
                $.each(res, function(key, item) {
                    $('#select-author').append('<option value="' + item.id + '">' + item.first_name + '</option>');
                });
                $('#select-author').select2({
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
                $('#select-category').append('<option value="-1">選擇考試類別</option>');
                $.each(res, function(key, item) {
                    $('#select-category').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-category').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

				if (bs.getUrlVar('category')) {
					$('#select-category').val(bs.getUrlVar('category')).trigger('change');
				}

                // 出卷用
                $('#select-category2 option').remove();
                $('#select-category2').append('<option value="-1">請選擇考試類別</option>');
                $.each(res, function(key, item) {
                    $('#select-category2').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-category2').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getQuizpaperTag() {

        $.ajax({
            url: '/admin/quizpaper/get-quizpaper-tag',
            type: 'post',
            success: function(res) {

                $('#select-tags option').remove();
                $.each(res, function(key, item) {
                    $('#select-tags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-tags').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇考試標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });


				if (bs.getUrlVar('label')) {

					var text1 = bs.getUrlVar('label');
					$("#select-tags option").filter(function() {
    					return this.text == text1;
					}).attr('selected', true);

					$('#select-tags').trigger('change');

				}

                // 出卷用
                $('#select-tags2 option').remove();
                $.each(res, function(key, item) {
                    $('#select-tags2').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-tags2').select2({
                    theme: "bootstrap",
                    placeholder: {
                        id: '-1',
                        text: '選擇考試標籤'
                    },
                    tags: true,
                    language: 'zh-TW'
                });
            },
            error: bs.errorHandler
        });
    }

    function getDifficult() {

        $.ajax({
            url: '/admin/quizpaper/getdifficult',
            type: 'post',
            success: function(res) {
                $('#select-difficulty option').remove();
                $.each(res, function(key, item) {
                    $('#select-difficulty').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-difficulty').val('3');

                $('#select-difficulty').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            }
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

});
