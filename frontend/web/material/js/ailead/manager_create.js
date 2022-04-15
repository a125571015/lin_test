$(function() {
    'use strict';

    function get_course_role() {
        var array = [];
        array.push({
            E0C0:         ($('input[name="E0C0"]:checked').val() == '1' ? 1 : 0),
            E0E0:         ($('input[name="E0E0"]:checked').val() == '1' ? 1 : 0),
            E0M0:         ($('input[name="E0M0"]:checked').val() == '1' ? 1 : 0),
            E0N0:         ($('input[name="E0N0"]:checked').val() == '1' ? 1 : 0),
            E0S0:         ($('input[name="E0S0"]:checked').val() == '1' ? 1 : 0),
            EPC0:         ($('input[name="EPC0"]:checked').val() == '1' ? 1 : 0),
            EPE0:         ($('input[name="EPE0"]:checked').val() == '1' ? 1 : 0),
            EPM0:         ($('input[name="EPM0"]:checked').val() == '1' ? 1 : 0),
            EPN0:         ($('input[name="EPN0"]:checked').val() == '1' ? 1 : 0),
            //升私中更動
            EPE11:         ($('input[name="EPE11"]:checked').val() == '1' ? 1 : 0),
            EPE13:         ($('input[name="EPE13"]:checked').val() == '1' ? 1 : 0),
            EPE14:         ($('input[name="EPE14"]:checked').val() == '1' ? 1 : 0),
            EPE12:         ($('input[name="EPE12"]:checked').val() == '1' ? 1 : 0),
            EPE21:         ($('input[name="EPE21"]:checked').val() == '1' ? 1 : 0),
            EPZ0:         ($('input[name="EPZ0"]:checked').val() == '1' ? 1 : 0),
            //
            EPS0:         ($('input[name="EPS0"]:checked').val() == '1' ? 1 : 0),
            J0C0:         ($('input[name="J0C0"]:checked').val() == '1' ? 1 : 0),
            J0E0:         ($('input[name="J0E0"]:checked').val() == '1' ? 1 : 0),
            J0M0:         ($('input[name="J0M0"]:checked').val() == '1' ? 1 : 0),
            J0N0:         ($('input[name="J0N0"]:checked').val() == '1' ? 1 : 0),
            J0S0:         ($('input[name="J0S0"]:checked').val() == '1' ? 1 : 0),
            H0C0:         ($('input[name="H0C0"]:checked').val() == '1' ? 1 : 0),
            H0E0:         ($('input[name="H0E0"]:checked').val() == '1' ? 1 : 0),
            H0M0:         ($('input[name="H0M0"]:checked').val() == '1' ? 1 : 0),
            H0N1:         ($('input[name="H0N1"]:checked').val() == '1' ? 1 : 0),
            H0N3:         ($('input[name="H0N3"]:checked').val() == '1' ? 1 : 0),
            H0N4:         ($('input[name="H0N4"]:checked').val() == '1' ? 1 : 0),
            H0N5:         ($('input[name="H0N5"]:checked').val() == '1' ? 1 : 0),
            H0S1:         ($('input[name="H0S1"]:checked').val() == '1' ? 1 : 0),
            H0S2:         ($('input[name="H0S2"]:checked').val() == '1' ? 1 : 0),
            H0S3:         ($('input[name="H0S3"]:checked').val() == '1' ? 1 : 0)
        });
        var course_role = JSON.stringify(array);
        course_role = course_role.replace('[', '');
        course_role = course_role.replace(']', '');
        return course_role;
    }

    function get_coursevideo_role() {
        var array = [];
        array.push({
            E0C0:         ($('input[name="CourseVideo_E0C0"]:checked').val() == '1' ? 1 : 0),
            E0E0:         ($('input[name="CourseVideo_E0E0"]:checked').val() == '1' ? 1 : 0),
            E0M0:         ($('input[name="CourseVideo_E0M0"]:checked').val() == '1' ? 1 : 0),
            E0N0:         ($('input[name="CourseVideo_E0N0"]:checked').val() == '1' ? 1 : 0),
            E0S0:         ($('input[name="CourseVideo_E0S0"]:checked').val() == '1' ? 1 : 0),
            EPC0:         ($('input[name="CourseVideo_EPC0"]:checked').val() == '1' ? 1 : 0),
            EPE0:         ($('input[name="CourseVideo_EPE0"]:checked').val() == '1' ? 1 : 0),
            EPM0:         ($('input[name="CourseVideo_EPM0"]:checked').val() == '1' ? 1 : 0),
            EPN0:         ($('input[name="CourseVideo_EPN0"]:checked').val() == '1' ? 1 : 0),
            EPS0:         ($('input[name="CourseVideo_EPS0"]:checked').val() == '1' ? 1 : 0),
            //升私中更動
            EPE11:         ($('input[name="CourseVideo_EPE11"]:checked').val() == '1' ? 1 : 0),
            EPE13:         ($('input[name="CourseVideo_EPE13"]:checked').val() == '1' ? 1 : 0),
            EPE14:         ($('input[name="CourseVideo_EPE14"]:checked').val() == '1' ? 1 : 0),
            EPE12:         ($('input[name="CourseVideo_EPE12"]:checked').val() == '1' ? 1 : 0),
            EPE21:         ($('input[name="CourseVideo_EPE21"]:checked').val() == '1' ? 1 : 0),
            EPZ0:         ($('input[name="CourseVideo_EPZ0"]:checked').val() == '1' ? 1 : 0),

            //
            J0C0:         ($('input[name="CourseVideo_J0C0"]:checked').val() == '1' ? 1 : 0),
            J0E0:         ($('input[name="CourseVideo_J0E0"]:checked').val() == '1' ? 1 : 0),
            J0M0:         ($('input[name="CourseVideo_J0M0"]:checked').val() == '1' ? 1 : 0),
            J0N0:         ($('input[name="CourseVideo_J0N0"]:checked').val() == '1' ? 1 : 0),
            J0S0:         ($('input[name="CourseVideo_J0S0"]:checked').val() == '1' ? 1 : 0),
            H0C0:         ($('input[name="CourseVideo_H0C0"]:checked').val() == '1' ? 1 : 0),
            H0E0:         ($('input[name="CourseVideo_H0E0"]:checked').val() == '1' ? 1 : 0),
            H0M0:         ($('input[name="CourseVideo_H0M0"]:checked').val() == '1' ? 1 : 0),
            H0N1:         ($('input[name="CourseVideo_H0N1"]:checked').val() == '1' ? 1 : 0),
            H0N3:         ($('input[name="CourseVideo_H0N3"]:checked').val() == '1' ? 1 : 0),
            H0N4:         ($('input[name="CourseVideo_H0N4"]:checked').val() == '1' ? 1 : 0),
            H0N5:         ($('input[name="CourseVideo_H0N5"]:checked').val() == '1' ? 1 : 0),
            H0S1:         ($('input[name="CourseVideo_H0S1"]:checked').val() == '1' ? 1 : 0),
            H0S2:         ($('input[name="CourseVideo_H0S2"]:checked').val() == '1' ? 1 : 0),
            H0S3:         ($('input[name="CourseVideo_H0S3"]:checked').val() == '1' ? 1 : 0),
        });
        var coursevideo_role = JSON.stringify(array);
        coursevideo_role = coursevideo_role.replace('[', '');
        coursevideo_role = coursevideo_role.replace(']', '');
        return coursevideo_role;
    }

    function get_extravideo_role() {
        var array = [];
        array.push({
            E0C0:         ($('input[name="ExtraVideo_E0C0"]:checked').val() == '1' ? 1 : 0),
            E0E0:         ($('input[name="ExtraVideo_E0E0"]:checked').val() == '1' ? 1 : 0),
            E0M0:         ($('input[name="ExtraVideo_E0M0"]:checked').val() == '1' ? 1 : 0),
            E0N0:         ($('input[name="ExtraVideo_E0N0"]:checked').val() == '1' ? 1 : 0),
            E0S0:         ($('input[name="ExtraVideo_E0S0"]:checked').val() == '1' ? 1 : 0),
            EPC0:         ($('input[name="ExtraVideo_EPC0"]:checked').val() == '1' ? 1 : 0),
            EPE0:         ($('input[name="ExtraVideo_EPE0"]:checked').val() == '1' ? 1 : 0),
            EPM0:         ($('input[name="ExtraVideo_EPM0"]:checked').val() == '1' ? 1 : 0),
            EPN0:         ($('input[name="ExtraVideo_EPN0"]:checked').val() == '1' ? 1 : 0),
            EPS0:         ($('input[name="ExtraVideo_EPS0"]:checked').val() == '1' ? 1 : 0),
            //升私中更動
            // EPE11:         ($('input[name="ExtraVideo_EPE11"]:checked').val() == '1' ? 1 : 0),
            // EPE13:         ($('input[name="ExtraVideo_EPE13"]:checked').val() == '1' ? 1 : 0),
            // EPE14:         ($('input[name="ExtraVideo_EPE14"]:checked').val() == '1' ? 1 : 0),
            // EPE12:         ($('input[name="ExtraVideo_EPE12"]:checked').val() == '1' ? 1 : 0),
            // EPE21:         ($('input[name="ExtraVideo_EPE21"]:checked').val() == '1' ? 1 : 0),
            // EPZ0:         ($('input[name="ExtraVideo_EPZ0"]:checked').val() == '1' ? 1 : 0),
            // //
            J0C0:         ($('input[name="ExtraVideo_J0C0"]:checked').val() == '1' ? 1 : 0),
            J0E0:         ($('input[name="ExtraVideo_J0E0"]:checked').val() == '1' ? 1 : 0),
            J0M0:         ($('input[name="ExtraVideo_J0M0"]:checked').val() == '1' ? 1 : 0),
            J0N0:         ($('input[name="ExtraVideo_J0N0"]:checked').val() == '1' ? 1 : 0),
            J0S0:         ($('input[name="ExtraVideo_J0S0"]:checked').val() == '1' ? 1 : 0),
            H0C0:         ($('input[name="ExtraVideo_H0C0"]:checked').val() == '1' ? 1 : 0),
            H0E0:         ($('input[name="ExtraVideo_H0E0"]:checked').val() == '1' ? 1 : 0),
            H0M0:         ($('input[name="ExtraVideo_H0M0"]:checked').val() == '1' ? 1 : 0),
            H0N1:         ($('input[name="ExtraVideo_H0N1"]:checked').val() == '1' ? 1 : 0),
            H0N3:         ($('input[name="ExtraVideo_H0N3"]:checked').val() == '1' ? 1 : 0),
            H0N4:         ($('input[name="ExtraVideo_H0N4"]:checked').val() == '1' ? 1 : 0),
            H0N5:         ($('input[name="ExtraVideo_H0N5"]:checked').val() == '1' ? 1 : 0),
            H0S1:         ($('input[name="ExtraVideo_H0S1"]:checked').val() == '1' ? 1 : 0),
            H0S2:         ($('input[name="ExtraVideo_H0S2"]:checked').val() == '1' ? 1 : 0),
            H0S3:         ($('input[name="ExtraVideo_H0S3"]:checked').val() == '1' ? 1 : 0)
        });
        var extravideo_role = JSON.stringify(array);
        extravideo_role = extravideo_role.replace('[', '');
        extravideo_role = extravideo_role.replace(']', '');
        return extravideo_role;
    }

    function getDomainSchool(school_id, SetValue) {


        // if ($('#user_type_id').val() == '2') {
        //     $('#system_allow_school_id').hide();
        // } else if ($('#user_type_id').val() == '3') {
        //     $('#system_allow_school_id').hide();
        // } else if ($('#user_type_id').val() == '4') {
        //     $('#system_allow_school_id').show();
        // }

        $.ajax({
            url: '/admin/school/get-domain-school',
            type: 'post',
            async: false,
            cache: false,
            data: 'school_id=' + school_id,
            success: function(r) {
                var user_type_id = $('#user_type_id').val();
                var view_allow_school_id = '';
                var value_allow_school_id = '';
                var arrValue = [];
                if (SetValue) {
                    arrValue = JSON.parse(SetValue);
                }

                $('#div_allow_school_id').html('');
                $.each(r, function(key, item) {
                    if ((user_type_id == '2') || (user_type_id == '3')) {
                        if (item.id == $('#school_id').val()) {
                            view_allow_school_id = item.name;
                            value_allow_school_id = item.id;
                            $('#div_allow_school_id').append('<div><input type="checkbox" id="chk_allow_school_id" name="chk_allow_school_id" value="'+item.id+'" checked>&nbsp;'+item.name+'</div>');
                        } else {
                            $('#div_allow_school_id').append('<div><input type="checkbox" id="chk_allow_school_id" name="chk_allow_school_id" value="'+item.id+'">&nbsp;'+item.name+'</div>');
                        }
                    } else if (user_type_id == '4') {
                        if (arrValue.indexOf(item.id) != -1) {
                            view_allow_school_id += item.name + '; ';
                            value_allow_school_id += item.id + ';';
                            $('#div_allow_school_id').append('<div><input type="checkbox" id="chk_allow_school_id" name="chk_allow_school_id" value="'+item.id+'" checked>&nbsp;'+item.name+'</div>');
                        } else {
                            $('#div_allow_school_id').append('<div><input type="checkbox" id="chk_allow_school_id" name="chk_allow_school_id" value="'+item.id+'">&nbsp;'+item.name+'</div>');
                        }
                    }

                });
                $('[data-field="allow_school_id"]').html(view_allow_school_id);
            },
            error: bs.errorHandler
        });


    }


    //清除狀態
    function clearState() {
        $('#newpassword').val('');
        $('#renewpassword').val('');
        // $('#start_at').val('');
        // $('#end_at').val('');
        // $('#note').val('');
        // $('#btnDel').hide();
    }

    function getmanagerData() {
        var id = bs.getUrlVar('id');
        if (id.length == 0) {
            $('.manager-data-view').hide();
            $('.manager-data-edit').show();
            getDomainSchool($('#school_id').val());
        } else {
            var dataObj = {};
            dataObj.id = id;
            $.ajax({
                url:  '/admin/manager/get-manager-data',
                data: JSON.stringify({ 'data': dataObj }),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    if (r.data.length > 0) {

                        // // edit
                        $('#allow_school_id').val(r.data[0].allow_school_id);
                        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', r.data[0].school_id);
                        bs.initSelectElement('#user_type_id', '/admin/school/get-user-type', '', '', r.data[0].user_type_id);
                        var school_id = r.data[0].school_id;
                        var schoolclass_id= r.data[0].schoolclass_id;
                        var manager_data_user_type_id=r.data[0].manager_data_user_type_id;
                        bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+school_id,schoolclass_id);
                        //$('#school_id').val(r.data[0].school_id);
                        $('#first_name').val(r.data[0].first_name);
                        $('#birthday').val(r.data[0].birthday);
                        $('#card_no').val(r.data[0].card_no);
                        $('#phone').val(r.data[0].phone);

                        if(r.data[0].birthday != null){
                            var birthday_text = r.data[0].birthday.split('-');
                            var year = parseInt(birthday_text[0]);
                            var month = parseInt(birthday_text[1]);
                            var day = parseInt(birthday_text[2]);
                            $('#year').val(year);
                            $('#month').val(month);
                            $('#day').val(day);
                        }else{
                            $('#year').val('-1');
                            $('#month').val('-1');
                            $('#day').val('-1');
                        }

                        $('#email').val(r.data[0].email);
                        $('#manager_username').val(r.data[0].username);
                        $('input[name=allow_change_password]').val([r.data[0].allow_change_password]);
                        if (r.data[0].force_change_password == 1) {
                            $('#force_change_password').prop('checked',true);
                        } else {
                            $('#force_change_password').prop('checked',false);
                        }
                        var course_hide_role=r.data[0].course_hide_role;
                        var course_role = JSON.parse(r.data[0].course_role);
                        $('#E0C0').prop('checked', (course_role.E0C0 == 1 ? true : false));
                        $('#E0E0').prop('checked', (course_role.E0E0 == 1 ? true : false));
                        $('#E0M0').prop('checked', (course_role.E0M0 == 1 ? true : false));
                        $('#E0N0').prop('checked', (course_role.E0N0 == 1 ? true : false));
                        $('#E0S0').prop('checked', (course_role.E0S0 == 1 ? true : false));
                        $('#EPC0').prop('checked', (course_role.EPC0 == 1 ? true : false));
                        $('#EPE0').prop('checked', (course_role.EPE0 == 1 ? true : false));
                        $('#EPM0').prop('checked', (course_role.EPM0 == 1 ? true : false));
                        $('#EPN0').prop('checked', (course_role.EPN0 == 1 ? true : false));
                        $('#EPS0').prop('checked', (course_role.EPS0 == 1 ? true : false));
                        //升私中更動
                        $('#EPE11').prop('checked', (course_role.EPE11 == 1 ? true : false));
                        $('#EPE12').prop('checked', (course_role.EPE12 == 1 ? true : false));
                        $('#EPE13').prop('checked', (course_role.EPE13 == 1 ? true : false));
                        $('#EPE14').prop('checked', (course_role.EPE14 == 1 ? true : false));
                        $('#EPE21').prop('checked', (course_role.EPE21 == 1 ? true : false));
                        $('#EPZ0').prop('checked', (course_role.EPZ0 == 1 ? true : false));
                        //

                        $('#J0C0').prop('checked', (course_role.J0C0 == 1 ? true : false));
                        $('#J0E0').prop('checked', (course_role.J0E0 == 1 ? true : false));
                        $('#J0M0').prop('checked', (course_role.J0M0 == 1 ? true : false));
                        $('#J0N0').prop('checked', (course_role.J0N0 == 1 ? true : false));
                        $('#J0S0').prop('checked', (course_role.J0S0 == 1 ? true : false));
                        $('#H0C0').prop('checked', (course_role.H0C0 == 1 ? true : false));
                        $('#H0E0').prop('checked', (course_role.H0E0 == 1 ? true : false));
                        $('#H0M0').prop('checked', (course_role.H0M0 == 1 ? true : false));
                        $('#H0N1').prop('checked', (course_role.H0N1 == 1 ? true : false));
                        $('#H0N3').prop('checked', (course_role.H0N3 == 1 ? true : false));
                        $('#H0N4').prop('checked', (course_role.H0N4 == 1 ? true : false));
                        $('#H0N5').prop('checked', (course_role.H0N5 == 1 ? true : false));
                        $('#H0S1').prop('checked', (course_role.H0S1 == 1 ? true : false));
                        $('#H0S2').prop('checked', (course_role.H0S2 == 1 ? true : false));
                        $('#H0S3').prop('checked', (course_role.H0S3 == 1 ? true : false));
                        if (course_hide_role.indexOf('no_hide_data')==-1){
                            for (var i = 0; i < course_hide_role.length; i++) {
                                $('#'+course_hide_role[i]).parent().hide();
                            }
                        }

                        var coursevideo_hide_role=r.data[0].coursevideo_hide_role;
                        var coursevideo_role = JSON.parse(r.data[0].coursevideo_role);
                        $('#CourseVideo_E0C0').prop('checked', (coursevideo_role.E0C0 == 1 ? true : false));
                        $('#CourseVideo_E0E0').prop('checked', (coursevideo_role.E0E0 == 1 ? true : false));
                        $('#CourseVideo_E0M0').prop('checked', (coursevideo_role.E0M0 == 1 ? true : false));
                        $('#CourseVideo_E0N0').prop('checked', (coursevideo_role.E0N0 == 1 ? true : false));
                        $('#CourseVideo_E0S0').prop('checked', (coursevideo_role.E0S0 == 1 ? true : false));
                        $('#CourseVideo_EPC0').prop('checked', (coursevideo_role.EPC0 == 1 ? true : false));
                        $('#CourseVideo_EPE0').prop('checked', (coursevideo_role.EPE0 == 1 ? true : false));
                        $('#CourseVideo_EPM0').prop('checked', (coursevideo_role.EPM0 == 1 ? true : false));
                        $('#CourseVideo_EPN0').prop('checked', (coursevideo_role.EPN0 == 1 ? true : false));
                        $('#CourseVideo_EPS0').prop('checked', (coursevideo_role.EPS0 == 1 ? true : false));
                        //升私中更動
                        $('#CourseVideo_EPE11').prop('checked', (coursevideo_role.EPE11 == 1 ? true : false));
                        $('#CourseVideo_EPE13').prop('checked', (coursevideo_role.EPE13 == 1 ? true : false));
                        $('#CourseVideo_EPE14').prop('checked', (coursevideo_role.EPE14 == 1 ? true : false));
                        $('#CourseVideo_EPE12').prop('checked', (coursevideo_role.EPE12 == 1 ? true : false));
                        $('#CourseVideo_EPE21').prop('checked', (coursevideo_role.EPE21 == 1 ? true : false));
                        $('#CourseVideo_EPZ0').prop('checked', (coursevideo_role.EPZ0 == 1 ? true : false));
                        //


                        $('#CourseVideo_J0C0').prop('checked', (coursevideo_role.J0C0 == 1 ? true : false));
                        $('#CourseVideo_J0E0').prop('checked', (coursevideo_role.J0E0 == 1 ? true : false));
                        $('#CourseVideo_J0M0').prop('checked', (coursevideo_role.J0M0 == 1 ? true : false));
                        $('#CourseVideo_J0N0').prop('checked', (coursevideo_role.J0N0 == 1 ? true : false));
                        $('#CourseVideo_J0S0').prop('checked', (coursevideo_role.J0S0 == 1 ? true : false));
                        $('#CourseVideo_H0C0').prop('checked', (coursevideo_role.H0C0 == 1 ? true : false));
                        $('#CourseVideo_H0E0').prop('checked', (coursevideo_role.H0E0 == 1 ? true : false));
                        $('#CourseVideo_H0M0').prop('checked', (coursevideo_role.H0M0 == 1 ? true : false));
                        $('#CourseVideo_H0N1').prop('checked', (coursevideo_role.H0N1 == 1 ? true : false));
                        $('#CourseVideo_H0N3').prop('checked', (coursevideo_role.H0N3 == 1 ? true : false));
                        $('#CourseVideo_H0N4').prop('checked', (coursevideo_role.H0N4 == 1 ? true : false));
                        $('#CourseVideo_H0N5').prop('checked', (coursevideo_role.H0N5 == 1 ? true : false));
                        $('#CourseVideo_H0S1').prop('checked', (coursevideo_role.H0S1 == 1 ? true : false));
                        $('#CourseVideo_H0S2').prop('checked', (coursevideo_role.H0S2 == 1 ? true : false));
                        $('#CourseVideo_H0S3').prop('checked', (coursevideo_role.H0S3 == 1 ? true : false));
                        if (coursevideo_hide_role.indexOf('no_hide_data')==-1) {
                            for (var i = 0; i < coursevideo_hide_role.length; i++) {
                                $('#' + coursevideo_hide_role[i]).parent().hide();
                            }
                        }
                        var extravideo_hide_role=r.data[0].extravideo_hide_role;
                        var extravideo_role = JSON.parse(r.data[0].extravideo_role);
                        $('#ExtraVideo_E0C0').prop('checked', (extravideo_role.E0C0 == 1 ? true : false));
                        $('#ExtraVideo_E0E0').prop('checked', (extravideo_role.E0E0 == 1 ? true : false));
                        $('#ExtraVideo_E0M0').prop('checked', (extravideo_role.E0M0 == 1 ? true : false));
                        $('#ExtraVideo_E0N0').prop('checked', (extravideo_role.E0N0 == 1 ? true : false));
                        $('#ExtraVideo_E0S0').prop('checked', (extravideo_role.E0S0 == 1 ? true : false));
                        $('#ExtraVideo_EPC0').prop('checked', (extravideo_role.EPC0 == 1 ? true : false));
                        $('#ExtraVideo_EPE0').prop('checked', (extravideo_role.EPE0 == 1 ? true : false));
                        $('#ExtraVideo_EPM0').prop('checked', (extravideo_role.EPM0 == 1 ? true : false));
                        $('#ExtraVideo_EPN0').prop('checked', (extravideo_role.EPN0 == 1 ? true : false));
                        $('#ExtraVideo_EPS0').prop('checked', (extravideo_role.EPS0 == 1 ? true : false));
                        //升私中更動
                        // $('#ExtraVideo_EPE11').prop('checked', (extravideo_role.EPE11 == 1 ? true : false));
                        // $('#ExtraVideo_EPE13').prop('checked', (extravideo_role.EPE13 == 1 ? true : false));
                        // $('#ExtraVideo_EPE14').prop('checked', (extravideo_role.EPE14 == 1 ? true : false));
                        // $('#ExtraVideo_EPE12').prop('checked', (extravideo_role.EPE12 == 1 ? true : false));
                        // $('#ExtraVideo_EPE21').prop('checked', (extravideo_role.EPE21 == 1 ? true : false));
                        // $('#ExtraVideo_EPZ0').prop('checked', (extravideo_role.EPZ0 == 1 ? true : false));
                        //
                        $('#ExtraVideo_J0C0').prop('checked', (extravideo_role.J0C0 == 1 ? true : false));
                        $('#ExtraVideo_J0E0').prop('checked', (extravideo_role.J0E0 == 1 ? true : false));
                        $('#ExtraVideo_J0M0').prop('checked', (extravideo_role.J0M0 == 1 ? true : false));
                        $('#ExtraVideo_J0N0').prop('checked', (extravideo_role.J0N0 == 1 ? true : false));
                        $('#ExtraVideo_J0S0').prop('checked', (extravideo_role.J0S0 == 1 ? true : false));
                        $('#ExtraVideo_H0C0').prop('checked', (extravideo_role.H0C0 == 1 ? true : false));
                        $('#ExtraVideo_H0E0').prop('checked', (extravideo_role.H0E0 == 1 ? true : false));
                        $('#ExtraVideo_H0M0').prop('checked', (extravideo_role.H0M0 == 1 ? true : false));
                        $('#ExtraVideo_H0N1').prop('checked', (extravideo_role.H0N1 == 1 ? true : false));
                        $('#ExtraVideo_H0N3').prop('checked', (extravideo_role.H0N3 == 1 ? true : false));
                        $('#ExtraVideo_H0N4').prop('checked', (extravideo_role.H0N4 == 1 ? true : false));
                        $('#ExtraVideo_H0N5').prop('checked', (extravideo_role.H0N5 == 1 ? true : false));
                        $('#ExtraVideo_H0S1').prop('checked', (extravideo_role.H0S1 == 1 ? true : false));
                        $('#ExtraVideo_H0S2').prop('checked', (extravideo_role.H0S2 == 1 ? true : false));
                        $('#ExtraVideo_H0S3').prop('checked', (extravideo_role.H0S3 == 1 ? true : false));
                        if (extravideo_hide_role.indexOf('no_hide_data')==-1) {
                            for (var i = 0; i < extravideo_hide_role.length; i++) {
                                $('#' + extravideo_hide_role[i]).parent().hide();
                            }
                        }

                        $('#is_print').prop('checked', (r.data[0].is_print == 1 ? true : false));

                        // view
                        $('[data-field="school_id"]').html($('#school_id option:selected').text());
                        $('[data-field="user_type_id"]').html($('#user_type_id option:selected').text());
                        $('[data-field="first_name"]').html(r.data[0].first_name);
                        $('[data-field="birthday"]').html(r.data[0].birthday);
                        $('[data-field="card_no"]').html(r.data[0].card_no);
                        $('[data-field="phone"]').html(r.data[0].phone);
                        $('[data-field="email"]').html(r.data[0].email);
                        $('[data-field="manager_username"]').html(r.data[0].username);
                        if (r.data[0].allow_change_password == 1) {
                            $('[data-field="allow_change_password"]').html('允許');
                        } else {
                            $('[data-field="allow_change_password"]').html('禁止');
                        }
                        if (r.data[0].is_print == 1) {
                            $('[data-field="is_print"]').html('允許');
                        } else {
                            $('[data-field="is_print"]').html('禁止');
                        }

                        //alert(r.data[0].allow_school_id);
                        //$('[data-field="allow_school_id"]').html(r.data[0].allow_school_id);


                        // $('[data-field="phone"]').html(r.data[0].phone);
                        // $('[data-field="phone"]').html(r.data[0].phone);
                        // $('[data-field="phone"]').html(r.data[0].phone);
                        // $('[data-field="managerclass_count"]').html('<a href="/admin/managerclass/index?manager_id='+r[0].managerclass_count+'">'+r[0].managerclass_count+'</a>');
                        // $('[data-field="manager_count"]').html('<a href="/admin/manager/index?manager_id='+r[0].manager_count+'">'+r[0].manager_count+'</a>');



                        //course_role = jQuery.parseJSON(r.data[0].course_role);
                        //coursevideo_role = jQuery.parseJSON(r.data[0].coursevideo_role);
                        //extravideo_role = jQuery.parseJSON(r.data[0].extravideo_role);

                        if ((r.data[0].course_role != '[]') && (r.data[0].course_role != '')) {

                        }

                        if ((r.data[0].coursevideo_role != '[]') && (r.data[0].coursevideo_role != '')) {

                        }

                        if ((r.data[0].extravideo_role != '[]') && (r.data[0].extravideo_role != '')) {

                        }

                        if (manager_data_user_type_id==4){
                            var tempHTML='(分校主任不需帶班)'
                            $('#btn-manager-schoolclass-edit').removeClass('btn-success').addClass('btn-secondary');
                            $('#btn-manager-schoolclass-edit').attr('disabled',true);
                            $('[data-field="schoolclass_id"]').html(tempHTML);

                        }

                        if (manager_data_user_type_id==6){
                            var tempHTML='(知識健檢老師不需帶班)'
                            $('#btn-manager-schoolclass-edit').removeClass('btn-success').addClass('btn-secondary');
                            $('#btn-manager-schoolclass-edit').attr('disabled',true);
                            $('[data-field="schoolclass_id"]').html(tempHTML);

                        }

                        var data = '';
                        if (schoolclass_id) {
                            var tmpHTML = '';
                            tmpHTML = '';
                            data = $('#schoolclass_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                            if (tmpHTML != '') {
                                $('[data-field="schoolclass_id"]').html(tmpHTML);
                            }
                        }


                        var tmpHTML;
                        //課程內容=================================================
                        tmpHTML = '';
                        tmpHTML += (course_role.E0C0 == 1 ? '國小國文；' : '');
                        tmpHTML += (course_role.E0E0 == 1 ? '國小英文；' : '');
                        tmpHTML += (course_role.E0M0 == 1 ? '國小數學；' : '');
                        tmpHTML += (course_role.E0N0 == 1 ? '國小自然；' : '');
                        tmpHTML += (course_role.E0S0 == 1 ? '國小社會；' : '');
                        $('[data-field="course_role_E0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (course_role.EPC0 == 1 ? '升私中國文；' : '');
                        tmpHTML += (course_role.EPE0 == 1 ? '升私中英文；' : '');
                        tmpHTML += (course_role.EPM0 == 1 ? '國小資優數學；' : '');
                        tmpHTML += (course_role.EPN0 == 1 ? '升私中自然；' : '');
                        tmpHTML += (course_role.EPS0 == 1 ? '升私中社會；' : '');
                        //升私中更動
                        tmpHTML += (course_role.EPE11 == 1 ? '英語常用單字2000；' : '');
                        tmpHTML += (course_role.EPE13 == 1 ? '英語高頻單字2001~4500；' : '');
                        tmpHTML += (course_role.EPE14 == 1 ? '英語終極單字4501~7000；' : '');
                        tmpHTML += (course_role.EPE12 == 1 ? '英單字根字首拼圖法；' : '');
                        tmpHTML += (course_role.EPE21 == 1 ? '全民英檢GEPT初級；' : '');
                        tmpHTML += (course_role.EPZ0 == 1 ? '紫微斗數輕鬆學；' : '');
                        //
                        $('[data-field="course_role_EP"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (course_role.J0C0 == 1 ? '國中國文；' : '');
                        tmpHTML += (course_role.J0E0 == 1 ? '國中英文；' : '');
                        tmpHTML += (course_role.J0M0 == 1 ? '國中數學；' : '');
                        tmpHTML += (course_role.J0N0 == 1 ? '國中自然；' : '');
                        tmpHTML += (course_role.J0S0 == 1 ? '國中社會；' : '');
                        $('[data-field="course_role_J0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (course_role.H0C0 == 1 ? '高中國文；' : '');
                        tmpHTML += (course_role.H0E0 == 1 ? '高中英文；' : '');
                        tmpHTML += (course_role.H0M0 == 1 ? '高中數學；' : '');
                        tmpHTML += (course_role.H0N1 == 1 ? '高中生物；' : '');
                        tmpHTML += (course_role.H0N3 == 1 ? '高中地球科學；' : '');
                        tmpHTML += (course_role.H0N4 == 1 ? '高中物理；' : '');
                        tmpHTML += (course_role.H0N5 == 1 ? '高中化學；' : '');
                        tmpHTML += (course_role.H0S1 == 1 ? '高中歷史；' : '');
                        tmpHTML += (course_role.H0S2 == 1 ? '高中地理；' : '');
                        tmpHTML += (course_role.H0S3 == 1 ? '高中公民；' : '');
                        $('[data-field="course_role_H0"]').html(tmpHTML);

                        //教學影片=================================================
                        tmpHTML = '';
                        tmpHTML += (coursevideo_role.E0C0 == 1 ? '國小國文；' : '');
                        tmpHTML += (coursevideo_role.E0E0 == 1 ? '國小英文；' : '');
                        tmpHTML += (coursevideo_role.E0M0 == 1 ? '國小數學；' : '');
                        tmpHTML += (coursevideo_role.E0N0 == 1 ? '國小自然；' : '');
                        tmpHTML += (coursevideo_role.E0S0 == 1 ? '國小社會；' : '');
                        $('[data-field="coursevideo_role_E0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (coursevideo_role.EPC0 == 1 ? '升私中國文；' : '');
                        tmpHTML += (coursevideo_role.EPE0 == 1 ? '升私中英文；' : '');
                        tmpHTML += (coursevideo_role.EPM0 == 1 ? '國小資優數學；' : '');
                        tmpHTML += (coursevideo_role.EPN0 == 1 ? '升私中自然；' : '');
                        tmpHTML += (coursevideo_role.EPS0 == 1 ? '升私中社會；' : '');
                        //升私中更動
                        tmpHTML += (coursevideo_role.EPE11 == 1 ? '英語常用單字2000；' : '');
                        tmpHTML += (coursevideo_role.EPE13 == 1 ? '英語高頻單字2001~4500；' : '');
                        tmpHTML += (coursevideo_role.EPE14 == 1 ? '英語終極單字4501~7000；' : '');
                        tmpHTML += (coursevideo_role.EPE12 == 1 ? '英單字根字首拼圖法；' : '');
                        tmpHTML += (coursevideo_role.EPE21 == 1 ? '全民英檢GEPT初級；' : '');
                        tmpHTML += (coursevideo_role.EPZ0 == 1 ? '紫微斗數輕鬆學；' : '');
                        //


                        $('[data-field="coursevideo_role_EP"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (coursevideo_role.J0C0 == 1 ? '國中國文；' : '');
                        tmpHTML += (coursevideo_role.J0E0 == 1 ? '國中英文；' : '');
                        tmpHTML += (coursevideo_role.J0M0 == 1 ? '國中數學；' : '');
                        tmpHTML += (coursevideo_role.J0N0 == 1 ? '國中自然；' : '');
                        tmpHTML += (coursevideo_role.J0S0 == 1 ? '國中社會；' : '');
                        $('[data-field="coursevideo_role_J0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (coursevideo_role.H0C0 == 1 ? '高中國文；' : '');
                        tmpHTML += (coursevideo_role.H0E0 == 1 ? '高中英文；' : '');
                        tmpHTML += (coursevideo_role.H0M0 == 1 ? '高中數學；' : '');
                        tmpHTML += (coursevideo_role.H0N1 == 1 ? '高中生物；' : '');
                        tmpHTML += (coursevideo_role.H0N3 == 1 ? '高中地球科學；' : '');
                        tmpHTML += (coursevideo_role.H0N4 == 1 ? '高中物理；' : '');
                        tmpHTML += (coursevideo_role.H0N5 == 1 ? '高中化學；' : '');
                        tmpHTML += (coursevideo_role.H0S1 == 1 ? '高中歷史；' : '');
                        tmpHTML += (coursevideo_role.H0S2 == 1 ? '高中地理；' : '');
                        tmpHTML += (coursevideo_role.H0S3 == 1 ? '高中公民；' : '');
                        $('[data-field="coursevideo_role_H0"]').html(tmpHTML);

                        //自派影片=================================================
                        tmpHTML = '';
                        tmpHTML += (extravideo_role.E0C0 == 1 ? '國小國文；' : '');
                        tmpHTML += (extravideo_role.E0E0 == 1 ? '國小英文；' : '');
                        tmpHTML += (extravideo_role.E0M0 == 1 ? '國小數學；' : '');
                        tmpHTML += (extravideo_role.E0N0 == 1 ? '國小自然；' : '');
                        tmpHTML += (extravideo_role.E0S0 == 1 ? '國小社會；' : '');
                        $('[data-field="extravideo_role_E0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (extravideo_role.EPC0 == 1 ? '升私中國文；' : '');
                        tmpHTML += (extravideo_role.EPE0 == 1 ? '升私中英文；' : '');
                        tmpHTML += (extravideo_role.EPM0 == 1 ? '國小資優數學；' : '');
                        tmpHTML += (extravideo_role.EPN0 == 1 ? '升私中自然；' : '');
                        tmpHTML += (extravideo_role.EPS0 == 1 ? '升私中社會；' : '');
                        // //升私中更動
                        // tmpHTML += (extravideo_role.EPE11 == 1 ? '英語常用單字2000；' : '');
                        // tmpHTML += (extravideo_role.EPE13 == 1 ? '英語高頻單字2001~4500；' : '');
                        // tmpHTML += (extravideo_role.EPE14 == 1 ? '英語終極單字4501~7000；' : '');
                        // tmpHTML += (extravideo_role.EPE12 == 1 ? '英單字根字首拼圖法；' : '');
                        // tmpHTML += (extravideo_role.EPE21 == 1 ? '全民英檢GEPT初級；' : '');
                        // tmpHTML += (extravideo_role.EPZ0 == 1 ? '紫微斗數輕鬆學；' : '');
                        // //


                        $('[data-field="extravideo_role_EP"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (extravideo_role.J0C0 == 1 ? '國中國文；' : '');
                        tmpHTML += (extravideo_role.J0E0 == 1 ? '國中英文；' : '');
                        tmpHTML += (extravideo_role.J0M0 == 1 ? '國中數學；' : '');
                        tmpHTML += (extravideo_role.J0N0 == 1 ? '國中自然；' : '');
                        tmpHTML += (extravideo_role.J0S0 == 1 ? '國中社會；' : '');
                        $('[data-field="extravideo_role_J0"]').html(tmpHTML);

                        tmpHTML = '';
                        tmpHTML += (extravideo_role.H0C0 == 1 ? '高中國文；' : '');
                        tmpHTML += (extravideo_role.H0E0 == 1 ? '高中英文；' : '');
                        tmpHTML += (extravideo_role.H0M0 == 1 ? '高中數學；' : '');
                        tmpHTML += (extravideo_role.H0N1 == 1 ? '高中生物；' : '');
                        tmpHTML += (extravideo_role.H0N3 == 1 ? '高中地球科學；' : '');
                        tmpHTML += (extravideo_role.H0N4 == 1 ? '高中物理；' : '');
                        tmpHTML += (extravideo_role.H0N5 == 1 ? '高中化學；' : '');
                        tmpHTML += (extravideo_role.H0S1 == 1 ? '高中歷史；' : '');
                        tmpHTML += (extravideo_role.H0S2 == 1 ? '高中地理；' : '');
                        tmpHTML += (extravideo_role.H0S3 == 1 ? '高中公民；' : '');
                        $('[data-field="extravideo_role_H0"]').html(tmpHTML);

                        //設定機構
                        getDomainSchool(r.data[0].school_idm, r.data[0].allow_school_id);


                    } else {
                        alert('無此資料！');
                        location.href = '/admin/manager/';
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });

            $('.manager-data-view').show();
            $('.manager-data-edit').hide();
        }

    };


    var newObj = {};
    initObj();
    init();

    getmanagerData();
    // gethideroleData();

    function init() {
        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', '');
        bs.initSelectElement('#grade_code', '/admin/quizpaper/get-grade-code', '', '', '');
        bs.initSelectElement('#user_type_id', '/admin/school/get-user-type', '', '', '');

        bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+$('#school_id').val());

        //切換分校時初始化班級
        $('#school_id').on('change', function(e) {
            e.preventDefault();
            bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+$('#school_id').val());
        });


        newObj = initObj();

        var validate_birthday = '1';
        var this_date = new Date().getFullYear();
        var date_text = '';
        date_text+='<option value="-1"> -- </option>';
        for(var i=0; i<120; i++){
            date_text+='<option value="'+this_date+'">'+ this_date +'年</option>';
            this_date--;
        }
        $('#year').empty().append(date_text);

        date_text = '';
        date_text+='<option value="-1"> -- </option>';
        for(var i=1; i<13; i++){
            date_text+='<option value="'+i+'">'+ i +'月</option>';
        }
        $('#month').empty().append(date_text);

        date_text = '';
        date_text+='<option value="-1"> -- </option>';
        for(var i=1; i<32; i++){
            date_text+='<option value="'+i+'">'+ i +'日</option>';
        }
        $('#day').empty().append(date_text);

        //驗證日期
        $('#year, #month, #day').on('change',function(e){
            e.preventDefault();

            if($('#year').val()=='-1' && $('#month').val()=='-1' && $('#day').val()=='-1'){
                $('#birthday-info').attr('style', 'display: none');
                validate_birthday = '1';
                return false;
            }

            var dataObj = {};
            dataObj.year = $('#year').val();
            dataObj.month = $('#month').val();
            dataObj.day = $('#day').val();

            $.ajax({
                url: '/admin/manager/validate-birthday',
                type: 'POST',
                data: dataObj,
                success: function(res) {
                    if(res == 'Y'){
                        $('#birthday-info').attr('style', 'display: none');
                        validate_birthday = '1';
                    }else{
                        $('#birthday-info').attr('style', 'display: inline');
                        validate_birthday = '0';
                    }
                },
                error: bs.errorHandler
            });
        });

        $('#user_type_id').on('select2:select', function (e) {
            var data = e.params.data;
            //設定機構
            getDomainSchool($('#school_iJ0C0d').val(), $('#allow_school_id').val());
            //alert(data.id);
            if (data.id == '2') {
                $('#is_print').prop('checked', false);
            } else if (data.id == '3') {
                $('#is_print').prop('checked', true);
            } else if (data.id == '4') {
                $('#is_print').prop('checked', true);
            }
        });


        //重置密碼
        $('#btn-manager-resetpwd').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-manager-resetpwd').modal('show');
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });

        //重置密碼-儲存
        $('#btnsave-manager-resetpwd').on('click',function(e){
            e.preventDefault();

            if ($('#newpassword').val()=='') {
                alert('請輸入新密碼!');
                return false;
            }
            if ($('#newpassword').val().length < 4) {
                alert('新密碼長度至少需要4碼!');
                return false;
            }
            if ($('#renewpassword').val()=='') {
                alert('請輸入確認新密碼!');
                return false;
            }
            if ($('#newpassword').val() != $('#renewpassword').val()) {
                alert('「新密碼」和「確認新密碼」不一致，請確認!');
                return false;
            }

            //將全型轉半型
            bs.fullChar2halfChar(document.getElementById('newpassword'));
            bs.fullChar2halfChar(document.getElementById('renewpassword'));
            //去掉空白
            $('#newpassword').val($('#newpassword').val().replace(/\ +/g, ''));
            $('#renewpassword').val($('#renewpassword').val().replace(/\ +/g, ''));
            //去掉全形空白
            $('#newpassword').val($('#newpassword').val().replace('　', ''));
            $('#newpassword').val($('#newpassword').val().replace('　', ''));
            $('#newpassword').val($('#newpassword').val().replace('　', ''));
            $('#renewpassword').val($('#renewpassword').val().replace('　', ''));
            $('#renewpassword').val($('#renewpassword').val().replace('　', ''));
            $('#renewpassword').val($('#renewpassword').val().replace('　', ''));

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.manager_id = id;
                dataObj.password = $('#newpassword').val();
                $.ajax({
                    url: '/admin/manager/manager-resetpwd',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    cache: false,
                    success: function (r) {
                        if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                            alert(r.stateinfo);
                        }
                        if ((r.reurl != '') && (r.reurl !== undefined)) {
                            location.replace(r.reurl);
                        }
                    },
                    error: bs.errorHandler,
                });
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });


        //帳號停用
        $('#btn-manager-close').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-manager-close').modal('show');
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });

        //帳號啟用
        $('#btn-manager-open').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-manager-open').modal('show');
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });

        //帳號停用-儲存
        $('#btnsave-manager-close').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.manager_id = id;
                $.ajax({
                    url: '/admin/manager/manager-inactive',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    cache: false,
                    success: function (r) {
                        if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                            alert(r.stateinfo);
                        }
                        if ((r.reurl != '') && (r.reurl !== undefined)) {
                            location.replace(r.reurl);
                        }
                    },
                    error: bs.errorHandler,
                });
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });

        //帳號啟用-儲存
        $('#btnsave-manager-open').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.manager_id = id;
                $.ajax({
                    url: '/admin/manager/manager-active',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    cache: false,
                    success: function (r) {
                        if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                            alert(r.stateinfo);
                        }
                        if ((r.reurl != '') && (r.reurl !== undefined)) {
                            location.replace(r.reurl);
                        }
                    },
                    error: bs.errorHandler,
                });
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/student/';
            }
        });


        //刪除教職員
        $('#btn-manager-delete').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-manager-delete').modal('show');
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });

        //刪除教職員-儲存
        $('#btnsave-manager-delete').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.manager_id = id;
                $.ajax({
                    url: '/admin/manager/manager-delete',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    cache: false,
                    success: function (r) {
                        if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                            alert(r.stateinfo);
                        }
                        if ((r.reurl != '') && (r.reurl !== undefined)) {
                            location.replace(r.reurl);
                        }
                    },
                    error: bs.errorHandler,
                });
            } else {
                swal('無此教職員資料!');
                location.href = '/admin/manager/';
            }
        });


        //基本資料-更改資料
        $('#btn-manager-base-edit').on('click',function(e){
            e.preventDefault();
            $('.manager-base-data-view').hide();
            $('.manager-base-data-edit').show();
            $('.manager-base-data-hide').hide();
        });

        //基本資料-取消
        $('#btn-manager-base-view').on('click',function(e){
            e.preventDefault();
            $('.manager-base-data-view').show();
            $('.manager-base-data-edit').hide();
        });

        //服候設定-更改資料
        $('#btn-manager-service-edit').on('click',function(e){
            e.preventDefault();
            $('.manager-service-data-view').hide();
            $('.manager-service-data-edit').show();
        });

        //服候設定-取消
        $('#btn-manager-service-view').on('click',function(e){
            e.preventDefault();
            $('.manager-service-data-view').show();
            $('.manager-service-data-edit').hide();
        });


        //班級設定-更改資料
        $('#btn-manager-schoolclass-edit').on('click',function(e){
            e.preventDefault();
            $('.manager-schoolclass-data-view').hide();
            $('.manager-schoolclass-data-edit').show();
        });

        //班級設定-取消
        $('#btn-manager-schoolclass-view').on('click',function(e){
            e.preventDefault();
            $('.manager-schoolclass-data-view').show();
            $('.manager-schoolclass-data-edit').hide();
        });


        //家長資料-更改資料
        $('#btn-manager-parent-edit').on('click',function(e){
            e.preventDefault();
            $('.manager-parent-data-view').hide();
            $('.manager-parent-data-edit').show();
        });

        //家長資料-取消
        $('#btn-manager-parent-view').on('click',function(e){
            e.preventDefault();
            $('.manager-parent-data-view').show();
            $('.manager-parent-data-edit').hide();
        });

        //允許修改密碼
        // $('input[type=radio][name=allow_change_password]').change(function(){
        //     if (this.value == '1') {
        //         //強迫修改密碼
        //         $('#force_change_password').prop('disabled', false);
        //     }
        //     else {
        //         $('#force_change_password').prop('disabled', true);
        //     }
        // });

        //完成新增
        $('#manager-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                first_name: 'required',
                birthday: 'required',
                email: {required: true, email: true},
                manager_username: 'required',
                manager_password: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                first_name: '請輸入姓名',
                birthday: '請選擇日期',
                email: '請輸入正確的Email格式',
                manager_username: '請輸入帳號',
                manager_password: '請輸入密碼',
            },
            submitHandler: function(form) {

                return false;
            },
        });

        $('#manager-submit').on('click', function() {
            $('#first_name').val($('#first_name').val().trim());
            $('#email').val($('#email').val().trim());
            $('#manager_username').val($('#manager_username').val().trim());
            $('#manager_password').val($('#manager_password').val().trim());

            if($('#first_name').val() == ''){
                alert('請輸入姓名');
            }

            if($('#email').val() == ''){
                alert('請輸入正確的Email格式');
            }

            if($('#manager_username').val() == ''){
                alert('請輸入帳號');
            }

            if($('#manager_password').val() == ''){
                alert('請輸入密碼');
            }

            //教職員帳號填寫生日暫時註解
            if ($('#year').val()==-1 && $('#month').val()==-1 && $('#day').val()==-1){
                alert('請填寫生日');
                return false;
            }
            var phone=$('#phone').val();
            if (phone==''){
                alert('手機號碼不能為空白');
                return false;
            }
            if (bs.isChina(phone)) {
                alert('手機號碼不得含有中文!');
                return false;
            }
            var re = /^09[0-9]{8}$/;
            if (re.test(phone)==false) {
                alert('手機必須為十碼數字,前面兩碼為09');
                return false;
            }



            if ($('#manager-form').valid()) {

				if (bs.isChina($('#manager_username').val())) {
                    alert('帳號不得含有中文!');
                    return false;
                }

                if(validate_birthday == '0'){
                    alert('生日資料不正確!');
                    return false;
                }

                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'manager';
                dataObj.id = bs.getUrlVar('id');
                dataObj.user_type_id = $('#user_type_id').val();
                dataObj.school_id = $('#school_id').val();
                dataObj.first_name = $('#first_name').val();
                if(validate_birthday == '1') {
                    dataObj.birthday = $('#year').val() +'-'+ $('#month').val() +'-'+ $('#day').val();
                }
                dataObj.card_no = $('#card_no').val();
                dataObj.phone   = $('#phone').val();
                dataObj.email = $('#email').val();
                dataObj.username = $('#manager_username').val();
                dataObj.password = $('#manager_password').val();
                dataObj.allow_change_password = $('input[name="allow_change_password"]:checked').val();
                if ($('input[name="force_change_password"]:checked').val() == '1') {
                    dataObj.force_change_password = 1;
                } else {
                    dataObj.force_change_password = 0;
                }
                // 內容
                dataObj.course_role = get_course_role();

                // 教學影片
                dataObj.coursevideo_role = get_coursevideo_role();
                // 影音系統
                dataObj.extravideo_role = get_extravideo_role();



                // 列印
                if ($('input[name="is_print"]:checked').val() == '1') {
                    dataObj.is_print = 1;
                } else {
                    dataObj.is_print = 0;
                }

                //dataObj.allow_school_id = $('#allow_school_id').val();
                var array_allow_school_id=[];
                $('input:checkbox[name=chk_allow_school_id]:checked').each(function(){
                    array_allow_school_id.push($(this).val());
                });
                array_allow_school_id.sort();
                dataObj.allow_school_id=array_allow_school_id;
                //
                // if (array_allow_school_id.length ==0) {
                //     alert('錯誤!請至少選擇1個機構!');
                //     return false;
                // }

                //代課班級
                dataObj.schoolclass_id = $('#schoolclass_id').val();
                if ($('#user_type_id').val()==4 && $('#schoolclass_id').val()!=null){
                    alert('分校主任不需代班');
                    return false;

                }




                $.ajax({
                    url: '/admin/manager/manager-add',
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


        //基本資料
        $('#manager-base-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                user_no: 'required',
                first_name: 'required',
                birthday: 'required',
                grade_code: 'required',
                email: {required: true, email: true},
                manager_username: 'required',
                phone:'required',
            },
            messages: {
                school_id: '請選擇機構',
                user_no: '請輸入學號',
                first_name: '請輸入姓名',
                birthday: '請選擇日期',
                grade_code: '請選擇機構',
                email: '請輸入正確的Email格式',
                manager_username: '請輸入帳號',
                phone:'請輸入手機號碼',
            },
        });

        $('#manager-base-submit').on('click', function() {
            $('#first_name').val($('#first_name').val().trim());
            $('#email').val($('#email').val().trim());
            $('#manager_username').val($('#manager_username').val().trim());

            if($('#first_name').val() == ''){
                alert('請輸入姓名');
            }

            if($('#email').val() == ''){
                alert('請輸入正確的Email格式');
            }

            if($('#manager_username').val() == ''){
                alert('請輸入帳號');
            }
            //教職員帳號填寫生日暫時註解
            if ($('#year').val()==-1 && $('#month').val()==-1 && $('#day').val()==-1){
                alert('請填寫生日');
                return false;
            }

            var phone=$('#phone').val();
            if (phone==''){
                alert('手機號碼不能為空白');
                return false;
            }
            if (bs.isChina(phone)) {
                alert('手機號碼不得含有中文!');
                return false;
            }
            var re = /^09[0-9]{8}$/;
            if (re.test(phone)==false) {
                alert('手機必須為十碼數字,前面兩碼為09');
                return false;
            }

            if ($('#manager-base-form').valid()) {

                if(validate_birthday == '0'){
                    alert('生日資料不正確!');
                    return false;
                }

                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'manager-base';
                dataObj.id = bs.getUrlVar('id');
                dataObj.school_id = $('#school_id').val();
                dataObj.first_name = $('#first_name').val();
                if(validate_birthday == '1') {
                    dataObj.birthday = $('#year').val() +'-'+ $('#month').val() +'-'+ $('#day').val();
                }
                dataObj.card_no = $('#card_no').val();
                dataObj.phone   = $('#phone').val();
                dataObj.email = $('#email').val();
                dataObj.username = $('#manager_username').val();
                dataObj.allow_change_password = $('input[name="allow_change_password"]:checked').val();
                if ($('input[name="force_change_password"]:checked').val() == '1') {
                    dataObj.force_change_password = 1;
                } else {
                    dataObj.force_change_password = 0;
                }

                $.ajax({
                    url: '/admin/manager/manager-add',
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

        //服務設定
        $('#manager-service-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                manager_username: 'required',
            },
            messages: {
                manager_username: '請輸入帳號',
            },
        });

        $('#manager-service-submit').on('click', function() {
            if ($('#manager-service-form').valid()) {

				if (bs.isChina($('#manager_username').val())) {
                    alert('帳號不得含有中文!');
                    return false;
                }

                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'manager-service';
                dataObj.id = bs.getUrlVar('id');
                dataObj.user_type_id = $('#user_type_id').val();

                //dataObj.allow_school_id = $('#allow_school_id').val();
                var array_allow_school_id=[];
                $('input:checkbox[name=chk_allow_school_id]:checked').each(function(){
                    array_allow_school_id.push($(this).val());
                });
                array_allow_school_id.sort();
                dataObj.allow_school_id=array_allow_school_id;
                //
                // if (array_allow_school_id.length ==0) {
                //     alert('錯誤!請至少選擇1個機構!');
                //     return false;
                // }
                dataObj.card_no = $('#card_no').val();


                // 內容
                dataObj.course_role = get_course_role();
                // 教學影片
                dataObj.coursevideo_role = get_coursevideo_role();
                // 影音系統
                dataObj.extravideo_role = get_extravideo_role();
                // 列印
                if ($('input[name="is_print"]:checked').val() == '1') {
                    dataObj.is_print = 1;
                } else {
                    dataObj.is_print = 0;
                }

                $.ajax({
                    url: '/admin/manager/manager-add',
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

        //班級設定-更新班級
        $('#manager-schoolclass-submit').on('click',function(e){
            e.preventDefault();
            //相關參數
            var dataObj = {};
            dataObj.user_type_id = $('#user_type_id').val();
            if (dataObj.user_type_id==4){
                swal('分校主任不需代班');
                return false;
            }
            dataObj.id = bs.getUrlVar('id');
            dataObj.schoolclass_id = $('#schoolclass_id').val();

            $.ajax({
                url: '/admin/school/set-teacher-schoolclass',
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



        });

    }

    function gethideroleData() {
        $.ajax({
            url: '/admin/manager/get-hiderole-data',
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            success: function (r) {
                var course_hide_role=r.data[0].course_hide_role;
                var coursevideo_hide_role=r.data[0].coursevideo_hide_role;
                var extravideo_hide_role=r.data[0].extravideo_hide_role;
                if (course_hide_role.indexOf('no_hide_data')==-1){

                    for (var i = 0; i < course_hide_role.length; i++) {
                        $('#'+course_hide_role[i]).parent().hide();
                    }
                }
                if (coursevideo_hide_role.indexOf('no_hide_data')==-1) {
                    for (var i = 0; i < coursevideo_hide_role.length; i++) {
                        $('#' + coursevideo_hide_role[i]).parent().hide();
                    }
                }
                if (extravideo_hide_role.indexOf('no_hide_data')==-1) {
                    for (var i = 0; i < extravideo_hide_role.length; i++) {
                        $('#' + extravideo_hide_role[i]).parent().hide();
                    }
                }
            },
            error: bs.errorHandler,
        });
    }

    function initObj() {
        $('#birthday').datetimepicker({
            step: 30,
            format: 'Y/m/d'
        });
        gethideroleData()
    }

});
