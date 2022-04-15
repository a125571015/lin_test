$(function() {
	'use strict';
	var newObj = {};
	init();


	function init() {

		$('#knowledge_ids').val(bs.getUrlVar('knowledge_id'));

		//$("#CustName").val($("#AccountName").val());

		bs.initSelectElement('#select-source-kind', '/admin/quiz/get-spec2-quiz-source-kind', '選擇出處', '-1', '');
		bs.initSelectElement('#select-source-type', '/admin/quiz/get-spec2-quiz-source-type', '選擇來源', '-1', '');
		bs.initSelectElement('#select-quizextension', '/admin/quizpaper/getquizextension', '選擇附檔題型', '-1', '');
		//升私中更動
		getGradeCode();
		getSubjectCode();

		$('#select-grade').on('change', function(e) {
			e.preventDefault();
			getSubjectCode();
			newObj.tblist.draw();
		});

		$('#select-subject').on('change', function(e) {
			e.preventDefault();
			// getGradeCode();
			newObj.tblist.draw();
		});



		// bs.initSelectElement('#select-grade', '/admin/quizpaper/get-spec-grade-code', '選擇年級', '-1', '');
		// bs.initSelectElement('#select-subject', '/admin/quizpaper/get-all-subject-code', '選擇科目', '-1', '');
		bs.initSelectElement('#select-sub-subject', '/admin/quiz/get-all-sub-subject-code', '選擇冊次', '-1', '');
		bs.initSelectElement('#select-status', '/admin/quiz/get-quiz-status', '選擇狀態', '-1', '');
		bs.initSelectElement('#select-reason', '/admin/quiz/get-quiz-close-reason', '選擇停用原因', '-1', '');
		bs.initSelectElement('#select-difficulty', '/admin/quizpaper/getdifficult', '選擇難度', '-1', '');
		bs.initSelectElement('#close-reason', '/admin/quiz/get-quiz-close-reason', '選擇停用原因', '-1', '');

		if (bs.getUrlVar('status')) {
			$('#select-status').val(bs.getUrlVar('status')).trigger('change');
		}

		$('#select-quizcategory').select2({
			theme: 'bootstrap',
			minimumResultsForSearch: Infinity
		});


		bs.initTagElement('#select-tags', '/admin/school/get-school-tag');

		newObj = initObj();

		$('#btn-school-close').on('click', function(e) {
			e.preventDefault();
			var rows_selected = newObj.tblist.column(0).checkboxes.selected();
			if (rows_selected.length == 0) {
				swal('請至少選擇一個班級進行班級結業');
				return false;
			}

			var pid = '';
			$.each(rows_selected, function(key, item) {
				pid += item + '-';
			});
			pid = pid.slice(0, -1);

			location.href = 'schoolclassclose?type=manual&pid=' + pid;
		});

		//匯入音檔隱藏
		// $('#btn-import-mp3').on('click',function (e){
		// 	e.preventDefault();
		// 	if($('#file-upload-mp3').val() == ''){
		// 		alert('請選擇檔案');
		// 		$('#file-upload-mp3').focus();
		// 		return false;
		// 	}
		// 	var formdata = new FormData();
		// 	formdata.append('id',bs.getUrlVar('id'));
		// 	var files = $("#file-upload-mp3").get(0).files;
		// 	if (files.length > 0) {
		// 		formdata.append("file", files[0]);
		// 	}
		//
		//
		// 	$.ajax({
		// 		url:'/admin/quiz/import-mp3',
		// 		data: formdata,
		// 		type: 'POST',
		// 		contentType: false,
		// 		processData: false,
		// 		beforeSend: function() {
		// 			bs.disableSubmits(true);
		// 		},
		// 		success: function(res) {
		// 			bs.disableSubmits(false);
		// 			if(res.message != 'ok'){
		// 				alert(res.message);
		// 			}else{
		// 				swal('匯入完成');
		// 			}
		// 		},
		// 		complete: function() {
		// 			bs.disableSubmits(false);
		// 		},
		// 		error: bs.errorHandler,
		//
		// 	});
		// });

		//啟用
		$('#btn-quiz-active').on('click', function(e) {
			e.preventDefault();
			var rows_selected = newObj.tblist.column(0).checkboxes.selected();
			if (rows_selected.length == 0) {
				swal('尚未選取題目');
				return false;
			}

			var pid = '';
			$.each(rows_selected, function(key, item) {
				pid += item + '-';
			});
			pid = pid.slice(0, -1);

			var dataObj = {};
			dataObj.quiz_id = pid;
			$.ajax({
				url: '/admin/quiz/quiz-active',
				data: JSON.stringify({
					'data': dataObj
				}),
				type: 'POST',
				async: false,
				contentType: 'application/json',
				cache: false,
				success: function(r) {
					if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
						newObj.tblist.ajax.reload(null, false);
						//$('#btn-search').click();
						alert(r.stateinfo);
					}
					if ((r.reurl != '') && (r.reurl !== undefined)) {
						location.href = r.reurl;
					}
				},
				error: bs.errorHandler,
			});
		});

		//停用
		$('#btn-quiz-close').on('click', function(e) {
			e.preventDefault();
			var rows_selected = newObj.tblist.column(0).checkboxes.selected();
			if (rows_selected.length == 0) {
				swal('尚未選取題目');
				return false;
			}

			if ($('#close-reason').val() == '-1') {
				swal('尚未選取停用原因');
				return false;
			}

			var pid = '';
			$.each(rows_selected, function(key, item) {
				pid += item + '-';
			});
			pid = pid.slice(0, -1);

			var dataObj = {};
			dataObj.quiz_id = pid;
			dataObj.reason = $('#close-reason').val();
			$.ajax({
				url: '/admin/quiz/quiz-close',
				data: JSON.stringify({
					'data': dataObj
				}),
				type: 'POST',
				async: false,
				contentType: 'application/json',
				cache: false,
				success: function(r) {
					$('#modal-close').modal('hide');
					if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
						newObj.tblist.ajax.reload(null, false);
						swal(r.stateinfo);
					}
					if ((r.reurl != '') && (r.reurl !== undefined)) {
						location.href = r.reurl;
					}
				},
				error: bs.errorHandler,
			});
		});

	}

	function getGradeName(grade_code) {
		if (grade_code == 'E0') {
			return '國小不分';
		} else if (grade_code == 'J0') {
			return '國中不分';
		} else if (grade_code == 'H0') {
			return '高中不分';
		} else if (grade_code == 'EP') {
			//升私中更動
			return '主題課程';
		} else {
			return grade_code;
		}
	}

	function getSubjectName(subject_code) {

		//升私中更動
		//
		var check_ep=$("#select-grade").val();





		if (subject_code == 'C0') {
			return '國語文';

		} else if (subject_code == 'C1') {
			return '中華文化';
		} else if (subject_code == 'E0') {
			return '英語文';
		}
		//升私中更動
		else if(subject_code == 'E11') {
			return '英語常用單字2000';
		}
		else if(subject_code == 'E12') {
			return '英單字根字首拼圖法';
		}
		else if(subject_code == 'E13') {
			return '英語高頻單字2001~4500';
		}

		else if(subject_code == 'E14') {
			return '英語終極單字4501~7000';
		}


		else if(subject_code == 'E21') {
			return '全民英檢GEPT初級';
		}
		else if(subject_code == 'Z0') {
			return '紫微斗數輕鬆學';
		}
		//
		else if (subject_code == 'M0') {
			return '數學';
		} else if (subject_code == 'N0') {
			return '自然';
		} else if (subject_code == 'N1') {
			return '生物';
		} else if (subject_code == 'N2') {
			return '理化';
		} else if (subject_code == 'N3') {
			return '地科';
		} else if (subject_code == 'N4') {
			return '物理';
		} else if (subject_code == 'N5') {
			return '化學';
		} else if (subject_code == 'S0') {
			return '社會';
		} else if (subject_code == 'S1') {
			return '歷史';
		} else if (subject_code == 'S2') {
			return '地理';
		} else if (subject_code == 'S3') {
			return '公民';

		}
		else {
			return subject_code;
		}
	}

	function getSubSubjectName(subject_code) {
		if (subject_code == 'C0') {
			return '國語文';
		} else if (subject_code == 'C1') {
			return '中華文化';
		} else if (subject_code == 'E0') {
			return '英語文';
		} else if (subject_code == 'M0') {
			return '數學';
		} else if (subject_code == 'M1') {
			return '選修數學(甲)';
		} else if (subject_code == 'M2') {
			return '選修數學(乙)';
		} else if (subject_code == 'N0') {
			return '自然';
		} else if (subject_code == 'N1') {
			return '生物';
		} else if (subject_code == 'N2') {
			return '理化';
		} else if (subject_code == 'N3') {
			return '地科';
		} else if (subject_code == 'N4') {
			return '基礎物理一';
		} else if (subject_code == 'N5') {
			return '基礎化學一';
		} else if (subject_code == 'N6') {
			return '基礎物理二A';
		} else if (subject_code == 'N7') {
			return '基礎物理二B';
		} else if (subject_code == 'N8') {
			return '應用生物';
		} else if (subject_code == 'N9') {
			return '選修化學';
		} else if (subject_code == 'N91') {
			return '選修化學I';
		} else if (subject_code == 'N92') {
			return '選修化學II';
		} else if (subject_code == 'N93') {
			return '選修化學III';
		} else if (subject_code == 'N94') {
			return '選修化學IV';
		} else if (subject_code == 'N95') {
			return '選修化學V';
		} else if (subject_code == 'NA') {
			return '選修物理';
		} else if (subject_code == 'NA1') {
			return '選修物理I';
		} else if (subject_code == 'NA2') {
			return '選修物理II';
		} else if (subject_code == 'NA3') {
			return '選修物理III';
		} else if (subject_code == 'NA4') {
			return '選修物理IV';
		} else if (subject_code == 'NA5') {
			return '選修物理V';
		} else if (subject_code == 'NB') {
			return '選修生物';
		} else if (subject_code == 'NB1') {
			return '選修生物I';
		} else if (subject_code == 'NB2') {
			return '選修生物II';
		} else if (subject_code == 'NB3') {
			return '選修生物III';
		} else if (subject_code == 'NB4') {
			return '選修生物IV';
		} else if (subject_code == 'NC') {
			return '必修生物';
		} else if (subject_code == 'ND') {
			return '必修物理';
		} else if (subject_code == 'NE') {
			return '必修化學';
		} else if (subject_code == 'NF') {
			return '必修地球科學';
		} else if (subject_code == 'NG') {
			return '基礎化學二';
		} else if (subject_code == 'NH') {
			return '基礎化學三';
		} else if (subject_code == 'NI') {
			return '基礎生物';
		} else if (subject_code == 'NJ') {
			return '基礎地球科學';
		} else if (subject_code == 'S0') {
			return '社會';
		} else if (subject_code == 'S1') {
			return '歷史';
		} else if (subject_code == 'S2') {
			return '地理';
		} else if (subject_code == 'S3') {
			return '公民';
		} else if (subject_code == 'S4') {
			return '選修歷史';
		} else if (subject_code == 'S41') {
			return '選修歷史I';
		} else if (subject_code == 'S42') {
			return '選修歷史II';
		} else if (subject_code == 'S43') {
			return '選修歷史III';
		} else if (subject_code == 'S5') {
			return '選修應用地理';
		} else if (subject_code == 'S51') {
			return '選修地理I';
		} else if (subject_code == 'S52') {
			return '選修地理II';
		} else if (subject_code == 'S53') {
			return '選修地理III';
		} else if (subject_code == 'S6') {
			return '選修公民與社會';
		} else if (subject_code == 'S61') {
			return '選修公民I';
		} else if (subject_code == 'S62') {
			return '選修公民II';
		} else if (subject_code == 'S63') {
			return '選修公民III';
		} else if (subject_code == 'S7') {
			return '必修歷史';
		} else if (subject_code == 'S71') {
			return '必修歷史I';
		} else if (subject_code == 'S72') {
			return '必修歷史II';
		} else if (subject_code == 'S73') {
			return '必修歷史III';
		} else if (subject_code == 'S8') {
			return '必修地理';
		} else if (subject_code == 'S81') {
			return '必修地理I';
		} else if (subject_code == 'S82') {
			return '必修地理II';
		} else if (subject_code == 'S83') {
			return '必修地理III';
		} else if (subject_code == 'S9') {
			return '必修公民與社會';
		} else if (subject_code == 'S91') {
			return '必修公民I';
		} else if (subject_code == 'S92') {
			return '必修公民II';
		} else if (subject_code == 'S93') {
			return '必修公民III';
		} else {
			return subject_code;
		}
	}

	function getDifficultyName(difficulty_id) {
		if (difficulty_id == '1') {
			return '易';
		} else if (difficulty_id == '2') {
			return '中偏易';
		} else if (difficulty_id == '3') {
			return '中';
		} else if (difficulty_id == '4') {
			return '中偏難';
		} else if (difficulty_id == '5') {
			return '難';
		} else {
			return '';
		}
	}

	function searchRestricted() {
		//題目文字搜尋先搭配科目篩選
		if($('#quiz_qa_text').val() != '' && $('#select-subject').val() == '-1'){
			swal('使用題目搜尋時，需搭配科目條件');
			return false;
		}

		return true;
	}

	function initObj() {

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
			//"pagingType": "input",//加入跳頁插件
			//==========請求數據start
			'serverSide': true,
			'ajax': {
				'type': 'post',
				'url': '/admin/quiz/get-quiz-list',
				'data': function(data) {
					data.school_id = $('#select-school').val();
					data.grade_code = $('#select-grade').val();
					data.subject_code = $('#select-subject').val();
					data.sub_subject_code = $('#select-sub-subject').val();
					data.school_tag_id = $('#select-tags').val();
					data.check_close = $('input[id=check-close]:checked').val();
					data.knowledge_ids = $('#knowledge_ids').val();
					data.status_code = $('#select-status').val();
					data.quiz_ids = $('#quiz_ids').val();
					data.source_ids = $('#source_ids').val();
					data.update_note = $('#update_note').val();
					data.source_kind_id = $('#select-source-kind').val();
					data.source_type_id = $('#select-source-type').val();
					data.quiz_extension_id=$('#select-quizextension').val();
					data.quiz_category_id = $('#select-quizcategory').val();
					data.quiz_qtype_ids = $('#quiz_qtype_ids').val();
					data.quiz_qa_text = $('#quiz_qa_text').val();
					data.close_reason = $('#select-reason').val();
					data.difficulty = $('#select-difficulty').val();
				}
			},
			'initComplete': function() {

				// // console.log(data.aoData[0]._aData);
				// $('#tbList tbody').on('click', 'tr', function(e){
				//     // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
				//     if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
				//         return;
				//     }
				//     // 連結
				//     var data = newObj.tblist.row(this).data();
				//     location.href = 'view_data?id=' + data[0];
				//
				// });

				$('#select-source-kind').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-source-type').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-quizextension').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-school').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});
				//	升私中更動
				// $('#select-grade').on('change', function(e) {
				// 	e.preventDefault();
				// 	if(!searchRestricted()){return false;}
				// 	newObj.tblist.draw();
				// });
				//
				// $('#select-subject').on('change', function(e) {
				// 	e.preventDefault();
				// 	if(!searchRestricted()){return false;}
				// 	newObj.tblist.draw();
				// });
				// --升中--

				$('#select-sub-subject').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-quizcategory').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-status').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-reason').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-difficulty').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#check-close').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#select-tags').on('change', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				$('#txt-search').on('keypress', function(e) {
					if (e.which == 13) {
						if(!searchRestricted()){return false;}
						newObj.tblist.draw();
					}
				});

				$('#btn-search').on('click', function(e) {
					e.preventDefault();
					if(!searchRestricted()){return false;}
					newObj.tblist.draw();
				});

				// 跳至頁面上面的新增按紐之寫法
				// $('#btn-goto').on('click', function(e) {
				// 	e.preventDefault();
				// 	var page=$('#gotopage').val();
				// 	//alert(pg);
				// 	if (page =='0'){
				// 		swal('頁數不可為零');
				// 		return false;
				// 	}
				// 	if(page ==''){
				// 		swal('請輸入頁數');
				// 		return false;
				// 	}
				// 	var re = /^\d+$/;
				// 	if (re.test(page) == false) {
				// 		swal('頁數必須為數字');
				// 		return false;
				// 	}
				// 	var pageInfo = newObj.tblist.page.info();
				// 	var maxPage = pageInfo.pages;
				// 	if (page>maxPage){
				// 		swal ('超過最大頁數');
				// 		return false;
				// 	}
				// 	//因為是抓index所以page要減1去收尋
				// 	page=parseInt(page)-1;
				// 	newObj.tblist.page(page).draw(false);
				// });



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

				newObj.tblist.rows().every(function() {
					var item = this.data();
					item[1] = '<a target="_blank" href="/admin/quiz/quiz_view_data?qid=' + item[1] + '">' + item[1] + '</a>';

					item[3] = getGradeName(item[3]);
					item[4] = getSubjectName(item[4]);
					item[5] = getSubSubjectName(item[5]);
					item[8] = getDifficultyName(item[8]);

					// var tags = item[4];
					// var newTags = '';
					// if (tags) {
					//     var tagAry = tags.split(';');
					//     $.each(tagAry, function(key, item) {
					//         newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
					//     });
					// }
					// item[4]=newTags;
					//invalidate the data DataTables has cached for this row

					var status = item[10];
					if (status == '1') {
						item[10] = '啟用';
					} else {
						item[10] = '<font color="red">停用</font>';
					}


					if ((item[13] == '1970-01-01') || (item[13] == '1970-01-01 00:00:00') || (item[13] == '1970-01-01 08:00:00')) {
						item[13] = '';
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
				'targets': [0, 2], // column or columns numbers
				'orderable': false, // set orderable for selected columns
			}],
			'select': {
				'style': 'multi'
			},
		});

		return newObj;
	}
});


//升私中更動
function getGradeCode() {
	var dataObj = {};
	// dataObj.type = 'coursevideo';
	$.ajax({
		url: '/admin/quizpaper/get-spec-grade-code',
		type: 'post',
		data: dataObj,
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

function getSubjectCode() {
	var dataObj = {};
	// dataObj.type = 'coursevideo';
	dataObj.grade_code=$('#select-grade').val();
	$.ajax({
		url: '/admin/quizpaper/get-all-subject-code',
		type: 'post',
		data: dataObj,
		success: function(res) {
			$('#select-subject option').remove();
			$('#select-subject').append('<option value="-1">選擇科目</option>');

			var check_ep='';
			check_ep=$('#select-grade').find('option:selected').val();





			$.each(res, function(key, item) {

				$('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
				//

			});

			$('#select-subject').select2({
				theme: "bootstrap",
				minimumResultsForSearch: Infinity
			});
		},
		error: bs.errorHandler
	});
}
//--升私中--