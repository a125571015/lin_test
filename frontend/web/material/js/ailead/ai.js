
$(function() {
    'use strict';
	var newObj = {};
    init();

    function init() {
        getSchool();
        getGradeCode();
        getSchoolclass();
		getTermCode();

        $('#select-school').on('change', function(e) {
            e.preventDefault();
            getGradeCode();
            getSchoolclass();
        });

        $('#select-grade').on('change', function(e) {
            e.preventDefault();
            getSchoolclass();
        });

        $('#select-schoolclass').on('change', function(e) {
            e.preventDefault();
            var schoolclass_obj = bs.findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
            if (schoolclass_obj) {
                newObj.subject_code = schoolclass_obj.subject_code;
                getTermCode(schoolclass_obj);
            }
        });

        $('input:checkbox[name="chkYear"]').on('change', function(e) {
            e.preventDefault();
            getRange();
        });

        $('#btn-wrong').on('click', function(e) {
            e.preventDefault();
            createWrongPractice();
        });

        $('#btn-quiz').on('click', function(e) {
            e.preventDefault();
            createQuizPractice();
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
                    if (item.code == 'J3') {
                        $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

            },
            error: bs.errorHandler
        });
    }

    function getSchoolclass() {
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        $.ajax({
            url: '/admin/quizpaper/get-schoolclass',
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

		var grade_level='';
		if (schoolclass_obj) {
			var text_year = schoolclass_obj.text_year;
	        var grade_code = schoolclass_obj.grade_code;
	        var subject_code = schoolclass_obj.subject_code;
			grade_level=bs.getNormalGrade(grade_code);
		}

		grade_level=(grade_level)?grade_level:'J0';

		$.ajax({
		  url: '/admin/school/get-text-year',
		  type: 'POST',
		  success: function (res) {
			  $('.check-year').hide();
	          $('input:checkbox[name="chkYear"]').prop('checked', false);

			  $.each(res,function(key,item){
				  $('#chkY'+(key+1)).siblings().text(item.name);
		          $('#chkY'+(key+1)).val(item.code + '-0' + '-' + grade_level + '-' + '0');
		          $('#chkY'+(key+1)).parent().show();

				  if (key+1==res.length) {
				  	 newObj.current_text_year=item.code;
				  }
			  });
		  },
		  error: bs.errorHandler
		});
    }

    function getRange() {
        var dataObj = {};
        dataObj.school_id = $('#select-school').val();
        dataObj.grade_code = $('#select-grade').val();
        dataObj.schoolclass_id = $('#select-schoolclass').val();
        dataObj.subject_code = newObj.subject_code;
        dataObj.factory_code = '0';
        dataObj.yearTermAry = [];
        var yearTermAry = [];
        $.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;
		dataObj.course_code=['H'];

		dataObj.current_text_year=newObj.current_text_year + '-0' + '-' + bs.getNormalGrade(dataObj.grade_code) + '-' + '0';

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
            url: '/admin/banwu/get-ai',
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
                        inner_html += '<thead class="thead-light">';
                        inner_html += '<tr>';
                        inner_html += '<th><input type="checkbox" name="check-all" value="' + item.id + '"></th>';
                        inner_html += '<th>課次/章節</th>';
                        inner_html += '<th>平均題數</th>';
                        inner_html += '<th>大考題數</th>';
                        inner_html += '<th>低於標準值的學生名單</th>';
                        inner_html += '</tr>';
                        inner_html += '</thead>';
                        return false;
                    }
                });

                $.each(res, function(key, item) {

                    if (item.unit_percent_ary) {
                        var td_html = '';
                        $.each(item.unit_percent_ary, function(key2, item2) {
                            if (item2.right_percent != '--') {
                                if (parseInt($('#txt-standard').val())>item2.right_percent) {
                                    td_html +=  item2.user_name + '(' + item2.right_percent + ') ';
                                }
                            }
                        });
                        inner_html += '<tr>';
                        inner_html += '<td><input type="checkbox" name="check-one" value="' + item.id + '"></td>';
                        inner_html += '<td>' + item.text + '</td>';
                        inner_html += '<td>' + item.ai_quiz_avg + '</td>';
                        inner_html += '<td>' + item.ai_quiz_count + '</td>';
                        inner_html += '<td>' + td_html + '</td>';
                        inner_html += '</tr>';
                    }

                });

                $('#table-progress').empty().html(inner_html);

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
                $('#btn-wrong,#btn-quiz').removeClass('btn-secondary').addClass('btn-orange');
                return false;
            } else {
                $('#btn-wrong,#btn-quiz').removeClass('btn-orange').addClass('btn-secondary');
            }
        });
    }

    function checkCss(right_percent) {
        var css_name = '';
        if (right_percent >= 0 && right_percent <= 20) {
            css_name = 'percent-0-20';
        } else if (right_percent >= 21 && right_percent <= 40) {
            css_name = 'percent-21-40';
        } else if (right_percent >= 41 && right_percent <= 60) {
            css_name = 'percent-41-60';
        } else if (right_percent >= 61 && right_percent <= 80) {
            css_name = 'percent-61-80';
        } else {
            css_name = 'percent-81-100';
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

            // if ($('input:radio:checked[name="radio-know"]').val() == 1) {
            //     if (item.unit_percent_ary && item.state && item.state.selected) {
            //         if (item.knowledge) {
            //             newObj.knowledge_ary = newObj.knowledge_ary.concat(item.knowledge);
            //         }
            //         if (item.sub_knowledge) {
            //             var new_sub_knowledge = [];
            //             $.each(item.sub_knowledge, function(key2, item2) {
            //                 var ids = item2.split('-');
            //                 if (ids.length == 2) {
            //                     new_sub_knowledge.push(ids[0]);
            //                 }
            //             });
            //             newObj.knowledge_ary = newObj.knowledge_ary.concat(new_sub_knowledge);
            //         }
            //     }
            // } else {
            //     if (item.know_percent_ary && item.state && item.state.selected) {
            //         var ids = item.id.split('-');
            //         if (newObj.subject_code == 'C0') {
            //             if (ids.length == 2) {
            //                 newObj.knowledge_ary.push(ids[1]);
            //             }
            //         } else if (newObj.subject_code == 'E0') {
            //             if (ids.length == 2) {
            //                 newObj.knowledge_ary.push(ids[1]);
            //             }
            //             if (ids.length == 3) {
            //                 newObj.knowledge_ary = newObj.knowledge_ary.concat(JSON.parse(ids[2]));
            //             }
            //         } else {
            //             if (ids.length == 3) {
            //                 newObj.knowledge_ary.push(ids[2]);
            //             }
            //         }
            //     }
            // }
        });
    }

    function createWrongPractice() {
        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }
        var dataObj = {};

        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 4;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
        dataObj.pre_step1.factory_code = [];
        dataObj.pre_step1.factory_code.push('0');
        dataObj.pre_step1.course_code = ['H'];
        dataObj.pre_step1.text_year = [];
        var text_year = [];
        text_year.push(newObj.current_text_year);
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
        dataObj.pre_step4.txt_search = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.pre_step5 = {};
        dataObj.pre_step5.quiz_content = [];
        dataObj.pre_step5.per_score = 0;

        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

        $.ajax({
            url: '/admin/banwu/create-wrong-paper',
            type: 'POST',
            data: dataObj,
            success: function(res) {
                var message = res.message;
                var pre_id = res.pre_id;
                if (message != 'success') {
                    swal(message);
                    return false;
                }
                location.href = '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id + '&source=wrong';
            },
            error: bs.errorHandler
        });
    }

    function createQuizPractice() {
        if ($('input:checkbox:checked[name="check-all"]').length == 0 && $('input:checkbox:checked[name="check-one"]').length == 0) {
            swal('請勾選下方知識內容');
            return false;
        }
        var dataObj = {};
        dataObj.source = 'similar';
        dataObj.pre_subject = bs.getNormalGrade($('#select-grade').val()) + '-' + newObj.subject_code;
        dataObj.pre_current_index = 3;

        dataObj.pre_step1 = {};
        dataObj.pre_step1.grade_code = $('#select-grade').val();
        dataObj.pre_step1.factory_code = [];
        dataObj.pre_step1.factory_code.push('0');
        dataObj.pre_step1.course_code = ['H'];
        dataObj.pre_step1.text_year = [];
        var text_year = [];
        text_year.push(newObj.current_text_year);
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
        dataObj.pre_step4.txt_search = '';
        dataObj.pre_step4.quiz_ids = [];

        dataObj.knowledge_ary = newObj.knowledge_ary;
        dataObj.schoolclass_id = $('#select-schoolclass').val();

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
                location.href = '/admin/quizpaper/manualcreate?subject=' + dataObj.pre_subject + '&pre=' + pre_id + '&source=similar';
            },
            error: bs.errorHandler
        });
    }
});
