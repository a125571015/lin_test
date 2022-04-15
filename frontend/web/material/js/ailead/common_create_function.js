//取得冊次名稱初始設定
export function getRecentYear(newObj) {

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

//冊次變化初始設定
export function showChkYear(grade_id,newObj) {
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


export function getGradeCode() {

    $.ajax({
        url: '/admin/quizpaper/get-grade-code',
        type: 'post',
        success: function(res) {
            //step3
            $('#select-grade option').remove();
            $('#select-grade').append('<option value="-1">選擇年級</option>');
            $.each(res, function(key, item) {
                $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
            });
            $('#select-grade').select2({
                theme: "bootstrap",
                minimumResultsForSearch: Infinity
            });

            //step4
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

export function getAuthor() {
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

export function getQuizpaperTag() {
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
            // manualcreate step6 fastcteate levelcreate step4
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

export function getRange() {
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

export function getCountrange() {
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
