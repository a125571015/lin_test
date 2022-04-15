$(".tab-wizard").steps({
    headerTag: "h6"
    , bodyTag: "section"
    , transitionEffect: "fade"
    , titleTemplate: '<span class="step">#index#</span> #title#'
    , labels: {
        finish: "Submit"
    }
    , onStepChanging: function (event, currentIndex, newIndex) {
        return true;
    }
    , onFinishing: function (event, currentIndex) {
        return true;
    }
    , onFinished: function (event, currentIndex) {

    }
});
