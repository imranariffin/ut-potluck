
var c1 = "";
var c2 = "";
var c3 = "";

$(function(){
	$('#poll').hide();
	$('#thanks').hide();

	$('#btn-access').click(function() {
		$.ajax({
			type: "POST",
			data: {code:$('#code').val()},
			url: "/submitCode",
			success: function (voter) {
				$('.c').removeClass("list-group-item-success");

				c1 = voter.candidates.category_1;
				c2 = voter.candidates.category_2;
				c3 = voter.candidates.category_3;
				$('.c1#c1'+voter.candidates.category_1).addClass("list-group-item-success");
				$('.c2#c2'+voter.candidates.category_2).addClass("list-group-item-success");
				$('.c3#c3'+voter.candidates.category_3).addClass("list-group-item-success");

				$('#poll').show();
				$('#access').hide();
			},
			failure: function (err) {
				alert('Wrong access code! Try again!');
			}
		});
	});

	$('.list-group-item').click(function(){
		if ($(this).hasClass('c1') == true) {
			$('.c1').removeClass("list-group-item-success");
			$(this).addClass("list-group-item-success")
			c1 = $(this).text();
		} else if ($(this).hasClass('c2') == true) {
			$('.c2').removeClass("list-group-item-success");
			$(this).addClass("list-group-item-success")
			c2 = $(this).text();
		} else if ($(this).hasClass('c3') == true) {
			$('.c3').removeClass("list-group-item-success");
			$(this).addClass("list-group-item-success")
			c3 = $(this).text();
		}
	});

	$('#btn-vote').click(function() {
		console.log(c1);
		$.ajax({
			type: "POST",
			data: {
				code:$('#code').val(),
				c1:c1,
				c2:c2,
				c3:c3
			},
			url: "/submitVote",
			success: function (data) {
				$('#thanks').show();
			}
		});
	});


})

