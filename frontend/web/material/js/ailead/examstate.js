$(function() {
	'use strict';
	var newObj = {};
	init();

	function init() {

		getTaskInfo();

		$('.btn-over').on('click', function(e) {
			overExam();
		});

		$('#btn-stuinfo').on('click', function(e) {
			$('#preview-modal').text('更新應試學生');
			$('#stu-section').show();
			$('#base-section').hide();
			$('#online-section').hide();
			$('.preview-modal').modal('toggle');
		});

		$('#btn-baseinfo').on('click', function(e) {
			$('#preview-modal').text('更新基本資料');
			$('#stu-section').hide();
			$('#base-section').show();
			$('#online-section').hide();
			$('.preview-modal').modal('toggle');
		});

		$('#btn-onlineset').on('click', function(e) {
			$('#preview-modal').text('更新線上派卷設定');
			$('#stu-section').hide();
			$('#base-section').hide();
			$('#online-section').show();
			$('.preview-modal').modal('toggle');
		});




		$('#btn-save').on('click', function(e) {
			if ($('#online-section').is(":visible")) {
				var radioEnd = $('input:radio:checked[name="end_at"]').val();
				if (radioEnd == 3) {
					if (!$('#date-etime').val()) {
						swal('請指定結束考試時間');
						return false;
					}

					if ($('#date-etime').val()) {
						if (new Date($('#date-etime').val()).getTime() < new Date().getTime()) {
							swal('指定結束時間已過期，請重新指定');
							return false;
						}

						if (new Date($('#date-etime').val()).getTime() <= new Date($('#start-at').text()).getTime()) {
							swal('指定結束時間早於或等於指定開始時間，請重新指定');
							return false;
						}
					}
				}
			}
			updateTask();
		});

		jQuery('#date-etime').datetimepicker({
			step: 30,
			format: 'Y/m/d H:i'
		});

		$('#date-etime').on('click', function(e) {
			e.preventDefault();
			$('input[name="end_at"][value="3"]').prop('checked', true);
		});

		$('#examsituation').attr('href', 'examsituation?id=' + bs.getUrlVar('id'));
		$('#papersituation').attr('href', 'papersituation?id=' + bs.getUrlVar('id'));
		$('#videosituation').attr('href', 'videosituation?id=' + bs.getUrlVar('id'));
		$('#examinput').attr('href', 'examinput?id=' + bs.getUrlVar('id'));
		$('#examcsv').attr('href', 'examcsv?id=' + bs.getUrlVar('id'));
		$('#examfull').attr('href', 'examfull?id=' + bs.getUrlVar('id'));
		$('#examcondition').attr('href', 'examcondition?id=' + bs.getUrlVar('id'));

		$('#btn-export').on('click', function(e) {
			e.preventDefault();

			newObj.call_times = 0;
			$.blockUI({
				message: '<img class="img-fluid" src="/admin/material/images/quizimg/出卷中.gif" />',
				css: {
					top: '30%',
					left: '50%',
					marginLeft: '-45%',
					width: "90%",
					cursor: '',
					border: 'none',
					background: 'none'
				},
			});
			var myInterval =
				setInterval(
					function() {
						exportQuizpaper(myInterval);
						newObj.call_times++;
						if (newObj.call_times >= 20) {
							clearInterval(myInterval);
							bs.disableSubmits(false);
							swal('檔案尚未產生完成，請稍候再試。');
							return false;
						}
					}, 5000
				);
		});

		$('#delete-quiz-task').on('click',function(e){
			e.preventDefault();
			deleteTask();
		});

		$('#delete-video-task').on('click',function(e){
			e.preventDefault();
			deleteTask();
		});
	}

	function getTaskInfo() {
		$.ajax({
			url: '/admin/banwu/get-task-info?id=' + bs.getUrlVar('id'),
			type: 'GET',
			success: function(res) {
				var info = res.data;
				$('.task-name').text(info.task_name);
				$('#task-status').text(info.status_name);
				$('#label_name').text(info.kind_label_name);
				$('#quizpaper_name_or_video_name').text(info.quizpaper_or_video_name);
				var user_name_html = '';
				$.each(info.users, function(key, item) {
					user_name_html += '<span style="display:inline-block;width:100px">' + item.name + '</span>';
				});
				$('#stuname').html(user_name_html);
				var makeup_user_name_html = '';
				$.each(info.makeup_users, function(key, item) {
					makeup_user_name_html += '<span style="display:inline-block;width:100px">' + item.name + '</span>';
				});
				$('#makeup-stuname').html(makeup_user_name_html);
				$('#stucount').text(info.user_count);
				var task_tags_html = '';
				$.each(info.task_tags, function(key, item) {
					task_tags_html += '<span style="display:inline-block;width:50px">' + item.name + '</span>';
				});
				$('#task-tags').html(task_tags_html);
				$('#created-by').text(info.created_by);
				$('#start-at').text(info.start_at);
				$('#end-at').text(info.end_at);
				$('#makeup-start-at').text(info.makeup_start_at);
				$('#makeup-end-at').text(info.makeup_end_at);
				$('#end-deal').text(info.end_deal);
				$('#exam-times').text(info.exam_times);
				$('#option-randstate').text(info.option_randstate);
				$('#quiz-randstate').text(info.quiz_randstate);
				$('#send-state').text(info.send_state);

				if (info.task_kind_id == 1) {
					$('.task-title').text('測驗狀態');
					$('#online-title').text('線上派卷設定');
					$('#makeup-title').text('補考設定');
					$("#makeup-start-at-title").text('補考開始時間：');
					$("#makeup-end-at-title").text('補考結束時間：');
					$('.manual').remove();
				} else if (info.task_kind_id == 2) {
					$('.task-title').text('測驗狀態');
					$('.online').remove();
					$('#makeup-title').text('補考設定');
					$("#makeup-start-at-title").text('補考開始時間：');
					$("#makeup-end-at-title").text('補考結束時間：');
					$('#created-by-manual').text(info.created_by);
					$('#start-at-manual').text(info.start_at);
				} else if (info.task_kind_id == 3) {
					$('.task-title').text('教學影片');
					$('#online-title').text('派出影片設定');
					$('#makeup-title').text('補看影片設定');
					$("#makeup-start-at-title").text('補看開始時間：');
					$("#makeup-end-at-title").text('補看結束時間：');
					$('.manual').remove();
					$('.online-paper').remove();
					$('#start-at').prev().text('開始時間：');
					$('#end-at').prev().text('結束時間：');
					$('#end-deal').prev().text('結束補看：');
				} else {
					$('.task-title').text('自派影片');
					$('#online-title').text('派出影片設定');
					$('#makeup-title').text('補看影片設定');
					$("#makeup-start-at-title").text('補看開始時間：');
					$("#makeup-end-at-title").text('補看結束時間：');
					$('.manual').remove();
					$('.online-paper').remove();
					$('#start-at').prev().text('開始時間：');
					$('#end-at').prev().text('結束時間：');
					$('#end-deal').prev().text('結束補看：');
				}



				$('#select-user_tags option').remove();
				$.each(info.all_users, function(key, item) {
					$('#select-user_tags').append('<option value="' + item.id + '">' + item.name + '</option>');
				});

				var s2 = $('#select-user_tags').select2({
					theme: "bootstrap",
					language: 'zh-TW'
				});

				var user_ids = [];
				$.each(info.users, function(key, item) {
					user_ids.push(item.id);
				});
				s2.val(user_ids).trigger('change');


				$('#txt-task-name').val(info.task_name);
				$('#select-tasktags option').remove();
				$.each(info.task_tags_all, function(key, item) {
					$('#select-tasktags').append('<option value="' + item.id + '">' + item.name + '</option>');
				});

				var s2_1 = $('#select-tasktags').select2({
					theme: "bootstrap",
					language: 'zh-TW'
				});

				var task_tag_ids = [];
				$.each(info.task_tags, function(key, item) {
					task_tag_ids.push(parseInt(item.id));
				});
				s2_1.val(task_tag_ids).trigger('change');

				if (info.end_at == '手動結束') {
					$('input:radio[name="end_at"][value="1"]').prop('checked', true);
					$('#date-etime').val('');
				} else {
					$('input:radio[name="end_at"][value="3"]').prop('checked', true);
					$('#date-etime').val(info.end_at);
				}

				var taskType = bs.getUrlVar('t');
				taskType = info.taskType;
				$('.' + taskType).attr('style', 'display:inline-block');
				switch (taskType) {
					case 'onlineprocess':
					case 'manualprocess':
						$('#taskstatus').text('進行中');
						break;
					case 'onlinefinish':
					case 'manualfinish':
						$('#taskstatus').text('已結束');
						break;
					default:
						history.back(-1);
						break;
				}

				if (info.schoolclass_status == 0) {
					$('#btn-stuinfo').remove();
					$('#task-user').append('（ 班級已結業，無法修改應試學生資訊 ）');
				}

				if (info.status == 0) {
					$('#btn-stuinfo').remove();
					$('#btn-onlineset').remove();
				}

				if (info.makeup_status == 1) {
					$('#btn-stuinfo').remove();
					$('#btn-onlineset').remove();
				}
				else if (info.makeup_status == 0 && info.status == 1) {
					$('.makeup').remove();
				}

				$('#paperview').attr('href', '/admin/quizpaper/paperview?id=' + info.source_id);
				$('#examreview').attr('href', 'examreview?tid=' + bs.getUrlVar('id') + '&pid=' + info.source_id);
				newObj.source_id = info.source_id;

				var route_str = (info.task_kind_id == 3) ? 'videoview' : 'extraview';

				$('#videoview').attr('href', '/admin/schoolvideo/' + route_str + '?id=' + info.source_id);

				if (info.check_editor==0){
					$('#btn-stuinfo').removeClass('btn-success').addClass('btn-secondary');
					$('#btn-stuinfo').attr('disabled',true);
					$('#btn-baseinfo').removeClass('btn-success').addClass('btn-secondary');
					$('#btn-baseinfo').attr('disabled',true);
					$('#btn-onlineset').removeClass('btn-success').addClass('btn-secondary');
					$('#btn-onlineset').attr('disabled',true);
					$('#delete-quiz-task').hide();
					$('#delete-video-task').hide();
					$('.btn-over').hide();






				}
			},
			error: bs.errorHandler
		});
	}

	function updateTask() {
		var dataObj = {};
		dataObj.task_id = bs.getUrlVar('id');
		dataObj.stu_tags = $('#select-user_tags').val();
		dataObj.task_name = $('#txt-task-name').val();
		dataObj.task_tags = $('#select-tasktags').val();
		dataObj.end_at = 0;
		if ($('input:radio:checked[name="end_at"]').val() == 1) {
			dataObj.end_at = 0;
		} else if ($('input:radio:checked[name="end_at"]').val() == 3) {
			dataObj.end_at = Math.floor(new Date($('#date-etime').val()).getTime() / 1000);
		}
		$.ajax({
			url: '/admin/banwu/update-task',
			type: 'POST',
			data: dataObj,
			success: function(res) {
				if (res.message!='success'){
					alert(res.message);
					return false;
				}else{
					getTaskInfo();
					$('.preview-modal').modal('hide');
				}

			},
			error: bs.errorHandler
		});
	}

	function overExam() {
		$.ajax({
			url: '/admin/banwu/over-exam?id=' + bs.getUrlVar('id'),
			type: 'GET',
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				if (res.message!='success'){
					swal (res.message)
					return false;
				}else{
					bs.disableSubmits(false);
					location.replace('/admin/banwu/examstate?id=' + bs.getUrlVar('id'));
				}

			},
			complete: function() {
				bs.disableSubmits(false);
			},
			error: bs.errorHandler
		});
	}

	function exportQuizpaper(myInterval) {

		var dataObj = {};
		dataObj.pidAry = [];
		var pid = parseInt(newObj.source_id);
		dataObj.pidAry.push(pid);

		$.ajax({
			url: '/admin/quizpaper/export-quizpaper',
			type: 'POST',
			data: dataObj,
			success: function(res) {
				var message = res.message;
				if (message != 'success' && message != 'continue') {
					clearInterval(myInterval);
					bs.disableSubmits(false);
					swal(message);
					return false;
				} else if (message == 'success') {
					clearInterval(myInterval);
					bs.disableSubmits(false);
					setTimeout(function() {
						location.href = res.url;
					}, 500);
				}
			},
			error: bs.errorHandler
		});
	}

	function deleteTask(){
		swal({
			title: '請問您是否確認收回此任務？',
			text: '提醒您，任務收回之後，相關紀錄將會一併刪除',
			type: 'warning',
			showCloseButton: true,
			showCancelButton: true,
			cancelButtonText: '<span>No<br>取消</span>',
			confirmButtonText: '<span>Yes<br>確認</span>'
		}).then(function() {

			var dataObj={};
			dataObj.task_id = bs.getUrlVar('id');
			$.ajax({
				url: '/admin/banwu/delete-task',
				type: 'post',
				data: dataObj,
				beforeSend: function() {
					bs.disableSubmits(true);
				},
				success: function(res) {
					bs.disableSubmits(false);
					if (res.message!='success') {
						swal(res.message);
						return false;
					}
					location.replace('/admin/banwu/tasklist');
				},
				complete: function() {
					bs.disableSubmits(false);
				},
				error: bs.errorHandler
			});

		},function (dismiss) {
			if (dismiss === 'cancel') {
				return false;
			}
		});
	}

});
