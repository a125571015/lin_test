$(function() {
    'use strict';
    var newObj = {};
    newObj.knowledge_well_std = [];
    var schoolclassObj={};
    var schoolclassDetailObj={};

    init();

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



        $('#text_year').select2('enable', false);
    }

    function init() {

        newObj = initObj();

        $('#btn-school-close').on('click',function(e){
            e.preventDefault();
            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請至少選擇一個班級進行班級結業');
                return false;
            }

            var pid='';
            $.each(rows_selected, function(key, item){
                pid+=item+'-';
            });
            pid=pid.slice(0,-1);

            location.href='schoolclassclose?type=manual&pid='+pid;
        });

        $('.prev-btn').on('click', function(e) {
            e.preventDefault();
            var check_step_currentIndex=$('#schoolclass-wizard').steps('getCurrentIndex');
            if (check_step_currentIndex==2){
                $('#tbList2').html('');
                $("a#instructions").hide();
                $('.schoolclass-detail-btn').hide();
               // $('#serialno_input').show();


            }
            $('#schoolclass-wizard').steps('previous');
            $('.steps ul').find('.done').addClass('disabled');
        });

        $('.next-btn').on('click', function(e) {
            e.preventDefault();
            //檢查他的步驟如果是在建立學生名單進入的話
            var check_step_currentIndex=$('#schoolclass-wizard').steps('getCurrentIndex');
            if (check_step_currentIndex==1){

                    // 檢查學生勾選
                    var rows_selected = newObj.tblist.column(0).checkboxes.selected();
                    if (rows_selected.length==0) {
                        swal('請選擇班級學生!,沒有學生無法新增班級');
                        return false;
                    }

                    var pid='';
                    $.each(rows_selected, function(key, item){
                        pid+=item+'-';


                    });
                    pid=pid.slice(0,-1);

                    //相關參數
                    // var dataObj = {};
                schoolclassObj.reurl = bs.getUrlVar('reurl');
                schoolclassObj.pagemode = 'schoolclass';
                schoolclassObj.id = bs.getUrlVar('id');
                schoolclassObj.school_id = $('#school_id').val();
                schoolclassObj.grade_code = $('#grade_code').val();
                schoolclassObj.subject_code = $('#subject_code').val();
                schoolclassObj.name = $('#name').val();
                schoolclassObj.school_tag_id = $('#school_tag_id').val();

                schoolclassObj.school_tag_names = [];
                    var school_tag_names=[];
                    $.each($('#school_tag_id').select2('data'), function(key, item) {
                        school_tag_names.push(item.text);
                    });
                    school_tag_names.sort();
                schoolclassObj.school_tag_names=school_tag_names;

                schoolclassObj.start_at = $('#start_at').val() + ' 00:00:00';
                schoolclassObj.end_at = $('#end_at').val() + ' 23:59:59';
                schoolclassObj.autocomplete = 1;
                schoolclassObj.schoolclass_detail_ids = pid;
                schoolclassObj.text_year = $('#text_year').val();
                    // 教學影片
                    if ($('input[name="is_exam"]:checked').val() == '1') {
                        schoolclassObj.is_exam = 1;
                    } else {
                        schoolclassObj.is_exam = 0;
                    }

                    if ($('input[name="is_schoolvideo"]:checked').val() == '1') {
                        schoolclassObj.is_schoolvideo = 1;
                    } else {
                        schoolclassObj.is_schoolvideo = 0;
                    }

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
                schoolclassObj.role = role;

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
                schoolclassObj.video_role = video_role;



                //schoolclassObj.serialno = $('#serialno_keyin').val().trim();

                    if ($('input[name="is_makeupvideo"]:checked').val() == '1'){
                        schoolclassObj.is_makeupvideo = 1;
                    }else{
                        schoolclassObj.is_makeupvideo = 0;
                    }
                schoolclassObj.makeupvideo_amount = $('#makeupvideo_amount').val();
                schoolclassObj.makeupstd = $('#makeupstd').val();
                schoolclassObj.knowledge_well_std = JSON.stringify(newObj.knowledge_well_std);
                //新增班級一併新增老師設定
                schoolclassObj.manager_id = $('#manager_id').val();
                schoolclassObj.sub_manager_id = $('#sub_manager_id').val();

                $.ajax({
                    url: '/admin/schoolclass/get-temp-schoolclasscreate',
                    data: JSON.stringify({'data': schoolclassObj}),
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
                            $('#schoolclass-wizard').steps('next');
                            $('.steps ul').find('.done').addClass('disabled');
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
                                            '<input class="form-control" style="width:100px" maxlength="10" name="txt-seat" autocomplete="off" data-index="' + key + '" value="' + item[5] + '" />';

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
                    error: bs.errorHandler,
                    complete: function () {
                        bs.disableSubmits(false);
                    }
                });



                }
            else{
                $('#schoolclass-wizard').steps('next');
                $('.steps ul').find('.done').addClass('disabled');


            }


        });

        $('.finish-btn').on('click', function(e) {
            e.preventDefault();
            $('#schoolclass-wizard').steps('finish');
        });

        $('.schoolclass-detail-btn').on('click', function(e) {
            e.preventDefault();

            SchoolclassCreate();
            $('#schoolclass-wizard').steps('finish');

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

		$('#grade_code').on('select2:select', function (e) {

	        getSubjectCode();

	        initRole();
            //升級要調整的年度 把if else去掉 保留測試站為新的年度
	        var data = e.params.data;
            var check_location=location.host;
            var E0_year = ['110', '109', '108', '107', '106', '105'];
            var EP_year = ['110'];
            var J0_year = ['110', '109', '108'];
            var H0_year = ['110', '109', '108'];

            // if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com') {}else{}





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

        $("a#instructions").hide();
        // $('.next-btn').on('click', function(e) {
        //     e.preventDefault();
        //     $('#schoolclass-wizard').steps('next');
        // });
        //
        // $('.finish-btn').on('click', function(e) {
        //     e.preventDefault();
        //     $('#schoolclass-wizard').steps('finish');
        // });

        //$('.bt-switch input[type="checkbox"], .bt-switch input[type="radio"]').bootstrapSwitch();
        $('.bt-switch').bootstrapSwitch();


        var from=60;
        var to=80;
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
    }

    function initObj() {

        $('#schoolclass-wizard').submit(function(e) {
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

        newObj.step = $('#schoolclass-wizard').steps({
            headerTag: 'h6',
            bodyTag: 'section',
            transitionEffect: 'fade',
            titleTemplate: '<span class="step">#index#</span> #title#',
            enablePagination: false,
            onStepChanging: function(event, currentIndex, newIndex) {
                if (currentIndex == 0) {
                    $('#name').val($('#name').val().trim());
                    if($('#name').val() == ''){
                        swal('請輸入班級名稱');
                        $('#schoolclass-wizard').valid();
                        return false;
                    }

                    if ($('#schoolclass-wizard').valid()) {
                        //檢查自動結業選項

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


                        if($('#makeupvideo_amount').val() == '' || !$('#makeupvideo_amount').val().match(/^[0-9]\d*$/)){
                            swal('預設影片數量請填入0以上的整數');
                            return false;
                        }
                        if($('#makeupstd').val() == '' || !$('#makeupstd').val().match(/^[0-9]\d*$/) || parseInt($('#makeupstd').val()) > 100){
                            swal('補強基準請填入0~100的整數');
                            return false;
                        }

                        //$('.cancel-btn').hide();
                        //$('.next-btn').hide();
                        // $('.prev-btn').show();
                        //$('.finish-btn').show();

                        return true;
                    } else {
                        swal('請修正欄位資料錯誤!');
                        return false;
                    }
                }

                else {

                    return true;
                }


            },
            onStepChanged: function(event, currentIndex, priorIndex) {

                if (currentIndex == 0){

                }

                if (currentIndex == 1){
                    // setup2
                    $('.prev-btn').show();
                    $('.next-btn').show();

                    $('.finish-btn').hide();

                    bs.initSelectElement('#select-grade', '/admin/quizpaper/get-grade-code', '選擇年級', '-1', '');
                    bs.initSelectElement('#select-schoolclass', '/admin/quizpaper/get-schoolclass', '選擇班級', '-1', '');

					if (bs.getUrlVar('copy')) {
						$('#select-schoolclass').val(bs.getUrlVar('copy')).trigger('change');
					}

                    newObj.tblist = $('#tbList').DataTable({
                        'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
                        'sPaginationType': 'full_numbers',
                        'aLengthMenu': [[100], ['100']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
                        'bLengthChange': false,  //將顯示一頁多少條紀錄的選項關閉
                        'paging': true, //分頁開關
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
                        'bSort': true,
                        'order': [[1, 'desc']], //指定默認的次序
                        'bInfo': true,
                        'destroy':true,//上一步下一步時把tblist吹毀並重整
                        //'sScrollX': '100%', //橫向滾動條
                        //'sScrollY': '60%',
                        //'sScrollX': '2000px',
                        'processing': true,//等待加載效果
                        //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
                        'deferRender': true,
                        //==========請求數據start
                        'serverSide': true,
                        'ajax': {
                            'type': 'post',
                            'url': '/admin/student/get-school-student-list',
                            'data':function(data){
                                data.school_id=$('#school_id').val();
                                data.grade_code=$('#select-grade').val();
                                data.schoolclass_id=$('#select-schoolclass').val();
                                data.name=$('#txt-search').val();
                            }
                        },
                        'initComplete': function () {


                            $('#tbList tbody').on('click', 'tr', function(e){
                                // 點到href、checkbox、' dt-checkboxes-cell'不進行任何動作
                                if (e.target.tagName == 'A' || e.target.tagName == 'INPUT' || e.target.className==' dt-checkboxes-cell') {
                                    return;
                                }
                                // 連結
                                //var data = newObj.tblist.row(this).data();
                                //location.href = 'view_data?id=' + data[0];
                            });

                            $('#select-school').on('change',function(e){
                                e.preventDefault();
                                newObj.tblist.draw();
                            });

                            $('#select-grade').on('change',function(e){
                                e.preventDefault();
                                // getSubjectCode();

                                newObj.tblist.draw();
                            });

                            $('#select-schoolclass').on('change',function(e){
                                e.preventDefault();
                                newObj.tblist.draw();
                            });

                            $('#check-nocourse').on('change',function(e){
                                e.preventDefault();
                                newObj.tblist.draw();
                            });

                            $('#check-close').on('change',function(e){
                                e.preventDefault();
                                newObj.tblist.draw();
                            });

                            $('#txt-search').on('keypress',function(e){
                                if (e.which==13) {
                                    newObj.tblist.draw();
                                }
                            });

                            $('#btn-search').on('click',function(e){
                                e.preventDefault();
                                newObj.tblist.draw();
                            });


                        },
                        'drawCallback':function(){
                            var i = 0;
                            newObj.tblist.rows().every(function(){
                                var item=this.data();
                                // var tags = item[4];
                                // var newTags = '';
                                // if (tags) {
                                //     var tagAry = tags.split(';');
                                //     $.each(tagAry, function(key, item) {
                                //         newTags += '<span class="badge badge-pill badge-success">' + item + '</span>&nbsp;';
                                //     });
                                // }
                                // item[4]=newTags;

                                //var mystring = item[5];
                                //var newchar = '<br>'
                                //item[5] = mystring.split('|').join(newchar);

                                if (newObj.user_id_ary) {

                                    if (newObj.user_id_ary.toString().indexOf(item[0]) > -1) {
                                        newObj.tblist.row().cell(':eq(' + i + ')', null, {
                                            page: 'current'
                                        }).checkboxes.select();
                                    }
                                    i += 7;
                                }

                                //invalidate the data DataTables has cached for this row
                                this.invalidate();
                            });
                        },
                        fixedColumns: true,
                        'columnDefs': [
                            {
                                'targets': 0,
                                'width': 1,
                            }, {
                                'targets': 0,
                                'checkboxes': {'selectRow': true}
                            }, {
                                'targets': [0,3,4,5,6], // column or columns numbers
                                'orderable': false,  // set orderable for selected columns
                            }
                        ],
                        'select': {
                            'style': 'multi'
                        },
                    });
                }

                if(currentIndex==2){
                //step3
                    //$('.prev-btn').hide();
                    $('#serialno_input').hide();
                    $('.next-btn').hide();
                    $('.schoolclass-detail-btn').show();
                    $('.finish-btn').hide();
                    $("a#instructions").show();

                    //multiTbSet();
                }

                var serialno_input_html =
                    '<div class="form-row strictRow">' +
                        '<label class="col-sm-2 text-right">輸入序號：</label>' +
                            '<div class="col-sm-10">' +
                                '<input type="text" id="serialno_keyin" name="serialno_keyin" class="form-control" autocomplete="off">' +
                            '</div>' +
                    '</div>';

                 $('#serialno_input').html(serialno_input_html);
                 $('#serialno_input').hide();


            },
            onFinishing: function(event, currentIndex) {

                //alert('onFinishing');
                // if ($('#select-grade2').val() === '-1') {
                //     swal('請選擇年級');
                //     return false;
                // }
                //
                // if ($('#select-category2').val() === '-1') {
                //     swal('請選擇考試類別');
                //     return false;
                // }
                //
                // if (!$('#txt-name').val()) {
                //     swal('請輸入考卷名稱');
                //     return false;
                // }

                return true;
            },
            onFinished: function(event, currentIndex) {

            }
        });

        // 開課時間、結束時間因為放在Step裡面，所以要在Step之後才設定
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

        // setup1
        bs.initSelectElement('#school_id', '/admin/quizpaper/get-school', '', '', '');
        // bs.initSelectElement('#grade_code', '/admin/quizpaper/get-adminteacher-grade-code', '', '', '');
        getAdminTeacherGradecode();
        bs.initSelectElement('#subject_code', '/admin/quizpaper/get-subject-code', '', '', '');
        bs.initTagElement('#school_tag_id', '/admin/school/get-school-tag');


        //升級要調整的年度
        bs.initSelectElement('#text_year', '/admin/school/get-text-year', '', '', '110');
        //if (check_location=='ailead365.localhost.com'||check_location=='accuagile.ailead365.com') {}else{}

//新增班級一併新增老師設定

        $('#school_id').on('change', function(e) {
            e.preventDefault();
            var school_id=$('#school_id').val();
            bs.initTagElement('#manager_id', '/admin/school/get-schoolclass-manager', 'school_id='+school_id);
            bs.initTagElement('#sub_manager_id', '/admin/school/get-schoolclass-sub-manager', 'school_id='+school_id);


        });

        var set_nubmer=0;
        if (set_nubmer==0){
            $("#school_id").trigger("change");
            set_nubmer=1;
        }


        getSubjectCode();

        initRole();

        getCopyClass();

        return newObj;
    }

    function SchoolclassCreate(){

        schoolclassObj.stu_ary = newObj.stu_ary;



        $.ajax({
            url: '/admin/schoolclass/schoolclass-create',
            data: JSON.stringify({'data': schoolclassObj}),
            type: 'POST',
            contentType: 'application/json',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                 bs.disableSubmits(false);
                if ((res.stateinfo != '') && (res.stateinfo !== undefined)) {
                    alert(res.stateinfo);
                }
                if ((res.reurl != '') && (res.reurl !== undefined)) {
                    location.replace(res.reurl);
                }

            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }


    function getCopyClass(){

        if (!bs.getUrlVar('copy')) {
            return false;
        }

        $.ajax({
            url: '/admin/schoolclass/copy-class?copy='+bs.getUrlVar('copy'),
            type: 'GET',
            success: function(res) {

                $('#school_id').val(res.school_id).trigger('change');
                $('#grade_code').val(res.grade_code).trigger('change');

				initRole();
				getSubjectCode(res.subject_code);


                var school_tags = [];
                $.each(res.school_tags, function(key, item) {
                    school_tags.push(parseInt(item.id));
                });
                $('#school_tag_id').val(school_tags).trigger('change');
                //新增班級一併新增老師設定
                var manager_ids=[];
                $.each(res.manager_ids,function(key,item){
                    manager_ids.push(parseInt(item));
                });
                $('#manager_id').val(manager_ids).trigger('change');

                var sub_manager_ids=[];
                $.each(res.sub_manager_ids,function(key,item){
                    sub_manager_ids.push(parseInt(item));
                });
                $('#sub_manager_id').val(sub_manager_ids).trigger('change');
                $('#start_at').val(res.start_at);

                $('input:radio[name="autocomplete"][value="'+res.autocomplete+'"]').prop('checked',true);

                if (res.autocomplete!=0) {
                    $('#end_at').val(res.end_at);
                }

                $('#text_year').val(res.text_year).trigger('change');

                var role=res.role;


				switch (bs.getNormalGrade(res.grade_code)) {
					case 'E0':
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
						$('#grade_code option[value="EP"]').remove();
						$('#grade_code option[value^="J"]').remove();
						$('#grade_code option[value^="H"]').remove();
						break;
					case 'EP':
						if (res.subject_code=='E21'){

						    $('#EPA').prop('checked', (role.EPA == 1 ? true : false));
                            $('#EPB').prop('checked', (role.EPB == 1 ? true : false));

                        }else{
                            $('#EP').prop('checked', (role.EP == 1 ? true : false));

                        }
						$('#grade_code option[value!="EP"]').remove();
						break;
					case 'J0':
						$('#J1A').prop('checked', (role.J1A == 1 ? true : false));
	                	$('#J1B').prop('checked', (role.J1B == 1 ? true : false));
	                	$('#J2A').prop('checked', (role.J2A == 1 ? true : false));
	                	$('#J2B').prop('checked', (role.J2B == 1 ? true : false));
	                	$('#J3A').prop('checked', (role.J3A == 1 ? true : false));
	                	$('#J3B').prop('checked', (role.J3B == 1 ? true : false));
	                	$('#J0').prop('checked', (role.J0 == 1 ? true : false));
						$('#grade_code option[value^="E"]').remove();
						$('#grade_code option[value^="H"]').remove();
						break;
					case 'H0':
						$('#H1A').prop('checked', (role.H1A == 1 ? true : false));
						$('#H1B').prop('checked', (role.H1B == 1 ? true : false));
						$('#H2A').prop('checked', (role.H2A == 1 ? true : false));
						$('#H2B').prop('checked', (role.H2B == 1 ? true : false));
						$('#H3A').prop('checked', (role.H3A == 1 ? true : false));
						$('#H3B').prop('checked', (role.H3B == 1 ? true : false));
						$('#H0').prop('checked', (role.H0 == 1 ? true : false));
						$('#grade_code option[value^="E"]').remove();
						$('#grade_code option[value^="J"]').remove();
						break;
				}

                var video_role=res.video_role;

                switch (bs.getNormalGrade(res.grade_code)) {
                    case 'E0':
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
                        $('#grade_code option[value="EP"]').remove();
                        $('#grade_code option[value^="J"]').remove();
                        $('#grade_code option[value^="H"]').remove();
                        break;
                    case 'EP':
                        if (res.subject_code=='E21') {
                            $('#video_EPA').prop('checked', (video_role.EPA == 1 ? true : false));
                            $('#video_EPB').prop('checked', (video_role.EPB == 1 ? true : false));


                        }else{
                            $('#video_EP').prop('checked', (video_role.EP == 1 ? true : false));
                        }

                        $('#grade_code option[value!="EP"]').remove();
                        break;
                    case 'J0':
                        $('#video_J1A').prop('checked', (video_role.J1A == 1 ? true : false));
                        $('#video_J1B').prop('checked', (video_role.J1B == 1 ? true : false));
                        $('#video_J2A').prop('checked', (video_role.J2A == 1 ? true : false));
                        $('#video_J2B').prop('checked', (video_role.J2B == 1 ? true : false));
                        $('#video_J3A').prop('checked', (video_role.J3A == 1 ? true : false));
                        $('#video_J3B').prop('checked', (video_role.J3B == 1 ? true : false));
                        $('#video_J0').prop('checked', (video_role.J0 == 1 ? true : false));
                        $('#grade_code option[value^="E"]').remove();
                        $('#grade_code option[value^="H"]').remove();
                        break;
                    case 'H0':
                        $('#video_H1A').prop('checked', (video_role.H1A == 1 ? true : false));
                        $('#video_H1B').prop('checked', (video_role.H1B == 1 ? true : false));
                        $('#video_H2A').prop('checked', (video_role.H2A == 1 ? true : false));
                        $('#video_H2B').prop('checked', (video_role.H2B == 1 ? true : false));
                        $('#video_H3A').prop('checked', (video_role.H3A == 1 ? true : false));
                        $('#video_H3B').prop('checked', (video_role.H3B == 1 ? true : false));
                        $('#video_H0').prop('checked', (video_role.H0 == 1 ? true : false));
                        $('#grade_code option[value^="E"]').remove();
                        $('#grade_code option[value^="J"]').remove();
                        break;
                }


                $('#is_exam').prop('checked',res.is_exam==1);
                $('#is_schoolvideo').prop('checked',res.is_schoolvideo==1);
                $('#is_makeupvideo').prop('checked',res.is_makeupvideo==1);

                //初始化顯示的部分
                if ($('input#is_exam').prop('checked')){
                    if (($('#grade_code').val() == 'E1') || ($('#grade_code').val() == 'E2') || ($('#grade_code').val() == 'E3') || ($('#grade_code').val() == 'E4') || ($('#grade_code').val() == 'E5') || ($('#grade_code').val() == 'E6')) {
                        $('[name=div_E0]').show();
                    } else if ($('#grade_code').val() == 'EP') {
                        //處理英檢初級顯示
                        console.log($('#subject_code').val());
                        if (res.subject_code=='E21'){
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
                        if (res.subject_code=='E21'){
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



                $('#makeupvideo_amount').val(res.makeupvideo_amount);
                $('#makeupstd').val(res.makeupstd);
                var get_knowledge_well_std = JSON.parse(res.knowledge_well_std);

                //動態修改ionRangeSlider指標數值
                var knowledge_well_std_instance = $("#knowledge_well").data("ionRangeSlider");
                knowledge_well_std_instance.update({
                    from : get_knowledge_well_std[0],
                    to : get_knowledge_well_std[1]
                });

                newObj.knowledge_well_std = [];
                newObj.knowledge_well_std.push(get_knowledge_well_std[0].toString());
                newObj.knowledge_well_std.push(get_knowledge_well_std[1].toString());
                $('.knowledge_well_low').html(get_knowledge_well_std[0]);
                $('.knowledge_well_high').html(get_knowledge_well_std[1]);

                newObj.user_id_ary=res.user_id_ary;
            },
            error: bs.errorHandler
        });
    }

    function getAdminTeacherGradecode(){
        var dataObj={};
        dataObj.page_mode='schoolclass_create_wizard'
        $.ajax({
            url: '/admin/quizpaper/get-adminteacher-grade-code',
            type: 'post',
            async: false,
            data:dataObj,
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


            },
            error: bs.errorHandler
        });







    };

    function getSubjectCode(copy_subject_code) {
        var dataObj = {};
        dataObj.grade_code=$('#grade_code').val();
        dataObj.append_et=1;
        dataObj.append_P0=1;

        dataObj.page_mode='schoolclass_create';
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            data: dataObj,
            success: function(res) {
                $('#subject_code option').remove();

                $.each(res, function(key, item) {
                    $('#subject_code').append('<option value="' + item.code + '">' + item.name + '</option>');

                });

                $('#subject_code').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

				if (copy_subject_code) {
					$('#subject_code').val(copy_subject_code).trigger('change');
				}
            },
            error: bs.errorHandler
        });
    }
});
