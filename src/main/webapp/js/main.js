$(document).ready(function() {
    $.getJSON("/api/json", function(json, textStatus) {
        if(json.jobs.length > 0) {
            $.each(json.jobs, function(index, val) {
                if($("#dashboard #" + val.name).length == 0) {
                    $("#dashboard").append('<div class="job" col-md-2"><div class="job-inner alert" id="' + val.name + '"><h2 class="job-title">' + val.name + '</h2><p class="job-status">' + val.color + '</p></div></div>');
                }

                var job = $("#dashboard #" + val.name);

                switch(val.color) {
                    case 'notbuilt':
                    case 'grey':
                    case 'disabled':
                        $(job).addClass('alert-info');
                        break;

                    case 'blue':
                        $(job).addClass('alert-success');
                        break;

                    case 'red':
                        $(job).addClass('alert-error');
                        break;

                    case 'yellow':
                        $(job).addClass('alert-warning');
                        break;
                }
            });
        }
    });
});
