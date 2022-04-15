$(function() {
    'use strict';
    var newObj = {};
    newObj.check_grade_ary=[];
    newObj.check_subject_ary=[];
    init();

    function init() {
        getSchool();
        getGradeCode();
        getSchoolclass();
        getSubjectCode();
        getVideoTag();
        initObj();

        $('#btn-sendvideo').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一個影片派出');
                return false;
            }

            var grade_count=0;
            var grade_temp='';
            $.each(newObj.check_grade_ary,function(key,item){
                if (grade_temp=='') {
                    grade_temp=item.grade_name.replace('一年級','').replace('二年級','').replace('三年級','');
                    grade_count++;
                }
                if (grade_temp!=item.grade_name.replace('一年級','').replace('二年級','').replace('三年級','')) {
                    grade_count++;
                }

                if (!item.grade_name) {
                    grade_count=-1;
                    return false;
                }
            });

            if (grade_count==-1) {
                swal('請選擇有年級的影片派出');
                return false;
            }

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
                if (!item.subject_name) {
                    subject_count=-1;
                    return false;
                }
            });

            if (subject_count==-1) {
                swal('請選擇有科目的影片派出');
                return false;
            }

            if (subject_count>1) {
                swal('請選擇同一科目的影片派出');
                return false;
            }

            var vids='';
            $.each(rows_selected, function(key, item){
                vids+=item+'-';
            });
            vids=vids.slice(0,-1);

            location.href='/admin/schoolvideo/sendvideo?&vid='+vids;
        });

        $('#btn-delete').on('click', function(e) {
            e.preventDefault();
            if (confirm('是否確定刪除自派影片？請注意，刪除後學生將無法再觀看此影片。')) {
                disableVideo();
            }
        });

        $('#select-school').on('change', function(e) {
            e.preventDefault();
            getGradeCode();
            getSchoolclass();
        });

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            getSchoolclass();
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
                'url': '/admin/schoolvideo/get-extra-list',
                'type':'POST',
                'data':function(data){
                    data.school_id=$('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.schoolclass_id=$('#select-schoolclass').val();
                    data.subject_code=$('#select-subject').val();
                    data.schoolvideo_tag_ary=$('#select-videotags').val();
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
                    window.open('/admin/schoolvideo/extraview?id='+ data[0],'_blank');
                });

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-schoolclass').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-videotags').on('change',function(e){
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

                $('.dt-checkboxes-cell').off('change').on('change',function(e){
                    e.preventDefault();
                    if ($(this).find('.dt-checkboxes').prop('checked')) {

                        if(!findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0])){
                            var grade_obj={};
                            grade_obj.id=newObj.tblist.row(this).data()[0];
                            grade_obj.grade_name=newObj.tblist.row(this).data()[3];
                            newObj.check_grade_ary.push(grade_obj);
                        }

                        if(!findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0])){
                            var subject_obj={};
                            subject_obj.id=newObj.tblist.row(this).data()[0];
                            subject_obj.subject_name=newObj.tblist.row(this).data()[5];
                            newObj.check_subject_ary.push(subject_obj);
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
                    }
                });

                $('.dt-checkboxes-select-all').off('change').on('change',function(e){
                    e.preventDefault();
                    if ($('.dt-checkboxes-select-all').find('input:checkbox').prop('checked')) {

                        $.each(newObj.tblist.rows().data(),function(key,item){

                            if (!findIndexByKey(newObj.check_grade_ary,'id',item[0])) {
                                var grade_obj={};
                                grade_obj.id=item[0];
                                grade_obj.grade_name=item[3];
                                newObj.check_grade_ary.push(grade_obj);
                            }

                            if (!findIndexByKey(newObj.check_subject_ary,'id',item[0])) {
                                var subject_obj={};
                                subject_obj.id=item[0];
                                subject_obj.subject_name=item[5];
                                newObj.check_subject_ary.push(subject_obj);
                            }
                        });
                    }
                    else {
                        $.each(newObj.tblist.rows().data(),function(key,item){

                            var index = findIndexByKey(newObj.check_grade_ary,'id',item[0]);
                            if (index > -1) {
                                newObj.check_grade_ary.splice(index, 1);
                            }

                            index = findIndexByKey(newObj.check_subject_ary,'id',item[0]);
                            if (index > -1) {
                                newObj.check_subject_ary.splice(index, 1);
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
                    'targets': [0], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                }
            ],
            'select': {
                'style': 'multi'
            }
        });
    }

    function getSchool() {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
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

    function getSchoolclass(){
        var dataObj={};
        if ($('#select-school').val()) {
            dataObj.school_id = $('#select-school').val();
        }
        if ($('#select-grade').val()) {
            dataObj.grade_code = $('#select-grade').val();
        }
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

    function getSubjectCode() {
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
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

    function getVideoTag() {
        $.ajax({
            url: '/admin/schoolvideo/get-video-tag',
            type: 'post',
            success: function(res) {
                $('#select-videotags option').remove();
                $.each(res, function(key, item) {
                    $('#select-videotags').append('<option value="' + item.id + '">' + item.name + '</option>');
                });

                $('#select-videotags').select2({
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

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function disableVideo(){

        var rows_selected = newObj.tblist.column(0).checkboxes.selected();
        if (rows_selected.length==0) {
            swal('請選擇您要刪除的影片');
            return false;
        }

        var vid=[];
        $.each(rows_selected, function(key, item){
            vid.push(item);
        });

        var dataObj = {};
        dataObj.vid=vid;
        $.ajax({
            url: '/admin/schoolvideo/disable-extravideo',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message != 'success') {
                    swal(message);
                    return false;
                }
                location.replace('/admin/schoolvideo/extra');
            },
            error: bs.errorHandler
        });
    }
});
