$(function() {
    "use strict";
    var newObj = {};
    init();

    function init(){



        $('#button-click').on('click',function(e){
           e.preventDefault();
           var quizpaper_id=$('#input-quizpaper-id').val();
           var treeObj = {};
           var show_id=0;
           if($("#input-show").prop("checked")) {
                show_id=1;
            }else{
                show_id=0;
            }
           treeObj.pid=quizpaper_id;
           treeObj.show_id=show_id;

            $.ajax({
                url: '/admin/quizpaper/get-quiz-full-doc-path-info',
                type: 'post',
                data: treeObj,
                beforeSend: function() {
                    bs.disableSubmits(true);
                },
                success: function(res) {
                    bs.disableSubmits(false);
                    var data = res.data;
                    var message=res.message;
                    if (message=='success') {
                        $('#jstree_div_msg').hide();
                        getJsTree(data);

                    }
                    else {
                        $('#jstree_div_msg').show();

                    }

                },
                complete: function() {
                    bs.disableSubmits(false);
                },
                error: bs.errorHandler
            });




        });
    }
    function getJsTree(jsonData) {
        $('#jstree_div').jstree({
            'core': {
                'data': jsonData
            },
            'types': {
                "default": {
                    "icon": "ion-android-book"
                },
                "file": {
                    "icon": false
                }
            },
            'checkbox': {
                'keep_selected_style': true
            },
            'plugins': ['wholerow', 'checkbox', 'types']
        });


        // 暫時影藏url功能
        // $('#jstree_div').bind("select_node.jstree", function (e, data) {
        //     var href = data.node.a_attr.href;
        //     window.location.href = href;
        // });
        $('#jstree_div').jstree(true).settings.core.data = jsonData;
        $('#jstree_div').jstree(true).refresh();
    }

});