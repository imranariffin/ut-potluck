
var c1 = "";
var c2 = "";
var c3 = "";

$(function(){
	$('#poll').hide();
	$('#thanks').hide();
	$('#resetMessage').hide();
	$.ajax({
		type: "GET",
		url: "/getCandidate",
		success: function (categories) {
			$.each(categories[0], function(i, candidate) {
				$('#category1').append(
				'<a href="#" class="c c1 list-group-item" id="c1' +
			     candidate[0] +
			     '">' +
			     candidate[0] +
			     '</a>'
			    );
			});

			$.each(categories[1], function(i, candidate) {
				$('#category2').append(
				'<a href="#" class="c c2 list-group-item" id="c2' +
			     candidate[0] +
			     '">' +
			     candidate[0] +
			     '</a>'
			    );
			});

			$.each(categories[2], function(i, candidate) {
				$('#category3').append(
				'<a href="#" class="c c3 list-group-item" id="c3' +
			     candidate[0] +
			     '">' +
			     candidate[0] +
			     '</a>'
			    );
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
		},
		failure: function (err) {
			alert('Wrong access code! Try again!');
		}
	});

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

	$('#btn-vote').click(function() {	
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
		console.log($('#code').val());
	});


	$('#btn-resetVote').click(function() {	
		$.ajax({
			type: "POST",
			data: {
				code:$('#code').val(),
				c1:c1,
				c2:c2,
				c3:c3
			},
			url: "/resetVoter",
			success: function (data) {
				$('#resetMessage').show();
			},
			err : function (err) {
				$('#resetMessage').show();
			}
		});
		console.log($('#code').val());
	});

})

