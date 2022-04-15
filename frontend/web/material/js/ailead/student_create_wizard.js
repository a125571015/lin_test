$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {


        newObj = initObj();

        $('#btn-school-close').on('click',function(e){
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

            location.href='studentclose?type=manual&pid='+pid;
        });

        $('.prev-btn').on('click', function(e) {
            e.preventDefault();
            $('#student-wizard').steps('previous');
            $('.steps ul').find('.done').addClass('disabled');
            alert('1');
        });

        $('.next-btn').on('click', function(e) {
            e.preventDefault();
            $('#student-wizard').steps('next');
            $('.steps ul').find('.done').addClass('disabled');
        });

        $('.finish-btn').on('click', function(e) {
            e.preventDefault();
            $('#student-wizard').steps('finish');
        });


        // $('.next-btn').on('click', function(e) {
        //     e.preventDefault();
        //     $('#student-wizard').steps('next');
        // });
        //
        // $('.finish-btn').on('click', function(e) {
        //     e.preventDefault();
        //     $('#student-wizard').steps('finish');
        // });

        //$('.bt-switch input[type="checkbox"], .bt-switch input[type="radio"]').bootstrapSwitch();
        $('.bt-switch').bootstrapSwitch();

    }

    function initObj() {



        $('#student-wizard').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                grade_code: 'required',
                subject_code: 'required',
                name: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                grade_code: '請選擇年級',
                subject_code: '請選擇科目',
                name: '請輸入班級名稱',
            },
        });

        newObj.step = $('#student-wizard').steps({
            headerTag: 'h6',
            bodyTag: 'section',
            transitionEffect: 'fade',
            titleTemplate: '<span class="step">#index#</span> #title#',
            enablePagination: false,
            onStepChanging: function(event, currentIndex, newIndex) {
                //alert('onStepChanging');
                if (currentIndex == 0) {
                    if ($('#dataurl').val() == '') {
                        alert('網址不合格，請等試算表網頁讀取完畢後再複製網址');
                        return false;
                    }

                    var tmpHTML = '';
                    var dataObj = {};
                    dataObj.dataurl = $('#dataurl').val();
                    dataObj.datamode = 'check';
                    $.ajax({
                        url: '/admin/student/create_wizard_check',
                        data: dataObj,
                        type: 'POST',
                        async: false,
                        cache: false,
                        success: function (r) {
                            tmpHTML = r.stateinfo;
                            if (r.stateinfo != 'ok') {
                                $('#results').html(r.stateinfo);
                            } else {
                                $('#results').html('');
                            }
                        },
                        error: bs.errorHandler,
                    });

                    if (tmpHTML != 'ok') {
                        return false;
                    }

                    //$('.cancel-btn').hide();
                    $('.next-btn').hide();
                    //$('.prev-btn').show();
                    $('.finish-btn').show();
                    return true;
                } else {
                    //$('.cancel-btn').show();
                    //$('.next-btn').show();
                    //$('.prev-btn').hide();
                    //$('.finish-btn').hide();
                }
            },
            onStepChanged: function(event, currentIndex, priorIndex) {
                //alert('onStepChanged');
                if (currentIndex == 1){

                    newObj.tblist = $('#tbList').DataTable({
                        'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                        'sPaginationType': 'full_numbers',
                        'aLengthMenu': [[100], ['100']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
                            'url': '/admin/student/create_wizard_check',
                            'data':function(data){
                                data.dataurl = $('#dataurl').val();
                                data.datamode = 'check';
                            }
                        },
                        'initComplete': function () {
                            $('#tbList tbody').on('click', 'tr', function(e){
                                // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                                if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                                    return;
                                }
                            });
                        },
                        'drawCallback':function(){
                            newObj.tblist.rows().every(function(){
                                var item=this.data();

                                //invalidate the data DataTables has cached for this row
                                this.invalidate();
                            });
                        },
                        fixedColumns: true,
                        'columnDefs': [
                            {
                                'targets': 0,
                                'width': 1,
                            }, {
                                'targets': 0,
                                'checkboxes': {'selectRow': true}
                            }, {
                                'targets': [0,1,2,3,4,5,6,7,8], // column or columns numbers
                                'orderable': false,  // set orderable for selected columns
                            },{
                                'targets': [0], // column or columns numbers
                                'visible': false,
                            }
                        ],
                        'select': {
                            'style': 'multi'
                        },
                    });
                }

            },
            onFinishing: function(event, currentIndex) {

                //alert('onFinishing');
                // if ($('#select-grade2').val() === '-1') {
                //     swal('請選擇年級');
                //     return false;
                // }
                //
                // if ($('#select-category2').val() === '-1') {
                //     swal('請選擇考試類別');
                //     return false;
                // }
                //
                // if (!$('#txt-name').val()) {
                //     swal('請輸入考卷名稱');
                //     return false;
                // }

                return true;
            },
            onFinished: function(event, currentIndex) {

                if (currentIndex ==1) {
                    //相關參數
                    var dataObj = {};
                    dataObj.dataurl = $('#dataurl').val();
                    dataObj.datamode = 'exec';
                    $.ajax({
                        url: '/admin/student/create_wizard_check',
                        data: dataObj,
                        type: 'POST',
                        cache: false,
                        beforeSend: function () {
                            bs.disableSubmits(true);
                        },
                        success: function (r) {
                            if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                                alert(r.stateinfo);
                            }
                            if ((r.reurl != '') && (r.reurl !== undefined)) {
                                location.replace(r.reurl);
                            }
                        },
                        error: bs.errorHandler,
                        complete: function () {
                            bs.disableSubmits(false);
                        }
                    });
                }
            }
        });


        return newObj;
    }
});
