$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        bs.initSelectElement('#select-school', '/admin/quizpaper/get-school', '選擇機構', '-1', bs.getUrlVar('school_id'));
        // bs.initSelectElement('#select-grade', '/admin/quizpaper/get-grade-code', '選擇年級', '-1', '');
        getGradecode();
		getSubjectCode();
        getManagerTeacher();
        getSubManagerTeacher();
        bs.initTagElement('#select-tags', '/admin/school/get-school-tag');

        newObj = initObj();

        $('#btn-schoolclass-close').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一個班級進行班級結業');
                return false;
            }

            if(!confirm('提醒您！班級結業後無法復原，全部學生帳號將退出班級\n\n請確認您是否要將勾選的班級結業？')){
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            var dataObj = {};
            dataObj.schoolclass_id = pid;
            $.ajax({
                url: '/admin/schoolclass/inactive',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                        //swal(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.href = r.reurl;
                    }
                },
                error: bs.errorHandler,
            });
        });


        $('#btn-export').on('click', function(e) {
            e.preventDefault();


            var school_id =$('#select-school').val();
            var grade_code=$('#select-grade').val();
            var subject_code=$('#select-subject').val();
            var school_tag_id=$('#select-tags').val();
            var check_close=$('input[id=check-close]:checked').val();
            var serach_name=$('#txt-search').val();

            location.href='/admin/schoolclass/export-schoolclass?&school_id='+school_id+'&grade_code='+grade_code+'&subject_code='+subject_code+'&school_tag_id='+school_tag_id+'&check_close='+check_close+'&serach_name='+serach_name;
        });

    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[50], ['50']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [[3, 'desc']], //指定默認的次序
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
                'type': 'post',
                'url': '/admin/schoolclass/list',
                'data':function(data){
                    data.school_id = $('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.school_tag_id=$('#select-tags').val();
                    data.check_close=$('input[id=check-close]:checked').val();
                    data.sub_manager_id=$('#select-sub-manager').val();
                    data.manager_id=$('#select-manager').val();
                    data.name=$('#txt-search').val();
                }
            },
            'initComplete': function () {

                // console.log(data.aoData[0]._aData);
                $('#tbList tbody').on('click', 'tr', function(e){
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                        return;
                    }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    location.href =  '/admin/schoolclass/view_data?id=' + data[0];
                    //location.href =  '/admin/schoolclass/view/' + data[0];
                    //location.href = 'view/' + data[0];
                });

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    getManagerTeacher();
                    getSubManagerTeacher();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    getSubjectCode();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-manager').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-sub-manager').on('change',function(e){
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
                    var tags = item[4];
                    var newTags = '';
                    if (tags) {
                        var tagAry = tags.split(';');
                        $.each(tagAry, function(key, item) {
                            newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                        });
                    }
                    item[4]=newTags;
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
                    'targets': [0,1,2,6], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                }
            ],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }

	function getSubjectCode() {
        var dataObj={}
        dataObj.append_et=1;
        dataObj.append_P0=1;

        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
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
                            if (check_subject=='C0' ||check_subject=='E0'   ){

                                $('#select-subject').append('<option value="' + item.code + '">' + changsubjectname + '</option>');

                            }else if (check_subject=='M0'){
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

    function getGradecode(){

        var dataObj={};
        dataObj.page_mode='schoolclass';
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            data:dataObj,
            async: false,
            cache: false,
            success: function(res) {
                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');

                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade').select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });




    };

    function getSubManagerTeacher(){
        var dataObj={};
        dataObj.school_id=$('#select-school').val();
        $.ajax({
            url: '/admin/schoolclass/get-sub-manager-teacher',
            type: 'post',
            data:dataObj,
            async: false,
            cache: false,
            success: function(res) {
                $('#select-sub-manager option').remove();
                $('#select-sub-manager').append('<option value="-1">選擇授課老師</option>');

                $.each(res, function(key, item) {
                    $('#select-sub-manager').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-sub-manager').select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });

    }

    function getManagerTeacher() {
        var dataObj={};
        dataObj.school_id=$('#select-school').val();
        $.ajax({
            url: '/admin/schoolclass/get-manager-teacher',
            type: 'post',
            data:dataObj,
            async: false,
            cache: false,
            success: function(res) {
                $('#select-manager option').remove();
                $('#select-manager').append('<option value="-1">選擇行政老師</option>');

                $.each(res, function(key, item) {
                    $('#select-manager').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-manager').select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });

    }

});
