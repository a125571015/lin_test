exam = {};
(function(exam) {
    'use strict';
    var _exam = exam;
	var newObj = {};
	const route_href = location.href;
	var route_str='';
	if (route_href.indexOf('examprogress')!=-1){
        route_str='examprogress';
    }else if (route_href.indexOf('progressrecord')!=-1){
        route_str='progressrecord';
    }else{
        route_str=''
    }


    _exam.getRecentYear = getRecentYear;
    _exam.getSchool = getSchool;
    _exam.getSchoolclass = getSchoolclass;
    _exam.getSchoolclassStatus = getSchoolclassStatus;
    _exam.geteplimitSchoolclass=geteplimitSchoolclass;
    _exam.getGradeCode = getGradeCode;
    _exam.getCourseCode = getCourseCode;
    _exam.getTermCode = getTermCode;
    _exam.getFactoryCode = getFactoryCode;
    _exam.initInputState = initInputState;
    _exam.getRange = getRange;
    _exam.getStuRange = getStuRange;
    _exam.checkState = checkState;
    _exam.checkCss = checkCss;
    _exam.checkRecoverCss = checkRecoverCss;
    _exam.dataAllSelect = dataAllSelect;
    _exam.dataSelect = dataSelect;
    _exam.checkSelect = checkSelect;
    _exam.getDifficult = getDifficult;
    _exam.createWrongPractice = createWrongPractice;
    _exam.createQuizPractice = createQuizPractice;
    _exam.getQuizpaperTag=getQuizpaperTag;

	$('#select-school').on('change', function(e) {
		e.preventDefault();
		$('.div-year').hide();
		getGradeCode();
		getSchoolclass();
		$('#table-progress').empty();
	});

	$('#select-grade').on('change', function(e) {
		e.preventDefault();
		$('.div-year').hide();
		getSchoolclass();
        getSchoolclassStatus();
		$('#table-progress').empty();
	});

	$('#select-schoolclass-status').on('change',function(e){
        e.preventDefault();
        getSchoolclass();
    });

	$('#select-schoolclass').on('change', function(e) {
		e.preventDefault();
		if ($('#select-schoolclass').val()=='-1') {
			$('.div-year').hide();
		}
		else {
			$('.div-year').show();
		}
		var schoolclass_obj = bs.findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
		if (schoolclass_obj) {
			newObj.subject_code = schoolclass_obj.subject_code;
			getCourseCode(schoolclass_obj);
			getTermCode(schoolclass_obj);
			getFactoryCode(schoolclass_obj);
		}
		$('#table-progress').empty();
	});

    $('#check-close').on('change',function (e){
        e.preventDefault();
        getRange();
        // $('#table-progress').empty();
    });


    $('input:radio[name="radioSource"]').on('change',function(e){
		e.preventDefault();
		var schoolclass_obj = bs.findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
		if (schoolclass_obj) {
			getCourseCode(schoolclass_obj);
			getTermCode(schoolclass_obj);
			getFactoryCode(schoolclass_obj);
		}
	});

	$('input:checkbox[name="chkYear"]').on('change', function(e) {
		e.preventDefault();
		switch (route_str) {
			case 'examprogress':
				getRange();
				break;
			case 'progressrecord':
			    getStuRange();
				break;
			default:
				getRange();
				break;
		}
	});

	$('input:radio[name="radio-know"]').on('change', function(e) {
		e.preventDefault();
		if ($('input:radio:checked[name="radio-know"]').val() == '1') {
			$('.div-factory').show();
		} else {
			$('.div-factory').hide();
		}
		switch (route_str) {
			case 'examprogress':
				getRange();
				break;
			case 'progressrecord':
				getStuRange();
				break;
			default:
				getRange();
				break;
		}
	});

	$('input:radio[name="radio-data"]').on('change', function(e) {
		e.preventDefault();
		if ($(this).val()=='1' || $(this).val()=='2') {
			$('.div-recover').hide();
			switch (route_str) {
				case 'examprogress':
					getRange();
					break;
				case 'progressrecord':
					getStuRange();
					break;
				default:
					getRange();
					break;
			}
		}
		else {
			$('.div-recover').show();
			$('#radioT1').prop('checked',true);
			$('.div-time').hide();
			$('#date-stime').val('');
			$('#date-etime').val('');
		}
	});

	$('input:radio[name="radio-time"]').on('change', function(e) {
		e.preventDefault();
		if ($(this).val()=='1') {
			$('.div-time').hide();
			$('#date-stime').val('');
			$('#date-etime').val('');
			getRange();
		}
		else {
			$('.div-time').show();
			if ($('#radioD3').prop('checked')) {
				$('#radioD2').prop('checked',true);
				$('.div-recover').hide();
			}
		}
	});


	$('input:radio[name="radio-category"]').on('change',function(e){
            e.preventDefault();
            var check_type=$("input#radio-category2").prop("checked");
            if (check_type==true){
                $('.category_count').show();
            }else{
                $('.category_count').hide();
            }
    });


	$('#btn-time').on('click',function(e){
		e.preventDefault();
		getRange();
	});

	$('#btn-recover').on('click',function(e){
		e.preventDefault();
		switch (route_str) {
			case 'examprogress':
				getRange();
				break;
			case 'progressrecord':
				getStuRange();
				break;
			default:
				getRange();
				break;
		}
	});

	$('#btn-wrong').on('click', function(e) {
		e.preventDefault();
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }

        if (user_ary.length<=1){
            $('#btn-show-person-wrong').removeClass('btn-orange').addClass('btn-secondary');
            $('#btn-show-person-wrong').attr("disabled",true);
        }else{
            $('#btn-show-person-wrong').removeClass('btn-secondary').addClass('btn-orange');
            $('#btn-show-person-wrong').attr("disabled",false);
        }

		//createWrongPractice();
        GetQuizDiffculty();
	});

    $('#btn-fake-quiz').on('click',function(e){
       e.preventDefault();
       $('#category-modal').modal('show');
    });

    $('#btn-wrong-finsh').on('click', function(e) {
        e.preventDefault();
        createWrongPractice();


    });

    $('#btn-show-person-wrong').on('click',function(e){
        e.preventDefault();
        swal({
            title: '將直接組成考卷至「派卷與管理」中，若多於100題將直接分為多張考卷',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>No<br>取消</span>',
            confirmButtonText: '<span>Yes<br>確認</span>'
        }).then(function() {
            $('#confirm-modal').modal('hide');
            $('#person-wrong-modal').modal('show');
            //初始化個人適性派卷參數
            getQuizpaperTag();
            $('#txt-name').val('');
            $('#txt-notes').val('');

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });
    });

    $('#btn-person-wrong').on('click',function(e){
        e.preventDefault();
        PersonPractice();
    });

    $('#btn-student-adjusted-regression').on('click',function(e){
        e.preventDefault();
        swal({
            title: '請注意！！！<br> (1)『校正回歸』將使錯題恢復為答對題目(將從錯題中移除) <br> (2)『校正回歸』將連帶影響自我練習等級進度',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>No<br>取消</span>',
            confirmButtonText: '<span>Yes<br>好</span>'
        }).then(function() {
            studentsencondswal();

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });

    });

    $('#btn-adjusted-regression').on('click',function(e){
        e.preventDefault();
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }

        if (user_ary.length>1){
            swal("校正回歸不可選超過1人");
            return false;
        }


        swal({
            title: '請注意！！！<br> (1)『校正回歸』將使學生錯題恢復為答對題目(將從錯題中移除) <br> (2)『校正回歸』將連帶影響學生自我練習等級進度(學習紀錄打破蛋等級)',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>No<br>取消</span>',
            confirmButtonText: '<span>Yes<br>好</span>'
        }).then(function() {
            sencondswal();

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });

    });

    //校正回歸-第二階段-學生版-跳窗警示
    function studentsencondswal(){
        swal({
            title: '是否確認執行『校正回歸』?<br> 執行後將不可復原。',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>不是</span>',
            confirmButtonText: '<span>是</span>'
        }).then(function() {
            CreateStudentRecoverWrongPaper();

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });
    }



    //校正回歸-第二階段-跳窗警示
    function sencondswal(){
        swal({
            title: '是否確認執行『校正回歸』?<br> 執行後將不可復原。',
            type: 'warning',
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: '<span>不是</span>',
            confirmButtonText: '<span>是</span>'
        }).then(function() {
            CreateRecoverWrongPaper();

        },function (dismiss) {
            if (dismiss === 'cancel') {
                return false;
            }
        });
    }

    //校正回歸
    function CreateRecoverWrongPaper(){
        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');

        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };
        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }

        if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }

        var dataObj = {};
        dataObj.source='recoverwrongpaper';
        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 3;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
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

        dataObj.pre_step2 = {};
        dataObj.pre_step2.exam_range = '-';

        var jstree = [];
        $.each(newObj.data, function(key, item) {
            if (item.state) {
                if (item.state.selected) {
                    jstree.push(item.id);
                }
            }
        });
        dataObj.pre_step2.jstree = jstree;

        dataObj.pre_step3 = {};
        dataObj.pre_step3.grade_code = '-1';
        dataObj.pre_step3.subject_code = newObj.subject_code;
        dataObj.pre_step3.created_by = '-1';
        dataObj.pre_step3.quizpaper_category_id = '-1';
        dataObj.pre_step3.quizpaper_tag_ids = [];
        dataObj.pre_step3.name = '';
        dataObj.pre_step3.repeat_papers = [];

        dataObj.pre_step4 = {};
        dataObj.pre_step4.quiz_difficulty_id = '-1';
        dataObj.pre_step4.quiz_category_id = '-1';
        dataObj.pre_step4.quiz_qtype_id = '-1';
        dataObj.pre_step4.quiz_extension_id='-1';
        dataObj.pre_step4.txt_search = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

        var cid=dataObj.schoolclass_id;
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }
        var uids = user_ary.join('-');

        dataObj.user_ary=user_ary;
        dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
        dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);


        $.ajax({
            url: '/admin/banwu/create-recover-wrong-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                var pre_id = res.pre_id;
                if (message != 'success') {
                    swal(message);
                    return false;
                }

                location.href = '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id + '&source=recoverwrongpaper' + '&cid=' + cid + '&uids=' + uids;
            },
            error: bs.errorHandler
        });

    }

    //學生版校正回歸
    function CreateStudentRecoverWrongPaper(){

        if ($('#select-schoolclass').val() == '-1') {
            swal('請選擇班級');
            return false;
        }

        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');
        var schoolclass=$('#select-schoolclass').val();


        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };


        var dataObj={};
        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id=schoolclass;
        dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);

        $.ajax({
            url: '/admin/stuquiz/create-student-recover-wrong-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;

                var pid = res.pid;

                if (message != 'success') {
                    swal(message);
                    return false;
                }else{

                    location.href = '/admin/exam?cid='+ schoolclass + '&pid=' + pid;
                }


            },
            error: bs.errorHandler
        });


    }


    //個別適性錯題派卷-下次再說
    $('#btn-leave').on('click',function(e){
       e.preventDefault();
        $('#sendpaper-modal').modal('hide');
        location.href = '../../admin/quizpaper/index';
    });

    //個別適性錯題派卷-線上派卷
    $('#btn-sendpaper-online').on('click',function(e){
        e.preventDefault();
        $('#sendpaper-modal').modal('hide');
        //swal('線上派卷');

        location.href = newObj.person_online_url;
    });

    //個別適性錯題派卷-紙本派卷
    $('#btn-sendpaper-manual').on('click',function(e){
        e.preventDefault();
        $('#sendpaper-modal').modal('hide');
        //swal('紙本派卷');

        location.href =  newObj.person_manual_url;
    });


	$('#btn-quiz').on('click', function(e) {
		e.preventDefault();
		createQuizPractice();
	});

    $('#btn-quiz-next').on('click', function(e) {
        e.preventDefault();
        var category_type=$('input:radio:checked[name="radio-category"]').val();

        if (category_type==0){
            $('#category-modal').modal('hide');
            $('#person-category-modal').modal('show');
        }else{

            createQuizPractice();
        }


    });

    $('#btn-person-category').on('click',function(e){
       e.preventDefault();
        PersonQuizPractice();
    });


	$('#btn-export').on('click', function(e) {
		e.preventDefault();
		$('.tableexport-caption > button').trigger('click');
	});

	$('#btn-student-wrong').on('click',function(e){
		e.preventDefault();
		studentWrongPractice();
	});

	$('#btn-student-confirm').on('click', function(e) {
		e.preventDefault();
		$('#confirm-modal').modal('toggle');
	});

	$('#btn-student-quiz').on('click', function(e) {
		e.preventDefault();
		studentQuizPractice();
	});

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


    function getSchoolclassStatus(){
        $('#select-schoolclass-status option').remove();
        $('#select-schoolclass-status').append('<option value="-1">請選擇班級狀態</option>');
        $('#select-schoolclass-status').append('<option value="1">進行中</option>');
        $('#select-schoolclass-status').append('<option value="0">已結業</option>');
        $('#select-schoolclass-status').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }


	function getSchoolclass() {
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        dataObj.status = $('#select-schoolclass-status').val();

        // switch (route_str) {
        //     case 'examprogress':
        //         dataObj.status = $('#select-schoolclass-status').val();
        //         break;
        //     case 'progressrecord':
        //         dataObj.status = $('#select-schoolclass-status').val();
        //         break;
        //     default:
        //         dataObj.status = $('#select-schoolclass-status').val();
        //         break;
        // }



        dataObj.hide_P0=1;
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

	function getRecentYear() {
        newObj.recent_year=bs.getRecentYear();
    }

	function getCourseCode(schoolclass_obj){

		var grade_code = schoolclass_obj.grade_code;

		if (grade_code=='J3' || grade_code=='H3') {
			$('#radioS2').parent().show();
		}
		else {
			$('#radioS2').parent().hide();
		}
	}

	function getTermCode(schoolclass_obj) {
        var text_year = schoolclass_obj.text_year;
        var grade_code = schoolclass_obj.grade_code;
        var subject_code = schoolclass_obj.subject_code;
        var year_up_1=0;
        var year_up_2=0;
        var year_up_3=0;
        var year_up_4=0;
        var year_up_5=0;
        var year_up_6=0;
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
                year_up_1=0;
                year_up_2=0;
                year_up_3=0;
                break;
            case 'J2':
            case 'H2':
                year_up_1=0;
                year_up_2=1;
                year_up_3=1;
                break;
            case 'J3':
            case 'H3':
                year_up_1=0;
                year_up_2=1;
                year_up_3=2;
                break;
            default:
                year_up_1=0;
                year_up_2=0;
                year_up_3=0;
                break;
        }

        var book_obj={};
        var role = JSON.parse(schoolclass_obj.role);
        $('.div-year').show();
        $('.chkYear').hide();
        $('input:checkbox[name="chkYear"]').prop('checked', false);
		$('input:radio[name="radioFactory"]').prop('checked', false);
        $('input:radio[name="radioFactory"]').parent().hide();

		if (grade_code=='J3' || grade_code=='H3') {
			if ($('#radioS2').prop('checked')) {
				$('#chkY1').siblings().text('全');
	            $('#chkY1').val((parseInt(newObj.recent_year)+year_up_1)+'-0' + '-' + bs.getNormalGrade(grade_code) + '-' + '0');
	            $('#chkY1').parent().show();
	            $('.div-year').eq(1).hide();
				return false;
			}
		}

        if (bs.getNormalGrade(grade_code)=='E0') {
            //
            $('#chkY1').siblings().text('小三上');
            $('#chkY1').val((parseInt(text_year)+year_up_3)+'-A' + '-' + 'E3' + '-' + '0');
            $('#chkY1').parent().show();

            $('#chkY2').siblings().text('小三下');
            $('#chkY2').val((parseInt(text_year)+year_up_3)+'-B' + '-' + 'E3' + '-' + '0');
            $('#chkY2').parent().show();

            $('#chkY3').siblings().text('小四上');
            $('#chkY3').val((parseInt(text_year)+year_up_4)+'-A' + '-' + 'E4' + '-' + '0');
            $('#chkY3').parent().show();

            $('#chkY4').siblings().text('小四下');
            $('#chkY4').val((parseInt(text_year)+year_up_4)+'-B' + '-' + 'E4' + '-' + '0');
            $('#chkY4').parent().show();

            $('#chkY5').siblings().text('小五上');
            $('#chkY5').val((parseInt(text_year)+year_up_5)+'-A' + '-' + 'E5' + '-' + '0');
            $('#chkY5').parent().show();

            $('#chkY6').siblings().text('小五下');
            $('#chkY6').val((parseInt(text_year)+year_up_5)+'-B' + '-' + 'E5' + '-' + '0');
            $('#chkY6').parent().show();

            $('#chkY7').siblings().text('小六上');
            $('#chkY7').val((parseInt(text_year)+year_up_6)+'-A' + '-' + 'E6' + '-' + '0');
            $('#chkY7').parent().show();

            $('#chkY8').siblings().text('小六下');
            $('#chkY8').val((parseInt(text_year)+year_up_6)+'-B' + '-' + 'E6' + '-' + '0');
            $('#chkY8').parent().show();
        }

        if (bs.getNormalGrade(grade_code)=='EP') {


            if (subject_code=='E21'){
                $('#chkY1').siblings().text('初級(1)');
                $('#chkY1').val((parseInt(text_year)+year_up_1)+'-A' + '-' + 'EP' + '-' + '0');
                $('#chkY1').parent().show();


                $('#chkY3').siblings().text('初級(2)');
                $('#chkY3').val((parseInt(text_year)+year_up_1)+'-B' + '-' + 'EP' + '-' + '0');
                $('#chkY3').parent().show();
            }else{
                $('#chkY1').siblings().text('全');
                $('#chkY1').val((parseInt(text_year)+year_up_1)+'-0' + '-' + 'EP' + '-' + '0');
                $('#chkY1').parent().show();
            }

            $('.div-year').eq(1).hide();
            $('#radioS3').parent().hide();
        }

        if (bs.getNormalGrade(grade_code)=='J0') {
            $('#chkY1').siblings().text('國一上');
            $('#chkY1').val((parseInt(text_year)+year_up_1)+'-A' + '-' + 'J1' + '-' + '0');
            $('#chkY1').parent().show();

            $('#chkY2').siblings().text('國一下');
            $('#chkY2').val((parseInt(text_year)+year_up_1)+'-B' + '-' + 'J1' + '-' + '0');
            $('#chkY2').parent().show();

            $('#chkY3').siblings().text('國二上');
            $('#chkY3').val((parseInt(text_year)+year_up_2)+'-A' + '-' + 'J2' + '-' + '0');
            $('#chkY3').parent().show();

            $('#chkY4').siblings().text('國二下');
            $('#chkY4').val((parseInt(text_year)+year_up_2)+'-B' + '-' + 'J2' + '-' + '0');
            $('#chkY4').parent().show();

            $('#chkY5').siblings().text('國三上');
            $('#chkY5').val((parseInt(text_year)+year_up_3)+'-A' + '-' + 'J3' + '-' + '0');
            $('#chkY5').parent().show();

            $('#chkY6').siblings().text('國三下');
            $('#chkY6').val((parseInt(text_year)+year_up_3)+'-B' + '-' + 'J3' + '-' + '0');
            $('#chkY6').parent().show();
        }

        if (bs.getNormalGrade(grade_code)=='H0') {
            var chk_flag=0;

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'0');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_1)+'-0' + '-' + 'H1' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'A');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_1)+'-A' + '-' + 'H1' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_1),'H1',subject_code,'B');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_1)+'-B' + '-' + 'H1' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'0');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_2)+'-0' + '-' + 'H2' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'A');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_2)+'-A' + '-' + 'H2' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_2),'H2',subject_code,'B');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_2)+'-B' + '-' + 'H2' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'0');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_3)+'-0' + '-' + 'H3' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'A');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_3)+'-A' + '-' + 'H3' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }

            book_obj=bs.getBookCode((parseInt(text_year) + year_up_3),'H3',subject_code,'B');
            if (Object.getOwnPropertyNames(book_obj).length>0) {
                chk_flag++;
                $('#chkY'+chk_flag).siblings().text(book_obj.book_name);
                $('#chkY'+chk_flag).val((parseInt(text_year)+year_up_3)+'-B' + '-' + 'H3' + '-' + book_obj.book_code);
                $('#chkY'+chk_flag).parent().show();
            }
        }
    }

	function getFactoryCode(schoolclass_obj) {

        var dataObj = {
            'grade_code': (schoolclass_obj)?schoolclass_obj.grade_code:'J1',
            'subject_code': (schoolclass_obj)?schoolclass_obj.subject_code:'C0'
        };
        $.ajax({
            url: '/admin/quizpaper/get-factory-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#chk-factory').empty();
                $.each(res, function(key, item) {
                    $('#chk-factory').append(
                        '<div class="form-check form-check-inline">\
                      <input class="form-check-input" type="radio" name="radioFactory" id="radioF' + item.code + '" value="' + item.code + '">\
                      <label class="form-check-label" for="radioF' + item.code + '">' + item.name + '</label>\
                    </div>');
                });

                if (schoolclass_obj) {

					if ((schoolclass_obj.grade_code=='J3' || schoolclass_obj.grade_code=='H3') && $('#radioS2').prop('checked')) {
						$('#chk-factory').empty();
						$('#chk-factory').append(
						'<div class="form-check form-check-inline">'+
						'<input class="form-check-input" type="radio" name="radioFactory" id="radioF00" value="0">'+
						'<label class="form-check-label" for="radioF00">力宇</label>'+
						'</div>');
						$('#radioF00').parent().show();
						$('#radioF00').prop('checked',true);
						return false;
					}

                    if (bs.getNormalGrade(schoolclass_obj.grade_code) == 'H0' && schoolclass_obj.subject_code != 'C0') {
                        $('#radioF0').prop('checked', true);
                    }
                    else {
                        if (schoolclass_obj.grade_code == 'EP') {
                            $('#radioF0').prop('checked', true);
                        }
                        else {
                            $('#radioF1').prop('checked', true);
                        }
                    }
                }
                else {
                    $('#radioF1').prop('checked', true);
                }

                $('input:radio[name="radioFactory"]').on('change', function(e) {
                    e.preventDefault();
					switch (route_str) {
						case 'examprogress':
							getRange();
							break;
						case 'progressrecord':
							getStuRange();
							break;
						default:
							getRange();
							break;
					}
                });
            },
            error: bs.errorHandler
        });
    }

	function initInputState(){
		$('#radioD2').prop('checked',true);
		$('#radioT1').prop('checked',true);
		jQuery('#date-stime').datetimepicker({
			format: 'Y/m/d',
			timepicker: false
		});

		jQuery('#date-etime').datetimepicker({
			format: 'Y/m/d',
			timepicker: false
		});
	}

	function getRange() {
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        dataObj.schoolclass_status=$('#select-schoolclass-status').val();
        dataObj.schoolclass_id = $('#select-schoolclass').val();
        dataObj.subject_code = newObj.subject_code;
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
        dataObj.know_kind = $('input:radio:checked[name="radio-know"]').val();
        dataObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();
        dataObj.data_kind = $('input:radio:checked[name="radio-data"]').val();
		dataObj.recover_weeks=$('#txt-recover').val();

		var course_code = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			course_code.push(item.value);
		});
		course_code.sort();
		dataObj.course_code=course_code;

		dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
		dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
		dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
		var leave_class_student_show=0;
		var check_close=$('#check-close').prop('checked');
        if (check_close==true){
            leave_class_student_show=1;
            dataObj.leaveclass_student_show=leave_class_student_show;
        }else{
            leave_class_student_show=0;
            dataObj.leaveclass_student_show=leave_class_student_show;
        }

        if (dataObj.school_id == '-1') {
            return false;
        }
        if (dataObj.grade_code == '-1') {
            return false;
        }
        if (dataObj.schoolclass_id == '-1') {
            return false;
        }
        if (dataObj.subject_code == '-1') {
            return false;
        }
        if (dataObj.yearTermAry.length == 0) {
            return false;
        }

        $.ajax({
            url: '/admin/banwu/get-examprogress',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(response) {
                bs.disableSubmits(false);
                var res = response.data;
                newObj.data = res;
                newObj.data_sort = res;
                newObj.data_sort_status = false;
                newObj.sort_id = -1;
                newObj.sort_asc = -1;
                newObj.knowledge_ary = [];
                var inner_html = '';

                $.each(res, function(key, item) {
                    if (dataObj.know_kind == 1) {
                        if (item.unit_percent_ary) {
                            var th_html = '';
                            $.each(item.unit_percent_ary, function(key2, item2) {
                                if (item2.user_name=='avg') {
									// switch (dataObj.data_kind) {
									// 	case '1':
									// 		th_html += '<th>平均練習量</th>';
									// 		break;
									// 	case '2':
									// 		th_html += '<th>平均正答率</th>';
									// 		break;
									// 	case '3':
									// 		th_html += '<th>平均復原率</th>';
									// 		break;
									// }
									th_html += '<th><input type="checkbox" checked name="check-user-all" class="m-r-5" />全班  <span class="float-right" sort_id="-1" sort_asc="0"><i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i></span></th>';
                                }
                                else {
                                    th_html += '<th><input type="checkbox" checked name="check-user" value="' + item2.user_id + '" class="m-r-5" />' + item2.user_name + ' <span class="float-right" sort_id="'+ item2.user_id +'" sort_asc="0"><i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i></span></th>';
                                }
                            });
                            inner_html +='<thead class="thead-light">';
                            inner_html +='<tr class="sticky-header">';
                            inner_html +='<th class="sticky-cell"><input type="checkbox" name="check-all" value="' + item.id + '" class="m-r-5">課次/章節</th>';
                            inner_html += th_html;
                            inner_html +='</tr>';
                            inner_html +='</thead>';
                            return false;
                        }
                    } else {
                        if (item.know_percent_ary) {
                            var th_html = '';
                            $.each(item.know_percent_ary, function(key2, item2) {
                                if (item2.user_name=='avg') {
									// switch (dataObj.data_kind) {
									// 	case '1':
									// 		th_html += '<th>平均練習量</th>';
									// 		break;
									// 	case '2':
									// 		th_html += '<th>平均正答率</th>';
									// 		break;
									// 	case '3':
									// 		th_html += '<th>平均復原率</th>';
									// 		break;
									// }
									th_html += '<th><input type="checkbox" checked name="check-user-all" class="m-r-5" />全班  <span class="float-right" sort_id="-1" sort_asc="0"><i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i></span></th>';
                                }
                                else {
                                    th_html += '<th><input type="checkbox" checked name="check-user" value="' + item2.user_id + '" class="m-r-5" />' + item2.user_name + ' <span class="float-right" sort_id="'+ item2.user_id +'" sort_asc="0"><i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i></span></th>';
                                }
                            });
                            inner_html +='<thead class="thead-light">';
                            inner_html +='<tr class="sticky-header">';
                            inner_html +='<th class="sticky-cell"><input type="checkbox" name="check-all" value="' + item.id + '" class="m-r-5">知識點</th>';
                            inner_html +=th_html;
                            inner_html +='</tr>';
                            inner_html +='</thead>';
                            return false;
                        }
                    }
                });

                $.each(res, function(key, item) {
                    if (dataObj.know_kind == 1) {
                        if (item.unit_percent_ary) {
                            var td_html = '';
                            $.each(item.unit_percent_ary, function(key2, item2) {
								var css_name='';
                                if (item2.right_percent != '--') {
									switch (dataObj.data_kind) {
										case '1':
											css_name = checkCss(item2.quiz_total_count);
											td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
											break;
										case '2':
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
										case '3':
											var current_percent=item2.right_percent;
											var old_percent=item.unit_percent_ary_before[key2].right_percent;
											if (old_percent!='--') {
												var recover_percent = current_percent-old_percent;
												css_name = checkRecoverCss(recover_percent);
												td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
											}
											else {
												td_html += '<td>--</td>';
											}
											break;
										default:
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
									}
                                } else {
                                    td_html += '<td>--</td>';
                                }
                            });
                            inner_html +='<tr>';
                            inner_html +='<td class="sticky-cell tableexport-string target"><input type="checkbox" name="check-one" value="' + item.id + '" class="m-r-5">' + item.text + '</td>';
                            inner_html +=td_html;
                            inner_html +='</tr>';
                        }
                    } else {
                        if (item.know_percent_ary) {
                            var td_html = '';
                            $.each(item.know_percent_ary, function(key2, item2) {
								var css_name='';
                                if (item2.right_percent != '--') {
									switch (dataObj.data_kind) {
										case '1':
											css_name = checkCss(item2.quiz_total_count);
											td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
											break;
										case '2':
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
										case '3':
											var current_percent=item2.right_percent;
											var old_percent=item.know_percent_ary_before[key2].right_percent;
											if (old_percent!='--') {
												var recover_percent = current_percent-old_percent;
												css_name = checkRecoverCss(recover_percent);
												td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
											}
											else {
												td_html += '<td>--</td>';
											}
											break;
										default:
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
									}
                                } else {
                                    td_html += '<td>--</td>';
                                }
                            });
                            inner_html +='<tr>';
                            inner_html +='<td class="sticky-cell tableexport-string target"><input type="checkbox" name="check-one" value="' + item.id + '" class="m-r-5">' + item.text + '</td>';
                            inner_html +=td_html;
                            inner_html +='</tr>';
                        }
                    }
                });

                $('#table-progress').empty().html(inner_html);
                checkState();

                var filter_html = '';
                filter_html += '<div class="form-check form-check-inline">';
                filter_html += '<input class="form-check-input" type="checkbox" name="data-filter" id="filter" value="1">';
                if(dataObj.data_kind == '1'){
                    filter_html += '<label class="form-check-label" for="filter">只顯示全班平均低於 <input type="text" id="filter-std" style="width: 40px"> <span id="unit">題</span></label>';
                }else{
                    filter_html += '<label class="form-check-label" for="filter">只顯示全班平均低於 <input type="text" id="filter-std" style="width: 40px"> <span id="unit">%</span></label>';
                }
                filter_html += '</div>';
                $('.div-filter').html(filter_html).parent().show();

                //過濾數值參照全班平均
                $('#filter').on('change', function(e){
                    e.preventDefault();
                    if($('#filter').prop('checked')){
                        if($('#filter-std').val() != '' && $('#filter-std').val().match(/^[0-9]\d*$/) && parseInt($('#filter-std').val()) <= 100){
                            reloadTBody(-1, newObj.sort_asc, dataObj.know_kind, dataObj.data_kind);
                        }else{
                            $('#filter-std').focus();
                        }
                    }else{
                        reloadTBody(-1, newObj.sort_asc, dataObj.know_kind, dataObj.data_kind);
                    }
                });

                $('#filter-std').on('keypress', function(e){
                    var key = window.enent? e.keyCode : e.which;
                    if(key == 13){
                        $('#filter-std').blur();
                    }
                });

                $('#filter-std').on('blur', function(e){
                    if($('#filter').prop('checked')){
                        if($('#filter-std').val() == '' || !$('#filter-std').val().match(/^[0-9]\d*$/) || parseInt($('#filter-std').val()) > 100){
                            alert('過濾基準請填入0~100的整數');
                            $('#filter').prop('checked', false);
                            return false;
                        }

                        reloadTBody(-1, newObj.sort_asc, dataObj.know_kind, dataObj.data_kind);
                    }
                });


                $('thead').on('click', 'tr', function(e){
                    if (e.target.tagName == 'INPUT' || e.target.className=='sticky-cell') {
                        return;
                    }
                    bs.disableSubmits(true);

                    newObj.data_sort_status = true;
                    var sort_id = '';
                    var sort_asc = '';

                    if(e.target.tagName == 'I'){
                        sort_id = $(e.target).parent().attr('sort_id');
                        sort_asc = $(e.target).parent().attr('sort_asc');

                        if(sort_id == newObj.sort_id && sort_asc == '1'){
                            $(e.target).parent().attr('sort_asc','0').html('<i class="fa fa-long-arrow-down"></i>');
                        }else{
                            $(e.target).parent().attr('sort_asc','1').html('<i class="fa fa-long-arrow-up"></i>');
                        }

                        newObj.sort_id = sort_id;
                        $('thead span[sort_id!='+sort_id+']').attr('sort_asc','0').html('<i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i>');
                    }else if(e.target.tagName == 'TH'){
                        sort_id = $(e.target).find('span').attr('sort_id');
                        sort_asc = $(e.target).find('span').attr('sort_asc');

                        if(sort_id == newObj.sort_id && sort_asc == '1'){
                            $(e.target).find('span').attr('sort_asc','0').html('<i class="fa fa-long-arrow-down"></i>');
                        }else{
                            $(e.target).find('span').attr('sort_asc','1').html('<i class="fa fa-long-arrow-up"></i>');
                        }

                        newObj.sort_id = sort_id;
                        newObj.sort_asc = sort_asc;
                        $('thead span[sort_id!='+sort_id+']').attr('sort_asc','0').html('<i class="fa fa-long-arrow-up"></i><i class="fa fa-long-arrow-down"></i>');
                    }

                    reloadTBody(sort_id, sort_asc, dataObj.know_kind, dataObj.data_kind);

                    bs.disableSubmits(false);
                });

                getRangeEvent_teacher();
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getRangeEvent_teacher(){
        $('#btn-export').show();
        $("#table-progress").tableExport({
            formats: ['xlsx'],
            position:'top',
            fileName:'匯出'
        });
        $('.tableexport-caption').hide();


        $('input[name="check-user-all"]').on('change', function(e) {
            e.preventDefault();
            if ($(this).prop('checked')) {
                $('input[name="check-user"]').prop('checked',true);
            }
            else {
                $('input[name="check-user"]').prop('checked',false);
            }
        });

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
    }

	function getStuRange() {
        var dataObj = {};
        dataObj.schoolclass_id=$('#select-schoolclass').val();
        dataObj.subject_code = newObj.subject_code;
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
        dataObj.know_kind=$('input:radio:checked[name="radio-know"]').val();
        dataObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();
        dataObj.data_kind=$('input:radio:checked[name="radio-data"]').val();
        var course_code = [];
        $.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
            course_code.push(item.value);
        });
        course_code.sort();
        dataObj.course_code=course_code;

        if (dataObj.schoolclass_id=='-1') {
            return false;
        }
        if (dataObj.subject_code=='-1') {
            return false;
        }
        if ($('input:radio:checked[name="radioFactory"]').length==0) {
            return false;
        }
        if (dataObj.yearTermAry.length==0) {
            return false;
        }

        $.ajax({
            url: '/admin/banwu/get-progressrecord',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(response) {
                bs.disableSubmits(false);
                var res=response.data;
                newObj.data=res;
                newObj.knowledge_ary=[];
                var inner_html='';

                $.each(res,function(key,item){
                    if (dataObj.know_kind==1) {
                        if (item.unit_percent_ary) {
                            var th_html='';
                            $.each(item.unit_percent_ary,function(key2,item2){
                                th_html+='<th>'+item2.user_name+'</th>';
                            });
                            inner_html+=
                            '<thead class="thead-light">\
                            <tr>\
                            <th><input type="checkbox" name="check-all" value="'+item.id+'"></th>\
                            <th>課次/章節</th>\
                            '+th_html+'\
                            </tr>\
                            </thead>';
                            return false;
                        }
                    }
                    else {
                        if (item.know_percent_ary) {
                            var th_html='';
                            $.each(item.know_percent_ary,function(key2,item2){
                                th_html+='<th>'+item2.user_name+'</th>';
                            });
                            inner_html+=
                            '<thead class="thead-light">\
                            <tr>\
                            <th><input type="checkbox" name="check-all" value="'+item.id+'"></th>\
                            <th>知識點</th>\
                            '+th_html+'\
                            </tr>\
                            </thead>';
                            return false;
                        }
                    }
                });

                $.each(res,function(key,item){
                    if (dataObj.know_kind==1) {
                        if (item.unit_percent_ary) {
                            var td_html='';
							$.each(item.unit_percent_ary, function(key2, item2) {
								var css_name='';
                                if (item2.right_percent != '--') {
									switch (dataObj.data_kind) {
										case '1':
											css_name = checkCss(item2.quiz_total_count);
											td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
											break;
										case '2':
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
										case '3':
											var current_percent=item2.right_percent;
											var old_percent=item.unit_percent_ary_before[key2].right_percent;
											if (old_percent!='--') {
												var recover_percent = current_percent-old_percent;
												css_name = checkRecoverCss(recover_percent);
												td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
											}
											else {
												td_html += '<td>--</td>';
											}
											break;
										default:
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
									}
                                } else {
                                    td_html += '<td>--</td>';
                                }
                            });
                            inner_html+=
                            '<tr>\
                            <td><input type="checkbox" name="check-one" value="'+item.id+'"></td>\
                            <td>'+item.text+'</td>\
                            '+td_html+'\
                            </tr>';
                        }
                    }
                    else {
                        if (item.know_percent_ary) {
                            var td_html='';
							$.each(item.know_percent_ary, function(key2, item2) {
								var css_name='';
                                if (item2.right_percent != '--') {
									switch (dataObj.data_kind) {
										case '1':
											css_name = checkCss(item2.quiz_total_count);
											td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
											break;
										case '2':
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
										case '3':
											var current_percent=item2.right_percent;
											var old_percent=item.know_percent_ary_before[key2].right_percent;
											if (old_percent!='--') {
												var recover_percent = current_percent-old_percent;
												css_name = checkRecoverCss(recover_percent);
												td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
											}
											else {
												td_html += '<td>--</td>';
											}
											break;
										default:
											css_name = checkCss(item2.right_percent);
											td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
											break;
									}
                                } else {
                                    td_html += '<td>--</td>';
                                }
                            });
                            inner_html+=
                            '<tr>\
                            <td><input type="checkbox" name="check-one" value="'+item.id+'"></td>\
                            <td>'+item.text+'</td>\
                            '+td_html+'\
                            </tr>';
                        }
                    }

                });

                $('#table-progress').empty().html(inner_html);

                checkState();

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

                $('#btn-wrong,#btn-fake-quiz,#btn-student-wrong,#btn-student-confirm').removeClass('btn-secondary').addClass('btn-orange');
                $('#btn-adjusted-regression,#btn-student-adjusted-regression').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {

                $('#btn-wrong,#btn-fake-quiz,#btn-student-wrong,#btn-student-confirm').removeClass('btn-orange').addClass('btn-secondary');
                $('#btn-adjusted-regression,#btn-student-adjusted-regression').removeClass('btn-orange').addClass('btn-secondary');
            }
        });
    }

    function checkCss(flag) {
        var css_name = '';
        if (flag >= 0 && flag <= 20) {
            css_name = 'percent-0-20';
        } else if (flag >= 21 && flag <= 40) {
            css_name = 'percent-21-40';
        } else if (flag >= 41 && flag <= 60) {
            css_name = 'percent-41-60';
        } else if (flag >= 61 && flag <= 80) {
            css_name = 'percent-61-80';
        } else {
            css_name = 'percent-81-100';
        }
        return css_name;
    }

	function checkRecoverCss(flag){
		var css_name = '';
		if (flag<0) {
			css_name = 'recover-Regress';
		}
        else if (flag >= 0 && flag <= 10) {
            css_name = 'recover-0-10';
        }
		else if (flag >= 11 && flag <= 20) {
            css_name = 'recover-11-20';
        }
		else {
            css_name = 'recover-21up';
        }
        return css_name;
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
        var index = bs.findIndexByKey(newObj.data, 'id', $(dom).val());
        newObj.data[index].state = {};
        newObj.data[index].state.selected = checked;

        var ary = bs.findIndexAryByKey(newObj.data, 'parent', $(dom).val());
        $.each(ary, function(key) {
            newObj.data[key].state = {};
            newObj.data[key].state.selected = checked;
        });

        checkSelect();
    }

    function checkSelect() {
        newObj.chapter_knowledge_ary=[];
        newObj.chapter_ary=[];
        newObj.knowledge_ary = [];
        $.each(newObj.data, function(key, item) {

            if ($('input:radio:checked[name="radio-know"]').val() == 1) {
                if (item.unit_percent_ary && item.state && item.state.selected) {
                    var chapter_info={};
                    chapter_info.id=item.id;
                    chapter_info.parent=item.parent;
                    chapter_info.text=item.text;
                    chapter_info.user_info=item.unit_percent_ary;
                    chapter_info.knowledge=item.knowledge;
                    chapter_info.sub_knowledge=item.sub_knowledge;
                    newObj.chapter_ary.push(chapter_info);


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
            } else {
                if (item.know_percent_ary && item.state && item.state.selected) {
                    var chapter_info={};
                    chapter_info.id=item.id;
                    chapter_info.parent=item.parent;
                    chapter_info.text=item.text;
                    chapter_info.user_info=item.know_percent_ary;
                    //用知識點搜尋不需要子知識點
                    var temp_ary=[];
                    temp_ary.push("");

                    chapter_info.sub_knowledge=temp_ary;
                    var ids = item.id.split('-');
                    var temp_knowledge=[];
                    if (newObj.subject_code == 'C0') {
                        if (ids.length == 2) {
                            newObj.knowledge_ary.push(ids[1]);
                            temp_knowledge.push(ids[1]);
                            chapter_info.knowledge=temp_knowledge;
                        }
                    } else if (newObj.subject_code == 'E0' || newObj.subject_code=='E11' || newObj.subject_code=='E12' || newObj.subject_code=='E13' || newObj.subject_code=='E14' || newObj.subject_code=='E21'  ) { //新增英文科目要加入科目代碼避免類題練習不挑題選知識點,知識點沒有傳到function 出錯
                        if (ids.length == 2) {
                            newObj.knowledge_ary.push(ids[1]);
                            temp_knowledge.push(ids[1]);
                            chapter_info.knowledge=temp_knowledge;
                        }
                        if (ids.length == 3) {
                            newObj.knowledge_ary = newObj.knowledge_ary.concat(JSON.parse(ids[2]));
                            chapter_info.knowledge=newObj.knowledge_ary.concat(JSON.parse(ids[2]));
                        }
                    } else {
                        if (ids.length == 3) {
                            newObj.knowledge_ary.push(ids[2]);
                            temp_knowledge.push(ids[2]);
                            chapter_info.knowledge=temp_knowledge;

                        }
                    }
                    newObj.chapter_knowledge_ary.push(chapter_info);
                }
            }
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

    function reloadTBody(sort_id, sort_asc, know_kind, data_kind){
        var get_res = '';
	    var res = '';
        get_res = newObj.data;

	    if(!newObj.data_sort_status) {
            res = get_res;
        }else{
            //排序資料，先抓到欄位內數字
            get_res = newObj.data_sort;
            res = newObj.data_sort = get_res.sort(function (a, b) {
                var contentA = -999;
                var contentB = -999;

                if (know_kind == '1') {
                    //課次/章節
                    if (a.unit_percent_ary) {
                        for (let i = 0; i < a.unit_percent_ary.length; i++) {
                            if (a.unit_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    contentA = (a.unit_percent_ary[i].quiz_total_count != '--') ? parseInt(a.unit_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    contentA = (a.unit_percent_ary[i].right_percent != '--') ? parseInt(a.unit_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((a.unit_percent_ary[i].right_percent != '--') && (a.unit_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(a.unit_percent_ary[i].right_percent);
                                        var old_percent = parseInt(a.unit_percent_ary_before[i].right_percent);
                                        contentA = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }

                    if (b.unit_percent_ary) {
                        for (let i = 0; i < b.unit_percent_ary.length; i++) {
                            if (b.unit_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    contentB = (b.unit_percent_ary[i].quiz_total_count != '--') ? parseInt(b.unit_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    contentB = (b.unit_percent_ary[i].right_percent != '--') ? parseInt(b.unit_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((b.unit_percent_ary[i].right_percent != '--') && (b.unit_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(b.unit_percent_ary[i].right_percent);
                                        var old_percent = parseInt(b.unit_percent_ary_before[i].right_percent);
                                        contentB = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }

                } else if (know_kind == '2') {
                    //知識點
                    if (a.know_percent_ary) {
                        for (let i = 0; i < a.know_percent_ary.length; i++) {
                            if (a.know_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    contentA = (a.know_percent_ary[i].quiz_total_count != '--') ? parseInt(a.know_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    contentA = (a.know_percent_ary[i].right_percent != '--') ? parseInt(a.know_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((a.know_percent_ary[i].right_percent != '--') && (a.know_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(a.know_percent_ary[i].right_percent);
                                        var old_percent = parseInt(a.know_percent_ary_before[i].right_percent);
                                        contentA = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }

                    if (b.know_percent_ary) {
                        for (let i = 0; i < b.know_percent_ary.length; i++) {
                            if (b.know_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    contentB = (b.know_percent_ary[i].quiz_total_count != '--') ? parseInt(b.know_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    contentB = (b.know_percent_ary[i].right_percent != '--') ? parseInt(b.know_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((b.know_percent_ary[i].right_percent != '--') && (b.know_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(b.know_percent_ary[i].right_percent);
                                        var old_percent = parseInt(b.know_percent_ary_before[i].right_percent);
                                        contentB = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }

                if (sort_asc == '1') {
                    return contentB - contentA;
                } else {
                    return contentA - contentB;
                }
            });
        }

        if ($('#filter').prop('checked')){
            //過濾資料，先抓到欄位內數字
            var filter_std = $('#filter-std').val();
            get_res = res;
            res = get_res.filter(function (element, index, arr) {
                var content = -999;

                if (know_kind == '1') {
                    //課次/章節
                    if (element.unit_percent_ary) {
                        for (let i = 0; i < element.unit_percent_ary.length; i++) {
                            if (element.unit_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    content = (element.unit_percent_ary[i].quiz_total_count != '--') ? parseInt(element.unit_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    content = (element.unit_percent_ary[i].right_percent != '--') ? parseInt(element.unit_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((element.unit_percent_ary[i].right_percent != '--') && (element.unit_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(element.unit_percent_ary[i].right_percent);
                                        var old_percent = parseInt(element.unit_percent_ary_before[i].right_percent);
                                        content = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }
                } else if (know_kind == '2') {
                    //知識點
                    if (element.know_percent_ary) {
                        for (let i = 0; i < element.know_percent_ary.length; i++) {
                            if (element.know_percent_ary[i].user_id == sort_id) {
                                if (data_kind == '1') {
                                    content = (element.know_percent_ary[i].quiz_total_count != '--') ? parseInt(element.know_percent_ary[i].quiz_total_count) : -999;
                                } else if (data_kind == '2') {
                                    content = (element.know_percent_ary[i].right_percent != '--') ? parseInt(element.know_percent_ary[i].right_percent) : -999;
                                } else if (data_kind == '3') {
                                    if ((element.know_percent_ary[i].right_percent != '--') && (element.know_percent_ary_before[i].right_percent != '--')) {
                                        var current_percent = parseInt(element.know_percent_ary[i].right_percent);
                                        var old_percent = parseInt(element.know_percent_ary_before[i].right_percent);
                                        content = current_percent - old_percent;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }

                return content <= filter_std;
            });
        }

        var inner_html = '';

        $.each(res, function(key, item) {
            if (know_kind == 1) {
                if (item.unit_percent_ary) {
                    var td_html = '';
                    $.each(item.unit_percent_ary, function(key2, item2) {
                        var css_name='';
                        if (item2.right_percent != '--') {
                            switch (data_kind) {
                                case '1':
                                    css_name = checkCss(item2.quiz_total_count);
                                    td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
                                    break;
                                case '2':
                                    css_name = checkCss(item2.right_percent);
                                    td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
                                    break;
                                case '3':
                                    var current_percent=item2.right_percent;
                                    var old_percent=item.unit_percent_ary_before[key2].right_percent;
                                    if (old_percent!='--') {
                                        var recover_percent = current_percent-old_percent;
                                        css_name = checkRecoverCss(recover_percent);
                                        td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
                                    }
                                    else {
                                        td_html += '<td>--</td>';
                                    }
                                    break;
                                default:
                                    css_name = checkCss(item2.right_percent);
                                    td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
                                    break;
                            }
                        } else {
                            td_html += '<td>--</td>';
                        }
                    });
                    inner_html +='<tr>';
                    inner_html +='<td class="sticky-cell tableexport-string target"><input type="checkbox" name="check-one" value="' + item.id + '" class="m-r-5">' + item.text + '</td>';
                    inner_html +=td_html;
                    inner_html +='</tr>';
                }
            } else {
                if (item.know_percent_ary) {
                    var td_html = '';
                    $.each(item.know_percent_ary, function(key2, item2) {
                        var css_name='';
                        if (item2.right_percent != '--') {
                            switch (data_kind) {
                                case '1':
                                    css_name = checkCss(item2.quiz_quiz_total_countcount);
                                    td_html += '<td class="' + css_name + '">' + item2.quiz_total_count + '</td>';
                                    break;
                                case '2':
                                    css_name = checkCss(item2.right_percent);
                                    td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
                                    break;
                                case '3':
                                    var current_percent=item2.right_percent;
                                    var old_percent=item.know_percent_ary_before[key2].right_percent;
                                    if (old_percent!='--') {
                                        var recover_percent = current_percent-old_percent;
                                        css_name = checkRecoverCss(recover_percent);
                                        td_html += '<td class="' + css_name + '">' + recover_percent + '%</td>';
                                    }
                                    else {
                                        td_html += '<td>--</td>';
                                    }
                                    break;
                                default:
                                    css_name = checkCss(item2.right_percent);
                                    td_html += '<td class="' + css_name + '">' + item2.right_percent + '%</td>';
                                    break;
                            }
                        } else {
                            td_html += '<td>--</td>';
                        }
                    });
                    inner_html +='<tr>';
                    inner_html +='<td class="sticky-cell tableexport-string target"><input type="checkbox" name="check-one" value="' + item.id + '" class="m-r-5">' + item.text + '</td>';
                    inner_html +=td_html;
                    inner_html +='</tr>';
                }
            }
        });

        $('#table-progress tbody').empty().html(inner_html);
        checkState();

        //事件需重新宣告
        getRangeEvent_teacher();
    }
    //參考selfexam checkSelfexamQuiz() 去取得題目難度
    function GetQuizDiffculty(){
        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');
        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };
        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }
        if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }
        // $('#confirm-modal').modal('toggle');
        var dataObj={};
        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();
        var cid=dataObj.schoolclass_id;
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }
        var uids = user_ary.join('-');

        dataObj.user_ary=user_ary;
        dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
        dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);

        $.ajax({
            url: '/admin/banwu/get-quiz-diffculty',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var quiz_difficulty = res.quiz_difficulty;
                if (quiz_difficulty.length==0) {
                    swal('目前沒有題目可以出卷');
                    return false;
                } else {
                    $('input:checkbox[name="chk-difficulty"]').parent().hide();
                    $('input:checkbox[name="chk-difficulty"]').prop('checked',false);

                    $.each(quiz_difficulty, function(key, item) {
                        var difficult = item.quiz_difficulty_id;
                        switch (difficult) {
                            case 1:
                                $('#chk-difficulty0').parent().show();
                                $('#chk-difficulty0').prop('checked',true);
                                break;
                            case 2:
                                $('#chk-difficulty1').parent().show();
                                $('#chk-difficulty1').prop('checked',true);
                                break;
                            case 3:
                                $('#chk-difficulty2').parent().show();
                                $('#chk-difficulty2').prop('checked',true);
                                break;
                            case 4:
                                $('#chk-difficulty3').parent().show();
                                $('#chk-difficulty3').prop('checked',true);
                                break;
                            case 5:
                                $('#chk-difficulty4').parent().show();
                                $('#chk-difficulty4').prop('checked',true);
                                break;
                        }
                    });
                }
                $('#confirm-modal').modal('toggle');
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
                // $('#select-tags option').remove();
                // $.each(res, function(key, item) {
                //     $('#select-tags').append('<option value="' + item.id + '">' + item.name + '</option>');
                // });
                // $('#select-tags').select2({
                //     theme: "bootstrap",
                //     placeholder: {
                //         id: '-1',
                //         text: '選擇考試標籤'
                //     },
                //     tags: true,
                //     language: 'zh-TW'
                // });
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

                $('#select-tags-category option').remove();
                $.each(res, function(key, item) {
                    $('#select-tags-category').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-tags-category').select2({
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


    //個人化錯題練習
    function PersonPractice(){
        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');

        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };

        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }

        if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }

        var dataObj = {};

        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 5;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
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

        dataObj.pre_step2 = {};
        dataObj.pre_step2.exam_range = '-';

        var jstree = [];
        $.each(newObj.data, function(key, item) {
            if (item.state) {
                if (item.state.selected) {
                    jstree.push(item.id);
                }
            }
        });
        dataObj.pre_step2.jstree = jstree;

        dataObj.pre_step3 = {};
        dataObj.pre_step3.grade_code = '-1';
        dataObj.pre_step3.subject_code = newObj.subject_code;
        dataObj.pre_step3.created_by = '-1';
        dataObj.pre_step3.quizpaper_category_id = '-1';
        dataObj.pre_step3.quizpaper_tag_ids = [];
        dataObj.pre_step3.name = '';
        dataObj.pre_step3.repeat_papers = [];

        dataObj.pre_step4 = {};
        dataObj.pre_step4.quiz_difficulty_id = '-1';
        dataObj.pre_step4.quiz_category_id = '-1';
        dataObj.pre_step4.quiz_qtype_id = '-1';
        dataObj.pre_step4.quiz_extension_id='-1';
        dataObj.pre_step4.qa_text = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.pre_step5 = {};
        dataObj.pre_step5.quiz_content = [];
        dataObj.pre_step5.per_score = 0;

        //初始化step6變數
        dataObj.pre_step6 = {};
        dataObj.pre_step6.grade_code='-1';
        dataObj.pre_step6.subject_code='-1';
        dataObj.pre_step6.quizpaper_category_id='-1';
        dataObj.pre_step6.quizpaper_tag_ids=[];
        dataObj.pre_step6.name='';
        dataObj.pre_step6.notes='';
        dataObj.pre_step6.public_status=0;


        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

        var cid=dataObj.schoolclass_id;
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }
        var uids = user_ary.join('-');

        if (user_ary.length<=1){
            swal('個別適性錯題卷,至少要勾選兩名學生');
            return false;
        }

        dataObj.user_ary=user_ary;
        dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
        dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
        dataObj.difficulty_ary = [];
        var difficulty_ary = [];
        $.each($('input:checkbox:checked[name="chk-difficulty"]'), function(key, item) {
            difficulty_ary.push(item.value);
        });
        difficulty_ary.sort();
        dataObj.difficulty_ary = difficulty_ary;
        dataObj.quiz_count = parseInt($('input:radio:checked[name="radio-quiz"]').val());
        dataObj.quizpaper_tag_names = [];
        var quizpaper_tag_names = [];
        $.each($('#select-tags2').select2('data'), function(key, item) {
            quizpaper_tag_names.push(item.text);
        });
        quizpaper_tag_names.sort();
        dataObj.quizpaper_tag_names = quizpaper_tag_names;
        dataObj.name = $('#txt-name').val();
        dataObj.notes = $('#txt-notes').val();

        if ($('#txt-name').val()==''){
            swal('請輸入考卷名稱');
            return false;
        }

        $.ajax({
            url: '/admin/banwu/create-person-wrong-paper',
            type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
            success: function(res){
                if (res.message=='success') {
                    $('#person-wrong-modal').modal('hide');
                    newObj.person_online_url=res.person_online_url;
                    newObj.person_manual_url=res.person_manual_url;
                    $('#sendpaper-modal').modal('show');

                }
                else{
                    swal(res.message);
                    return false;
                }
            },error: bs.errorHandler
        });

    }

    //個人化類題練習
    function PersonQuizPractice() {
        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');

        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };
        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }

        if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }

        if ( $('input[name=radio-category]:checked').val()==0 && $('#input-category').val()==0){
            swal('輸入題數不可為零');
            return false;
        }
        if ($('input[name=radio-category]:checked').val()==0 && $('#input-category').val()>=101){
            swal('輸入題數不可為超過100題');
            return false;
        }

        var dataObj = {};

        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 5;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
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

        dataObj.pre_step2 = {};
        dataObj.pre_step2.exam_range = '-';

        var jstree = [];
        $.each(newObj.data, function(key, item) {
            if (item.state) {
                if (item.state.selected) {
                    jstree.push(item.id);
                }
            }
        });
        dataObj.pre_step2.jstree = jstree;

        dataObj.pre_step3 = {};
        dataObj.pre_step3.grade_code = '-1';
        dataObj.pre_step3.subject_code = newObj.subject_code;
        dataObj.pre_step3.created_by = '-1';
        dataObj.pre_step3.quizpaper_category_id = '-1';
        dataObj.pre_step3.quizpaper_tag_ids = [];
        dataObj.pre_step3.name = '';
        dataObj.pre_step3.repeat_papers = [];

        dataObj.pre_step4 = {};
        dataObj.pre_step4.quiz_difficulty_id = '-1';
        dataObj.pre_step4.quiz_category_id = '-1';
        dataObj.pre_step4.quiz_qtype_id = '-1';
        dataObj.pre_step4.quiz_extension_id='-1';
        dataObj.pre_step4.qa_text = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.pre_step5 = {};
        dataObj.pre_step5.quiz_content = [];
        dataObj.pre_step5.per_score = 0;

        //初始化step6變數
        dataObj.pre_step6 = {};
        dataObj.pre_step6.grade_code='-1';
        dataObj.pre_step6.subject_code='-1';
        dataObj.pre_step6.quizpaper_category_id='-1';
        dataObj.pre_step6.quizpaper_tag_ids=[];
        dataObj.pre_step6.name='';
        dataObj.pre_step6.notes='';
        dataObj.pre_step6.public_status=0;


        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.chapter_ary=newObj.chapter_ary;
        dataObj.know_kind = $('input:radio:checked[name="radio-know"]').val();
        dataObj.chapter_knowledge_ary=newObj.chapter_knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

        var cid=dataObj.schoolclass_id;
        var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
        if (user_ary.length==0) {
            user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
        }
        var uids = user_ary.join('-');

        // if (user_ary.length<=1){
        //     swal('個別適性類題卷,至少要勾選兩名學生');
        //     return false;
        // }

        dataObj.user_ary=user_ary;
        dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
        dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
        dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);

        var quiz_count=($('input#input-category').val());
        dataObj.quiz_count = quiz_count;
        dataObj.quizpaper_tag_names = [];
        var quizpaper_tag_names = [];
        $.each($('#select-tags-category').select2('data'), function(key, item) {
            quizpaper_tag_names.push(item.text);
        });
        quizpaper_tag_names.sort();
        dataObj.quizpaper_tag_names = quizpaper_tag_names;
        dataObj.name = $('#txt-name-category').val();
        dataObj.notes = $('#txt-notes-category').val();

        if ($('#txt-name-category').val()==''){
            swal('請輸入考卷名稱');
            return false;
        }

        $.ajax({
            url: '/admin/banwu/create-person-quiz-paper',
            type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
            success: function(res){
                if (res.message=='success') {
                    $('#person-category-modal').modal('hide');
                    newObj.person_online_url=res.person_online_url;
                    newObj.person_manual_url=res.person_manual_url;
                    $('#sendpaper-modal').modal('show');

                }
                else{
                    swal(res.message);
                    return false;
                }
            },error: bs.errorHandler
        });


    }

    function createWrongPractice() {

        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');

        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };

	    if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }

		if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }

        var dataObj = {};

        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 4;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
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

        dataObj.pre_step2 = {};
        dataObj.pre_step2.exam_range = '-';

        var jstree = [];
        $.each(newObj.data, function(key, item) {
            if (item.state) {
                if (item.state.selected) {
                    jstree.push(item.id);
                }
            }
        });
        dataObj.pre_step2.jstree = jstree;

        dataObj.pre_step3 = {};
        dataObj.pre_step3.grade_code = '-1';
        dataObj.pre_step3.subject_code = newObj.subject_code;
        dataObj.pre_step3.created_by = '-1';
        dataObj.pre_step3.quizpaper_category_id = '-1';
        dataObj.pre_step3.quizpaper_tag_ids = [];
        dataObj.pre_step3.name = '';
        dataObj.pre_step3.repeatPaperAry = [];

        dataObj.pre_step4 = {};
        dataObj.pre_step4.quiz_difficulty_id = '-1';
        dataObj.pre_step4.quiz_category_id = '-1';
        dataObj.pre_step4.quiz_qtype_id = '-1';
        dataObj.pre_step4.quiz_extension_id='-1';
        dataObj.pre_step4.txt_search = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.pre_step5 = {};
        dataObj.pre_step5.quiz_content = [];
        dataObj.pre_step5.per_score = 0;

        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

		var cid=dataObj.schoolclass_id;
		var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
		if (user_ary.length==0) {
			user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
		}
		var uids = user_ary.join('-');

		dataObj.user_ary=user_ary;
		dataObj.time_kind=$('input:radio:checked[name="radio-time"]').val();
		dataObj.stime=Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
		dataObj.etime=Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
        dataObj.difficulty_ary = [];
        var difficulty_ary = [];
        $.each($('input:checkbox:checked[name="chk-difficulty"]'), function(key, item) {
            difficulty_ary.push(item.value);
        });
        difficulty_ary.sort();
        dataObj.difficulty_ary = difficulty_ary;
        dataObj.quiz_count = parseInt($('input:radio:checked[name="radio-quiz"]').val());

        $.ajax({
            url: '/admin/banwu/create-wrong-paper',
            type: 'POST',
            data: JSON.stringify(dataObj),
            contentType: 'application/json',
            success: function(res) {
                var message = res.message;
                var pre_id = res.pre_id;
                var quiz_all_count=res.quiz_all_count;
                var quiz_page_count=res.quiz_page_count+1;

                // if (message != 'success') {
                //     swal(message);
                //     return false;
                // }
                if (message=='success'){
                    location.href = '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id + '&source=wrong'+'&cid='+cid+'&uids='+uids;
                }else if (message=='錯題超錯100題'){
                    $('#confirm-modal').modal('hide');
                    $('#onehundredmore-modal').modal('show');

                    $('#onehundredmore-content').html();
                    var append_html='';
                    append_html+='<label class="col-sm-2">錯題題數:'+  quiz_all_count  +'</label>';
                    append_html+='<br>';
                    append_html+='<label class="col-sm-2">請輸入要練習的題數(上限為100題)</label>';
                    var i=0;
                    for (i = 1; i <quiz_page_count ; i++) {
                        var start_quiz=0;
                        var end_quiz=0;
                        start_quiz=((i-1)*100)+1;
                        end_quiz=i*100;
                        append_html+='<div class="row strictRow">';
                        append_html+='<label class="col-md-4">成卷'+i+':('+start_quiz+'-'+end_quiz+')</label>';
                        append_html+='<input type="number" step="1" min="0" max="100" maxlength="3" autocomplete="off"  class="col-md-4 text-onehundrder-more"  id="text-onehundrder-more'+i+'" value="1" >';
                        append_html+='<button class="col-md-4 btn btn-primary btn-onehundrder-more " id="btn-onehundrder-more'+i+'" value="'+i+'">成卷'+i+'</button>';
                        append_html+=' </div>';
                    }

                    $('#onehundredmore-content').html(append_html);

                    //生成後才可控制按鈕
                    $('.btn-onehundrder-more').on('click',function(e){
                        e.preventDefault();
                        var quiz_range_nub = $(this).attr("value");
                        var quiz_range_count=$('#text-onehundrder-more'+quiz_range_nub).val();
                        dataObj.quiz_range_nub=quiz_range_nub;
                        dataObj.quiz_range_count=quiz_range_count;
                        const re = /^[0-9]+$/;

                        if (quiz_range_count>100){
                            swal('題數不可超過100題');
                            return false;
                        }else if (!re.test(quiz_range_count)){
                           swal('格式必須為數字');
                           return false;
                        }else if (quiz_range_count==0){
                            swal('題數不能為0題');
                        }

                        $.ajax({
                            url: '/admin/banwu/create-onehundred-more-wrong-paper',
                            type: 'POST',
                            data: dataObj,
                            success: function(res2) {
                                var message_2 = res2.message;
                                var pre_id_2 = res2.pre_id;

                                if (message_2=='success'){
                                    window.open( '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id_2 + '&source=wrong'+'&cid='+cid+'&uids='+uids+'&another='+1);
                                }
                            },
                            error: bs.errorHandler
                        });

                    });

                }
                else{
                    swal(message);
                    return false;
                }

            },
            error: bs.errorHandler
        });


    }


    function createQuizPractice() {
        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');

        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };
		if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }

		if ($('input:checkbox:checked[name="check-user"]').length == 0) {
            swal('請至少勾選一名學生');
            return false;
        }

		if ( $('input[name=radio-category]:checked').val()==0 && $('#input-category').val()==0){
		    swal('輸入題數不可為零');
            return false;
        }
        if ($('input[name=radio-category]:checked').val()==0 && $('#input-category').val()>=101){
            swal('輸入題數不可為超過100題');
            return false;
        }


		var dataObj = {};
        dataObj.source='similar';
        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 3;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
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

        dataObj.pre_step2 = {};
        dataObj.pre_step2.exam_range = '-';

        var jstree = [];
        $.each(newObj.data, function(key, item) {
            if (item.state) {
                if (item.state.selected) {
                    jstree.push(item.id);
                }
            }
        });
        dataObj.pre_step2.jstree = jstree;

        dataObj.pre_step3 = {};
        dataObj.pre_step3.grade_code = '-1';
        dataObj.pre_step3.subject_code = newObj.subject_code;
        dataObj.pre_step3.created_by = '-1';
        dataObj.pre_step3.quizpaper_category_id = '-1';
        dataObj.pre_step3.quizpaper_tag_ids = [];
        dataObj.pre_step3.name = '';
        dataObj.pre_step3.repeat_papers = [];

        dataObj.pre_step4 = {};
        dataObj.pre_step4.quiz_difficulty_id = '-1';
        dataObj.pre_step4.quiz_category_id = '-1';
        dataObj.pre_step4.quiz_qtype_id = '-1';
        dataObj.pre_step4.quiz_extension_id='-1';
        dataObj.pre_step4.txt_search = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

		var cid=dataObj.schoolclass_id;
		var user_ary = $('input:checkbox:checked[name="check-user"]').map(function() { return $(this).val(); }).get();
		if (user_ary.length==0) {
			user_ary = $('input:checkbox[name="check-user"]').map(function() { return $(this).val(); }).get();
		}
		var uids = user_ary.join('-');


		var quiz_count=($('input#input-category').val());
		var category_type=$('input:radio:checked[name="radio-category"]').val();
		dataObj.quiz_count=quiz_count;
		dataObj.category_type=category_type;
		dataObj.page_mode='examprogress';

        $.ajax({
            url: '/admin/banwu/create-quiz-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                var pre_id = res.pre_id;
                if (message != 'success') {
                    swal(message);
                    return false;
                }

                location.href = '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id + '&source=similar' + '&cid=' + cid + '&uids=' + uids;
            },
            error: bs.errorHandler
        });
    }

	function studentWrongPractice() {

        if ($('#select-schoolclass').val() == '-1') {
            swal('請選擇班級');
            return false;
        }

        var check_schoolclass_status = $('#select-schoolclass option:selected').attr('status');
        var schoolclass=$('#select-schoolclass').val()


        if (check_schoolclass_status=='0'){
            swal('班級已結業無法練習錯題');
            return false;
        };


        var text_year = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            text_year.push(item.value);
        });
        text_year.sort();
        if (text_year.length==0) {
            swal('請至少選擇一個冊別');
            return false;
        }

        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選要練習的課次/章節');
            return false;
        }
        var checkObj = {};
        checkObj.schoolclass_id = schoolclass;
        $.ajax({
            url: '/admin/banwu/check-student-wrong-paper',
            type: 'POST',
            data: checkObj,
            success: function(res) {
                var message = res.message;

                if (message != 'success') {
                    swal(message);
                    return false;
                }
                var dataObj = {};
                dataObj.knowledge_ary = newObj.knowledge_ary;

                location.href='/admin/exam/wrong?cid='+$('#select-schoolclass').val()+'&sourcekind=nolimit'+'&kids='+dataObj.knowledge_ary.join('-');

            },
            error: bs.errorHandler
        });




    }

    function studentQuizPractice() {

        if ($('#select-schoolclass').val() == '-1') {
            swal('請選擇班級');
            return false;
        }

        var text_year = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            text_year.push(item.value);
        });
        text_year.sort();
        if (text_year.length==0) {
            swal('請至少選擇一個冊別');
            return false;
        }

        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選要練習的課次/章節');
            return false;
        }

        var dataObj = {};
        dataObj.schoolclass_id=$('#select-schoolclass').val();
        dataObj.subject_code = newObj.subject_code;
        dataObj.knowledge_ary = JSON.stringify(newObj.knowledge_ary);
        dataObj.difficulty_ary = [];
        var difficulty_ary = [];
        $.each($('input:checkbox:checked[name="chk-difficulty"]'), function(key, item) {
            difficulty_ary.push(item.value);
        });
        difficulty_ary.sort();
        dataObj.difficulty_ary = difficulty_ary;
        dataObj.quiz_count = parseInt($('input:radio:checked[name="radio-quiz"]').val());

        $.ajax({
            url: '/admin/stuquiz/create-selfexam-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                if (message != 'success' && message != 'already_test') {
                    swal(message);
                    return false;
                }
                var cid = res.cid;
                var pid = res.pid;
                if (message == 'already_test') {
                    var cid = res.cid;
                    $('#check-modal').modal('toggle');
                    $('#btn-retest').on('click', function(e) {
                        location.href = '/admin/exam?cid=' + cid + '&pid=' + pid;
                    });
                } else {
                    location.href = '/admin/exam?cid=' + $('#select-schoolclass').val() + '&pid=' + pid;
                }
            },
            error: bs.errorHandler
        });
    }
})(exam);
