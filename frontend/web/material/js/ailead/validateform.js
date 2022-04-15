/*
文 件 名：ValidateForm.js
函 數 名：validateForm
函數功能：驗證提交的表單
調用方法：<onSubmit="return validateForm(this.formElementName,'validateType','validateCondition')">，參數長度不限
變量釋義：
變量名 含義
i,j 循環計數變量
vc_min,vc_max 最小值、最大值
vObj validate object,要驗證的對象
vType validate type,驗證類型
vCon validate condition,驗證條件
vShow validate condition,顯示訊息
eNum error number,錯誤數量
eMsg error message,錯誤信息
cItemNum checked item number,選中項目數
fErrMsg final error message,最終顯示給用戶看的錯誤信息
re regular expression,正則表達式
驗證類型：
代碼 含義
FitRegEx 必須完全匹配「用戶自定義的正則表達式」
AntiRegEx 不能出現「匹配用戶自定義的正則表達式的字串」
NotBlank 不可為空
IsNumeric 數字
IsInt 整數
IsEmail 郵件地址
IsPlainText 純文本，不能包含HTML代碼
LengthRange 字符長度範圍
NumericRange 數字大小範圍
IsEqualTo 確認項（如密碼）和第一次輸入的是否相等
CheckLimit 選中多少項
SelectValid 選中有效項
*/


function validateForm() {
    var i, j, vObj, vType, vCon, vShow, eNum = 0, eMsg = '', cItemNum = 0, fErrMsg = '', re;
    var args = validateForm.arguments;
    for (i = 0; i < (args.length - 2); i += 4) {
        vObj = args[i];
        vType = args[i + 1];
        vCon = args[i + 2];
        vShow = args[i + 3];
        switch (vType) {
            case 'FitRegEx':
                re = vCon;
                if (vObj.value.search(re) != 0) {
                    ENum++;
                    eMsg += genErrMsg('', vObj, '的值不符合要求');
                }
                break;

            case 'AntiRegEx':
                re = vCon;
                if (vObj.value.search(re) >= 0) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '的值不可以包含[ ' + re + ' ]');
                }
                break;

            case 'NotBlank':
                if (vObj.value == '') {
                    eNum++;
                    eMsg += genErrMsg('請輸入', vObj, '');
                }
                break;

            case 'IsNumeric':
                if (isNaN(vObj.value) || vObj.value == '') {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '必須為數字');
                }
                break;

            case 'IsNumeric2':
                if (isNaN(vObj.value)) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '必須為數字');
                }
                break;

            case 'IsInt':
                re = /^[0-9]+$/;
                if (vObj.value.search(re) != 0 || vObj.value.substring(0, 1) == 0) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '必須為整數');
                }
                break;

            case 'IsEmail':
                re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                if (vObj.value.search(re) != 0) {

                    if (vObj.value.search(re) != 0) {
                        eNum++;
                        eMsg += genErrMsg('', vObj, '不是有效Email地址');
                    }
                }
                break;

            case 'IsPlainText':
                re = /<[a-zA-Z]+[^>]*>/;
                if (vObj.value.search(re) >= 0) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '不是純文字，含有HTML標籤');
                }
                break;

            case 'IsDate':
                var s = vObj.value;
                year = s.substring(0, s.indexOf("/"));
                s = s.substring(s.indexOf("/") + 1, s.length);
                month = s.substring(0, s.indexOf("/"));
                day = s.substring(s.indexOf("/") + 1, s.length);

                if (vObj.value.length < 8 ||
                    vObj.value == '' ||
                    (isNaN(year)) ||
                    (isNaN(month)) ||
                    (isNaN(day)) ||
                    (month < 1 || month > 12) ||
                    (day < 1 || day > 31)
                ) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '不是正確日期格式');
                }

                break;

            case 'LengthRange':
                vc_min = parseFloat(vCon.substring(0, vCon.indexOf("to")));
                vc_max = parseFloat(vCon.substring(vCon.indexOf("to") + 2));
                if (vObj.value.length < vc_min || vObj.value.length > vc_max) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '的長度不在指定範圍內，長度需大於' + vc_min);
                }
                break;

            case 'NumericRange':
                vc_min = parseFloat(vCon.substring(0, vCon.indexOf("to")));
                vc_max = parseFloat(vCon.substring(vCon.indexOf("to") + 2));
                if (vObj.value < vc_min || vObj.value > vc_max) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '的值不在 ' + vc_min + '-' + vc_max + ' 的指定範圍內');
                }
                break;

            case 'IsEqualTo':
                if (vObj.value != vCon.value) {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '和第一次輸入的不相等');
                }
                break;

            case 'IsEqualText':
                if (vObj.value == vCon ) {
                    //alert(vCon);
                    eNum++;
                    eMsg += genErrMsg('', vObj, '與預設值相同');
                }
                break;

            case 'CheckLimit':
                vc_min = parseFloat(vCon.substring(0, vCon.indexOf("to")));
                vc_max = parseFloat(vCon.substring(vCon.indexOf("to") + 2));
                if (vc_max == -1)//vc_max=-1表示沒有上限
                {
                    vc_max = vObj.length;
                }
                for (j = 0; j < vObj.length; j++) {
                    if (vObj[j].checked) {
                        cItemNum++;
                    }
                }
                if (cItemNum < vc_min || cItemNum > vc_max) {
                    eNum++;
                    eMsg += genErrMsg('', vObj[0], '的選中項目數不在指定範圍內');
                }
                break;

            case 'SelectValid':
                if (vObj.value == '' || vObj.value == '-1') {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '沒有選中有效項');
                }
                break;

            case 'SelectValid2':
                if (vObj.value == '' || vObj.value == '0' || vObj.value == '-1') {
                    eNum++;
                    eMsg += genErrMsg('', vObj, '沒有選中有效項');
                }
                break;
        }

    }

    if (eNum) {
        //fErrMsg = '抱歉，您提交的數據存在' + eNum + '處錯誤:\n';
        //fErrMsg += '==============================\n';
        fErrMsg += eMsg;
        //fErrMsg += '==============================\n';
        //fErrMsg += '\n請修改後再提交，謝謝！';

        if (vShow != '') {
            alert(vShow);
        } else {
            alert(fErrMsg);
        }
        if (eNum == 1) { vObj.focus(); }
        return false;
    }

    return true;
}




function genErrMsg(eTimes, vObj, eType) {
    eMsg = eTimes + ' [ ' + vObj.title + ' ] ' + eType + '\n';
    //eMsg = ' [ ' + vObj.title + ' ] ' + eType + '。\n';
    return eMsg;
}


function wopen(url, name, width, height, k) {
    LeftPosition = (screen.width) ? (screen.width - width) / 2 : 0;
    TopPosition = (screen.availHeight) ? (screen.availHeight - height) / 2 : 0;
    window.open(url, name, 'top=' + TopPosition + ',left=' + LeftPosition + ',width=' + width + ',height=' + height + ',resizable=0,scrollbars=' + k + ',status=0');
}

function Print() {
    window.print();
}


function isLeapYear(year) {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            return (year % 400 == 0);
        } else {
            return (true);
        }
    }
    return (false);
}

function daysInMonth(month, year) {
    switch (month) {
        case 0: return 31;  // january
        case 1:             // february
            if (isLeapYear(year)) {
                return 29;
            } else {
                return 28;
            }
        case 2: return 31;  // march
        case 3: return 30;  // april
        case 4: return 31;  // may
        case 5: return 30;  // june
        case 6: return 31;  // july
        case 7: return 31;  // august
        case 8: return 30;  // september
        case 9: return 31;  // october
        case 10: return 30;  // november
        case 11: return 31;  // december
    }
}

function DateAdd(datepart, number, date) {
    var d = new Date(date);
    switch (datepart) {
        // millisecond
        case "ms":
            return new Date(Date.parse(d) + (number));

        // second
        case "s":
        case "ss":
            return new Date(Date.parse(d) + (number * 1000));

        // minute
        case "n":
        case "mi":
            return new Date(Date.parse(d) + (number * 1000 * 60));

        // hour
        case "hh":
            return new Date(Date.parse(d) + (number * 1000 * 60 * 60));

        // day
        case "d":
        case "dd":
            return new Date(Date.parse(d) + (number * 1000 * 60 * 60 * 24));

        // week
        case "wk":
        case "ww":
            return new Date(Date.parse(d) + (number * 1000 * 60 * 60 * 24 * 7));

        // month
        case "m":
        case "mm":
            var i = 0;
            var maxcurr = daysInMonth(d.getMonth(), d.getFullYear());
            var mm = (d.getMonth() + number) % 12;
            if (mm < 0) mm += 12;
            var yy = d.getFullYear() + Math.floor((number + d.getMonth()) / 12);
            var maxnext = daysInMonth(mm, yy);
            if (maxnext < d.getDate()) {
                i = (maxnext - d.getDate());
            }
            if (d.getDate() == maxcurr) {
                i = (maxnext - maxcurr);
            }
            return new Date(
                d.getFullYear(),
                d.getMonth() + number * 1,
                d.getDate() + i,
                d.getHours(),
                d.getMinutes(),
                d.getSeconds());

        // quarter
        case "q":
        case "qq":
            var i = 0;
            var maxcurr = daysInMonth(d.getMonth(), d.getFullYear());
            var mm = (d.getMonth() + number * 3) % 12;
            if (mm < 0) mm += 12;
            var yy = d.getFullYear() + Math.floor((number * 3 + d.getMonth()) / 12);
            var maxnext = daysInMonth(mm, yy);
            if (maxnext < d.getDate()) {
                i = (maxnext - d.getDate());
            }
            if (d.getDate() == maxcurr) {
                i = (maxnext - maxcurr);
            }
            return new Date(
                d.getFullYear(),
                d.getMonth() + number * 3,
                d.getDate() + i,
                d.getHours(),
                d.getMinutes(),
                d.getSeconds());

        // year
        case "yy":
        case "yyyy":
            var i = 0;
            if (d.getMonth() == 1) {
                if (d.getDate() == 29) {
                    if (!isLeapYear(d.getFullYear() + number)) {
                        i = -1;
                    }
                }
                if (d.getDate() == 28) {
                    if (!isLeapYear(d.getFullYear())) {
                        if (isLeapYear(d.getFullYear() + number)) {
                            i = 1;
                        }
                    }
                }
            }
            return new Date(
                d.getFullYear() + number * 1,
                d.getMonth(),
                d.getDate() + i,
                d.getHours(),
                d.getMinutes(),
                d.getSeconds());
    }
}

function validateNumber() {
    var var1, var2, eMsg;
    var args = validateNumber.arguments;
    var1 = args[0];
    var2 = args[1];
    eMsg = args[2];

    if (var1 >= var2) {
        alert(eMsg);
        vObj = args[0];
        vObj.focus();
        return false;
    }
    return true;
}


function validateTime() {
    var _date_beg, _date_end, eMsg;
    var args = validateTime.arguments;
    vObj = args[0];
    _date_beg = vObj.value.substring(0, 4) + vObj.value.substring(5, 7) + vObj.value.substring(8, 10);
    vObj = args[1];
    _date_end = vObj.value.substring(0, 4) + vObj.value.substring(5, 7) + vObj.value.substring(8, 10);
    eMsg = args[2];

    if (_date_beg >= _date_end) {
        alert(eMsg);
        vObj = args[0];
        vObj.focus();
        return false;
    }
    return true;
}

function formatDate(sDate) {
    var sScrap = "";
    var dScrap = new Date(sDate);
    if (dScrap == "NaN") return sScrap;

    iDay = dScrap.getDate();
    if (iDay < 10) { iDay = "0" + iDay; }
    iMon = dScrap.getMonth();
    iMon = (iMon + 1);
    if (iMon < 10) { iMon = "0" + iMon; }
    iYea = dScrap.getFullYear();

    sScrap = iYea + "/" + iMon + "/" + iDay;
    return sScrap;
}

//==========  數學運算  ==========
function adv_format(value, num) //四捨五入
{
    var a_str = formatnumber(value, num);
    var a_int = parseFloat(a_str);
    if (value.toString().length > a_str.length) {
        var b_str = value.toString().substring(a_str.length, a_str.length + 1)
        var b_int = parseFloat(b_str);
        if (b_int < 5) {
            return a_str
        }
        else {
            var bonus_str, bonus_int;
            if (num == 0) {
                bonus_int = 1;
            }
            else {
                bonus_str = "0."
                for (var i = 1; i < num; i++)
                    bonus_str += "0";
                bonus_str += "1";
                bonus_int = parseFloat(bonus_str);
            }
            a_str = formatnumber(a_int + bonus_int, num)
        }
    }
    return a_str
}

function formatnumber(value, num) //直接去尾
{
    var a, b, c, i
    a = value.toString();
    b = a.indexOf('.');
    c = a.length;
    if (num == 0) {
        if (b != -1)
            a = a.substring(0, b);
    }
    else {
        if (b == -1) {
            a = a + ".";
            for (i = 1; i <= num; i++)
                a = a + "0";
        }
        else {
            a = a.substring(0, b + num + 1);
            for (i = c; i <= b + num; i++)
                a = a + "0";
        }
    }
    return a
}


function checkRadio(name, strmsg) {
    for (var i = 0, j = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked != true) {
            j++;
        }
    }
    if (j == document.getElementsByName(name).length) {
        alert(strmsg);
        return false;
    }
    else {
        return true;
    }
}

function checkBox(name, strmsg) {
    for (var i = 0, j = 0; i < document.getElementsByName(name).length; i++) {
        if (document.getElementsByName(name)[i].checked != true) {
            j++;
        }
    }
    if (j == document.getElementsByName(name).length) {
        alert(strmsg);
        return false;
    }
    else {
        return true;
    }
}


