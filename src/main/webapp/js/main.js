$(document).ready(function() {
    $.getJSON("/api/json", function(json, textStatus) {
        if(json.jobs.length > 0) {
            $.each(json.jobs, function(index, val) {
                if(val.color == "notbuilt")
                    return true;

                if($("#dashboard #" + val.name).length == 0) {
                    $("#dashboard").append('<div class="job col-md-3"><div class="job-inner alert" id="' + val.name + '"><h2 class="job-title">' + val.name + '</h2><p class="job-status"></p></div></div>');
                }

                var job = $("#dashboard #" + val.name);

                switch(val.color) {
                    case 'blue_anime':
                        $(job).addClass('alert-info', 'fast');
                        $(job).find('.job-status').text("Building from Stable...");
                        break;

                    case 'red_anime':
                        $(job).addClass('alert-info', 'fast');
                        $(job).find('.job-status').text("Building from Failure...");
                        break;

                    case 'yellow_anime':
                        $(job).addClass('alert-info', 'fast');
                        $(job).find('.job-status').text("Building from Unstable...");
                        break;

                    case 'blue':
                        $(job).addClass('alert-success', 'fast');
                        $(job).find('.job-status').text("Stable Build!");
                        break;

                    case 'red':
                        $(job).addClass('alert-danger', 'fast');
                        $(job).find('.job-status').text("Build Failed");
                        break;

                    case 'yellow':
                        $(job).addClass('alert-warning', 'fast');
                        $(job).find('.job-status').text("Build Unstable");
                        break;

                    default:
                        $(job).addClass('alert-warning', 'fast');
                        $(job).find('.job-status').text("Unknown Status Type: " + val.color);
                        break;
                }
            });
        }
    });
});
