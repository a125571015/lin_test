$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        var protocol = location.protocol;
        var hostname = location.hostname;
        if((protocol + '//' + hostname)==('https://aidux.ailead365.com'||'https://zlsy.ailead365.com')){
            $('#select-sourcekind').empty().append('' +
                '<option value="selfexam">自我練習</option>');
        }else{
            $('#select-sourcekind').empty().append('' +
                '<option value="nolimit">所有題目</option>' +
                '<option value="selfexam">自我練習</option>' +
                '<option value="bytask">老師派卷</option>');
        }

        geteplimitSchoolclass();
        getTermCode();
        getFactoryCode();
        getSourceKind();

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

        $('#select-sourcekind').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });

        $('#btn-confirm').on('click', function(e) {
            e.preventDefault();
            $('#confirm-modal').modal('toggle');
        });

        $('#btn-quiz').on('click', function(e) {
            e.preventDefault();
            startWrongPractice();
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
            var dataObj={};
            dataObj.grade_code=schoolclass_obj.grade_code;
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

    function getSourceKind(){
        $('#select-sourcekind').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
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
        dataObj.sourcekind=$('#select-sourcekind').val();
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
            url: '/admin/banwu/get-unitrecord',
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
                var inner_html = '';

                $.each(res, function(key, item) {
                    if (item.unit_percent_ary) {
                        var th_html = '';
                        inner_html +=
                            '<thead class="thead-light">\
                            <tr>\
                            <th><input type="checkbox" name="check-all" value="' + item.id + '"></th>\
                            <th>課次/章節</th>\
                            <th>答題數</th>\
                            <!--<th>答對數</th>-->\
                            <th>答題率</th>\
                            <th>正答率</th>\
                            <th>能力等級</th>\
                            </tr>\
                            </thead>';
                        return false;
                    }
                });

                $.each(res, function(key, item) {
                    if (item.unit_percent_ary) {
                        var td_html = '';
                        var quiz_count = item.unit_percent_ary[0].quiz_count;
                        var quiz_percent = item.unit_percent_ary[0].quiz_percent;
                        var right_count =item.unit_percent_ary[0].right_count;
                        var right_percent = item.unit_percent_ary[0].right_percent;
                        td_html += '<td>' + quiz_count + '</td>';
                        // td_html += '<td>' + right_count + '</td>';
                        td_html += '<td>' + quiz_percent + '%</td>';
                        if (right_percent!='--') {
                            td_html += '<td>' + right_percent + '%</td>';
                        }
                        else{
                            td_html += '<td>' + right_percent + '</td>';
                        }
                        var ability_img = getAbilityImg(quiz_percent, right_percent);
                        td_html += '<td><img class="ability" src="' + ability_img + '" width="40px" data-toggle="popover" data-placement="left"></td>';
                        inner_html +=
                            '<tr>\
                            <td><input type="checkbox" name="check-one" value="' + item.id + '"></td>\
                            <td>' + item.text + '</td>\
                            ' + td_html + '\
                            </tr>';
                    }
                });

                $('#table-unitrecord').empty().html(inner_html);

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

                $('.ability')
                    .popover($.extend({
                        trigger: "manual"
                    }, {
                        html: true,
                        content: function() {
                            var inner_html = '<img src="/admin/material/images/quizlevel/成龍.jpg" class="img-fluid" />'

                            return inner_html;
                        }
                    }))
                    .click(function(e) {
                        $(this).popover("toggle");
                        e.stopPropagation();
                    })
                    .on("show.bs.popover", function() {
                        $("[data-toggle=popover]").not(this).popover("hide");
                    });

                $("html").click(function() {
                    $("[data-toggle=popover]").popover("hide");
                });
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getAbilityImg(quiz_count, right_percent) {
        var ability_img = '';
        if (quiz_count >= 90 && right_percent >= 90) {
            ability_img = '/admin/material/images/quizlevel/D7.png';
        } else if (quiz_count >= 85 && right_percent >= 85) {
            ability_img = '/admin/material/images/quizlevel/D6.png';
        } else if (quiz_count >= 80 && right_percent >= 80) {
            ability_img = '/admin/material/images/quizlevel/D5.png';
        } else if (quiz_count >= 65 && right_percent >= 65) {
            ability_img = '/admin/material/images/quizlevel/D4.png';
        } else if (quiz_count >= 50 && right_percent >= 50) {
            ability_img = '/admin/material/images/quizlevel/D3.png';
        } else if (quiz_count >= 30 && right_percent >= 30) {
            ability_img = '/admin/material/images/quizlevel/D2.png';
        } else {
            ability_img = '/admin/material/images/quizlevel/D1.png';
        }

        return ability_img;
    }

    function checkState() {
        $.each($('input[name="check-one"]'), function(key, item) {
            if ($(item).prop('checked')) {
                $('#btn-wrong,#btn-quiz').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {
                $('#btn-wrong,#btn-quiz').removeClass('btn-orange').addClass('btn-secondary');
            }
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
        $.each(newObj.data, function(key, item) {
            if (item.unit_percent_ary && item.state && item.state.selected) {
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
            }
        });
    }

    function startWrongPractice() {

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

        var dataObj = {};
        dataObj.knowledge_ary = newObj.knowledge_ary;

        location.href='/admin/exam/wrong?cid='+$('#select-schoolclass').val()+'&sourcekind='+$('#select-sourcekind').val()+'&kids='+ dataObj.knowledge_ary.join('-');
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

});
