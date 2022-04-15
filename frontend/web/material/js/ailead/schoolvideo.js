$(function() {
    'use strict';
    var newObj = {};
    init();

    function getGradeName(grade_code) {
        if (grade_code =='E0') {
            return '國小不分';
        } else if (grade_code =='J0') {
            return '國中不分';
        } else if (grade_code =='H0') {
            return '高中不分';
        } else if (grade_code =='EP') {
            return '升私中';
        } else {
            return grade_code;
        }
    }

    function getSubjectName(subject_code) {
        if (subject_code =='C0') {
            return '國語文';
        } else if (subject_code =='C1') {
            return '中華文化';
        } else if (subject_code =='E0') {
            return '英語文';
        } else if (subject_code =='M0') {
            return '數學';
        } else if (subject_code =='N0') {
            return '自然';
        } else if (subject_code =='N1') {
            return '生物';
        } else if (subject_code =='N2') {
            return '理化';
        } else if (subject_code =='N3') {
            return '地科';
        } else if (subject_code =='N4') {
            return '物理';
        } else if (subject_code =='N5') {
            return '化學';
        } else if (subject_code =='S0') {
            return '社會';
        } else if (subject_code =='S1') {
            return '歷史';
        } else if (subject_code =='S2') {
            return '地理';
        } else if (subject_code =='S3') {
            return '公民';
        } else {
            return subject_code;
        }
    }

    function init() {
        bs.initSelectElement('#select-school', '/admin/quizpaper/get-school', '選擇機構', '-1', bs.getUrlVar('school_id'));
        bs.initSelectElement('#select-grade', '/admin/quizpaper/get-grade-code', '選擇年級', '-1', '');
        // bs.initSelectElement('#select-subject', '/admin/quizpaper/get-subject-code', '選擇科目', '-1', '');
        $('#select-subject').append('<option value="-1">選擇科目</option>');
        $('#select-subject').append('<option value="C0">國語文</option>');
        $('#select-subject').append('<option value="E0">英語文</option>');
        $('#select-subject').append('<option value="M0">數學</option>');
        $('#select-subject').append('<option value="N0">自然</option>');
        $('#select-subject').append('<option value="S0">社會</option>');
        $('#select-subject').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
        bs.initTagElement('#select-tags', '/admin/school/get-school-tag');

        newObj = initObj();

        $('#btn-schoolclass-close').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一個班級進行班級結業');
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
    }

    function initObj() {
        newObj.tblist = $('#tbList').DataTable({
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
                'url': '/admin/schoolvideo/list',
                'data':function(data){
                    data.school_id = $('#select-school').val();
                    data.grade_code=$('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.school_tag_id=$('#select-tags').val();
                    data.check_close=$('input[id=check-close]:checked').val();
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
                    //location.href = 'view/' + data[0];
                    //alert(data[4]);




                });

                $('#select-school').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
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
                newObj.tblist.rows().every(function(){
                    var item=this.data();
                    var subject = item[1];

                    item[1] = getGradeName(item[1]);
                    item[2] = getSubjectName(item[2]);

                    // if (subject == 'C0') { item[1] = '國語文';}
                    // if (subject == 'E0') { item[1] = '英語文';}
                    // if (subject == 'M0') { item[1] = '數學';}
                    // if (subject == 'N0') { item[1] = '自然';}
                    // if (subject == 'S0') { item[1] = '社會';}


                    var m3u8 = item[5];
                    // var newTags = '';
                    // if (tags) {
                    //     var tagAry = tags.split(';');
                    //     $.each(tagAry, function(key, item) {
                    //         newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                    //     });
                    // }
                    // item[4]=newTags;


                    //item[4]=  '<a href="#" onclick="" class="btn btn-outline-primary waves-effect waves-light">播放</a>';
                    item[5]=  '<a href="#" onclick="playMp4(\'m3u8_'+item[0]+'\',\''+item[4]+'\',\''+item[5]+'\');" class="btn btn-outline-primary waves-effect waves-light">播放</a>';

                    //onclick=\"playMp4('m3u8_{$model->id}','{$model->name}','{$m3u8Path}');\"


                    //invalidate the data DataTables has cached for this row
                    this.invalidate();
                });
            },
            'columnDefs': [
                {
                    'targets': 4,
                    'width': 1,
                }, {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                },{
                    'targets': [0,1,2], // column or columns numbers
                    'orderable': false,  // set orderable for selected columns
                //},{
                //    'targets': [4], // column or columns numbers
                //    'visible': false,
                }
            ],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }
});
