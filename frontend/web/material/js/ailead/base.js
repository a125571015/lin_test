bs = {};
(function(bs) {
	'use strict';
	var _bs = bs;
	_bs.disableSubmits = disableSubmits;
	_bs.errorHandler = errorHandler;
	_bs.formatNumber = formatNumber;
	_bs.getUrlVar = getUrlVar;
	_bs.initSelectElement = initSelectElement;
	_bs.initTagElement = initTagElement;
	_bs.fullChar2halfChar = fullChar2halfChar;
	_bs.isNumber = isNumber;
	_bs.isEmail = isEmail;
	_bs.getFullDate = getFullDate;
	_bs.numToAlphabet = numToAlphabet;
	_bs.findObjectByKey = findObjectByKey;
	_bs.findIndexByKey = findIndexByKey;
	_bs.findIndexAryByKey = findIndexAryByKey;
	_bs.numberConvertToUppercase = numberConvertToUppercase;
	_bs.isChina = isChina;
	_bs.native2ascii = native2ascii;
	_bs.ascii2native = ascii2native;
	_bs.getNormalGrade = getNormalGrade;
	_bs.getRelatedGrade = getRelatedGrade;
	_bs.getGradeText = getGradeText;
	_bs.getBookCode = getBookCode;
	_bs.getRecentYear = getRecentYear;
	_bs.getAudioHtml = getAudioHtml;
	_bs.getBtnAudioHtml = getBtnAudioHtml;
	_bs.getHidemp4BtnHtml=getHidemp4BtnHtml;
	_bs.setAudioPlay = setAudioPlay;
	_bs.clearAllSetTimeOut = clearAllSetTimeOut;
	_bs.clearAllSetInterval = clearAllSetInterval;
	_bs.sendQuizAskContent = sendQuizAskContent;

	//送出資料時block住畫面
	function disableSubmits(type) {
		if (type) {
			$.blockUI({
				message: '請稍候...'
			});

		} else {
			$.unblockUI();
		}
	}

	//ajax錯誤處理
	function errorHandler(jqXHR, exception) {
		if (jqXHR.status === 401) {
			location.href = '/auth/login';
		} else if (jqXHR.status == 404) {
			alert('Requested page not found. [404]');
		} else if (jqXHR.status == 500) {
			alert('Internal Server Error [500].');
		} else if (jqXHR.status == 0) {
			console.error(exception, jqXHR);
		} else if (exception === 'parsererror') {
			alert('Requested JSON parse failed.');
		} else if (exception === 'timeout') {
			alert('Time out error.');
		} else if (exception === 'abort') {
			alert('Ajax request aborted.');
		} else {
			alert('Uncaught Error.\n' + jqXHR.responseText);
		}
	}

	//格式化數字
	function formatNumber(number) {
		if (number > 0) {
			number = number.toFixed(2) + '';
			x = number.split('.');
			x1 = x[0];
			//x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1;
		} else {
			return '0';
		}
	}

	//取出指定key的querystring
	function getUrlVar(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return result && decodeURIComponent(result[1]) || "";
	}

	//初始化Select
	function initSelectElement(AElement, AUrl, AName, AValue, ASetValue, ASkipValue) {
		$.ajax({
			url: AUrl,
			type: 'post',
			async: false,
			cache: false,
			success: function(res) {
				$(AElement + ' option').remove();
				if (AName != '') {
					$(AElement).append('<option value="' + AValue + '">' + AName + '</option>');
				}
				$.each(res, function(key, item) {
					if (item.id) {
						if (ASkipValue != item.id) {
							$(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
						}
					} else if (item.code) {
						if (ASkipValue != item.code) {
							$(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
						}
					}
				});
				$(AElement).select2({
					theme: 'bootstrap',
					minimumResultsForSearch: Infinity
				});

				if (ASetValue != '') {
					$(AElement).val(ASetValue).trigger('change');
				}
			},
			error: errorHandler
		});
	}

	//初始化Tag
	function initTagElement(AElement, AUrl, AParameter, ASetValue) {
		$.ajax({
			url: AUrl,
			type: 'post',
			async: false,
			cache: false,
			data: AParameter,
			success: function(res) {
				$(AElement + ' option').remove();
				$.each(res, function(key, item) {
					if (item.id) {
						$(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
					} else if (item.code) {
						$(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
					}
				});
				$(AElement).select2({
					theme: 'bootstrap',
					placeholder: {
						id: '-1',
						text: '選擇標籤'
					},
					tags: true,
					language: 'zh-TW'
				});
				if ((ASetValue != '') && (ASetValue != null)) {
					$(AElement).val(JSON.parse(ASetValue)).trigger('change');
				}
			},
			error: errorHandler
		});
	}

	//將全型轉半型
	function fullChar2halfChar(obj) {
		var text = obj.value;
		var asciiTable = "!\"#$%&\’()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
		var big5Table = "%uFF01%u201D%uFF03%uFF04%uFF05%uFF06%u2019%uFF08%uFF09%uFF0A%uFF0B%uFF0C%uFF0D%uFF0E%uFF0F%uFF10%uFF11%uFF12%uFF13%uFF14%uFF15%uFF16%uFF17%uFF18%uFF19%uFF1A%uFF1B%uFF1C%uFF1D%uFF1E%uFF1F%uFF20%uFF21%uFF22%uFF23%uFF24%uFF25%uFF26%uFF27%uFF28%uFF29%uFF2A%uFF2B%uFF2C%uFF2D%uFF2E%uFF2F%uFF30%uFF31%uFF32%uFF33%uFF34%uFF35%uFF36%uFF37%uFF38%uFF39%uFF3A%uFF3B%uFF3C%uFF3D%uFF3E%uFF3F%u2018%uFF41%uFF42%uFF43%uFF44%uFF45%uFF46%uFF47%uFF48%uFF49%uFF4A%uFF4B%uFF4C%uFF4D%uFF4E%uFF4F%uFF50%uFF51%uFF52%uFF53%uFF54%uFF55%uFF56%uFF57%uFF58%uFF59%uFF5A%uFF5B%uFF5C%uFF5D%uFF5E";
		var result = "";

		for (var i = 0; i < text.length; i++) {
			var val = escape(text.charAt(i));
			var j = big5Table.indexOf(val);
			result += (((j > -1) && (val.length == 6)) ? asciiTable.charAt(j / 6) : text.charAt(i));
		}
		obj.value = result;
	}

	//判斷是不是數字
	function isNumber(value) {
		return !Number.isNaN(Number(value));
	}

	//判斷是不是Email
	function isEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	//取得西元日
	function getFullDate() {
		const _year = new Date().getFullYear();
		const _month = ("0" + (new Date().getMonth() + 1).toString()).slice(-2);
		const _date = ("0" + new Date().getDate()).slice(-2);
		const _hour = ('0' + new Date().getHours()).slice(-2);
		const _minute = ('0' + new Date().getMinutes()).slice(-2);
		const _second = ('0' + new Date().getSeconds()).slice(-2);

		var fullDate = {
			year: _year,
			month: _month,
			date: _date,
			hour: _hour,
			minute: _minute,
			second: _second
		}
		return fullDate;
	}

	//數字轉英文
	function numToAlphabet(num) {
		var s = ''
		while (num > 0) {
			var m = num % 26
			if (m === 0) m = 26
			s = (m + 9).toString(36) + s
			num = (num - m) / 26
		}
		return s.toUpperCase()
	}

	//取得物件陣列中的元素
	function findObjectByKey(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return array[i];
			}
		}
		return null;
	}

	//取得物件陣列中的索引
	function findIndexByKey(array, key, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return i;
			}
		}
		return null;
	}

	//取得物件陣列中的所有索引，並重組一個索引陣列
	function findIndexAryByKey(array, key, value) {
		var array = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				array.push(i);
			}
		}
		return array;
	}

	//小寫數字轉換成大寫,只處理到0~99
	function numberConvertToUppercase(num) {
		num = Number(num);
		var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '萬', '億'];
		var length = String(num).length;
		if (length == 1) {
			return upperCaseNumber[num];
		} else if (length == 2) {
			if (num == 10) {
				return upperCaseNumber[num];
			} else if (num > 10 && num < 20) {
				return '十' + upperCaseNumber[String(num).charAt(1)];
			} else {
				return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
			}
		}
	}

	function isChina(s) {
		var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		if (!patrn.exec(s)) {
			return false;
		} else {
			return true;
		}
	}

	function native2ascii() {
		var character = document.getElementById("characterTa").value.split("");
		var ascii = "";
		for (var i = 0; i < character.length; i++) {
			var code = Number(character[i].charCodeAt(0));
			if (!document.getElementById("ignoreLetter").checked || code > 127) {
				var charAscii = code.toString(16);
				charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
				ascii += "\\u" + charAscii
			} else {
				ascii += character[i];
			}
		};
		document.getElementById("asciiTa").value = ascii;
	};

	function ascii2native() {
		var character = document.getElementById("asciiTa").value.split("\\u");
		var native = character[0];
		for (var i = 1; i < character.length; i++) {
			var code = character[i];
			native += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
			if (code.length > 4) {
				native += code.substring(4, code.length);
			}
		};
		document.getElementById("characterTa").value = native;
	}

	function getNormalGrade(sel_grade) {
		var normal_grade = '';
		switch (sel_grade) {
			case 'E0':
			case 'E1':
			case 'E2':
			case 'E3':
			case 'E4':
			case 'E5':
			case 'E6':
				normal_grade = 'E0';
				break;
			case 'EP':
				normal_grade = 'EP';
				break;
			case 'J0':
			case 'J1':
			case 'J2':
			case 'J3':
				normal_grade = 'J0';
				break;
			case 'H0':
			case 'H1':
			case 'H2':
			case 'H3':
				normal_grade = 'H0';
				break;
			default:
				normal_grade = '-1';
				break;
		}
		return normal_grade;
	}

	function getRelatedGrade(grade_code) {
		var grade_ary = [];

		switch (grade_code) {
			case 'E1':
				grade_ary = ['E1'];
				break;
			case 'E2':
				grade_ary = ['E2'];
				break;
			case 'E3':
				grade_ary = ['E3'];
				break;
			case 'E4':
				grade_ary = ['E4'];
				break;
			case 'E5':
				grade_ary = ['E5'];
				break;
			case 'E6':
				grade_ary = ['E6'];
				break;
			case 'EP':
				grade_ary = ['EP'];
				break;
			case 'J1':
				grade_ary = ['J1'];
				break;
			case 'J2':
				grade_ary = ['J1', 'J2'];
				break;
			case 'J3':
				grade_ary = ['J1', 'J2', 'J3'];
				break;
			case 'H1':
				grade_ary = ['H1'];
				break;
			case 'H2':
				grade_ary = ['H1', 'H2'];
				break;
			case 'H3':
				grade_ary = ['H1', 'H2', 'H3'];
				break;
			default:
				grade_ary = ['J1'];
				break;
		}

		return grade_ary;
	}

	function getGradeText(grade_code) {

		var grade_text = '';

		switch (grade_code) {
			case 'E1':
				grade_text = '小一';
				break;
			case 'E2':
				grade_text = '小二';
				break;
			case 'E3':
				grade_text = '小三';
				break;
			case 'E4':
				grade_text = '小四';
				break;
			case 'E5':
				grade_text = '小五';
				break;
			case 'E6':
				grade_text = '小六';
				break;
			default:
				grade_text = '小一';
				break;
		}

		return grade_text;
	}

	function getBookCode(text_year, grade_code, subject_code, term_code,page_mode=null) {

		var book_obj = {};

		switch (grade_code) {
			case 'H1':
				switch (subject_code) {
					case 'C0':
					case 'E0':
						switch (term_code) {
							case 'A':
								book_obj.book_code = '0';
								book_obj.book_name = '高一上';
								break;
							case 'B':
								book_obj.book_code = '0';
								book_obj.book_name = '高一下';
								break;
						}
						break;
					case 'S1':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高一上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高一下';
									break;
							}
						} else {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'S71';
									book_obj.book_name = '必修歷史I';
									break;
								case 'B':
									book_obj.book_code = 'S72';
									book_obj.book_name = '必修歷史II';
									break;
							}
						}
						break;
					case 'S2':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高一上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高一下';
									break;
							}
						} else {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'S81';
									book_obj.book_name = '必修地理I';
									break;
								case 'B':
									book_obj.book_code = 'S82';
									book_obj.book_name = '必修地理II';
									break;
							}
						}
						break;
					case 'S3':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高一上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高一下';
									break;
							}
						} else {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'S91';
									book_obj.book_name = '必修公民I';
									break;
								case 'B':
									book_obj.book_code = 'S92';
									book_obj.book_name = '必修公民II';
									break;
							}
						}
						break;
					case 'N1':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'NI';
									book_obj.book_name = '基礎生物上';
									break;
								case 'B':
									book_obj.book_code = 'NI';
									book_obj.book_name = '基礎生物下';
									break;
							}
						} else {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'NC';
									book_obj.book_name = '必修生物';
									break;
							}
						}
						break;
					case 'N3':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'NJ';
									book_obj.book_name = '基礎地科上';
									break;
								case 'B':
									book_obj.book_code = 'NJ';
									book_obj.book_name = '基礎地科下';
									break;
							}
						} else {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'NF';
									book_obj.book_name = '必修地科';
									break;
							}
						}
						break;
					case 'N4':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'N4';
									book_obj.book_name = '基礎物理一';
									break;
							}
						} else {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'ND';
									book_obj.book_name = '必修物理';
									break;
							}
						}
						break;
					case 'N5':
						if (parseInt(text_year) < 108) {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'N5';
									book_obj.book_name = '基礎化學一';
									break;
							}
						} else {
							switch (term_code) {
								case '0':
									book_obj.book_code = 'NE';
									book_obj.book_name = '必修化學';
									break;
							}
						}
						break;
					case 'M0':
						switch (term_code) {
							case 'A':
								book_obj.book_code = '0';
								book_obj.book_name = '高一上';
								break;
							case 'B':
								book_obj.book_code = '0';
								book_obj.book_name = '高一下';
								break;
						}
						break;
				}
				break;
			case 'H2':
				switch (subject_code) {
					case 'C0':
					case 'E0':
						switch (term_code) {
							case 'A':
								book_obj.book_code = '0';
								book_obj.book_name = '高二上';
								break;
							case 'B':
								book_obj.book_code = '0';
								book_obj.book_name = '高二下';
								break;
						}
						break;
					case 'S1':
						if (parseInt(text_year) < 109) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							if (page_mode=="videoplus"){
								switch (term_code) {


									case 'B':
										book_obj.book_code = 'S72';
										book_obj.book_name = '必修歷史II';
										break;


									case '0':
										book_obj.book_code = 'S73';
										book_obj.book_name = '必修歷史III';
										break;
								}
							}else{
								switch (term_code) {

									//學習歷程學習紀錄會重複所以隱藏
									// case 'B':
									// 	book_obj.book_code = 'S72';
									// 	book_obj.book_name = '必修歷史II';
									// 	break;


									case '0':
										book_obj.book_code = 'S73';
										book_obj.book_name = '必修歷史III';
										break;
								}
							}

						}
						break;
					case 'S2':
						if (parseInt(text_year) < 109) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							if (page_mode=="videoplus"){
								switch (term_code) {

									case 'B':
										book_obj.book_code = 'S82';
										book_obj.book_name = '必修地理II';
										break;

									case '0':
										book_obj.book_code = 'S83';
										book_obj.book_name = '必修地理III';
										break;
								}
							}
							else{
								switch (term_code) {
									//學習歷程學習紀錄會重複所以隱藏
									// case 'B':
									// 	book_obj.book_code = 'S82';
									// 	book_obj.book_name = '必修地理II';
									// 	break;

									case '0':
										book_obj.book_code = 'S83';
										book_obj.book_name = '必修地理III';
										break;
								}
							}

						}
						break;
					case 'S3':
						if (parseInt(text_year) < 109) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							if (page_mode=="videoplus"){
								switch (term_code) {

									case 'B':
										book_obj.book_code = 'S92';
										book_obj.book_name = '必修公民II';
										break;

									case '0':
										book_obj.book_code = 'S93';
										book_obj.book_name = '必修公民III';
										break;
								}
							}
							else{
								switch (term_code) {

									//學習歷程學習紀錄會重複所以隱藏
									// case 'B':
									// 	book_obj.book_code = 'S92';
									// 	book_obj.book_name = '必修公民II';
									// 	break;

									case '0':
										book_obj.book_code = 'S93';
										book_obj.book_name = '必修公民III';
										break;
								}
							}

						}
						break;
					case 'N1':
						if (parseInt(text_year) < 109){
							switch (term_code) {
								case '0':
									book_obj.book_code = 'N8';
									book_obj.book_name = '應用生物';
									break;
							}
						}else{
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'NB1';
									book_obj.book_name = '選修生物I';
									break;
								case 'B':
									book_obj.book_code = 'NB2';
									book_obj.book_name = '選修生物II';
									break;
							}
						}
						break;
					//暫時不用	地科會自動判斷不用在多冊次
					case 'N3':
						if (parseInt(text_year) < 109) {
							switch (term_code) {
								// do nothing
								//這樣會多冊次先影藏
								// case 'A':
								// 	book_obj.book_code = 'NJ';
								// 	book_obj.book_name = '基礎地科上';
								// 	break;
								// case 'B':
								// 	book_obj.book_code = 'NJ';
								// 	book_obj.book_name = '基礎地科下';
								// 	break;
							}
						} else {
							if (page_mode=="videoplus") {
								switch (term_code) {

									case '0':
										book_obj.book_code = 'NF';
										book_obj.book_name = '必修地科';
										break;


								}
							}
							//do nothing
						}
						break;
					case 'N4':
						if (parseInt(text_year) < 109){
							switch (term_code) {
								case '0':
									book_obj.book_code = 'N6';
									book_obj.book_name = '基礎物理二A';
									break;
								case 'A':
									book_obj.book_code = 'N7';
									book_obj.book_name = '基礎物理二B上';
									break;
								case 'B':
									book_obj.book_code = 'N7';
									book_obj.book_name = '基礎物理二B下';
									break;
							}
						}else{
							switch (term_code) {
								case '0':
									book_obj.book_code = 'NA1';
									book_obj.book_name = '選修物理I';
									break;
								case 'A':
									book_obj.book_code = 'NA2'
									book_obj.book_name = '選修物理II';
									break;
							}
						}
						break;
					case 'N5':
						if (parseInt(text_year) < 109){
							switch (term_code) {
								case '0':
									book_obj.book_code = 'NG';
									book_obj.book_name = '基礎化學二';
									break;
								case 'B':
									book_obj.book_code = 'NH';
									book_obj.book_name = '基礎化學三';
									break;
							}
						}else{
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'N92';
									book_obj.book_name = '選修化學II';
									break;
								case '0':
									book_obj.book_code = 'N91';
									book_obj.book_name = '選修化學I';
									break;
							}
						}
						break;
					case 'M0':
						switch (term_code) {
							case 'A':
								book_obj.book_code = '0';
								book_obj.book_name = '高二上';
								break;
							case 'B':
								book_obj.book_code = '0';
								book_obj.book_name = '高二下';
								break;
						}
						break;
				}
				break;
			case 'H3':
				switch (subject_code) {
					case 'C0':
					case 'E0':
						switch (term_code) {
							case 'A':
								book_obj.book_code = '0';
								book_obj.book_name = '高三上';
								break;
							case 'B':
								book_obj.book_code = '0';
								book_obj.book_name = '高三下';
								break;
						}
						break;
					case 'S1':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							switch (term_code) {
								//暫時不用
							}
						}
						break;
					case 'S2':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							switch (term_code) {
								//暫時不用
							}
						}
						break;
					case 'S3':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高二上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高二下';
									break;
							}
						} else {
							switch (term_code) {
								//暫時不用

							}
						}
						break;
					case 'N1':
						if (parseInt(text_year) < 110){
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'NB';
									book_obj.book_name = '選修生物上';
									break;
								case 'B':
									book_obj.book_code = 'NB';
									book_obj.book_name = '選修生物下';
									break;
							}
						}else{
							//暫時沒有
						}

						break;
					//暫時不用	地科會自動判斷不用在多冊次
					case 'N3':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								// case 'A':
								// 	book_obj.book_code = 'NJ';
								// 	book_obj.book_name = '基礎地科上';
								// 	break;
								// case 'B':
								// 	book_obj.book_code = 'NJ';
								// 	book_obj.book_name = '基礎地科下';
								// 	break;
							}
						} else {
							if (page_mode=="videoplus") {
								switch (term_code) {
									case '0':
										book_obj.book_code = 'NF';
										book_obj.book_name = '必修地科';
										break;
								}
							}
						}
						break;
					case 'N4':
						if (parseInt(text_year) < 110){
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'NA';
									book_obj.book_name = '選修物理上';
									break;
								case 'B':
									book_obj.book_code = 'NA';
									book_obj.book_name = '選修物理下';
									break;
							}
						}else{
							//暫時沒有
						}

						break;
					case 'N5':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'N9';
									book_obj.book_name = '選修化學上';
									break;
								case 'B':
									book_obj.book_code = 'N9';
									book_obj.book_name = '選修化學下';
									break;
							}}else{
							//暫時沒有
						}
						break;
					case 'M0':
						if (parseInt(text_year) < 110) {
							switch (term_code) {
								case 'A':
									book_obj.book_code = 'M1';
									book_obj.book_name = '選修數學(甲)上';
									break;
								case 'B':
									book_obj.book_code = 'M1';
									book_obj.book_name = '選修數學(甲)下';
									break;
							}

						} else {
							switch (term_code) {
								case 'A':
									book_obj.book_code = '0';
									book_obj.book_name = '高三上';
									break;
								case 'B':
									book_obj.book_code = '0';
									book_obj.book_name = '高三下';
									break;
							}
						}
						break;


				}
				break;
		}
		// 正式站與測試站校正更動 用域名去判斷
		var check_location=location.host;
		// if (check_location=='ailead365.localhost.com' || check_location=='accuagile.ailead365.com'){}else{}



		return book_obj;
	}

	function getRecentYear() {
		//升級要調整的年度-升級時把if else去掉
		var check_location=location.host;
		return 110;
		//if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com'){}else{}


	}

	function getAudioHtml(o) {
		var inner_html = '';

		var audio_id = o.id;
		var audio_src = o.src;

		inner_html += '<audio id="' + audio_id + '" controlslist="nodownload" style="display:none">';
		inner_html += '	<source src="' + audio_src + '" type="audio/mpeg" />';
		inner_html += '</audio>';

		return inner_html;
	}

	function getBtnAudioHtml(o) {
		var inner_html = '';

		var btn_css = o.btn_css;
		var btn_for = o.btn_for;
		var btn_text = o.btn_text;
		var btn_qid=o.btn_qid;
		var btn_m3u8=o.btn_m3u8;


		inner_html += '<button type="button" qid="'+btn_qid+'" m3u8="'+btn_m3u8+'" class="btn btn-primary ' + btn_css + '" for="' + btn_for + '">' + btn_text + '</button> ';

		return inner_html;
	}
    function getHidemp4BtnHtml(o){
		var inner_html = '';

		var btn_css = o.btn_css;
		var btn_for = o.btn_for;
		var btn_text = o.btn_text;
		var btn_qid=o.btn_qid;
		var btn_m3u8=o.btn_m3u8;

		inner_html += '<button type="button" qid="'+btn_qid+'" m3u8="'+btn_m3u8+'" class="btn btn-primary ' + btn_css + '" for="' + btn_for + '">' + btn_text + '</button> ';

		return inner_html;
	}
	function setAudioPlay(o) {

		var audio_id = o.id;
		var btn_dom = o.btn_dom;
		var btn_text = o.btn_text;

		var audio = document.getElementById(audio_id);

		var myInterval = setInterval(function() {
			if (audio.ended) {
				clearInterval(myInterval);
				$(btn_dom).text(btn_text);
				audio.pause();
			}
		}, 500);

		if (audio.paused) {
			$(btn_dom).text('暫停');
			audio.play();
		} else {
			$(btn_dom).text(btn_text);
			audio.pause();
		}
	}

	function clearAllSetTimeOut() {
		var highestTimeoutId = setTimeout(";");
		for (var i = 0; i < highestTimeoutId; i++) {
			clearTimeout(i);
		}
	}

	function clearAllSetInterval() {
		var highestIntervalId = setInterval(";");
		for (var i = 0; i < highestIntervalId; i++) {
			clearInterval(i);
		}
	}

	function sendQuizAskContent(o){
        var dataObj={};
		dataObj.tid=o.tid;
        dataObj.rid=o.rid;
        dataObj.qid=o.qid;
        dataObj.ask_content=o.ask_content;
        dataObj.kind=o.kind;
        $.ajax({
          url: '/admin/exam/send-quiz-ask-content',
          type: 'POST',
          data: dataObj,
		  beforeSend: function() {
			  bs.disableSubmits(true);
		  },
          success: function (res) {
			  bs.disableSubmits(false);
              var msg=res.message;
              if (msg!='success') {
            	  swal(msg);
                  return false;
              }
			  else {
			  	  swal('你的發問已經送出。');
			  }
          },
		  complete: function() {
			  bs.disableSubmits(false);
		  },
          error: bs.errorHandler
        });
    }

})(bs);
