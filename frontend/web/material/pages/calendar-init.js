
/*
 Template Name: Upcube - Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
File: Calendar init js
 */

!function($) {
    "use strict";

    var CalendarPage = function() {};

    CalendarPage.prototype.init = function() {

        //checking if plugin is available
        if ($.isFunction($.fn.fullCalendar)) {
            /* initialize the external events */
            $('#external-events .fc-event').each(function() {
                // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
                // it doesn't need to have a start or end
                var eventObject = {
                    title: $.trim($(this).text()) // use the element's text as the event title
                };

                // store the Event Object in the DOM element so we can get to it later
                $(this).data('eventObject', eventObject);

                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true, // will cause the event to go back to its
                    revertDuration: 0 //  original position after the drag
                });

            });
            
            /* initialize the calendar */

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                droppable: true, // this allows things to be dropped onto the calendar !!!
                drop: function(date, allDay) { // this function is called when something is dropped

                    // retrieve the dropped element's stored Event Object
                    var originalEventObject = $(this).data('eventObject');

                    // we need to copy it, so that multiple events don't have a reference to the same object
                    var copiedEventObject = $.extend({}, originalEventObject);

                    // assign it the date that was reported
                    copiedEventObject.start = date;
                    copiedEventObject.allDay = allDay;

                    // render the event on the calendar
                    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }

                },
                events: [
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 1),
                        end: new Date(y, m, 1),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 1),
                        end: new Date(y, m, 1),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 2),
                        end: new Date(y, m, 2),
                        allDay: true
                    },
                    {
                        title: 'C機構：國一數學',
                        start: new Date(y, m, 3),
                        end: new Date(y, m, 3),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 5),
                        end: new Date(y, m, 5),
                        allDay: true
                    },
                    {
                        title: 'B機構：國三數學',
                        start: new Date(y, m, 6),
                        end: new Date(y, m, 6),
                        allDay: true
                    },
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 7),
                        end: new Date(y, m, 7),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 7),
                        end: new Date(y, m, 7),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 8),
                        end: new Date(y, m, 8),
                        allDay: true
                    },
                    {
                        title: 'C機構：國一數學',
                        start: new Date(y, m, 9),
                        end: new Date(y, m, 9),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 10),
                        end: new Date(y, m, 10),
                        allDay: true
                    },
                    {
                        title: 'B機構：國三數學',
                        start: new Date(y, m, 12),
                        end: new Date(y, m, 12),
                        allDay: true
                    },
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 13),
                        end: new Date(y, m, 13),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 13),
                        end: new Date(y, m, 13),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 14),
                        end: new Date(y, m, 14),
                        allDay: true
                    },
                    {
                        title: 'C機構：國一數學',
                        start: new Date(y, m, 15),
                        end: new Date(y, m, 15),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 16),
                        end: new Date(y, m, 16),
                        allDay: true
                    },
                    {
                        title: 'B機構：國三數學',
                        start: new Date(y, m, 17),
                        end: new Date(y, m, 17),
                        allDay: true
                    },
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 19),
                        end: new Date(y, m, 19),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 19),
                        end: new Date(y, m, 19),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 20),
                        end: new Date(y, m, 20),
                        allDay: true
                    },
                    {
                        title: 'C機構：國一數學',
                        start: new Date(y, m, 21),
                        end: new Date(y, m, 21),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 22),
                        end: new Date(y, m, 22),
                        allDay: true
                    },
                    {
                        title: 'B機構：國三數學',
                        start: new Date(y, m, 23),
                        end: new Date(y, m, 23),
                        allDay: true
                    },
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 24),
                        end: new Date(y, m, 24),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 24),
                        end: new Date(y, m, 24),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 26),
                        end: new Date(y, m, 26),
                        allDay: true
                    },
                    {
                        title: 'B機構：國三數學',
                        start: new Date(y, m, 27),
                        end: new Date(y, m, 27),
                        allDay: true
                    },
                    {
                        title: 'A機構：國二英文',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 28),
                        allDay: true
                    },
                    {
                        title: 'D機構：國二英文',
                        start: new Date(y, m, 28),
                        end: new Date(y, m, 28),
                        allDay: true
                    },
                    {
                        title: 'B機構：國二國文',
                        start: new Date(y, m, 29),
                        end: new Date(y, m, 29),
                        allDay: true
                    },
                    {
                        title: 'C機構：國一數學',
                        start: new Date(y, m, 30),
                        end: new Date(y, m, 30),
                        allDay: true
                    }]
            });
            
             /*Add new event*/
            // Form to add new event

            $("#add_event_form").on('submit', function(ev) {
                ev.preventDefault();

                var $event = $(this).find('.new-event-form'),
                    event_name = $event.val();

                if (event_name.length >= 3) {

                    var newid = "new" + "" + Math.random().toString(36).substring(7);
                    // Create Event Entry
                    $("#external-events").append(
                        '<div id="' + newid + '" class="fc-event">' + event_name + '</div>'
                    );


                    var eventObject = {
                        title: $.trim($("#" + newid).text()) // use the element's text as the event title
                    };

                    // store the Event Object in the DOM element so we can get to it later
                    $("#" + newid).data('eventObject', eventObject);

                    // Reset draggable
                    $("#" + newid).draggable({
                        revert: true,
                        revertDuration: 0,
                        zIndex: 999
                    });

                    // Reset input
                    $event.val('').focus();
                } else {
                    $event.focus();
                }
            });

        }
        else {
            alert("Calendar plugin is not installed");
        }
    },
    //init
    $.CalendarPage = new CalendarPage, $.CalendarPage.Constructor = CalendarPage
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.CalendarPage.init()
}(window.jQuery);


