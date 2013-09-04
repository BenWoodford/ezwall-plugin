$(document).ready(function() {
        function getJobs() {
            $.getJSON("/api/json", function(json, textStatus) {
                if(json.jobs.length > 0) {
                    $.each(json.jobs, function(index, val) {
                        if(val.color == "notbuilt")
                            return true;

                        if($("#dashboard #" + val.name).length == 0) {
                            $("#dashboard").append('<div class="job col-md-3"><div class="job-inner alert" id="' + val.name + '"><h2 class="job-title">' + val.name + '</h2><p class="job-status"></p></div></div>');
                        }

                        var job = $("#dashboard #" + val.name);

                        $(job).removeClass("alert-info").removeClass("alert-danger").removeClass("alert-warning");

                        switch(val.color) {
                            case 'blue_anime':
                                $(job).switchClass('alert-danger alert-success alert-warning','alert-info', 'slow');
                                $(job).find('.job-status').text("Building from Stable...");
                                break;

                            case 'red_anime':
                                $(job).switchClass('alert-danger alert-success alert-warning','alert-info', 'slow');
                                $(job).find('.job-status').text("Building from Failure...");
                                break;

                            case 'yellow_anime':
                                $(job).switchClass('alert-danger alert-success alert-warning','alert-info', 'slow');
                                $(job).find('.job-status').text("Building from Unstable...");
                                break;

                            case 'blue':
                                $(job).switchClass('alert-danger alert-warning alert-info','alert-success', 'slow');
                                $(job).find('.job-status').text("Stable Build!");
                                break;

                            case 'red':
                                $(job).switchClass('alert-info alert-success alert-warning','alert-danger', 'slow');
                                $(job).find('.job-status').text("Build Failed");
                                break;

                            case 'yellow':
                                $(job).switchClass('alert-info alert-success alert-danger','alert-warning', 'slow');
                                $(job).find('.job-status').text("Build Unstable");
                                break;

                            default:
                                $(job).switchClass('alert-info alert-success alert-danger','alert-warning', 'slow');
                                $(job).find('.job-status').text("Unknown Status Type: " + val.color);
                                break;
                        }
                    });
                }
            });
        }
        getJobs();
        setInterval(getJobs, 3000);
});
