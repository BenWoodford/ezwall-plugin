$(document).ready(function() {
    $.getJSON("/api/json", function(json, textStatus) {
        if(json.jobs.length > 0) {
            $.each(json.jobs, function(index, val) {
                if(val.color == "notbuilt")
                    return true;

                if($("#dashboard #" + val.name).length == 0) {
                    $("#dashboard").append('<div class="job col-md-3"><div class="job-inner alert" id="' + val.name + '"><h2 class="job-title">' + val.name + '</h2><p class="job-status">' + val.color + '</p></div></div>');
                }

                var job = $("#dashboard #" + val.name);

                switch(val.color) {
                    case 'blue_anime':
                    case 'red_anime':
                    case 'yellow_anime':
                        $(job).addClass('alert-info', 'fast');
                        break;

                    case 'blue':
                        $(job).addClass('alert-success', 'fast');
                        break;

                    case 'red':
                        $(job).addClass('alert-danger', 'fast');
                        break;

                    case 'yellow':
                        $(job).addClass('alert-warning', 'fast');
                        break;
                }
            });
        }
    });
});
