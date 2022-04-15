$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        getGradeCode();
        getVideoSubjectCode();
        getTermCode();
        getFactoryCode();
        getDifficult();

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            getVideoSubjectCode();
            getTermCode();
            getFactoryCode();
        });

        $('#select-subject').on('change', function(e) {
            e.preventDefault();
            getTermCode();
            getFactoryCode();
        });

        $('#select-termcode').on('change', function(e) {
            e.preventDefault();
			getFactoryCode();
        });

        $('#select-factory').on('change', function(e) {
            e.preventDefault();
            checkChange();
        });

        $('#btn-confirm').on('click', function(e) {
            e.preventDefault();

            if (inputValidate()) {
                var fid = newObj.f_ary.join('-');
                location.href = '/admin/schoolvideo/sendvideo?fid=' + fid;
            }
        });
    }

    function checkChange() {
        var sel_grade = $('#select-grade').val();
        var sel_subject = $('#select-subject').val();
        var sel_termcode = $('#select-termcode').val();
        var sel_factory = $('#select-factory').val();
        if (sel_grade != '-1' && sel_subject != '-1' && sel_termcode != '-1' && sel_factory != '-1') {
            getRange();
        }
    }

    function getGradeCode() {
        var dataObj = {};
        dataObj.type = 'coursevideo';
        
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            data: dataObj,
            success: function(res) {



                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">請選擇年級</option>');


                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                //109下冊次調整110上
                //暫時隱藏高中三年級
                //刪除Select中Value='3'的Option
                var check_location=location.host;
                // if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}
                $("#select-grade option[value='H3']").remove();



                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getVideoSubjectCode() {
        var dataObj = {};
        dataObj.type = 'coursevideo';
        dataObj.grade_code=$('#select-grade').val();
        $.ajax({
            url: '/admin/quizpaper/get-video-subject-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');






                $.each(res, function(key, item) {
                        $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });

                //高中總複習目前只開放英文
                var check_grade=$('#select-grade option:selected').val();
                if (check_grade=='H0'){
                    $('#select-subject option').remove();
                    $('#select-subject').append('<option value="-1">選擇科目</option>');
                    $('#select-subject').append('<option value="E0">英語文</option>');

                }


                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function getTermCode() {

        $('#select-termcode option').remove();
        $('#select-termcode').append('<option value="-1">請選擇冊別</option>');

		newObj.recent_year = bs.getRecentYear();
		var text_year = -1;
		switch ($('#select-grade').val()) {
			case 'E5':
				text_year = newObj.recent_year-4;
				break;
			case 'E6':
				text_year = newObj.recent_year-5;
				break;
			case 'EP':
			case 'H1':
			case 'J1':
			case 'J0':
			case 'H0':
				text_year = newObj.recent_year;
				break;
			case 'H2':
			case 'J2':
				text_year = newObj.recent_year-1;
				break;
			case 'H3':
			case 'J3':
				text_year = newObj.recent_year-2;
				break;
		}

		if ($('#select-grade').val()!='-1' && $('#select-subject').val()!='-1') {

			var grade_code = $('#select-grade').val();
			var subject_code = $('#select-subject').val();

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
					year_up_1 = 0;
					year_up_2 = 1;
					year_up_3 = 2;
					year_up_4 = 3;
					year_up_5 = 4;
					year_up_6 = 4;
					break;
				case 'E6':
					year_up_1 = 0;
					year_up_2 = 1;
					year_up_3 = 2;
					year_up_4 = 3;
					year_up_5 = 4;
					year_up_6 = 5;
					break;
				case 'EP':
				case 'J1':
				case 'J0':
				case 'H1':
				case 'H0':
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

			var book_obj = {};

            //國小一二年級隱藏
            // if (grade_code=='E1') {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'E1' + '-' + '0' + '">小一上</option>');
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'E1' + '-' + '0' + '">小一下</option>');
            // }
            // if (grade_code=='E2') {
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'E2' + '-' + '0' + '">小二上</option>');
            //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'E2' + '-' + '0' + '">小二下</option>');
            // }
			//
            //
            if (grade_code=='E3') {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'E3' + '-' + '0' + '">小三上</option>');
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'E3' + '-' + '0' + '">小三下</option>');
            }
			if (grade_code=='E4') {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_4) + '-A' + '-' + 'E4' + '-' + '0' + '">小四上</option>');
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_4) + '-B' + '-' + 'E4' + '-' + '0' + '">小四下</option>');
            }

			if (grade_code=='E5') {
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_5) + '-A' + '-' + 'E5' + '-' + '0' + '">小五上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_5) + '-B' + '-' + 'E5' + '-' + '0' + '">小五下</option>');
			}

			if (grade_code=='E6') {
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_6) + '-A' + '-' + 'E6' + '-' + '0' + '">小六上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_6) + '-B' + '-' + 'E6' + '-' + '0' + '">小六下</option>');
			}

			if (grade_code=='EP') {
				if (subject_code=='E21'){
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'EP' + '-' + '0' + '">初級(1)</option>');
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'EP' + '-' + '0' + '">初級(2)</option>');
                }else{
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'EP' + '-' + '0' + '">全</option>');
                }

			}

			if (grade_code=='J1') {
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'J1' + '-' + '0' + '">國一上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'J1' + '-' + '0' + '">國一下</option>');
			}

			if (grade_code=='J2') {
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'J1' + '-' + '0' + '">國一上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'J1' + '-' + '0' + '">國一下</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'J2' + '-' + '0' + '">國二上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'J2' + '-' + '0' + '">國二下</option>');
			}

			if (grade_code=='J3') {


			    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'J1' + '-' + '0' + '">國一上</option>');
			    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'J1' + '-' + '0' + '">國一下</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'J2' + '-' + '0' + '">國二上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'J2' + '-' + '0' + '">國二下</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'J3' + '-' + '0' + '">國三上</option>');
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'J3' + '-' + '0' + '">國三下</option>');
			}

			if (grade_code=='J0') {
				$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'J0' + '-' + '0' + '">全</option>');
			}

			if (grade_code=='H1') {
				book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, '0');
				if (Object.getOwnPropertyNames(book_obj).length > 0) {
					$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
				}

				book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'A');
				if (Object.getOwnPropertyNames(book_obj).length > 0) {
					$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
				}

				book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'B');
				if (Object.getOwnPropertyNames(book_obj).length > 0) {
					$('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
				}
			}

			if (grade_code=='H2') {
                //基本影藏高一冊次
                // book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, '0');
                // if (Object.getOwnPropertyNames(book_obj).length > 0) {
                //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                // }
                //

                //高一國文,數學,英文冊次
                if (subject_code=='C0'|| subject_code=='M0' || subject_code=='E0'){
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'A');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'B');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }
                } else if (subject_code=='N1' || subject_code=='N4' || subject_code=='N5' ){ //必修生物,必修物理,必修化學

                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, '0');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }
                }


                if (subject_code=='N3'){
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, '0','videoplus');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                    // book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H2', subject_code, '0','videoplus');
                    // if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-0' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name+'(110)' + '</option>');
                    // }

                }

                if (subject_code=='S1'||subject_code=='S2'||subject_code=='S3'){

                    //必修歷史I,必修地理I,必修公民I
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'A');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }


                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H1', subject_code, 'B','videoplus');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }
                }

                //處理排序問題 選修化學 跟選修物理
                if (subject_code!='N4' && subject_code!='N5' ){
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'A');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'B');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, '0');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-0' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                }
                else{
                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, '0');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-0' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'A');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }

                    book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'B');
                    if (Object.getOwnPropertyNames(book_obj).length > 0) {
                        $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                    }


                }


                // 正式站與測試站校正更動 用域名去判斷
                var check_location=location.host;
               // if (check_location=='ailead365.localhost.com' || check_location=='accuagile.ailead365.com'){}else{}





			}

			// 高三影片選單隱藏
			if (grade_code=='H3') {
                // 正式站與測試站校正更動 用域名去判斷
                var check_location=location.host;
                book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, '0');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-0' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }

                book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'A');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-A' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }

                book_obj = bs.getBookCode((parseInt(text_year) + year_up_1), 'H1', subject_code, 'B');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_1) + '-B' + '-' + 'H1' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }

                book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, '0');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-0' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }
                book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'A');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-A' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');

                }
                book_obj = bs.getBookCode((parseInt(text_year) + year_up_2), 'H2', subject_code, 'B');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_2) + '-B' + '-' + 'H2' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');

                }


                book_obj = bs.getBookCode((parseInt(text_year) + year_up_3), 'H3', subject_code, '0');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'H3' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }

                book_obj = bs.getBookCode((parseInt(text_year) + year_up_3), 'H3', subject_code, 'A');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'H3' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }
                //不確定高三數學是不是高三上下
                // if (subject_code == 'M0') {
                //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-A' + '-' + 'H3' + '-' + 'M2' + '">選修數學(乙)上</option>');
                // }

                book_obj = bs.getBookCode((parseInt(text_year) + year_up_3), 'H3', subject_code, 'B');
                if (Object.getOwnPropertyNames(book_obj).length > 0) {
                    $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'H3' + '-' + book_obj.book_code + '">' + book_obj.book_name + '</option>');
                }
                //不確定高三數學是不是高三上下
                // if (subject_code == 'M0') {
                //     $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-B' + '-' + 'H3' + '-' + 'M2' + '">選修數學(乙)下</option>');
                // }

                //冊次
                //109下冊次調整110上
                // if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}






			}

            if (grade_code=='H0') {
                $('#select-termcode').append('<option value="' + (parseInt(text_year) + year_up_3) + '-0' + '-' + 'H0' + '-' + '0' + '">全</option>');
            }

		}

        $('#select-termcode').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getFactoryCode() {

        var dataObj = {};
        dataObj.grade_code = $('#select-grade').val();
        dataObj.subject_code = $('#select-subject').val();
		dataObj.term_code = $('#select-termcode').val();
        $.ajax({
            url: '/admin/quizpaper/get-factory-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#select-factory option').remove();
                $('#select-factory').append('<option value="-1">請選擇版本</option>');
                //高三英文、地科冊次隱藏
                if(!(dataObj.grade_code == 'H3' && dataObj.subject_code =='E0')
                    && !(dataObj.grade_code == 'H3' && dataObj.subject_code =='N3')
                ){
                    $.each(res, function(key, item) {
                        $('#select-factory').append('<option value="' + item.code + '">' + item.name + '</option>');
                    });
                }

                $('#select-factory').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
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
                $('#div-difficulty').empty();
                $.each(res, function(key, item) {
                    $('#div-difficulty').append(
                        '<div class="form-check form-check-inline">\
                        <input class="form-check-input" type="checkbox" name="chk-difficulty" id="chk-difficulty' + key + '" value="' + item.id + '" checked>\
                        <label class="form-check-label" for="chk-difficulty' + key + '">' + item.name + '</label>\
                        </div>');
                });
            }
        });
    }

    function getRange() {
        var dataObj = {};
        dataObj.grade_code = $('#select-grade').val();
        dataObj.subject_code = $('#select-subject').val();
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        yearTermAry.push($('#select-termcode').val());
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
        dataObj.factory_code = $('#select-factory').val();

        dataObj.course_code = '';

        var text_grade = $('#select-grade :selected').text();
        if(text_grade == '國中總複習' || text_grade == '高中總複習'){
            dataObj.course_code = ['H'];
        }else{
            dataObj.course_code = ['B'];
        }

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
        //特殊狀況處理 高二>英語文>二下>龍騰 加入說明文字
        var grade_code2= $('#select-grade').val();
        var  subject_code2 = $('#select-subject').val();
        var termcode2=$('#select-termcode').val()
        var factory2= $('#select-factory').val()


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
                        <th></th>\
                        <th>課次/章節</th>\
                        <th>時間</th>\
                        <th>派出次數</th>\
                        </tr>\
                        </thead>';
                    return false;
                });

                $.each(res, function(key, item) {



                    if (item.video) {

                        var check_title='';


                        var checkbox_html = '';
                        var id_split_ary = item.id.split('-');
                        var id = 0;
                        if (id_split_ary.length == 1) {
                            id = id_split_ary[0];




                        } else if (id_split_ary.length == 2) {
                            id = id_split_ary[1];



                        } else if (id_split_ary.length == 3) {
                            id = id_split_ary[2];



                        }

                        var have_video=item.have_video;
                        var text = item.text;
                        //特殊狀況處理 高二>英語文>二下>龍騰 加入說明文字 lesson3 加入(合併至Lesson 1) lesson5 跟lesson7 加入 (合併至Lesson 4)
                        if (grade_code2=='H2'&&subject_code2=='E0'&&termcode2=='109-B-H2-0'&&factory2=='4'&&text=='Lesson 3 '){
                            text=text+'(合併至Lesson 1)';
                        }
                        if (grade_code2=='H2'&&subject_code2=='E0'&&termcode2=='109-B-H2-0'&&factory2=='4'&&(text=='Lesson 5 '||text=='Lesson 7 ')){
                            text=text+'(合併至Lesson 4)';
                        }

                        var video_length = item.video_length;
                        var video_send_times = 0;
                       //編輯要求待補的影片先不要顯示
                        if (video_length && video_length!='待補' ) {
                            checkbox_html += '<input type="checkbox" name="check-one" value="' + item.id + '">';
                            text = '<span style="padding-left:30px"><a href="videoview?id=' + id + '" target="_blank">' + text + '</a></span>';
                            video_send_times = item.video_send_times;
                        } else {

                                if (have_video==0){
                                    video_length = '(此課程無影片)';
                                }else if(video_length=='待補'){
                                    text = '<span style="padding-left:30px">' + text + '</span>';
                                }
                                else{
                                    video_length = '';
                                    video_send_times = '';
                                }




                        }
                        //特殊需求 高中國文前面加一段提醒文字

                        if (key==1 && (grade_code2=='H1' || grade_code2=='H2' || grade_code2=='H3') && subject_code2=='C0'){
                            var warn_message='◎古文的用字、讀音、解釋會因版本而有所不同，在參加學校考試時請依據學校的版本。';
                            inner_html+='<tr>';
                            inner_html+='<td>' + checkbox_html + '</td>';
                            inner_html+='<td><font color="red">' + warn_message + '</td>';
                            inner_html+= '<td>' + video_length + '</td>';
                            inner_html+='<td>' + video_send_times + '</td>';
                            inner_html+='</tr>';
                        }
                        // console.log(key);
                        // console.log(text);
                        inner_html +=
                            '<tr>\
                                <td>' + checkbox_html + '</td>\
                                <td>' + text + '</td>\
                                <td>' + video_length + '</td>\
                                <td>' + video_send_times + '</td>\
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

    function checkState() {
        $.each($('input[name="check-one"]'), function(key, item) {
            if ($(item).prop('checked')) {
                $('#btn-confirm').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {
                $('#btn-confirm').removeClass('btn-orange').addClass('btn-secondary');
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
        newObj.f_ary = [];
        $.each(newObj.data, function(key, item) {
            if (item.video_length && item.state && item.state.selected) {
                var item_id_ary = item.id.split('-');
                if (item_id_ary.length == 2) {
                    newObj.f_ary.push(item_id_ary[1]);
                }
                if (item_id_ary.length == 3) {
                    newObj.f_ary.push(item_id_ary[2]);
                }
            }
        });
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
});
