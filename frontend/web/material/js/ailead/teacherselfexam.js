$(function(){
    'use strict';
    var newObj = {};
    init();


    function init(){
        //newObj = initObj();
        getSchool();

        getGradeCode();
        geteplimitSchoolclass();
        getTermCode();
        getFactoryCode();
        $('#tbList').hide();
        $('#btn-export').removeClass('btn-purple').addClass('btn-secondary');
        $('#btn-export').attr('disabled',true);


        $('#select-school').on('change', function(e) {
            e.preventDefault();
            getGradeCode();
            geteplimitSchoolclass();

        });

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            geteplimitSchoolclass();

        });

        $('#select-status').on('change', function(e) {
            e.preventDefault();
            geteplimitSchoolclass();

        });

        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();
            // getschoolclassstudent();
            // $('#select-student').show();
            var schoolclass_obj=getSchoolclassObj();
            getTermCode(schoolclass_obj);
            getFactoryCode(schoolclass_obj);

        });

        $('#select-termcode').on('change', function(e) {
            e.preventDefault();
            var schoolclass_obj=getSchoolclassObj();
            getFactoryCode(schoolclass_obj);
        });

        $('#select-factory').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });

        $('#check-close').on('change',function (e){
            e.preventDefault();
            getSchool();
            getGradeCode();
            getTermCode();
            getFactoryCode();
            geteplimitSchoolclass();
        });




    }


    function getSchool() {
        $.ajax({
            url: '/admin/quizpaper/get-school',
            type: 'post',
            success: function(res) {
                $('#select-school option').remove();
                $('#select-school').append('<option value="-1">請選擇機構</option>');
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
                $('#select-grade').append('<option value="-1">請選擇年級</option>');
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
    function geteplimitSchoolclass(status=1) {
        var dataObj = {};
        dataObj.type='exam';
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        var check_close=$('#check-close').prop('checked');

         if (check_close==false){
             dataObj.status =status;
             //傳班級狀態
             $.ajax({
                 url: '/admin/quizpaper/geteplimit-schoolclass',
                 type: 'post',
                 data: dataObj,
                 success: function(res) {
                     newObj.schoolclass_list = res;
                     $('#select-schoolclass option').remove();
                     $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                     $.each(res, function(key, item) {
                         if (item.name.indexOf('結') != -1) {
                             return;
                         }
                         $('#select-schoolclass').append('<option value="' + item.id + '">' + item.name + '</option>');
                     });
                     $('#select-schoolclass').select2({
                         theme: "bootstrap",
                         minimumResultsForSearch: Infinity
                     });
                 },
                 error: bs.errorHandler
             });
         }else{
             //顯示已結業之班級
             dataObj.status = -1;
             $.ajax({

                 url: '/admin/quizpaper/get-schoolclass',
                 type: 'post',
                 data: dataObj,
                 success: function(res) {
                     newObj.schoolclass_list = res;
                     $('#select-schoolclass option').remove();
                     $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                     $.each(res, function(key, item) {
                         $('#select-schoolclass').append('<option value="' + item.id + '" status ="'+item.status+'" >' + item.name + '</option>');
                     });
                     $('#select-schoolclass').select2({
                         theme: "bootstrap",
                         minimumResultsForSearch: Infinity
                     });
                 },
                 error: bs.errorHandler
             });

         }


    }
    function getschoolclassstudent() {
        var dataObj={};
        dataObj.schoolclass_id=$('#select-schoolclass').val();
        $.ajax({
            url: '/admin/banwu/get-schoolclass-student',
            type: 'post',
            data: dataObj,
            success: function(res) {
                newObj.student_list = res;
                $('#select-student option').remove();
                $('#select-student').append('<option value="-1">請選擇學生</option>');
                $.each(res, function(key, item) {

                    $('#select-student').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-student').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });

    }

    function getTermCode(schoolclass_obj) {
        $('#select-termcode option').remove();
        $('#select-termcode').append('<option value="-1">請選擇冊別</option>');

        if (schoolclass_obj) {
            var text_year = schoolclass_obj.text_year;
            var grade_code = schoolclass_obj.grade_code;
            var subject_code =schoolclass_obj.subject_code;
            var is_exam = schoolclass_obj.is_exam;

            // if (is_exam==0) {
            //     swal('此班級沒有自我練習的權限');
            //     return false;
           // }

            //愛學霸的科目判斷機制
            if (subject_code=='S71'||subject_code=='S72'||subject_code  =='S73'||subject_code  =='S41'||subject_code  =='S42'||subject_code  =='S43'){
                //歷史
                subject_code='S1';
            }
            if (subject_code=='S81'||subject_code=='S82'||subject_code  =='S83'||subject_code  =='S51'||subject_code  =='S52'||subject_code  =='S53'){
                //地理
                subject_code='S2';
            }
            if (subject_code=='S91'||subject_code=='S92'|| subject_code  =='S93'||subject_code  =='S61'||subject_code  =='S62'||subject_code  =='S63'){
                //公民
                subject_code='S3';
            }
            if (subject_code=='NI'||subject_code=='NC' ||subject_code  =='N81'||subject_code  =='N8'||subject_code=='NB'||subject_code=='NB1'||subject_code=='NB2'||subject_code=='NB3'||subject_code=='NB4'){
                //生物
                subject_code='N1';
            }
            if (subject_code=='NJ'||subject_code=='NF'){
                //地科
                subject_code='N3';
            }
            if (subject_code=='ND'||subject_code  =='N6'||subject_code  =='N7'||subject_code  =='NA1'||subject_code  =='NA'||subject_code=='NA2'||subject_code=='NA3'||subject_code=='NA4'||subject_code=='NA5'){
                //物理
                subject_code='N4';
            }
            if (subject_code=='NE'||subject_code=='NG'||subject_code=='NH'||subject_code=='N91'||subject_code=='N9'||subject_code=='N92'||subject_code=='N93'||subject_code=='N94'||subject_code=='N95'){
                //化學
                subject_code='N5';
            }
            if (subject_code=='M1'){
                subject_code='M0';
            }



            var year_up_1 = 0;
            var year_up_2 = 0;
            var year_up_3 = 0;
            var year_up_4 = 0;
            var year_up_5 = 0;
            var year_up_6 = 0;
            switch (grade_code) {
                case 'E1':
                    year_up_1=0;
                    year_up_2=0;
                    year_up_3=0;
                    year_up_4=0;
                    year_up_5=0;
                    year_up_6=0;
                    break;
                case 'E2':
                    year_up_1=0;
                    year_up_2=1;
                    year_up_3=1;
                    year_up_4=1;
                    year_up_5=1;
                    year_up_6=1;
                    break;
                case 'E3':
                    year_up_1=0;
                    year_up_2=1;
                    year_up_3=2;
                    year_up_4=2;
                    year_up_5=2;
                    year_up_6=2;
                    break;
                case 'E4':
                    year_up_1=0;
                    year_up_2=1;
                    year_up_3=2;
                    year_up_4=3;
                    year_up_5=3;
                    year_up_6=3;
                    break;
                case 'E5':
                    year_up_1=0;
                    year_up_2=1;
                    year_up_3=2;
                    year_up_4=3;
                    year_up_5=4;
                    year_up_6=4;
                    break;
                case 'E6':
                    year_up_1=0;
                    year_up_2=1;
                    year_up_3=2;
                    year_up_4=3;
                    year_up_5=4;
                    year_up_6=5;
                    break;
                case 'J1':
                case 'H1':
                    year_up_1 = 0;
                    year_up_2 = 0;
                    year_up_3 = 0;
                    break;
                case 'J2':
                case 'H2':
                    year_up_1 = 0;
                    year_up_2 = 1;
                    year_up_3 = 1;
                    break;
                case 'J3':
                case 'H3':
                    year_up_1 = 0;
                    year_up_2 = 1;
                    year_up_3 = 2;
                    break;
                default:
                    year_up_1 = 0;
                    year_up_2 = 0;
                    year_up_3 = 0;
                    break;
            }

            var book_obj={};
            const role = JSON.parse(schoolclass_obj.role);

            //國小一二隱藏
            // if (role.E1A === 1) {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'E5' + '-' + '0' + '">小ㄧ上</option>');
            // }
            // if (role.E1B === 1) {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'E5' + '-' + '0' + '">小一下</option>');
            // }
            // if (role.E2A === 1) {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'E6' + '-' + '0' + '">小二上</option>');
            // }
            // if (role.E2B === 1) {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'E6' + '-' + '0' + '">小二下</option>');
            // }

            if (role.E3A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'E3' + '-' + '0' + '">小三上</option>');
            }
            if (role.E3B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'E3' + '-' + '0' + '">小三下</option>');
            }
            if (role.E4A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_4) + '-A' + '-' + 'E4' + '-' + '0' + '">小四上</option>');
            }
            if (role.E4B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_4) + '-B' + '-' + 'E4' + '-' + '0' + '">小四下</option>');
            }

            if (role.E5A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_5) + '-A' + '-' + 'E5' + '-' + '0' + '">小五上</option>');
            }
            if (role.E5B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_5) + '-B' + '-' + 'E5' + '-' + '0' + '">小五下</option>');
            }
            if (role.E6A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_6) + '-A' + '-' + 'E6' + '-' + '0' + '">小六上</option>');
            }
            if (role.E6B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_6) + '-B' + '-' + 'E6' + '-' + '0' + '">小六下</option>');
            }
            if (role.EP === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'EP' + '-' + '0' + '">全</option>');
            }
            if (role.EPA === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'EP' + '-' + '0' + '">初級(1)</option>');
            }
            if (role.EPB === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'EP' + '-' + '0' + '">初級(2)</option>');
            }
            if (role.J1A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'J1' + '-' + '0' + '">國一上</option>');
            }
            if (role.J1B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'J1' + '-' + '0' + '">國一下</option>');
            }
            if (role.J2A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'J2' + '-' + '0' + '">國二上</option>');
            }
            if (role.J2B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'J2' + '-' + '0' + '">國二下</option>');
            }
            if (role.J3A === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'J3' + '-' + '0' + '">國三上</option>');
            }
            if (role.J3B === 1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'J3' + '-' + '0' + '">國三下</option>');
            }

            if (role.J0 ===1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'J0' + '-' + '0' + '">總複習</option>');
            }

            if (role.H1A === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'A');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'H1' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H1B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'B');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'H1' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H1A === 1 || role.H1B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'0');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H2A === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'A');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'H2' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H2B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'B');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'H2' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H2A === 1 || role.H2B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'0');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-0' + '-' + 'H2' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H3A === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'A');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'H3' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
                if (subject_code=='M0') {
                    //109下冊次調整110上
                    if ((parseInt(text_year) + year_up_3)<110){
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'H3' + '-' + 'M2' + '">選修數學(乙)上</option>');
                    }

                }
            }

            if (role.H3B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'B');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'H3' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
                //109下冊次調整110上

                if (subject_code=='M0') {
                    //109下冊次調整110上
                    if ((parseInt(text_year) + year_up_3)<110) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'H3' + '-' + 'M2' + '">選修數學(乙)下</option>');
                    }
                }
            }

            if (role.H3A === 1 || role.H3B === 1) {
                book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'0');
                if (Object.getOwnPropertyNames(book_obj).length>0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'H3' + '-' + book_obj.book_code + '">'+book_obj.book_name+'</option>');
                }
            }

            if (role.H0 ===1) {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'H0' + '-' + '0' + '">總複習</option>');
            }
        }

        $('#select-termcode').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getFactoryCode(schoolclass_obj) {

        $('#select-factory option').remove();
        $('#select-factory').append('<option value="-1">請選擇版本</option>');

        if (schoolclass_obj) {
            var dataObj = {};
            dataObj.grade_code = schoolclass_obj.grade_code;
            dataObj.subject_code = schoolclass_obj.subject_code;
            dataObj.term_code = $('#select-termcode').val();
            $.ajax({
                url: '/admin/quizpaper/get-factory-code',
                type: 'post',
                data: dataObj,
                success: function(res) {
                    $.each(res, function(key, item) {
                        $('#select-factory').append('<option value="' + item.code + '">' + item.name + '</option>');
                    });
                },
                error: bs.errorHandler
            });
        }

        $('#select-factory').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function findObjectByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return array[i];
            }
        }
        return null;
    }

    function getSchoolclassObj(){
        var schoolclass_obj = findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
        if (schoolclass_obj) {
            newObj.grade_code = schoolclass_obj.grade_code;
            newObj.subject_code = schoolclass_obj.subject_code;
        } else {
            newObj.grade_code='-1';
            newObj.subject_code = '-1';
        }

        return schoolclass_obj;
    }
    function checkChange() {
        var sel_school=$('#select-school').val();
        var sel_schoolclass = $('#select-schoolclass').val();
        var sel_termcode = $('#select-termcode').val();
        var sel_subject = newObj.subject_code;
        var sel_factory = $('#select-factory').val();


        if (sel_schoolclass != '-1' && sel_termcode != '-1' && sel_subject != '-1' && sel_factory != '-1' && sel_school !='-1') {
            $('#tbList').show();
            getRange();

        }
    }
    function getRange(){

        newObj.tblist = $('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': "full_numbers",
            'aLengthMenu': [
                [30],
                ['30']
            ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'order': [
                [1, 'desc']
            ], //指定默認的次序
            'bInfo': true,
            //'sScrollX': '100%', //橫向滾動條
            //'sScrollY': '60%',
            //'sScrollX': '2000px',
            'processing': true, //等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            //==========請求數據start
            'serverSide': true,
            'destroy':true,
            'ajax': {
                'type': 'post',
                'url': '/admin/banwu/get-testselfexam-list',
                'data':function(data){

                    data.school_id=$('#select-school').val();
                    data.school_name=$('#select-school :selected').text();
                    data.schoolclass_id = $('#select-schoolclass').val();
                    data.schoolclass_name=$('#select-schoolclass :selected').text();
                    data.grade_code_name=$('#select-grade :selected ').text();
                    data.subject_code = newObj.subject_code;
                    var yearTermAry = [];
                    yearTermAry.push($('#select-termcode').val());
                    yearTermAry.sort();
                    data.yearTermAry = yearTermAry;
                    data.factory_code = $('#select-factory').val();
                    data.factory_name=$('#select-factory :selected').text();
                    data.course_code=($('#select-termcode :selected').text()=='總複習')?['H']:['B'];
                    data.term_name=$('#select-termcode :selected').text();
                    data.stuname=$('#txt-search').val();

                }

            },
            'initComplete': function() {
                $('#btn-export').removeClass('btn-secondary').addClass('btn-primary');
                $('#btn-export').attr('disabled',false);
                $('#btn-export').on('click', function(e) {
                    e.preventDefault();

                   var check_school_id=$('#select-school').val();
                   var checl_grade_code= $('#select-grade').val();
                   var check_schoolclass_id = $('#select-schoolclass').val();
                   var check_factory_code=  $('#select-factory').val();
                   var check_termcode= $('#select-termcode').val();
                   // console.log(check_school_id);
                   // console.log(checl_grade_code);
                   // console.log(check_schoolclass_id);
                   // console.log(check_factory_code);
                   // console.log(check_termcode);

                   if (check_school_id==-1){
                       swal("請選擇機構");
                       return false;
                   }
                   if (checl_grade_code==-1){
                       swal("請選擇年級");
                       return false;
                   }
                   if (check_schoolclass_id==-1){
                        swal("請選擇班級");
                        return false;
                    }
                    if (check_factory_code==-1){
                        swal("請選擇版本");
                        return false;
                    }
                    if (check_termcode==-1){
                        swal("請選擇冊別");
                        return false;
                    }



                    var dataObj={};
                    dataObj.school_id=$('#select-school').val();
                    dataObj.school_name=$('#select-school :selected').text();
                    dataObj.schoolclass_id = $('#select-schoolclass').val();
                    dataObj.schoolclass_name=$('#select-schoolclass :selected').text();
                    dataObj.grade_code_name=$('#select-grade :selected ').text();
                    dataObj.subject_code = newObj.subject_code;
                    dataObj.yearTermAry = [];
                    var yearTermAry = [];
                    yearTermAry.push($('#select-termcode').val());
                    yearTermAry.sort();
                    dataObj.yearTermAry = yearTermAry;
                    dataObj.factory_code = $('#select-factory').val();
                    dataObj.factory_name=$('#select-factory :selected').text();
                    dataObj.course_code=($('#select-termcode :selected').text()=='總複習')?['H']:['B'];
                    dataObj.term_name=$('#select-termcode :selected').text();
                    dataObj.schoolclass_status=$('input[id=check-close]:checked').val();

                        setTimeout(function() {
                     location.href='/admin/banwu/export-teacherselfexam-list?school_id=' + dataObj.school_id
                         + '&school_name='+ dataObj.school_name
                         + '&schoolclass_id='+ dataObj.schoolclass_id
                         + '&schoolclass_name=' + dataObj.schoolclass_name
                         + '&grade_code_name='  + dataObj.grade_code_name
                         + '&subject_code='  + dataObj.subject_code
                         + '&yearTermAry='  + dataObj.yearTermAry
                         +'&factory_code='+dataObj.factory_code
                         + '&factory_name='+dataObj.factory_name
                         +'&course_code='+dataObj.course_code
                         +'&term_name='+dataObj.term_name; }, 500);
                });
                $('#txt-search').on('keypress',function(e){
                    if (e.which==13) {
                        dataObj.stuname=$('#txt-search').val();
                        newObj.tblist.draw();
                    }
                });

                $('#btn-search').on('click',function (e){
                    e.preventDefault();
                    newObj.tblist.draw();
                });

                $('#tbList tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    // if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                    //     return;
                    // }
                    // 連結
                    var data = newObj.tblist.row(this).data();
                    data.grade_code=bs.getNormalGrade($('#select-grade').val())
                   // console.log(data);



                    window.open('/admin/banwu/teacherselfexamview?stu_id='+ data.stu_id+'&schoolclass_id='+data.schoolclass_id+'&yearTermAry='+data.yearTermAry+'&factory_code='+data.factory_code+'&grade_code='+data.grade_code,'_blank');

                });
            },
            'drawCallback': function() {
                newObj.tblist.rows().every(function() {

                });
            },
            'columns': [
                {
                    'data': 'schoolclass_id',
                    'orderalbe':false,
                    "visible": false,
                    "searchable": false
                },
                {
                    'title': '機構',
                    'data': 'school_name',
                    'width': 30,
                    'orderable': false
                },
                {
                    'title': '年級',
                    'data': 'grade_code_name',
                    'width':10,
                    'orderable': false
                },
                {
                    'title': '班級',
                    'data': 'schoolclass_name',
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': '座號',
                    'data': 'seat_no',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '姓名',
                    'data': 'stuname',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': "科目",
                    "data": "subject_name",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "冊別",
                    "data": "term_name",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "版本",
                    "data": "factory_name",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "作答總題數",
                    "data": "total_ans_count",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "A++",
                    "data": "A_rank_puls_double",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "A+",
                    "data": "A_rank_puls",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "A",
                    "data": "A_rank",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "B++",
                    "data": "B_rank_puls_double",
                    'width': 10,
                    'orderable': false

                },
                {
                    'title': "B+",
                    "data": "B_rank_puls",
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': "B",
                    "data": "B_rank",
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': "C",
                    "data": "C_rank",
                    'width': 10,
                    'orderable': false
                }

            ],
            'columnDefs': [{
            }, {
                'targets': [0, 2], // column or columns numbers
                'orderable': false, // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });

        return newObj;
    }

    function initObj() {

        // newObj.tblist = $('#tbList').DataTable({
        //     'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
        //     'sPaginationType': "full_numbers",
        //     'aLengthMenu': [
        //         [30],
        //         ['30']
        //     ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
        //     'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
        //     'paging': true, //分頁開關
        //     'oLanguage': {
        //         'sLengthMenu': '每頁顯示 _MENU_ 筆紀錄',
        //         'sZeroRecords': '找不到相關數據',
        //         'sInfo': '顯示 _START_ 到 _END_ 筆，共 _TOTAL_ 筆紀錄',
        //         'sInfoEmtpy': '對不起，查詢不到任何相關數據',
        //         'sInfoFiltered': '(總筆數 _MAX_ )',
        //         'sProcessing': '載入中...',
        //         'sSearch': '搜尋',
        //         'sUrl': '', //多語言配置文件，可將oLanguage的設置放在一個txt文件中，例：Javascript/datatable/dtCH.txt
        //         'oPaginate': {
        //             'sFirst': '第一頁',
        //             'sPrevious': '上一頁 ',
        //             'sNext': '下一頁 ',
        //             'sLast': '最終頁 '
        //         },
        //     }, //多語言配置
        //     'bFilter': false, //搜尋欄開關
        //     'bSortClasses': true,
        //     'bSort': true,
        //     'order': [
        //         [1, 'desc']
        //     ], //指定默認的次序
        //     'bInfo': true,
        //     //'sScrollX': '100%', //橫向滾動條
        //     //'sScrollY': '60%',
        //     //'sScrollX': '2000px',
        //     'processing': true, //等待加載效果
        //     //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
        //     'deferRender': true,
        //     //==========請求數據start
        //     'serverSide': true,
        //     'ajax': {
        //         'type': 'post',
        //         'url': '/admin/banwu/get-teacherselfexam-list',
        //
        //     },
        //     'initComplete': function() {
        //
        //     },
        //     'drawCallback': function() {
        //         newObj.tblist.rows().every(function() {
        //
        //         });
        //     },
        //     'columns': [
        //         {
        //             'data': 'schoolclass_id'
        //         },
        //         {
        //             'title': '機構',
        //             'data': 'school_name',
        //             'width': 30
        //         },
        //         {
        //             'title': '年級',
        //             'data': 'grade_code_name',
        //             'width':10
        //         },
        //         {
        //             'title': '班級',
        //             'data': 'schoolclass_name',
        //             'width': 10
        //
        //         },
        //         {
        //             'title': '座號',
        //             'data': 'seat_no',
        //             'width': 10
        //         },
        //         {
        //             'title': '姓名',
        //             'data': 'stuname',
        //             'width': 10
        //         },
        //         {
        //             'title': "科目",
        //             "data": "subject_name",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "冊別",
        //             "data": "term_name",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "版本",
        //             "data": "factory_name",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "作答總題數",
        //             "data": "total_ans_count",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "A++",
        //             "data": "A_rank_puls_double",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "A+",
        //             "data": "A_rank_puls",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "A",
        //             "data": "A_rank",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "B++",
        //             "data": "B_rank_puls_double",
        //             'width': 10
        //
        //         },
        //         {
        //             'title': "B+",
        //             "data": "B_rank_puls",
        //             'width': 10,
        //             'orderable': false
        //         },
        //         {
        //             'title': "B",
        //             "data": "B_rank",
        //             'width': 10,
        //             'orderable': false
        //         },
        //         {
        //             'title': "C",
        //             "data": "C_rank",
        //             'width': 10,
        //             'orderable': false
        //         }
        //
        //     ],
        //     'columnDefs': [{
        //         'targets': 0,
        //         'checkboxes': {
        //             'selectRow': true
        //         }
        //     }, {
        //         'targets': [0, 2], // column or columns numbers
        //         'orderable': false, // set orderable for selected columns
        //     }],
        //     'select': {
        //         'style': 'multi'
        //     },
        // });
        //
        // return newObj;
    }

});