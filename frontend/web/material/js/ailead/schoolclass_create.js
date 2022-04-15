$(function () {
    'use strict';
    var newObj = {};
    newObj.knowledge_well_std = [];
    newObj.first_stuids=[];
    newObj.tmp_stuids=[];

    function initRole() {
        $('#E1A').prop('checked', false);
        $('#E1B').prop('checked', false);
        $('#E2A').prop('checked', false);
        $('#E2B').prop('checked', false);
        $('#E3A').prop('checked', false);
        $('#E3B').prop('checked', false);
        $('#E4A').prop('checked', false);
        $('#E4B').prop('checked', false);
        $('#E5A').prop('checked', false);
        $('#E5B').prop('checked', false);
        $('#E6A').prop('checked', false);
        $('#E6B').prop('checked', false);
        $('#EP').prop('checked', false);
        $('#EPA').prop('checked', false);
        $('#EPB').prop('checked', false);
        $('#J1A').prop('checked',false);
        $('#J1B').prop('checked',false);
        $('#J2A').prop('checked',false);
        $('#J2B').prop('checked',false);
        $('#J3A').prop('checked',false);
        $('#J3B').prop('checked',false);
        $('#H1A').prop('checked',false);
        $('#H1B').prop('checked',false);
        $('#H2A').prop('checked',false);
        $('#H2B').prop('checked',false);
        $('#H3A').prop('checked',false);
        $('#H3B').prop('checked',false);
        $('#J0').prop('checked',false);
        $('#H0').prop('checked',false);
        //影片權限
        $('#video_E1A').prop('checked', false);
        $('#video_E1B').prop('checked', false);
        $('#video_E2A').prop('checked', false);
        $('#video_E2B').prop('checked', false);
        $('#video_E3A').prop('checked', false);
        $('#video_E3B').prop('checked', false);
        $('#video_E4A').prop('checked', false);
        $('#video_E4B').prop('checked', false);
        $('#video_E5A').prop('checked', false);
        $('#video_E5B').prop('checked', false);
        $('#video_E6A').prop('checked', false);
        $('#video_E6B').prop('checked', false);
        $('#video_EP').prop('checked', false);
        $('#video_EPA').prop('checked', false);
        $('#video_EPB').prop('checked', false);
        $('#video_J1A').prop('checked',false);
        $('#video_J1B').prop('checked',false);
        $('#video_J2A').prop('checked',false);
        $('#video_J2B').prop('checked',false);
        $('#video_J3A').prop('checked',false);
        $('#video_J3B').prop('checked',false);
        $('#video_H1A').prop('checked',false);
        $('#video_H1B').prop('checked',false);
        $('#video_H2A').prop('checked',false);
        $('#video_H2B').prop('checked',false);
        $('#video_H3A').prop('checked',false);
        $('#video_H3B').prop('checked',false);
        $('#video_J0').prop('checked',false);
        $('#video_H0').prop('checked',false);




        $('[name=div_E0_stop]').hide();
        $('[name=div_E0]').hide();
        $('[name=div_EP]').hide();
        $('[name=div_J0]').hide();
        $('[name=div_H0]').hide();
        $('[name=div_video_E0_stop]').hide();
        $('[name=div_video_E0]').hide();
        $('[name=div_video_EP]').hide();
        $('[name=div_video_J0]').hide();
        $('[name=div_video_H0]').hide();

        if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
            $('[name=div_E0]').show();
        } else if ($('#grade_code').val() == 'EP') {
            $('[name=div_EP]').show();
        } else if (($('#grade_code').val() == 'J1') || ($('#grade_code').val() == 'J2') || ($('#grade_code').val() == 'J3')) {
            $('[name=div_J0]').show();
        } else if (($('#grade_code').val() == 'H1') || ($('#grade_code').val() == 'H2') || ($('#grade_code').val() == 'H3')) {
            $('[name=div_H0]').show();
        }


    }

    $('#grade_code').on('select2:select', function (e) {

        initRole();

        var data = e.params.data;
        var E0_year = ['108', '107', '106', '105', '104', '103'];
        var EP_year = ['108'];
        var J0_year = ['108', '107', '106'];
        var H0_year = ['108', '107', '106'];

        if ((data.id == 'E1') || (data.id == 'E2') || (data.id == 'E3') || (data.id == 'E4') || (data.id == 'E5') || (data.id == 'E6')) {
            if (data.id == 'E1') {
                $('#text_year').val(JSON.parse(E0_year[0])).trigger('change');
            } else if (data.id == 'E2') {
                $('#text_year').val(JSON.parse(E0_year[1])).trigger('change');
            } else if (data.id == 'E3') {
                $('#text_year').val(JSON.parse(E0_year[2])).trigger('change');
            } else if (data.id == 'E4') {
                $('#text_year').val(JSON.parse(E0_year[3])).trigger('change');
            } else if (data.id == 'E5') {
                $('#text_year').val(JSON.parse(E0_year[4])).trigger('change');
            } else if (data.id == 'E6') {
                $('#text_year').val(JSON.parse(E0_year[5])).trigger('change');
            }
        } else if (data.id == 'EP') {
            $('#text_year').val(JSON.parse(EP_year[0])).trigger('change');
        } else if ((data.id == 'J1') || (data.id == 'J2') || (data.id == 'J3')) {
            if (data.id == 'J1') {
                $('#text_year').val(JSON.parse(J0_year[0])).trigger('change');
            } else if (data.id == 'J2') {
                $('#text_year').val(JSON.parse(J0_year[1])).trigger('change');
            } else if (data.id == 'J3') {
                $('#text_year').val(JSON.parse(J0_year[2])).trigger('change');
            }
        } else if ((data.id == 'H1') || (data.id == 'H2') || (data.id == 'H3')) {
            if (data.id == 'H1') {
                $('#text_year').val(JSON.parse(H0_year[0])).trigger('change');
            } else if (data.id == 'H2') {
                $('#text_year').val(JSON.parse(H0_year[1])).trigger('change');
            } else if (data.id == 'H3') {
                $('#text_year').val(JSON.parse(H0_year[2])).trigger('change');
            }
        }
    });

    //清除狀態
    function clearState() {
        $('#newpassword').val('');
        $('#renewpassword').val('');
        // $('#start_at').val('');
        // $('#end_at').val('');
        // $('#note').val('');
        // $('#btnDel').hide();
    }

    function getSchoolclassData() {
        var id = bs.getUrlVar('id');
        if (id.length == 0) {
            $('.schoolclass-data-view').hide();
            $('.schoolclass-data-edit').show();
        } else {
            var dataObj = {};
            dataObj.id = id;
            $.ajax({
                url: '/admin/schoolclass/get-schoolclass-data',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    if ((r != '[]') && (r != '')) {
                        // edit
                        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', r[0].school_id);
                        //bs.initSelectElement('#grade_code', '/admin/quizpaper/get-adminteacher-grade-code', '', '', r[0].grade_code);
                        getAdminTeacherGradeCode( r[0].grade_code);
						getSubjectCode(r[0].subject_code);
                        bs.initSelectElement('#text_year', '/admin/school/get-text-year', '', '', r[0].text_year);
                        bs.initTagElement('#school_tag_id', '/admin/school/get-school-tag', '', r[0].tags);
                        bs.initTagElement('#manager_id', '/admin/school/get-schoolclass-manager', 'school_id='+r[0].school_id, r[0].manager_id);
                        bs.initTagElement('#sub_manager_id', '/admin/school/get-schoolclass-sub-manager', 'school_id='+r[0].school_id, r[0].sub_manager_id);
                        bs.initTagElement('#student_id', '/admin/school/get-schoolclass-student', 'school_id='+r[0].school_id, r[0].student_id);

                        getGradeCodeByGrade($('#grade_code').val());

                        $('#name').val(r[0].name);

                        $('#start_at').val(r[0].start_at);
                        if (r[0].autocomplete == 1) {
                            $('#end_at').val(r[0].end_at);
                        } else {
                            // do nothing
                        }
                        $('input[name=autocomplete]').val([r[0].autocomplete]);
                        $('#text_year').val(r[0].text_year);




                        initRole();

                        var role = JSON.parse(r[0].role);
                        $('#is_exam').prop('checked', (r[0].is_exam == 1 ? true : false));
                        $('#E1A').prop('checked', (role.E1A == 1 ? true : false));
                        $('#E1B').prop('checked', (role.E1B == 1 ? true : false));
                        $('#E2A').prop('checked', (role.E2A == 1 ? true : false));
                        $('#E2B').prop('checked', (role.E2B == 1 ? true : false));
                        $('#E3A').prop('checked', (role.E3A == 1 ? true : false));
                        $('#E3B').prop('checked', (role.E3B == 1 ? true : false));
                        $('#E4A').prop('checked', (role.E4A == 1 ? true : false));
                        $('#E4B').prop('checked', (role.E4B == 1 ? true : false));
                        $('#E5A').prop('checked', (role.E5A == 1 ? true : false));
                        $('#E5B').prop('checked', (role.E5B == 1 ? true : false));
                        $('#E6A').prop('checked', (role.E6A == 1 ? true : false));
                        $('#E6B').prop('checked', (role.E6B == 1 ? true : false));
                        $('#EP').prop('checked', (role.EP == 1 ? true : false));
                        $('#EPA').prop('checked', (role.EPA == 1 ? true : false));
                        $('#EPB').prop('checked', (role.EPB == 1 ? true : false));
                        $('#J1A').prop('checked', (role.J1A == 1 ? true : false));
                        $('#J1B').prop('checked', (role.J1B == 1 ? true : false));
                        $('#J2A').prop('checked', (role.J2A == 1 ? true : false));
                        $('#J2B').prop('checked', (role.J2B == 1 ? true : false));
                        $('#J3A').prop('checked', (role.J3A == 1 ? true : false));
                        $('#J3B').prop('checked', (role.J3B == 1 ? true : false));
                        $('#H1A').prop('checked', (role.H1A == 1 ? true : false));
                        $('#H1B').prop('checked', (role.H1B == 1 ? true : false));
                        $('#H2A').prop('checked', (role.H2A == 1 ? true : false));
                        $('#H2B').prop('checked', (role.H2B == 1 ? true : false));
                        $('#H3A').prop('checked', (role.H3A == 1 ? true : false));
                        $('#H3B').prop('checked', (role.H3B == 1 ? true : false));
                        $('#J0').prop('checked', (role.J0 == 1 ? true : false));
                        $('#H0').prop('checked', (role.H0 == 1 ? true : false));




                        // 教學影片 教學影片的權限與自我練習分開,前面的控制ＩＤ做更改,存入還是以Ｅ1A為主
                        var video_role = JSON.parse(r[0].video_role);
                        $('#is_schoolvideo').prop('checked', (r[0].is_schoolvideo == 1 ? true : false));
                        $('#video_E1A').prop('checked', (video_role.E1A == 1 ? true : false));
                        $('#video_E1B').prop('checked', (video_role.E1B == 1 ? true : false));
                        $('#video_E2A').prop('checked', (video_role.E2A == 1 ? true : false));
                        $('#video_E2B').prop('checked', (video_role.E2B == 1 ? true : false));
                        $('#video_E3A').prop('checked', (video_role.E3A == 1 ? true : false));
                        $('#video_E3B').prop('checked', (video_role.E3B == 1 ? true : false));
                        $('#video_E4A').prop('checked', (video_role.E4A == 1 ? true : false));
                        $('#video_E4B').prop('checked', (video_role.E4B == 1 ? true : false));
                        $('#video_E5A').prop('checked', (video_role.E5A == 1 ? true : false));
                        $('#video_E5B').prop('checked', (video_role.E5B == 1 ? true : false));
                        $('#video_E6A').prop('checked', (video_role.E6A == 1 ? true : false));
                        $('#video_E6B').prop('checked', (video_role.E6B == 1 ? true : false));
                        $('#video_EP').prop('checked', (video_role.EP == 1 ? true : false));
                        $('#video_EPA').prop('checked', (video_role.EPA == 1 ? true : false));
                        $('#video_EPB').prop('checked', (video_role.EPB == 1 ? true : false));
                        $('#video_J1A').prop('checked', (video_role.J1A == 1 ? true : false));
                        $('#video_J1B').prop('checked', (video_role.J1B == 1 ? true : false));
                        $('#video_J2A').prop('checked', (video_role.J2A == 1 ? true : false));
                        $('#video_J2B').prop('checked', (video_role.J2B == 1 ? true : false));
                        $('#video_J3A').prop('checked', (video_role.J3A == 1 ? true : false));
                        $('#video_J3B').prop('checked', (video_role.J3B == 1 ? true : false));
                        $('#video_H1A').prop('checked', (video_role.H1A == 1 ? true : false));
                        $('#video_H1B').prop('checked', (video_role.H1B == 1 ? true : false));
                        $('#video_H2A').prop('checked', (video_role.H2A == 1 ? true : false));
                        $('#video_H2B').prop('checked', (video_role.H2B == 1 ? true : false));
                        $('#video_H3A').prop('checked', (video_role.H3A == 1 ? true : false));
                        $('#video_H3B').prop('checked', (video_role.H3B == 1 ? true : false));
                        $('#video_J0').prop('checked', (video_role.J0 == 1 ? true : false));
                        $('#video_H0').prop('checked', (video_role.H0 == 1 ? true : false));

                        //初始化顯示的部分
                        if(r[0].is_exam == 0){
                            $('#E1A').parent().hide();
                            $('#E1B').parent().hide();
                            $('#E2A').parent().hide();
                            $('#E2B').parent().hide();
                            $('#E3A').parent().hide();
                            $('#E3B').parent().hide();
                            $('#E4A').parent().hide();
                            $('#E4B').parent().hide();
                            $('#E5A').parent().hide();
                            $('#E5B').parent().hide();
                            $('#E6A').parent().hide();
                            $('#E6B').parent().hide();
                            $('#EP').parent().hide();
                            $('#EPA').parent().hide();
                            $('#EPB').parent().hide();
                            $('#J1A').parent().hide();
                            $('#J1B').parent().hide();
                            $('#J2A').parent().hide();
                            $('#J2B').parent().hide();
                            $('#J3A').parent().hide();
                            $('#J3B').parent().hide();
                            $('#H1A').parent().hide();
                            $('#H1B').parent().hide();
                            $('#H2A').parent().hide();
                            $('#H2B').parent().hide();
                            $('#H3A').parent().hide();
                            $('#H3B').parent().hide();
                            $('#J0').parent().hide();
                            $('#H0').parent().hide();
                        }




                        if (r[0].is_schoolvideo == 0){
                            $('#video_E1A').parent().hide();
                            $('#video_E1B').parent().hide();
                            $('#video_E2A').parent().hide();
                            $('#video_E2B').parent().hide();
                            $('#video_E3A').parent().hide();
                            $('#video_E3B').parent().hide();
                            $('#video_E4A').parent().hide();
                            $('#video_E4B').parent().hide();
                            $('#video_E5A').parent().hide();
                            $('#video_E5B').parent().hide();
                            $('#video_E6A').parent().hide();
                            $('#video_E6B').parent().hide();
                            $('#video_EP').parent().hide();
                            $('#video_EPA').parent().hide();
                            $('#video_EPB').parent().hide();
                            $('#video_J1A').parent().hide();
                            $('#video_J1B').parent().hide();
                            $('#video_J2A').parent().hide();
                            $('#video_J2B').parent().hide();
                            $('#video_J3A').parent().hide();
                            $('#video_J3B').parent().hide();
                            $('#video_H1A').parent().hide();
                            $('#video_H1B').parent().hide();
                            $('#video_H2A').parent().hide();
                            $('#video_H2B').parent().hide();
                            $('#video_H3A').parent().hide();
                            $('#video_H3B').parent().hide();
                            $('#video_J0').parent().hide();
                            $('#video_H0').parent().hide();
                        }


                        //初始化顯示的部分
                        if ($('input#is_exam').prop('checked')){
                            if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
                                $('[name=div_E0]').show();
                            } else if ($('#grade_code').val() == 'EP') {
                                //處理英檢初級顯示
                                if ($('#subject_code').val()=='E21'){
                                    $('#EPA').parent().show();
                                    $('#EPB').parent().show();
                                    $('#EP').parent().hide();
                                }else{
                                    $('#EP').parent().show();
                                    $('#EPA').parent().hide();
                                    $('#EPB').parent().hide();
                                }
                            } else if (($('#grade_code').val() == 'J1') || ($('#grade_code').val() == 'J2') || ($('#grade_code').val() == 'J3')) {
                                $('[name=div_J0]').show();
                            } else if (($('#grade_code').val() == 'H1') || ($('#grade_code').val() == 'H2') || ($('#grade_code').val() == 'H3')) {
                                $('[name=div_H0]').show();
                            }

                        }
                        else{
                            $('#E1A').prop('checked', false);
                            $('#E1B').prop('checked',  false);
                            $('#E2A').prop('checked',  false);
                            $('#E2B').prop('checked',  false);
                            $('#E3A').prop('checked',  false);
                            $('#E3B').prop('checked',  false);
                            $('#E4A').prop('checked',  false);
                            $('#E4B').prop('checked',  false);
                            $('#E5A').prop('checked',  false);
                            $('#E5B').prop('checked',  false);
                            $('#E6A').prop('checked', false);
                            $('#E6B').prop('checked',  false);
                            $('#EP').prop('checked',  false);
                            $('#EPA').prop('checked',  false);
                            $('#EPB').prop('checked',  false);
                            $('#J1A').prop('checked',  false);
                            $('#J1B').prop('checked', false);
                            $('#J2A').prop('checked', false);
                            $('#J2B').prop('checked',  false);
                            $('#J3A').prop('checked', false);
                            $('#J3B').prop('checked', false);
                            $('#H1A').prop('checked', false);
                            $('#H1B').prop('checked',  false);
                            $('#H2A').prop('checked',  false);
                            $('#H2B').prop('checked',  false);
                            $('#H3A').prop('checked', false);
                            $('#H3B').prop('checked',  false);
                            $('#J0').prop('checked', false);
                            $('#H0').prop('checked',  false);

                            $('#E1A').parent().hide();
                            $('#E1B').parent().hide();
                            $('#E2A').parent().hide();
                            $('#E2B').parent().hide();
                            $('#E3A').parent().hide();
                            $('#E3B').parent().hide();
                            $('#E4A').parent().hide();
                            $('#E4B').parent().hide();
                            $('#E5A').parent().hide();
                            $('#E5B').parent().hide();
                            $('#E6A').parent().hide();
                            $('#E6B').parent().hide();
                            $('#EP').parent().hide();
                            $('#EPA').parent().hide();
                            $('#EPB').parent().hide();
                            $('#J1A').parent().hide();
                            $('#J1B').parent().hide();
                            $('#J2A').parent().hide();
                            $('#J2B').parent().hide();
                            $('#J3A').parent().hide();
                            $('#J3B').parent().hide();
                            $('#H1A').parent().hide();
                            $('#H1B').parent().hide();
                            $('#H2A').parent().hide();
                            $('#H2B').parent().hide();
                            $('#H3A').parent().hide();
                            $('#H3B').parent().hide();
                            $('#J0').parent().hide();
                            $('#H0').parent().hide();
                        }



                        if ($('input#is_schoolvideo').prop('checked')){
                            if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
                                $('[name=div_video_E0]').show();
                            } else if ($('#grade_code').val() == 'EP') {
                                //處理英檢初級顯示
                                if ($('#subject_code').val()=='E21'){
                                    $('#video_EPA').parent().show();
                                    $('#video_EPB').parent().show();
                                    $('#video_EP').parent().hide();
                                }else{
                                    $('#video_EP').parent().show();
                                    $('#video_EPA').parent().hide();
                                    $('#video_EPB').parent().hide();
                                }
                            } else if (($('#grade_code').val() == 'J1') || ($('#grade_code').val() == 'J2') || ($('#grade_code').val() == 'J3')) {
                                $('[name=div_video_J0]').show();
                            } else if (($('#grade_code').val() == 'H1') || ($('#grade_code').val() == 'H2') || ($('#grade_code').val() == 'H3')) {
                                $('[name=div_video_H0]').show();
                            }

                        }
                        else{

                            $('#video_E1A').prop('checked', false);
                            $('#video_E1B').prop('checked',  false);
                            $('#video_E2A').prop('checked',  false);
                            $('#video_E2B').prop('checked',  false);
                            $('#video_E3A').prop('checked',  false);
                            $('#video_E3B').prop('checked',  false);
                            $('#video_E4A').prop('checked',  false);
                            $('#video_E4B').prop('checked',  false);
                            $('#video_E5A').prop('checked',  false);
                            $('#video_E5B').prop('checked',  false);
                            $('#video_E6A').prop('checked', false);
                            $('#video_E6B').prop('checked',  false);
                            $('#video_EP').prop('checked',  false);
                            $('#video_EPA').prop('checked',  false);
                            $('#video_EPB').prop('checked',  false);
                            $('#video_J1A').prop('checked',  false);
                            $('#video_J1B').prop('checked', false);
                            $('#video_J2A').prop('checked', false);
                            $('#video_J2B').prop('checked',  false);
                            $('#video_J3A').prop('checked', false);
                            $('#video_J3B').prop('checked', false);
                            $('#video_H1A').prop('checked', false);
                            $('#video_H1B').prop('checked',  false);
                            $('#video_H2A').prop('checked',  false);
                            $('#video_H2B').prop('checked',  false);
                            $('#video_H3A').prop('checked', false);
                            $('#video_H3B').prop('checked',  false);
                            $('#video_J0').prop('checked', false);
                            $('#video_H0').prop('checked',  false);

                            $('#video_E1A').parent().hide();
                            $('#video_E1B').parent().hide();
                            $('#video_E2A').parent().hide();
                            $('#video_E2B').parent().hide();
                            $('#video_E3A').parent().hide();
                            $('#video_E3B').parent().hide();
                            $('#video_E4A').parent().hide();
                            $('#video_E4B').parent().hide();
                            $('#video_E5A').parent().hide();
                            $('#video_E5B').parent().hide();
                            $('#video_E6A').parent().hide();
                            $('#video_E6B').parent().hide();
                            $('#video_EP').parent().hide();
                            $('#video_EPA').parent().hide();
                            $('#video_EPB').parent().hide();
                            $('#video_J1A').parent().hide();
                            $('#video_J1B').parent().hide();
                            $('#video_J2A').parent().hide();
                            $('#video_J2B').parent().hide();
                            $('#video_J3A').parent().hide();
                            $('#video_J3B').parent().hide();
                            $('#video_H1A').parent().hide();
                            $('#video_H1B').parent().hide();
                            $('#video_H2A').parent().hide();
                            $('#video_H2B').parent().hide();
                            $('#video_H3A').parent().hide();
                            $('#video_H3B').parent().hide();
                            $('#video_J0').parent().hide();
                            $('#video_H0').parent().hide();

                        }


                        // view
                        var tmpHTML = '';
                        var data = '';
                        var i = 0;
                        var video_tmpHTML='';



                        // 補強影片
                        if (r[0].is_makeupvideo == 1) {
                            $('.video_setting').show();
                            $('[data-field="is_makeupvideo"]').html('開啟');

                            $('#is_makeupvideo').prop('checked', true);
                        }else{
                            $('.video_setting').hide();
                            $('[data-field="is_makeupvideo"]').html('關閉');
                            $('[data-field="is_makeupvideo"]').prop('checked', false);
                        }

                        $('#makeupvideo_amount').val(r[0].makeupvideo_amount);
                        $('[data-field="makeupvideo_amount"]').html($('#makeupvideo_amount').val()+' 支以內');

                        $('#makeupstd').val(r[0].makeupstd);
                        $('[data-field="makeupstd"]').html($('#makeupstd').val()+' %');

                        var get_knowledge_well_std = [];
                        if(!r[0].knowledge_well_std || r[0].knowledge_well_std == ''){
                            get_knowledge_well_std = ["50","70"];
                            knowledge_well_set
                            $('#knowledge_well_set').hide();
                            $('#knowledge_well_unset').show();
                        }else{
                            get_knowledge_well_std = JSON.parse(r[0].knowledge_well_std);
                        }
                        $('[data-field="knowledge_well_low"]').html(get_knowledge_well_std[0]);
                        $('[data-field="knowledge_well_high"]').html(get_knowledge_well_std[1]);

                        var from = get_knowledge_well_std[0];
                        var to = get_knowledge_well_std[1];

                        var saveResult = function(data) {
                            from = data.from;
                            to = data.to;

                            newObj.knowledge_well_std = [];
                            newObj.knowledge_well_std.push(from.toString());
                            newObj.knowledge_well_std.push(to.toString());
                            $('.knowledge_well_low').html(from);
                            $('.knowledge_well_high').html(to);
                        };

                        $("#knowledge_well").ionRangeSlider({
                            type: "double",
                            grid: true,
                            min: 0,
                            max: 100,
                            from: from,
                            to: to,
                            onStart: function(data) {
                                saveResult(data);
                            },
                            onChange: saveResult,
                            onFinish: saveResult
                        });


                        $('[data-field="school_id"]').html($('#school_id option:selected').text());
                        $('[data-field="grade_code"]').html($('#grade_code option:selected').text());
                        $('[data-field="subject_code"]').html($('#subject_code option:selected').text());
                        $('[data-field="name"]').html(r[0].name);
                        if (r[0].tags) {
                            tmpHTML = '';
                            data = $('#school_tag_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                            if (tmpHTML != '') {
                                $('[data-field="school_tag_id"]').html(tmpHTML);
                            }
                        }

                        if (r[0].manager_id) {
                            tmpHTML = '';
                            data = $('#manager_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                            if (tmpHTML != '') {
                                $('[data-field="manager_id"]').html(tmpHTML);
                            }
                        }

                        if (r[0].sub_manager_id) {
                            tmpHTML = '';
                            data = $('#sub_manager_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                            if (tmpHTML != '') {
                                $('[data-field="sub_manager_id"]').html(tmpHTML);
                            }
                        }

                        if (r[0].student_id) {
                            tmpHTML = '';
                            data = $('#student_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                            if (tmpHTML != '') {
                                $('[data-field="student_id"]').html(tmpHTML);
                            }
                        }

                        $('[data-field="start_at"]').html(r[0].start_at);
                        if (r[0].autocomplete == 1) {
                            $('[data-field="end_at"]').html(r[0].end_at);
                        } else if(r[0].autocomplete == 0 && r[0].status == 0 && r[0].end_at != '1970-01-01') {
                            $('[data-field="end_at"]').html(r[0].end_at+'（手動結業）');
                        } else {
                            $('[data-field="end_at"]').html('手動結業');
                        }
                        $('[data-field="text_year"]').html(r[0].text_year);
                        //測評權限
                        tmpHTML = '';

                        if (r[0].is_exam == 1) {

                            //國小
                            if (role.E1A == 1) {
                                tmpHTML += $.trim($('input[name=E1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E1B == 1) {
                                tmpHTML += $.trim($('input[name=E1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E2A == 1) {
                                tmpHTML += $.trim($('input[name=E2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E2B == 1) {
                                tmpHTML += $.trim($('input[name=E2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E3A == 1) {
                                tmpHTML += $.trim($('input[name=E3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E3B == 1) {
                                tmpHTML += $.trim($('input[name=E3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E4A == 1) {
                                tmpHTML += $.trim($('input[name=E4A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E4B == 1) {
                                tmpHTML += $.trim($('input[name=E4B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E5A == 1) {
                                tmpHTML += $.trim($('input[name=E5A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E5B == 1) {
                                tmpHTML += $.trim($('input[name=E5B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E6A == 1) {
                                tmpHTML += $.trim($('input[name=E6A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.E6B == 1) {
                                tmpHTML += $.trim($('input[name=E6B]')[0].nextSibling.nodeValue) + '；';
                            }
                            //升私中
                            if (role.EP == 1) {
                                tmpHTML += $.trim($('input[name=EP]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.EPA == 1) {
                                tmpHTML += $.trim($('input[name=EPA]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.EPB == 1) {
                                tmpHTML += $.trim($('input[name=EPB]')[0].nextSibling.nodeValue) + '；';
                            }
                            //國中
                            if (role.J1A == 1) {
                                tmpHTML += $.trim($('input[name=J1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J1B == 1) {
                                tmpHTML += $.trim($('input[name=J1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J2A == 1) {
                                tmpHTML += $.trim($('input[name=J2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J2B == 1) {
                                tmpHTML += $.trim($('input[name=J2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J3A == 1) {
                                tmpHTML += $.trim($('input[name=J3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J3B == 1) {
                                tmpHTML += $.trim($('input[name=J3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.J0 == 1) {
                                tmpHTML += $.trim($('input[name=J0]')[0].nextSibling.nodeValue) + '；';
                            }
                            //高中
                            if (role.H1A == 1) {
                                tmpHTML += $.trim($('input[name=H1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H1B == 1) {
                                tmpHTML += $.trim($('input[name=H1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H2A == 1) {
                                tmpHTML += $.trim($('input[name=H2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H2B == 1) {
                                tmpHTML += $.trim($('input[name=H2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H3A == 1) {
                                tmpHTML += $.trim($('input[name=H3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H3B == 1) {
                                tmpHTML += $.trim($('input[name=H3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (role.H0 == 1) {
                                tmpHTML += $.trim($('input[name=H0]')[0].nextSibling.nodeValue) + '；';
                            }
                            $('[data-field="role"]').html('允許; '+tmpHTML);

                        }else{
                            $('[data-field="role"]').html('禁止');
                        }

                        // 教學影片
                        if (r[0].is_schoolvideo == 1) {

                            if (video_role.E1A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E1B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E2A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E2B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E3A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E3B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E4A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E4A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E4B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E4B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E5A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E5A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E5B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E5B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E6A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E6A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.E6B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_E6B]')[0].nextSibling.nodeValue) + '；';
                            }
                            //升私中
                            if (video_role.EP == 1) {
                                video_tmpHTML += $.trim($('input[name=video_EP]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.EPA == 1) {
                                video_tmpHTML += $.trim($('input[name=video_EPA]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.EPB == 1) {
                                video_tmpHTML += $.trim($('input[name=video_EPB]')[0].nextSibling.nodeValue) + '；';
                            }
                            //國中
                            if (video_role.J1A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J1B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J2A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J2B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J3A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J3B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.J0 == 1) {
                                video_tmpHTML += $.trim($('input[name=video_J0]')[0].nextSibling.nodeValue) + '；';
                            }
                            //高中
                            if (video_role.H1A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H1A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H1B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H1B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H2A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H2A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H2B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H2B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H3A == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H3A]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H3B == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H3B]')[0].nextSibling.nodeValue) + '；';
                            }
                            if (video_role.H0 == 1) {
                                video_tmpHTML += $.trim($('input[name=video_H0]')[0].nextSibling.nodeValue) + '；';
                            }
                            $('[data-field="is_schoolvideo"]').html('允許; '+video_tmpHTML);


                        } else {
                            $('[data-field="is_schoolvideo"]').html('禁止');

                        }



                        //結業班級不可修改資料，可複製班級
                        if(r[0].status == '0'){
                            $('#btn-schoolclass-base-edit, #btn-schoolclass-manager-edit, #btn-schoolclass-student-edit, #btn-schoolclass-service-edit')
                                .off()
                                .removeClass('btn-success')
                                .addClass('btn-secondary');
                            $('#btn-schoolclass-student-info')
                                .attr('href', 'javascript:void(0)')
                                .attr('target', '')
                                .removeClass('btn-success')
                                .addClass('btn-secondary');
                        }

                    } else {
                        alert('無此資料！');
                        location.href = '/admin/schoolclass/';
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });

            $('.schoolclass-data-view').show();
            $('.schoolclass-data-edit').hide();
        }
    }



    function getAdminTeacherGradeCode(grade_code){


        var dataObj ={};
        dataObj.page_mode='schoolclass_create'
        $.ajax({
            url: '/admin/quizpaper/get-adminteacher-grade-code',
            type: 'post',
            data: dataObj,
            async: false,
            cache: false,
            success: function(res) {
                $('#grade_code option').remove();

                $.each(res, function(key, item) {
                    $('#grade_code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#grade_code').select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity
                });

                if (grade_code != '') {
                    $('#grade_code').val(grade_code).trigger('change');
                }
            },
            error: bs.errorHandler
        });



    };

    init();
    getSchoolclassData();

    getSerialnoData();//序號使用表

    function init() {
        // setup1

        // 開課時間
        $('#start_at').datetimepicker({
            step: 30,
            format: 'Y/m/d'
        });

        // 結束時間
        $('#end_at').datetimepicker({
            step: 30,
            format: 'Y/m/d'
        });

        //加入班級
        $('#btn-schoolclass-add').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                clearState();

                var tmpHTML = '';
                var dataObj = {};
                dataObj.schoolclass_id = id;
                $.ajax({
                    url: '/admin/schoolclass/get-schoolclass-add-list',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.data.length > 0) {
                            tmpHTML = '';
                            for (var i = 0; i < r.data.length; i++) {
                                tmpHTML += '<div><input type="checkbox" name="check-schoolclass-add" value="' + r.data[i].id + '" /> <span>' + r.data[i].name + '</span></div>';
                            }
                            $('#div-schoolclass-add').html(tmpHTML);
                        } else {
                            tmpHTML = '無可加入課程!';
                            $('#div-schoolclass-add').html(tmpHTML);
                        }
                    },
                    error: bs.errorHandler,
                });

                //彈跳班級視窗
                $('#modal-schoolclass-add').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //加入班級-儲存
        $('#btnsave-schoolclass-add').on('click', function (e) {
            e.preventDefault();

            if ($('input[name=check-schoolclass-add]').length == 0) {
                alert('無可加入課程!');
                return false;
            }

            if ($('input[name=check-schoolclass-add]:checked').val() == '') {
                alert('請選擇欲加入課程!');
                return false;
            }

            var schoolclass_ids = [];
            $('input[name=check-schoolclass-add]:checked').each(function () {
                schoolclass_ids.push(this.value);
            });

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.schoolclass_id = id;
                dataObj.schoolclass_ids = schoolclass_ids;
                $.ajax({
                    url: '/admin/schoolclass/schoolclass-schoolclass-add',
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
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });



        //退出班級
        $('#btn-schoolclass-delete').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                clearState();

                var tmpHTML = '';
                var dataObj = {};
                dataObj.schoolclass_id = id;
                $.ajax({
                    url: '/admin/schoolclass/get-schoolclass-delete-list',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.data.length > 0) {
                            tmpHTML = '';
                            for (var i = 0; i < r.data.length; i++) {
                                tmpHTML += '<div><input type="checkbox" name="check-schoolclass-delete" value="' + r.data[i].id + '" /> <span>' + r.data[i].name + '</span></div>';
                            }
                            $('#div-schoolclass-delete').html(tmpHTML);
                        } else {
                            tmpHTML = '無可刪除課程!';
                            $('#div-schoolclass-delete').html(tmpHTML);
                        }
                    },
                    error: bs.errorHandler,
                });

                //彈跳班級視窗
                $('#modal-schoolclass-delete').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //退出班級-儲存
        $('#btnsave-schoolclass-delete').on('click', function (e) {
            e.preventDefault();

            if ($('input[name=check-schoolclass-delete]').length == 0) {
                alert('無可刪除課程!');
                return false;
            }

            if ($('input[name=check-schoolclass-delete]:checked').val() == '') {
                alert('請選擇欲刪除課程!');
                return false;
            }

            var schoolclass_ids = [];
            $('input[name=check-schoolclass-delete]:checked').each(function () {
                schoolclass_ids.push(this.value);
            });

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.schoolclass_id = id;
                dataObj.schoolclass_ids = schoolclass_ids;
                $.ajax({
                    url: '/admin/schoolclass/schoolclass-schoolclass-delete',
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
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        $('input#is_exam').on('change',function (e){
            e.preventDefault();
            if ($('input#is_exam').prop('checked')){
                if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
                    $('[name=div_E0]').show();
                } else if ($('#grade_code').val() == 'EP') {
                    //處理英檢初級顯示
                    if ($('#subject_code').val()=='E21'){
                        $('#EPA').parent().show();
                        $('#EPB').parent().show();
                        $('#EP').parent().hide();
                    }else{
                        $('#EP').parent().show();
                        $('#EPA').parent().hide();
                        $('#EPB').parent().hide();
                    }
                } else if (($('#grade_code').val() == 'J1') || ($('#grade_code').val() == 'J2') || ($('#grade_code').val() == 'J3')) {
                    $('[name=div_J0]').show();
                } else if (($('#grade_code').val() == 'H1') || ($('#grade_code').val() == 'H2') || ($('#grade_code').val() == 'H3')) {
                    $('[name=div_H0]').show();
                }

            }
            else{
                $('#E1A').prop('checked', false);
                $('#E1B').prop('checked',  false);
                $('#E2A').prop('checked',  false);
                $('#E2B').prop('checked',  false);
                $('#E3A').prop('checked',  false);
                $('#E3B').prop('checked',  false);
                $('#E4A').prop('checked',  false);
                $('#E4B').prop('checked',  false);
                $('#E5A').prop('checked',  false);
                $('#E5B').prop('checked',  false);
                $('#E6A').prop('checked', false);
                $('#E6B').prop('checked',  false);
                $('#EP').prop('checked',  false);
                $('#EPA').prop('checked',  false);
                $('#EPB').prop('checked',  false);
                $('#J1A').prop('checked',  false);
                $('#J1B').prop('checked', false);
                $('#J2A').prop('checked', false);
                $('#J2B').prop('checked',  false);
                $('#J3A').prop('checked', false);
                $('#J3B').prop('checked', false);
                $('#H1A').prop('checked', false);
                $('#H1B').prop('checked',  false);
                $('#H2A').prop('checked',  false);
                $('#H2B').prop('checked',  false);
                $('#H3A').prop('checked', false);
                $('#H3B').prop('checked',  false);
                $('#J0').prop('checked', false);
                $('#H0').prop('checked',  false);

                $('#E1A').parent().hide();
                $('#E1B').parent().hide();
                $('#E2A').parent().hide();
                $('#E2B').parent().hide();
                $('#E3A').parent().hide();
                $('#E3B').parent().hide();
                $('#E4A').parent().hide();
                $('#E4B').parent().hide();
                $('#E5A').parent().hide();
                $('#E5B').parent().hide();
                $('#E6A').parent().hide();
                $('#E6B').parent().hide();
                $('#EP').parent().hide();
                $('#EPA').parent().hide();
                $('#EPB').parent().hide();
                $('#J1A').parent().hide();
                $('#J1B').parent().hide();
                $('#J2A').parent().hide();
                $('#J2B').parent().hide();
                $('#J3A').parent().hide();
                $('#J3B').parent().hide();
                $('#H1A').parent().hide();
                $('#H1B').parent().hide();
                $('#H2A').parent().hide();
                $('#H2B').parent().hide();
                $('#H3A').parent().hide();
                $('#H3B').parent().hide();
                $('#J0').parent().hide();
                $('#H0').parent().hide();
            }
        });


        $('input#is_schoolvideo').on('change',function (e){
            e.preventDefault();
            if ($('input#is_schoolvideo').prop('checked')){
                if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
                    $('[name=div_video_E0]').show();
                } else if ($('#grade_code').val() == 'EP') {
                    //處理英檢初級顯示
                    if ($('#subject_code').val()=='E21'){
                        $('#video_EPA').parent().show();
                        $('#video_EPB').parent().show();
                        $('#video_EP').parent().hide();
                    }else{
                        $('#video_EP').parent().show();
                        $('#video_EPA').parent().hide();
                        $('#video_EPB').parent().hide();
                    }
                } else if (($('#grade_code').val() == 'J1') || ($('#grade_code').val() == 'J2') || ($('#grade_code').val() == 'J3')) {
                    $('[name=div_video_J0]').show();
                } else if (($('#grade_code').val() == 'H1') || ($('#grade_code').val() == 'H2') || ($('#grade_code').val() == 'H3')) {
                    $('[name=div_video_H0]').show();
                }

            }
            else{

                $('#video_E1A').prop('checked', false);
                $('#video_E1B').prop('checked',  false);
                $('#video_E2A').prop('checked',  false);
                $('#video_E2B').prop('checked',  false);
                $('#video_E3A').prop('checked',  false);
                $('#video_E3B').prop('checked',  false);
                $('#video_E4A').prop('checked',  false);
                $('#video_E4B').prop('checked',  false);
                $('#video_E5A').prop('checked',  false);
                $('#video_E5B').prop('checked',  false);
                $('#video_E6A').prop('checked', false);
                $('#video_E6B').prop('checked',  false);
                $('#video_EP').prop('checked',  false);
                $('#video_EPA').prop('checked',  false);
                $('#video_EPB').prop('checked',  false);
                $('#video_J1A').prop('checked',  false);
                $('#video_J1B').prop('checked', false);
                $('#video_J2A').prop('checked', false);
                $('#video_J2B').prop('checked',  false);
                $('#video_J3A').prop('checked', false);
                $('#video_J3B').prop('checked', false);
                $('#video_H1A').prop('checked', false);
                $('#video_H1B').prop('checked',  false);
                $('#video_H2A').prop('checked',  false);
                $('#video_H2B').prop('checked',  false);
                $('#video_H3A').prop('checked', false);
                $('#video_H3B').prop('checked',  false);
                $('#video_J0').prop('checked', false);
                $('#video_H0').prop('checked',  false);

                $('#video_E1A').parent().hide();
                $('#video_E1B').parent().hide();
                $('#video_E2A').parent().hide();
                $('#video_E2B').parent().hide();
                $('#video_E3A').parent().hide();
                $('#video_E3B').parent().hide();
                $('#video_E4A').parent().hide();
                $('#video_E4B').parent().hide();
                $('#video_E5A').parent().hide();
                $('#video_E5B').parent().hide();
                $('#video_E6A').parent().hide();
                $('#video_E6B').parent().hide();
                $('#video_EP').parent().hide();
                $('#video_EPA').parent().hide();
                $('#video_EPB').parent().hide();
                $('#video_J1A').parent().hide();
                $('#video_J1B').parent().hide();
                $('#video_J2A').parent().hide();
                $('#video_J2B').parent().hide();
                $('#video_J3A').parent().hide();
                $('#video_J3B').parent().hide();
                $('#video_H1A').parent().hide();
                $('#video_H1B').parent().hide();
                $('#video_H2A').parent().hide();
                $('#video_H2B').parent().hide();
                $('#video_H3A').parent().hide();
                $('#video_H3B').parent().hide();
                $('#video_J0').parent().hide();
                $('#video_H0').parent().hide();

            }
        });



        //重置密碼
        $('#btn-schoolclass-resetpwd').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-schoolclass-resetpwd').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //重置密碼-儲存
        $('#btnsave-schoolclass-resetpwd').on('click', function (e) {
            e.preventDefault();

            if ($('#newpassword').val() == '') {
                alert('請輸入新密碼!');
                return false;
            }
            if ($('#newpassword').val().length < 4) {
                alert('新密碼長度至少需要4碼!');
                return false;
            }
            if ($('#renewpassword').val() == '') {
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
                dataObj.schoolclass_id = id;
                dataObj.password = $('#newpassword').val();
                $.ajax({
                    url: '/admin/schoolclass/schoolclass-resetpwd',
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
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });


        //帳號停用
        $('#btn-schoolclass-close').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-schoolclass-close').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //帳號停用-儲存
        $('#btnsave-schoolclass-close').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.schoolclass_id = id;
                $.ajax({
                    url: '/admin/schoolclass/schoolclass-inactive',
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
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //刪除學生
        $('#btn-schoolclass-delete').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-schoolclass-delete').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //刪除學生-儲存
        $('#btnsave-schoolclass-delete').on('click', function (e) {
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.schoolclass_id = id;
                $.ajax({
                    url: '/admin/schoolclass/schoolclass-delete',
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
                swal('無此學生資料!');
                location.href = '/admin/schoolclass/';
            }
        });

        //基本資料-更改資料
        $('#btn-schoolclass-base-edit').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-base-data-view').hide();
            $('.schoolclass-base-data-edit').show();
        });

        //基本資料-取消
        $('#btn-schoolclass-base-view').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-base-data-view').show();
            $('.schoolclass-base-data-edit').hide();
        });

        //複製班級
        $('#btn-schoolclass-copy').on('click', function (e) {
            e.preventDefault();
            location.href='create_wizard?copy='+bs.getUrlVar('id');
        });

        //老師設定-更改資料
        $('#btn-schoolclass-manager-edit').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-manager-data-view').hide();
            $('.schoolclass-manager-data-edit').show();
            $('.schoolclass-manager-data-hide').hide();
        });

        //老師設定-取消
        $('#btn-schoolclass-manager-view').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-manager-data-view').show();
            $('.schoolclass-manager-data-edit').hide();
        });

        //學生設定-更改資料
        $('#btn-schoolclass-student-edit').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-student-data-view').hide();
            $('.schoolclass-student-data-edit').show();

            newObj.first_stuids=$('#student_id').val();

            GetTempSchoolclassDeatil(newObj.first_stuids);
            //multiTbSet();
            $('.schoolclass-student-data-hide').hide();
        });

		$('#btn-schoolclass-student-info').attr('href','/admin/schoolclass/schoolclass_detail?cid='+bs.getUrlVar('id'));

        //學生設定-取消
        $('#btn-schoolclass-student-view').on('click', function (e) {
            e.preventDefault();
            newObj.first_stuids=[];
            getSchoolclassData();

            $('.schoolclass-student-data-view').show();
            $('.schoolclass-student-data-edit').hide();
        });

        //服務設定-更改資料
        $('#btn-schoolclass-service-edit').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-service-data-view').hide();
            $('.schoolclass-service-data-edit').show();
            $('.schoolclass-service-data-hide').hide();
            $('.video_setting').show();
        });

        //服務設定-取消
        $('#btn-schoolclass-service-view').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-service-data-view').show();
            $('.schoolclass-service-data-edit').hide();

            if ($('#is_makeupvideo').val==1){
                $('.video_setting').show();
            }else{
                $('.video_setting').hide();
            }
        });

        //家長資料-新增資料
        $('#btn-schoolclass-parent-add').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-parent-data-view').hide();
            $('.schoolclass-parent-data-edit').show();
            swal('功能建置中');
        });

        //家長資料-更改資料
        $('#btn-schoolclass-parent-edit').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-parent-data-view').hide();
            $('.schoolclass-parent-data-edit').show();
            swal('功能建置中');
        });

        //家長資料-取消
        $('#btn-schoolclass-parent-view').on('click', function (e) {
            e.preventDefault();
            $('.schoolclass-parent-data-view').show();
            $('.schoolclass-parent-data-edit').hide();
        });

        //完成新增
        $('#schoolclass-form').submit(function (e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                user_no: 'required',
                first_name: 'required',
                grade_code: 'required',
                schoolclass_username: 'required',
                schoolclass_password: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                user_no: '請輸入學號',
                first_name: '請輸入姓名',
                grade_code: '請選擇機構',
                schoolclass_username: '請輸入帳號',
                schoolclass_password: '請輸入密碼',
            },
            submitHandler: function (form) {

                return false;
            },
        });






        $('#schoolclass-submit').on('click', function () {
            if ($('#schoolclass-form').valid()) {
                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'schoolclass';
                dataObj.id = bs.getUrlVar('id');
                dataObj.school_id = $('#school_id').val();
                dataObj.user_no = $('#user_no').val();
                dataObj.first_name = $('#first_name').val();
                dataObj.grade_code = $('#grade_code').val();
                dataObj.username = $('#schoolclass_username').val();
                dataObj.password = $('#schoolclass_password').val();
                dataObj.seat_no = $('#seat_no').val();
                dataObj.note = $('#note').val();
                dataObj.photo = $('#photo').val();
                dataObj.allow_change_password = $('input[name="allow_change_password"]:checked').val();
                if ($('input[name="force_change_password"]:checked').val() == '1') {
                    dataObj.force_change_password = 1;
                } else {
                    dataObj.force_change_password = 0;
                }
                dataObj.serialno = '';
                dataObj.schoolclass_detail_ids = '';

                $.ajax({
                    url: '/admin/schoolclass/schoolclass-add',
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
        $('#schoolclass-base-form').submit(function (e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                grade_code: 'required',
                subject_code: 'required',
                name: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                grade_code: '請選擇年級',
                subject_code: '請選擇科目',
                name: '請輸入班級名稱',
            },
        });

        $('#schoolclass-base-submit').on('click', function () {
            $('#name').val($('#name').val().trim());
            if($('#name').val() == ''){
                swal('請輸入班級名稱');
                $('#schoolclass-base-form').valid();
                return false;
            }


            if ($('#end_at').val().length ==0) {
                swal('請選擇結業日期!');
                return false;
            }

            if ($('#start_at').val().length==0){
                swal('請選擇開始日期!');
                return false;
            }

            if ($('#end_at').val() < $('#start_at').val()) {
                swal('錯誤!!結業日期不能小於開課日期!');
                return false;
            }



            if ($('#schoolclass-base-form').valid()) {
                //相關參數

                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'schoolclass-base';
                dataObj.id = bs.getUrlVar('id');
                //dataObj.school_id = $('#school_id').val();
                dataObj.grade_code = $('#grade_code').val();
                //dataObj.subject_code = $('#subject_code').val();
                dataObj.name = $('#name').val();
                dataObj.school_tag_id = $('#school_tag_id').val();

                dataObj.school_tag_names = [];
                var school_tag_names = [];
                $.each($('#school_tag_id').select2('data'), function (key, item) {
                    school_tag_names.push(item.text);
                });
                school_tag_names.sort();
                dataObj.school_tag_names = school_tag_names;

                dataObj.start_at = $('#start_at').val() + ' 00:00:00';
                dataObj.end_at = $('#end_at').val() + ' 23:59:59';
                dataObj.autocomplete = 1;
                dataObj.serialno = '';
                dataObj.schoolclass_detail_ids = '';

                $.ajax({
                    url: '/admin/schoolclass/schoolclass-add',
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

        //老師設定
        $('#schoolclass-manager-submit').on('click', function () {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'schoolclass-manager';
            dataObj.id = bs.getUrlVar('id');
            dataObj.manager_id = $('#manager_id').val();
            dataObj.sub_manager_id = $('#sub_manager_id').val();

            $.ajax({
                url: '/admin/school/set-schoolclass-manager',
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

        //學生設定
        $('#schoolclass-student-submit').on('click', function () {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'schoolclass-student';
            dataObj.id = bs.getUrlVar('id');
            dataObj.student_id = $('#student_id').val();
            dataObj.serialno = $('#serialno_keyin').val().trim();

            $.ajax({
                url: '/admin/school/set-schoolclass-student',
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
                    //解除跳轉
                    // if ((r.reurl != '') && (r.reurl !== undefined)) {
                    //     location.replace(r.reurl);
                    // }
                    //顯示學生資料初使化
                    multiTbSet();
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });

        });


        $('#student_id').on('select2:select', function (e) {
            // 加入班級觸發
            e.preventDefault();
            var temp_stuids=$('#student_id').val();
            newObj.tmp_stuids=temp_stuids;
            GetTempSchoolclassDeatil(temp_stuids);

        });

        $('#student_id').on('select2:unselect', function (e) {
            // 移除班級觸發
            e.preventDefault();
            var temp_stuids=$('#student_id').val();
            newObj.tmp_stuids=temp_stuids;
            //移除時進行重置
            newObj.stu_ary=[];
            GetTempSchoolclassDeatil(temp_stuids);

        });

        function GetTempSchoolclassDeatil(stu_ids){
            var dataObj={};
            var schoolclass_id = bs.getUrlVar('id');
            dataObj.stu_ids =stu_ids ;
            dataObj.schoolclass_id=schoolclass_id;

            $.ajax({
                url: '/admin/schoolclass/get-temp-schoolclass-deatil',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                async: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (res) {
                    if ((res.stateinfo != '') && (res.stateinfo !== undefined)) {
                        alert(res.stateinfo);
                        return false;
                    }

                    $('#tbList2').html('');

                    var subject_code=res.subject_code;

                    $.each(res.data, function(key, item) {
                        var exam_alive_count=res.data_exam_alive_count[key];
                        var video_alive_count=res.data_video_alive_count[key];



                        var html='';
                        html+='<div class="table-responsive">';
                        html+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList2-' + key + '">';
                        html+='<thead>';
                        html+='<tr>';
                        html+='<th></th>';
                        html+='<th>姓名</th>';
                        html+='<th>學號</th>';
                        //安親不需要勝於的字
                        if (subject_code=='P0'){
                            html+='<th><input type="checkbox" id="allow_exam_check_all"  value="1">測驗<br>'+exam_alive_count+'</th>';
                            html+='<th><input type="checkbox" id="allow_video_check_all" value="1">影片<br>'+video_alive_count+'</th>';
                        }else{
                            html+='<th><input type="checkbox" id="allow_exam_check_all"  value="1">測驗<br>剩餘'+exam_alive_count+'</th>';
                            html+='<th><input type="checkbox" id="allow_video_check_all" value="1">影片<br>剩餘'+video_alive_count+'</th>';
                        }

                        html+='<th>座號</th>';
                        html+='<th>學生程度</th>';
                        html+='<th>教材版本</th>';
                        html+='<th>前次測驗成績</th>';
                        html+='</tr>';
                        html+='</thead>';
                        html+='<tfoot></tfoot>';
                        html+='</table>';
                        html+='</div>';



                        // var html =
                        //     '<div class="table-responsive">\
                        // <table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList2-' + key + '">\
                        //     <thead>\
                        //     <tr>\
                        //     <th></th>\
                        //     <th>姓名</th>\
                        //     <th>學號</th>\
                        //     <th><input type="checkbox" id="allow_exam_check_all"  value="1">測驗<br>剩餘'+exam_alive_count+'</th>\
                        //     <th><input type="checkbox" id="allow_video_check_all" value="1">影片<br>剩餘'+video_alive_count+'</th>\
                        //     <th>座號</th>\
                        //     <th>學生程度</th>\
                        //     <th>教材版本</th>\
                        //     <th>前次測驗成績</th>\
                        //         </tr>\
                        //     </thead>\
                        //     <tfoot></tfoot>\
                        //     </table>\
                        //     </div>';

                        $('#tbList2').append(html);

                        // 選擇學生
                        newObj.tbList2 = $('#tbList2-' + key).DataTable({
                            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                            'sPaginationType': 'full_numbers',
                            'aLengthMenu': [
                                [10],
                                ['10']
                            ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
                            'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
                            'paging': false, //分頁開關
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
                            // 'order': [
                            //     [3, 'asc']
                            // ], //指定默認的次序
                            'bInfo': false,
                            'processing': true, //等待加載效果
                            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                            'destroy':true,//上一步下一步時把tblist吹毀並重整
                            'serverSide': false,
                            'data': item,
                            'autoFill': false,//靜止遊覽器自動填入
                            'initComplete': function() {

                                newObj.stu_ary = [];
                                this.api().rows().every(function(key) {
                                    var item = this.data();
                                    var user_id=item[0];
                                    var check_allow_exam=item[3];
                                    var check_allow_video=item[4];

                                    //科目安親需disable

                                    if (subject_code=='P0'){
                                        item[3]='<input type="checkbox" id="allow_exam_'+user_id+'" name="allow_exam"  data-index="' + key + '"   value="1" disabled="disabled"> ';
                                        item[4]='<input type="checkbox" id="allow_video_'+user_id+'" name="allow_video" data-index="' + key + '"  value="1" disabled="disabled">';
                                    }else{
                                        item[3]='<input type="checkbox" id="allow_exam_'+user_id+'" name="allow_exam"  data-index="' + key + '"   value="1" > ';
                                        item[4]='<input type="checkbox" id="allow_video_'+user_id+'" name="allow_video" data-index="' + key + '"  value="1" >';
                                    }


                                    item[5] = '<input type="text" style="display: none;"/>' +
                                        '<input type="password" style="display: none;"/>'+
                                        '<input class="form-control" style="width:100px" maxlength="10" name="txt-seat" id="txt_seat'+user_id+'" autocomplete="off" data-index="' + key + '" value="' + item[5] + '" />';

                                    var level = item[6];
                                    var level_0_sel = (level == '未分類') ? 'selected' : '';
                                    var level_A_sel = (level == 'A') ? 'selected' : '';
                                    var level_B_sel = (level == 'B') ? 'selected' : '';
                                    var level_C_sel = (level == 'C') ? 'selected' : '';

                                    var select2_html =
                                        '<select class="select2-single select2-level" data-index="' + key + '">\
                                    <option ' + level_0_sel + ' value="00">未分類</option>\
                                    <option ' + level_A_sel + ' value="A">A</option>\
                                    <option ' + level_B_sel + ' value="B">B</option>\
                                    <option ' + level_C_sel + ' value="C">C</option>\
                                 </select>';

                                    item[6] = select2_html;

                                    var fac = item[7];
                                    var fac_0_sel = (fac == '未分類') ? 'selected' : '';
                                    var fac_1_sel = (fac == '適南') ? 'selected' : '';
                                    var fac_2_sel = (fac == '適康') ? 'selected' : '';
                                    var fac_3_sel = (fac == '適翰') ? 'selected' : '';
                                    var fac_4_sel = (fac == '龍騰') ? 'selected' : '';
                                    var fac_6_sel = (fac == '三民') ? 'selected' : '';
                                    var fac_7_sel = (fac == '全華') ? 'selected' : '';
                                    var fac_8_sel = (fac == '泰宇') ? 'selected' : '';

                                    select2_html =
                                        '<select class="select2-single select2-factory" data-index="' + key + '">\
                                    <option ' + fac_0_sel + ' value="-1">未分類</option>\
                                    <option ' + fac_1_sel + ' value="1">適南</option>\
                                    <option ' + fac_2_sel + ' value="2">適康</option>\
                                    <option ' + fac_3_sel + ' value="3">適翰</option>\
                                    <option ' + fac_4_sel + ' value="4">龍騰</option>\
                                    <option ' + fac_6_sel + ' value="6">三民</option>\
                                    <option ' + fac_7_sel + ' value="7">全華</option>\
                                    <option ' + fac_8_sel + ' value="8">泰宇</option>\
                                 </select>';

                                    item[7] = select2_html;

                                    this.invalidate();
                                    //要等invaldate它生效html才會生成

                                    $('input#allow_exam_'+user_id).prop('checked', (check_allow_exam== 1 ? true : false));
                                    $('input#allow_video_'+user_id).prop('checked', (check_allow_video== 1 ? true : false));

                                    var stu_obj = {};
                                    stu_obj.index = key;
                                    stu_obj.uid = item[0];
                                    stu_obj.allow_exam=($('input#allow_exam_'+user_id+':checked').val() == '1' ? 1 : 0);
                                    stu_obj.allow_video=($('input#allow_video_'+user_id+':checked').val() =='1' ? 1: 0);
                                   //處理seat_no有預設值時存入問題 原本寫法為$(item[5]).val();
                                    stu_obj.seat_no = $('input#txt_seat'+user_id).val();
                                    stu_obj.level = $(item[6]).val();
                                    stu_obj.factory_code = $(item[7]).val();



                                    newObj.stu_ary.push(stu_obj);
                                });

                                $('.select2-single').select2({
                                    theme: "bootstrap",
                                    minimumResultsForSearch: Infinity
                                });

                                $('input[name="allow_exam"]').change(function(e){
                                    e.preventDefault();
                                    var idx=$(this).attr('data-index');
                                    var allow_exam_id=$(this).attr('id');
                                    newObj.stu_ary[idx].allow_exam = ($('input#'+allow_exam_id+':checked').val()=='1'?1:0);
                                });

                                $('input[name="allow_video"]').on('change',function(e){
                                    e.preventDefault();
                                    var idx=$(this).attr('data-index');
                                    var allow_video_id=$(this).attr('id');

                                    newObj.stu_ary[idx].allow_video=($('input#'+allow_video_id+':checked').val()=='1'?1:0);

                                });

                                $("input#allow_exam_check_all").on('change', function(e) {
                                    e.preventDefault();
                                    if ($("input#allow_exam_check_all").prop('checked')) {
                                        $('input[name="allow_exam"]').prop('checked', true);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_exam=1;
                                        });

                                    } else {
                                        $('input[name="allow_exam"]').prop('checked', false);

                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_exam=0;
                                        });
                                    }

                                });

                                $("input#allow_video_check_all").on('change', function(e) {
                                    e.preventDefault();
                                    if ($("input#allow_video_check_all").prop('checked')) {
                                        $('input[name="allow_video"]').prop('checked', true);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_video=1;
                                        });
                                    } else {
                                        $('input[name="allow_video"]').prop('checked', false);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_video=0;
                                        });
                                    }

                                });


                                $('input[name="txt-seat"]').on('blur', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].seat_no = $(this).val();
                                });

                                $('.select2-level').on('change', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].level = $(this).val();
                                });

                                $('.select2-factory').on('change', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].factory_code = $(this).val();
                                });

                            },
                            'columnDefs': [{
                                'targets': [0], // column or columns numbers
                                'visible': false, // set orderable for selected columns
                            }],
                            'select': {
                                'style': 'multi'
                            },
                        });
                    });

                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });



        }

        //顯示學生詳細資訊
        function multiTbSet() {

            var dataObj = {};
            dataObj.school_class_ary = [];
            dataObj.school_class_ary.push(bs.getUrlVar('id'));

            dataObj.levelAry = ['00', 'A', 'B', 'C'];
            dataObj.facAry = ['-1', '1', '2', '3','4','5','6','7','8'];
            dataObj.type='all';

            $.ajax({
                url: '/admin/quizpaper/sendpaper-user-list',
                type: 'post',
                data: dataObj,
                success: function(res) {

                    $('#tbList2').html('');

                    $.each(res.data, function(key, item) {
                        var exam_alive_count=res.data_exam_alive_count[key];
                        var video_alive_count=res.data_video_alive_count[key];
                        $('#span-clsname').text(res.dataname[key]);

                        var html =
                            '<div class="table-responsive">\
                        <table class="table table-striped table-bordered table-hover w-100 text-nowrap" id="tbList2-' + key + '">\
                    <thead>\
                    <tr>\
                    <th></th>\
                    <th>姓名</th>\
                    <th>學號</th>\
                    <th><input type="checkbox" id="allow_exam_check_all"  value="1">測驗<br>剩餘'+exam_alive_count+'</th>\
                    <th><input type="checkbox" id="allow_video_check_all" value="1">影片<br>剩餘'+video_alive_count+'</th>\
                    <th>座號</th>\
                    <th>學生程度</th>\
                    <th>教材版本</th>\
                    <th>前次測驗成績</th>\
                        </tr>\
                    </thead>\
                    <tfoot></tfoot>\
                    </table>\
                    </div>';

                        $('#tbList2').append(html);

                        // 選擇學生
                        newObj.tbList2 = $('#tbList2-' + key).DataTable({
                            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                            'sPaginationType': 'full_numbers',
                            'aLengthMenu': [
                                [10],
                                ['10']
                            ], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
                            'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
                            'paging': false, //分頁開關
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
                            // 'order': [
                            //     [3, 'asc']
                            // ], //指定默認的次序
                            'bInfo': false,
                            'processing': true, //等待加載效果
                            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                            'serverSide': false,
                            'data': item,
                            'initComplete': function() {

                                newObj.stu_ary = [];
                                this.api().rows().every(function(key) {
                                    var item = this.data();
                                    var user_id=item[0];
                                    var check_allow_exam=item[3];
                                    var check_allow_video=item[4];


                                    item[3]='<input type="checkbox" id="allow_exam_'+user_id+'" name="allow_exam"  data-index="' + key + '"   value="1">';


                                    item[4]='<input type="checkbox" id="allow_video_'+user_id+'" name="allow_video" data-index="' + key + '"  value="1">';

                                    item[5] = '<input class="form-control" style="width:100px" maxlength="10" name="txt-seat" data-index="' + key + '" value="' + item[5] + '" />';

                                    var level = item[6];
                                    var level_0_sel = (level == '未分類') ? 'selected' : '';
                                    var level_A_sel = (level == 'A') ? 'selected' : '';
                                    var level_B_sel = (level == 'B') ? 'selected' : '';
                                    var level_C_sel = (level == 'C') ? 'selected' : '';

                                    var select2_html =
                                        '<select class="select2-single select2-level" data-index="' + key + '">\
                                    <option ' + level_0_sel + ' value="00">未分類</option>\
                                    <option ' + level_A_sel + ' value="A">A</option>\
                                    <option ' + level_B_sel + ' value="B">B</option>\
                                    <option ' + level_C_sel + ' value="C">C</option>\
                                 </select>';

                                    item[6] = select2_html;

                                    var fac = item[7];
                                    var fac_0_sel = (fac == '未分類') ? 'selected' : '';
                                    var fac_1_sel = (fac == '適南') ? 'selected' : '';
                                    var fac_2_sel = (fac == '適康') ? 'selected' : '';
                                    var fac_3_sel = (fac == '適翰') ? 'selected' : '';
                                    var fac_4_sel = (fac == '龍騰') ? 'selected' : '';
                                    var fac_6_sel = (fac == '三民') ? 'selected' : '';
                                    var fac_7_sel = (fac == '全華') ? 'selected' : '';
                                    var fac_8_sel = (fac == '泰宇') ? 'selected' : '';

                                    select2_html =
                                        '<select class="select2-single select2-factory" data-index="' + key + '">\
                                    <option ' + fac_0_sel + ' value="-1">未分類</option>\
                                    <option ' + fac_1_sel + ' value="1">適南</option>\
                                    <option ' + fac_2_sel + ' value="2">適康</option>\
                                    <option ' + fac_3_sel + ' value="3">適翰</option>\
                                    <option ' + fac_4_sel + ' value="4">龍騰</option>\
                                    <option ' + fac_6_sel + ' value="6">三民</option>\
                                    <option ' + fac_7_sel + ' value="7">全華</option>\
                                    <option ' + fac_8_sel + ' value="8">泰宇</option>\
                                 </select>';

                                    item[7] = select2_html;

                                    this.invalidate();
                                    //要等invaldate它生效html才會生成

                                    $('input#allow_exam_'+user_id).prop('checked', (check_allow_exam== 1 ? true : false));
                                    $('input#allow_video_'+user_id).prop('checked', (check_allow_video== 1 ? true : false));

                                    var stu_obj = {};
                                    stu_obj.index = key;
                                    stu_obj.uid = item[0];
                                    stu_obj.allow_exam=($('input#allow_exam_'+user_id+':checked').val() == '1' ? 1 : 0);
                                    stu_obj.allow_video=($('input#allow_video_'+user_id+':checked').val() =='1' ? 1: 0);
                                    stu_obj.seat_no = $(item[5]).val();
                                    stu_obj.level = $(item[6]).val();
                                    stu_obj.factory_code = $(item[7]).val();

                                    newObj.stu_ary.push(stu_obj);
                                });

                                $('.select2-single').select2({
                                    theme: "bootstrap",
                                    minimumResultsForSearch: Infinity
                                });

                                $('input[name="allow_exam"]').change(function(e){
                                    e.preventDefault();
                                    var idx=$(this).attr('data-index');
                                    var allow_exam_id=$(this).attr('id');
                                    newObj.stu_ary[idx].allow_exam = ($('input#'+allow_exam_id+':checked').val()=='1'?1:0);
                                });

                                $('input[name="allow_video"]').on('change',function(e){
                                    e.preventDefault();
                                    var idx=$(this).attr('data-index');
                                    var allow_video_id=$(this).attr('id');

                                    newObj.stu_ary[idx].allow_video=($('input#'+allow_video_id+':checked').val()=='1'?1:0);

                                });

                                $("input#allow_exam_check_all").on('change', function(e) {
                                    e.preventDefault();
                                    if ($("input#allow_exam_check_all").prop('checked')) {
                                        $('input[name="allow_exam"]').prop('checked', true);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_exam=1;
                                        });

                                    } else {
                                        $('input[name="allow_exam"]').prop('checked', false);

                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_exam=0;
                                        });
                                    }

                                });

                                $("input#allow_video_check_all").on('change', function(e) {
                                    e.preventDefault();
                                    if ($("input#allow_video_check_all").prop('checked')) {
                                        $('input[name="allow_video"]').prop('checked', true);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_video=1;
                                        });
                                    } else {
                                        $('input[name="allow_video"]').prop('checked', false);
                                        $.each(newObj.stu_ary,function(key,val){
                                            newObj.stu_ary[key].allow_video=0;
                                        });
                                    }

                                });

                                $('input[name="txt-seat"]').on('blur', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].seat_no = $(this).val();
                                });

                                $('.select2-level').on('change', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].level = $(this).val();
                                });

                                $('.select2-factory').on('change', function(e) {
                                    e.preventDefault();
                                    var idx = $(this).attr('data-index');
                                    newObj.stu_ary[idx].factory_code = $(this).val();
                                });

                            },
                            'columnDefs': [{
                                'targets': [0], // column or columns numbers
                                'visible': false, // set orderable for selected columns
                            }],
                            'select': {
                                'style': 'multi'
                            },
                        });
                    });

                },
                error: bs.errorHandler
            });
        }

        //更新學生詳細資訊
        $('#schoolclass-detail-edit').on('click', function (e) {
            e.preventDefault();
            UpdateSchoolclassStudent();
            // var dataObj = {};
            // dataObj.cid = bs.getUrlVar('id');
            // dataObj.stu_ary = newObj.stu_ary;
            //
            // $.ajax({
            //     url: '/admin/quizpaper/set-user-info',
            //     type: 'POST',
            //     data: JSON.stringify(dataObj),
            //     contentType: 'application/json',
            //     beforeSend: function() {
            //         bs.disableSubmits(true);
            //     },
            //     success: function(res) {
            //         bs.disableSubmits(false);
            //         var msg = res.message;
            //         if (msg != 'success') {
            //             swal(msg);
            //             return false;
            //         }
            //         else{
            //             swal("更新成功");
            //             return true;
            //         }
            //         //先不跳轉
            //         // location.reload();
            //     },
            //     complete: function() {
            //         bs.disableSubmits(false);
            //     },
            //     error: bs.errorHandler
            // });
        });
        //更新班級學生名單及學生詳細資訊
        function UpdateSchoolclassStudent(){
            var dataObj={};
            var temp_stuids=$('#student_id').val();
            dataObj.cid = bs.getUrlVar('id');
            dataObj.stu_ary = newObj.stu_ary;
            dataObj.stu_ids=temp_stuids;

            $.ajax({
                url: '/admin/schoolclass/update-schoolclass-student',
                type: 'POST',
                data: JSON.stringify(dataObj),
                contentType: 'application/json',
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {
                    bs.disableSubmits(false);
                    var msg = res.message;
                    if (msg != 'success') {
                        swal(msg);
                        return false;
                    }
                    else{
                        // swal("更新成功");
                        // // return true;
                        // location.reload();
                        swal({ title: "更新成功"
                               }).then(function(){
                                location.reload();
                            }
                        );

                        //swal({ title: "Deleted!", text: "deleted.", type: "success" }, function(){ location.reload(); });

                    }


                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });

        };
        // function setStudenInfo() {
        //
        //     var dataObj = {};
        //     dataObj.cid = bs.getUrlVar('id');
        //     dataObj.stu_ary = newObj.stu_ary;
        //
        //     $.ajax({
        //         url: '/admin/quizpaper/set-user-info',
        //         type: 'POST',
        //         data: dataObj,
        //         beforeSend: function() {
        //             bs.disableSubmits(true);
        //         },
        //         success: function(res) {
        //             bs.disableSubmits(false);
        //             var msg = res.message;
        //             if (msg != 'success') {
        //                 swal(msg);
        //                 return false;
        //             }
        //             location.reload();
        //         },
        //         complete: function() {
        //             bs.disableSubmits(false);
        //         },
        //         error: bs.errorHandler
        //     });
        //
        // }


        //服務設定
        $('#schoolclass-service-form').submit(function (e) {
            e.preventDefault();
        }).validate({
            rules: {
                schoolclass_username: 'required',
            },
            messages: {
                schoolclass_username: '請輸入帳號',
            },
        });

        $('#schoolclass-service-submit').on('click', function () {
            if ($('#schoolclass-service-form').valid()) {

                if($('#makeupvideo_amount').val() == '' || !$('#makeupvideo_amount').val().match(/^[0-9]\d*$/)){
                    alert('預設影片數量請填入0以上的整數');
                    return false;
                }
                if($('#makeupstd').val() == '' || !$('#makeupstd').val().match(/^[0-9]\d*$/) || parseInt($('#makeupstd').val()) > 100){
                    alert('補強基準請填入0~100的整數');
                    return false;
                }

                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'schoolclass-service';
                dataObj.id = bs.getUrlVar('id');
                dataObj.text_year = $('#text_year').val();
                // 教學影片
                if ($('input[name="is_schoolvideo"]:checked').val() == '1') {
                    dataObj.is_schoolvideo = 1;
                } else {
                    dataObj.is_schoolvideo = 0;
                }
               //測評開啟按鈕
                if ($('input[name="is_exam"]:checked').val() == '1') {
                    dataObj.is_exam = 1;
                } else {
                    dataObj.is_exam = 0;
                }

                //測評權限
                var array = [];
                array.push({
                    E1A: ($('input[name="E1A"]:checked').val() == '1' ? 1 : 0),
                    E1B: ($('input[name="E1B"]:checked').val() == '1' ? 1 : 0),
                    E2A: ($('input[name="E2A"]:checked').val() == '1' ? 1 : 0),
                    E2B: ($('input[name="E2B"]:checked').val() == '1' ? 1 : 0),
                    E3A: ($('input[name="E3A"]:checked').val() == '1' ? 1 : 0),
                    E3B: ($('input[name="E3B"]:checked').val() == '1' ? 1 : 0),
                    E4A: ($('input[name="E4A"]:checked').val() == '1' ? 1 : 0),
                    E4B: ($('input[name="E4B"]:checked').val() == '1' ? 1 : 0),
                    E5A: ($('input[name="E5A"]:checked').val() == '1' ? 1 : 0),
                    E5B: ($('input[name="E5B"]:checked').val() == '1' ? 1 : 0),
                    E6A: ($('input[name="E6A"]:checked').val() == '1' ? 1 : 0),
                    E6B: ($('input[name="E6B"]:checked').val() == '1' ? 1 : 0),
                    EP: ($('input[name="EP"]:checked').val() == '1' ? 1 : 0),
                    EPA: ($('input[name="EPA"]:checked').val() == '1' ? 1 : 0),
                    EPB: ($('input[name="EPB"]:checked').val() == '1' ? 1 : 0),
                    J1A: ($('input[name="J1A"]:checked').val() == '1' ? 1 : 0),
                    J1B: ($('input[name="J1B"]:checked').val() == '1' ? 1 : 0),
                    J2A: ($('input[name="J2A"]:checked').val() == '1' ? 1 : 0),
                    J2B: ($('input[name="J2B"]:checked').val() == '1' ? 1 : 0),
                    J3A: ($('input[name="J3A"]:checked').val() == '1' ? 1 : 0),
                    J3B: ($('input[name="J3B"]:checked').val() == '1' ? 1 : 0),
                    H1A: ($('input[name="H1A"]:checked').val() == '1' ? 1 : 0),
                    H1B: ($('input[name="H1B"]:checked').val() == '1' ? 1 : 0),
                    H2A: ($('input[name="H2A"]:checked').val() == '1' ? 1 : 0),
                    H2B: ($('input[name="H2B"]:checked').val() == '1' ? 1 : 0),
                    H3A: ($('input[name="H3A"]:checked').val() == '1' ? 1 : 0),
                    H3B: ($('input[name="H3B"]:checked').val() == '1' ? 1 : 0),
                    J0: ($('input[name="J0"]:checked').val() == '1' ? 1 : 0),
                    H0: ($('input[name="H0"]:checked').val() == '1' ? 1 : 0)
                });
                var role = JSON.stringify(array);
                role = role.replace('[', '');
                role = role.replace(']', '');
                dataObj.role = role;
                //教學影片權限
                var video_array=[];
                video_array.push({
                    E1A: ($('input[name="video_E1A"]:checked').val() == '1' ? 1 : 0),
                    E1B: ($('input[name="video_E1B"]:checked').val() == '1' ? 1 : 0),
                    E2A: ($('input[name="video_E2A"]:checked').val() == '1' ? 1 : 0),
                    E2B: ($('input[name="video_E2B"]:checked').val() == '1' ? 1 : 0),
                    E3A: ($('input[name="video_E3A"]:checked').val() == '1' ? 1 : 0),
                    E3B: ($('input[name="video_E3B"]:checked').val() == '1' ? 1 : 0),
                    E4A: ($('input[name="video_E4A"]:checked').val() == '1' ? 1 : 0),
                    E4B: ($('input[name="video_E4B"]:checked').val() == '1' ? 1 : 0),
                    E5A: ($('input[name="video_E5A"]:checked').val() == '1' ? 1 : 0),
                    E5B: ($('input[name="video_E5B"]:checked').val() == '1' ? 1 : 0),
                    E6A: ($('input[name="video_E6A"]:checked').val() == '1' ? 1 : 0),
                    E6B: ($('input[name="video_E6B"]:checked').val() == '1' ? 1 : 0),
                    EP: ($('input[name="video_EP"]:checked').val() == '1' ? 1 : 0),
                    EPA: ($('input[name="video_EPA"]:checked').val() == '1' ? 1 : 0),
                    EPB: ($('input[name="video_EPB"]:checked').val() == '1' ? 1 : 0),
                    J1A: ($('input[name="video_J1A"]:checked').val() == '1' ? 1 : 0),
                    J1B: ($('input[name="video_J1B"]:checked').val() == '1' ? 1 : 0),
                    J2A: ($('input[name="video_J2A"]:checked').val() == '1' ? 1 : 0),
                    J2B: ($('input[name="video_J2B"]:checked').val() == '1' ? 1 : 0),
                    J3A: ($('input[name="video_J3A"]:checked').val() == '1' ? 1 : 0),
                    J3B: ($('input[name="video_J3B"]:checked').val() == '1' ? 1 : 0),
                    H1A: ($('input[name="video_H1A"]:checked').val() == '1' ? 1 : 0),
                    H1B: ($('input[name="video_H1B"]:checked').val() == '1' ? 1 : 0),
                    H2A: ($('input[name="video_H2A"]:checked').val() == '1' ? 1 : 0),
                    H2B: ($('input[name="video_H2B"]:checked').val() == '1' ? 1 : 0),
                    H3A: ($('input[name="video_H3A"]:checked').val() == '1' ? 1 : 0),
                    H3B: ($('input[name="video_H3B"]:checked').val() == '1' ? 1 : 0),
                    J0: ($('input[name="video_J0"]:checked').val() == '1' ? 1 : 0),
                    H0: ($('input[name="video_H0"]:checked').val() == '1' ? 1 : 0)
                    });
                var video_role=JSON.stringify(video_array);
                video_role = video_role.replace('[', '');
                video_role = video_role.replace(']', '');
                dataObj.video_role = video_role;




                dataObj.serialno = '';
                dataObj.schoolclass_detail_ids = '';

                if ($('input[name="is_makeupvideo"]:checked').val() == '1'){
                    dataObj.is_makeupvideo = 1;
                }else{
                    dataObj.is_makeupvideo = 0;
                }
                dataObj.makeupvideo_amount = $('#makeupvideo_amount').val();
                dataObj.makeupstd = $('#makeupstd').val();
                dataObj.knowledge_well_std = JSON.stringify(newObj.knowledge_well_std);

                //
                // if ($('input[name="EP"]:checked').val() == '1') {
                //    dataObj.EP = 1;
                // } else {
                //    dataObj.EP = 0;
                // }
                //

                //alert($('input[name="allow_change_password"]:checked').val());
                //alert($('input[name="force_change_password"]:checked').val());
                //exit;

                $.ajax({
                    url: '/admin/schoolclass/schoolclass-add',
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

        // $('#is_schoolvideo').on('click', function () {
        //     if($('#is_schoolvideo').prop('checked')){
        //         $('.video_setting').show();
        //     }else{
        //         $('.video_setting').hide();
        //     }
        // });

    }

    function getSerialnoData(){
        var id = bs.getUrlVar('id');
        var dataObj = {};
        dataObj.id = id;

        $.ajax({
            url:'/admin/schoolclass/get-serialno-used',
            data: JSON.stringify({ 'data': dataObj }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            success:function (res) {
                if(res.need_serialno == '1'){
                    var serialno_used_html='';
                    serialno_used_html+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap">';
                    serialno_used_html+='<tr>';
                    serialno_used_html+='<th>學生姓名</th>';
                    serialno_used_html+='<th>序號</th>';
                    serialno_used_html+='<th>到期日期</th>';
                    serialno_used_html+='<th>剩餘天數</th>';
                    serialno_used_html+='<th>狀態</th>';
                    serialno_used_html+='</tr>';

                    for(var i=0; i<res.data.length; i++){
                        let now_sec = parseInt(new Date().getTime()/1000);
                        let now_diff = Math.floor((res.data[i].end_at_timestamp - now_sec)/86400);
                        let days_left = '倒數 '+ now_diff +' 天';
                        if(now_diff < 1 && now_diff >= 0){
                            days_left = '剩不到 1 天';
                        }else if (now_diff < 0 ){
                            days_left = '已到期';
                        }

                        serialno_used_html+='<tr>';
                        serialno_used_html+='<td>'+res.data[i].user_name+'</td>';
                        serialno_used_html+='<td>'+res.data[i].serialno+'</td>';
                        serialno_used_html+='<td>'+res.data[i].end_at+'</td>';
                        serialno_used_html+='<td>'+days_left+'</td>';
                        serialno_used_html+='<td>'+res.data[i].status+'</td>';
                        serialno_used_html+='</tr>';
                    }

                    serialno_used_html+='</table>';

                    $('#schoolclass_serialno_used').html(serialno_used_html);
                    $('#serialno_view').show();
                    $('#serialno_input').show();
                }else{
                    $('#serialno_view').hide();
                    $('#serialno_input').hide();
                }

            },
            error: bs.errorHandler,

        });
    }

    function getGradeCodeByGrade(sel_grade_code){
        switch (bs.getNormalGrade(sel_grade_code)) {
            case 'E0':
                $('#grade_code option[value="EP"]').remove();
                $('#grade_code option[value="J1"]').remove();
                $('#grade_code option[value="J2"]').remove();
                $('#grade_code option[value="J3"]').remove();
                $('#grade_code option[value="H1"]').remove();
                $('#grade_code option[value="H2"]').remove();
                $('#grade_code option[value="H3"]').remove();
                break;
            case 'EP':
                $('#grade_code option[value="E1"]').remove();
                $('#grade_code option[value="E2"]').remove();
                $('#grade_code option[value="E3"]').remove();
                $('#grade_code option[value="E4"]').remove();
                $('#grade_code option[value="E5"]').remove();
                $('#grade_code option[value="E6"]').remove();
                $('#grade_code option[value="J1"]').remove();
                $('#grade_code option[value="J2"]').remove();
                $('#grade_code option[value="J3"]').remove();
                $('#grade_code option[value="H1"]').remove();
                $('#grade_code option[value="H2"]').remove();
                $('#grade_code option[value="H3"]').remove();
                break;
            case 'J0':
                $('#grade_code option[value="E1"]').remove();
                $('#grade_code option[value="E2"]').remove();
                $('#grade_code option[value="E3"]').remove();
                $('#grade_code option[value="E4"]').remove();
                $('#grade_code option[value="E5"]').remove();
                $('#grade_code option[value="E6"]').remove();
                $('#grade_code option[value="EP"]').remove();
                $('#grade_code option[value="H1"]').remove();
                $('#grade_code option[value="H2"]').remove();
                $('#grade_code option[value="H3"]').remove();
                break;
            case 'H0':
                $('#grade_code option[value="E1"]').remove();
                $('#grade_code option[value="E2"]').remove();
                $('#grade_code option[value="E3"]').remove();
                $('#grade_code option[value="E4"]').remove();
                $('#grade_code option[value="E5"]').remove();
                $('#grade_code option[value="E6"]').remove();
                $('#grade_code option[value="EP"]').remove();
                $('#grade_code option[value="J1"]').remove();
                $('#grade_code option[value="J2"]').remove();
                $('#grade_code option[value="J3"]').remove();
                break;
        }
    }

	function getSubjectCode(sel_subject_code) {
        var dataObj = { 'append_et':1,'subject_code':sel_subject_code ,'page_mode':'schoolclass_create','append_P0':1};
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
			async: false,
            cache: false,
            success: function(res) {
                $('#subject_code option').remove();
                $.each(res, function(key, item) {
                    $('#subject_code').append('<option value="' + item.code + '">' + item.name + '</option>');
                });

                $('#subject_code').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

				$('#subject_code').val(sel_subject_code).trigger('change');

            },
            error: bs.errorHandler
        });
    }
});
