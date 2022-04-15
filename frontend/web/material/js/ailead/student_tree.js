$(function () {
    'use strict';

    function getTree() {
        var tree = [
            {
                text: '基本資料',
                icon: 'fa fa-file-archive-o',
                href: '/admin/student/viewdata',
                state: {
                    selected:true
                },
                tags: ['0']
            },
            {
                text: '報退班紀錄',
                icon: 'fa fa-list-alt',
                href: '/admin/student/classrecord',
                tags: ['0']
            },
            {
                text: '測驗紀錄',
                icon: 'fa fa-server',
                href: '/admin/student/examlist',
                tags: ['0']
            },
            {
                text: '點播紀錄',
                icon: 'fa fa-file-text-o',
                href: '/admin/student/videorecord',
                tags: ['0']
            },
            {
                text: '目前任務',
                icon: 'fa fa-file-word-o',
                href: 'admin/banwu/tasklist',
                tags: ['0']
            },
            {
                text: '目前班級',
                icon: 'fa fa-file-movie-o',
                href: 'http://www.tesco.com',
                tags: ['0'],
                // nodes: [
                //     {
                //         text: '國中國文',
                //         tags: ['3'],
                //         nodes: [
                //             {
                //                 text: '班級中心',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '自我評量',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '學力分析',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '測驗紀錄',
                //                 href: 'http://www.tesco.com',
                //             }
                //         ]
                //     },
                //     {
                //         text: '國中英文',
                //         tags: ['3'],
                //         nodes: [
                //             {
                //                 text: '班級中心',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '自我評量',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '學力分析',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '測驗紀錄',
                //                 href: 'http://www.tesco.com',
                //             }
                //         ]
                //     },
                //     {
                //         text: '國中數學',
                //         tags: ['3'],
                //         nodes: [
                //             {
                //                 text: '班級中心',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '自我評量',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '學力分析',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '測驗紀錄',
                //                 href: 'http://www.tesco.com',
                //             }
                //         ]
                //     },
                //     {
                //         text: '國中自然',
                //         tags: ['3'],
                //         nodes: [
                //             {
                //                 text: '班級中心',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '自我評量',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '學力分析',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '測驗紀錄',
                //                 href: 'http://www.tesco.com',
                //             }
                //         ]
                //     },
                //     {
                //         text: '國中社會',
                //         tags: ['3'],
                //         nodes: [
                //             {
                //                 text: '班級中心',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '自我評量',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '學力分析',
                //                 href: 'http://www.tesco.com',
                //             },
                //             {
                //                 text: '測驗紀錄',
                //                 href: 'http://www.tesco.com',
                //             }
                //         ]
                //     },
                // ]
            },
            {
                text: '已結業班級',
                icon: 'fa fa-file-text',
                href: 'http://www.tesco.com',
                tags: ['0']
            }
        ];
        return tree;
    }

    $('#treeview1').treeview({
        color: '#008cff',
        expandIcon: 'fa fa-chevron-right',
        collapseIcon: 'fa fa-chevron-down',
        nodeIcon: 'fa fa-bookmark',
        //enableLinks: true,
        data: getTree()
    }).on('nodeSelected', function(e, node){
        alert(node.text);
        //alert(node.href);
        alert(node.href);
        location.href =  node.href;
    });

});