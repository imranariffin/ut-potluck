
$(function() {
	$.ajax({
		type: "GET",
		url: "/getCandidate",
		success: function (categories) {
			$.each(categories, function(i, candidates) {
				var chart = c3.generate({
				    bindto: '#chart' + i,
				    data: {
				        columns: candidates,
				        type: 'bar'
				    },
				    bar: {
				        width: {
				            ratio: 0.6 // this makes bar width 50% of length between ticks
				        }
				    }
				});
			});
		}
	});
})