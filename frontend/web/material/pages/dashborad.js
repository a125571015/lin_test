/*
 Template Name: Upcube - Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Dashboard js
 */

!function ($) {
    "use strict";

    var Dashboard = function () {
    };

        Dashboard.prototype.init = function () {

            Highcharts.chart('payment-chart', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '繳費'
                },
                xAxis: {
                    categories: ['機構A', '機構B', '機構C', '機構D']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: '退費',
                    data: [3, 3, 1, 4],
                    color: '#fd5050'
                }, {
                    name: '尚未繳費',
                    data: [35, 20, 12, 12],
                    color: '#ffc644'
                }, {
                    name: '新生繳費',
                    data: [23, 5, 2, 8],
                    color: '#7bca99'
                }, {
                    name: '舊生繳費',
                    data: [70, 90, 120, 80],
                    color: '#8ed4fd'
                }]
            });




        },
        //init
        $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.Dashboard.init();
    }(window.jQuery);