$(function() {
	"use strict";
	var newObj = {};
	newObj.temp_quiz_ids = [];
	newObj.fixed_quiz_ids = [];
	newObj.quiz_content = [];
	newObj.qtype_sort_ary = [];
	init(preloadStep);

	function init(callback) {

		if (bs.getUrlVar('subject').split('-')[0] == 'EP') {
			$('#btn-sendpaper-manual').remove();
		}

		if (bs.getUrlVar('subject').split('-')[0] == 'EP' && bs.getUrlVar('type') == 'print') {
			location.href = location.href.replace('&type=print', '');
		}

		if (bs.getUrlVar('type') !== 'print') {
			$('.offline').remove();
		}

		if (bs.getUrlVar('pre') && bs.getUrlVar('source') == 'wrong') {
			$('#btn-wrong-down').show();
		}

		if (bs.getUrlVar('pre')) {
			newObj.fixed_quiz_ids = [-1];
		}

		window.document.body.onbeforeunload = function() {
			return false;
		}

		//發問改用編輯器
		$('#quiz-ask-content').summernote({
			height: 250,
			width: 350,
			tooltip: false,
			toolbar: [
				['insert', [ 'picture']],
			],
		});

		try {
			$('#quiz-ask-content').summernote('code', summernoteContent);
		}
		catch (e) {
		}
		$('.note-group-image-url').attr('style','display:none');
		getRecentYear();
		// 正式站與測試站校正更動 用域名去判斷
		var check_location=location.host;
		if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){



			//先照原本配置這是改好的
			// if (bs.getUrlVar('subject').split('-')[0] == 'E0' ){
			//     $('#gradeE1').parent().remove();
			//     $('#gradeE2').parent().remove();
			//     $('#chkY1').siblings().text('小三上');
			//     $('#chkY2').siblings().text('小三下');
			// }

			if (bs.getUrlVar('subject').split('-')[0] == 'E0' && bs.getUrlVar('subject').split('-')[1]=='C0'){
				$('#gradeE1').parent().remove();
				$('#gradeE2').parent().remove();
				$('#gradeE3').parent().remove();
				$('#gradeE4').parent().remove();
				$('#chkY1').siblings().text('小五上');
				$('#chkY2').siblings().text('小五下');
			}

			if (bs.getUrlVar('subject').split('-')[0] == 'E0' && (bs.getUrlVar('subject').split('-')[1]=='N0' || bs.getUrlVar('subject').split('-')[1]=='S0' || bs.getUrlVar('subject').split('-')[1]=='M0')){
				$('#gradeE1').parent().remove();
				$('#gradeE2').parent().remove();
				$('#chkY1').siblings().text('小三上');
				$('#chkY2').siblings().text('小三下');
			}
		}
		else{
			if (bs.getUrlVar('subject').split('-')[0] == 'E0' && bs.getUrlVar('subject').split('-')[1]=='C0'){
				$('#gradeE1').parent().remove();
				$('#gradeE2').parent().remove();
				$('#gradeE3').parent().remove();
				$('#gradeE4').parent().remove();
				$('#chkY1').siblings().text('小五上');
				$('#chkY2').siblings().text('小五下');
			}

			if (bs.getUrlVar('subject').split('-')[0] == 'E0' && (bs.getUrlVar('subject').split('-')[1]=='N0' || bs.getUrlVar('subject').split('-')[1]=='S0' || bs.getUrlVar('subject').split('-')[1]=='M0')){
				$('#gradeE1').parent().remove();
				$('#gradeE2').parent().remove();
				$('#chkY1').siblings().text('小三上');
				$('#chkY2').siblings().text('小三下');
			}
		}

		getGradeCode();
		getFactoryCode(bs.getUrlVar('subject').split('-')[0], bs.getUrlVar('subject').split('-')[1]);
		getAuthor();
		getQuizpaperCategory();
		getQuizpaperTag();
		getDifficult();
		// getQuizextension();
		initObj();
		$('#difficulty-sort').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});

		$(".leave-btn").on('click', function(e) {
			e.preventDefault();
			//檢查是否為學習歷程的另開分頁跳頁
			var check_another_page=bs.getUrlVar('another');
			if (check_another_page){
				location.href='/admin/banwu/examprogress';
			}else{
				history.back();
			}


		});

		$(".cancel-btn").on('click', function(e) {
			e.preventDefault();
			window.document.body.onbeforeunload = function() {}
			createPrepaper();
		});

		$(".prev-btn").on("click", function(e) {
			e.preventDefault();
			$('#manual-wizard').steps("previous");
			$('.steps ul').find('.done').addClass('disabled');
		});

		$(".next-btn").on("click", function(e) {
			e.preventDefault();
			$('#manual-wizard').steps('next');
			$('.steps ul').find('.done').addClass('disabled');
		});

		$(".count-view-btn").on("click", function(e) {
			e.preventDefault();
			getCountrange();


		});

		$('.sort-btn').on('click', function(e) {
			e.preventDefault();

			bs.disableSubmits(true);

			$('.dd-list').html($('.dd-list .dd-item').sort(function(a, b) {
				var contentA = parseFloat($(a).find('.qnum2').val());
				var contentB = parseFloat($(b).find('.qnum2').val());
				return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
			}));

			$.each($('.qnum2'), function(key, item) {
				$(item).val(parseInt(key) + 1);
			});

			$.each($('.qnum'), function(key, item) {
				$(item).html(parseInt(key) + 1);
			});

			nestableChange();

			nestableAsk();

			nestableDelete();

			setTimeout(function() {
				bs.disableSubmits(false);
			}, 500);

		})

		$('.qtype_difficulty_modal').on('click', function(e) {
			var dataObj = {};
			dataObj.quiz_ids = newObj.temp_quiz_ids;
			$.ajax({
				url: '/admin/quizpaper/get-selected-quiz-qtype',
				type: 'POST',
				data: JSON.stringify(dataObj),
				contentType: 'application/json',
				success: function(res) {
					var data = res.data;
					if (!data || data.length == 0) {
						$('#qtype-difficulty-sort').empty();
						return false;
					}

					$('#modal-qtype-difficulty-sort').modal('show');

					var qtype_sort_html = '';
					qtype_sort_html += '<div class="mb-2">\
										<div class="row">\
											<div class="col-9">\
												<span class="font-weight-bold">題型</span>\
											</div>\
											<div class="col-3">\
												<span class="font-weight-bold">順序</span>\
											</div>\
										</div>\
									</div>';
					$.each(data, function(key, item) {
						qtype_sort_html += '<div class="qtype_list mb-2">\
											<div class="row">\
												<div class="col-9">\
													<span qtype_id="' + item.quiz_qtype_id + '">' + item.quiz_qtype + '</span>\
												</div>\
												<div class="col-3">\
													<span><input type="number" value="" min="1" class="qtype_sort dd-nodrag" style="width: 100%"></span>\
												</div>\
											</div>\
										</div>';
					});
					$('#qtype-difficulty-sort').empty().append(qtype_sort_html);

					if(newObj.qtype_sort_ary.length != 0){
						$('.qtype_list').each(function(key, value){
							$(this).find('.qtype_sort').val(newObj.qtype_sort_ary[key]);
						});
					}

				},
				error: bs.errorHandler
			});
		});

		$('.qtype-difficulty-sort-btn').on('click', function(e) {
			e.preventDefault();

			bs.disableSubmits(true);

			var qtype_sort_ary = [];
			var diffuculty_order = 0;
			var check_ary = [];
			var check_value = 1;
			newObj.qtype_sort_ary = [];

			//抓出順序&檢查
			$('.qtype_list').each(function(){
				newObj.qtype_sort_ary.push($(this).find('.qtype_sort').val());
				check_ary.push($(this).find('.qtype_sort').val());
				if($(this).find('.qtype_sort').val() == '' || !$(this).find('.qtype_sort').val().match(/^[1-9]\d*$/)){
					check_value = 0;
				}

				let qtype_list = {};
				qtype_list.qtype_id = $(this).find('span').attr('qtype_id');
				qtype_list.qtype_sort = $(this).find('.qtype_sort').val()*100;
				qtype_sort_ary.push(qtype_list);
			});

			let check = check_ary.sort();
			for(var i=0;i<check.length;i++){
				if (check[i]==check[i+1]){
					check_value = 0;
				}
			}

			if(check_value == 0){
				alert('順序請輸入不重複的正整數');
				bs.disableSubmits(false);
				return false;
			}

			if($('#difficulty-sort').val() == '0'){
				diffuculty_order = 1;
			}else if($('#difficulty-sort').val() == '1'){
				diffuculty_order = -1;
			}

			//寫入順序
			$.each(qtype_sort_ary, function(key, item){
				$('.dd-handle').each(function(){
					let sort_num = 0;
					if($(this).find('.qtype').attr('qtype_id') == item.qtype_id){
						sort_num = item.qtype_sort + ($(this).find('.difficulty').attr('difficulty') * diffuculty_order);
						$(this).find('.qtype').attr('qtype_sort', sort_num);
					}
				});
			});

			//執行排序
			$('.dd-list').html($('.dd-list .dd-item').sort(function(a, b) {
				var contentA = parseFloat($(a).find('.qtype').attr('qtype_sort'));
				var contentB = parseFloat($(b).find('.qtype').attr('qtype_sort'));
				return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
			}));

			$.each($('.qnum2'), function(key, item) {
				$(item).val(parseInt(key) + 1);
			});

			$.each($('.qnum'), function(key, item) {
				$(item).html(parseInt(key) + 1);
			});

			nestableChange();

			nestableAsk();

			nestableDelete();

			setTimeout(function() {
				$('#modal-qtype-difficulty-sort').modal('hide');
				bs.disableSubmits(false);
			}, 500);

		});

		$("#show-selected-quiz").on("click", function(e) {
			e.preventDefault();
			$("#selected-quiz").toggle();
			if($(this).text() == '隱藏'){
				$(this).text('題型分配');
			}else{
				$(this).text('隱藏');
			}
		});

		$(".finish-btn").on("click", function(e) {
			e.preventDefault();
			$('#manual-wizard').steps('finish');
		});

		$('input:radio[name="radioGrade"]').on('change', function(e) {
			$('#select-grade2').val($(this).val()).trigger('change');
			var grade_id = $(this).attr('id');
			showChkYear(grade_id);
		});

		$('input:radio[name="radio-exam"]').on('change', function(e) {
			$('#jstree_div').jstree().open_all();
			var examVal = $('input:radio:checked[name="radio-exam"]').val();

			// $.each($('li.jstree-node.jstree-leaf'), function(key, item) {
			//     $('#jstree_div').jstree('deselect_node', $(this).attr('id'));
			// });
			$('#jstree_div').jstree("deselect_all");

			$.each($('li.jstree-node.jstree-leaf.' + examVal), function(key, item) {
				$('#jstree_div').jstree('select_node', $(this).attr('id'));
			});
		});

		$('#txt-notes').attr('placeholder', '老師針對本次出題的重點、題型、題目內容註明\n範例：\n應用題較多\n難題減少');

		$('[name="chk-public"]').bootstrapSwitch();

		$('input:radio[name="radioSource"]').on('change', function(e) {
			var grade_id = $('input:radio[name="radioGrade"]:checked').attr('id');
			showChkYear(grade_id);
		});

		$('#btn-ask-confirm').on('click', function(e) {
			e.preventDefault();

			if (!newObj.qid) {
				swal('請選擇要發問的題目');
				return false;
			}

			if ($('#quiz-ask-content').summernote('isEmpty')){
				swal('請輸入要發問的內容');
				return false;
			}

			// if (!$('#quiz-ask-content').val()) {
			// 	swal('請輸入要發問的內容');
			// 	return false;
			// }

			swal({
				title: '確認送出您的發問嗎？',
				type: 'warning',
				showCloseButton: true,
				showCancelButton: true,
				cancelButtonText: '<span>No<br>取消</span>',
				confirmButtonText: '<span>Yes<br>確認</span>'
			}).then(function() {
				$('#ask-modal').modal('hide');
				var dataObj = {};
				dataObj.tid = bs.getUrlVar('tid');
				dataObj.rid = bs.getUrlVar('rid');
				dataObj.qid = newObj.qid;
				dataObj.ask_content=$('#quiz-ask-content').summernote('code');
				//dataObj.ask_content = $('#quiz-ask-content').val();
				dataObj.kind=1;
				//錯誤回報是1
				bs.sendQuizAskContent(dataObj);
				$('#quiz-ask-content').summernote('reset');
			}, function(dismiss) {
				if (dismiss === 'cancel') {
					return false;
				}
			});
		});

		callback();
	}

	function initObj() {

		newObj.step = $("#manual-wizard").steps({
			headerTag: "h6",
			bodyTag: "section",
			transitionEffect: "fade",
			titleTemplate: '<span class="step">#index#</span> #title#',
			enablePagination: false,
			onStepChanging: function(event, currentIndex, newIndex) {

				if (currentIndex == 0) {
					if ($('input:radio:checked[name="radioGrade"]').length == 0) {
						swal('請選擇學生目前就讀年級');
						return false;
					}

					if ($('input:radio:checked[name="radioSource"]').length == 0) {
						swal('請選擇來源');
						return false;
					}

					if ($('input:radio:checked[name="radioFactory"]').length == 0) {
						swal('請選擇版本');
						return false;
					}

					if ($('input:checkbox:checked[name="chkYear"]').length == 0) {
						swal('請至少選擇一個冊次');
						return false;
					}
				}

				if (currentIndex == 1 && newIndex >= 2) {

					if ($("#jstree_div").jstree("get_checked").length == 0) {
						swal('請至少選擇一個課程進度');
						return false;
					}
				}

				if (currentIndex == 3 && newIndex == 2) {

					swal({
						title: '您的試題將重新設定。是否要回到上一步？',
						type: 'warning',
						showCloseButton: true,
						showCancelButton: true,
						cancelButtonText: '<span>No<br>我還要再想想</span>',
						confirmButtonText: '<span>Yes<br>確認</span>'
					}).then(function() {
						newObj.repeat_papers = [];
						newObj.temp_quiz_ids = [];
						newObj.fixed_quiz_ids = [];
						newObj.tblist2.column(0).checkboxes.deselectAll();
						newObj.quiz_content = [];
						return true;
					}, function(dismiss) {
						if (dismiss === 'cancel') {
							$('#manual-wizard').steps('next');
							return false;
						}
					});
				}

				if (currentIndex == 4 && newIndex == 3) {

					newObj.fixed_quiz_ids = [];

					swal({
						title: '您的試題配分與排序將重新設定。是否要回到上一步？',
						type: 'warning',
						showCloseButton: true,
						showCancelButton: true,
						cancelButtonText: '<span>No<br>我還要再想想</span>',
						confirmButtonText: '<span>Yes<br>確認</span>'
					}).then(function() {
						newObj.quiz_content = [];
						return true;
					}, function(dismiss) {
						if (dismiss === 'cancel') {
							$('#manual-wizard').steps('next');
							return false;
						}
					});
				}

				if (currentIndex == 3 && newIndex >= 4) {
					if (newObj.tblist2.column(0).checkboxes.selected().length == 0) {
						swal('請選擇題目');
						return false;
					}
				}

				if (currentIndex == 4 && newIndex >= 5) {

					var lose_score_state = 0;
					$.each($('.score'), function(key, item) {
						if (parseInt($(item).text()) == 0) {
							lose_score_state = 1;
						}
					});

					if (lose_score_state == 1) {
						swal('請決定配分');
						return false;
					}

					if (parseInt($('#score_all').text()) != 100) {
						swal({
							title: '目前考卷總分不是100分，請確認是否繼續出卷？',
							type: 'warning',
							showCloseButton: true,
							showCancelButton: true,
							cancelButtonText: '<span>No<br>我還要再想想</span>',
							confirmButtonText: '<span>Yes<br>確認</span>'
						}).then(function() {}, function(dismiss) {
							if (dismiss === 'cancel') {
								$('#manual-wizard').steps('previous');
								return false;
							}
						});
					}
				}

				if (currentIndex == 5 && newIndex >= 6) {
					if ($('#select-grade2').val() === '-1') {
						swal('請選擇年級');
						return false;
					}

					if ($('#select-category2').val() === '-1') {
						swal('請選擇考試類別');
						return false;
					}

					if (!$('#txt-name').val()) {
						swal('請輸入考卷名稱');
						return false;
					}
				}

				return true;
			},
			onStepChanged: function(event, currentIndex, priorIndex) {

				$('#selected-quiz').hide();
				$('#show-selected-quiz').hide();

				if (currentIndex == 0) {
					$(".leave-btn").show();
					$('.cancel-btn').show();
					$('.prev-btn').hide();
					$('.next-btn').show();
					$('.finish-btn').hide();
					$('.count-view-btn').hide();
				}

				if (priorIndex == 0 && currentIndex == 1) {
					getRange();
				}

				if (currentIndex >= 1) {
					if (bs.getUrlVar('source') && bs.getUrlVar('pre')) {
						$(".leave-btn").show();
					} else {
						$(".leave-btn").hide();
					}
					$('.cancel-btn').show();
					$('.prev-btn').show();
					$('.next-btn').show();
					$('.finish-btn').hide();
					$('.count-view-btn').show();
				}

				if (currentIndex == 3) {
					bs.disableSubmits(true);
					getQuizCategory();
					getQuizextension()
					newObj.tblist2.clear().draw();
					$('#selected-quiz').show();
					$('.count-view-btn').hide();
					$('#show-selected-quiz').text('隱藏').show();
				}

				if (priorIndex == 3 && currentIndex == 4) {
					getQuizSet();
					$('#selected-quiz').show();
					$('.count-view-btn').hide();
					$('#show-selected-quiz').text('隱藏').show();
				}

				if (priorIndex == 5 && currentIndex == 4) {
					$('#selected-quiz').show();
					$('#show-selected-quiz').text('隱藏').show();
					$('.count-view-btn').hide();
				}

				if (bs.getUrlVar('type') === 'print') {
					if (currentIndex == 6) {
						$('.cancel-btn').hide();
						$('.prev-btn').show();
						$('.next-btn').hide();
						$('.finish-btn').show();
						$('.count-view-btn').hide();
						var date_obj = bs.getFullDate();
						$('#txt-filename').val($('#txt-name').val() + '-' + date_obj.year + date_obj.month + date_obj.date);
					}
				} else {
					if (currentIndex == 5) {
						$('.prev-btn').show();
						$('.next-btn').hide();
						$('.finish-btn').show();
						$('.count-view-btn').hide();
					}
				}
			},
			onFinishing: function(event, currentIndex) {

				if (bs.getUrlVar('type') !== 'print') {
					if ($('#select-grade2').val() === '-1') {
						swal('請選擇年級');
						return false;
					}

					if ($('#select-category2').val() === '-1') {
						swal('請選擇考試類別');
						return false;
					}

					if (!$('#txt-name').val()) {
						swal('請輸入考卷名稱');
						return false;
					}
				} else {
					if ($('input:checkbox:checked[name="paper_content"]').length == 0) {
						swal('請至少選擇一種試卷內容');
						return false;
					}

					if (!$('#txt-filename').val()) {
						swal('請輸入檔案名稱');
						return false;
					}
				}

				return true;
			},
			onFinished: function(event, currentIndex) {
				createQuizpaper();
			}
		});

		newObj.tblist = $('#tbList').DataTable({
			'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
			'sPaginationType': 'full_numbers',
			'aLengthMenu': [
				[10],
				['10']
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
			'ajax': {
				'url': '/admin/quizpaper/quizpaper-list',
				'type': 'POST',
				'data': function(data) {
					data.grade_code = $('#select-grade').val();
					data.subject_code = bs.getUrlVar('subject').split('-')[1];
					data.created_by = $('#select-author').val();
					data.quizpaper_category_id = $('#select-category').val();
					data.quizpaper_tag_ids = $('#select-tags').val();
					data.name = $('#txt-search').val();
				}
			},
			'initComplete': function() {

				$('#tbList tbody').on('click', 'tr', function(e) {
					// 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
					if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className == ' dt-checkboxes-cell') {
						return;
					}
					// 連結
					var data = newObj.tblist.row(this).data();
					// self.location.href = 'view/' + data[0];

				});

				$('#select-grade').on('change', function(e) {
					e.preventDefault();
					newObj.tblist.draw();
				});

				$('#select-author').on('change', function(e) {
					e.preventDefault();
					newObj.tblist.draw();
				});

				$('#select-category').on('change', function(e) {
					e.preventDefault();
					newObj.tblist.draw();
				});

				$('#select-tags').on('change', function(e) {
					e.preventDefault();
					newObj.tblist.draw();
				});

				$('#txt-search').on('keypress', function(e) {
					if (e.which == 13) {
						newObj.tblist.draw();
						$('#txt-search').blur();
					}
				});

				$('#btn-search').on('click', function(e) {
					e.preventDefault();
					newObj.tblist.draw();
				});
			},
			'drawCallback': function() {
				var i = 0;
				newObj.tblist.rows().every(function() {
					var item = this.data();
					var tags = item[7];
					var newTags = '';
					if (tags) {
						var tagAry = tags.split(';');
						$.each(tagAry, function(key, item) {
							newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
						});
					}
					item[7] = newTags;
					item[1] = item[1].split(' ').slice(0, 1).join(' ');
					//invalidate the data DataTables has cached for this row

					if (newObj.repeat_papers) {
						if (newObj.repeat_papers.indexOf(item[0]) > -1) {
							newObj.tblist.row().cell(':eq(' + i + ')', null, {
								page: 'current'
							}).checkboxes.select();
						}
						i += 11;
					}

					this.invalidate();
				});
			},
			'columnDefs': [{
				'targets': 0,
				'checkboxes': {
					'selectRow': true
				}
			}, {
				'targets': [0, 9, 10], // column or columns numbers
				'orderable': false, // set orderable for selected columns
			}],
			'select': {
				'style': 'multi'
			}
		});

		newObj.tblist2 = $('#tbList2').DataTable({
			'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
			'sPaginationType': 'full_numbers',
			'aLengthMenu': [
				[10],
				['10']
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
					data.quiz_difficulty_id = $('#select-difficulty').val();
					data.type = bs.getUrlVar('type');
					data.quiz_category_id = ($('#select-quizcategory').val()) ? $('#select-quizcategory').val().split('_')[0] : -1;
					data.quiz_qtype_id = ($('#select-quizcategory').val()) ? $('#select-quizcategory').val().split('_')[1] : -1;
					data.quiz_extension_id=$('#select-quizextension').val();
					data.qa_text = $('#txt-search-quiz').val();
					data.grade_code = bs.getUrlVar('subject').split('-')[0];
					data.subject_code = bs.getUrlVar('subject').split('-')[1];
					data.knowledges_jstree = [];
					if ($('#jstree_div').jstree(true)) {
						data.knowledges_jstree = $("#jstree_div").jstree("get_checked");
					}
					data.repeat_papers = [];
					var repeat_papers = [];
					var rows_selected = newObj.tblist.column(0).checkboxes.selected();
					$.each(rows_selected, function(key, item) {
						repeat_papers.push(item);
					});
					repeat_papers.sort();
					data.repeat_papers = repeat_papers;
					data_source=bs.getUrlVar('source');
					data.source=data_source;
					var pre_id='';
					pre_id=bs.getUrlVar('pre');
					data.pre_id=pre_id;


					if (newObj.fixed_quiz_ids.length > 0) {

						if (data_source!='recoverwrongpaper'){
							//如果不是校正回歸才加入fixed_quiz_ids,校正回歸不需要這個避免無法挑選錯題
							data.quiz_id_ary = newObj.fixed_quiz_ids;
						}

					}
					var quiz_source_type = [];
					$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
						quiz_source_type.push($(item).attr('quiz-source-type'));
					});
					quiz_source_type.sort();
					data.quiz_source_type = quiz_source_type;
					var data_source='';





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

				//選擇難易度
				$('#select-difficulty').on('change', function(e) {
					e.preventDefault();
					newObj.tblist2.draw();
				});

				// 選擇題型種類
				$('#select-quizcategory').on('change', function(e) {
					e.preventDefault();
					newObj.tblist2.draw();
				});

				// 選擇附檔案種類
				$('#select-quizextension').on('change', function(e) {
					e.preventDefault();
					newObj.tblist2.draw();
				});

				// 題目搜尋enter
				$('#txt-search-quiz').on('keypress', function(e) {
					if (e.which == 13) {
						newObj.tblist2.draw();
					}
				});

				// 題目搜尋按鈕
				$('#btn-search-quiz').on('click', function(e) {
					e.preventDefault();
					newObj.tblist2.draw();
				});

			},
			'drawCallback': function() {

				//跳至第Ｘ頁程式碼
				var _this = $(this);
				var tableId = _this.attr('id');
				var pageDiv = $('#' + tableId + '_paginate');
				var add_html='';
				add_html='<input id="' + tableId + '_gotoPage" type="text" placeholder="跳至頁面[請輸入頁碼] " style="height:36px;line-height:28px;width:20%; margin:0px 0px 0px 0px"/>' +
					'<button class="paginate_button btn btn-outline-success "    type="button"  id="' + tableId + '_goto"><i class="fa fa-arrow-right" aria-hidden="true"></i></button><ul class="pagination">';
				pageDiv.append(add_html);
				$('#' + tableId + '_goto').click(function (obj) {
					var page = $('#' + tableId + '_gotoPage').val();
					var thisDataTable = $('#' + tableId).DataTable();
					var pageInfo = thisDataTable.page.info();
					if (isNaN(page)) {
						$('#' + tableId + '_gotoPage').val('');
						return;
					} else {
						var maxPage = pageInfo.pages;
						var page = Number(page) - 1;
						if (page < 0) {
							page = 0;
						} else if (page >= maxPage) {
							page = maxPage - 1;
						}
						$('#' + tableId + '_gotoPage').val(page + 1);
						thisDataTable.page(page).draw('page');
					}
				});

				$('#tbList2').find('.dt-checkboxes-cell').off('change').on('change', function(e) {
					e.preventDefault();
					if ($(this).find('.dt-checkboxes').prop('checked')) {
						var index = newObj.temp_quiz_ids.indexOf(newObj.tblist2.row(this).data()[0]);
						if (index==-1) {
							newObj.temp_quiz_ids.push(newObj.tblist2.row(this).data()[0]);
						}
					} else {
						var index = newObj.temp_quiz_ids.indexOf(newObj.tblist2.row(this).data()[0]);
						if (index > -1) {
							newObj.temp_quiz_ids.splice(index, 1);
						}
					}
					getSelectedQuiz(newObj.temp_quiz_ids);
				});

				$('#tbList2').find('.dt-checkboxes-select-all').off('change').on('change', function(e) {
					e.preventDefault();
					if ($(this).find('input:checkbox').prop('checked')) {
						$.each(newObj.tblist2.rows().data(), function(key, item) {
							var index = newObj.temp_quiz_ids.indexOf(item[0]);
							if (index==-1) {
								newObj.temp_quiz_ids.push(item[0]);
							}
						});
					} else {
						$.each(newObj.tblist2.rows().data(), function(key, item) {
							var index = newObj.temp_quiz_ids.indexOf(item[0]);
							if (index > -1) {
								newObj.temp_quiz_ids.splice(index, 1);
							}
						});
					}
					getSelectedQuiz(newObj.temp_quiz_ids);
				});

				var i = 0;
				newObj.tblist2.rows().every(function() {
					var item = this.data();
					var q_text = item[1];
					item[1] = '<i class="fa fa-search quizPreview" data-id="' + item[0] + '" style="cursor:pointer"></i> ' + q_text;

					if (newObj.temp_quiz_ids) {

						if (newObj.temp_quiz_ids.indexOf(item[0]) > -1) {
							newObj.tblist2.row().cell(':eq(' + i + ')', null, {
								page: 'current'
							}).checkboxes.select();
						}
						else {
							newObj.tblist2.row().cell(':eq(' + i + ')', null, {
								page: 'current'
							}).checkboxes.deselect();
						}
						i += 2;
					}

					this.invalidate();
				});

				if (newObj.source == 'similar') {
					newObj.fixed_quiz_ids = [];
				}

				getSelectedQuiz(newObj.temp_quiz_ids);

				$('.quizPreview').on('click', function(key, item) {
					getQuizContent(0, $(this).attr('data-id'));
				});

				bs.disableSubmits(false);

			},
			'columnDefs': [{
				'targets': 0,
				'checkboxes': {
					'selectRow': true
				}
			}, {
				'targets': [0, 1], // column or columns numbers
				'orderable': false // set orderable for selected columns
			}],
			'select': {
				'style': 'multi'
			},
		});
	}

	function getGradeCode() {

		$.ajax({
			url: '/admin/quizpaper/get-grade-code',
			type: 'post',
			success: function(res) {
				// step3
				$('#select-grade option').remove();
				$('#select-grade').append('<option value="-1">選擇年級</option>');
				$.each(res, function(key, item) {
					$('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
				});
				$('#select-grade').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});

				// step4
				$('#select-grade2 option').remove();
				$('#select-grade2').append('<option value="-1">請選擇年級</option>');

				switch (bs.getUrlVar('subject').split('-')[0]) {
					case 'E0':
						$('#select-grade2').append('<option value="E1">國小一年級</option>');
						$('#select-grade2').append('<option value="E2">國小二年級</option>');
						$('#select-grade2').append('<option value="E3">國小三年級</option>');
						$('#select-grade2').append('<option value="E4">國小四年級</option>');
						$('#select-grade2').append('<option value="E5">國小五年級</option>');
						$('#select-grade2').append('<option value="E6">國小六年級</option>');
						$('#radioS3').parent().hide();
						break;
					case 'EP':
						//升私中更動
						$('#select-grade2').append('<option value="EP">主題課程</option>');
						$('#select-grade2').val('EP');
						$('#radioS3').parent().hide();
						break;
					case 'J0':
						$('#select-grade2').append('<option value="J1">國中一年級</option>');
						$('#select-grade2').append('<option value="J2">國中二年級</option>');
						$('#select-grade2').append('<option value="J3">國中三年級</option>');
						break;
					case 'H0':
						$('#select-grade2').append('<option value="H1">高中一年級</option>');
						$('#select-grade2').append('<option value="H2">高中二年級</option>');
						$('#select-grade2').append('<option value="H3">高中三年級</option>');
						$('#radioS3').parent().hide();
						break;
					default:
						$('#select-grade2').append('<option value="J1">國中一年級</option>');
						$('#select-grade2').append('<option value="J2">國中二年級</option>');
						$('#select-grade2').append('<option value="J3">國中三年級</option>');
						break;
				}

				$('#select-grade2').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
			},
			error: bs.errorHandler
		});
	}

	function getFactoryCode(grade_code, subject_code) {
		var dataObj = {
			'grade_code': grade_code,
			'subject_code': subject_code
		};
		$.ajax({
			url: '/admin/quizpaper/get-factory-code',
			type: 'post',
			data: dataObj,
			async:false,
			success: function(res) {
				$('#chk-factory').empty();
				$.each(res, function(key, item) {
					$('#chk-factory').append(
						'<div class="form-check form-check-inline">\
                      <input class="form-check-input" type="radio" name="radioFactory" id="radioF' + item.code + '" value="' + item.code + '">\
                      <label class="form-check-label" for="radioF' + item.code + '">' + item.name + '</label>\
                    </div>');
				});
				if (grade_code == 'EP') {
					$('#gradeEP').prop('checked', true);
					$('#radioF0').prop('checked', true);
					//取消必選
					if (subject_code!='E21'){
						$('#chkY1').prop('checked', true);
					}
				}
			},
			error: bs.errorHandler
		});
	}

	function getAuthor() {
		$.ajax({
			url: '/admin/quizpaper/get-author',
			type: 'post',
			success: function(res) {
				$('#select-author option').remove();
				$('#select-author').append('<option value="-1">選擇出卷者</option>');
				$.each(res, function(key, item) {
					$('#select-author').append('<option value="' + item.id + '">' + item.first_name + '</option>');
				});
				$('#select-author').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
			},
			error: bs.errorHandler
		});
	}

	function getQuizpaperCategory() {
		$.ajax({
			url: '/admin/quizpaper/get-quizpaper-category',
			type: 'post',
			success: function(res) {
				// step3
				$('#select-category option').remove();
				$('#select-category').append('<option value="-1">選擇考試類別</option>');
				$.each(res, function(key, item) {
					$('#select-category').append('<option value="' + item.id + '">' + item.name + '</option>');
				});
				$('#select-category').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
				// step4
				$('#select-category2 option').remove();
				$('#select-category2').append('<option value="-1">請選擇考試類別</option>');
				$.each(res, function(key, item) {
					$('#select-category2').append('<option value="' + item.id + '">' + item.name + '</option>');
				});
				$('#select-category2').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});

				if (bs.getUrlVar('pre') && bs.getUrlVar('source') == 'wrong') {
					$('#select-category2').val(13).trigger('change');
				}

				if (bs.getUrlVar('pre') && bs.getUrlVar('source') == 'similar') {
					$('#select-category2').val(14).trigger('change');
				}
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
				$('#select-tags option').remove();
				$.each(res, function(key, item) {
					$('#select-tags').append('<option value="' + item.id + '">' + item.name + '</option>');
				});
				$('#select-tags').select2({
					theme: "bootstrap",
					placeholder: {
						id: '-1',
						text: '選擇考試標籤'
					},
					tags: true,
					language: 'zh-TW'
				});
				// step6
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
			},
			error: bs.errorHandler
		});
	}

	function getDifficult() {
		$.ajax({
			url: '/admin/quizpaper/getdifficult',
			type: 'post',
			success: function(res) {
				$('#select-difficulty option').remove();
				$('#select-difficulty').append('<option value="-1">選擇難易度</option>');
				$.each(res, function(key, item) {
					$('#select-difficulty').append('<option value="' + item.id + '">' + item.name + '</option>');
				});

				$('#select-difficulty').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
			}
		});
	}

	function getQuizextension() {
		var dataObj = {};
		dataObj.type = 'manualcreate';
		$.ajax({
			url: '/admin/quizpaper/getquizextension',
			type: 'post',
			data: dataObj,
			success: function(res) {
				$('#select-quizextension option').remove();
				$('#select-quizextension').append('<option value="-1">選擇附檔題型</option>');
				$.each(res, function(key, item) {
					$('#select-quizextension').append('<option value="' + item.id + '">' + item.name + '</option>');
				});

				$('#select-quizextension').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
			}
		});
	}



	function getQuizCategory() {
		var dataObj = {};
		dataObj.type = bs.getUrlVar('type');
		dataObj.grade_code = bs.getUrlVar('subject').split('-')[0];
		dataObj.subject_code = bs.getUrlVar('subject').split('-')[1];
		dataObj.knowledges_jstree = [];
		if ($('#jstree_div').jstree(true)) {
			dataObj.knowledges_jstree = $("#jstree_div").jstree("get_checked");
		}
		dataObj.repeat_papers = [];
		var repeat_papers = [];
		var rows_selected = newObj.tblist.column(0).checkboxes.selected();
		$.each(rows_selected, function(key, item) {
			repeat_papers.push(item);
		});
		repeat_papers.sort();
		dataObj.repeat_papers = repeat_papers;

		var quiz_source_type = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			quiz_source_type.push($(item).attr('quiz-source-type'));
		});
		quiz_source_type.sort();
		dataObj.quiz_source_type = quiz_source_type;

		$.ajax({
			url: '/admin/quizpaper/get-quizcategory',
			type: 'post',
			data: dataObj,
			success: function(res) {
				$('#select-quizcategory option').remove();
				$('#select-quizcategory').append('<option value="-1">選擇題型</option>');
				$.each(res, function(key, item) {
					$('#select-quizcategory').append('<option value="' + item.id + '">' + item.name + '</option>');
				});



				$('#select-quizcategory').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});
			}
		});
	}

	function getRange() {
		var treeObj = {};
		treeObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
		treeObj.subject_code = bs.getUrlVar('subject').split('-')[1];
		treeObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();

		var course_code = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			course_code.push(item.value);
		});
		course_code.sort();
		treeObj.course_code = course_code;

		var yearTermAry = [];
		$.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
			yearTermAry.push(item.value);
		});
		yearTermAry.sort();
		treeObj.yearTermAry = yearTermAry;

		var source_type = bs.getUrlVar('type');
		treeObj.source = source_type != 'print' ? 1 : 2;

		$.ajax({
			url: '/admin/quizpaper/getclassinfo',
			type: 'post',
			data: treeObj,
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				bs.disableSubmits(false);
				var data = res.data;
				if (data.length == 0) {
					$('#jstree_div_msg').show();
					// 高中國文，高一和高二康熙版這邊要改文字：
					// 此課程尚未上限->「108新綱無康熹版本」
					if ((treeObj.grade_code=='H1'||treeObj.grade_code=='H2') && treeObj.subject_code=='C0' && treeObj.factory_code==5){
						$('#jstree_div_msg').text('108新綱無康熹版本');
						$("#jstree_div_msg").attr('style','color:red');
					}else{
						$('#jstree_div_msg').text('課程尚未上線');
						$("#jstree_div_msg").attr('style','color:black');
					}
				} else {
					$('#jstree_div_msg').hide();
				}
				getJsTree(data);
			},
			complete: function() {
				bs.disableSubmits(false);
			},
			error: bs.errorHandler
		});
	}

	function getCountrange() {
		var treeObj = {};
		treeObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
		treeObj.subject_code = bs.getUrlVar('subject').split('-')[1];
		treeObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();

		var course_code = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			course_code.push(item.value);
		});
		course_code.sort();
		treeObj.course_code = course_code;

		var yearTermAry = [];
		$.each($('input:checkbox:checked[name="chkYear"]'), function(key, item) {
			yearTermAry.push(item.value);
		});
		yearTermAry.sort();
		treeObj.yearTermAry = yearTermAry;

		var source_type = bs.getUrlVar('type');
		treeObj.source = source_type != 'print' ? 1 : 2;

		$.ajax({
			url: '/admin/quizpaper/getcountclassinfo',
			type: 'post',
			data: treeObj,
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				bs.disableSubmits(false);
				var data = res.data;
				if (data.length==0) {
					$('#jstree_div_msg').show();
					// 高中國文，高一和高二康熙版這邊要改文字：
					// 此課程尚未上限->「108新綱無康熹版本」
					if ((treeObj.grade_code=='H1'||treeObj.grade_code=='H2') && treeObj.subject_code=='C0' && treeObj.factory_code==5){
						$('#jstree_div_msg').text('108新綱無康熹版本');
						$("#jstree_div_msg").attr('style','color:red');
					}else{
						$('#jstree_div_msg').text('課程尚未上線');
						$("#jstree_div_msg").attr('style','color:black');
					}
				}
				else {
					$('#jstree_div_msg').hide();
				}
				getJsTree(data);
			},
			complete: function() {
				bs.disableSubmits(false);
			},
			error: bs.errorHandler
		});
	}


	function getJsTree(jsonData) {

		$('#jstree_div').jstree('destroy');

		$('#jstree_div').jstree({
			'core': {
				'data': jsonData
			},
			'types': {
				"default": {
					"icon": "ion-android-book"
				},
				"file": {
					"icon": false
				}
			},
			'checkbox': {
				'keep_selected_style': true
			},
			'plugins': ['wholerow', 'checkbox', 'types']
		}).bind("loaded.jstree", function(event, data) {

			if (newObj.jstree) {
				$('#jstree_div').jstree('select_node', newObj.jstree);
			}
		});


	}

	function getQuizContent(idx, qid) {
		$.ajax({
			url: '/admin/exam/get-quiz-content?qid=' + qid,
			type: 'GET',
			success: function(res) {
				var quizObj = res.data;
				var qg_html = (quizObj.qg) ? '<div id="imgQG"><img class="img-quiz" src="' + quizObj.qg + '"></div><br>' : '';
				var qa = quizObj.qa;
				var qa_a = quizObj.qa_a;
				var qa_b = quizObj.qa_b;
				var qa_c = quizObj.qa_c;
				var qa_d = quizObj.qa_d;
				var qa_e = quizObj.qa_e;
				var quiz_ans = (quizObj.sa) ? quizObj.sa.replace(/(\(*)/g, '').replace(/(\)*)/g, '') : quizObj.sa;
				var quiz_category_id = quizObj.quiz_category_id;
				var sa_png = quizObj.sa_png;
				var aa = quizObj.aa;
				var aa_a = quizObj.aa_a;
				var aa_b = quizObj.aa_b;
				var aa_c = quizObj.aa_c;
				var aa_d = quizObj.aa_d;
				var aa_e = quizObj.aa_e;
				var grade_code = quizObj.grade_code;
				var mediafile = quizObj.mediafile;
				var mediafile_read = quizObj.mediafile_read;
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

				var opt_a = '';
				var opt_b = '';
				var opt_c = '';
				var opt_d = '';
				var opt_e = '';
				switch (grade_code) {
					case 'E0':
					case 'E1':
					case 'E2':
					case 'E3':
					case 'E4':
					case 'E5':
					case 'E6':
						opt_a = '①';
						opt_b = '②';
						opt_c = '③';
						opt_d = '④';
						opt_e = '⑤';
						break;
					default:
						opt_a = '(A)';
						opt_b = '(B)';
						opt_c = '(C)';
						opt_d = '(D)';
						opt_e = '(E)';
						break;
				}
				var new_opt_a = opt_a.replace('(', '').replace(')', '');
				var new_opt_b = opt_b.replace('(', '').replace(')', '');
				var new_opt_c = opt_c.replace('(', '').replace(')', '');
				var new_opt_d = opt_d.replace('(', '').replace(')', '');
				var new_opt_e = opt_e.replace('(', '').replace(')', '');

				if (qa_a) {
					qa_a_html = getOptionHtml(idx, new_opt_a, opt_a, qa_a);
				}

				if (qa_b) {
					qa_b_html = getOptionHtml(idx, new_opt_b, opt_b, qa_b);
				}

				if (qa_c) {
					qa_c_html = getOptionHtml(idx, new_opt_c, opt_c, qa_c);
				}

				if (qa_d) {
					qa_d_html = getOptionHtml(idx, new_opt_d, opt_d, qa_d);
				}

				if (qa_e) {
					qa_e_html = getOptionHtml(idx, new_opt_e, opt_e, qa_e);
				}

				if (aa) {
					aa_html = '<img class="img-quiz" src="' + aa + '"><br><br>';
				}
				if (aa_a) {
					aa_a_html = '<label class="form-check-label" style="font-size:24px">' + opt_a + '</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_a + '"><br><br>';
				}
				if (aa_b) {
					aa_b_html = '<label class="form-check-label" style="font-size:24px">' + opt_b + '</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_b + '"><br><br>';
				}
				if (aa_c) {
					aa_c_html = '<label class="form-check-label" style="font-size:24px">' + opt_c + '</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_c + '"><br><br>';
				}
				if (aa_d) {
					aa_d_html = '<label class="form-check-label" style="font-size:24px">' + opt_d + '</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_d + '"><br><br>';
				}
				if (aa_e) {
					aa_e_html = '<label class="form-check-label" style="font-size:24px">' + opt_e + '</label>&nbsp;&nbsp;<img class="img-quiz" src="' + aa_e + '"><br><br>';
				}

				var sa_html = '';
				if (quiz_category_id == 3 && sa_png) {
					sa_html = '<h4><span style="color:green">解答</span></h4><img class="img-quiz" src="' + sa_png + '"><br><br>';
				}

				if (aa_html != '' || aa_a_html != '' || aa_b_html != '' || aa_c_html != '' || aa_d_html != '' || aa_e_html != '') {
					aa_title = '<h4 style="color:green">解析</h4><br>';
				}

				var audio_html = '';
				var btn_audio_html = '';
				if (mediafile) {
					var audio_obj = {};
					audio_obj.id = 'audio-' + idx;
					audio_obj.src = mediafile;
					audio_obj.btn_css = 'btn-audio';
					audio_obj.btn_dom = $('.btn-audio');
					audio_obj.btn_text = '答案音檔';
					audio_obj.btn_for = 'audio-' + idx;
					audio_html = bs.getAudioHtml(audio_obj);
					btn_audio_html = bs.getBtnAudioHtml(audio_obj);
				}

				var audio_read_html = '';
				var btn_audio_read_html = '';
				if (mediafile_read) {
					var audio_obj = {};
					audio_obj.id = 'audio-read-' + idx;
					audio_obj.src = mediafile_read;
					audio_obj.btn_css = 'btn-audio-read';
					audio_obj.btn_dom = $('.btn-audio-read');
					audio_obj.btn_text = '題目音檔';
					audio_obj.btn_for = 'audio-read-' + idx;
					audio_read_html = bs.getAudioHtml(audio_obj);
					btn_audio_read_html = bs.getBtnAudioHtml(audio_obj);
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

				// $.each($('.video-js'),function(key,item){
				// 	initVideo($(item).attr('id'),$(this).find('source').attr('src'));
				// });


				if (newObj.temp_quiz_ids) {
					if (newObj.temp_quiz_ids.indexOf(qid) > -1) {
						$('#btn-check-quiz').text('取消勾選');
					} else {
						$('#btn-check-quiz').text('確定勾選');
					}
				}

				innerHtml +=
					'<div class="table-responsive"><table class="table"><tr><td style="padding:0;border:none">\
                        <div class="quiz-content" data-idx="' + idx + '">\
                            ' + qg_html + '\
                            <div id="imgQA"><img class="img-quiz" src="' + quizObj.qa + '"></div><br>\
                            ' + qa_a_html + qa_b_html + qa_c_html + qa_d_html + qa_e_html + '\
                            <button type="button" for="imgAA-' + idx + '" quiz_ans="' + quiz_ans + '" class="btn btn-primary btnAA">顯示答案</button>\
                            ' + audio_read_html + btn_audio_read_html + audio_html + btn_audio_html + btn_mp4_html+ hide_btn_mp4_html + '\
                            <div id="imgAA-' + idx + '" style="display:none">\
                                ' + sa_html + '\
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

				// $.each($('.video-js'),function(key,item){
				// 	initVideo($(item).attr('id'),$(this).find('source').attr('src'));
				// });

				$('.btnAA').on('click', function(e) {
					$(this).hide();
					$('#' + $(this).attr('for')).show();
					var idx = $(this).attr('for').replace('imgAA-', '');

					var quiz_ans = $(this).attr('quiz_ans');
					var bool_a = (quiz_ans.indexOf('A') != -1 || quiz_ans.indexOf('①') != -1);
					var bool_b = (quiz_ans.indexOf('B') != -1 || quiz_ans.indexOf('②') != -1);
					var bool_c = (quiz_ans.indexOf('C') != -1 || quiz_ans.indexOf('③') != -1);
					var bool_d = (quiz_ans.indexOf('D') != -1 || quiz_ans.indexOf('④') != -1);
					var bool_e = (quiz_ans.indexOf('E') != -1 || quiz_ans.indexOf('⑤') != -1);

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
					var audio_obj = {};
					audio_obj.id = $(this).attr('for');
					audio_obj.btn_dom = $(this);
					audio_obj.btn_text = '題目音檔';
					bs.setAudioPlay(audio_obj);
				});

				$('.btn-audio').off('click').on('click', function(e) {
					var audio_obj = {};
					audio_obj.id = $(this).attr('for');
					audio_obj.btn_dom = $(this);
					audio_obj.btn_text = '答案音檔';
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
					//把物件進行回收
					//  player.dispose();


					$('#'+closevideoid).hide();
					$('#'+closevideoid).children().hide();
				});


				$('.btn-ask-quiz').off('click').on('click', function(e) {
					e.preventDefault();
					$('#ask-modal').modal('show');
					newObj.qid = qid;
				});

				$('.preview-modal').modal('toggle');


				$('.preview-modal').on('hide.bs.modal', function (e) {
					// do something...
					if (check_video_active==1){
						var closevideoid='m3u8_'+qid+'mp4video';
						var player = videojs(closevideoid);
						player.pause();
						$('#'+closevideoid).hide();
						$('#'+closevideoid).children().hide()
						//把物件進行回收
						player.dispose();
						check_video_active=0;
					}
					;
				})

				$('#btn-check-quiz').off('click').on('click', function(e) {
					e.preventDefault();
					//var closevideoid='m3u8_'+qid+'mp4video';

					// if (check_video_active==1){
					// 	console.log(closevideoid);
					// 	console.log('進入');
					//
					//
					// 	var player = videojs(closevideoid);
					// 	player.pause();
					// 	//player.dispose();
					// 	$('#'+closevideoid).hide();
					// 	$('#'+closevideoid).children().hide()
					//
					// 	//把物件進行回收
					//
					// }

					if (newObj.temp_quiz_ids.indexOf(qid) > -1) {
						newObj.temp_quiz_ids.splice(newObj.temp_quiz_ids.indexOf(qid), 1);
					} else {
						newObj.temp_quiz_ids.push(qid);
					}

					var i = 0;
					newObj.tblist2.rows().every(function() {
						var item = this.data();
						var q_text = item[1];
						item[1] = '<i class="fa fa-search quizPreview" data-id="' + item[0] + '" style="cursor:pointer"></i> ' + q_text;

						if (newObj.temp_quiz_ids) {
							if (newObj.temp_quiz_ids.indexOf(item[0]) > -1) {
								newObj.tblist2.row().cell(':eq(' + i + ')', null, {
									page: 'current'
								}).checkboxes.select();
							}
							else {
								newObj.tblist2.row().cell(':eq(' + i + ')', null, {
									page: 'current'
								}).checkboxes.deselect();
							}
							i += 2;
						}
					});
					getSelectedQuiz(newObj.temp_quiz_ids);

					$('.preview-modal').modal('hide');
				});
			},
			error: bs.errorHandler
		});
	}

	function getQuizSet(delete_qid) {
		$('#quiz-set-score').html('');
		$('#quiz-total').html('');
		var dataObj = {};
		dataObj.quiz_ids = [];
		var quiz_ids = [];
		$.each(newObj.tblist2.column(0).checkboxes.selected(), function(key, item) {
			quiz_ids.push(item);
		});
		dataObj.quiz_ids = quiz_ids;

		if (newObj.temp_quiz_ids.length > 0) {
			dataObj.quiz_ids = newObj.temp_quiz_ids;
		}

		if (newObj.quiz_content.length > 0) {
			dataObj.quiz_content = newObj.quiz_content;
		}

		dataObj.source=newObj.source;

		$.ajax({
			url: '/admin/quizpaper/get-quiz-set',
			type: 'POST',
			data: dataObj,
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				bs.disableSubmits(false);
				var resdata = res.data;

				var setScoreHtml = '';
				var temp_quiz_qtype_id = null;
				var set_score_ary =[];
				$.each(resdata,function(key,item){
					set_score_ary.push(item);
				});

				//先排序類型，再排序題型
				set_score_ary = set_score_ary.sort(function(a, b) {
					// if(a.quiz_qtype_id === b.quiz_qtype_id){
					// 	return a.quiz_difficulty_id - b.quiz_difficulty_id;
					// }

					if(a.quiz_category_id === b.quiz_category_id){
						return a.quiz_qtype_id - b.quiz_qtype_id;
					}

					return a.quiz_category_id - b.quiz_category_id;
				});

				$.each(set_score_ary, function(key, item) {
					if (temp_quiz_qtype_id != item.quiz_qtype_id) {
						temp_quiz_qtype_id = item.quiz_qtype_id;
						setScoreHtml += getQuizQtypeHtml(set_score_ary, item.quiz_qtype_category, item.quiz_qtype_id, item.quiz_qtype_name, item.score);
					}
				});

				$('#quiz-set-score').append(setScoreHtml);

				var quiz_difficulty_1_total = 0;
				var quiz_difficulty_2_total = 0;
				var quiz_difficulty_3_total = 0;
				var quiz_difficulty_4_total = 0;
				var quiz_difficulty_5_total = 0;
				var sel_quiz_count_total = 0;

				$.each($('.difficulty_1_count'), function(key, item) {
					quiz_difficulty_1_total += parseInt($(item).text());
				});
				$.each($('.difficulty_2_count'), function(key, item) {
					quiz_difficulty_2_total += parseInt($(item).text());
				});
				$.each($('.difficulty_3_count'), function(key, item) {
					quiz_difficulty_3_total += parseInt($(item).text());
				});
				$.each($('.difficulty_4_count'), function(key, item) {
					quiz_difficulty_4_total += parseInt($(item).text());
				});
				$.each($('.difficulty_5_count'), function(key, item) {
					quiz_difficulty_5_total += parseInt($(item).text());
				});
				$.each($('.sel_quiz_count'), function(key, item) {
					sel_quiz_count_total += parseInt($(item).text());
				});

				var scoreTotalHtml =
					'<td>總計</td>\
                <td></td>\
                 <td>' + quiz_difficulty_1_total + '</td>\
                 <td>' + quiz_difficulty_2_total + '</td>\
                 <td>' + quiz_difficulty_3_total + '</td>\
                 <td>' + quiz_difficulty_4_total + '</td>\
                 <td>' + quiz_difficulty_5_total + '</td>\
                 <td id="sel_quiz_count_total">' + sel_quiz_count_total + '</td>\
                 <td></td>\
                 <td id="score_all">0</td>';

				$('#quiz-total').append(scoreTotalHtml);

				$('.sel_quiz_score').on('blur', function(e) {

					if (isNaN(parseFloat($(this).val()))) {
						$(this).val(0);
						return false;
					}

					if (parseFloat($(this).val()) <= 0) {
						$(this).val(0);
					}

					var quiz_qtype_id = $(this).attr('id').replace('sel_quiz_score_', '');
					var score = (parseFloat($(this).val()) * parseInt($('#sel_quiz_count_' + quiz_qtype_id).text())).toFixed(1);

					$('#score_' + quiz_qtype_id).text(score);

					var score_all = 0;
					$.each($('.score'), function(key, item) {
						score_all += parseFloat($(item).text());
					});

					$('#score_all').text(parseFloat(score_all));
				});
				//自動配分
				$('.auto-score').on('click',function(e){
					e.preventDefault();

					var data_quiz_count=0;
					var quiz_type_id_quiz_score=0;
					var return_total_score=0;
					data_quiz_count=$('td#sel_quiz_count_total').text();
					quiz_type_id_quiz_score=parseFloat(100/data_quiz_count);
					quiz_type_id_quiz_score=Math.floor(quiz_type_id_quiz_score*10)/10;
					$('.sel_quiz_score').val(quiz_type_id_quiz_score);
					$.each($('.sel_quiz_count'),function(key,item){
						var temp_str=$(item).attr("id");
						var temp_array=temp_str.split('_');
						var temp_id=temp_array[3];
						var temp_quiz_count=$(item).text();
						var temp_score=parseFloat(temp_quiz_count*quiz_type_id_quiz_score).toFixed(1);
						$('td#score_'+temp_id).text(temp_score);

						return_total_score+=parseFloat(temp_score);


					});
					$('#score_all').text(parseFloat(return_total_score));
				});

				$('.sel_quiz_score').trigger('blur');

				if (delete_qid) {
					$('.dd-item[data-id="' + delete_qid + '"]').remove();

					$.each($('.qnum'), function(key, item) {
						$(item).html(parseInt(key) + 1);
					});
				} else {
					$('#nestable_list_1').empty();
					var innerHtml = '';
					innerHtml += '<ol class="dd-list">';
					$.each(resdata, function(key, item) {
						var qg_html = (item.qg) ? '<div><img class="img-quiz" src="' + item.qg + '"></div><br>' : '';

						innerHtml +=
							'<li class="dd-item" data-id="' + item.id + '" data-caid="' + item.quiz_category_id + '" data-qtid="' + item.quiz_qtype_id + '" data-qcount="' + item.q_count + '" data-parent_file_id="' + item.parent_file_id + '" >\
							<div class="dd-handle">\
								<h2 class="padding-8px bg-091 color-white text-left">\
									<i class="fa fa-pencil"></i> 第 ' + '<span class="qnum">' + (parseInt(key) + 1) + '</span>' + ' 題\
									<i class="fa fa fa-trash fa-2x btn-delete-quiz cursor-pointer m-r-10 dd-nodrag" data-id="' + item.id + '" style="float:right"></i>\
									<i class="fa fa-question-circle-o fa-2x btn-ask-quiz cursor-pointer m-r-10 dd-nodrag" data-id="' + item.id + '" style="float:right"></i>\
									<input type="number" value="' + (parseInt(key) + 1) + '" class="qnum2 m-r-10 dd-nodrag" style="float:right;width:50px" />\
									<span class="difficulty m-r-10" difficulty="'+ item.quiz_difficulty_id +'" style="float:right;">[ '+ item.quiz_difficulty_name +' ]</span>\
									<span class="qtype m-r-10" qtype_id="'+ item.quiz_qtype_id +'" qtype_sort="" style="float:right;">'+ item.quiz_qtype_category + ' - ' + item.quiz_qtype_name +'</span>\
								</h2>\
								<div style="padding:10px 10px 20px 10px;">\
									' + qg_html + '\
									<div><img class="img-quiz" src="' + item.qa + '"></div>\
								</div>\
							</div>\
						</li>';
					});
					innerHtml += '</ol>'

					$('#nestable_list_1').append(innerHtml);
				}

				$('#nestable_list_1').nestable({
					maxDepth: 1
				});

				//拖曳後換題號
				nestableChange();

				nestableAsk();

				nestableDelete();

			},
			complete: function() {
				bs.disableSubmits(false);
			},
			error: bs.errorHandler
		});
	}

	function createQuizpaper() {
		window.document.body.onbeforeunload = function() {}
		var dataObj = {};
		dataObj.create_type = 'manualcreate';
		dataObj.subject_code = bs.getUrlVar('subject').split('-')[1];
		dataObj.knowledges_jstree = $("#jstree_div").jstree("get_checked");
		dataObj.repeat_papers = [];
		var repeat_papers = [];
		$.each(newObj.tblist.column(0).checkboxes.selected(), function(key, item) {
			repeat_papers.push(item);
		});
		repeat_papers.sort();
		dataObj.repeat_papers = repeat_papers;
		dataObj.grade_code = $('#select-grade2').val();
		dataObj.quizpaper_category_id = $('#select-category2').val();
		dataObj.quizpaper_tag_names = [];
		var quizpaper_tag_names = [];
		$.each($('#select-tags2').select2('data'), function(key, item) {
			quizpaper_tag_names.push(item.text);
		});
		quizpaper_tag_names.sort();
		dataObj.quizpaper_tag_names = quizpaper_tag_names;
		dataObj.name = $('#txt-name').val();
		dataObj.notes = $('#txt-notes').val();
		dataObj.public_status = $('#chk-public').prop('checked') == true ? 1 : 0;

		dataObj.papercount = 1;
		dataObj.quizcount = $('#sel_quiz_count_total').text();
		dataObj.quiz_ids = [];
		var quiz_ids = [];
		$.each($('#nestable_list_1 > .dd-list > .dd-item'), function(key, item) {
			var q_obj = {};
			q_obj.id = $(item).attr('data-id');
			q_obj.quiz_category_id = $(item).attr('data-caid');
			q_obj.quiz_qtype_id = $(item).attr('data-qtid');
			q_obj.q_count = $(item).attr('data-qcount');
			q_obj.parent_file_id = $(item).attr('data-parent_file_id');
			quiz_ids.push(q_obj);
		});
		dataObj.quiz_ids = quiz_ids;

		dataObj.all_score = parseFloat($('#score_all').text()).toFixed(1);

		dataObj.qtype_score_ary = [];
		$.each($('.sel_quiz_count'), function(key, item) {
			var qtype_score_obj = {};
			var quiz_qtype_id = $(item).attr('id').replace('sel_quiz_count_', '');
			qtype_score_obj.quiz_qtype_id = parseInt(quiz_qtype_id);
			qtype_score_obj.sel_quiz_count = parseInt($(item).text());
			qtype_score_obj.sel_ans_count = 0;
			qtype_score_obj.sel_quiz_score = parseFloat($('#sel_quiz_score_' + quiz_qtype_id).val());
			qtype_score_obj.sel_ans_score = 0;
			qtype_score_obj.score = parseFloat($('#score_' + quiz_qtype_id).text());
			dataObj.qtype_score_ary.push(qtype_score_obj);
		});

		dataObj.size = 0;
		var size = $('input:radio:checked[name="size"]').val();
		if (size) {
			dataObj.size = size;
		}

		dataObj.typeset = 0;
		var typeset = $('input:radio:checked[name="typeset"]').val();
		if (typeset) {
			dataObj.typeset = typeset;
		}

		var paper_content = [];
		$.each($('input:checkbox:checked[name="paper_content"]'), function(key, item) {
			paper_content.push(item.value);
		});
		paper_content.sort();
		dataObj.paper_content = paper_content;

		dataObj.filename = '';
		var filename = $('#txt-filename').val();
		if (filename) {
			dataObj.filename = $('#txt-filename').val();
		}

		dataObj.filetype = 0;
		var filetype = $('input:radio:checked[name="filetype"]').val();
		if (filetype) {
			dataObj.filetype = filetype;
		}

		var source_type = bs.getUrlVar('type');
		dataObj.source = source_type != 'print' ? 1 : 2;

		dataObj.info = JSON.stringify(getPreObj());

		var quiz_source_type = [];
		$.each($('input:radio:checked[name="radioSource"]'), function(key, item) {
			quiz_source_type.push($(item).attr('quiz-source-type'));
		});
		quiz_source_type.sort();
		dataObj.quiz_source_type = quiz_source_type;
		var presave_source_type='';

		presave_source_type=bs.getUrlVar('source');
		dataObj.presave_source_type=presave_source_type;


		$.ajax({
			url: '/admin/quizpaper/create-quizpaper',
			type: 'post',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				bs.disableSubmits(false);
				if (res.message != 'success') {
					swal(res.message);
					return false;
				}

				if (bs.getUrlVar('type') !== 'print') {
					var pid_str = res.pid_str;
					var cid_str = (bs.getUrlVar('cid')) ? '&cid=' + bs.getUrlVar('cid') : '';
					var uids_str = (bs.getUrlVar('uids')) ? '&uids=' + bs.getUrlVar('uids') : '';
					$('#btn-sendpaper-online').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper/sendpaper?type=online&pid=' + pid_str + cid_str + uids_str);
					});
					$('#btn-sendpaper-manual').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper/sendpaper?type=manual&pid=' + pid_str + cid_str + uids_str);
					});
					$('#btn-leave').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper');
					});
					$('#sendpaper-modal').modal('show');
				} else {
					$('#btn-cancel').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper');
					});
					$('#printpaper-modal').modal('show');
					$('.cancel-btn').hide();
					$('.prev-btn').hide();
					$('.finish-btn').text('返回');
					$('.finish-btn').off('click').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper');
					});
				}

				$('#btn-down').on('click', function(e) {
					e.preventDefault();
					$('#printpaper-modal').modal('hide');
					newObj.call_times = 0;
					newObj.pid = res.pid_str;
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
									setTimeout(function() {
										location.replace('/admin/quizpaper/paperview?id=' + newObj.pid)
									}, 1000);
									return false;
								}
							}, 5000
						);
				});

				$('#btn-wrong-down').on('click', function(e) {
					e.preventDefault();
					$('#btn-down').trigger('click');
					$('#sendpaper-modal').modal('hide');
					$('.leave-btn').hide();
					$('.finish-btn').text('返回');
					$('.finish-btn').off('click').on('click', function(e) {
						e.preventDefault();
						location.replace('/admin/quizpaper');
					});
				});
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
		dataObj.pidAry.push(newObj.pid);

		dataObj.size = 0;
		var size = $('input:radio:checked[name="size"]').val();
		if (size) {
			dataObj.size = size;
		}

		dataObj.typeset = 0;
		var typeset = $('input:radio:checked[name="typeset"]').val();
		if (typeset) {
			dataObj.typeset = typeset;
		}

		var paper_content = [];
		$.each($('input:checkbox:checked[name="paper_content"]'), function(key, item) {
			paper_content.push(item.value);
		});
		paper_content.sort();
		dataObj.paper_content = paper_content;

		dataObj.filename = '';
		var filename = $('#txt-filename').val();
		if (filename) {
			dataObj.filename = $('#txt-filename').val();
		}

		dataObj.filetype = 0;
		var filetype = $('input:radio:checked[name="filetype"]').val();
		if (filetype) {
			dataObj.filetype = filetype;
		}

		if (bs.getUrlVar('pre') && bs.getUrlVar('source') == 'wrong') {
			dataObj.size = 1;
			dataObj.typeset = 1;
			dataObj.paper_content = [1, 2, 3, 4];
			var date_obj = bs.getFullDate();
			dataObj.filename = '錯題匯出' + '-' + date_obj.year + date_obj.month + date_obj.date;
			dataObj.filetype = 1;
		}

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

	function preloadStep() {
		var dataObj = {};
		dataObj.pre = bs.getUrlVar('pre');
		if (!dataObj.pre) {
			return false;
		}
		$.ajax({
			url: '/admin/quizpaper/preload-step',
			type: 'POST',
			data: dataObj,
			beforeSend: function() {
				bs.disableSubmits(true);
			},
			success: function(res) {
				var data = res.data;
				if (!data) {
					bs.disableSubmits(false);
					return false;
				}

				var pre_current_index = data.pre_current_index;
				var pre_step1 = JSON.parse(data.pre_step1);
				var pre_step2 = JSON.parse(data.pre_step2);
				var pre_step3 = JSON.parse(data.pre_step3);
				var pre_step4 = JSON.parse(data.pre_step4);
				var pre_step5 = JSON.parse(data.pre_step5);
				var pre_step6 = JSON.parse(data.pre_step6);
				var pre_step1_finish = 0;
				var pre_step2_finish = 0;
				var pre_step3_finish = 0;
				var pre_step4_finish = 0;
				var pre_step5_finish = 0;
				var pre_step6_finish = 0;

				newObj.source = data.source;

				if (newObj.source == 'wrong' || newObj.source == 'similar' || newObj.source == 'collect'|| newObj.source == 'recoverwrongpaper') {
					$('.cancel-btn').remove();
					$('.prev-btn').remove();
				}

				if (pre_current_index >= 0) {
					newObj.recent_year = (pre_step1.recent_year) ? pre_step1.recent_year : newObj.recent_year;
					$('input:radio[name="radioGrade"][value="' + pre_step1.grade_code + '"]').prop('checked', true).trigger('change');
					showChkYear('grade' + pre_step1.grade_code);
					$('input:radio[name="radioSource"][value="' + pre_step1.course_code + '"]').prop('checked', true).trigger('change');
					$('input:radio[name="radioFactory"][value="' + pre_step1.factory_code[0] + '"]').prop('checked', true);
					var yearTermAry = pre_step1.text_year;
					$.each(yearTermAry, function(key, item) {
						$('input:checkbox[name="chkYear"][value="' + item + '"]').prop('checked', true);
					});
					var inteval_step1 = setInterval(function() {
						clearInterval(inteval_step1);
						pre_step1_finish = 1;
					}, 1000);
				}

				if (pre_current_index >= 1) {
					$('input:radio[name="radio-exam"][value="' + pre_step2.exam_range + '"]').prop('checked', true);
					newObj.jstree = pre_step2.jstree;
					var step1_timeout=window.setTimeout(console.log('test'),1000);
					window.clearTimeout(step1_timeout);
					$('#manual-wizard').steps('next');
					$('.steps ul').find('.done').addClass('disabled');

					var inteval_step2 = setInterval(function() {
						if (pre_step1_finish == 1) {
							clearInterval(inteval_step2);
							pre_step2_finish = 1;
						}
					}, 1000);
				}

				if (pre_current_index >= 2) {
					var inteval_step3 = setInterval(function() {
						if (pre_step2_finish == 1 && $('#jstree_div').jstree(true) && $("#jstree_div").jstree("get_checked").length > 0) {
							clearInterval(inteval_step3);
							$('#manual-wizard').steps('next');
							$('.steps ul').find('.done').addClass('disabled');
							$('#select-grade').val(pre_step3.grade_code);
							$('#select-author').val(pre_step3.created_by);
							$('#select-category').val(pre_step3.quizpaper_category_id);
							$('#txt-search').val(pre_step3.name);
							newObj.repeat_papers = pre_step3.repeat_papers;
							newObj.tblist.clear().draw();
							pre_step3_finish = 1;
						}
					}, 1000);
				}

				if (pre_current_index >= 3) {

					var quiz_ids = [];
					$.each(pre_step4.quiz_ids, function(key, item) {
						quiz_ids.push(item);
					});
					newObj.temp_quiz_ids = quiz_ids;
					//修正手動出卷時儲存考卷後,再進入挑題時無法選擇其他題目之問題
					if (newObj.source!='normal'){
						newObj.fixed_quiz_ids = quiz_ids;
					}else{
						newObj.fixed_quiz_ids = [];
					}


					var inteval_step4 = setInterval(function() {
						if (pre_step3_finish == 1) {
							clearInterval(inteval_step4);
							$('#select-difficulty').val(pre_step4.quiz_difficulty_id);
							$('#select-quizextension').val(pre_step4.quiz_extension_id);
							$('#txt-search-quiz').val(pre_step4.txt_search);
							$('#manual-wizard').steps('next');
							$('.steps ul').find('.done').addClass('disabled');
							pre_step4_finish = 1;
						}
					}, 1000);
				}

				if (pre_current_index >= 4) {

					newObj.quiz_content = pre_step5.quiz_content;
					newObj.qtype_score_ary = pre_step5.qtype_score_ary;

					var inteval_step5 = setInterval(function() {
						if (pre_step4_finish == 1 && newObj.tblist2.column(0).checkboxes.selected().length > 0) {
							clearInterval(inteval_step5);
							$('#manual-wizard').steps('next');
							$('.steps ul').find('.done').addClass('disabled');
							pre_step5_finish = 1;
						}
					}, 1000);
				}

				if (pre_current_index >= 5) {
					var inteval_step6 = setInterval(function() {

						var lose_score_state = 0;
						$.each($('.score'), function(key, item) {
							if (parseInt($(item).text()) == 0) {
								lose_score_state = 1;
							}
						});

						if (pre_step5_finish == 1 && lose_score_state == 0) {

							clearInterval(inteval_step6);

							$('#select-grade2').val(pre_step6.grade_code).trigger('change');

							$('#select-category2').val(pre_step6.quizpaper_category_id).trigger('change');

							$('#select-tags2').val(pre_step6.quizpaper_tag_ids).trigger('change');

							$('#txt-name').val(pre_step6.name);
							$('#txt-notes').val(pre_step6.notes);
							if (pre_step6.public_status == 1) {
								$('#chk-public').prop('checked', true).trigger('change');
							}

							if (newObj.source == 'modify') {
								$('.steps ul').find('.done').addClass('disabled');
								$('.finish-btn').text('另存考卷');
							} else {
								$('#manual-wizard').steps('next');
								$('.steps ul').find('.done').addClass('disabled');
							}
						}
					}, 1000);
				}

				$('.select-single').select2({
					theme: "bootstrap",
					minimumResultsForSearch: Infinity
				});

				bs.disableSubmits(false);
			},
			error: bs.errorHandler
		});
	}

	function getQuizKnowledge() {
		// $('#select-knowledge').select2({
		//     language: 'zh-TW',
		//     width: '100%',
		//     theme: "bootstrap",
		//     placeholder: {
		//         id: '-1',
		//         text: '選擇知識點'
		//     },
		//     minimumInputLength: 1,
		//     tags: true,
		//     ajax: {
		//         url: '/admin/quizpaper/get-quiz-knowledge',
		//         type: 'get',
		//         quietMillis: 250,
		//         data: function(params) {
		//             var query = {
		//                 search: params.term
		//             }
		//
		//             // Query parameters will be ?search=[term]&type=public
		//             return query;
		//         },
		//         processResults: function(data, params) {
		//             // Tranforms the top-level key of the response object from 'items' to 'results'
		//             return {
		//                 results: data
		//             };
		//         },
		//         cache: true
		//     }
		// });
	}

	function findIndexByKey(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return i;
			}
		}
		return null;
	}

	function createPrepaper() {
		var dataObj = getPreObj();
		dataObj.source = 'normal';
		dataObj.type = bs.getUrlVar('type');
		dataObj.page_mode='manualcreate';
		$.ajax({
			url: '/admin/banwu/create-quiz-paper',
			type: 'POST',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
			success: function(res) {
				if (newObj.source == 'modify') {
					location.replace('/admin/quizpaper');
				} else {
					history.back();
				}
			},
			error: bs.errorHandler
		});
	}

	function getPreObj() {

		var dataObj = {};

		dataObj.pre_subject = bs.getUrlVar('subject');
		dataObj.pre_current_index = $('#manual-wizard').steps('getCurrentIndex');

		dataObj.pre_step1 = {};
		if (dataObj.pre_current_index >= 0) {
			dataObj.pre_step1.grade_code = $('input:radio:checked[name="radioGrade"]').val();
			dataObj.pre_step1.factory_code = [];
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
			dataObj.pre_step1.recent_year = bs.getRecentYear();
		}

		dataObj.pre_step2 = {};
		if (dataObj.pre_current_index >= 1) {
			dataObj.pre_step2.exam_range = $('input:radio:checked[name="radio-exam"]').val();
			dataObj.pre_step2.jstree = $("#jstree_div").jstree("get_checked");
		}

		dataObj.pre_step3 = {}
		if (dataObj.pre_current_index >= 2) {
			dataObj.pre_step3.grade_code = $('#select-grade').val();
			dataObj.pre_step3.subject_code = $('#select-subject').val();
			dataObj.pre_step3.created_by = $('#select-author').val();
			dataObj.pre_step3.quizpaper_category_id = $('#select-category').val();
			dataObj.pre_step3.quizpaper_tag_ids = [];
			var quizpaper_tag_ids = [];
			$.each($('#select-tags').select2('data'), function(key, item) {
				quizpaper_tag_ids.push(item.text);
			});
			quizpaper_tag_ids.sort();
			dataObj.pre_step3.quizpaper_tag_ids = quizpaper_tag_ids;
			dataObj.pre_step3.name = $('#txt-search').val();
			dataObj.pre_step3.repeat_papers = [];
			var repeat_papers = [];
			var rows_selected = newObj.tblist.column(0).checkboxes.selected();
			$.each(rows_selected, function(key, item) {
				repeat_papers.push(item);
			});
			repeat_papers.sort();
			dataObj.pre_step3.repeat_papers = repeat_papers;
		}

		dataObj.pre_step4 = {};
		if (dataObj.pre_current_index >= 3) {
			dataObj.pre_step4.quiz_difficulty_id = $('#select-difficulty').val();
			dataObj.pre_step4.quiz_extension_id=$('#select-quizextension').val();
			dataObj.pre_step4.quiz_category_id = $('#select-quizcategory').val();
			dataObj.pre_step4.quiz_qtype_id = -1;
			dataObj.pre_step4.qa_text = $('#txt-search-quiz').val();
			dataObj.pre_step4.quiz_ids = newObj.temp_quiz_ids;
		}

		dataObj.pre_step5 = {};
		if (dataObj.pre_current_index >= 4) {
			dataObj.pre_step5.quiz_content = [];
			$.each($('#nestable_list_1 > .dd-list > .dd-item'), function(key, item) {
				var quiz_obj = {};
				quiz_obj.index = key;
				var quiz_qtype_id = $(item).attr('data-qtid');
				quiz_obj.score = parseFloat($('#sel_quiz_score_' + quiz_qtype_id).val());
				quiz_obj.quiz_id = $(item).attr('data-id');
				dataObj.pre_step5.quiz_content.push(quiz_obj);
			});

			dataObj.pre_step5.per_score = 0;
			dataObj.pre_step5.qtype_score_ary = [];
			$.each($('.sel_quiz_count'), function(key, item) {
				var qtype_score_obj = {};
				var quiz_qtype_id = $(item).attr('id').replace('sel_quiz_count_', '');
				qtype_score_obj.quiz_qtype_id = parseInt(quiz_qtype_id);
				qtype_score_obj.sel_quiz_count = parseInt($(item).text());
				qtype_score_obj.sel_ans_count = 0;
				qtype_score_obj.sel_quiz_score = parseFloat($('#sel_quiz_score_' + quiz_qtype_id).val());
				qtype_score_obj.sel_ans_score = 0;
				qtype_score_obj.score = parseFloat($('#score_' + quiz_qtype_id).text());
				dataObj.pre_step5.qtype_score_ary.push(qtype_score_obj);
			});
		}

		dataObj.pre_step6 = {};
		if (dataObj.pre_current_index >= 5) {
			dataObj.pre_step6.grade_code = $('#select-grade2').val();
			dataObj.pre_step6.subject_code = bs.getUrlVar('subject').split('-')[1];
			dataObj.pre_step6.quizpaper_category_id = $('#select-category2').val();
			dataObj.pre_step6.quizpaper_tag_ids = [];
			var quizpaper_tag_ids2 = [];
			$.each($('#select-tags2').select2('data'), function(key, item) {
				quizpaper_tag_ids2.push(item.id);
			});
			quizpaper_tag_ids2.sort();
			dataObj.pre_step6.quizpaper_tag_ids = quizpaper_tag_ids2;

			dataObj.pre_step6.name = $('#txt-name').val();
			dataObj.pre_step6.notes = $('#txt-notes').val();
			dataObj.pre_step6.public_status = $('#chk-public').prop('checked') == true ? 1 : 0;
		}

		return dataObj;
	}

	function getSelectedQuiz(quiz_ids) {
		var dataObj = {};
		dataObj.quiz_ids = quiz_ids;
		$.ajax({
			url: '/admin/quizpaper/get-selected-quiz',
			type: 'POST',
			data: JSON.stringify(dataObj),
			contentType: 'application/json',
			success: function(res) {
				var data = res.data;
				if (!data || data.length == 0) {
					$('#selected-quiz').empty();
					return false;
				}
				var total_count = 0;
				var inner_html = '';
				inner_html += '<thead>';
				inner_html += '<tr>';
				inner_html += '<th>題型</th>';
				inner_html += '<th>難易度</th>';
				inner_html += '<th>已選題數</th>';
				inner_html += '</tr>';
				inner_html += '</thead>';
				inner_html += '<tbody>';
				$.each(data, function(key, item) {
					inner_html += '<tr>';
					inner_html += '<td>' + item.quiz_type_name + '</td>';
					inner_html += '<td>' + item.quiz_difficulty_name + '</td>';
					inner_html += '<td>' + item.quiz_count + '</td>';
					inner_html += '</tr>';
					total_count += parseInt(item.quiz_count);
				});
				inner_html += '<tr>';
				inner_html += '<td></td>';
				inner_html += '<td></td>';
				inner_html += '<td>' + total_count + '</td>';
				inner_html += '</tr>';
				inner_html += '</tbody>';
				$('#selected-quiz').empty().append(inner_html);
			},
			error: bs.errorHandler
		});
	}

	function nestableChange() {
		$('#nestable_list_1').off('change').on('change', function(e) {
			$.each($('.qnum'), function(key, item) {
				$(item).html(parseInt(key) + 1);
			});

			if ($(e.target).attr('id') == 'nestable_list_1') {
				$.each($('.qnum2'), function(key, item) {
					$(item).val(parseInt(key) + 1);
				});
				//手動拖曳調整後暫存的排序順序就清空
				newObj.qtype_sort_ary = [];
			}
		});
	}

	function nestableAsk() {
		$('.dd-handle').find('.btn-ask-quiz').off('click').on('click', function(e) {
			e.preventDefault();
			$('#ask-modal').modal('show');
			newObj.qid = $(this).attr('data-id');
		});
	}

	function nestableDelete() {
		$('.dd-handle').find('.btn-delete-quiz').off('click').on('click', function(e) {
			e.preventDefault();
			if (newObj.temp_quiz_ids.length <= 1) {
				swal('無法再刪除題目');
				return false;
			}
			if (newObj.temp_quiz_ids.indexOf($(this).attr('data-id')) > -1) {
				newObj.temp_quiz_ids.splice(newObj.temp_quiz_ids.indexOf($(this).attr('data-id')), 1);
			}
			if (bs.findIndexByKey(newObj.quiz_content, 'quiz_id', $(this).attr('data-id')) > -1) {
				newObj.quiz_content.splice(bs.findIndexByKey(newObj.quiz_content, 'quiz_id', $(this).attr('data-id')), 1)
			}
			getQuizSet($(this).attr('data-id'));
			getSelectedQuiz(newObj.temp_quiz_ids);
		});
	}

	function getOptionHtml(idx, new_opt, opt, qa_opt) {

		var inner_html = '';

		inner_html =
			'<div id="imgQA-' + new_opt + '">\
            <div class="form-check form-check-inline">\
                <div id="q' + idx + '-' + new_opt + '" style="display:inline-block;width:20px">\
                    <i class="ion-arrow-right-c"></i>\
                </div>\
                <label class="form-check-label" for="radioQA-' + new_opt + '" style="font-size:24px">' + opt + '</label>\
                <div style="display:inline-block;margin-left:10px">\
                    <img class="img-quiz" src="' + qa_opt + '" alt="">\
                </div>\
            </div>\
            <hr>\
        </div>';

		return inner_html;
	}

	function getQuizQtypeHtml(quizInfo, quiz_qtype_category, quiz_qtype_id, quiz_qtype_name, score) {

		var innerHtml = '';
		var difficulty_1_count = 0;
		var difficulty_2_count = 0;
		var difficulty_3_count = 0;
		var difficulty_4_count = 0;
		var difficulty_5_count = 0;
		var sel_quiz_count = 0;
		var difficulty_1_html = '';
		var difficulty_2_html = '';
		var difficulty_3_html = '';
		var difficulty_4_html = '';
		var difficulty_5_html = '';

		innerHtml += '<tr>';
		innerHtml += '<td>' + quiz_qtype_category + '</td>';
		innerHtml += '<td>' + quiz_qtype_name + '</td>';

		$.each(quizInfo, function(key, item) {

			if (item.quiz_qtype_id == quiz_qtype_id) {

				switch (item.quiz_difficulty_id) {
					case 1:
						difficulty_1_count++;
						sel_quiz_count++;
						break;
					case 2:
						difficulty_2_count++;
						sel_quiz_count++;
						break;
					case 3:
						difficulty_3_count++;
						sel_quiz_count++;
						break;
					case 4:
						difficulty_4_count++;
						sel_quiz_count++;
						break;
					case 5:
						difficulty_5_count++;
						sel_quiz_count++;
						break;
				}
			}

		});

		innerHtml += '<td class="difficulty_1_count">' + difficulty_1_count + '</td>';
		innerHtml += '<td class="difficulty_2_count">' + difficulty_2_count + '</td>';
		innerHtml += '<td class="difficulty_3_count">' + difficulty_3_count + '</td>';
		innerHtml += '<td class="difficulty_4_count">' + difficulty_4_count + '</td>';
		innerHtml += '<td class="difficulty_5_count">' + difficulty_5_count + '</td>';
		innerHtml += '<td class="sel_quiz_count" id="sel_quiz_count_' + quiz_qtype_id + '">' + sel_quiz_count + '</td>';
		innerHtml += '<td><input type="text" value="' + score + '" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_score" id="sel_quiz_score_' + quiz_qtype_id + '"></td>';
		innerHtml += '<td class="score" id="score_' + quiz_qtype_id + '">' + (parseFloat(score) * parseInt(sel_quiz_count)).toFixed(1) + '</td>';
		innerHtml += '</tr>';

		if (sel_quiz_count == 0) {
			innerHtml = '';
		}

		return innerHtml;
	}

	function getRecentYear() {

		// 正式站與測試站校正更動 用域名去判斷
		var check_location=location.host;
		var paramGS = bs.getUrlVar('subject');
		const grade = paramGS.split('-')[0];
		const subject = paramGS.split('-')[1];

		if (paramGS) {
			switch (grade) {
				case 'E0':
					$('.gradeEP').remove();
					$('.gradeJ0').remove();
					$('.gradeH0').remove();
					$('#chkY1').siblings().text('小一上');
					$('#chkY2').siblings().text('小一下');
					$('#chkY3').parent().remove();
					$('#chkY4').parent().remove();
					$('#chkY5').parent().remove();
					$('#chkY6').parent().remove();
					$('#chkY7').parent().remove();
					$('#chkY8').parent().remove();
					break;
				case 'EP':
					$('.gradeE0').remove();
					$('.gradeJ0').remove();
					$('.gradeH0').remove();
					if (subject=='E21'){
						$('#chkY1').siblings().text('初級(1)');
						$('#chkY2').parent().remove();
						$('#chkY3').siblings().text('初級(2)');

					}else{
						$('#chkY1').siblings().text('全');
						$('#chkY2').parent().remove();
						$('#chkY3').parent().remove();
					}
					$('#chkY4').parent().remove();
					$('#chkY5').parent().remove();
					$('#chkY6').parent().remove();
					$('#chkY7').parent().remove();
					$('#chkY8').parent().remove();
					$('.strictRange').hide();
					break;
				case 'J0':
					$('.gradeE0').remove();
					$('.gradeEP').remove();
					$('.gradeH0').remove();
					$('#chkY1').siblings().text('國一上');
					$('#chkY2').siblings().text('國一下');
					$('#chkY3').siblings().text('國二上');
					$('#chkY4').siblings().text('國二下');
					$('#chkY5').siblings().text('國三上');
					$('#chkY6').siblings().text('國三下');
					$('#chkY7').parent().remove();
					$('#chkY8').parent().remove();
					break;
				case 'H0':
					$('.gradeE0').remove();
					$('.gradeEP').remove();
					$('.gradeJ0').remove();
					if (subject == 'N1' || subject == 'N3' || subject == 'N4' || subject == 'N5' || subject =='M0' ||subject =='S1' ||subject =='S2' || subject =='S3'  ) {
						switch (subject) {
							case 'N1':
								$('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
								$('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
								$('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'N3':
								$('#chkY1').siblings().html('必修地科');
								$('#chkY2').parent().remove();
								$('#chkY3').parent().remove();
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'N4':
								$('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
								$('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
								$('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'N5':
								$('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
								$('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
								$('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'M0':
								$('#chkY1').siblings().html('高一上&nbsp;&nbsp;');
								$('#chkY2').siblings().html('高一下&nbsp;&nbsp;');
								$('#chkY3').siblings().html('高二上&nbsp;&nbsp;');
								$('#chkY4').siblings().html('高二下&nbsp;&nbsp;');
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'S1':
								$('#chkY1').siblings().html('必修歷史&nbsp;&nbsp;');
								$('#chkY2').siblings().html('必修歷史I&nbsp;&nbsp;');
								$('#chkY3').siblings().html('必修歷史II&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'S2':
								$('#chkY1').siblings().html('必修地理&nbsp;&nbsp;');
								$('#chkY2').siblings().html('必修地理I&nbsp;&nbsp;');
								$('#chkY3').siblings().html('必修地理II&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;
							case 'S3':
								$('#chkY1').siblings().html('必修公民&nbsp;&nbsp;');
								$('#chkY2').siblings().html('必修公民I&nbsp;&nbsp;');
								$('#chkY3').siblings().html('必修公民II&nbsp;&nbsp;');
								$('#chkY4').parent().remove();
								$('#chkY5').parent().remove();
								$('#chkY6').parent().remove();
								$('#chkY7').parent().remove();
								$('#chkY8').parent().remove();
								break;

						}
					}
					else{
						$('#chkY1').siblings().text('高一上');
						$('#chkY2').siblings().text('高一下');
						$('#chkY3').siblings().text('高二上');
						$('#chkY4').siblings().text('高二下');
						$('#chkY5').siblings().text('高三上');
						$('#chkY6').siblings().text('高三下');
						$('#chkY7').parent().remove();
						$('#chkY8').parent().remove();
					}
					//109下冊次調整110上
					//if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}






					break;
			}
		}

		newObj.recent_year = bs.getRecentYear();
		if (grade=='EP') {
			if (subject=='E21'){
				$('#chkY1').val(newObj.recent_year + '-A' + '-' + 'EP' + '-' + '0');
				$('#chkY3').val(newObj.recent_year + '-B' + '-' + 'EP' + '-' + '0');
			}else{
				$('#chkY1').val(newObj.recent_year + '-0' + '-' + 'EP' + '-' + '0');
			}


		}
	}

	function initVideo(vid,m3u8){
		var player = videojs(vid);
		player.src({
			src: m3u8,
			type: 'application/x-mpegURL',
		});
	}

	function showChkYear(grade_id) {
		//段考測次題目選項調整
		var source_value=$('input:radio[name="radioSource"]:checked').val();
		// 正式站與測試站校正更動 用域名去判斷
		var check_location=location.host;





		$('.chkYear').show();
		const grade_ary = bs.getRelatedGrade(grade_id.replace('grade', ''));
		const subject = bs.getUrlVar('subject').split('-')[1];

		if (grade_id=='gradeJ3' || grade_id=='gradeH3') {
			$('#radioS2').parent().show();
			$('#chkY9').siblings().html('全')
			$('#chkY9').val(parseInt(newObj.recent_year)+ '-0' + '-' + bs.getUrlVar('subject').split('-')[0]+ '-' + '0');
		}
		else {
			$('#radioS2').prop('checked', false);
			$('#radioS2').parent().hide();
			$('#chkY9').prop('checked', false);
			$('#chkY9').parent().hide();
		}

		if ($('#radioS2').prop('checked')) {

			$('#chkY9').parent().show();
			$('#chkY9').prop('checked', true);

			$('.chkYear').hide();
			$('.chkYear >input').prop('checked', false);

			$('#chk-factory').append(
				'<div class="form-check form-check-inline">' +
				'<input class="form-check-input" type="radio" name="radioFactory" id="radioF00" value="0">' +
				'<label class="form-check-label" for="radioF00">力宇</label>' +
				'</div>');

			$('input:radio[name="radioFactory"]').parent().hide();
			$('#radioF00').parent().show();
			$('#radioF00').prop('checked', true);

			$('.strictRange').hide();
		} else {
			$('#chkY9').parent().hide();
			$('#chkY9').prop('checked', false);

			$('.chkYear').show();

			$('input:radio[name="radioFactory"]').parent().show();
			if (bs.getUrlVar('subject').split('-')[0] == 'H0' && bs.getUrlVar('subject').split('-')[1] != 'C0') {
				$('#radioF0').prop('checked', true);
			}
			$('#radioF00').parent().remove();

			$('.strictRange').show();
		}

		if (bs.getUrlVar('subject').split('-')[0] == 'E0') {
			var grade_text = bs.getGradeText(grade_id.replace('grade', ''));
			$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+ '-' + '0');
			$('#chkY1').siblings().text(grade_text+'上');
			$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+ '-' + '0');
			$('#chkY2').siblings().text(grade_text+'下');
		}






		else if (grade_id === 'gradeJ1' || (grade_id === 'gradeH1' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M' && subject.substr(0,1)!='S')) {
			$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+ '-' + '0');
			$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+ '-' + '0');
			$('#chkY3').prop('checked', false);
			$('#chkY3').parent().hide();
			$('#chkY4').prop('checked', false);
			$('#chkY4').parent().hide();
			$('#chkY5').prop('checked', false);
			$('#chkY5').parent().hide();
			$('#chkY6').prop('checked', false);
			$('#chkY6').parent().hide();
		} else if (grade_id === 'gradeJ2' || (grade_id === 'gradeH2' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M' && subject.substr(0,1)!='S')) {
			//段考測次題目選項調整
			if (source_value=='F'){


				// $('#chkY1').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[0]+ '-' + '0');
				// $('#chkY2').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[0]+ '-' + '0');
				$('#chkY1').prop('checked', false);
				$('#chkY1').parent().hide();
				$('#chkY2').prop('checked', false);
				$('#chkY2').parent().hide();


				$('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY5').prop('checked', false);
				$('#chkY5').parent().hide();
				$('#chkY6').prop('checked', false);
				$('#chkY6').parent().hide();

			}
			else{
				$('#chkY1').prop('checked', false);
				$('#chkY1').parent().show();
				$('#chkY2').prop('checked', false);
				$('#chkY2').parent().show();

				$('#chkY1').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[0]+ '-' + '0');
				$('#chkY2').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[0]+ '-' + '0');
				$('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY5').prop('checked', false);
				$('#chkY5').parent().hide();
				$('#chkY6').prop('checked', false);
				$('#chkY6').parent().hide();
			}

		} else if (grade_id === 'gradeJ3' || (grade_id === 'gradeH3' && subject.substr(0,1)!='N' && subject.substr(0,1)!='M')) {

			//段考測次題目選項調整
			if (source_value=='F'){


				$('#chkY1').prop('checked', false);
				$('#chkY1').parent().hide();
				$('#chkY2').prop('checked', false);
				$('#chkY2').parent().hide();


				// $('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+ '-' + '0');
				// $('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY3').prop('checked', false);
				$('#chkY3').parent().hide();
				$('#chkY4').prop('checked', false);
				$('#chkY4').parent().hide();


				$('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
				$('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');



			}
			else if (source_value=='H')   {
				$('#chkY9').parent().show();
				$('#chkY9').prop('checked', true);
			}

			else{


				$('#chkY1').val((parseInt(newObj.recent_year) - 2) + '-A' + '-' + grade_ary[0]+ '-' + '0');
				$('#chkY2').val((parseInt(newObj.recent_year) - 2) + '-B' + '-' + grade_ary[0]+ '-' + '0');
				$('#chkY3').val((parseInt(newObj.recent_year) - 1) + '-A' + '-' + grade_ary[1]+ '-' + '0');
				$('#chkY4').val((parseInt(newObj.recent_year) - 1) + '-B' + '-' + grade_ary[1]+ '-' + '0');
				if (grade_id === 'gradeH3'){
					$('#chkY5').prop('checked', false);
					$('#chkY5').parent().hide();
					$('#chkY6').prop('checked', false);
					$('#chkY6').parent().hide();
				}
				else {
					$('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
					$('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');
				}
				//$('#chkY5').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[2]+ '-' + '0');
				//$('#chkY6').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[2]+ '-' + '0');

				//109下冊次調整110上
				//if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}




			}










		} else if (grade_id == 'gradeEP') {

			if (subject=='E21'){
				$('#chkY1').val(newObj.recent_year + '-A' + '-' + grade_ary[0] + '-' + '0');
				$('#chkY3').val(newObj.recent_year + '-B' + '-' + grade_ary[0] + '-' + '0');
			}else{
				$('#chkY1').val(newObj.recent_year + '-0' + '-' + grade_ary[0] + '-' + '0');
			}

		}



		switch (grade_id) {
			case 'gradeH1':
				switch (subject) {
					case 'N1':
						$('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					case 'N3':
						$('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						break;
					case 'N4':
						$('#chkY1').siblings().html('必修物理&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0]+'-'+'ND');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						break;
					case 'N5':
						$('#chkY1').siblings().html('必修化學&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[0]+'-'+'NE');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					case 'M0':
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S1':
						$('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S71');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S72');
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S2':
						$('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S81');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S82');
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S3':
						$('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[0]+'-'+'S91');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[0]+'-'+'S92');
						$('#chkY3').prop('checked', false);
						$('#chkY3').parent().hide();
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
				}
				break;
			case 'gradeH2':
				switch (subject) {
					case 'N1':
						$('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
						$('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1] + '-' + 'NB1');
						$('#chkY3').val((parseInt(newObj.recent_year))+'-B'+'-' + grade_ary[1] + '-' + 'NB2');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					case 'N3':
						$('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						break;
					case 'N4':
						$('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0]+'-'+'ND');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'NA1');
						$('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'NA2');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						break;
					case 'N5':
						$('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[0]+'-'+'NE');
						$('#chkY2').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'N91');
						$('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'N92');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					case 'M0':
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-A' + '-' + grade_ary[1]+'-'+'0');
						$('#chkY4').val((parseInt(newObj.recent_year)) + '-B' + '-' + grade_ary[1]+'-'+'0');
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S1':
						$('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修歷史III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S71');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S72');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S73');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S2':
						$('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修地理III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S81');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S82');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S83');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S3':
						$('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修公民III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[0]+'-'+'S91');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[0]+'-'+'S92');
						$('#chkY3').val((parseInt(newObj.recent_year)) + '-0' + '-' + grade_ary[1]+'-'+'S93');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
				}
				break;
			case 'gradeH3':
				switch (subject) {
					case 'N1':
						$('#chkY1').siblings().html('必修生物&nbsp;&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修生物I&nbsp;&nbsp;&nbsp;');
						$('#chkY3').siblings().html('選修生物II&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0] + '-' + 'NC');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1] + '-' + 'NB1');
						$('#chkY3').val((parseInt(newObj.recent_year)-1)+'-B'+'-' + grade_ary[1] + '-' + 'NB2');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					//109下冊次調整110上
					//if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}
					case 'N3':
						$('#chkY1').siblings().html('必修地科&nbsp;&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0] + '-' + 'NF');
						$('#chkY2').prop('checked', false);
						$('#chkY2').parent().hide();
						break;
					case 'N4':
						$('#chkY1').siblings().html('必修物理&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修物理I&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0]+'-'+'ND');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'NA1');
						$('#chkY3').siblings().html('選修物理II&nbsp;&nbsp;');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'NA2');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						break;
					case 'N5':
						$('#chkY1').siblings().html('必修化學&nbsp;&nbsp;');
						$('#chkY2').siblings().html('選修化學I&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-0' + '-' + grade_ary[0]+'-'+'NE');
						$('#chkY2').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'N91');
						$('#chkY3').siblings().html('選修化學II&nbsp;&nbsp;');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'N92');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						break;
					case 'M0':
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'0');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-A' + '-' + grade_ary[1]+'-'+'0');
						$('#chkY4').val((parseInt(newObj.recent_year)-1) + '-B' + '-' + grade_ary[1]+'-'+'0');
						$('#chkY5').parent().remove();
						$('#chkY6').parent().remove();
						$('#chkY7').parent().remove();
						$('#chkY8').parent().remove();
						break;

					case 'S1':
						$('#chkY1').siblings().html('必修歷史I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修歷史II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修歷史III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S71');
						$('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S72');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S73');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S2':
						$('#chkY1').siblings().html('必修地理I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修地理II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修地理III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S81');
						$('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S82');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S83');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
					case 'S3':
						$('#chkY1').siblings().html('必修公民I&nbsp;&nbsp;');
						$('#chkY2').siblings().html('必修公民II&nbsp;&nbsp;');
						$('#chkY3').siblings().html('必修公民III&nbsp;&nbsp;');
						$('#chkY1').val((parseInt(newObj.recent_year)-2) + '-A' + '-' + grade_ary[0]+'-'+'S91');
						$('#chkY2').val((parseInt(newObj.recent_year)-2) + '-B' + '-' + grade_ary[0]+'-'+'S92');
						$('#chkY3').val((parseInt(newObj.recent_year)-1) + '-0' + '-' + grade_ary[1]+'-'+'S93');
						$('#chkY4').prop('checked', false);
						$('#chkY4').parent().hide();
						$('#chkY5').prop('checked', false);
						$('#chkY5').parent().hide();
						$('#chkY6').prop('checked', false);
						$('#chkY6').parent().hide();
						$('#chkY7').prop('checked', false);
						$('#chkY7').parent().hide();
						$('#chkY8').prop('checked', false);
						$('#chkY8').parent().hide();
						break;
				}
				break;
		}
	}

});
