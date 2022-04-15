
$(function () {
    'use strict';
    var newObj = {};
    init();

    function init() {

        //清除狀態
        function clearState() {
            $('#newpassword').val('');
            $('#renewpassword').val('');
        }

        //重置密碼
        $('#btn-user-resetpwd').on('click',function(e){
            e.preventDefault();

            //彈跳視窗
            clearState();
            $('#modal-user-resetpwd').modal('show');
        });

        //重置密碼-儲存
        $('#btnsave-user-resetpwd').on('click',function(e){
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

            var dataObj = {};
            dataObj.password = $('#newpassword').val();
            $.ajax({
                url: '/admin/login/resetpwd',
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
        });

    }


});
