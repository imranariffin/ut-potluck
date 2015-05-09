
$(function(){
	$('#poll').hide();

	$('#btn-access').click(function() {
		$.ajax({
			type: "POST",
			data: {code:$('#code').val()},
			url: "/submitCode",
			success: function (voter) {
				$('#poll').show();
				$('#access').hide();
				console.log(voter);
			},
			failure: function (err) {
				alert('Wrong access code! Try again!');
			}
		});
	});
})

