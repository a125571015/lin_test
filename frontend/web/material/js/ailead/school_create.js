$(function() {
    'use strict';

    $('#txt-app-say').attr('placeholder', '力宇補習班成績通知書\n親愛的爸爸媽媽您好\n學生剛完成了測驗，成績如下：');

    var id = bs.getUrlVar('id');
    if (id.length == 0) {
        $('.school-data-view').hide();
        $('.school-data-edit').show();
    } else {
        var dataObj = {};
        dataObj.id = id;
        $.ajax({
            url: '/admin/school/get-school-data',
            data: JSON.stringify({
                'data': dataObj
            }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                var data = res.data;
                var data2 = res.data2;
                var data3 = res.data3;
                var data4 = res.data4;

                // view
                $('[data-field="name"]').html(data.name);
                $('[data-field="viewname"]').html(data.viewname);
                $('[data-field="phone"]').html(data.phone);
                $('[data-field="address"]').html(data.address);
                $('[data-field="label-app-say"]').html(data.app_say);
                // edit
                $('#name').val(data.name);
                $('#viewname').val(data.viewname);
                $('#phone').val(data.phone);
                $('#address').val(data.address);

                $('#logo').val(data.logo);
                $('#img_logo').attr('src', data.logo);

                if (data.quizpaper_category_names) {
                    var quizpaper_category_ary = data.quizpaper_category_names.split(';');
                    for (var i = 0; i < quizpaper_category_ary.length; i++) {
                        $('#label-quizpaper_category').append('<h6 class="label-category"><span>' + quizpaper_category_ary[i] + '</span>  <i class="fa fa-trash cursor-pointer" name="trash"></i></h6>');
                        $('[data-field="quizpaper_category"]').append('<strong>' + quizpaper_category_ary[i] + '</strong><br>');
                    }
                    $('[name="trash"]').on('click', function(e) {
                        e.preventDefault();
                        $(this).parent().remove();
                    });
                }

                $('#txt-app-say').val(data.app_say);

                $('#img_banner').attr('src',data3);

                if (data.parent_id) {
                    $('#form-sys').hide();
                } else {
                    $('#form-sys').show();
					$('#name').attr('disabled',true);
                }

                $('[data-field="parent_end_at"]').html(data4);
                $('[data-field="schoolclass_count"]').html('<a href="/admin/schoolclass/index?school_id=' + data.schoolclass_count + '">' + data.schoolclass_count + '</a>');
                $('[data-field="student_count"]').html('<a href="/admin/student/index?school_id=' + data.student_count + '">' + data.student_count + '</a>');

                if (data.school_role) {
                    var school_role=JSON.parse(data.school_role);
                    if (school_role.Allow_E0C0_Max>0) {
                        $('#school_role_count').append('<div>國小國文：<span data-field="E0C0_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0C0_Max">'+school_role.Allow_E0C0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0C0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小國文教學影片：<span data-field="E0C0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0C0_CourseVideo_Max">'+school_role.Allow_E0C0_CourseVideo_Max+'</span></div><br>');
                    }

                    if (school_role.Allow_E0E0_Max>0) {
                        $('#school_role_count').append('<div>國小英文：<span data-field="E0E0_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0E0_Max">'+school_role.Allow_E0E0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0E0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小英文教學影片：<span data-field="E0E0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0E0_CourseVideo_Max">'+school_role.Allow_E0E0_CourseVideo_Max+'</span></div><br>');
                    }


                    if (school_role.Allow_E0M0_Max>0) {
                        $('#school_role_count').append('<div>國小數學：<span data-field="E0M0_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0M0_Max">'+school_role.Allow_E0M0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0M0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小數學教學影片：<span data-field="E0M0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0M0_CourseVideo_Max">'+school_role.Allow_E0M0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0N0_Max>0) {
                        $('#school_role_count').append('<div>國小自然：<span data-field="E0N0_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0N0_Max">'+school_role.Allow_E0N0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0N0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小自然教學影片：<span data-field="E0N0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0N0_CourseVideo_Max">'+school_role.Allow_E0N0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0S0_Max>0) {
                        $('#school_role_count').append('<div>國小社會：<span data-field="E0S0_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0S0_Max">'+school_role.Allow_E0S0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_E0S0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小社會教學影片：<span data-field="E0S0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_E0S0_CourseVideo_Max">'+school_role.Allow_E0S0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPC0_Max>0) {
                        $('#school_role_count').append('<div>升私中國文：<span data-field="EPC0_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPC0_Max">'+school_role.Allow_EPC0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPC0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>升私中國文教學影片：<span data-field="EPC0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPC0_CourseVideo_Max">'+school_role.Allow_EPC0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE0_Max>0) {
                        $('#school_role_count').append('<div>升私中英文：<span data-field="EPE0_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE0_Max">'+school_role.Allow_EPE0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>升私中英文教學影片：<span data-field="EPE0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE0_CourseVideo_Max">'+school_role.Allow_EPE0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPM0_Max>0) {
                        $('#school_role_count').append('<div>國小資優數學：<span data-field="EPM0_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPM0_Max">'+school_role.Allow_EPM0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPM0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國小資優數學教學影片：<span data-field="EPM0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPM0_CourseVideo_Max">'+school_role.Allow_EPM0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE11_Max>0) {
                        $('#school_role_count').append('<div>英語常用單字2000:<span data-field="EPE11_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE11_Max">'+school_role.Allow_EPE11_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE11_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>英語常用單字2000教學影片：<span data-field="EPE11_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE11_CourseVideo_Max">'+school_role.Allow_EPE11_CourseVideo_Max+'</span></div><br>');
                    }

                    if (school_role.Allow_EPE13_Max>0) {
                        $('#school_role_count').append('<div>英語高頻單字2001~4500:<span data-field="EPE13_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE13_Max">'+school_role.Allow_EPE13_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE13_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>英語高頻單字2001~4500教學影片：<span data-field="EPE13_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE13_CourseVideo_Max">'+school_role.Allow_EPE13_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE14_Max>0) {
                        $('#school_role_count').append('<div>英語終極單字4501~7000:<span data-field="EPE14_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE14_Max">'+school_role.Allow_EPE14_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE14_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>英語終極單字4501~7000教學影片：<span data-field="EPE14_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE14_CourseVideo_Max">'+school_role.Allow_EPE14_CourseVideo_Max+'</span></div><br>');
                    }



                    if (school_role.Allow_EPE12_Max>0) {
                        $('#school_role_count').append('<div>英單字根字首拼圖法:<span data-field="EPE12_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE12_Max">'+school_role.Allow_EPE12_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE12_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>英單字根字首拼圖法教學影片：<span data-field="EPE12_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE12_CourseVideo_Max">'+school_role.Allow_EPE12_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE21_Max>0) {
                        $('#school_role_count').append('<div>全民英檢GEPT初級：<span data-field="EPE21_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE21_Max">'+school_role.Allow_EPE21_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPE21_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>全民英檢GEPT初級教學影片：<span data-field="EPE21_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPE21_CourseVideo_Max">'+school_role.Allow_EPE21_CourseVideo_Max+'</span></div><br>');
                    }

                    if (school_role.Allow_EPZ0_Max>0) {
                        $('#school_role_count').append('<div>紫微斗數輕鬆學：<span data-field="EPZ0_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPZ0_Max">'+school_role.Allow_EPZ0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_EPZ0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>紫微斗數輕鬆學教學影片：<span data-field="EPZ0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_EPZ0_CourseVideo_Max">'+school_role.Allow_EPZ0_CourseVideo_Max+'</span></div><br>');
                    }


                    if (school_role.Allow_J0C0_Max>0) {
                        $('#school_role_count').append('<div>國中國文：<span data-field="J0C0_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0C0_Max">'+school_role.Allow_J0C0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0C0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國中國文教學影片：<span data-field="J0C0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0C0_CourseVideo_Max">'+school_role.Allow_J0C0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0E0_Max>0) {
                        $('#school_role_count').append('<div>國中英文：<span data-field="J0E0_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0E0_Max">'+school_role.Allow_J0E0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0E0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國中英文教學影片：<span data-field="J0E0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0E0_CourseVideo_Max">'+school_role.Allow_J0E0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0M0_Max>0) {
                        $('#school_role_count').append('<div>國中數學：<span data-field="J0M0_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0M0_Max">'+school_role.Allow_J0M0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0M0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國中數學教學影片：<span data-field="J0M0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0M0_CourseVideo_Max">'+school_role.Allow_J0M0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0N0_Max>0) {
                        $('#school_role_count').append('<div>國中自然：<span data-field="J0N0_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0N0_Max">'+school_role.Allow_J0N0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0N0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國中自然教學影片：<span data-field="J0N0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0N0_CourseVideo_Max">'+school_role.Allow_J0N0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0S0_Max>0) {
                        $('#school_role_count').append('<div>國中社會：<span data-field="J0S0_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0S0_Max">'+school_role.Allow_J0S0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_J0S0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>國中社會教學影片：<span data-field="J0S0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_J0S0_CourseVideo_Max">'+school_role.Allow_J0S0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0C0_Max>0) {
                        $('#school_role_count').append('<div>高中國文：<span data-field="H0C0_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0C0_Max">'+school_role.Allow_H0C0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0C0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中國文教學影片：<span data-field="H0C0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0C0_CourseVideo_Max">'+school_role.Allow_H0C0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0E0_Max>0) {
                        $('#school_role_count').append('<div>高中英文：<span data-field="H0E0_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0E0_Max">'+school_role.Allow_H0E0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0E0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中英文教學影片：<span data-field="H0E0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0E0_CourseVideo_Max">'+school_role.Allow_H0E0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0M0_Max>0) {
                        $('#school_role_count').append('<div>高中數學：<span data-field="H0M0_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0M0_Max">'+school_role.Allow_H0M0_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0M0_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中數學教學影片：<span data-field="H0M0_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0M0_CourseVideo_Max">'+school_role.Allow_H0M0_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N1_Max>0) {
                        $('#school_role_count').append('<div>高中生物：<span data-field="H0N1_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N1_Max">'+school_role.Allow_H0N1_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N1_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中生物教學影片：<span data-field="H0N1_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N1_CourseVideo_Max">'+school_role.Allow_H0N1_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N4_Max>0) {
                        $('#school_role_count').append('<div>高中物理：<span data-field="H0N4_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N4_Max">'+school_role.Allow_H0N4_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N4_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中物理教學影片：<span data-field="H0N4_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N4_CourseVideo_Max">'+school_role.Allow_H0N4_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N5_Max>0) {
                        $('#school_role_count').append('<div>高中化學：<span data-field="H0N5_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N5_Max">'+school_role.Allow_H0N5_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N5_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中化學教學影片：<span data-field="H0N5_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N5_CourseVideo_Max">'+school_role.Allow_H0N5_CourseVideo_Max+'</span></div><br>');
                    }
                    
                    if (school_role.Allow_H0N3_Max>0) {
                        $('#school_role_count').append('<div>高中地球科學：<span data-field="H0N3_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N3_Max">'+school_role.Allow_H0N3_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0N3_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中地球科學教學影片：<span data-field="H0N3_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0N3_CourseVideo_Max">'+school_role.Allow_H0N3_CourseVideo_Max+'</span></div><br>');
                    }


                    if (school_role.Allow_H0S1_Max>0) {
                        $('#school_role_count').append('<div>高中歷史：<span data-field="H0S1_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S1_Max">'+school_role.Allow_H0S1_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0S1_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中歷史教學影片：<span data-field="H0S1_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S1_CourseVideo_Max">'+school_role.Allow_H0S1_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0S2_Max>0) {
                        $('#school_role_count').append('<div>高中地理：<span data-field="H0S2_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S2_Max">'+school_role.Allow_H0S2_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0S2_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中地理教學影片：<span data-field="H0S2_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S2_CourseVideo_Max">'+school_role.Allow_H0S2_CourseVideo_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0S3_Max>0) {
                        $('#school_role_count').append('<div>高中公民：<span data-field="H0S3_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S3_Max">'+school_role.Allow_H0S3_Max+'</span></div><br>');
                    }
                    if (school_role.Allow_H0S3_CourseVideo_Max>0) {
                        $('#school_role_count').append('<div>高中公民教學影片：<span data-field="H0S3_CourseVideo_Count" style="color:#007bff">0</span>/<span data-field="Allow_H0S3_CourseVideo_Max">'+school_role.Allow_H0S3_CourseVideo_Max+'</span></div><br>');
                    }

                    if (school_role.Allow_ET==1 && school_role.Allow_ET_Max>0){
                        $('#school_role_count').append('<div>myET：<span data-field="ET_Count" style="color:#007bff">0</span>/<span data-field="Allow_ET_Max">'+school_role.Allow_ET_Max+'</span></div><br>');
                    }


                    if (school_role.Allow_P0==1 ){
                        $('#school_role_count').append('<div>安親：允許開放</div><br>');
                    }


                    $.each(data2,function(key,item){
                        $('[data-field="'+item.role_subject+'"]').text(item.role_count);
                    });

                }

            },
            error: bs.errorHandler,
            complete: function() {
                bs.disableSubmits(false);
            }
        });

        $('.school-data-view').show();
        $('.school-data-edit').hide();

        $('.sys-data-view').show();
        $('.sys-data-edit').hide();
    }

    $('#btn-school-edit').on('click', function(e) {
        e.preventDefault();
        $('.school-data-view').hide();
        $('.school-data-edit').show();
    });

    $('#school-cancel').on('click', function(e) {
        e.preventDefault();
        $('.school-data-view').show();
        $('.school-data-edit').hide();
    });

    $('#btn-sys-edit').on('click', function(e) {
        e.preventDefault();
        $('.sys-data-view').hide();
        $('.sys-data-edit').show();
    });

    $('#sys-cancel').on('click', function(e) {
        e.preventDefault();
        $('.sys-data-view').show();
        $('.sys-data-edit').hide();
    });

    $('#school-form').submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            name: 'required',
            viewname: 'required',
        },
        messages: {
            name: '請輸入機構名稱',
            viewname: '請輸入顯示名稱',
        },
    });

    $('#school-submit').on('click', function() {
        if ($('#school-form').valid()) {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.id = bs.getUrlVar('id');
            dataObj.name = $('#name').val();
            dataObj.viewname = $('#viewname').val();
            dataObj.phone = $('#phone').val();
            dataObj.address=$('#address').val();

            $.ajax({
                url: '/admin/school/school-add',
                data: JSON.stringify({
                    'data': dataObj
                }),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(r) {
                    if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                        alert(r.stateinfo);
                    }
                    if ((r.reurl != '') && (r.reurl !== undefined)) {
                        location.replace(r.reurl);
                    }
                },
                error: bs.errorHandler,
                complete: function() {
                    bs.disableSubmits(false);
                }
            });
        }
    });

    $('#file_logo').on('change', function(e) {
        e.preventDefault();
        uploadImage_logo();
    });

    $('#file_quizpaper_logo').on('change', function(e) {
        e.preventDefault();
        uploadImage_quizpaper_logo();
    });

    $('#append-category').on('click', function(e) {
        e.preventDefault();
        appendQuizpaperCategory();
    })

    $('#sys-submit').on('click', function() {
        //相關參數
        var dataObj = {};

        dataObj.id = bs.getUrlVar('id');
        dataObj.logo = $('#logo').val();
        dataObj.quizpaper_logo = $('#quizpaper_logo').val();
        dataObj.category_ary = [];
        $.each($('.label-category'), function(key, item) {
            dataObj.category_ary.push($(item).find('span').text());
        });
        $.each($('input[name="category"]'), function(key, item) {
            dataObj.category_ary.push($(item).val());
        });
        dataObj.app_say = $('#txt-app-say').val();

        $.ajax({
            url: '/admin/school/parentschool-sys-add',
            data: JSON.stringify({
                'data': dataObj
            }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(r) {
                if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
                    alert(r.stateinfo);
                }
                if ((r.reurl != '') && (r.reurl !== undefined)) {
                    location.replace(r.reurl);
                }
            },
            error: bs.errorHandler,
            complete: function() {
                bs.disableSubmits(false);
            }
        });
    });

    function uploadImage_logo() {
        var formdata = new FormData();
        formdata.append('id', bs.getUrlVar('id'));
        var files = $('#file_logo').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        if (Math.ceil(files[0].size / 1024) > 1024) {
            alert('檔案大小請控制在1024KB以內');
            $('#file_logo').val('');
            return false;
        }

        $.ajax({
            url: '/admin/school/parent-school-upload-image-logo',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(r) {
                $('#logo').val(r.fullfilename);
                $('#img_logo').attr('src', r.fullfilename);
            },
            error: bs.errorHandler
        });
    };

    function uploadImage_quizpaper_logo() {
        var formdata = new FormData();
        formdata.append('id', bs.getUrlVar('id'));
        var files = $('#file_quizpaper_logo').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        if (Math.ceil(files[0].size / 1024) > 1024) {
            alert('檔案大小請控制在1024KB以內');
            $('#file_quizpaper_logo').val('');
            return false;
        }

        $.ajax({
            url: '/admin/school/parent-school-upload-image-quizpaper-logo',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(r) {
                $('#quizpaper_logo').val(r.fullfilename);
                $('#img_quizpaper_logo').attr('src', r.fullfilename);
            },
            error: bs.errorHandler
        });
    };

    function appendQuizpaperCategory() {
        var qc = '<input type="text" id="category_' + ($('input[name="category"]').length + 1) + '" name="category" class="form-control m-b-10" maxlength="20" autocomplete="off" />';
        $('#input-quizpaper_category').append(qc);
    }
});
