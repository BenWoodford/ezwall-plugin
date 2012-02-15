define([
	'underscore',
	'backbone'
], function(_, Backbone){
	
	var Jenkins = {};
	
	Jenkins.STATUS_OK = 'ok';
	Jenkins.STATUS_KO = 'ko';
	Jenkins.STATUS_INSTABLE = 'instable';
	Jenkins.STATUS_NONE = 'none';

	Jenkins.Model = Backbone.Model.extend({
		url: function() {
			return '%s/api/json'.replace('%s', this.get('url'));
		}
	});

	Jenkins.Job = Jenkins.Model.extend({
	    defaults: {
		    name: "My job",
		    status: Jenkins.STATUS_NONE,
		    building: false
		},
		
		color_regex: /([A-Za-z]+)(_anime)?/,
		
		parse: function(data) {
			var m = this.color_regex.exec(data.color);
			
			switch (m[1]) {
				case 'blue':
					data.status = Jenkins.STATUS_OK;
					break;
				case 'red':
					data.status = Jenkins.STATUS_KO;
					break;
				case 'yellow':
					data.status = Jenkins.STATUS_INSTABLE;
					break;
				default:
					break;
			}
			data.building = m[2] != undefined;
			return data;
		}
	});

	Jenkins.JobList = Backbone.Collection.extend({
	    model: Jenkins.Job,
	    
	    initialize: function() {
	    	_.bindAll(this, 'poll');
	    },
	    
	    poll: function(refresh){
	    	this.each(function(job){
				job.fetch()
			});
	    	_.delay(this.poll, refresh*1000, refresh);
	    }
	});

	Jenkins.View = Jenkins.Model.extend({
	    defaults: {
		    name: "All",
		    url: "http://localhost:8080/",
		    refresh: 10
		},
		initialize: function() {
			this.set({
				jobs: new Jenkins.JobList()
			});
			_.bindAll(this, 'poll');
		},
		parse: function(data, xhr) {
			this.get('jobs').reset(data.jobs, {parse: true});
			delete data.jobs;
			return data;
		},
		poll: function() {
			this.get('jobs').poll(this.get('refresh'));
		}
	});

	return Jenkins;
});
