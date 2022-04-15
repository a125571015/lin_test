$(function() {
    'use strict';
    var newObj = {};
    init();

    function init() {
        geteplimitSchoolclass();
        initObj();
    }

    function initObj(){

        newObj.tblist2 = $('#tbList2').DataTable({
            'bJQueryUI': false, //可以控制分頁的樣式好看緊湊，等等
            'sPaginationType': 'full_numbers',
            'aLengthMenu': [[10],['10']], //設置每頁顯示紀錄的下拉菜單[[2, 5, 10, 25, 50], ['2', '5', '10', '25', '50']]
            'bLengthChange': false, //將顯示一頁多少條紀錄的選項關閉
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
            'bSort': false,
            'order': [
                [0, 'desc']
            ], //指定默認的次序
            'bInfo': true,
            'processing': true, //等待加載效果
            //當處理大數據時，延遲渲染數據，有效提高Datatables處理能力
            'deferRender': true,
            'serverSide': true,
            'ajax': {
                'url': '/admin/quizpaper/get-kcard-list',
                'type': 'POST',
                'data': function(data) {
                    data.schoolclass_id = $('#select-schoolclass').val();
                }
            },
            'initComplete': function() {

                $('#select-schoolclass').on('change', function(e) {
                    e.preventDefault();
                    var schoolclass_obj = bs.findObjectByKey(newObj.schoolclass_list, 'id', $('#select-schoolclass').val());
                    if (schoolclass_obj) {
                        newObj.grade_code = schoolclass_obj.grade_code;
                        newObj.subject_code = schoolclass_obj.subject_code;
                    } else {
                        newObj.grade_code = '-1';
                        newObj.subject_code = '-1';
                    }

                    newObj.tblist2.draw();
                });
            },
            'drawCallback': function() {

                newObj.tblist2.rows().every(function() {
                    var item = this.data();
                    item[3] = '<i class="fa fa-search quizPreview" data-id="' + item[0] + '" data-name="'+item[3]+'" style="cursor:pointer"></i>'+item[3];
                    this.invalidate();
                });

                $('.quizPreview').on('click', function(e) {
                    showKnowledgeContent($(this).attr('data-id'),$(this).attr('data-name'));
                });
            },
            'columnDefs': [
            {
                'targets': [0], // column or columns numbers
                'visible': false // set orderable for selected columns
            },
            {
                'targets': [0], // column or columns numbers
                'orderable': false // set orderable for selected columns
            }],
            'select': {
                'style': 'multi'
            },
        });
    }

    function geteplimitSchoolclass() {
        var dataObj = {};
        dataObj.type='exam';
        $.ajax({
            url: '/admin/quizpaper/geteplimit-schoolclass',
            type: 'post',
            data: dataObj,
            success: function(res) {
                newObj.schoolclass_list = res;
                $('#select-schoolclass option').remove();
                $('#select-schoolclass').append('<option value="-1">請選擇班級</option>');
                $.each(res, function(key, item) {
                    if (item.name.indexOf('結') != -1) {
                        return;
                    }
                    $('#select-schoolclass').append('<option value="' + item.id + '">' + item.name + '</option>');
                });
                $('#select-schoolclass').select2({
                    theme: "bootstrap",
                    minimumResultsForSearch: Infinity
                });
            },
            error: bs.errorHandler
        });
    }

    function showKnowledgeContent(kid,kname){

        $.ajax({
          url: '/admin/exam/get-mark-knowledge?kid='+kid,
          type: 'GET',
          success: function (res) {

              var collectHtml=res.check_collect==1?'<i class="fa fa-heart kcard" data-id="'+kid+'"></i>':'<i class="fa fa-heart-o kcard" data-id="'+kid+'"></i>';
              var title=collectHtml+kname;
              var content='<img class="img-fluid" src="'+'/admin/material/images/knowledge/'+ kid +'.png" />';
              content+='<br><br>';
              var mark_knowledges=res.mark_knowledge_ary;
              if (mark_knowledges.length>0) {
                  content+='<h5 style="text-align:left">相關知識解說</h5>';
                  $.each(mark_knowledges,function(mkey,mitem){
                      content+='<button type="button" id="know-'+mitem.id+'" class="btn btn-primary btn-link-knowledge float-left m-l-5 m-b-5">'+mitem.name+'</button>';
                  });
              }

              swal({
                  title: title,
                  text: content,
                  showCloseButton: true,
                  showCancelButton: false,
                  showConfirmButton: false
              }).then(function() {},function (dismiss) {
                  if (dismiss === 'cancel') {
                      return false;
                  }
              });

              $('.kcard').off('click').on('click',function(e){
                e.preventDefault();

                var dom=this;

                swal({
                    title: '移除收藏知識解說',
                    text: '該知識解說將會從您的收藏中移除，請問確認移除嗎？',
                    type: 'warning',
                    showCloseButton: true,
                    showCancelButton: true,
                    cancelButtonText: '<span>No<br>我還要再想想</span>',
                    confirmButtonText: '<span>Yes<br>確認</span>'
                }).then(function() {
                    knowCollect(dom);
                },function (dismiss) {
                    if (dismiss === 'cancel') {
                        return false;
                    }
                });
            });

              $('.btn-link-knowledge').off('click').on('click',function(e){
                  var lid = $(this).attr('id').replace('know-','');
                  var kname = $(this).text();
                  showKnowledgeContent(lid,kname);
              });

          },
          error: bs.errorHandler
        });
    }

    function knowCollect(dom){
        var dataObj={};
        dataObj.kid=$(dom).attr('data-id');

        $.ajax({
          url: '/admin/exam/set-know-collect',
          type: 'POST',
          data: dataObj,
          success: function (res) {
              var msg=res.message;
              if (msg!='success') {
                  swal(msg);
                  return false;
              }

              var check_collect=res.check_collect;
              if (check_collect==1) {
                  $(dom).removeClass('fa-heart-o').addClass('fa-heart');
              }
              else {
                  $(dom).removeClass('fa-heart').addClass('fa-heart-o');
              }

              newObj.tblist2.draw();
              swal.close();
          },
          error: bs.errorHandler
        });
    }
});
