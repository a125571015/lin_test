$(function() {
    "use strict";
    var newObj = {};
    init();

    function init(){
        checkType();
        getStuinfo();
        getDifficult();
        $('#divtext').hide();
        $('#tbQuizSel').empty().html(getQtypeListHtml());

        $('.sel_quiz_low').on('blur',function(e){

            if (isNaN(parseInt($(this).val()))) {
                $(this).val(0);
                return false;
            }

            if (parseInt($(this).val())<=0) {
                $(this).val(0);
            }

            if (parseInt($(this).val(), 10)!==$(this).val()) {
                $(this).val(parseInt($(this).val()));
            }

            if (parseInt($(this).parent().prev().text()) < parseInt($(this).val())) {
                swal('欲選題數不可大於可選題數');
                $(this).val(0);
                return false;
            }

        });

        $('.sel_quiz_middle').on('blur',function(e){

            if (isNaN(parseInt($(this).val()))) {
                $(this).val(0);
                return false;
            }

            if (parseInt($(this).val())<=0) {
                $(this).val(0);
            }

            if (parseInt($(this).val(), 10)!==$(this).val()) {
                $(this).val(parseInt($(this).val()));
            }

            if (parseInt($(this).parent().prev().text()) < parseInt($(this).val())) {
                swal('欲選題數不可大於可選題數');
                $(this).val(0);
                return false;
            }

        });

        $('.sel_quiz_high').on('blur',function(e){

            if (isNaN(parseInt($(this).val()))) {
                $(this).val(0);
                return false;
            }

            if (parseInt($(this).val())<=0) {
                $(this).val(0);
            }

            if (parseInt($(this).val(), 10)!==$(this).val()) {
                $(this).val(parseInt($(this).val()));
            }

            if (parseInt($(this).parent().prev().text())< parseInt($(this).val())) {
                swal('欲選題數不可大於可選題數');
                $(this).val(0);
                return false;
            }

        });

        $('.next-btn').on('click',function(e){
            e.preventDefault();
            bs.disableSubmits(true);
            setTimeout(function () {
                bs.disableSubmits(false);

                var radioYear = $('input:radio:checked[name="radioYear"]');
                var radioGrade = $('input:radio:checked[name="radioGrade"]');
                var radioSubject = $('input:radio:checked[name="radioSubject"]');
                var radioFactory = $('input:radio:checked[name="radioFactory"]');

                //題數改成各自設定
                // var quizcount=$('#txt-quizcount').val();
                var quizcount_low = $('#sel_quiz_low').val();
                var quizcount_middle = $('#sel_quiz_middle').val();
                var quizcount_high = $('#sel_quiz_high').val();

                var examtimes=$('#txt-examtimes').val();
                var papername=$('#input-paper-name').val();

                if (papername==''){
                    swal('請輸入考卷名稱');
                    return false;
                }

                if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                    if (!radioYear.val()) {
                        swal('請選擇學期');
                        return false;
                    }
                }

                if (!radioGrade.val()) {
                    swal('請選擇年級');
                    return false;
                }

                if (!radioSubject.val()) {
                    swal('請選擇科目');
                    return false;
                }

                if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                    if (!radioFactory.val()) {
                        swal('請選擇版本');
                        return false;
                    }
                }

                // if (!quizcount) {
                //     swal('請輸入題目數量');
                //     return false;
                // }

                if(!quizcount_low || !quizcount_middle || !quizcount_high){
                    swal('請輸入題目數量');
                    return false;
                }

                if (!examtimes) {
                    swal('請輸入作答時間');
                    return false;
                }

                if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                    if (newObj.textbookindex_ary.length==0) {
                        swal('請至少選擇一個課次');
                        return false;
                    }
                }

                if (parseInt($('#quiz_low').text())< parseInt($('#sel_quiz_low').val())
                    || parseInt($('#quiz_middle').text())< parseInt($('#sel_quiz_middle').val())
                    || parseInt($('#quiz_high').text())< parseInt($('#sel_quiz_high').val()))
                {
                    swal('欲選題數不可大於可選題數<br/>請進入「更多設定」調整欲選題目<br/>或選擇更多「課次/章節」');
                    return false;
                }

                $('#span-grade').text($('input:radio:checked[name="radioGrade"]').next().text());
                $('#span-subject').text($('input:radio:checked[name="radioSubject"]').next().text());
                $('#span-factory').text($('input:radio:checked[name="radioFactory"]').next().text());

                //題數改成各自設定
                $('#span-quizcount-low').text(quizcount_low);
                $('#span-quizcount-middle').text(quizcount_middle);
                $('#span-quizcount-high').text(quizcount_high);
                $('#span-quizcount').text(parseInt(quizcount_low) + parseInt(quizcount_middle) + parseInt(quizcount_high));
                $('#span-examtimes').text(examtimes);

                $('.bs-before-modal').modal('show');
            }, 3000);

        });

        $('.btnStart').on('click',function(e){
            e.preventDefault();
            createQuizPractice();
        });

        $('.btnPreset').on('click',function(e){
            e.preventDefault();
            createQuizPractice('presave');
        });

        $('#btn-create-paper').on('click',function(e){
           e.preventDefault();


            var radioYear = $('input:radio:checked[name="radioYear"]');
            var radioGrade = $('input:radio:checked[name="radioGrade"]');
            var radioSubject = $('input:radio:checked[name="radioSubject"]');
            var radioFactory = $('input:radio:checked[name="radioFactory"]');

            //題數改成各自設定
            // var quizcount=$('#txt-quizcount').val();
            var quizcount_low = $('#sel_quiz_low').val();
            var quizcount_middle = $('#sel_quiz_middle').val();
            var quizcount_high = $('#sel_quiz_high').val();

            var examtimes=$('#txt-examtimes').val();
            var papername=$('#input-paper-name').val();

            if (papername==''){
                swal('請輸入考卷名稱');
                return false;
            }

            if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                if (!radioYear.val()) {
                    swal('請選擇學期');
                    return false;
                }
            }

            if (!radioGrade.val()) {
                swal('請選擇年級');
                return false;
            }

            if (!radioSubject.val()) {
                swal('請選擇科目');
                return false;
            }

            if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                if (!radioFactory.val()) {
                    swal('請選擇版本');
                    return false;
                }
            }

            // if (!quizcount) {
            //     swal('請輸入題目數量');
            //     return false;
            // }

            if(!quizcount_low || !quizcount_middle || !quizcount_high){
                swal('請輸入題目數量');
                return false;
            }

            if (!examtimes) {
                swal('請輸入作答時間');
                return false;
            }

            if (radioSubject.val()!='C0' && radioSubject.val()!='E0') {
                if (newObj.textbookindex_ary.length==0) {
                    swal('請至少選擇一個課次');
                    return false;
                }
            }

            if (parseInt($('#quiz_low').text())< parseInt($('#sel_quiz_low').val())
                || parseInt($('#quiz_middle').text())< parseInt($('#sel_quiz_middle').val())
                || parseInt($('#quiz_high').text())< parseInt($('#sel_quiz_high').val()))
            {
                swal('欲選題數不可大於可選題數<br/>請進入「更多設定」調整欲選題目<br/>或選擇更多「課次/章節」');
                return false;
            }






            createQuizPractice();

        });

        $('#SettingHealthpaper').on('click',function(e){
            e.preventDefault();
            $('.chooese').hide();
            $('.setting-paper').show();

        });

        $('#Usehealthpaper').on('click',function(e){
            e.preventDefault();
            $('.chooese').hide();
            $('.choose-health-paper').show();
            getHealthPaperList();
            getGradeCode();
            getSubjectCode();
            getAuthor();


        });

        $('#btn-create-exam').on('click',function(e){
            e.preventDefault();

            var rows_selected = newObj.tblist.column(0).checkboxes.selected();
            if (rows_selected.length==0) {
                swal('請選擇您要考試的考卷');
                return false;
            }else if (rows_selected.length>1){
                swal('ㄧ次只能考一張試卷');
                return false;
            }
            var dataObj = {};
            var pid=[];
            $.each(rows_selected, function(key, item){
                pid=item;
            });
            dataObj.pid = pid;
            dataObj.uid=bs.getUrlVar('id');
            var cid=0;

            location.href = '/admin/knowhow/explain?cid='+cid+'&pid='+ pid+'&uid='+dataObj.uid;

            console.log(pid);
            console.log(dataObj.uid);


            //bs.disableSubmits(true);
            //bs.disableSubmits(false);

        });

        $('.prev-btn').on('click',function(e){
            e.preventDefault();
            $('.chooese').show();
            $('.choose-health-paper').hide();
            $('.setting-paper').hide();

        });


    }

    function checkType(){
        var type=bs.getUrlVar('type');
        if (type=='create'){
            $('.chooese').hide();
            $('.next-btn').hide();
            $('#btn-create-paper').show();
        } else if (type=='setuserfinish'){
            $('.chooese').show();
            $('.setting-paper').hide();
            $('.next-btn').show();
            $('#btn-create-paper').hide();
        }
    }

    function getStuinfo() {




        $.ajax({
          url: '/admin/knowhow/get-stuinfo?id='+bs.getUrlVar('id'),
          type: 'GET',
          success: function (res) {
              $('#divGrade').empty();
              var inner_html='';
              $.each(res.grade_list, function(key, item) {
                  inner_html+=
                  '<div class="form-check form-check-inline">\
                      <input class="form-check-input" type="radio" name="radioGrade" id="grade'+item.code+'" value="'+item.code+'">\
                      <label class="form-check-label" for="grade'+item.code+'">'+item.subname+'</label>\
                  </div>';
              });
              $('#divGrade').html(inner_html);

              $('#divSubject').empty();
              inner_html='';
              $.each(res.subject_list, function(key, item) {
                  inner_html+=
                  '<div class="form-check form-check-inline">\
                      <input class="form-check-input" type="radio" name="radioSubject" id="subject'+item.code+'" value="'+item.code+'">\
                      <label class="form-check-label" for="subject'+item.code+'">'+item.name+'</label>\
                  </div>';
              });
              $('#divSubject').html(inner_html);

              $('input:radio[name="radioGrade"][value="'+res.stu_grade_code+'"]').prop('checked',true);
              newObj.stu_grade_level=res.stu_grade_level;

              if (res.stu_grade_level=='E0') {
				  $('#radioY1').parent().remove();
				  $('#radioY4').prop('checked',true);
              }

			  if (res.stu_grade_level=='J0') {
				  $('#radioY4').prop('checked',true);
				  // $('#radioY3').parent().remove();
              }

              if (res.stu_grade_level=='H0') {
				  $('#radioY3').parent().remove();
                  $('#divYear').append(
                      '<div class="form-check form-check-inline">\
                    <input class="form-check-input" type="radio" name="radioYear" id="radioY0" value="107-0">\
                    <label class="form-check-label" for="chkY0">107全</label>\
                  </div>');
              }

              $('#divFactory').empty();
              inner_html='';
              $.each(res.factory_list, function(key, item) {
                  inner_html+=
                  '<div class="form-check form-check-inline">\
                    <input class="form-check-input" type="radio" name="radioFactory" id="radioF'+item.code+'" value="'+item.code+'">\
                    <label class="form-check-label" for="radioF'+item.code+'">'+item.name+'</label>\
                  </div>';
              });
              $('#divFactory').html(inner_html);

              $('input:radio[name="radioYear"]').on('change', function(e) {
                  checkChange();
              });

              $('input:radio[name="radioGrade"]').on('change', function(e) {
                  if ($('input:radio[name="radioSubject"]').val()=='C0' || $('input:radio[name="radioSubject"]').val()=='E0') {
                      getQuizTimes();
                  }


                  checkChange();
              });
              //知識健檢介面警與追加＿工程調整說明
              $('input:radio[name="radioSubject"]').on('change', function(e) {
                  if ( $('input:radio[name="radioGrade"]').val()=='E5'  ){
                      if ($(this).val()=='C0' || $(this).val()=='E0'){
                          var $browsers = $('input#gradeE5');
                          $('#divtext').show();
                          $browsers.attr("checked",false);
                          $('input#gradeE6').prop('checked', true);
                          $('input#gradeE5').hide();
                          $('label[for="gradeE5"]').hide();

                          //
                          // label[for="gradeE5"]
                          // {
                          //     display:none;
                          // }




                      }
                     else{

                          $('#divtext').hide();
                          $('input#gradeE5').show();
                          $('label[for="gradeE5"]').show();
                          $('input#gradeE6').prop('checked', false);

                      }



                  }

                  if ($(this).val()=='C0' || $(this).val()=='E0') {
                      $('.div-strict').hide();
                      getQuizTimes();
                  }
                  else {
                      $('.div-strict').show();
                  }
                  checkChange();
              });

              $('input:radio[name="radioFactory"]').on('change', function(e) {
                  checkChange();
              });
          },
          error: bs.errorHandler
        });
    }

    function getDifficult() {
        $('#select-difficulty option').remove();
        $('#select-difficulty').append('<option value="0">全選</option>');
        $('#select-difficulty').append('<option value="1">易</option>');
        $('#select-difficulty').append('<option value="3">中</option>');
        $('#select-difficulty').append('<option value="5">難</option>');
        $('#select-difficulty').val('0');
        $('#select-difficulty').select2({
            theme: "bootstrap",
            minimumResultsForSearch: Infinity
        });
    }

    function checkChange() {
        var radioYear = $('input:radio:checked[name="radioYear"]').val();
        var radioGrade = $('input:radio:checked[name="radioGrade"]').val();
        var radioSubject = $('input:radio:checked[name="radioSubject"]').val();
        var radioFactory = $('input:radio:checked[name="radioFactory"]').val();
        if (radioYear && radioGrade && radioSubject && radioFactory) {
            getQuizTimes();
            getRange();
        }
    }

    function getQuizTimes(){
        var dataObj={};
        dataObj.id=bs.getUrlVar('id');
        dataObj.grade_code=$('input:radio:checked[name="radioGrade"]').val();
        dataObj.subject_code=$('input:radio:checked[name="radioSubject"]').val();
        dataObj.textbookindex_ary = newObj.textbookindex_ary;
        dataObj.type=bs.getUrlVar('type');
        $.ajax({
          url: '/admin/knowhow/get-quiz-times',
          type: 'POST',
          data: dataObj,
          beforeSend: function() {
              bs.disableSubmits(true);
          },
          success: function (res) {
              //題數改成各自設定
              // $('#txt-quizcount').val(res.quiz_count);
              $('#quiz_low').text(res.difficulty_amount_low);
              $('#quiz_middle').text(res.difficulty_amount_middle);
              $('#quiz_high').text(res.difficulty_amount_high);

              $('#txt-examtimes').val(res.exam_times);
          },
          complete: function() {
              bs.disableSubmits(false);
          },
          error: bs.errorHandler
        });
    }

    function getRange() {
        var dataObj = {};
        dataObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
        dataObj.subject_code = $('input:radio:checked[name="radioSubject"]').val();
        dataObj.factory_code = $('input:radio:checked[name="radioFactory"]').val();

        var yearTermAry = [];
        $.each($('input:radio:checked[name="radioYear"]'), function(key, item) {
            yearTermAry.push(item.value);
        });
        yearTermAry.sort();
        dataObj.yearTermAry = yearTermAry;

        if (!dataObj.grade_code) {
            return false;
        }

        if (!dataObj.subject_code) {
            return false;
        }

        if (!dataObj.yearTermAry[0]) {
            return false;
        }

        if (!dataObj.factory_code) {
            return false;
        }

        $.ajax({
            url: '/admin/knowhow/getclassinfo',
            type: 'post',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(response) {
                bs.disableSubmits(false);
                var msg=response.message;
                if (msg!='success') {
                    swal(msg);
                    history.back();
                    return false;
                }
                var res = response.data;
                newObj.data = res;
                newObj.textbookindex_ary = [];
                var inner_html = '';

                inner_html +=
                    '<thead class="thead-light">\
                    <tr>\
                    <th><input type="checkbox" name="check-all" value="all"></th>\
                    <th>課次/章節</th>\
                    </tr>\
                    </thead>';

                $.each(res, function(key, item) {
                    inner_html +=
                        '<tr>\
                        <td><input type="checkbox" name="check-one" value="' + item.id + '"></td>\
                        <td>' + item.name + '</td>\
                        </tr>';
                });

                $('#table-healthsetting').empty().html(inner_html);

                $('input[name="check-all"]').on('change', function(e) {
                    e.preventDefault();
                    if ($('input[name="check-all"]').prop('checked')) {
                        $('input[name="check-one"]').prop('checked', true);
                        dataAllSelect();
                    } else {
                        $('input[name="check-one"]').prop('checked', false);
                    }
                    dataAllSelect($('input[name="check-all"]').prop('checked'));
                });

                $('input[name="check-one"]').on('change', function(e) {
                    e.preventDefault();
                    dataSelect(this);
                });
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function dataAllSelect(checked) {
        if (checked) {
            newObj.textbookindex_ary=[];
            $.each($('input[name="check-one"]'), function(key, item) {
                newObj.textbookindex_ary.push($(item).val());
            });
        }
        else {
            newObj.textbookindex_ary=[];
        }

        getQuizTimes();
    }

    function dataSelect(dom) {
        var checked=$(dom).prop('checked');
        if (checked) {
            if (newObj.textbookindex_ary.indexOf($(dom).val())==-1) {
                newObj.textbookindex_ary.push($(dom).val());
            }
        }
        else {
            var index=newObj.textbookindex_ary.indexOf($(dom).val());
            if (index>-1) {
                 newObj.textbookindex_ary.splice(index, 1);
            }
        }

        getQuizTimes();
    }

    function createQuizPractice(mode=0) {

        $('.bs-more-modal').modal('hide');
        $('.bs-before-modal').modal('hide');

        var dataObj = {};
        dataObj.grade_code = $('input:radio:checked[name="radioGrade"]').val();
        dataObj.subject_code = $('input:radio:checked[name="radioSubject"]').val();
        dataObj.textbookindex_ary = newObj.textbookindex_ary;
        //題數改成各自設定
        // dataObj.quiz_count = parseInt($('#txt-quizcount').val());
        let quiz_count_low = parseInt($('#sel_quiz_low').val());
        let quiz_count_middle = parseInt($('#sel_quiz_middle').val());
        let quiz_count_high = parseInt($('#sel_quiz_high').val());
        dataObj.quiz_count = [quiz_count_low, quiz_count_middle, quiz_count_high];
        dataObj.exam_times = parseInt($('#txt-examtimes').val());
        //難度視同全開
        // dataObj.difficulty = parseInt($('#select-difficulty').val());
        dataObj.difficulty = 0;

        var factory_code=$('input:radio:checked[name="radioFactory"]').val();
        factory_code=(factory_code)?factory_code:-1;
        dataObj.factory_code = parseInt(factory_code);
        dataObj.uid=bs.getUrlVar('id');
        //產生考卷不在使用學生的id適用使用者的id;
        dataObj.papername= $('#input-paper-name').val();
        dataObj.presave = (mode == 'presave')? 1 : 0;

        $.ajax({
            url: '/admin/knowhow/create-healthexam-paper',
            type: 'POST',
            data: dataObj,
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                var message = res.message;
                if (message != 'success' && message!='already_test') {
                    swal(message);
                    return false;
                }

                var presave = res.presave;
                if(presave == '1'){
                    location.href = '/admin/knowhow/list';
                    return false;
                }

                var cid=res.cid;
                var pid = res.pid;
                var type=bs.getUrlVar('type');
                if (type=='create'){
                    swal('創立考卷成功,將返回列表頁');
                    setTimeout(function() {
                            location.href = '/admin/knowhow/healthpaper';
                             }, 2500);

                }else{
                    location.href = '/admin/knowhow/explain?cid='+cid+'&pid='+ pid+'&uid='+dataObj.uid;
                }


            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

    function getQtypeListHtml(){
        var inner_html='';
        inner_html+=
            '<tr style="text-align:right">\
                <td id="quiz_low">0</td>\
                <td><input type="text" value="5" difficulty="1" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_low" id="sel_quiz_low"></td>\
                <td id="quiz_middle">0</td>\
                <td><input type="text" value="10" difficulty="3" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_middle" id="sel_quiz_middle"></td>\
                <td id="quiz_high">0</td>\
                <td><input type="text" value="5" difficulty="5" style="width:45px;text-align:right;background-color:antiquewhite" class="sel_quiz_high" id="sel_quiz_high"></td>\
            </tr>';

        return inner_html;
    }


    function getHealthPaperList(){
        newObj.tblist=$('#tbList').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[10], ['10']],  //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
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
            'destroy': true,
            'bFilter': false, //搜尋欄開關
            'bSortClasses': true,
            'bSort': true,
            'order': [[1, 'desc']], //指定默認的次序
            'bInfo': true,
            'processing': true,//等待加載效果
            'deferRender': true, //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'serverSide': true,
            'type':'POST',
            'ajax': {
                'url': '/admin/knowhow/healthpaper-list',
                'type':'POST',
                'data':function(data){
                    data.init_grade_code=newObj.stu_grade_level
                    data.grade_code= $('#select-grade').val();
                    data.subject_code=$('#select-subject').val();
                    data.created_by=$('#select-author').val();
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
                    var data = newObj.tblist.row(this).data();
                    window.open('/admin/knowhow/healthpaperview?id='+ data["id"],'_blank');
                });



                $('#select-grade').on('change',function(e){
                    e.preventDefault();
                    //升私中
                    getSubjectCode($(this).val());
                    newObj.tblist.draw();
                });

                $('#select-subject').on('change',function(e){
                    e.preventDefault();

                    newObj.tblist.draw();
                });

                $('#select-author').on('change',function(e){
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

                //跳至第Ｘ頁程式碼
                var _this = $(this);
                var tableId = _this.attr('id');
                var pageDiv = $('#' + tableId + '_paginate');
                var add_html='';
                add_html='<input id="' + tableId + '_gotoPage" type="text" placeholder="跳至頁面[請輸入頁碼] " style="height:36px;line-height:28px;width:20%; margin:0px 0px 0px 0px"/>' +
                    '<button class="paginate_button btn btn-outline-success "    type="button"  id="' + tableId + '_goto"><i class="fa fa-arrow-right" aria-hidden="true"></i></button><ul class="pagination">';
                pageDiv.append(add_html);
                $('#' + tableId + '_goto').click(function (obj) {
                    var page = $('#' + tableId + '_gotoPage').val();
                    var thisDataTable = $('#' + tableId).DataTable();
                    var pageInfo = thisDataTable.page.info();
                    if (isNaN(page)) {
                        $('#' + tableId + '_gotoPage').val('');
                        return;
                    } else {
                        var maxPage = pageInfo.pages;
                        var page = Number(page) - 1;
                        if (page < 0) {
                            page = 0;
                        } else if (page >= maxPage) {
                            page = maxPage - 1;
                        }
                        $('#' + tableId + '_gotoPage').val(page + 1);
                        thisDataTable.page(page).draw('page');
                    }
                });

                // $('.dt-checkboxes-cell').off('change').on('change',function(e){
                //     e.preventDefault();
                //     if ($(this).find('.dt-checkboxes').prop('checked')) {
                //
                //         if(!findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var grade_obj={};
                //             grade_obj.id=newObj.tblist.row(this).data()[0];
                //             grade_obj.grade_name=newObj.tblist.row(this).data()[2];
                //             newObj.check_grade_ary.push(grade_obj);
                //         }
                //
                //         if(!findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var subject_obj={};
                //             subject_obj.id=newObj.tblist.row(this).data()[0];
                //             subject_obj.subject_name=newObj.tblist.row(this).data()[3];
                //             newObj.check_subject_ary.push(subject_obj);
                //         }
                //
                //         if(!findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0])){
                //             var source_obj={};
                //             source_obj.id=newObj.tblist.row(this).data()[0];
                //             source_obj.source=newObj.tblist.row(this).data()[5];
                //             newObj.check_source_ary.push(source_obj);
                //         }
                //
                //     }
                //     else {
                //         var index = findIndexByKey(newObj.check_grade_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_grade_ary.splice(index, 1);
                //         }
                //
                //         index = findIndexByKey(newObj.check_subject_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_subject_ary.splice(index, 1);
                //         }
                //
                //         index = findIndexByKey(newObj.check_source_ary,'id',newObj.tblist.row(this).data()[0]);
                //         if (index > -1) {
                //             newObj.check_source_ary.splice(index, 1);
                //         }
                //     }
                // });
                //
                // $('.dt-checkboxes-select-all').off('change').on('change',function(e){
                //     e.preventDefault();
                //     if ($('.dt-checkboxes-select-all').find('input:checkbox').prop('checked')) {
                //         $.each(newObj.tblist.rows().data(),function(key,item){
                //
                //             if (!findIndexByKey(newObj.check_grade_ary,'id',item[0])) {
                //                 var grade_obj={};
                //                 grade_obj.id=item[0];
                //                 grade_obj.grade_name=item[2];
                //                 newObj.check_grade_ary.push(grade_obj);
                //             }
                //
                //             if (!findIndexByKey(newObj.check_subject_ary,'id',item[0])) {
                //                 var subject_obj={};
                //                 subject_obj.id=item[0];
                //                 subject_obj.subject_name=item[3];
                //                 newObj.check_subject_ary.push(subject_obj);
                //             }
                //
                //             if (!findIndexByKey(newObj.check_source_ary,'id',item[0])) {
                //                 var source_obj={};
                //                 source_obj.id=item[0];
                //                 source_obj.source=item[5];
                //                 newObj.check_source_ary.push(source_obj);
                //             }
                //
                //         });
                //     }
                //     else {
                //         $.each(newObj.tblist.rows().data(),function(key,item){
                //
                //             var index = findIndexByKey(newObj.check_grade_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_grade_ary.splice(index, 1);
                //             }
                //
                //             var index = findIndexByKey(newObj.check_subject_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_subject_ary.splice(index, 1);
                //             }
                //
                //             index = findIndexByKey(newObj.check_source_ary,'id',item[0]);
                //             if (index > -1) {
                //                 newObj.check_source_ary.splice(index, 1);
                //             }
                //         });
                //     }
                // });

                newObj.tblist.rows().every(function(){

                });
            },
            'columns': [
                {
                    'data': 'id',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '出卷日期',
                    'data': 'created_at',
                    'width':10,
                    'orderalbe':false
                },
                {
                    'title': '年級',
                    'data': 'grade_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '科目',
                    'data': 'subject_name',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '出卷者',
                    'data': 'author',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '考卷名稱',
                    'data': 'papername',
                    'width': 20,
                    'orderable': true
                },
                {
                    'title': '作答數',
                    'data': 'ans_count',
                    'width':10,
                    'orderable': true
                },
                {
                    'title': '使用數',
                    'data': 'use_count',
                    'width': 10,
                    'orderable': false,


                },
                {
                    'title': '公開',
                    'data': 'public_status_name',
                    'width': 10,
                    'orderable': false
                },
                {
                    'title': '作答時間',
                    'data': 'exam_times',
                    'width': 10,
                    'orderable': true
                },


            ],

            'columnDefs': [
                {
                    'targets': 0,
                    'checkboxes': {
                        'selectRow': true
                    }
                }
            ],
            'select': {
                'style': 'multi'
            },
        });
    }


    function getGradeCode() {
        $.ajax({
            url: '/admin/quizpaper/get-grade-code',
            type: 'post',
            success: function(res) {

                $('#select-grade option').remove();
                $('#select-grade').append('<option value="-1">選擇年級</option>');
                $.each(res, function(key, item) {
                    $('#select-grade').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-grade').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

                if (bs.getUrlVar('subject')) {
                    $('#select-grade').append('<option value="E0">國小</option>');
                    $('#select-grade').append('<option value="J0">國中</option>');
                    $('#select-grade').append('<option value="H0">高中</option>');
                    $('#select-grade').val(bs.getUrlVar('subject').split('-')[0]).trigger('change');
                }


            },
            error: bs.errorHandler
        });
    }

    function getSubjectCode(grade_code) {
        var dataObj = {};
        dataObj.grade_code=grade_code;
        console.log($('#select-grade').val());
        $.ajax({
            url: '/admin/quizpaper/get-subject-code',
            type: 'post',
            // data: JSON.stringify(dataObj),
            data: dataObj,
            success: function(res) {
                $('#select-subject option').remove();
                $('#select-subject').append('<option value="-1">選擇科目</option>');
                $.each(res, function(key, item) {
                    $('#select-subject').append('<option value="' + item.code + '">' + item.name + '</option>');
                });
                $('#select-subject').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });

                if (bs.getUrlVar('subject')) {
                    $('#select-subject').val(bs.getUrlVar('subject').split('-')[1]).trigger('change');
                }
            },
            error: bs.errorHandler
        });
    }

    function getAuthor() {
        $.ajax({
            url: '/admin/quizpaper/get-author',
            type: 'post',
            success: function(res) {
                $('#select-author option').remove();
                $('#select-author').append('<option value="-1">選擇出卷者</option>');
                $.each(res, function(key, item) {
                    $('#select-author').append('<option value="' + item.id + '">' + item.first_name + '</option>');
                });
                $('#select-author').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

});
