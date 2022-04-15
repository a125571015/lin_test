$(function() {
	'use strict';
    var newObj = {};
    init();

	function init() {
		getBestStatus();
		getStatus();
		getAskInfo();

		$('#summernote').summernote({
	        height: 350,
	        tooltip: false
	    });

		$('.note-table-popover').hide();

		try {
			$('#summernote').summernote('code', summernoteContent);
		}
		catch (e) {
		}

	    $('#btn-send').on('click',function(e){
	        e.preventDefault();
	        sendAnswer();
	    });
	}

	function getBestStatus(){
		$('#select-is-best').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});
	}

	function getStatus(){
		$('#select-status').select2({
			theme: "bootstrap",
			minimumResultsForSearch: Infinity
		});
	}

	function getAskInfo(){

		$.ajax({
		  url: '/admin/ask/get-ask-info?id=' + bs.getUrlVar('id'),
		  type: 'GET',
		  success: function (res) {
			  var message=res.message;
              var data=res.data;

              if (message!='success') {
                  location.replace('/admin/ask');
                  return false;
              }

			  $('#lbl-id').html(data.id);
			  $('#lbl-grade').html(data.grade_name);
			  $('#lbl-subject').html(data.subject_name);
			  $('#link-qid').text(data.quiz_id);
			  $('#link-qid').attr('href','/admin/quiz/quiz_view_data?qid='+data.quiz_id);
			  $('#lbl-parent-school-name').html(data.parent_school_name);
			  $('#lbl-school-name').html(data.school_name);
			  $('#lbl-username').html(data.username);
			  $('#lbl-first-name').html(data.first_name);
			  $('#lbl-user-type-name').html(data.user_type_name);
			  $('#lbl-created-at').html(data.created_at);
			  $('#div-content').html(data.content);
			  $('#summernote').summernote('code',data.last_ans_content);
			  $('#select-is-best').val(data.is_best).trigger('change');
			  $('#select-status').val(data.status).trigger('change');
		  },
		  error: bs.errorHandler
		});
	}

    function sendAnswer() {

        if ($('#summernote').summernote('isEmpty')){
            swal('老師回覆不得為空白');
            return false;
        }

        var dataObj={};
		dataObj.id=bs.getUrlVar('id');
        dataObj.last_ans_content=$('#summernote').summernote('code');
        dataObj.is_best=$('#select-is-best').val();
        dataObj.status=$('#select-status').val();

        $.ajax({
            url: '/admin/ask/send-answer',
            data: dataObj,
            type: 'POST',
            beforeSend: function() {
                bs.disableSubmits(true);
            },
            success: function(res) {
                bs.disableSubmits(false);
                if (res.message!='success') {
					swal(res.message);
                    return false;
                }

				location.href='/admin/ask';
            },
            complete: function() {
                bs.disableSubmits(false);
            },
            error: bs.errorHandler
        });
    }

});
