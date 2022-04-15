$(function() {
    'use strict';


    //開始結束日期控制相關
    jQuery('#date-stime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false,

    });

    jQuery('#date-etime').datetimepicker({
        step: 30,
        format: 'Y/m/d',
        timepicker: false,

    });

    $('#stu_video').on('click',function(e){
        e.preventDefault();
        var stime=$('#date-stime').val();
        var etime=$('#date-etime').val();

        setTimeout(function() {
            location.href='/admin/school/zexport-stu-video?stime=' + stime
                + '&etime='+etime; }, 500);
    });

    $('#teacher_video').on('click',function(e){
        e.preventDefault();
        var stime=$('#date-stime').val();
        var etime=$('#date-etime').val();
        setTimeout(function() {
            location.href='/admin/school/zexport-teacher-video?stime=' + stime
                + '&etime='+etime; }, 500);
    });

    $('#stu-tmp-exam').on('click',function(e){
        e.preventDefault();
        var stime=$('#date-stime').val();
        var etime=$('#date-etime').val();
        setTimeout(function() {
            location.href='/admin/school/zexport-stu-tmp-exam?stime=' + stime
                + '&etime='+etime; }, 500);
    });

    $('#stu-exam').on('click',function(e){
        e.preventDefault();
        var stime=$('#date-stime').val();
        var etime=$('#date-etime').val();
        setTimeout(function() {
            location.href='/admin/school/zexport-stu-exam?stime=' + stime
                + '&etime='+etime; }, 500);
    });

    $('#ask-report').on('click',function(e){
        e.preventDefault();
        var stime=$('#date-stime').val();
        var etime=$('#date-etime').val();
        setTimeout(function() {
            location.href='/admin/school/zexport-ask-report?stime=' + stime
                + '&etime='+etime; }, 500);
    });


});