$(function() {
    'use strict';


    $('#file_upload').on('change', function(e) {
        e.preventDefault();
        uploadImage();
    });

    function uploadImage() {

        var formdata = new FormData();
        formdata.append('id',bs.getUrlVar('id'));
        var files = $('#file_upload').get(0).files;
        if (files.length > 0) {
            formdata.append('file', files[0]);
        }

        $.ajax({
            url: '/admin/student/student-upload-image',
            type: 'POST',
            data: formdata,
            contentType: false,
            processData: false,
            success: function(r) {
                $('#photo').val(r.fullfilename);
                $('#img-photo').attr('src', r.fullfilename);
            },
            error: bs.errorHandler
        });
    };


    //清除狀態
    function clearState() {
        $('#newpassword').val('');
        $('#renewpassword').val('');
        // $('#start_at').val('');
        // $('#end_at').val('');
        // $('#note').val('');
        // $('#btnDel').hide();
    }

    function initParentData(school_id, parent_data) {
        var parent = '';
        var mother_id = '';
        var father_id = '';
        var paternal_grandmother_id = '';
        var paternal_grandfather_id = '';
        var maternal_grandmother_id = '';
        var maternal_grandfather_id = '';
        var other_id = '';

        if (parent_data) {
            parent = JSON.parse(parent_data);
            mother_id = ((parent) ? parent.mother_id : '');
            father_id = ((parent) ? parent.father_id : '');
            paternal_grandmother_id = ((parent) ? parent.paternal_grandmother_id : '');
            paternal_grandfather_id = ((parent) ? parent.paternal_grandfather_id : '');
            maternal_grandmother_id = ((parent) ? parent.maternal_grandmother_id : '');
            maternal_grandfather_id = ((parent) ? parent.maternal_grandfather_id : '');
            other_id = ((parent) ? parent.other_id : '');
        }

        //AElement, AUrl, AParameter, ASetValue

        var AElement = '';
        var AUrl = '/admin/school/get-student-parent';
        var AParameter = 'school_id='+school_id;
        var ASetValue = '';
        $.ajax({
            url: AUrl,
            type: 'post',
            async: false,
            cache: false,
            data: AParameter,
            success: function(res) {
                //mother_id
                AElement = '#mother_id';
                ASetValue = mother_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //father_id
                AElement = '#father_id';
                ASetValue = father_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //paternal_grandmother_id
                AElement = '#paternal_grandmother_id';
                ASetValue = paternal_grandmother_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //paternal_grandfather_id
                AElement = '#paternal_grandfather_id';
                ASetValue = paternal_grandfather_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //maternal_grandmother_id
                AElement = '#maternal_grandmother_id';
                ASetValue = maternal_grandmother_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //maternal_grandfather_id
                AElement = '#maternal_grandfather_id';
                ASetValue = maternal_grandfather_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }

                //other_id
                AElement = '#other_id';
                ASetValue = other_id;
                $(AElement + ' option').remove();
                $(AElement).append('<option value="-1">未選擇</option>');
                $.each(res, function(key, item) {
                    if (item.id) {
                        $(AElement).append('<option value="' + item.id + '">' + item.name + '</option>');
                    } else if (item.code) {
                        $(AElement).append('<option value="' + item.code + '">' + item.name + '</option>');
                    }
                });
                $(AElement).select2({
                    theme: 'bootstrap',
                    minimumResultsForSearch: Infinity,
                    language: 'zh-TW'
                });
                if ((ASetValue != '') && (ASetValue != null) && (ASetValue != '-1')) {
                    $(AElement).val(JSON.parse(ASetValue)).trigger('change');
                }
            },
            error: bs.errorHandler
        });

        //舊寫法
        //bs.initTagElement('#mother_id', '/admin/school/get-student-parent', 'school_id='+school_id, mother_id);
        //bs.initTagElement('#father_id', '/admin/school/get-student-parent', 'school_id='+school_id, father_id);
        //bs.initTagElement('#paternal_grandmother_id', '/admin/school/get-student-parent', 'school_id='+school_id, paternal_grandmother_id);
        //bs.initTagElement('#paternal_grandfather_id', '/admin/school/get-student-parent', 'school_id='+school_id, paternal_grandfather_id);
        //bs.initTagElement('#maternal_grandmother_id', '/admin/school/get-student-parent', 'school_id='+school_id, maternal_grandmother_id);
        //bs.initTagElement('#maternal_grandfather_id', '/admin/school/get-student-parent', 'school_id='+school_id, maternal_grandfather_id);
        //bs.initTagElement('#other_id', '/admin/school/get-student-parent', 'school_id='+school_id, other_id);
    }

    function getStudentData() {
        var id = bs.getUrlVar('id');
        if (id.length == 0) {
            $('.student-data-view').hide();
            $('.student-data-edit').show();
            $('#student-parent-div').hide();
        } else {
            var dataObj = {};
            dataObj.id = id;
            $.ajax({
                url:  '/admin/student/get-student-data',
                data: JSON.stringify({ 'data': dataObj }),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    if ((r != '[]') && (r != '')) {



                        // edit
                        var school_id = r[0].school_id;
                        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', school_id);
                        bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+school_id, r[0].schoolclass_id);
                        initParentData(school_id, r[0].parent);

                        $('#user_no').val(r[0].user_no);
                        $('#seat_no').val(r[0].seat_no);
                        $('#first_name').val(r[0].first_name);
                        $('#birthday').val(r[0].birthday);
                        $('#card_no').val(r[0].card_no);
                        $('#phone').val(r[0].phone);
                        $('#contact_person').val(r[0].contact_person);

                        //bs.initSelectElement('#grade_code', '/admin/quizpaper/get-grade-code', '', '', r[0].grade_code, '');
                        bs.initSelectElement('#grade_code', '/admin/quizpaper/getstudent-grade-code', '', '', r[0].grade_code, 'EP');
                        //getE0byEP();

                        //alert(r[0].school_id);


                        $('#note').val(r[0].note);
                        $('#photo').val(r[0].photo);
                        if (r[0].photo != '') {
                            $('#img-photo').attr('src', r[0].photo);
                        }
                        $('input[name=allow_change_password]').val([r[0].allow_change_password]);
                        if (r[0].force_change_password == 1) {
                            $('#force_change_password').prop('checked',true);
                        } else {
                            $('#force_change_password').prop('checked',false);
                        }
                        $('#student_username').val(r[0].username);

                        // view
                        var tmpHTML = '';
                        var data = '';
                        var i = 0;
                        $('[data-field="school_id"]').html($('#school_id option:selected').text());
                        $('[data-field="user_no"]').html(r[0].user_no);
                        $('[data-field="seat_no"]').html(r[0].seat_no);
                        $('[data-field="first_name"]').html(r[0].first_name);
                        $('[data-field="card_no"]').html(r[0].card_no);
                        $('[data-field="phone"]').html(r[0].phone);
                        $('[data-field="contact_person"]').html(r[0].contact_person);

                        $('[data-field="birthday"]').html(r[0].birthday);
                        if(r[0].birthday != null){
                            var birthday_text = r[0].birthday.split('-');
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

                        $('[data-field="grade_code"]').html($('#grade_code option:selected').text());
                        $('[data-field="note"]').html(r[0].note);

                        $('[data-field="student_username"]').html(r[0].username);
                        if (r[0].allow_change_password == 1) {
                            $('[data-field="allow_change_password"]').html('允許');
                        } else {
                            $('[data-field="allow_change_password"]').html('禁止');
                        }

                        if (r[0].schoolclass_id) {
                             tmpHTML = '';
                            data = $('#schoolclass_id').select2('data');
                            for (i = 0; i < data.length; i++) {
                                tmpHTML += data[i].text + '；';
                            }
                             if (tmpHTML != '') {
                                 $('[data-field="schoolclass_id"]').html(tmpHTML);
                             }
                        }

                        // 家長
                        if (r[0].parent) {

                            //母親
                            if ($('#mother_id').val()!='-1') {
                                $('[data-field="mother_id"]').html($('#mother_id').select2('data')[0].text);
                            }

                            //父親
                            if ($('#father_id').val()!='-1') {
                                $('[data-field="father_id"]').html($('#father_id').select2('data')[0].text);
                            }

                            // 奶奶
                            if ($('#paternal_grandmother_id').val()!='-1') {
                                $('[data-field="paternal_grandmother_id"]').html($('#paternal_grandmother_id').select2('data')[0].text);
                            }

                            // 爺爺
                            if ($('#paternal_grandfather_id').val()!='-1') {
                                $('[data-field="paternal_grandfather_id"]').html($('#paternal_grandfather_id').select2('data')[0].text);
                            }

                            // 外婆
                            if ($('#maternal_grandmother_id').val()!='-1') {
                                $('[data-field="maternal_grandmother_id"]').html($('#maternal_grandmother_id').select2('data')[0].text);
                            }

                            // 外公
                            if ($('#maternal_grandfather_id').val()!='-1') {
                                $('[data-field="maternal_grandfather_id"]').html($('#maternal_grandfather_id').select2('data')[0].text);
                            }

                            // 其它
                            if ($('#other_id').val()!='-1') {
                                $('[data-field="other_id"]').html($('#other_id').select2('data')[0].text);
                            }
                        }

                    } else {
                        alert('無此資料！');
                        location.href = '/admin/student/';
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });

            $('.student-data-view').show();
            $('.student-data-edit').hide();
        }

    };

    function getSerialnoData(){
        var id = bs.getUrlVar('id');
        var dataObj = {};
        dataObj.id = id;

        $.ajax({
            url:'/admin/student/get-serialno-used',
            data: JSON.stringify({ 'data': dataObj }),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            success:function (res) {
                if(res.need_serialno == '1'){
                    var serialno_used_html='';
                    serialno_used_html+='<table class="table table-striped table-bordered table-hover w-100 text-nowrap">';
                    serialno_used_html+='<tr>';
                    serialno_used_html+='<th>班級</th>';
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
                        serialno_used_html+='<td>'+res.data[i].class_name+'</td>';
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

    $('#school_id').on('select2:select', function (e) {
        //換機構班級要重抓
        var school_id = $('#school_id').val();
        bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+school_id, '');
        initParentData(school_id, '');
    });

    var newObj = {};
    initObj();
    init();
    getStudentData();
    getSerialnoData();//序號使用表

    function init() {
        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', '');
        bs.initSelectElement('#grade_code', '/admin/quizpaper/getstudent-grade-code', '', '', '', 'EP');
        //getE0byEP();

        var school_id = $('#school_id').val();
        bs.initTagElement('#schoolclass_id', '/admin/school/get-student-schoolclass', 'school_id='+school_id, '');
        initParentData(school_id, '');
        // bs.initTagElement('#mother_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#father_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#paternal_grandmother_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#paternal_grandfather_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#maternal_grandmother_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#maternal_grandfather_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');
        // bs.initTagElement('#other_id', '/admin/school/get-student-parent', 'school_id='+school_id, '');

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
                url: '/admin/student/validate-birthday',
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

        //新增家長
        $('#btn-student-parent-add').on('click',function(e){
            e.preventDefault();

            //彈跳班級視窗
            $('#modal-student-parent-add').modal('show');
        });

        //新增家長-儲存
        $('#btnsave-student-parent-add').on('click',function(e){
            e.preventDefault();

            if ($('#parent_first_name').val() == '') {
                alert('請輸入姓名!');
                return false;
            }

            if ($('#parent_email').val()) {
                if (!bs.isEmail($('#parent_email').val())) {
                    alert('請輸入正確格式的Email!');
                    return false;
                }
            }

            if ($('#parent_username').val() == '') {
                alert('請輸入家長帳號!');
                return false;
            }

            if (bs.isChina($('#parent_username').val())) {
                alert('家長帳號不得含有中文!');
                return false;
            }

            if ($('#parent_password').val() == '') {
                alert('請輸入密碼!');
                return false;
            }

            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'parent';
            dataObj.school_id = $('#school_id').val();
            dataObj.user_no = '';
            dataObj.first_name = $('#parent_first_name').val();
            dataObj.username = $('#parent_username').val();
            dataObj.email = $('#parent_email').val();
            dataObj.password = $('#parent_password').val();
            dataObj.allow_change_password = $('input[name="parent_allow_change_password"]:checked').val();
            if ($('input[name="parent_force_change_password"]:checked').val() == '1') {
                dataObj.force_change_password = 1;
            } else {
                dataObj.force_change_password = 0;
            }

            $.ajax({
                url: '/admin/parent/parent-add',
                data: JSON.stringify({'data': dataObj}),
                type: 'POST',
                contentType: 'application/json',
                cache: false,
                beforeSend: function () {
                    bs.disableSubmits(true);
                },
                success: function (r) {
                    bs.disableSubmits(false);
                    $('#parent_first_name').val('');
                    $('#parent_email').val('');
                    $('#parent_username').val('');
                    $('#parent_password').val('');
                    $('input[name="parent_allow_change_password"][value="0"]').prop('checked',true);
                    $('#parent_force_change_password').prop('checked',false);
                    getStudentData();
                    $('#modal-student-parent-add').modal('hide');

                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });
        });


        //加入班級
        $('#btn-student-schoolclass-add').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                clearState();

                var tmpHTML = '';
                var dataObj = {};
                dataObj.student_id = id;
                $.ajax({
                    url: '/admin/student/get-student-schoolclass-add-list',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.data.length > 0) {
                            tmpHTML = '';
                            for (var i = 0; i < r.data.length; i++) {
                                tmpHTML += '<div><input type="checkbox" name="check-student-schoolclass-add" value="' + r.data[i].id + '" /> <span>' + r.data[i].name + '</span></div>';
                            }
                            $('#div-student-schoolclass-add').html(tmpHTML);
                        } else {
                            tmpHTML = '無可加入課程!';
                            $('#div-student-schoolclass-add').html(tmpHTML);
                        }
                    },
                    error: bs.errorHandler,
                });

                //彈跳班級視窗
                $('#modal-student-schoolclass-add').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //加入班級-儲存
        $('#btnsave-student-schoolclass-add').on('click',function(e){
            e.preventDefault();

            if ($('input[name=check-student-schoolclass-add]').length == 0) {
                alert('無可加入課程!');
                return false;
            }

            if ($('input[name=check-student-schoolclass-add]:checked').val() == '') {
                alert('請選擇欲加入課程!');
                return false;
            }

            var schoolclass_ids = [];
            $('input[name=check-student-schoolclass-add]:checked').each(function(){
                schoolclass_ids.push(this.value);
            });

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.student_id = id;
                dataObj.schoolclass_ids = schoolclass_ids;
                $.ajax({
                    url: '/admin/student/student-schoolclass-add',
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
                location.href = '/admin/student/';
            }
        });

        //退出班級
        $('#btn-student-schoolclass-delete').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                clearState();

                var tmpHTML = '';
                var dataObj = {};
                dataObj.student_id = id;
                $.ajax({
                    url: '/admin/student/get-student-schoolclass-delete-list',
                    data: JSON.stringify({'data': dataObj}),
                    type: 'POST',
                    contentType: 'application/json',
                    async: false,
                    cache: false,
                    success: function (r) {
                        if (r.data.length > 0) {
                            tmpHTML = '';
                            for (var i = 0; i < r.data.length; i++) {
                                tmpHTML += '<div><input type="checkbox" name="check-student-schoolclass-delete" value="' + r.data[i].id + '" /> <span>' + r.data[i].name + '</span></div>';
                            }
                            $('#div-student-schoolclass-delete').html(tmpHTML);
                        } else {
                            tmpHTML = '無可刪除課程!';
                            $('#div-student-schoolclass-delete').html(tmpHTML);
                        }
                    },
                    error: bs.errorHandler,
                });

                //彈跳班級視窗
                $('#modal-student-schoolclass-delete').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //退出班級-儲存
        $('#btnsave-student-schoolclass-delete').on('click',function(e){
            e.preventDefault();

            if ($('input[name=check-student-schoolclass-delete]').length == 0) {
                alert('無可刪除課程!');
                return false;
            }

            if ($('input[name=check-student-schoolclass-delete]:checked').val() == '') {
                alert('請選擇欲刪除課程!');
                return false;
            }

            var schoolclass_ids = [];
            $('input[name=check-student-schoolclass-delete]:checked').each(function(){
                schoolclass_ids.push(this.value);
            });

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.student_id = id;
                dataObj.schoolclass_ids = schoolclass_ids;
                $.ajax({
                    url: '/admin/student/student-schoolclass-delete',
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
                location.href = '/admin/student/';
            }
        });


        //重置密碼
        $('#btn-student-resetpwd').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-student-resetpwd').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //重置密碼-儲存
        $('#btnsave-student-resetpwd').on('click',function(e){
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
                dataObj.student_id = id;
                dataObj.password = $('#newpassword').val();
                $.ajax({
                    url: '/admin/student/student-resetpwd',
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
                location.href = '/admin/student/';
            }
        });


        //刷新名片
        $('#btn-student-card-refresh').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-student-card-refresh').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //刷新名片-儲存
        $('#btnsave-student-card-refresh').on('click',function(e){
            e.preventDefault();

            alert('待產生…');
            exit;

            // var id = bs.getUrlVar('id');
            // if (id != '') {
            //     var dataObj = {};
            //     dataObj.student_id = id;
            //     $.ajax({
            //         url: '/admin/student/card-refresh',
            //         data: JSON.stringify({'data': dataObj}),
            //         type: 'POST',
            //         contentType: 'application/json',
            //         cache: false,
            //         success: function (r) {
            //             if ((r.stateinfo != '') && (r.stateinfo !== undefined)) {
            //                 alert(r.stateinfo);
            //             }
            //             if ((r.reurl != '') && (r.reurl !== undefined)) {
            //                 location.replace(r.reurl);
            //             }
            //         },
            //         error: bs.errorHandler,
            //     });
            // } else {
            //     swal('無此學生資料!');
            //     location.href = '/admin/student/';
            // }
        });


        //帳號停用
        $('#btn-student-close').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-student-close').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //帳號啟用
        $('#btn-student-open').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-student-open').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //帳號停用-儲存
        $('#btnsave-student-close').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.student_id = id;
                $.ajax({
                    url: '/admin/student/student-inactive',
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
                location.href = '/admin/student/';
            }
        });

        //帳號啟用-儲存
        $('#btnsave-student-open').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.student_id = id;
                $.ajax({
                    url: '/admin/student/student-active',
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
                location.href = '/admin/student/';
            }
        });

        //刪除學生
        $('#btn-student-delete').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                //彈跳班級視窗
                clearState();
                $('#modal-student-delete').modal('show');
            } else {
                swal('無此學生資料!');
                location.href = '/admin/student/';
            }
        });

        //刪除學生-儲存
        $('#btnsave-student-delete').on('click',function(e){
            e.preventDefault();

            var id = bs.getUrlVar('id');
            if (id != '') {
                var dataObj = {};
                dataObj.student_id = id;
                $.ajax({
                    url: '/admin/student/student-delete',
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
                location.href = '/admin/student/';
            }
        });



        //基本資料-更改資料
        $('#btn-student-base-edit').on('click',function(e){
            e.preventDefault();
            $('.student-base-data-view').hide();
            $('.student-base-data-edit').show();
        });

        //基本資料-取消
        $('#btn-student-base-view').on('click',function(e){
            e.preventDefault();
            $('.student-base-data-view').show();
            $('.student-base-data-edit').hide();
        });


        //其他資料-更改資料
        $('#btn-student-other-data-edit').on('click',function(e){
            e.preventDefault();
            $('.student-other-data-view').hide();
            $('.student-other-data-edit').show();
        });

        //其他資料-取消
        $('#btn-student-other-data-view').on('click',function(e){
            e.preventDefault();
            $('.student-other-data-view').show();
            $('.student-other-data-edit').hide();
        });

        //班級設定-更改資料
        $('#btn-student-schoolclass-edit').on('click', function (e) {
            e.preventDefault();
            $('.student-schoolclass-data-view').hide();
            $('.student-schoolclass-data-edit').show();
            $('.student-schoolclass-data-hide').hide();
        });

        //班級設定-取消
        $('#btn-student-schoolclass-view').on('click', function (e) {
            e.preventDefault();
            $('.student-schoolclass-data-view').show();
            $('.student-schoolclass-data-edit').hide();
        });

        //系統設定-更改資料
        $('#btn-student-service-edit').on('click',function(e){
            e.preventDefault();
            $('.student-service-data-view').hide();
            $('.student-service-data-edit').show();
            $('.student-service-data-hide').hide();
        });

        //系統設定-取消
        $('#btn-student-service-view').on('click',function(e){
            e.preventDefault();
            $('.student-service-data-view').show();
            $('.student-service-data-edit').hide();
        });

        //家長資料-新增資料
        $('#btn-student-parent-add').on('click',function(e){
            e.preventDefault();
            $('.student-parent-data-view').hide();
            $('.student-parent-data-edit').show();
        });

        //家長資料-更改資料
        $('#btn-student-parent-edit').on('click',function(e){
            e.preventDefault();
            $('.student-parent-data-view').hide();
            $('.student-parent-data-edit').show();
        });

        //家長資料-取消
        $('#btn-student-parent-view').on('click',function(e){
            e.preventDefault();
            $('.student-parent-data-view').show();
            $('.student-parent-data-edit').hide();
        });

        //允許修改密碼
        //$('input[type=radio][name=allow_change_password]').change(function(){
        //    if (this.value == '1') {
        //        //強迫修改密碼
        //        $('#force_change_password').prop('disabled', false);
        //    }
        //    else {
        //        $('#force_change_password').prop('disabled', true);
        //    }
        //});

        //完成新增
        $('#student-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                user_no: 'required',
                first_name: 'required',
                birthday: 'required',
                grade_code: 'required',
                student_username: 'required',
                student_password: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                user_no: '請輸入學號',
                first_name: '請輸入姓名',
                birthday: '請選擇日期',
                grade_code: '請選擇機構',
                student_username: '請輸入帳號',
                student_password: '請輸入密碼',
            },
            submitHandler: function(form) {

                return false;
            },
        });

        $('#student-submit').on('click', function() {
            $('#user_no').val($('#user_no').val().trim());
            $('#first_name').val($('#first_name').val().trim());
            $('#student_username').val($('#student_username').val().trim());
            $('#student_password').val($('#student_password').val().trim());

            if($('#user_no').val() == ''){
                alert('請輸入學號');
            }

            if($('#first_name').val() == ''){
                alert('請輸入姓名');
            }

            if($('#student_username').val() == ''){
                alert('請輸入帳號');
            }

            if($('#student_password').val() == ''){
                alert('請輸入密碼');
            }

            var phone = $('#phone').val();


            if (bs.isChina(phone)) {
                alert('手機號碼不得含有中文!');
                return false;
            }

            if (phone.length > 0) {
                var re = /^09[0-9]{8}$/;
                if (re.test(phone) == false) {
                    alert('手機必須為十碼數字,前面兩碼為09');
                    return false;
                }
            }

            var contact_person = $('#contact_person').val();
            if (contact_person.length > 50) {
                alert("聯絡人輸入字數不可超過50個字");
                return false;
            }


            if ($('#student-form').valid()) {

                if (bs.isChina($('#student_username').val())) {
                    alert('學生帳號不得含有中文!');
                    return false;
                }

                if(validate_birthday == '0'){
                    alert('生日資料不正確!');
                    return false;
                }

                if ($('#year').val()==-1 && $('#month').val()==-1 && $('#day').val()==-1){
                    alert('請填寫生日');
                    return false;
                }



                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'student';
                dataObj.id = bs.getUrlVar('id');
                dataObj.school_id = $('#school_id').val();
                dataObj.user_no = $('#user_no').val();
                dataObj.first_name = $('#first_name').val();
                dataObj.grade_code = $('#grade_code').val();
                dataObj.username = $('#student_username').val();
                dataObj.password = $('#student_password').val();
                dataObj.seat_no = $('#seat_no').val();
                if(validate_birthday == '1'){
                    dataObj.birthday = $('#year').val() +'-'+ $('#month').val() +'-'+ $('#day').val();
                }
                dataObj.card_no = $('#card_no').val();
                dataObj.note = $('#note').val();


                dataObj.photo = $('#photo').val();
                dataObj.allow_change_password = $('input[name="allow_change_password"]:checked').val();
                if ($('input[name="force_change_password"]:checked').val() == '1') {
                    dataObj.force_change_password = 1;
                } else {
                    dataObj.force_change_password = 0;
                }
                dataObj.schoolclass_id = $('#schoolclass_id').val();
                dataObj.serialno = $('#serialno_keyin').val().trim();
                dataObj.phone = $('#phone').val();
                dataObj.contact_person = contact_person;


                $.ajax({
                    url: '/admin/student/student-add',
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
        $('#student-base-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                school_id: 'required',
                user_no: 'required',
                first_name: 'required',
                birthday: 'required',
                grade_code: 'required',
            },
            messages: {
                school_id: '請選擇機構',
                user_no: '請輸入學號',
                first_name: '請輸入姓名',
                birthday: '請選擇日期',
                grade_code: '請選擇機構',
            },
        });

        $('#student-base-submit').on('click', function() {
            $('#user_no').val($('#user_no').val().trim());
            $('#first_name').val($('#first_name').val().trim());

            if($('#user_no').val() == ''){
                alert('請輸入學號');
            }

            if($('#first_name').val() == ''){
                alert('請輸入姓名');
            }


            if ($('#student-base-form').valid()) {

                if (bs.isChina($('#user_no').val())) {
                    alert('學號不得含有中文');
                    return false;
                }

                if (bs.isChina($('#seat_no').val())) {
                    alert('座號不得含有中文');
                    return false;
                }

                if(validate_birthday == '0'){
                    alert('生日資料不正確!');
                    return false;
                }

                if ($('#year').val()==-1 && $('#month').val()==-1 && $('#day').val()==-1){
                    alert('請填寫生日');
                    return false;
                }


                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'student-base';
                dataObj.id = bs.getUrlVar('id');
                dataObj.school_id = $('#school_id').val();
                dataObj.user_no = $('#user_no').val();
                dataObj.first_name = $('#first_name').val();
                dataObj.grade_code = $('#grade_code').val();
                dataObj.seat_no = $('#seat_no').val();
                if(validate_birthday == '1') {
                    dataObj.birthday = $('#year').val() +'-'+ $('#month').val() +'-'+ $('#day').val();
                }
                //卡號會驗證所以基本資料要加入
                dataObj.card_no = $('#card_no').val();




                $.ajax({
                    url: '/admin/student/student-add',
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

        //其他資料-取消enter事件
        $('#student-other-data-form').submit(function(e) {
            e.preventDefault();
        });

        //其他資料-確定
        $('#student-other-data-submit').on('click',function()
        {


            var phone = $('#phone').val();
            if (bs.isChina(phone)) {
                alert('手機號碼不得含有中文!');
                return false;
            }
            if (phone.length > 0) {
                var re = /^09[0-9]{8}$/;
                if (re.test(phone) == false) {
                    alert('手機必須為十碼數字,前面兩碼為09');
                    return false;
                }
            }
            var contact_person = $('#contact_person').val();
            if (contact_person.length > 50) {
                alert("聯絡人輸入字數不可超過50個字");
                return false;
            }

            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'stuednt-other-data';
            dataObj.id = bs.getUrlVar('id');
            dataObj.card_no = $('#card_no').val();
            dataObj.note = $('#note').val();
            dataObj.photo = $('#photo').val();
            dataObj.phone = $('#phone').val();
            dataObj.contact_person = contact_person;


            $.ajax({
                url: '/admin/student/student-add',
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

        //服務設定
        $('#student-service-form').submit(function(e) {
            e.preventDefault();
        }).validate({
            rules: {
                student_username: 'required',
            },
            messages: {
                student_username: '請輸入帳號',
            },
        });

        $('#student-service-submit').on('click', function() {
            $('#student_username').val($('#student_username').val().trim());

            if($('#student_username').val() == ''){
                alert('請輸入帳號');
            }

            if ($('#student-service-form').valid()) {

				if (bs.isChina($('#student_username').val())) {
                    alert('學生帳號不得含有中文!');
                    return false;
                }

                //相關參數
                var dataObj = {};
                dataObj.reurl = bs.getUrlVar('reurl');
                dataObj.pagemode = 'student-service';
                dataObj.id = bs.getUrlVar('id');
                dataObj.username = $('#student_username').val();
                dataObj.allow_change_password = $('input[name="allow_change_password"]:checked').val();
                if ($('input[name="force_change_password"]:checked').val() == '1') {
                    dataObj.force_change_password = 1;
                } else {
                    dataObj.force_change_password = 0;
                }
                dataObj.card_no = $('#card_no').val();


                //alert($('input[name="allow_change_password"]:checked').val());
                //alert($('input[name="force_change_password"]:checked').val());
                //exit;

                $.ajax({
                    url: '/admin/student/student-add',
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


        //班級設定
        $('#student-schoolclass-submit').on('click', function () {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'student-schoolclass';
            dataObj.id = bs.getUrlVar('id');
            dataObj.schoolclass_id = $('#schoolclass_id').val();
            dataObj.serialno = $('#serialno_keyin').val().trim();

            $.ajax({
                url: '/admin/school/set-student-schoolclass',
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

        //家長設定
        $('#student-parent-submit').on('click', function () {
            //相關參數
            var dataObj = {};
            dataObj.reurl = bs.getUrlVar('reurl');
            dataObj.pagemode = 'student-parent';
            dataObj.id = bs.getUrlVar('id');

            dataObj.mother_id = $('#mother_id').val();
            dataObj.father_id = $('#father_id').val();
            dataObj.paternal_grandmother_id = $('#paternal_grandmother_id').val();
            dataObj.paternal_grandfather_id = $('#paternal_grandfather_id').val();
            dataObj.maternal_grandmother_id = $('#maternal_grandmother_id').val();
            dataObj.maternal_grandfather_id = $('#maternal_grandfather_id').val();
            dataObj.other_id = $('#other_id').val();

            var parent_ary=[];
            parent_ary.push(dataObj.mother_id);
            parent_ary.push(dataObj.father_id);
            parent_ary.push(dataObj.paternal_grandmother_id);
            parent_ary.push(dataObj.paternal_grandfather_id);
            parent_ary.push(dataObj.maternal_grandmother_id);
            parent_ary.push(dataObj.maternal_grandfather_id);
            parent_ary.push(dataObj.other_id);

            var repeat = parent_ary.filter(function(element, index, array){
                return array.indexOf(element) !== index && element!=-1;
            });

            if (repeat.length>0) {
                swal('家長不可重複選擇');
                return false;
            }


            // var parent = [];
            // var obj = {
            //     'mother_id': $('#mother_id').val(),
            //     'father_id': $('#father_id').val(),
            //     'paternal_grandmother_id': $('#paternal_grandmother_id').val(),
            //     'paternal_grandfather_id': $('#paternal_grandfather_id').val(),
            //     'maternal_grandmother_id': $('#maternal_grandmother_id').val(),
            //     'maternal_grandfather_id': $('#maternal_grandfather_id').val(),
            //     'other_id': $('#other_id').val(),
            // }
            // parent.push(obj);
            // dataObj.parent = parent;

            $.ajax({
                url: '/admin/school/set-student-parent',
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
                        $('[data-field="mother_id"]').html($('#mother_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="father_id"]').html($('#father_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="paternal_grandmother_id"]').html($('#paternal_grandmother_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="paternal_grandfather_id"]').html($('#paternal_grandfather_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="maternal_grandmother_id"]').html($('#maternal_grandmother_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="maternal_grandfather_id"]').html($('#maternal_grandfather_id').select2('data')[0].text.replace('未選擇',''));
                        $('[data-field="other_id"]').html($('#other_id').select2('data')[0].text.replace('未選擇',''));
                        $('.student-parent-data-view').show();
                        $('.student-parent-data-edit').hide();
                    }
                },
                error: bs.errorHandler,
                complete: function () {
                    bs.disableSubmits(false);
                }
            });
        });





        //
    }

    function initObj() {
        $('#birthday').datetimepicker({
            step: 30,
            format: 'Y/m/d'
        });
    }

    function getE0byEP(){
        $.ajax({
            url: '/admin/school/check_e0_ep',
            type: 'POST',
            cache: false,
            success: function (r) {
                if(r == '1'){
                    $('#grade_code').append('' +
                        '<option value="E1">國小一年級</option>' +
                        '<option value="E2">國小二年級</option>' +
                        '<option value="E3">國小三年級</option>' +
                        '<option value="E4">國小四年級</option>' +
                        '<option value="E5">國小五年級</option>' +
                        '<option value="E6">國小六年級</option>' );
                }
            },
            error: bs.errorHandler,
        });
    }
});
