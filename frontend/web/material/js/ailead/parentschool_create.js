$(function() {
    'use strict';

    function get_school_role() {
        var array = [];
        array.push({
            Allow_knowhow      :      ($('input[name="Allow_knowhow"]:checked').val() == '1'? 1: 0),
            Allow_FrontEnd_View:      ($('input[name="Allow_FrontEnd_View"]:checked').val() == '1'? 1: 0),
            Allow_FrontEnd_Edit:      ($('input[name="Allow_FrontEnd_Edit"]:checked').val() == '1'? 1: 0),
            Allow_School_System:      ($('input[name="Allow_School_System"]:checked').val() == '1'? 1: 0),
            Allow_Order_Shopping:     ($('input[name="Allow_Order_Shopping"]:checked').val() == '1'? 1: 0),
            Allow_E0:                 ($('input[name="Allow_E0"]:checked').val() == '1'? 1: 0),
            Allow_E0_CourseVideo:     ($('input[name="Allow_E0_CourseVideo"]:checked').val() == '1'? 1: 0),
            Allow_E0_ExtraVideo:      ($('input[name="Allow_E0_ExtraVideo"]:checked').val() == '1'? 1: 0),
            Allow_EP:                 ($('input[name="Allow_EP"]:checked').val() == '1'? 1: 0),
            Allow_EP_CourseVideo:     ($('input[name="Allow_EP_CourseVideo"]:checked').val() == '1'? 1: 0),
            Allow_EP_ExtraVideo:      ($('input[name="Allow_EP_ExtraVideo"]:checked').val() == '1'? 1: 0),
            Allow_J0:                 ($('input[name="Allow_J0"]:checked').val() == '1'? 1: 0),
            Allow_J0_CourseVideo:     ($('input[name="Allow_J0_CourseVideo"]:checked').val() == '1'? 1: 0),
            Allow_J0_ExtraVideo:      ($('input[name="Allow_J0_ExtraVideo"]:checked').val() == '1'? 1: 0),
            Allow_H0:                 ($('input[name="Allow_H0"]:checked').val() == '1'? 1: 0),
            Allow_H0_CourseVideo:     ($('input[name="Allow_H0_CourseVideo"]:checked').val() == '1'? 1: 0),
            Allow_H0_ExtraVideo:      ($('input[name="Allow_H0_ExtraVideo"]:checked').val() == '1'? 1: 0),
            Allow_ET:      			  ($('input[name="Allow_ET"]:checked').val() == '1'? 1: 0),
            Allow_P0:                 ($('input[name="Allow_P0"]:checked').val()=='1'? 1:0 ),
            Allow_E0C0_Max:           parseInt($('#Allow_E0C0_Max').val()),
            Allow_E0E0_Max:           parseInt($('#Allow_E0E0_Max').val()),
            Allow_E0M0_Max:           parseInt($('#Allow_E0M0_Max').val()),
            Allow_E0N0_Max:           parseInt($('#Allow_E0N0_Max').val()),
            Allow_E0S0_Max:           parseInt($('#Allow_E0S0_Max').val()),
            Allow_EPC0_Max:           parseInt($('#Allow_EPC0_Max').val()),
            Allow_EPE0_Max:           parseInt($('#Allow_EPE0_Max').val()),
            Allow_EPM0_Max:           parseInt($('#Allow_EPM0_Max').val()),
            Allow_EPN0_Max:           parseInt($('#Allow_EPN0_Max').val()),
            Allow_EPS0_Max:           parseInt($('#Allow_EPS0_Max').val()),
            Allow_EPE11_Max:           parseInt($('#Allow_EPE11_Max').val()),
            Allow_EPE12_Max:           parseInt($('#Allow_EPE12_Max').val()),
            Allow_EPE13_Max:           parseInt($('#Allow_EPE13_Max').val()),
            Allow_EPE14_Max:           parseInt($('#Allow_EPE14_Max').val()),
            Allow_EPE21_Max:           parseInt($('#Allow_EPE21_Max').val()),
            Allow_EPZ0_Max:           parseInt($('#Allow_EPZ0_Max').val()),
            Allow_J0C0_Max:           parseInt($('#Allow_J0C0_Max').val()),
            Allow_J0E0_Max:           parseInt($('#Allow_J0E0_Max').val()),
            Allow_J0M0_Max:           parseInt($('#Allow_J0M0_Max').val()),
            Allow_J0N0_Max:           parseInt($('#Allow_J0N0_Max').val()),
            Allow_J0S0_Max:           parseInt($('#Allow_J0S0_Max').val()),
            Allow_H0C0_Max:           parseInt($('#Allow_H0C0_Max').val()),
            Allow_H0E0_Max:           parseInt($('#Allow_H0E0_Max').val()),
            Allow_H0M0_Max:           parseInt($('#Allow_H0M0_Max').val()),
            Allow_H0N1_Max:           parseInt($('#Allow_H0N1_Max').val()),
            Allow_H0N3_Max:           parseInt($('#Allow_H0N3_Max').val()),
            Allow_H0N4_Max:           parseInt($('#Allow_H0N4_Max').val()),
            Allow_H0N5_Max:           parseInt($('#Allow_H0N5_Max').val()),
            Allow_H0S1_Max:           parseInt($('#Allow_H0S1_Max').val()),
            Allow_H0S2_Max:           parseInt($('#Allow_H0S2_Max').val()),
            Allow_H0S3_Max:           parseInt($('#Allow_H0S3_Max').val()),
            Allow_ET_Max:             parseInt($('#Allow_ET_Max').val()),
            //Allow_P0_Max:             parseInt($('#Allow_P0_Max').val()),
            //分科影片權限更動
            Allow_E0C0_CourseVideo_Max: parseInt($('#Allow_E0C0_CourseVideo_Max').val()),
            Allow_E0E0_CourseVideo_Max: parseInt($('#Allow_E0E0_CourseVideo_Max').val()),
            Allow_E0M0_CourseVideo_Max: parseInt($('#Allow_E0M0_CourseVideo_Max').val()),
            Allow_E0N0_CourseVideo_Max: parseInt($('#Allow_E0N0_CourseVideo_Max').val()),
            Allow_E0S0_CourseVideo_Max: parseInt($('#Allow_E0S0_CourseVideo_Max').val()),
            Allow_EPC0_CourseVideo_Max: parseInt($('#Allow_EPC0_CourseVideo_Max').val()),
            Allow_EPE0_CourseVideo_Max: parseInt($('#Allow_EPE0_CourseVideo_Max').val()),
            Allow_EPM0_CourseVideo_Max: parseInt($('#Allow_EPM0_CourseVideo_Max').val()),
            Allow_EPN0_CourseVideo_Max: parseInt($('#Allow_EPN0_CourseVideo_Max').val()),
            Allow_EPS0_CourseVideo_Max: parseInt($('#Allow_EPS0_CourseVideo_Max').val()),
            Allow_EPE11_CourseVideo_Max: parseInt($('#Allow_EPE11_CourseVideo_Max').val()),
            Allow_EPE12_CourseVideo_Max: parseInt($('#Allow_EPE12_CourseVideo_Max').val()),
            Allow_EPE13_CourseVideo_Max: parseInt($('#Allow_EPE13_CourseVideo_Max').val()),
            Allow_EPE14_CourseVideo_Max: parseInt($('#Allow_EPE14_CourseVideo_Max').val()),
            Allow_EPE21_CourseVideo_Max: parseInt($('#Allow_EPE21_CourseVideo_Max').val()),
            Allow_EPZ0_CourseVideo_Max: parseInt($('#Allow_EPZ0_CourseVideo_Max').val()),
            Allow_J0C0_CourseVideo_Max: parseInt($('#Allow_J0C0_CourseVideo_Max').val()),
            Allow_J0E0_CourseVideo_Max: parseInt($('#Allow_J0E0_CourseVideo_Max').val()),
            Allow_J0M0_CourseVideo_Max: parseInt($('#Allow_J0M0_CourseVideo_Max').val()),
            Allow_J0N0_CourseVideo_Max: parseInt($('#Allow_J0N0_CourseVideo_Max').val()),
            Allow_J0S0_CourseVideo_Max: parseInt($('#Allow_J0S0_CourseVideo_Max').val()),
            Allow_H0C0_CourseVideo_Max: parseInt($('#Allow_H0C0_CourseVideo_Max').val()),
            Allow_H0E0_CourseVideo_Max: parseInt($('#Allow_H0E0_CourseVideo_Max').val()),
            Allow_H0M0_CourseVideo_Max: parseInt($('#Allow_H0M0_CourseVideo_Max').val()),
            Allow_H0N1_CourseVideo_Max: parseInt($('#Allow_H0N1_CourseVideo_Max').val()),
            Allow_H0N4_CourseVideo_Max: parseInt($('#Allow_H0N4_CourseVideo_Max').val()),
            Allow_H0N5_CourseVideo_Max: parseInt($('#Allow_H0N5_CourseVideo_Max').val()),
            Allow_H0N3_CourseVideo_Max: parseInt($('#Allow_H0N3_CourseVideo_Max').val()),
            Allow_H0S2_CourseVideo_Max: parseInt($('#Allow_H0S2_CourseVideo_Max').val()),
            Allow_H0S1_CourseVideo_Max: parseInt($('#Allow_H0S1_CourseVideo_Max').val()),
            Allow_H0S3_CourseVideo_Max: parseInt($('#Allow_H0S3_CourseVideo_Max').val())
            // E0C0_IsCourseVideo: ($('input[name="E0C0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // E0E0_IsCourseVideo: ($('input[name="E0E0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // E0M0_IsCourseVideo: ($('input[name="E0M0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // E0N0_IsCourseVideo: ($('input[name="E0N0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // E0S0_IsCourseVideo: ($('input[name="E0S0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // J0C0_IsCourseVideo: ($('input[name="J0C0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // J0E0_IsCourseVideo: ($('input[name="J0E0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // J0M0_IsCourseVideo: ($('input[name="J0M0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // J0N0_IsCourseVideo: ($('input[name="J0N0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // J0S0_IsCourseVideo: ($('input[name="J0S0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0C0_IsCourseVideo: ($('input[name="H0C0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0E0_IsCourseVideo: ($('input[name="H0E0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0M0_IsCourseVideo: ($('input[name="H0M0_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0N1_IsCourseVideo: ($('input[name="H0N1_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0N3_IsCourseVideo: ($('input[name="H0N3_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0N4_IsCourseVideo: ($('input[name="H0N4_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0N5_IsCourseVideo: ($('input[name="H0N5_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0S1_IsCourseVideo: ($('input[name="H0S1_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0S2_IsCourseVideo: ($('input[name="H0S2_IsCourseVideo"]:checked').val() == '1' ? 1 : 0),
            // H0S3_IsCourseVideo: ($('input[name="H0S3_IsCourseVideo"]:checked').val() == '1' ? 1 : 0)
        });
        var role = JSON.stringify(array);
        role = role.replace('[', '');
        role = role.replace(']', '');
        return role;
    }
    function get_ep_start_at_role() {
        var ep_start_at_array = [];
        ep_start_at_array.push({
            EPC0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPC0_stime').val()).getTime() / 1000):'',
            EPE0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE0_stime').val()).getTime() / 1000):'',
            EPM0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPM0_stime').val()).getTime() / 1000):'',
            EPN0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPN0_stime').val()).getTime() / 1000):'',
            EPS0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPS0_stime').val()).getTime() / 1000):'',
            EPE11_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE11_stime').val()).getTime() / 1000):'',
            EPE12_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE12_stime').val()).getTime() / 1000):'',
            EPE13_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE13_stime').val()).getTime() / 1000):'',
            EPE14_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE14_stime').val()).getTime() / 1000):'',
            EPE21_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE21_stime').val()).getTime() / 1000):'',
            EPZ0_stime:  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPZ0_stime').val()).getTime() / 1000):'',



        });
        var get_ep_start_at_role = JSON.stringify(ep_start_at_array);
        get_ep_start_at_role = get_ep_start_at_role.replace('[', '');
        get_ep_start_at_role = get_ep_start_at_role.replace(']', '');
        return get_ep_start_at_role;

    }
    function get_ep_end_at_role() {
        var ep_end_at_array = [];
        ep_end_at_array.push({
            EPC0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPC0_etime').val()).getTime() / 1000)+86399:'',
            EPE0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE0_etime').val()).getTime() / 1000)+86399:'',
            EPM0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPM0_etime').val()).getTime() / 1000)+86399:'',
            EPN0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPN0_etime').val()).getTime() / 1000)+86399:'',
            EPS0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPS0_etime').val()).getTime() / 1000)+86399:'',
            EPE11_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE11_etime').val()).getTime() / 1000)+86399:'',
            EPE12_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE12_etime').val()).getTime() / 1000)+86399:'',
            EPE13_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE13_etime').val()).getTime() / 1000)+86399:'',
            EPE14_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE14_etime').val()).getTime() / 1000)+86399:'',
            EPE21_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPE21_etime').val()).getTime() / 1000)+86399:'',
            EPZ0_etime : ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#EPZ0_etime').val()).getTime() / 1000)+86399:''
        });
        var get_ep_end_at_role = JSON.stringify(ep_end_at_array);
        get_ep_end_at_role = get_ep_end_at_role.replace('[', '');
        get_ep_end_at_role = get_ep_end_at_role.replace(']', '');
        return get_ep_end_at_role;

    }
    function change_timestamp_to_datetime(timestamp){
        var time =new Date(timestamp*1000);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var finish_date=year+'/'+month+'/'+date;
        return finish_date;
    }


    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.school-data-view').hide();
        $('.school-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url:  '/admin/school/get-parentschool-data',
            data: JSON.stringify({ 'data': dataObj }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r != '[]') && (r != '')) {
                    // view
                    $('[data-field="name"]').html(r[0].name);
                    $('[data-field="viewname"]').html(r[0].viewname);
                    $('[data-field="phone"]').html(r[0].phone);
                    $('[data-field="domain"]').html(r[0].domain);
                    $('[data-field="address"]').html(r[0].address);
					$('[data-field="date-stime"]').html(r[0].start_at);
					$('[data-field="date-etime"]').html(r[0].end_at);
					//主題課程開始結束日期已棄用
					//$('[data-field="date-ep-stime"]').html(r[0].ep_start_at!=0?r[0].ep_start_at:'');
					//$('[data-field="date-ep-etime"]').html(r[0].ep_end_at!=0?r[0].ep_end_at:'');
                    $('[data-field="is_sun"]').html((r[0].is_sun==1)?'允許開放':'');
                    $('[data-field="is_paper"]').html((r[0].is_paper==1)?'允許開放':'');
                    $('[data-field="is_sendpaper_manual"]').html((r[0].is_sendpaper_manual==1)?'允許開放':'');
                    $('[data-field="is_ask"]').html((r[0].is_ask==1)?'允許開放':'');
                    $('[data-field="schoolclass_count"]').html('<a href="/admin/schoolclass/index?school_id='+r[0].schoolclass_count+'">'+r[0].schoolclass_count+'</a>');
                    $('[data-field="student_count"]').html('<a href="/admin/student/index?school_id='+r[0].student_count+'">'+r[0].student_count+'</a>');
                    $('[data-field="need-serialno"]').html((r[0].is_serialno == '1')? '學生進入班級需要輸入序號' : '學生直接進入班級使用');
                    //ep_start_at_2
                    var ep_start_at_2_role=JSON.parse(r[0].ep_start_at_2);
                    var ep_end_at_2_role=JSON.parse(r[0].ep_end_at_2);

                    var school_role = JSON.parse(r[0].school_role);
                    var tmpHTML;

                    tmpHTML = '';
                    tmpHTML += (school_role.Allow_knowhow == 1 ? '允許開放' : '');

                    $('[data-field="school_role_knowhow"]').html(tmpHTML);



                    tmpHTML = '';
                    tmpHTML += (school_role.Allow_FrontEnd_View == 1 ? '前台網頁顯示；' : '');
                    tmpHTML += (school_role.Allow_FrontEnd_Edit == 1 ? '後台網頁設定；' : '');


                    $('[data-field="school_role_other"]').html(tmpHTML);
                    tmpHTML = '';
                    tmpHTML += (school_role.Allow_School_System == 1 ? '校務系統；' : '');
                    tmpHTML += (school_role.Allow_Order_Shopping == 1 ? '訂購平台；' : '');
                    $('[data-field="school_ui_role"]').html(tmpHTML);


                    //分科影片權限更動
                    tmpHTML = '';
                    if (school_role.Allow_E0 == 1 ||school_role.Allow_E0_CourseVideo==1) {
                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小內容；' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小教育影片；' : '');
                        tmpHTML += (school_role.Allow_E0_ExtraVideo == 1 ? '國小自派影片；' : '');
                        tmpHTML += '<br>';
                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小國文：'+school_role.Allow_E0C0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小國文教學影片：'+school_role.Allow_E0C0_CourseVideo_Max+'<br>' : '');


                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小英文：'+school_role.Allow_E0E0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小英文教學影片：'+school_role.Allow_E0E0_CourseVideo_Max+'<br>' : '');
                        //tmpHTML += (school_role.Allow_E0 == 1 ? '國小英文自派影片：'+school_role.Allow_E0E0_ExtraVideo_Max+'<br>' : '');

                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小數學：'+school_role.Allow_E0M0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小數學教學影片：'+school_role.Allow_E0M0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小自然：'+school_role.Allow_E0N0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小自然教學影片：'+school_role.Allow_E0N0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0 == 1 ? '國小社會：'+school_role.Allow_E0S0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_E0_CourseVideo == 1 ? '國小社會教學影片：'+school_role.Allow_E0S0_CourseVideo_Max+'<br>' : '');


                    }
                    $('[data-field="school_role_E0"]').html(tmpHTML);

                    tmpHTML = '';
                    if (school_role.Allow_EP == 1 ||school_role.Allow_EP_CourseVideo==1) {
                        //ep_start_at_2
                        tmpHTML += (school_role.Allow_EP == 1 ? '主題課程內容；' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '主題課程教育影片；' : '');
                        tmpHTML += (school_role.Allow_EP_ExtraVideo == 1 ? '主題課程自派影片；' : '');
                        tmpHTML += '<br>';
                        tmpHTML += (school_role.Allow_EP == 1 ? '升私中國文：'+school_role.Allow_EPC0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '升私中國文教學影片：'+school_role.Allow_EPC0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPC0_stime != '' ? '升私中國文開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPC0_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPC0_etime !='' ? '升私中國文結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPC0_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '升私中英文：'+school_role.Allow_EPE0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '升私中英文教學影片：'+school_role.Allow_EPE0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE0_stime != '' ? '升私中英文開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE0_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE0_etime !='' ? '升私中英文結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE0_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '國小資優數學：'+school_role.Allow_EPM0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '國小資優數學教學影片：'+school_role.Allow_EPM0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPM0_stime != '' ? '國小資優數學開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPM0_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPM0_etime !='' ? '國小資優數學結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPM0_etime)+'<br>' : '');
                        //tmpHTML += (school_role.Allow_EP == 1 ? '升私中自然：'+school_role.Allow_EPN0_Max+'<br>' : '');
                        //tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '升私中自然教學影片：'+school_role.Allow_EPN0_CourseVideo_Max+'<br>' : '');
                        //tmpHTML += (ep_start_at_2_role.EPN0_stime != '' ? '升私中自然開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPN0_stime)+'<br>' : '');
                        //tmpHTML += (ep_end_at_2_role.EPN0_etime !='' ? '升私中自然結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPN0_etime)+'<br>' : '');
                        //tmpHTML += (school_role.Allow_EP == 1 ? '升私中社會：'+school_role.Allow_EPS0_Max+'<br>' : '');
                        //tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '升私中社會教學影片：'+school_role.Allow_EPS0_CourseVideo_Max+'<br>' : '');
                        //tmpHTML += (ep_start_at_2_role.EPS0_stime != '' ? '升私中社會開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPS0_stime)+'<br>' : '');
                        //tmpHTML += (ep_end_at_2_role.EPS0_etime !='' ? '升私中社會結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPS0_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '英語常用單字2000：'+school_role.Allow_EPE11_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '英語常用單字2000教學影片：'+school_role.Allow_EPE11_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE11_stime != '' ? '英語常用單字2000開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE11_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE11_etime !='' ? '英語常用單字2000結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE11_etime)+'<br>' : '');

                        tmpHTML += (school_role.Allow_EP == 1 ? '英語高頻單字2001~4500：'+school_role.Allow_EPE13_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '英語高頻單字2001~4500教學影片：'+school_role.Allow_EPE13_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE13_stime != '' ? '英語高頻單字2001~4500開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE13_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE13_etime !='' ? '英語高頻單字2001~4500結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE13_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '英語終極單字4501~7000：'+school_role.Allow_EPE14_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '英語終極單字4501~7000教學影片：'+school_role.Allow_EPE14_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE14_stime != '' ? '英語終極單字4501~7000開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE14_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE14_etime !='' ? '英語終極單字4501~7000結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE14_etime)+'<br>' : '');

                        tmpHTML += (school_role.Allow_EP == 1 ? '英單字根字首拼圖法：'+school_role.Allow_EPE12_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '英單字根字首拼圖法教學影片：'+school_role.Allow_EPE12_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE12_stime != '' ? '英單字根字首拼圖法開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE12_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE12_etime !='' ? '英單字根字首拼圖法結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE12_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '全民英檢GEPT初級:'+school_role.Allow_EPE21_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '全民英檢GEPT初級教學影片:'+school_role.Allow_EPE21_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPE21_stime != '' ? '全民英檢GEPT初級開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPE21_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPE21_etime !='' ? '全民英檢GEPT初級結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPE21_etime)+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP == 1 ? '紫微斗數輕鬆學:'+school_role.Allow_EPZ0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_EP_CourseVideo == 1 ? '紫微斗數輕鬆學教學影片:'+school_role.Allow_EPZ0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (ep_start_at_2_role.EPZ0_stime != '' ? '紫微斗數輕鬆學開始日期：'+change_timestamp_to_datetime(ep_start_at_2_role.EPZ0_stime)+'<br>' : '');
                        tmpHTML += (ep_end_at_2_role.EPZ0_etime !='' ? '紫微斗數輕鬆學級結束日期：'+change_timestamp_to_datetime(ep_end_at_2_role.EPZ0_etime)+'<br>' : '');



                    }
                    $('[data-field="school_role_EP"]').html(tmpHTML);

                    tmpHTML = '';
                    if (school_role.Allow_J0 == 1 ||school_role.Allow_J0_CourseVideo==1) {
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中內容；' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中教育影片；' : '');
                        tmpHTML += (school_role.Allow_J0_ExtraVideo == 1 ? '國中自派影片；' : '');
                        tmpHTML += '<br>';
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中國文：'+school_role.Allow_J0C0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中國文教學影片：'+school_role.Allow_J0C0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中英文：'+school_role.Allow_J0E0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中英文教學影片：'+school_role.Allow_J0E0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中數學：'+school_role.Allow_J0M0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中數學教學影片：'+school_role.Allow_J0M0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中自然：'+school_role.Allow_J0N0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中自然教學影片：'+school_role.Allow_J0N0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0 == 1 ? '國中社會：'+school_role.Allow_J0S0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_J0_CourseVideo == 1 ? '國中社會教學影片：'+school_role.Allow_J0S0_CourseVideo_Max+'<br>' : '');
                    }
                    $('[data-field="school_role_J0"]').html(tmpHTML);

                    tmpHTML = '';
                    if (school_role.Allow_H0 == 1 ||school_role.Allow_H0_CourseVideo==1 ) {
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中內容；' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中教育影片；' : '');
                        tmpHTML += (school_role.Allow_H0_ExtraVideo == 1 ? '高中自派影片；' : '');
                        tmpHTML += '<br>';
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中國文：'+school_role.Allow_H0C0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中國文教學影片：'+school_role.Allow_H0C0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中英文：'+school_role.Allow_H0E0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中英文教學影片：'+school_role.Allow_H0E0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中數學：'+school_role.Allow_H0M0_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中數學教學影片：'+school_role.Allow_H0M0_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中生物：'+school_role.Allow_H0N1_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中生物教學影片：'+school_role.Allow_H0N1_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中物理：'+school_role.Allow_H0N4_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中物理教學影片：'+school_role.Allow_H0N4_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中化學：'+school_role.Allow_H0N5_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中化學教學影片：'+school_role.Allow_H0N5_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中地球科學：'+school_role.Allow_H0N3_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中地球科學教學影片：'+school_role.Allow_H0N3_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中地理：'+school_role.Allow_H0S2_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中地理教學影片：'+school_role.Allow_H0S2_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中歷史：'+school_role.Allow_H0S1_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中歷史教學影片：'+school_role.Allow_H0S1_CourseVideo_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0 == 1 ? '高中公民：'+school_role.Allow_H0S3_Max+'<br>' : '');
                        tmpHTML += (school_role.Allow_H0_CourseVideo == 1 ? '高中公民教學影片：'+school_role.Allow_H0S3_CourseVideo_Max+'<br>' : '');
                    }
                    $('[data-field="school_role_H0"]').html(tmpHTML);

					tmpHTML = '';
                    if (school_role.Allow_ET == 1) {
                        tmpHTML += (school_role.Allow_ET == 1 ? '允許MyET' : '');
						tmpHTML += '<br>';
                        tmpHTML += (school_role.Allow_H0 == 1 ? 'MyET英文：'+school_role.Allow_ET_Max+'<br>' : '');
					}
					$('[data-field="school_role_ET"]').html(tmpHTML);

                    tmpHTML ='';
                    if (school_role.Allow_P0 ==1){
                        tmpHTML += (school_role.Allow_P0 == 1 ? '允許安親' : '');
                        // tmpHTML += '<br>';
                        // tmpHTML += (school_role.Allow_P0 == 1 ? '安親：'+school_role.Allow_P0_Max+'<br>' : '');
                    }
                    $('[data-field="school_role_P0"]').html(tmpHTML);

                    // edit
                    $('#name').val(r[0].name);
                    $('#viewname').val(r[0].viewname);
                    $('#phone').val(r[0].phone);
                    $('#domain').val(r[0].domain);
                    $('#address').val(r[0].address);
                    $('#date-stime').val(r[0].start_at);
                    $('#date-etime').val(r[0].end_at);
                    //$('#date-ep-stime').val(r[0].ep_start_at!=0?r[0].ep_start_at:'');
                    //$('#date-ep-etime').val(r[0].ep_end_at!=0?r[0].ep_end_at:'');
                    $('#EPC0_stime').val(ep_start_at_2_role.EPC0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPC0_stime):'');
                    $('#EPE0_stime').val(ep_start_at_2_role.EPE0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE0_stime):'');
                    $('#EPM0_stime').val(ep_start_at_2_role.EPM0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPM0_stime):'');
                    $('#EPN0_stime').val(ep_start_at_2_role.EPN0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPN0_stime):'');
                    $('#EPS0_stime').val(ep_start_at_2_role.EPS0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPS0_stime):'');
                    $('#EPE11_stime').val(ep_start_at_2_role.EPE11_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE11_stime):'');
                    $('#EPE13_stime').val(ep_start_at_2_role.EPE13_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE13_stime):'');
                    $('#EPE14_stime').val(ep_start_at_2_role.EPE14_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE14_stime):'');
                    $('#EPE12_stime').val(ep_start_at_2_role.EPE12_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE12_stime):'');
                    $('#EPE21_stime').val(ep_start_at_2_role.EPE21_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPE21_stime):'');
                    $('#EPZ0_stime').val(ep_start_at_2_role.EPZ0_stime!=''?change_timestamp_to_datetime(ep_start_at_2_role.EPZ0_stime):'');

                    $('#EPC0_etime').val(ep_end_at_2_role.EPC0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPC0_etime):'');
                    $('#EPE0_etime').val(ep_end_at_2_role.EPE0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE0_etime):'');
                    $('#EPM0_etime').val(ep_end_at_2_role.EPM0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPM0_etime):'');
                    $('#EPN0_etime').val(ep_end_at_2_role.EPN0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPN0_etime):'');
                    $('#EPS0_etime').val(ep_end_at_2_role.EPS0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPS0_etime):'');
                    $('#EPE11_etime').val(ep_end_at_2_role.EPE11_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE11_etime):'');
                    $('#EPE13_etime').val(ep_end_at_2_role.EPE13_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE13_etime):'');
                    $('#EPE14_etime').val(ep_end_at_2_role.EPE14_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE14_etime):'');
                    $('#EPE12_etime').val(ep_end_at_2_role.EPE12_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE12_etime):'');
                    $('#EPE21_etime').val(ep_end_at_2_role.EPE21_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPE21_etime):'');
                    $('#EPZ0_etime').val(ep_end_at_2_role.EPZ0_etime!=''?change_timestamp_to_datetime(ep_end_at_2_role.EPZ0_etime):'');


					$('#is_sun').prop('checked', (r[0].is_sun == 1 ? true : false));
                    $('#is_paper').prop('checked', (r[0].is_paper == 1 ? true : false));
                    $('#is_sendpaper_manual').prop('checked', (r[0].is_sendpaper_manual == 1 ? true : false));
                    $('#is_ask').prop('checked', (r[0].is_ask == 1 ? true : false));
                    $('.no-edit').empty().html((r[0].is_serialno == '1')? '學生進入班級需要輸入序號' : '學生直接進入班級使用');   //不可修改的區域顯示訊息

                    $('#Allow_knowhow').prop('checked', (school_role.Allow_knowhow == 1 ? true : false));
                    $('#Allow_FrontEnd_View').prop('checked', (school_role.Allow_FrontEnd_View == 1 ? true : false));
                    $('#Allow_FrontEnd_Edit').prop('checked', (school_role.Allow_FrontEnd_Edit == 1 ? true : false));

                    $('#Allow_School_System').prop('checked', (school_role.Allow_School_System == 1 ? true : false));
                    $('#Allow_Order_Shopping').prop('checked', (school_role.Allow_Order_Shopping == 1 ? true : false));


                    $('#Allow_E0').prop('checked', (school_role.Allow_E0 == 1 ? true : false));
                    $('#Allow_E0_CourseVideo').prop('checked', (school_role.Allow_E0_CourseVideo == 1 ? true : false));
                    $('#Allow_E0_ExtraVideo').prop('checked', (school_role.Allow_E0_ExtraVideo == 1 ? true : false));
                    $('#Allow_EP').prop('checked', (school_role.Allow_EP == 1 ? true : false));
                    $('#Allow_EP_CourseVideo').prop('checked', (school_role.Allow_EP_CourseVideo == 1 ? true : false));
                    $('#Allow_EP_ExtraVideo').prop('checked', (school_role.Allow_EP_ExtraVideo == 1 ? true : false));
                    $('#Allow_J0').prop('checked', (school_role.Allow_J0 == 1 ? true : false));
                    $('#Allow_J0_CourseVideo').prop('checked', (school_role.Allow_J0_CourseVideo == 1 ? true : false));
                    $('#Allow_J0_ExtraVideo').prop('checked', (school_role.Allow_J0_ExtraVideo == 1 ? true : false));
                    $('#Allow_H0').prop('checked', (school_role.Allow_H0 == 1 ? true : false));
                    $('#Allow_H0_CourseVideo').prop('checked', (school_role.Allow_H0_CourseVideo == 1 ? true : false));
                    $('#Allow_H0_ExtraVideo').prop('checked', (school_role.Allow_H0_ExtraVideo == 1 ? true : false));

                    $('#Allow_E0C0_Max').val(school_role.Allow_E0C0_Max);
                    $('#Allow_E0E0_Max').val(school_role.Allow_E0E0_Max);
                    $('#Allow_E0M0_Max').val(school_role.Allow_E0M0_Max);
                    $('#Allow_E0N0_Max').val(school_role.Allow_E0N0_Max);
                    $('#Allow_E0S0_Max').val(school_role.Allow_E0S0_Max);
                    $('#Allow_EPC0_Max').val(school_role.Allow_EPC0_Max);
                    $('#Allow_EPE0_Max').val(school_role.Allow_EPE0_Max);
                    $('#Allow_EPM0_Max').val(school_role.Allow_EPM0_Max);
                    $('#Allow_EPN0_Max').val(school_role.Allow_EPN0_Max);
                    $('#Allow_EPS0_Max').val(school_role.Allow_EPS0_Max);

                    $('#Allow_EPE11_Max').val(school_role.Allow_EPE11_Max);
                    $('#Allow_EPE12_Max').val(school_role.Allow_EPE12_Max);
                    $('#Allow_EPE13_Max').val(school_role.Allow_EPE13_Max);
                    $('#Allow_EPE14_Max').val(school_role.Allow_EPE14_Max);
                    $('#Allow_EPE21_Max').val(school_role.Allow_EPE21_Max);
                    $('#Allow_EPZ0_Max').val(school_role.Allow_EPZ0_Max);

                    $('#Allow_J0C0_Max').val(school_role.Allow_J0C0_Max);
                    $('#Allow_J0E0_Max').val(school_role.Allow_J0E0_Max);
                    $('#Allow_J0M0_Max').val(school_role.Allow_J0M0_Max);
                    $('#Allow_J0N0_Max').val(school_role.Allow_J0N0_Max);
                    $('#Allow_J0S0_Max').val(school_role.Allow_J0S0_Max);
                    $('#Allow_H0C0_Max').val(school_role.Allow_H0C0_Max);
                    $('#Allow_H0E0_Max').val(school_role.Allow_H0E0_Max);
                    $('#Allow_H0M0_Max').val(school_role.Allow_H0M0_Max);
                    $('#Allow_H0N1_Max').val(school_role.Allow_H0N1_Max);
                    $('#Allow_H0N4_Max').val(school_role.Allow_H0N4_Max);
                    $('#Allow_H0N5_Max').val(school_role.Allow_H0N5_Max);
                    $('#Allow_H0N3_Max').val(school_role.Allow_H0N3_Max);
                    $('#Allow_H0S2_Max').val(school_role.Allow_H0S2_Max);
                    $('#Allow_H0S1_Max').val(school_role.Allow_H0S1_Max);
                    $('#Allow_H0S3_Max').val(school_role.Allow_H0S3_Max);

                    //分科影片權限更動
                    $('#Allow_E0C0_CourseVideo_Max').val(school_role.Allow_E0C0_CourseVideo_Max);
                    $('#Allow_E0E0_CourseVideo_Max').val(school_role.Allow_E0E0_CourseVideo_Max);
                    $('#Allow_E0M0_CourseVideo_Max').val(school_role.Allow_E0M0_CourseVideo_Max);
                    $('#Allow_E0N0_CourseVideo_Max').val(school_role.Allow_E0N0_CourseVideo_Max);
                    $('#Allow_E0S0_CourseVideo_Max').val(school_role.Allow_E0S0_CourseVideo_Max);
                    $('#Allow_EPC0_CourseVideo_Max').val(school_role.Allow_EPC0_CourseVideo_Max);
                    $('#Allow_EPE0_CourseVideo_Max').val(school_role.Allow_EPE0_CourseVideo_Max);
                    $('#Allow_EPM0_CourseVideo_Max').val(school_role.Allow_EPM0_CourseVideo_Max);
                    $('#Allow_EPN0_CourseVideo_Max').val(school_role.Allow_EPN0_CourseVideo_Max);
                    $('#Allow_EPS0_CourseVideo_Max').val(school_role.Allow_EPS0_CourseVideo_Max);
                    $('#Allow_EPE11_CourseVideo_Max').val(school_role.Allow_EPE11_CourseVideo_Max);
                    $('#Allow_EPE12_CourseVideo_Max').val(school_role.Allow_EPE12_CourseVideo_Max);
                    $('#Allow_EPE13_CourseVideo_Max').val(school_role.Allow_EPE13_CourseVideo_Max);
                    $('#Allow_EPE14_CourseVideo_Max').val(school_role.Allow_EPE14_CourseVideo_Max);
                    $('#Allow_EPE21_CourseVideo_Max').val(school_role.Allow_EPE21_CourseVideo_Max);
                    $('#Allow_EPZ0_CourseVideo_Max').val(school_role.Allow_EPZ0_CourseVideo_Max);
                    $('#Allow_J0C0_CourseVideo_Max').val(school_role.Allow_J0C0_CourseVideo_Max);
                    $('#Allow_J0E0_CourseVideo_Max').val(school_role.Allow_J0E0_CourseVideo_Max);
                    $('#Allow_J0M0_CourseVideo_Max').val(school_role.Allow_J0M0_CourseVideo_Max);
                    $('#Allow_J0N0_CourseVideo_Max').val(school_role.Allow_J0N0_CourseVideo_Max);
                    $('#Allow_J0S0_CourseVideo_Max').val(school_role.Allow_J0S0_CourseVideo_Max);
                    $('#Allow_H0C0_CourseVideo_Max').val(school_role.Allow_H0C0_CourseVideo_Max);
                    $('#Allow_H0E0_CourseVideo_Max').val(school_role.Allow_H0E0_CourseVideo_Max);
                    $('#Allow_H0M0_CourseVideo_Max').val(school_role.Allow_H0M0_CourseVideo_Max);
                    $('#Allow_H0N1_CourseVideo_Max').val(school_role.Allow_H0N1_CourseVideo_Max);
                    $('#Allow_H0N4_CourseVideo_Max').val(school_role.Allow_H0N4_CourseVideo_Max);
                    $('#Allow_H0N5_CourseVideo_Max').val(school_role.Allow_H0N5_CourseVideo_Max);
                    $('#Allow_H0N3_CourseVideo_Max').val(school_role.Allow_H0N3_CourseVideo_Max);
                    $('#Allow_H0S2_CourseVideo_Max').val(school_role.Allow_H0S2_CourseVideo_Max);
                    $('#Allow_H0S1_CourseVideo_Max').val(school_role.Allow_H0S1_CourseVideo_Max);
                    $('#Allow_H0S3_CourseVideo_Max').val(school_role.Allow_H0S3_CourseVideo_Max);

					$('#Allow_ET').prop('checked', (school_role.Allow_ET == 1 ? true : false));
					$('#Allow_ET_Max').val(school_role.Allow_ET_Max);

                    $('#Allow_P0').prop('checked', (school_role.Allow_P0 == 1 ? true : false));
                    //$('#Allow_P0_Max').val(school_role.Allow_P0_Max);

                } else {
                    alert('無此資料！');
                    location.href = '/admin/school/';
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });

        $('.school-data-view').show();
        $('.school-data-edit').hide();
    }
    //開始結束日期控制相關
	jQuery('#date-stime').datetimepicker({
		step: 30,
		format: 'Y/m/d',
		timepicker: false
	});

	jQuery('#date-etime').datetimepicker({
		step: 30,
		format: 'Y/m/d',
		timepicker: false
	});

	// jQuery('#date-ep-stime').datetimepicker({
	// 	step: 30,
	// 	format: 'Y/m/d',
	// 	timepicker: false
	// });
    //
	// jQuery('#date-ep-etime').datetimepicker({
	// 	step: 30,
	// 	format: 'Y/m/d',
	// 	timepicker: false
	// });
    //ep_start_at_2
    //
    jQuery('#EPC0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPE0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPM0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPN0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPS0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPE11_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE13_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });


    jQuery('#EPE14_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE12_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE21_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });
    jQuery('#EPZ0_stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPC0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPM0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPS0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPN0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE11_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE13_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE14_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });


    jQuery('#EPE12_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPE21_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });

    jQuery('#EPZ0_etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false
    });



    $('#btn-school-edit').on('click',function(e){
        e.preventDefault();
        $('.school-data-view').hide();
        $('.school-data-edit').show();
    });

    $('#school-form').submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            name: 'required',
            viewname: 'required',
            domain: 'required',
        },
        messages: {
            name: '請輸入總機構名稱',
            viewname: '請輸入顯示名稱',
            domain: '請輸入總機構域名，如www.ailead365.com',
        },
    });

    $('#school-submit').on('click', function() {
        if ($('#school-form').valid()) {

            // 檢查輸入的數字
            if ($('#J0C0_Max').val() == '') {
                alert('國中國文請輸入數字!');
                return false;
            }
            if ($('#J0E0_Max').val() == '') {
                alert('國中英文請輸入數字!');
                return false;
            }
            if ($('#J0M0_Max').val() == '') {
                alert('國中數字請輸入數字!');
                return false;
            }
            if ($('#J0N0_Max').val() == '') {
                alert('國中自然請輸入數字!');
                return false;
            }
            if ($('#J0S0_Max').val() == '') {
                alert('國中社會請輸入數字!');
                return false;
            }

			if (!$('#date-stime').val()) {
				alert('請指定開始日期');
				return false;
			}

			if (!$('#date-etime').val()) {
				alert('請指定結束日期');
				return false;
			}

			if ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked')) {
				// if (!$('#date-ep-stime').val()) {
				// 	alert('請指定升私中開始日期');
				// 	return false;
				// }
                //
				// if (!$('#date-ep-etime').val()) {
				// 	alert('請指定升私中結束日期');
				// 	return false;
				// }
			}

            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.name = $('#name').val();
            dataObj.viewname = $('#viewname').val();
            dataObj.phone = $('#phone').val();
            dataObj.domain = $('#domain').val();
            dataObj.address=$('#address').val();
            dataObj.is_sun = ($('input[name="is_sun"]').prop('checked'))?1:0;
            dataObj.is_paper = ($('input[name="is_paper"]').prop('checked'))?1:0;
            dataObj.is_sendpaper_manual = ($('input[name="is_sendpaper_manual"]').prop('checked'))?1:0;
            dataObj.is_ask   = ($('input[name="is_ask"]').prop('checked'))?1:0;
            dataObj.school_role = get_school_role();

            dataObj.ep_start_at_2=get_ep_start_at_role();
            dataObj.ep_end_at_2=get_ep_end_at_role();
			dataObj.start_at = Math.floor(new Date($('#date-stime').val()).getTime() / 1000);
			dataObj.end_at = Math.floor(new Date($('#date-etime').val()).getTime() / 1000)+86399;
			//dataObj.ep_start_at = ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#date-ep-stime').val()).getTime() / 1000):0;
			//dataObj.ep_end_at =  ($('#Allow_EP').prop('checked') || $('#Allow_EP_CourseVideo').prop('checked') || $('#Allow_EP_ExtraVideo').prop('checked'))? Math.floor(new Date($('#date-ep-etime').val()).getTime() / 1000)+86399:0;
            if(id.length != 0){
                dataObj.is_serialno = '';
            }else{
                dataObj.is_serialno = $('input[name="need-serialno"]:checked').val();
            }

            $.ajax({
                url: '/admin/school/parentschool-add',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.replace(r.reurl);
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });
        }
    });
});
