$(function() {
    'use strict';

    if (bs.getUrlVar('message') == 'more_user') {
        var dataObj = {};
        var user_ids=bs.getUrlVar('user_data');
        dataObj.user_ids=user_ids;

        $.ajax({
            url: '/admin/openid/get-multiple-userdata',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {


                if(r.message=='success') {


                    var user_html='';
                    $.each(r.data,function(key,item){
                        user_html+='<div class="form-check">';
                        user_html+='<input class="form-check-input" type="radio" name="user-info" id="user-'+item.id+'" value="'+item.id+'">';
                        user_html+='<label class="form-check-label" for="user-'+item.id+'">'+item.school_name+'</label>';
                        user_html+=' </div>';

                    });
                    $('#multiple-user-strict').empty().html(user_html);
                    $('#modal-hlc-user-choose').modal('show');
                }
                else{
                    alert(r.message);
                }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });


    }

    // $('#login-form').submit(function(e) {
    //     e.preventDefault();
    // }).validate({
    //     rules: {
    //         login_username: 'required',
    //         login_password: 'required',
    //     },
    //     messages: {
    //         login_username: '請輸入帳號',
    //         login_password: '請輸入密碼',
    //     },
    // });

	$('#login_username,#login_password').on('keypress',function(e){
		if (e.which==13) {
			$('#login-submit').trigger('click');
		}
	});

    $('#openid-login').on('click', function(e) {
        e.preventDefault();
        var dataObj = {};

        $.ajax({
            url: '/admin/openid/openid-login',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
                if ((r.reurl != '') && (r.reurl !== undefined)) {
                    location.replace(r.reurl);
                }

                // if(r.message=='more_user') {
                //
                //
                //     location.href = "/auth/login";
                //     var user_html='';
                //     $.each(r.data,function(key,item){
                //         user_html+='<div class="form-check">';
                //         user_html+='<input class="form-check-input" type="radio" name="user-info" id="user-'+item.id+'" value="'+item.id+'">';
                //         user_html+='<label class="form-check-label" for="user-'+item.id+'">'+item.school_name+'</label>';
                //         user_html+=' </div>';
                //
                //     });
                //     $('#multiple-user-strict').empty().html(user_html);
                //     $('#modal-hlc-user-choose').modal('show');
                // }
            },
            error: bs.errorHandler,
            complete: function () {
                bs.disableSubmits(false);
            }
        });




    });


    $('#login-submit').on('click', function() {

        if ($('#login_username').val()=='') {
            alert('請輸入帳號!');
            return false;
        }

        if ($('#login_password').val()=='') {
            alert('請輸入密碼!');
            return false;
        }

        //相關參數
        var dataObj = {};
        dataObj.reurl = bs.getUrlVar('reurl');
        dataObj.username = $('#login_username').val();
        dataObj.password = $('#login_password').val();
        //dataObj.rememberMe = $('input:checkbox[name="rememberMe"]').val();

        //alert($('input:checkbox[name="rememberMe"]').val());
        $.ajax({
            url: '/admin/login/page-login',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {

                if ((r.stateinfo != '') && (r.stateinfo !== undefined) && (r.stateinfo!='has_child')) {
                    alert(r.stateinfo);
                }

                if (r.stateinfo=='has_child') {
                    var stu_html='';
                    $.each(r.data,function(key,item){
                        stu_html+=
                        '<div class="form-check">\
                            <input class="form-check-input" type="radio" name="stu-info" id="stu-'+item.id+'" value="'+item.id+'">\
                            <label class="form-check-label" for="stu-'+item.id+'">'+item.first_name+'</label>\
                        </div>';
                    });
                    $('#student-strict').empty().html(stu_html);
                    $('#modal-student-choose').modal('show');
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

    $('#multiple-userchoose-login').on('click',function(e){

        e.preventDefault();

        if ($('input:radio:checked[name="user-info"]').length == 0) {
            alert('請選擇登入的學校');
            return false;
        }

        //相關參數
        var dataObj = {};
        dataObj.user_id = $('input:radio[name="user-info"]:checked').val();

        $.ajax({
            url: '/admin/openid/multiple-login',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {
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

    $('#stuchoose-login').on('click',function(e){

        e.preventDefault();

        if ($('input:radio:checked[name="stu-info"]').length == 0) {
            alert('請選擇要觀看的學生');
            return false;
        }

        //相關參數
        var dataObj = {};
        dataObj.reurl = bs.getUrlVar('reurl');
        dataObj.username = $('#login_username').val();
        dataObj.sub_id = $('input:radio[name="stu-info"]:checked').val();

        $.ajax({
            url: '/admin/login/page-parent-login',
            data: JSON.stringify({'data': dataObj}),
            type: 'POST',
            contentType: 'application/json',
            cache: false,
            beforeSend: function () {
                bs.disableSubmits(true);
            },
            success: function (r) {

                if ((r.stateinfo != '') && (r.stateinfo !== undefined) && (r.stateinfo!='has_child')) {
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


});
