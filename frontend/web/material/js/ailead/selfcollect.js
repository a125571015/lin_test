$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        geteplimitSchoolclass();
        getTermCode();
        getFactoryCode();
        initObj();

        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();
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

        $('#btn-quiz').on('click', function(e) {
            e.preventDefault();
            createQuizPractice();
        });
    }

    function initObj(){
        newObj.grade_code='';
        newObj.subject_code='00';
        newObj.preview_ary=[];
        newObj.tblist2 = $('#tbList2').DataTable({
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
            'bSort': false,
            'order': [
                [0, 'desc']
            ], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            'serverSide': true,
            'ajax': {
                'url': '/admin/quizpaper/get-quiz-list',
                'type': 'POST',
                'data': function(data) {
                    data.quiz_difficulty_id = -1;
                    data.quiz_category_id = -1;
                    data.quiz_qtype_id = -1;
                    data.qa_text = '';
                    data.grade_code='';
                    data.subject_code=newObj.subject_code;
                    data.knowledges_jstree=[];
                    data.repeat_papers = [];
                    data.quiz_id_ary=newObj.preview_ary;
					data.quiz_source_type = [1,2,3];
                }
            },
            'initComplete': function() {

                $('#tbList2 tbody').on('click', 'tr', function(e) {
                    // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                    if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
                        return;
                    }

                    // 連結
                    var data = newObj.tblist2.row(this).data();
                    // self.location.href = 'view/' + data[0];
                });
            },
            'drawCallback': function() {



                newObj.tblist2.rows().every(function() {
                    var item = this.data();
                    var q_text = item[1];
                    item[1] = '<i class="fa fa-search quizPreview" data-id="' + item[0] + '" style="cursor:pointer"></i> ' + q_text;
                    this.invalidate();
                });

                $('.quizPreview').on('click', function(key, item) {
                    getQuizContent(0,$(this).attr('data-id'));
                });
            },
            'columnDefs': [
            {
                'targets': [0], // column or columns numbers
                'visible': false // set orderable for selected columns
            },
            {
                'targets': [0, 1], // column or columns numbers
                'orderable': false // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });
    }

    function geteplimitSchoolclass() {
        var dataObj = {};
        dataObj.type='exam';
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
    }

    function getTermCode(schoolclass_obj) {
        $('#select-termcode option').remove();
        $('#select-termcode').append('<option value="-1">請選擇冊別</option>');

        if (schoolclass_obj) {
            var text_year = schoolclass_obj.text_year;
            var grade_code = schoolclass_obj.grade_code;
            var subject_code =schoolclass_obj.subject_code;

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
            var role = JSON.parse(schoolclass_obj.role);

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

    function checkChange() {
        var sel_schoolclass = $('#select-schoolclass').val();
        var sel_termcode = $('#select-termcode').val();
        var sel_subject = newObj.subject_code;
        var sel_factory = $('#select-factory').val();
        if (sel_schoolclass!='-1' && sel_termcode != '-1' && sel_subject != '-1' && sel_factory != '-1') {
            getRange();
        }
    }

    function getRange() {
        var dataObj = {};
        dataObj.schoolclass_id = $('#select-schoolclass').val();
        dataObj.subject_code = newObj.subject_code;
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        yearTermAry.push($('#select-termcode').val());
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
        dataObj.factory_code = $('#select-factory').val();
        dataObj.course_code=($('#select-termcode :selected').text()=='總複習')?['H']:['B'];

        if (dataObj.schoolclass_id == '-1') {
            return false;
        }

        if (dataObj.subject_code == '-1') {
            return false;
        }

        if (dataObj.yearTermAry[0] == '-1') {
            return false;
        }

        if (dataObj.factory_code == '-1') {
            return false;
        }

        $.ajax({
            url: '/admin/banwu/get-selfcollect',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(response) {
                bs.disableSubmits(false);
                var res = response.data;
                newObj.data = res;
                newObj.knowledge_ary = [];
                newObj.quiz_id_ary = [];
                var inner_html = '';

                $.each(res, function(key, item) {
                    if (item.quiz_collect_ary) {
                        inner_html +=
                            '<thead class="thead-light">\
                                <tr>\
                                    <th><input type="checkbox" name="check-all" value="' + item.id + '"></th></th>\
                                    <th>單元/課次</th>\
                                    <th>收藏題數</th>\
                                </tr>\
                             </thead>';
                        return false;
                    }
                });

                $.each(res, function(key, item) {
                    if (item.quiz_collect_ary) {

                        var collect_link_html=item.quiz_collect_ary.length;

                        if (item.quiz_collect_ary.length>0) {
                            var quiz_collect_str = item.quiz_collect_ary.join('-');
                            collect_link_html='<a class="no-href collectPrev" data-id="'+ quiz_collect_str +'">'+item.quiz_collect_ary.length+'</a>';
                        }

                        inner_html +=
                            '<tr>\
                                <td><input type="checkbox" name="check-one" value="' + item.id + '"></td>\
                                <td>' + item.text + '</td>\
                                <td style="text-align:right">' + collect_link_html + '</td>\
                             </tr>';
                    }
                });

                $('#table-selfcollect').empty().html(inner_html);

                $('input[name="check-all"]').on('change', function(e) {
                    e.preventDefault();
                    if ($('input[name="check-all"]').prop('checked')) {
                        $('input[name="check-one"]').prop('checked', true);
                    } else {
                        $('input[name="check-one"]').prop('checked', false);
                    }
                    checkState();
                    dataAllSelect();
                });

                $('input[name="check-one"]').on('change', function(e) {
                    e.preventDefault();
                    checkState();
                    dataSelect(this);
                });

                $('.collectPrev').on('click', function(key, item) {
                    newObj.preview_ary = $(this).attr('data-id').split('-');
                    newObj.preview_ary.push('-1');
                    newObj.tblist2.draw();
                    $('.confirm-modal').modal('toggle');
                });
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getQuizContent(idx, qid) {
        $.ajax({
            url: '/admin/exam/get-quiz-content?qid=' + qid +'&key=' + qid,
            type: 'GET',
            success: function(res) {
                var quizObj = res.data;
                var qg_html=(quizObj.qg)?'<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>':'';
                var qa = quizObj.qa;
                var qa_a = quizObj.qa_a;
                var qa_b = quizObj.qa_b;
                var qa_c = quizObj.qa_c;
                var qa_d = quizObj.qa_d;
                var qa_e = quizObj.qa_e;
                var quiz_ans = (quizObj.sa) ? quizObj.sa.replace(/(\(*)/g, '').replace(/(\)*)/g,'') : quizObj.sa;
                var aa = quizObj.aa;
                var aa_a = quizObj.aa_a;
                var aa_b = quizObj.aa_b;
                var aa_c = quizObj.aa_c;
                var aa_d = quizObj.aa_d;
                var aa_e = quizObj.aa_e;
                var grade_code=quizObj.grade_code;
                var mediafile=quizObj.mediafile;
                var mediafile_read=quizObj.mediafile_read;
                var mediamp4=quizObj.mediamp4;
                var m3u8=quizObj.m3u8;

                var innerHtml = '';
                var qa_a_html = '';
                var qa_b_html = '';
                var qa_c_html = '';
                var qa_d_html = '';
                var qa_e_html = '';
                var aa_html = '';
                var aa_a_html = '';
                var aa_b_html = '';
                var aa_c_html = '';
                var aa_d_html = '';
                var aa_e_html = '';
                var aa_title = '';

                var opt_a= '';
                var opt_b= '';
                var opt_c= '';
                var opt_d= '';
                var opt_e= '';
                switch (grade_code) {
                    case 'E0':
                    case 'E1':
                    case 'E2':
                    case 'E3':
                    case 'E4':
                    case 'E5':
                    case 'E6':
                        opt_a='①';
                        opt_b='②';
                        opt_c='③';
                        opt_d='④';
                        opt_e='⑤';
                        break;
                    default:
                        opt_a='(A)';
                        opt_b='(B)';
                        opt_c='(C)';
                        opt_d='(D)';
                        opt_e='(E)';
                        break;
                }
                var new_opt_a = opt_a.replace('(', '').replace(')', '');
                var new_opt_b = opt_b.replace('(', '').replace(')', '');
                var new_opt_c = opt_c.replace('(', '').replace(')', '');
                var new_opt_d = opt_d.replace('(', '').replace(')', '');
                var new_opt_e = opt_e.replace('(', '').replace(')', '');

                if (qa_a) {
                    qa_a_html = getOptionHtml(idx,new_opt_a,opt_a,qa_a);
                }

                if (qa_b) {
                    qa_b_html = getOptionHtml(idx,new_opt_b,opt_b,qa_b);
                }

                if (qa_c) {
                    qa_c_html = getOptionHtml(idx,new_opt_c,opt_c,qa_c);
                }

                if (qa_d) {
                    qa_d_html = getOptionHtml(idx,new_opt_d,opt_d,qa_d);
                }

                if (qa_e) {
                    qa_e_html = getOptionHtml(idx,new_opt_e,opt_e,qa_e);
                }

                if (aa) {
                    aa_html = '<img src="' + aa + '"><br><br>';
                }
                if (aa_a) {
                    aa_a_html = '<label class="form-check-label" style="font-size:24px">'+opt_a+'</label>&nbsp;&nbsp;<img src="' + aa_a + '"><br><br>';
                }
                if (aa_b) {
                    aa_b_html = '<label class="form-check-label" style="font-size:24px">'+opt_b+'</label>&nbsp;&nbsp;<img src="' + aa_b + '"><br><br>';
                }
                if (aa_c) {
                    aa_c_html = '<label class="form-check-label" style="font-size:24px">'+opt_c+'</label>&nbsp;&nbsp;<img src="' + aa_c + '"><br><br>';
                }
                if (aa_d) {
                    aa_d_html = '<label class="form-check-label" style="font-size:24px">'+opt_d+'</label>&nbsp;&nbsp;<img src="' + aa_d + '"><br><br>';
                }
                if (aa_e) {
                    aa_e_html = '<label class="form-check-label" style="font-size:24px">'+opt_e+'</label>&nbsp;&nbsp;<img src="' + aa_e + '"><br><br>';
                }

                if (aa_html != '' || aa_a_html != '' || aa_b_html != '' || aa_c_html != '' || aa_d_html != '' || aa_e_html != '') {
                    aa_title = '<h4>解析</h4>';
                }

				var audio_html='';
				var btn_audio_html='';
				if (mediafile) {
					var audio_obj={};
					audio_obj.id='audio-'+idx;
					audio_obj.src=mediafile;
					audio_obj.btn_css='btn-audio';
					audio_obj.btn_dom=$('.btn-audio');
					audio_obj.btn_text='答案音檔';
					audio_obj.btn_for='audio-'+idx;
					audio_html=bs.getAudioHtml(audio_obj);
					btn_audio_html=bs.getBtnAudioHtml(audio_obj);
				}

				var audio_read_html='';
				var btn_audio_read_html='';
				if (mediafile_read) {
					var audio_obj={};
					audio_obj.id='audio-read-'+idx;
					audio_obj.src=mediafile_read;
					audio_obj.btn_css='btn-audio-read';
					audio_obj.btn_dom=$('.btn-audio-read');
					audio_obj.btn_text='題目音檔';
					audio_obj.btn_for='audio-read-'+idx;
					audio_read_html=bs.getAudioHtml(audio_obj);
					btn_audio_read_html=bs.getBtnAudioHtml(audio_obj);
				}

                //check_video_active去檢查解題影片按鈕有沒有觸發 0 為沒有 1為有
                var check_video_active=0;
                var hide_mp4_html='';
                var hide_btn_mp4_html='';
                var mp4_html='';
                var btn_mp4_html='';
                var video_html='';
                if (mediamp4!='') {
                    var video_html=
                        '<br><br><video id="m3u8_' + qid + 'mp4video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered" controls="controls"  style="display:none;"  data-setup=\'{ "playbackRates": [0.5,0.7, 1,1.25, 1.5, 2] }\'>\
                  <source src="'+m3u8+'" type="video/mp4">\
              </video>';
                    var mp4_obj={};
                    mp4_obj.id='mp4-'+idx;
                    mp4_obj.btn_css='btn-mp4';
                    mp4_obj.btn_dom=$('.btn-mp4');
                    mp4_obj.btn_text='解題影片';
                    mp4_obj.btn_qid=qid;
                    mp4_obj.btn_m3u8=m3u8;
                    // mp4_html=bs.getAudioHtml(mp4_obj);
                    btn_mp4_html=bs.getBtnAudioHtml(mp4_obj);
                    var hide_obj={};
                    hide_obj.id='hide-mp4'+idx;
                    hide_obj.btn_css='btn-hide-mp4';
                    hide_obj.btn_dom=$('.btn-hide-mp4');
                    hide_obj.btn_text='隱藏影片';
                    hide_obj.btn_qid=qid;
                    hide_obj.btn_m3u8=m3u8;
                    hide_btn_mp4_html=bs.getHidemp4BtnHtml(hide_obj);
                }
                $.each($('.video-js'),function(key,item){
                    initVideo($(item).attr('id'),$(this).find('source').attr('src'));
                });



                innerHtml+='<div id="quiz-collect" style="display:inline-block;float:right;cursor:pointer;color:red"><i class="fa fa-heart fa-2x"></i></div>';

                innerHtml +=
                '<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                    <div class="quiz-content" data-idx="' + idx + '">\
                        '+ qg_html +'\
                        <div id="imgQA"><img src="' + quizObj.qa + '"></div><br>\
                        ' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
                        <button type="button" for="imgAA-' + idx + '" quiz_ans="' + quiz_ans + '" class="btn btn-primary btnAA">顯示答案</button>\
                        ' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html+btn_mp4_html+hide_btn_mp4_html+'\
                        <div id="imgAA-' + idx + '" style="display:none">\
                            ' + aa_title + '\
                            ' + aa_html + '\
                            ' + aa_a_html + '\
                            ' + aa_b_html + '\
                            ' + aa_c_html + '\
                            ' + aa_d_html + '\
                            ' + aa_e_html + '\
                        </div><br>\
                        ' + video_html + '\
                    </div>\
                </td></tr></table></div>';

                $('#quizContent').html('').append(innerHtml);

                $('#quiz-collect').off('click').on('click',function(e){
                    e.preventDefault();
                    swal({
                        title: '移除收藏題',
                        text: '該題將會從收藏題庫中移除，請問確認移除嗎？',
                        type: 'warning',
                        showCloseButton: true,
                        showCancelButton: true,
                        cancelButtonText: '<span>No<br>我還要再想想</span>',
                        confirmButtonText: '<span>Yes<br>確認</span>'
                    }).then(function() {
                        quizCollect(qid);
                    },function (dismiss) {
                        if (dismiss === 'cancel') {
                            return false;
                        }
                    });
                });

                $('.btnAA').on('click', function(e) {
                    $(this).hide();
                    $('#' + $(this).attr('for')).show();
                    var idx = $(this).attr('for').replace('imgAA-', '');

                    var quiz_ans=$(this).attr('quiz_ans');
                    var bool_a = (quiz_ans.indexOf('A')!=-1 || quiz_ans.indexOf('①')!=-1);
                    var bool_b = (quiz_ans.indexOf('B')!=-1 || quiz_ans.indexOf('②')!=-1);
                    var bool_c = (quiz_ans.indexOf('C')!=-1 || quiz_ans.indexOf('③')!=-1);
                    var bool_d = (quiz_ans.indexOf('D')!=-1 || quiz_ans.indexOf('④')!=-1);
                    var bool_e = (quiz_ans.indexOf('E')!=-1 || quiz_ans.indexOf('⑤')!=-1);

                    if (bool_a) {
                        $('#q' + idx + '-A' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-①' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_b) {
                        $('#q' + idx + '-B' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-②' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_c) {
                        $('#q' + idx + '-C' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-③' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_d) {
                        $('#q' + idx + '-D' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-④' + ' i.ion-arrow-right-c').show();
                    }
                    if (bool_e) {
                        $('#q' + idx + '-E' + ' i.ion-arrow-right-c').show();
                        $('#q' + idx + '-⑤' + ' i.ion-arrow-right-c').show();
                    }

                });

				$('.btn-audio-read').off('click').on('click', function(e) {
					var audio_obj={};
					audio_obj.id=$(this).attr('for');
					audio_obj.btn_dom=$(this);
					audio_obj.btn_text='題目音檔';
					bs.setAudioPlay(audio_obj);
				});

				$('.btn-audio').off('click').on('click', function(e) {
					var audio_obj={};
					audio_obj.id=$(this).attr('for');
					audio_obj.btn_dom=$(this);
					audio_obj.btn_text='答案音檔';
					bs.setAudioPlay(audio_obj);
				});

                $('.btn-mp4').on('click',function (e){
                    e.preventDefault();
                    check_video_active=1;
                    var openqid = $(this).attr('qid');
                    var openm3u8=$(this).attr('m3u8');
                    var openvideoid='m3u8_'+openqid+'mp4video';
                    $('#'+openvideoid).show();
                    $('#'+openvideoid).children().show();
                    var player = videojs(openvideoid);
                    player.src({
                        src: openm3u8,
                        type: 'application/x-mpegURL',
                    });
                });
                $('.btn-hide-mp4').on('click',function (e){
                    e.preventDefault();
                    check_video_active=0;
                    var closeqid = $(this).attr('qid');
                    var closem3u8=$(this).attr('m3u8');
                    var closevideoid='m3u8_' + closeqid + 'mp4video';
                    var player = videojs('m3u8_'+closeqid+'mp4video');
                    player.pause();
                    $('#'+closevideoid).hide();
                    $('#'+closevideoid).children().hide();
                });


                $('.preview-modal').modal('toggle');

                $('.preview-modal').on('hide.bs.modal', function (e) {
                    // do something...
                    if (check_video_active==1){
                        var closevideoid='m3u8_'+qid+'mp4video';
                        var player = videojs(closevideoid);
                        player.pause();
                        $('#'+closevideoid).hide();
                        $('#'+closevideoid).children().hide();
                        player.dispose();
                        check_video_active=0;
                    }
                    ;
                })
            },
            error: bs.errorHandler
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

    function findIndexByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                return i;
            }
        }
        return null;
    }

    function findIndexAryByKey(array, key, value) {
        var array = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                array.push(i);
            }
        }
        return array;
    }

    function dataAllSelect() {
        var checked = $('input[name="check-all"]').prop('checked');
        $.each(newObj.data, function(key, item) {
            item.state = {};
            item.state.selected = checked;
        });
        checkSelect();
    }

    function dataSelect(dom) {
        var checked = $(dom).prop('checked');
        var index = findIndexByKey(newObj.data, 'id', $(dom).val());
        newObj.data[index].state = {};
        newObj.data[index].state.selected = checked;

        var ary = findIndexAryByKey(newObj.data, 'parent', $(dom).val());
        $.each(ary, function(key) {
            newObj.data[key].state = {};
            newObj.data[key].state.selected = checked;
        });

        checkSelect();
    }

    function checkSelect() {
        newObj.knowledge_ary = [];
        newObj.quiz_id_ary = [];
        $.each(newObj.data, function(key, item) {
            if (item.quiz_collect_ary && item.state && item.state.selected) {
                if (item.knowledge) {
                    newObj.knowledge_ary = newObj.knowledge_ary.concat(item.knowledge);
                }
                if (item.sub_knowledge) {
                    var new_sub_knowledge = [];
                    $.each(item.sub_knowledge, function(key2, item2) {
                        var ids = item2.split('-');
                        if (ids.length == 2) {
                            new_sub_knowledge.push(ids[0]);
                        }
                    });
                    newObj.knowledge_ary = newObj.knowledge_ary.concat(new_sub_knowledge);
                }
                if (item.quiz_collect_ary.length > 0) {
                    newObj.quiz_id_ary = newObj.quiz_id_ary.concat(item.quiz_collect_ary);
                }
            }
        });
    }

    function checkState() {
        $.each($('input[name="check-one"]'), function(key, item) {
            if ($(item).prop('checked')) {
                $('#btn-quiz').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {
                $('#btn-quiz').removeClass('btn-orange').addClass('btn-secondary');
            }
        });
    }

    function createQuizPractice() {

        if(!inputValidate()){
            return false;
        }

        var dataObj = {};
        dataObj.quiz_id_ary=newObj.quiz_id_ary;

        $.ajax({
          url: '/admin/stuquiz/get-selfcollect-quiz',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var qids=res.qids;
              location.href='/admin/exam/collect?qids='+qids;
          },
          error: bs.errorHandler
        });

    }

    function inputValidate() {
        if ($('#select-schoolclass').val() == '-1') {
            swal('請選擇班級');
            return false;
        }

        if ($('#select-termcode').val() == '-1') {
            swal('請選擇冊別');
            return false;
        }

        if ($('#select-factory').val() == '-1') {
            swal('請選擇版本');
            return false;
        }

        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選要練習的課次/章節');
            return false;
        }

        if (newObj.quiz_id_ary.length==0) {
            swal('請勾選有收藏題目的章節');
            return false;
        }

        return true;
    }

    function quizCollect(qid){
        var dataObj={};
        dataObj.qid=qid;
        $.ajax({
          url: '/admin/exam/set-quiz-collect',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var msg=res.message;
              var check_collect=res.check_collect;
              if (msg!='success') {
                  swal(msg);
                  return false;
              }
              $('#quiz-collect').empty();
              var index = newObj.preview_ary.indexOf(qid);
              if (index > -1) {
                  newObj.preview_ary.splice(index, 1);
              }
              newObj.tblist2.draw();
              getRange();
              $('.preview-modal').modal('hide');
          },
          error: bs.errorHandler
        });
    }

    function getOptionHtml(idx,new_opt,opt,qa_opt){

        var inner_html='';

        inner_html=
        '<div id="imgQA-'+new_opt+'">\
            <div class="form-check form-check-inline">\
                <div id="q' + idx + '-'+new_opt+'" style="display:inline-block;width:20px">\
                    <i class="ion-arrow-right-c"></i>\
                </div>\
                <label class="form-check-label" for="radioQA-'+new_opt+'" style="font-size:24px">'+opt+'</label>\
                <div style="display:inline-block;margin-left:10px">\
                    <img src="' + qa_opt + '" alt="">\
                </div>\
            </div>\
            <hr>\
        </div>';

        return inner_html;
    }

	function getSchoolclassObj(){
		var schoolclass_obj = findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
		if (schoolclass_obj) {
			newObj.subject_code = schoolclass_obj.subject_code;
		} else {
			newObj.subject_code = '-1';
		}

		return schoolclass_obj;
	}

    function initVideo(vid,m3u8){
        var player = videojs(vid);
        player.src({
            src: m3u8,
            type: 'application/x-mpegURL',
        });
    }

});
