$(function() {
    "use strict";
    var newObj = {};
    init();

    function init(){
        initObj();

        if (location.pathname.indexOf('print')!=-1) {
            $('#gradeEP').remove();
        }
        else {
            $('#print-explain').remove();
        }

        $("#fastChoose").on("click", function(e) {
          e.preventDefault();

          $('.selSubject').each(function(key,val){
            $(val).attr('href','fastcreate?subject='+$(val).attr('id')+$('#param-str').val());
          });

          $('#choose-wizard').steps("next");

        });

        $("#levelChoose").on("click", function(e) {
          e.preventDefault();

          $('.selSubject').each(function(key,val){
            $(val).attr('href','levelcreate?subject='+$(val).attr('id')+$('#param-str').val());
          });

          $('#choose-wizard').steps("next");

        });

        $("#manualChoose").on("click", function(e) {
          e.preventDefault();

          checkPrePaper();

          $('.selSubject').each(function(key,val){
            $(val).attr('href','manualcreate?subject='+$(val).attr('id')+$('#param-str').val());
          });

          $('#choose-wizard').steps("next");
        });

        $("#resourceChoose").on("click", function(e) {
          e.preventDefault();
          location.href='/admin/quizpaper/rescreate';
        });

        $('#gradeE0,#gradeEP,#gradeJ0,#gradeH0').on('click',function () {
          $(this).toggleClass('active');
          $(this).siblings().removeClass('active');
        });

        $('#gradeE0').on('click',function(e){
          e.preventDefault();
          $('.divSubject').hide();
          $('#divE0Subject').show();
        });

        $('#gradeEP').on('click',function(e){
          e.preventDefault();
          $('.divSubject').hide();
          $('#divEPSubject').show();
          // $('#divEPMoreSubject').show();

        });
        //升私中更動
        // $('#divEPSubject').on('click',function(e){
        //     e.preventDefault();
        //     $('.divSubject').hide();
        //     $('#divEPSubject').show();
        //     // $('#divEPMoreSubject').show();
        //
        // });


        $('a#gradeEP_faker1,a#gradeEP_faker2,a#gradeEP_faker3,a#gradeEP_faker4,a#gradeEP_faker5').on('click',function () {
            $(this).toggleClass('active');
            $(this).siblings().removeClass('active');
        });

        $('a#gradeEP_faker1').on('click',function(e){
            e.preventDefault();

            $('.divSubject').hide();
            $('#divEPSubject').show();
            $('#divEPMoreSubject').show();
            // alert( "success1" );
        });

        $('a#gradeEP_faker2').on('click',function(e){
            e.preventDefault();
            // alert( "success2" );
            $('.divSubject').hide();
            $('#divEPSubject').show();
            $('#divEPMore2Subject').show();

        });

        $('a#gradeEP_faker3').on('click',function(e){
            e.preventDefault();
            // alert( "success3" );
            $('.divSubject').hide();
            $('#divEPSubject').show();
            $('#divEPMore3Subject').show();

        });

        $('a#gradeEP_faker4').on('click',function(e){
            e.preventDefault();
            // alert( "success4" );
            $('.divSubject').hide();
            $('#divEPSubject').show();
            $('#divEPMore4Subject').show();

        });

        $('a#gradeEP_faker5').on('click',function(e){
            e.preventDefault();
            // alert( "success4" );
            $('.divSubject').hide();
            $('#divEPSubject').show();
            $('#divEPMore5Subject').show();

        });

        //


        $('#gradeJ0').on('click',function(e){
          e.preventDefault();
          $('.divSubject').hide();
          $('#divJ0Subject').show();
        });

        $('#gradeH0').on('click',function(e){
          e.preventDefault();
          $('.divSubject').hide();
          $('#divH0Subject').show();
        });

    }

    function initObj() {

        $("#choose-wizard").steps({
          headerTag: "h6",
          bodyTag: "section",
          transitionEffect: "fade",
          titleTemplate: '<span class="step">#index#</span> #title#',
          enablePagination:false,
          onStepChanging: function (event, currentIndex, newIndex) {
            return true;
          },
          onStepChanged: function (event, currentIndex, priorIndex) {

          },
          onFinishing: function (event, currentIndex) {
            return true;
          },
          onFinished: function (event, currentIndex) {

          }
        });
    }

    function checkPrePaper() {
        $.ajax({
            url: '/admin/quizpaper/check-pre-paper',
            type: 'POST',
            success: function(res) {
                var message = res.message;
                var subject= res.subject;
                var pre=res.pre;
                var type_str=(res.type)?'&type='+res.type:'';
                if (message == 'success') {
                    $('#check-modal').modal('toggle');
                    $('#btn-retest').on('click', function(e) {
                        location.href = 'manualcreate?subject='+ subject+ '&pre=' + pre + $('#param-str').val()+type_str;
                    });
                }
            },
            error: bs.errorHandler
        });
    }
});
