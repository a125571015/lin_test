$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        geteplimitSchoolclass();
        getTermCode();
        getFactoryCode();

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
    }

    function checkChange() {
        var sel_subject = $('#select-subject').val();
        var sel_termcode = $('#select-termcode').val();
        var sel_factory = $('#select-factory').val();
        if (sel_subject != '-1' && sel_termcode != '-1' && sel_factory != '-1') {
            getRange();
        }
    }

    function geteplimitSchoolclass() {
        var dataObj = {};
        dataObj.type='video';
        $.ajax({
            url: '/admin/quizpaper/geteplimit-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {
                newObj.schoolclass_list = res;
                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                $.each(res, function(key, item) {
                    if (item.name.indexOf('結')!=-1) {return;}
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
            var subject_code = schoolclass_obj.subject_code;
            var is_schoolvideo = schoolclass_obj.is_schoolvideo;

            if (is_schoolvideo==0) {
                swal('此班級沒有點播影片的權限');
                return false;
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
            var role = JSON.parse(schoolclass_obj.video_role);

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

    function getRange() {
        var dataObj = {};
        dataObj.schoolclass_id = $('#select-schoolclass').val();
        dataObj.grade_code = newObj.grade_code;
        dataObj.subject_code = newObj.subject_code;
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        yearTermAry.push($('#select-termcode').val());
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
        dataObj.factory_code = $('#select-factory').val();
		dataObj.course_code=($('#select-termcode :selected').text()=='總複習')?['H']:['B'];
		// console.log(yearTermAry[0]);
		var examroleArray=yearTermAry[0].split('-');
        var examrole='';
		if (examroleArray[2]=='J0'||examroleArray[2]=='EP'||examroleArray[2]=='H0'){
            examrole=examroleArray[2];
        }else{
            examrole=examroleArray[2]+examroleArray[1];
        }
		

        if (dataObj.schoolclass_id == '-1') {
            return false;
        }

        if (dataObj.grade_code == '-1') {
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
            url: '/admin/schoolvideo/get-video-classinfo',
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
                    var th_html = '';
                    inner_html +=
                        '<thead class="thead-light">\
                        <tr>\
                        <th>課次/章節</th>\
                        <th>時間</th>\
                        </tr>\
                        </thead>';
                    return false;
                });

                $.each(res, function(key, item) {
                    if (item.video) {
                        var checkbox_html='';
                        var id_split_ary=item.id.split('-');
                        var id=0;
                        if (id_split_ary.length==1) {
                            id=id_split_ary[0];
                        }
                        else if (id_split_ary.length==2){
                            id=id_split_ary[1];
                        }
                        else if (id_split_ary.length==3) {
                            id=id_split_ary[2];
                        }
                        var text=item.text;
                        var video_length=item.video_length;
                        var video_send_times=0;
                        if (video_length) {
                            text= '<span style="padding-left:30px"><a href="/admin/exam/videoexam?cid='+ $('#select-schoolclass').val() +'&fid='+ id +'&examrole='+examrole+'&kind=2'+'" target="_blank">' + text + '</a></span>';
                        }
                        else {
                            video_length='';
                            video_send_times='';
                        }

                        inner_html +=
                            '<tr>\
                                <td>' + text + '</td>\
                                <td>' + video_length + '</td>\
                            </tr>';
                    }
                });

                $('#table-videoplus').empty().html(inner_html);

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
            },
            complete: function() {
                bs.disableSubmits(false);
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

    function inputValidate() {
        if ($('#select-grade').val() == '-1') {
            swal('請選擇年級');
            return false;
        }

        if ($('#select-subject').val() == '-1') {
            swal('請選擇科目');
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
            swal('請勾選要派出的影片');
            return false;
        }

        return true;
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

});
