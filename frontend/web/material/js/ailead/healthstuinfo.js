$(function() {
    "use strict";
    var newObj = {};
    init();



    function init(){
        getGradeLevel();
        getGradeCode($('#select-gradelevel').val());

        $('#select-gradelevel').on('change',function(e){
            getGradeCode($('#select-gradelevel').val());
        });

        $('#btn-save').on('click', function(e) {
            e.preventDefault();
            if (validateStuinfo()) {
                createUser();
            }
        });
    }

    function getGradeLevel(){
        $('#select-gradelevel').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function getGradeCode(grade) {

        $('#select-grade option').remove();
        $('#select-grade').append('<option value="-1">請選擇年級</option>');
        if (grade=='E0') {
			$('#select-grade').append('<option value="E5">國小五年級</option>');
            $('#select-grade').append('<option value="E6">國小六年級</option>');
        }
        if (grade=='J0') {
            $('#select-grade').append('<option value="J1">國中一年級</option>');
            $('#select-grade').append('<option value="J2">國中二年級</option>');
            $('#select-grade').append('<option value="J3">國中三年級</option>');
        }
        if (grade=='H0') {
            $('#select-grade').append('<option value="H1">高中一年級</option>');
            $('#select-grade').append('<option value="H2">高中二年級</option>');
            $('#select-grade').append('<option value="H3">高中三年級</option>');
        }

        $('#select-grade').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function validateStuinfo(){

        if (!$('#txt-parentname').val()) {
            swal('請輸入家長姓名');
            return false;
        }

        if (!$('#txt-username').val()) {
            swal('請輸入家長手機');
            return false;
        }

        if ($('#txt-email').val()) {
            if (!bs.isEmail($('#txt-email').val())) {
                swal('不是有效E-mail，請重新輸入');
                return false;
            }
        }

        if (!$('#txt-stuname').val()) {
            swal('請輸入學生姓名');
            return false;
        }

        if (!$('#select-gradelevel').val()) {
            swal('請選擇學制');
            return false;
        }

        if (!$('#txt-stuschool').val()) {
            swal('請輸入學校名稱');
            return false;
        }

        if (!$('#select-grade').val()) {
            swal('請選擇年級');
            return false;
        }

        if (!$('#txt-stuclass').val()) {
            swal('請輸入班級名稱');
            return false;
        }

        return true;
    }

    function createUser() {

        var dataObj = {};
        dataObj.parent_name=$('#txt-parentname').val();
        dataObj.username=$('#txt-username').val();
        dataObj.email=$('#txt-email').val();
        dataObj.stu_name=$('#txt-stuname').val();
        dataObj.stu_grade_level=$('#select-gradelevel').val();
        dataObj.stu_school=$('#txt-stuschool').val();
        dataObj.stu_grade_code=$('#select-grade').val();
        dataObj.stu_class=$('#txt-stuclass').val();

        $.ajax({
            url: '/admin/knowhow/create-user',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                if (res.message!='success') {
                    swal(res.message);
                    return false;
                }
                location.replace('/admin/knowhow/setting?id='+res.huser_id+'&type=setuserfinish');

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }
});
