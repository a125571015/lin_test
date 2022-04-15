$(function() {
    "use strict";
    var newObj = {};
    newObj.quiz_id_ary=[];
    init();

    function init(){

        if (bs.getUrlVar('subject').split('-')[0] == 'EP') {
            $('#btn-sendpaper-manual').remove();
        }

        if (bs.getUrlVar('type') !== 'print') {
            $('.offline').remove();
        }

        getRecentYear();
        // 正式站與測試站校正更動 用域名去判斷
        var check_location=location.host;
        if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){



            //先照原本配置這是改好的
            // if (bs.getUrlVar('subject').split('-')[0] == 'E0' ){
            //     $('#gradeE1').parent().remove();
            //     $('#gradeE2').parent().remove();
            //     $('#chkY1').siblings().text('小三上');
            //     $('#chkY2').siblings().text('小三下');
            // }

            if (bs.getUrlVar('subject').split('-')[0] == 'E0' && bs.getUrlVar('subject').split('-')[1]=='C0'){
                $('#gradeE1').parent().remove();
                $('#gradeE2').parent().remove();
                $('#gradeE3').parent().remove();
                $('#gradeE4').parent().remove();
                $('#chkY1').siblings().text('小五上');
                $('#chkY2').siblings().text('小五下');
            }

            if (bs.getUrlVar('subject').split('-')[0] == 'E0' && (bs.getUrlVar('subject').split('-')[1]=='N0' || bs.getUrlVar('subject').split('-')[1]=='S0' || bs.getUrlVar('subject').split('-')[1]=='M0')){
                $('#gradeE1').parent().remove();
                $('#gradeE2').parent().remove();
                $('#chkY1').siblings().text('小三上');
                $('#chkY2').siblings().text('小三下');
            }
        }
        else{
            if (bs.getUrlVar('subject').split('-')[0] == 'E0' && bs.getUrlVar('subject').split('-')[1]=='C0'){
                $('#gradeE1').parent().remove();
                $('#gradeE2').parent().remove();
                $('#gradeE3').parent().remove();
                $('#gradeE4').parent().remove();
                $('#chkY1').siblings().text('小五上');
                $('#chkY2').siblings().text('小五下');
            }

            if (bs.getUrlVar('subject').split('-')[0] == 'E0' && (bs.getUrlVar('subject').split('-')[1]=='N0' || bs.getUrlVar('subject').split('-')[1]=='S0' || bs.getUrlVar('subject').split('-')[1]=='M0')){
                $('#gradeE1').parent().remove();
                $('#gradeE2').parent().remove();
                $('#chkY1').siblings().text('小三上');
                $('#chkY2').siblings().text('小三下');
            }
        }



        getGradeCode();
        getFactoryCode(bs.getUrlVar('subject').split('-')[0],bs.getUrlVar('subject').split('-')[1]);
        getAuthor();
        getQuizpaperCategory();
        getQuizpaperTag();
        initObj();

        $(".cancel-btn").on('click', function(e) {
            e.preventDefault();
            history.back();
        });

        $(".prev-btn").on("click", function(e) {
            e.preventDefault();
            $('#level-wizard').steps("previous");
            $('.steps ul').find('.done').addClass('disabled');
        });

        $(".next-btn").on("click", function(e) {
            e.preventDefault();
            $('#level-wizard').steps('next');
            $('.steps ul').find('.done').addClass('disabled');
        });

        $(".finish-btn").on("click", function(e) {
            e.preventDefault();
            $('#level-wizard').steps('finish');
        });

        $(".count-view-btn").on("click", function(e) {
            e.preventDefault();
            getCountrange();


        });

        $('input:radio[name="radioGrade"]').on('change', function(e) {
            $('#select-grade2').val($(this).val()).trigger('change');
            var grade_id = $(this).attr('id');
            showChkYear(grade_id);
        });

        $('input:radio[name="radio-exam"]').on('change', function(e) {

            $('#jstree_div').jstree().open_all();
            var examVal = $('input:radio:checked[name="radio-exam"]').val();

            $.each($('li.jstree-node.jstree-leaf'), function(key, item) {
                $('#jstree_div').jstree('deselect_node', $(this).attr('id'));
            });

            $.each($('li.jstree-node.jstree-leaf.' + examVal), function(key, item) {
                $('#jstree_div').jstree('select_node', $(this).attr('id'));
            });
        });

        $('#txt-notes').attr('placeholder','老師針對本次出題的重點、題型、題目內容註明\n範例：\n應用題較多\n難題減少');

        $('[name="chk-public"]').bootstrapSwitch();

		$('input:radio[name="radioSource"]').on('change',function(e){
			var grade_id = $('input:radio[name="radioGrade"]:checked').attr('id');
			showChkYear(grade_id);
        });
    }

    function initObj() {

        newObj.step=$("#level-wizard").steps({
            headerTag: "h6",
            bodyTag: "section",
            transitionEffect: "fade",
            titleTemplate: '<span class="step">#index#</span> #title#',
            enablePagination: false,
            onStepChanging: function(event, currentIndex, newIndex) {

                if (currentIndex == 0) {
                    if ($('input:radio:checked[name="radioGrade"]').length == 0) {
                        swal('請選擇學生目前就讀年級');
                        return false;
                    }

					if ($('input:radio:checked[name="radioSource"]').length == 0) {
						swal('請選擇來源');
						return false;
					}

                    if ($('input:radio:checked[name="radioFactory"]').length == 0) {
                        swal('請選擇版本');
                        return false;
                    }

                    if ($('input:checkbox:checked[name="chkYear"]').length == 0) {
                        swal('請至少選擇一個冊次');
                        return false;
                    }
                }

                if (currentIndex == 1 && newIndex >= 1) {
                    if ($("#jstree_div").jstree("get_checked").length == 0) {
                        swal('請至少選擇一個課程進度');
                        return false;
                    }
                }

                //紙本考卷
                if (currentIndex==3 && newIndex>=3) {
                    if (parseInt($('#sel_quiz_count_total').text())==0) {
                        swal('請選擇題數');
                        return false;
                    }

                    var lose_score_state=0;
                    $.each($('.sel_quiz_count'),function(key,item){
                        if (parseInt($(item).text())!=0) {
                            var quiz_qtype_id=$(item).attr('id').replace('sel_quiz_count_','');

                            if (parseFloat($('#score_'+quiz_qtype_id).text())==0) {
                                lose_score_state=1;
                            }
                        }
                    });

                    if (lose_score_state==1) {
                        swal('請決定配分');
                        return false;
                    }

                    if ($('#select-grade2').val() === '-1') {
                        swal('請選擇年級');
                        return false;
                    }

                    if ($('#select-category2').val() === '-1') {
                        swal('請選擇考試類別');
                        return false;
                    }

                    if (!$('#txt-name').val()) {
                        swal('請輸入考卷名稱');
                        return false;
                    }

                    validateScore(bs.getUrlVar('type'));
                }

                return true;
            },
            onStepChanged: function(event, currentIndex, priorIndex) {

                if (currentIndex == 0) {
                    $('.cancel-btn').show();
                    $('.prev-btn').hide();
                    $('.next-btn').show();
                    $('.finish-btn').hide();
                    $('.count-view-btn').hide();

                    $('#jstree_div').jstree(true).settings.core.data = null;
                    $('#jstree_div').jstree(true).refresh();
                }

                if (priorIndex==0 && currentIndex==1) {
                    getRange();
                }

                if (currentIndex >= 1) {
                    $('.prev-btn').show();
                    $('.next-btn').show();
                    $('.finish-btn').hide();
                    $('.count-view-btn').show();
                }

                if (priorIndex==2 && currentIndex==3) {
                    getQuizQtypeList();
                }

                if (bs.getUrlVar('type') === 'print') {
                    if (currentIndex == 4) {
                        $('.prev-btn').show();
                        $('.next-btn').hide();
                        $('.finish-btn').show();
                        $('.count-view-btn').hide();
                        var date_obj=bs.getFullDate();
                        $('#txt-filename').val($('#txt-name').val()+'-'+date_obj.year+date_obj.month+date_obj.date);
                    }
                }
                else {
                    if (currentIndex == 3) {
                        $('.prev-btn').show();
                        $('.next-btn').hide();
                        $('.finish-btn').show();
                        $('.count-view-btn').hide();
                    }
                }
            },
            onFinishing: function(event, currentIndex) {

                if (bs.getUrlVar('type') !== 'print') {

                    if (parseInt($('#sel_quiz_count_total').text())==0) {
                        swal('請選擇題數');
                        return false;
                    }

                    var lose_score_state=0;
                    $.each($('.sel_quiz_count'),function(key,item){
                        if (parseInt($(item).text())!=0) {
                            var quiz_qtype_id=$(item).attr('id').replace('sel_quiz_count_','');

                            if (parseFloat($('#score_'+quiz_qtype_id).text())==0) {
                                lose_score_state=1;
                            }
                        }
                    });

                    if (lose_score_state==1) {
                        swal('請決定配分');
                        return false;
                    }

                    if ($('#select-grade2').val() === '-1') {
                        swal('請選擇年級');
                        return false;
                    }

                    if ($('#select-category2').val() === '-1') {
                        swal('請選擇考試類別');
                        return false;
                    }

                    if (!$('#txt-name').val()) {
                        swal('請輸入考卷名稱');
                        return false;
                    }
                }
                else {
                    if ($('input:checkbox:checked[name="paper_content"]').length==0) {
                        swal('請至少選擇一種試卷內容');
                        return false;
                    }

                    if (!$('#txt-filename').val()) {
                        swal('請輸入檔案名稱');
                        return false;
                    }
                }

                return true;
            },
            onFinished: function(event, currentIndex) {
                if (bs.getUrlVar('type') !== 'print') {
                    validateScore(bs.getUrlVar('type'));
                }
                else {
                    createQuizpaper();
                }
            }
        });

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
            'ajax': {
                'url':'/admin/quizpaper/quizpaper-list',
                'type':'POST',
                'data':function(data){
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=bs.getUrlVar('subject').split('-')[1];
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
                    // self.location.href = 'view/' + data[0];

                });

                $('#select-grade').on('change',function(e){
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
                // step3
                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

                // step4
                $('#select-grade2 option').remove();
                $('#select-grade2').append('<option value="-1">請選擇年級</option>');

                switch (bs.getUrlVar('subject').split('-')[0]) {
                    case 'E0':
						$('#select-grade2').append('<option value="E1">國小一年級</option>');
						$('#select-grade2').append('<option value="E2">國小二年級</option>');
						$('#select-grade2').append('<option value="E3">國小三年級</option>');
						$('#select-grade2').append('<option value="E4">國小四年級</option>');
						$('#select-grade2').append('<option value="E5">國小五年級</option>');
						$('#select-grade2').append('<option value="E6">國小六年級</option>');
                        $('#radioS3').parent().hide();
                        break;
                    case 'EP':
                        $('#select-grade2').append('<option value="EP">主題課程</option>');
                        $('#select-grade2').val('EP');
                        $('#radioS3').parent().hide();
                        break;
                    case 'J0':
                        $('#select-grade2').append('<option value="J1">國中一年級</option>');
                        $('#select-grade2').append('<option value="J2">國中二年級</option>');
                        $('#select-grade2').append('<option value="J3">國中三年級</option>');
                        break;
                    case 'H0':
                        $('#select-grade2').append('<option value="H1">高中一年級</option>');
                        $('#select-grade2').append('<option value="H2">高中二年級</option>');
                        $('#select-grade2').append('<option value="H3">高中三年級</option>');
                        $('#radioS3').parent().hide();
                        break;
                    default:
                        $('#select-grade2').append('<option value="J1">國中一年級</option>');
                        $('#select-grade2').append('<option value="J2">國中二年級</option>');
                        $('#select-grade2').append('<option value="J3">國中三年級</option>');
                        break;
                }

                $('#select-grade2').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getFactoryCode(grade_code,subject_code) {
        var dataObj={'grade_code':grade_code,'subject_code':subject_code };
        $.ajax({
            url: '/admin/quizpaper/get-factory-code',
            type: 'post',
            data:dataObj,
            success: function(res) {
                $('#chk-factory').empty();
                $.each(res, function(key, item) {
                    $('#chk-factory').append(
                    '<div class="form-check form-check-inline">\
                      <input class="form-check-input" type="radio" name="radioFactory" id="radioF'+item.code+'" value="'+item.code+'">\
                      <label class="form-check-label" for="radioF'+item.code+'">'+item.name+'</label>\
                    </div>');
                });
                if (grade_code == 'EP') {
                    $('#gradeEP').prop('checked', true);
                    $('#radioF0').prop('checked', true);
                    //取消必選
                    if (subject_code!='E21'){
                        $('#chkY1').prop('checked', true);
                    }
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
                // step3
                $('#select-category option').remove();
                $('#select-category').append('<option value="-1">選擇考試類別</option>');
                $.each(res, function(key, item) {
                    $('#select-category').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-category').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
                // step4
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
                // step3
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
                // step4
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

    function getRange() {
        var treeObj = {};
        treeObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
        treeObj.subject_code = bs.getUrlVar('subject').split('-')[1];
        treeObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();

		var course_code = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			course_code.push(item.value);
		});
		course_code.sort();
		treeObj.course_code = course_code;

        var yearTermAry = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        treeObj.yearTermAry = yearTermAry;

		var source_type = bs.getUrlVar('type');
		treeObj.source = source_type != 'print' ? 1 : 2;

        $.ajax({
            url: '/admin/quizpaper/getclassinfo',
            type: 'post',
            data: treeObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
				bs.disableSubmits(false);
                var data = res.data;
				if (data.length==0) {
					$('#jstree_div_msg').show();
                    // 高中國文，高一和高二康熙版這邊要改文字：
                    // 此課程尚未上限->「108新綱無康熹版本」
                    if ((treeObj.grade_code=='H1'||treeObj.grade_code=='H2') && treeObj.subject_code=='C0' && treeObj.factory_code==5){
                        $('#jstree_div_msg').text('108新綱無康熹版本');
                        $("#jstree_div_msg").attr('style','color:red');
                    }else{
                        $('#jstree_div_msg').text('課程尚未上線');
                        $("#jstree_div_msg").attr('style','color:black');
                    }
				}
				else {
					$('#jstree_div_msg').hide();
				}
				getJsTree(data);
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getCountrange() {
        var treeObj = {};
        treeObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
        treeObj.subject_code = bs.getUrlVar('subject').split('-')[1];
        treeObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();

        var course_code = [];
        $.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
            course_code.push(item.value);
        });
        course_code.sort();
        treeObj.course_code = course_code;

        var yearTermAry = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        treeObj.yearTermAry = yearTermAry;

        var source_type = bs.getUrlVar('type');
        treeObj.source = source_type != 'print' ? 1 : 2;

        $.ajax({
            url: '/admin/quizpaper/getcountclassinfo',
            type: 'post',
            data: treeObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var data = res.data;
                if (data.length==0) {
                    $('#jstree_div_msg').show();
                    // 高中國文，高一和高二康熙版這邊要改文字：
                    // 此課程尚未上限->「108新綱無康熹版本」
                    if ((treeObj.grade_code=='H1'||treeObj.grade_code=='H2') && treeObj.subject_code=='C0' && treeObj.factory_code==5){
                        $('#jstree_div_msg').text('108新綱無康熹版本');
                        $("#jstree_div_msg").attr('style','color:red');
                    }else{
                        $('#jstree_div_msg').text('課程尚未上線');
                        $("#jstree_div_msg").attr('style','color:black');
                    }
                }
                else {
                    $('#jstree_div_msg').hide();
                }
                getJsTree(data);
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }



    function getJsTree(jsonData) {
        $('#jstree_div').jstree({
            'core': {
                'data': jsonData
            },
            'types': {
                "default": {
                    "icon": "ion-android-book"
                },
                "file": {
                    "icon": false
                }
            },
            'checkbox': {
                'keep_selected_style': true
            },
            'plugins': ['wholerow', 'checkbox', 'types']
        });

        $('#jstree_div').jstree(true).settings.core.data = jsonData;
        $('#jstree_div').jstree(true).refresh();
    }

    function getQuizQtypeList(){
        var dataObj={};
        dataObj.grade_code=bs.getUrlVar('subject').split('-')[0];
        dataObj.subject_code=bs.getUrlVar('subject').split('-')[1];
        dataObj.knowledges_jstree=$("#jstree_div").jstree("get_checked");
        dataObj.repeat_papers = [];
        var repeat_papers=[];
        $.each(newObj.tblist.column(0).checkboxes.selected(), function(key, item){
            repeat_papers.push(item);
        });
        repeat_papers.sort();
        dataObj.repeat_papers=repeat_papers;

        var source_type=bs.getUrlVar('type');
        dataObj.source=source_type!='print'?1:2;

		var quiz_source_type = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			quiz_source_type.push($(item).attr('quiz-source-type'));
		});
		quiz_source_type.sort();
		dataObj.quiz_source_type = quiz_source_type;



        $.ajax({
          url: '/admin/quizpaper/get-quiz-qtype-list',
          type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
          beforeSend: function() {
              bs.disableSubmits(true);
          },
          success: function (res) {
              bs.disableSubmits(false);
              var resdata=res;
              $('#tbQuizSel').empty().html(getQtypeListHtml(resdata));

              $('.sel_group').on('blur',function (e){
                  if (isNaN(parseInt($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseInt($(this).val())<=0) {
                      $(this).val(0);
                  }

                  if (parseInt($(this).val(), 10)!==$(this).val()) {
                      $(this).val(parseInt($(this).val()));
                  }
                  if (parseInt($(this).parent().prev().text())< parseInt($(this).val())) {
                      swal('欲選題組數不可大於可選題組數');
                      $(this).val(0);
                      return false;
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_group_','');
                  getQuizQtypeSelList(quiz_qtype_id);
              });


              $('.sel_quiz_low').on('blur',function(e){

                  if (isNaN(parseInt($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseInt($(this).val())<=0) {
                      $(this).val(0);
                  }

                  if (parseInt($(this).val(), 10)!==$(this).val()) {
                      $(this).val(parseInt($(this).val()));
                  }

                  if (parseInt($(this).parent().prev().text()) < parseInt($(this).val())) {
                      swal('欲選題數不可大於可選題數');
                      $(this).val(0);
                      return false;
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_quiz_low_','');
                  getQuizQtypeSelList(quiz_qtype_id);
              });

              $('.sel_quiz_middle').on('blur',function(e){

                  if (isNaN(parseInt($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseInt($(this).val())<=0) {
                      $(this).val(0);
                  }

                  if (parseInt($(this).val(), 10)!==$(this).val()) {
                      $(this).val(parseInt($(this).val()));
                  }

                  if (parseInt($(this).parent().prev().text()) < parseInt($(this).val())) {
                      swal('欲選題數不可大於可選題數');
                      $(this).val(0);
                      return false;
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_quiz_middle_','');
                  getQuizQtypeSelList(quiz_qtype_id);
              });

              $('.sel_quiz_high').on('blur',function(e){

                  if (isNaN(parseInt($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseInt($(this).val())<=0) {
                      $(this).val(0);
                  }

                  if (parseInt($(this).val(), 10)!==$(this).val()) {
                      $(this).val(parseInt($(this).val()));
                  }

                  if (parseInt($(this).parent().prev().text())< parseInt($(this).val())) {
                      swal('欲選題數不可大於可選題數');
                      $(this).val(0);
                      return false;
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_quiz_high_','');
                  getQuizQtypeSelList(quiz_qtype_id);
              });

              $('.sel_quiz_score').on('blur',function(e){

                  $(this).parent().next().children().val(0);

                  if (isNaN(parseFloat($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseFloat($(this).val())<=0) {
                      $(this).val(0);
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_quiz_score_','');
                  var score=(parseFloat($(this).val()) * parseInt($('#sel_quiz_count_'+quiz_qtype_id).text())).toFixed(1);

                  $('#score_'+quiz_qtype_id).text(score);

                  var score_all=0;
                  $.each($('.score'),function(key,item){
                      score_all+=parseFloat($(item).text());
                  });
                  $('#score_all').text(parseFloat(score_all));
              });

              $('.sel_ans_score').on('blur',function(e){

                  $(this).parent().prev().children().val(0);

                  if (isNaN(parseFloat($(this).val()))) {
                      $(this).val(0);
                      return false;
                  }

                  if (parseFloat($(this).val())<=0) {
                      $(this).val(0);
                  }

                  var quiz_qtype_id = $(this).attr('id').replace('sel_ans_score_','');
                  var score=(parseFloat($(this).val()) * parseInt($('#sel_ans_count_'+quiz_qtype_id).text())).toFixed(1);

                  $('#score_'+quiz_qtype_id).text(score);

                  var score_all=0;
                  $.each($('.score'),function(key,item){
                      score_all+=parseFloat($(item).text());
                  });
                  $('#score_all').text(parseFloat(score_all));
              });
          },
          complete: function() {
              bs.disableSubmits(false);
          },
          error: bs.errorHandler
        });
    }

    function getQuizQtypeSelList(quiz_qtype_id){
        var dataObj={};
        dataObj.grade_code=bs.getUrlVar('subject').split('-')[0];
        dataObj.subject_code=bs.getUrlVar('subject').split('-')[1];
        dataObj.knowledges_jstree=$("#jstree_div").jstree("get_checked");
        dataObj.repeat_papers = [];
        var repeat_papers=[];
        $.each(newObj.tblist.column(0).checkboxes.selected(), function(key, item){
            repeat_papers.push(item);
        });
        repeat_papers.sort();
        dataObj.repeat_papers=repeat_papers;

        var source_type=bs.getUrlVar('type');
        dataObj.source=source_type!='print'?1:2;
        dataObj.quiz_qtype_id=parseInt(quiz_qtype_id);

        dataObj.sel_quiz_low=parseInt($('#sel_quiz_low_'+quiz_qtype_id).val()) || 0;
        dataObj.sel_quiz_middle=parseInt($('#sel_quiz_middle_'+quiz_qtype_id).val()) || 0;
        dataObj.sel_quiz_high=parseInt($('#sel_quiz_high_'+quiz_qtype_id).val()) || 0;
        dataObj.sel_group=parseInt($('#sel_group_'+quiz_qtype_id).val()) || 0;

		var quiz_source_type = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			quiz_source_type.push($(item).attr('quiz-source-type'));
		});
		quiz_source_type.sort();
		dataObj.quiz_source_type = quiz_source_type;

        $.ajax({
          url: '/admin/quizpaper/get-quiz-qtype-sel-list',
          type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
          success: function (res) {
              var resdata=res;
              var score=0;


              $('#sel_quiz_count_'+quiz_qtype_id).text(resdata.sel_quiz_count);
              $('#sel_ans_count_'+quiz_qtype_id).text(resdata.sel_ans_count);

              var sel_quiz_count_total=0;
              $.each($('.sel_quiz_count'),function(key,item){
                  sel_quiz_count_total+=parseInt($(item).text());
              });
              $('#sel_quiz_count_total').text(parseInt(sel_quiz_count_total));

              var sel_ans_count_total=0;
              $.each($('.sel_ans_count'),function(key,item){
                  sel_ans_count_total+=parseInt($(item).text());
              });
              $('#sel_ans_count_total').text(parseInt(sel_ans_count_total));

              if (parseFloat($('#sel_quiz_score_'+quiz_qtype_id).val())!=0) {
                  score=(parseFloat($('#sel_quiz_score_'+quiz_qtype_id).val()) * parseInt($('#sel_quiz_count_'+quiz_qtype_id).text())).toFixed(1);
              }
              else {
                  score=(parseFloat($('#sel_ans_score_'+quiz_qtype_id).val()) * parseInt($('#sel_ans_count_'+quiz_qtype_id).text())).toFixed(1);
              }

              $('#score_'+quiz_qtype_id).text(score);

              var score_all=0;
              $.each($('.score'),function(key,item){
                  score_all+=parseFloat($(item).text());
              });
              $('#score_all').text(parseFloat(score_all));

              var quiz_ids_obj={};
              quiz_ids_obj.quiz_qtype_id=parseInt(quiz_qtype_id);
              quiz_ids_obj.quiz_ids=resdata.quiz_ids;
              if (findIndexByKey(newObj.quiz_id_ary, 'quiz_qtype_id', parseInt(quiz_qtype_id))===null) {
                  newObj.quiz_id_ary.push(quiz_ids_obj);
              }
              else {
                  var index = findIndexByKey(newObj.quiz_id_ary, 'quiz_qtype_id', parseInt(quiz_qtype_id));
                  if (index > -1) {
                      newObj.quiz_id_ary.splice(index, 1);
                  }
                  if (quiz_ids_obj.quiz_ids.length>0) {
                      newObj.quiz_id_ary.push(quiz_ids_obj);
                  }
              }

              var quizcount=0;
              $.each(newObj.quiz_id_ary,function(key,item){
                   quizcount+=item.quiz_ids.length;
              });

              //題組問題修正
              const group_array = [99,646,647,733,734];
              if (group_array.includes(parseInt(quiz_qtype_id))) {
                  $('td#sel_group_low_' + quiz_qtype_id).text(resdata.group_low);
                  $('td#sel_group_middle_' + quiz_qtype_id).text(resdata.group_middle);
                  $('td#sel_group_high_' + quiz_qtype_id).text(resdata.group_high);
              }

              //自動配分
              $('#auto-score').on('click',function(e){
                  e.preventDefault();
                  var quiz_count=parseInt($('td#sel_quiz_count_total').text());

                  var total_score=0;
                  var auto_score=0;
                  //由於分數又時候會超過100所以改成無條件捨棄


                  auto_score=parseFloat(100/quiz_count);
                  auto_score=Math.floor(auto_score*10)/10;



                  //auto_score=auto_score.match(/^\d (?:\.\d{0,2})?/);

                  //$('input.sel_quiz_score').val(auto_score);
                  var son_quiz_count=$('#sel_quiz_count_'+quiz_qtype_id).text();

                  if (son_quiz_count!=0){
                      var tmp_quiz_score=0;
                      $('input#sel_quiz_score_'+quiz_qtype_id).val(auto_score);
                      tmp_quiz_score=parseFloat(son_quiz_count*auto_score).toFixed(1);
                      // console.log(tmp_quiz_score);
                      $('td#score_'+quiz_qtype_id).text(tmp_quiz_score);
                      // total_score=total_score+tmp_quiz_score;
                  }else{
                      $('input#sel_quiz_score_'+quiz_qtype_id).val(0);
                  }
                  // $('#score_all').text(parseFloat(total_score));

                  $.each($('.score'),function(key,item){
                      total_score+=parseFloat($(item).text());
                  });
                  $('#score_all').text(parseFloat(total_score));

              });
              newObj.quizcount=quizcount;
          },
          error: bs.errorHandler
        });
    }

    function createQuizpaper() {

        var dataObj = {};
        dataObj.create_type='levelcreate';
        dataObj.subject_code = bs.getUrlVar('subject').split('-')[1];
        dataObj.knowledges_jstree = $("#jstree_div").jstree("get_checked");
        dataObj.repeat_papers = [];
        var repeat_papers=[];
        $.each(newObj.tblist.column(0).checkboxes.selected(), function(key, item){
            repeat_papers.push(item);
        });
        repeat_papers.sort();
        dataObj.repeat_papers=repeat_papers;

        dataObj.grade_code = $('#select-grade2').val();
        dataObj.quizpaper_category_id = $('#select-category2').val();
        dataObj.quizpaper_tag_names = [];
        var quizpaper_tag_names=[];
        $.each($('#select-tags2').select2('data'), function(key, item) {
            quizpaper_tag_names.push(item.text);
        });
        quizpaper_tag_names.sort();
        dataObj.quizpaper_tag_names=quizpaper_tag_names;
        dataObj.name = $('#txt-name').val();
        dataObj.notes = $('#txt-notes').val();
        dataObj.public_status = $('#chk-public').prop('checked') == true ? 1 : 0;
        dataObj.papercount = 1;
        dataObj.quizcount = newObj.quizcount;

        newObj.quiz_ids=[];
        $.each(newObj.quiz_id_ary,function(key,item){
            newObj.quiz_ids = newObj.quiz_ids.concat(item.quiz_ids);
        });
        dataObj.quiz_ids=newObj.quiz_ids;

        dataObj.all_score=parseFloat($('#score_all').text()).toFixed(1);

        dataObj.qtype_score_ary = [];
        $.each($('.sel_quiz_count'),function(key,item){
            if (parseInt($(item).text())!=0) {
                var qtype_score_obj={};
                var quiz_qtype_id=$(item).attr('id').replace('sel_quiz_count_','');
                qtype_score_obj.quiz_qtype_id=parseInt(quiz_qtype_id);
                qtype_score_obj.sel_quiz_count=parseInt($(item).text());
                qtype_score_obj.sel_ans_count=parseInt($('#sel_ans_count_'+quiz_qtype_id).text());
                qtype_score_obj.sel_quiz_score=parseFloat($('#sel_quiz_score_'+quiz_qtype_id).val());
                qtype_score_obj.sel_ans_score=parseFloat($('#sel_ans_score_'+quiz_qtype_id).val());
                qtype_score_obj.score=parseFloat($('#score_'+quiz_qtype_id).text());
                dataObj.qtype_score_ary.push(qtype_score_obj);
            }
        });

        dataObj.size=0;
        var size= $('input:radio:checked[name="size"]').val();
        if (size) {
            dataObj.size=size;
        }

        dataObj.typeset=0;
        var typeset=$('input:radio:checked[name="typeset"]').val();
        if (typeset) {
            dataObj.typeset=typeset;
        }

        var paper_content = [];
        $.each($('input:checkbox:checked[name="paper_content"]'), function(key, item) {
            paper_content.push(item.value);
        });
        paper_content.sort();
        dataObj.paper_content = paper_content;

        dataObj.filename='';
        var filename=$('#txt-filename').val();
        if (filename) {
            dataObj.filename=$('#txt-filename').val();
        }

        dataObj.filetype=0;
        var filetype=$('input:radio:checked[name="filetype"]').val();
        if (filetype) {
            dataObj.filetype=filetype;
        }

        var source_type=bs.getUrlVar('type');
        dataObj.source=source_type!='print'?1:2;

        dataObj.info=JSON.stringify(getPreObj());

		var quiz_source_type = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			quiz_source_type.push($(item).attr('quiz-source-type'));
		});
		quiz_source_type.sort();
		dataObj.quiz_source_type = quiz_source_type;

        $.ajax({
            url: '/admin/quizpaper/create-quizpaper',
            type: 'post',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                if (res.message!='success') {
                    swal(res.message);
                    return false;
                }
                if (bs.getUrlVar('type') !== 'print') {
                    var pid_str=res.pid_str;
                    $('#btn-sendpaper-online').on('click',function(e){
                        e.preventDefault();
                        location.replace('/admin/quizpaper/sendpaper?type=online&pid='+pid_str);
                    });
                    $('#btn-sendpaper-manual').on('click',function(e){
                        e.preventDefault();
                        location.replace('/admin/quizpaper/sendpaper?type=manual&pid='+pid_str);
                    });
                    $('#btn-leave').on('click',function(e){
                        e.preventDefault();
                        location.replace('/admin/quizpaper');
                    });
                    $('#sendpaper-modal').modal('show');
                }
                else {
                    $('#btn-down').on('click',function(e){
                        e.preventDefault();
                        $('#printpaper-modal').modal('hide');
                        newObj.call_times = 0;
                        newObj.pid=res.pid_str;
                        $.blockUI({
                            message: '<img class="img-fluid" src="/admin/material/images/quizimg/出卷中.gif" />',
                            css: {
                                top: '30%',
                                left: '50%',
                                marginLeft: '-45%',
                                width: "90%",
                                cursor: '',
                                border: 'none',
                                background:'none'
                            },
                        });
                        var myInterval =
                        setInterval(
                            function(){
                                exportQuizpaper(myInterval);
                                newObj.call_times++;
                                if(newObj.call_times >= 20){
                                   clearInterval(myInterval);
                                   bs.disableSubmits(false);
                                   swal('檔案尚未產生完成，請稍候再試。');
                                   setTimeout(function(){ location.replace('/admin/quizpaper/paperview?id='+newObj.pid) }, 1000);
                                   return false;
                               }
                           },5000
                       );
                    });
                    $('#btn-cancel').on('click',function(e){
                        e.preventDefault();
                        location.replace('/admin/quizpaper');
                    });
                    $('#printpaper-modal').modal('show');
					$('.cancel-btn').hide();
					$('.prev-btn').hide();
					$('.finish-btn').text('返回');
					$('.finish-btn').off('click').on('click',function(e){
						e.preventDefault();
						location.replace('/admin/quizpaper');
					});
                }
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function exportQuizpaper(myInterval) {
        var dataObj = {};

        dataObj.pidAry = [];
        dataObj.pidAry.push(newObj.pid);

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
                }
                else if (message=='success') {
                    clearInterval(myInterval);
                    bs.disableSubmits(false);
                    setTimeout(function(){location.href=res.url;},500);
                }
            },
            error: bs.errorHandler
        });
    }

    function getPreObj(){

        var dataObj={};

        dataObj.pre_subject = bs.getUrlVar('subject');
        dataObj.pre_current_index = 5;

        dataObj.pre_step1 = {};
        if (dataObj.pre_current_index >= 0) {
            dataObj.pre_step1.grade_code = $('input:radio:checked[name="radioGrade"]').val();
            dataObj.pre_step1.factory_code=[];
            dataObj.pre_step1.factory_code.push($('input:radio:checked[name="radioFactory"]').val());
            dataObj.pre_step1.course_code = [];
            var course_code = [];
            $.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
                course_code.push(item.value);
            });
            course_code.sort();
            dataObj.pre_step1.course_code = course_code;
            dataObj.pre_step1.text_year = [];
            var text_year = [];
            $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
                text_year.push(item.value);
            });
            text_year.sort();
            dataObj.pre_step1.text_year = text_year;
			dataObj.pre_step1.recent_year=bs.getRecentYear();
        }

        dataObj.pre_step2 = {};
        if (dataObj.pre_current_index >= 1) {
            dataObj.pre_step2.exam_range = $('input:radio:checked[name="radio-exam"]').val();
            dataObj.pre_step2.jstree = $("#jstree_div").jstree("get_checked");
        }

        dataObj.pre_step3 = {}
        if (dataObj.pre_current_index >= 2) {
            dataObj.pre_step3.grade_code = $('#select-grade').val();
            dataObj.pre_step3.subject_code = $('#select-subject').val();
            dataObj.pre_step3.created_by = $('#select-author').val();
            dataObj.pre_step3.quizpaper_category_id = $('#select-category').val();
            dataObj.pre_step3.quizpaper_tag_ids = [];
            var quizpaper_tag_ids = [];
            $.each($('#select-tags').select2('data'), function(key, item) {
                quizpaper_tag_ids.push(item.text);
            });
            quizpaper_tag_ids.sort();
            dataObj.pre_step3.quizpaper_tag_ids = quizpaper_tag_ids;
            dataObj.pre_step3.name = $('#txt-search').val();
            dataObj.pre_step3.repeat_papers = [];
            var repeat_papers = [];
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            $.each(rows_selected, function(key, item) {
                repeat_papers.push(item);
            });
            repeat_papers.sort();
            dataObj.pre_step3.repeat_papers = repeat_papers;
        }

        dataObj.pre_step4 = {};
        if (dataObj.pre_current_index >= 3) {
            dataObj.pre_step4.quiz_difficulty_id = '-1';
            dataObj.pre_step4.quiz_category_id = '-1';
            dataObj.pre_step4.quiz_qtype_id = '-1';
            dataObj.pre_step4.qa_text = '';
            dataObj.pre_step4.quiz_ids = [];
        }

        dataObj.pre_step5 = {};
        if (dataObj.pre_current_index >= 4) {
            dataObj.pre_step5.quiz_content = [];
            dataObj.pre_step5.per_score = 0;
            dataObj.pre_step5.qtype_score_ary = [];
            $.each($('.sel_quiz_count'),function(key,item){
                var qtype_score_obj={};
                var quiz_qtype_id=$(item).attr('id').replace('sel_quiz_count_','');
                qtype_score_obj.quiz_qtype_id=parseInt(quiz_qtype_id);
                qtype_score_obj.sel_quiz_count=parseInt($(item).text());
                qtype_score_obj.sel_ans_count=parseInt($('#sel_ans_count_'+quiz_qtype_id).text());
                qtype_score_obj.sel_quiz_score=parseFloat($('#sel_quiz_score_'+quiz_qtype_id).val());
                qtype_score_obj.sel_ans_score=parseFloat($('#sel_ans_score_'+quiz_qtype_id).val());
                qtype_score_obj.score=parseFloat($('#score_'+quiz_qtype_id).text());
                dataObj.pre_step5.qtype_score_ary.push(qtype_score_obj);
            });
        }

        dataObj.pre_step6 = {};
        if (dataObj.pre_current_index >= 5) {
            dataObj.pre_step6.grade_code = $('#select-grade2').val();
            dataObj.pre_step6.subject_code = bs.getUrlVar('subject').split('-')[1];
            dataObj.pre_step6.quizpaper_category_id = $('#select-category2').val();
            dataObj.pre_step6.quizpaper_tag_ids = [];
            var quizpaper_tag_ids2 = [];
            $.each($('#select-tags2').select2('data'), function(key, item) {
                quizpaper_tag_ids2.push(item.id);
            });
            quizpaper_tag_ids2.sort();
            dataObj.pre_step6.quizpaper_tag_ids = quizpaper_tag_ids2;

            dataObj.pre_step6.name = $('#txt-name').val();
            dataObj.pre_step6.notes = $('#txt-notes').val();
            dataObj.pre_step6.public_status = $('#chk-public').prop('checked') == true ? 1 : 0;
        }

        return dataObj;
    }

    function getQtypeListHtml(resdata){

        var inner_html='';

        $.each(resdata,function(key,item){
            var quiz_category_id=item.quiz_category_id;
            var quiz_qtype_id=item.quiz_qtype_id;
            var quiz_qtype_name=item.quiz_qtype_name;
            var quiz_group_count=item.quiz_group_count;
            var quiz_count=item.quiz_count;
            var ans_count=item.ans_count;
            var quiz_low=item.quiz_low;
            var quiz_middle=item.quiz_middle;
            var quiz_high=item.quiz_high;
            const group_array = [99,646,647,733,734];
            var quiz_category_name='';
            switch (parseInt(quiz_category_id)) {
                case 1:
                    quiz_category_name='單選題型';
                    break;
                case 2:
                    quiz_category_name='多選題型';
                    break;
                case 3:
                    quiz_category_name='非選題型';
                    break;
            }


            inner_html+='<tr style="text-align:right">';
            inner_html+='<td style="text-align:center">'+(key+1)+'</td>';
            inner_html+='<td style="text-align:center">'+quiz_category_name+'</td>';
            inner_html+='<td style="text-align:center">'+quiz_qtype_name+'</td>';
            inner_html+='<td>'+quiz_count+'</td>';
            if (group_array.includes(parseInt(quiz_qtype_id))) {
                inner_html += '<td>' + quiz_group_count + '</td>';
            }else{
                inner_html+='<td>--</td>';
            }
            inner_html+='<td>'+ans_count+'</td>';
            if (group_array.includes(parseInt(quiz_qtype_id))){
                inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_group" id="sel_group_'+quiz_qtype_id+'"></td>';
                inner_html+='<td >'+quiz_low+'</td>';
                inner_html+='<td id="sel_group_low_'+quiz_qtype_id+'" class="sel_group_low">0</td>';
                inner_html+='<td>'+quiz_middle+'</td>';
                inner_html+='<td id="sel_group_middle_'+quiz_qtype_id+'" class="sel_group_middle">0</td>';
                inner_html+='<td>'+quiz_high+'</td>';
                inner_html+='<td id="sel_group_high_'+quiz_qtype_id+'" class="sel_group_high">0</td>';
            }else{
                inner_html+='<td>--</td>';
                inner_html+='<td>'+quiz_low+'</td>';
                inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_low" id="sel_quiz_low_'+quiz_qtype_id+'"></td>';
                inner_html+='<td>'+quiz_middle+'</td>';
                inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_middle" id="sel_quiz_middle_'+quiz_qtype_id+'"></td>';
                inner_html+='<td>'+quiz_high+'</td>';
                inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_high" id="sel_quiz_high_'+quiz_qtype_id+'"></td>';
            }
            inner_html+='<td class="sel_quiz_count" id="sel_quiz_count_'+quiz_qtype_id+'">0</td>';
            inner_html+='<td class="sel_ans_count" id="sel_ans_count_'+quiz_qtype_id+'">0</td>';
            inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_score" id="sel_quiz_score_'+quiz_qtype_id+'"></td>';
            inner_html+='<td><input type="text" value="0" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_ans_score" id="sel_ans_score_'+quiz_qtype_id+'"></td>';
            inner_html+='<td class="score" id="score_'+quiz_qtype_id+'">0</td>';
            inner_html+='</tr>';
        });

        inner_html+=
        '<tr style="text-align:right">\
            <td style="text-align:center">合計</td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td></td>\
            <td id="sel_quiz_count_total"></td>\
            <td id="sel_ans_count_total"></td>\
            <td></td>\
            <td></td>\
            <td id="score_all">0</td>\
        </tr>';

        return inner_html;
    }

    function validateScore(type){
        if (parseInt($('#score_all').text())!=100) {
            swal({
                title: '目前考卷總分不是100分，請確認是否繼續出卷？',
                type: 'warning',
                showCloseButton: true,
                showCancelButton: true,
                cancelButtonText: '<span>No<br>我還要再想想</span>',
                confirmButtonText: '<span>Yes<br>確認</span>'
            }).then(function () {
                if (type!=='print') {
                    createQuizpaper();
                }
            },function (dismiss) {
                if (dismiss === 'cancel') {
                    if (type==='print') {
                        $('#level-wizard').steps('previous');
                    }
                    return false;
                }
            });
        }
        else {
            if (type!=='print') {
                createQuizpaper();
            }
        }
    }

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function getRecentYear() {

        // 正式站與測試站校正更動 用域名去判斷
        var check_location=location.host;
        var paramGS = bs.getUrlVar('subject');
        const grade = paramGS.split('-')[0];
        const subject = paramGS.split('-')[1];

        if (paramGS) {
            switch (grade) {
                case 'E0':
                    $('.gradeEP').remove();
                    $('.gradeJ0').remove();
                    $('.gradeH0').remove();
                    $('#chkY1').siblings().text('小一上');
                    $('#chkY2').siblings().text('小一下');
                    $('#chkY3').parent().remove();
                    $('#chkY4').parent().remove();
                    $('#chkY5').parent().remove();
                    $('#chkY6').parent().remove();
                    $('#chkY7').parent().remove();
                    $('#chkY8').parent().remove();
                    break;
                case 'EP':
                    $('.gradeE0').remove();
                    $('.gradeJ0').remove();
                    $('.gradeH0').remove();
                    if (subject=='E21'){
                        $('#chkY1').siblings().text('初級(1)');
                        $('#chkY2').parent().remove();
                        $('#chkY3').siblings().text('初級(2)');

                    }else{
                        $('#chkY1').siblings().text('全');
                        $('#chkY2').parent().remove();
                        $('#chkY3').parent().remove();
                    }
                    $('#chkY4').parent().remove();
                    $('#chkY5').parent().remove();
                    $('#chkY6').parent().remove();
                    $('#chkY7').parent().remove();
                    $('#chkY8').parent().remove();
                    $('.strictRange').hide();
                    break;
                case 'J0':
                    $('.gradeE0').remove();
                    $('.gradeEP').remove();
                    $('.gradeH0').remove();
                    $('#chkY1').siblings().text('國一上');
                    $('#chkY2').siblings().text('國一下');
                    $('#chkY3').siblings().text('國二上');
                    $('#chkY4').siblings().text('國二下');
                    $('#chkY5').siblings().text('國三上');
                    $('#chkY6').siblings().text('國三下');
                    $('#chkY7').parent().remove();
                    $('#chkY8').parent().remove();
                    break;
                case 'H0':
                    $('.gradeE0').remove();
                    $('.gradeEP').remove();
                    $('.gradeJ0').remove();
                    if (subject == 'N1' || subject == 'N3' || subject == 'N4' || subject == 'N5' || subject =='M0' ||subject =='S1' ||subject =='S2' || subject =='S3'  ) {
                        switch (subject) {
                            case 'N1':
                                $('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'N3':
                                $('#chkY1').siblings().html('必修地科');
                                $('#chkY2').parent().remove();
                                $('#chkY3').parent().remove();
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'N4':
                                $('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'N5':
                                $('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'M0':
                                $('#chkY1').siblings().html('高一上&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('高一下&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('高二上&nbsp;&nbsp;');
                                $('#chkY4').siblings().html('高二下&nbsp;&nbsp;');
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'S1':
                                $('#chkY1').siblings().html('必修歷史&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('必修歷史I&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('必修歷史II&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'S2':
                                $('#chkY1').siblings().html('必修地理&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('必修地理I&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('必修地理II&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;
                            case 'S3':
                                $('#chkY1').siblings().html('必修公民&nbsp;&nbsp;');
                                $('#chkY2').siblings().html('必修公民I&nbsp;&nbsp;');
                                $('#chkY3').siblings().html('必修公民II&nbsp;&nbsp;');
                                $('#chkY4').parent().remove();
                                $('#chkY5').parent().remove();
                                $('#chkY6').parent().remove();
                                $('#chkY7').parent().remove();
                                $('#chkY8').parent().remove();
                                break;

                        }
                    }
                    else{
                        $('#chkY1').siblings().text('高一上');
                        $('#chkY2').siblings().text('高一下');
                        $('#chkY3').siblings().text('高二上');
                        $('#chkY4').siblings().text('高二下');
                        $('#chkY5').siblings().text('高三上');
                        $('#chkY6').siblings().text('高三下');
                        $('#chkY7').parent().remove();
                        $('#chkY8').parent().remove();
                    }
                    //109下冊次調整110上
                    //if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}






                    break;
            }
        }

        newObj.recent_year = bs.getRecentYear();
        if (grade=='EP') {
            if (subject=='E21'){
                $('#chkY1').val(newObj.recent_year + '-A' + '-' + 'EP' + '-' + '0');
                $('#chkY3').val(newObj.recent_year + '-B' + '-' + 'EP' + '-' + '0');
            }else{
                $('#chkY1').val(newObj.recent_year + '-0' + '-' + 'EP' + '-' + '0');
            }


        }
    }

    function showChkYear(grade_id) {
        //段考測次題目選項調整
        var source_value=$('input:radio[name="radioSource"]:checked').val();
        // 正式站與測試站校正更動 用域名去判斷
        var check_location=location.host;





        $('.chkYear').show();
        const grade_ary = bs.getRelatedGrade(grade_id.replace('grade', ''));
        const subject = bs.getUrlVar('subject').split('-')[1];

        if (grade_id=='gradeJ3' || grade_id=='gradeH3') {
            $('#radioS2').parent().show();
            $('#chkY9').siblings().html('全')
            $('#chkY9').val(parseInt(newObj.recent_year)+ '-0' + '-' + bs.getUrlVar('subject').split('-')[0]+ '-' + '0');
        }
        else {
            $('#radioS2').prop('checked', false);
            $('#radioS2').parent().hide();
            $('#chkY9').prop('checked', false);
            $('#chkY9').parent().hide();
        }

        if ($('#radioS2').prop('checked')) {

            $('#chkY9').parent().show();
            $('#chkY9').prop('checked', true);

            $('.chkYear').hide();
            $('.chkYear >input').prop('checked', false);

            $('#chk-factory').append(
                '<div class="form-check form-check-inline">' +
                '<input class="form-check-input" type="radio" name="radioFactory" id="radioF00" value="0">' +
                '<label class="form-check-label" for="radioF00">力宇</label>' +
                '</div>');

            $('input:radio[name="radioFactory"]').parent().hide();
            $('#radioF00').parent().show();
            $('#radioF00').prop('checked', true);

            $('.strictRange').hide();
        } else {
            $('#chkY9').parent().hide();
            $('#chkY9').prop('checked', false);

            $('.chkYear').show();

            $('input:radio[name="radioFactory"]').parent().show();
            if (bs.getUrlVar('subject').split('-')[0] == 'H0' && bs.getUrlVar('subject').split('-')[1] != 'C0') {
                $('#radioF0').prop('checked', true);
            }
            $('#radioF00').parent().remove();

            $('.strictRange').show();
        }

        if (bs.getUrlVar('subject').split('-')[0] == 'E0') {
            var grade_text = bs.getGradeText(grade_id.replace('grade', ''));
            $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+ '-' + '0');
            $('#chkY1').siblings().text(grade_text+'上');
            $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+ '-' + '0');
            $('#chkY2').siblings().text(grade_text+'下');
        }






        else if (grade_id === 'gradeJ1' || (grade_id === 'gradeH1' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M' && subject.substr(0,1)!='S')) {
            $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+ '-' + '0');
            $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+ '-' + '0');
            $('#chkY3').prop('checked', false);
            $('#chkY3').parent().hide();
            $('#chkY4').prop('checked', false);
            $('#chkY4').parent().hide();
            $('#chkY5').prop('checked', false);
            $('#chkY5').parent().hide();
            $('#chkY6').prop('checked', false);
            $('#chkY6').parent().hide();
        } else if (grade_id === 'gradeJ2' || (grade_id === 'gradeH2' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M' && subject.substr(0,1)!='S')) {
            //段考測次題目選項調整
            if (source_value=='F'){


                // $('#chkY1').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[0]+ '-' + '0');
                // $('#chkY2').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[0]+ '-' + '0');
                $('#chkY1').prop('checked', false);
                $('#chkY1').parent().hide();
                $('#chkY2').prop('checked', false);
                $('#chkY2').parent().hide();


                $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY5').prop('checked', false);
                $('#chkY5').parent().hide();
                $('#chkY6').prop('checked', false);
                $('#chkY6').parent().hide();

            }
            else{
                $('#chkY1').prop('checked', false);
                $('#chkY1').parent().show();
                $('#chkY2').prop('checked', false);
                $('#chkY2').parent().show();

                $('#chkY1').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[0]+ '-' + '0');
                $('#chkY2').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[0]+ '-' + '0');
                $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY5').prop('checked', false);
                $('#chkY5').parent().hide();
                $('#chkY6').prop('checked', false);
                $('#chkY6').parent().hide();
            }

        } else if (grade_id === 'gradeJ3' || (grade_id === 'gradeH3' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M')) {

            //段考測次題目選項調整
            if (source_value=='F'){


                $('#chkY1').prop('checked', false);
                $('#chkY1').parent().hide();
                $('#chkY2').prop('checked', false);
                $('#chkY2').parent().hide();


                // $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
                // $('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY3').prop('checked', false);
                $('#chkY3').parent().hide();
                $('#chkY4').prop('checked', false);
                $('#chkY4').parent().hide();


                $('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
                $('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');



            }
            else if (source_value=='H')   {
                $('#chkY9').parent().show();
                $('#chkY9').prop('checked', true);
            }

            else{


                $('#chkY1').val((parseInt(newObj.recent_year) - 2) + '-A' + '-' + grade_ary[0]+ '-' + '0');
                $('#chkY2').val((parseInt(newObj.recent_year) - 2) + '-B' + '-' + grade_ary[0]+ '-' + '0');
                $('#chkY3').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[1]+ '-' + '0');
                $('#chkY4').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[1]+ '-' + '0');
                if (grade_id === 'gradeH3'){
                    $('#chkY5').prop('checked', false);
                    $('#chkY5').parent().hide();
                    $('#chkY6').prop('checked', false);
                    $('#chkY6').parent().hide();
                }
                else {
                    $('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
                    $('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');
                }
                //$('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
                //$('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');

                //109下冊次調整110上
                //if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}




            }










        } else if (grade_id == 'gradeEP') {

            if (subject=='E21'){
                $('#chkY1').val(newObj.recent_year + '-A' + '-' + grade_ary[0] + '-' + '0');
                $('#chkY3').val(newObj.recent_year + '-B' + '-' + grade_ary[0] + '-' + '0');
            }else{
                $('#chkY1').val(newObj.recent_year + '-0' + '-' + grade_ary[0] + '-' + '0');
            }

        }



        switch (grade_id) {
            case 'gradeH1':
                switch (subject) {
                    case 'N1':
                        $('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    case 'N3':
                        $('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        break;
                    case 'N4':
                        $('#chkY1').siblings().html('必修物理&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0]+'-'+'ND');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        break;
                    case 'N5':
                        $('#chkY1').siblings().html('必修化學&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0]+'-'+'NE');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    case 'M0':
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S1':
                        $('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S71');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S72');
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S2':
                        $('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S81');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S82');
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S3':
                        $('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S91');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S92');
                        $('#chkY3').prop('checked', false);
                        $('#chkY3').parent().hide();
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                }
                break;
            case 'gradeH2':
                switch (subject) {
                    case 'N1':
                        $('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1] + '-' + 'NB1');
                        $('#chkY3').val((parseInt(newObj.recent_year))+'-B'+'-' + grade_ary[1] + '-' + 'NB2');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    case 'N3':
                        $('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        break;
                    case 'N4':
                        $('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0]+'-'+'ND');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'NA1');
                        $('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'NA2');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        break;
                    case 'N5':
                        $('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0]+'-'+'NE');
                        $('#chkY2').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'N91');
                        $('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'N92');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    case 'M0':
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'0');
                        $('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+'-'+'0');
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S1':
                        $('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修歷史III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S71');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S72');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S73');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S2':
                        $('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修地理III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S81');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S82');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S83');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S3':
                        $('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修公民III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S91');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S92');
                        $('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S93');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                }
                break;
            case 'gradeH3':
                switch (subject) {
                    case 'N1':
                        $('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1] + '-' + 'NB1');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1)+'-B'+'-' + grade_ary[1] + '-' + 'NB2');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    //109下冊次調整110上
                    //if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}
                    case 'N3':
                        $('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
                        $('#chkY2').prop('checked', false);
                        $('#chkY2').parent().hide();
                        break;
                    case 'N4':
                        $('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0]+'-'+'ND');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'NA1');
                        $('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'NA2');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        break;
                    case 'N5':
                        $('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0]+'-'+'NE');
                        $('#chkY2').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'N91');
                        $('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'N92');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        break;
                    case 'M0':
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'0');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'0');
                        $('#chkY4').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[1]+'-'+'0');
                        $('#chkY5').parent().remove();
                        $('#chkY6').parent().remove();
                        $('#chkY7').parent().remove();
                        $('#chkY8').parent().remove();
                        break;

                    case 'S1':
                        $('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修歷史III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S71');
                        $('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S72');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S73');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S2':
                        $('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修地理III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S81');
                        $('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S82');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S83');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                    case 'S3':
                        $('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;');
                        $('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;');
                        $('#chkY3').siblings().html('必修公民III&nbsp;&nbsp;');
                        $('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S91');
                        $('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S92');
                        $('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S93');
                        $('#chkY4').prop('checked', false);
                        $('#chkY4').parent().hide();
                        $('#chkY5').prop('checked', false);
                        $('#chkY5').parent().hide();
                        $('#chkY6').prop('checked', false);
                        $('#chkY6').parent().hide();
                        $('#chkY7').prop('checked', false);
                        $('#chkY7').parent().hide();
                        $('#chkY8').prop('checked', false);
                        $('#chkY8').parent().hide();
                        break;
                }
                break;
        }
    }
});
