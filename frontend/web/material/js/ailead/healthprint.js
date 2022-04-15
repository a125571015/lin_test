$(function() {
    "use strict";
    var newObj = {};
    init();

    function init(){
    var doc = new jsPDF();
    var elementHandler = {
    '#ignorePDF': function (element, renderer) {
    return true;
    }
    };
    var source = window.document.getElementsByTagName("body")[0];
    doc.fromHTML(source,15,15);
    // doc.text(20, 20, 'Welcome to hangge.com');
    doc.save('Test.pdf');
    }
});
