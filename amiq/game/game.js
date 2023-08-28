
var currentTopic = {};
var path = '';
var view = {
	set: {
		'selectCard': 0,
	},
	init: function () {
		$('.show-ans').hide();
		if (window.innerWidth > window.innerHeight) {
			// $('.game-option-img').hide();
		}
		$('#exitFullScreen').hide();
		view.getTopic();
		view.renderCardList();
		view.renderOptionList();
		view.renderQuestion();
		view.setImagePath();
		view.events();
	},
	events: function () {
		$('.game-card a').click(function () {
			var isUnselect = !($(this).hasClass('active'));
			var isSelected = !isUnselect;
			var isPutting = view.set.selectCard > 0;

			if (isPutting) {
				var prevCard = view.set.selectCard;
				$('.game-card a[data-card="' + prevCard + '"]').removeClass('ans').removeClass('active');
			}

			if (isUnselect) {
				var currentCard = parseInt($(this).attr('data-card'));
				$(this).removeClass('ans').addClass('active');
				view.playClickSound();
				view.set.selectCard = currentCard;

				if (window.innerWidth > window.innerHeight) {
					$('.game-card').animate({ 'bottom': '-50vh' }, 300);
					$('.game-option-img').show();
				}

				// $('.game-option a').removeClass('flash').not('[data-showoption]').addClass('flash');
				$('.game-option a').removeClass('flash');
				$('.game-option a:not([data-showoption])').addClass('flash');

			}
			if (isSelected) {
				// var optionFull = $('.game-option a[data-showoption]').size() == 12;
				// if(optionFull) {
				//     $('.show-ans').show();
				// }

				$(this).removeClass('active');
				var removeCard = parseInt($(this).attr('data-card'));
				$('.game-option a[data-showoption="' + removeCard + '"]').removeAttr('data-showoption');
				view.playClickSound();
				view.set.selectCard = 0;


				if (window.innerWidth > window.innerHeight) {
					// $('.game-option-img').hide();
				}

				// $('.game-option a').removeClass('flash').not('[data-showoption]').addClass('flash');
				$('.game-option a').removeClass('flash');

			}

			console.log('view.set.selectCard', view.set.selectCard)
		});
		$('.game-option a').click(function () {
			var isEmpty = !($(this)[0].hasAttribute('data-showoption'));
			var isNotEmpty = !isEmpty;
			var isAnswerView = $(this).hasClass('ans');
			var isPutting = view.set.selectCard > 0;
			if (isAnswerView) {
				$(this).removeClass('ans');
				$('.game-option a[data-showoption]').removeClass('ans');
				$(this).css('background-image', '');
				$('.game-option a').removeClass('ans');
			}

			if (isEmpty && isPutting) {
				$(this).attr('data-showoption', view.set.selectCard);
				view.playClickSound();
				view.set.selectCard = 0;


				var optionFull = $('.game-option a[data-showoption]').size() == 12;
				if (!optionFull) {
					if (window.innerWidth > window.innerHeight) {
						$('.game-card').animate({ 'bottom': '0' }, 200);
						// $('.game-option-img').hide();

					}
					$('.game-option a').removeClass('flash');
				}
				if (optionFull) {
					var top = $('.game-option-img').offset().top;
					if (window.innerWidth >= 812) {
						$("html").animate({ "scrollTop": top });
					}
					// $("html,body").animate({"scrollTop": top});
					$('.show-ans').show();
					// $('.game-option-img').show();
					$('.game-option a').removeClass('flash');
				}

			}
			if (isNotEmpty) {
				var optionFull = $('.game-option a[data-showoption]').size() == 12;
				if (optionFull) {
					$('.show-ans').hide();
				}

				if (view.set.selectCard !== false) {
					var removeCard = parseInt($(this).attr('data-showoption'));
					$('.game-card a[data-card="' + removeCard + '"]').removeClass('active');
					$(this).removeAttr('data-showoption');
					view.playClickSound();

					if (window.innerWidth > window.innerHeight) {
						$('.game-card').animate({ 'bottom': '0' }, 200);
						// $('.game-option-img').hide();
					}
				}

			}

			console.log('view.set.selectCard', view.set.selectCard)

		});
		$('.game-question-img').click(function () {
			// setScrollIntoView('questionImg');
		})

		$('.show-ans button').click(function () {
			var isAnswerView = $(this).hasClass('ans');
			if (!isAnswerView) {
				$('.game-option a[data-showoption]').addClass('ans');
				$(this).addClass('ans');
				view.setImagePath();
			}
			if (isAnswerView) {
				$(this).removeClass('ans');
				$('.game-option a[data-showoption]').removeClass('ans');
				$(this).css('background-image', '');
				$('.game-option a').removeClass('ans');
			}
		})

		// $('.show-ans button:not(.ans)').click(function(){
		//     $('.game-option a[data-showoption]').addClass('ans');
		//     $(this).addClass('ans');
		//     console.log('ans!')
		// })

		$('.back-topic').click(function () {
			$("html").animate({ "scrollTop": 0 });
		})

		$('#openFullScreen, #exitFullScreen').click(function () {
			view.fullscreenHandler();
		})

	},
	getTopic: function () {
		// var defaultTopicId = view.getParameter('t');
		var defaultTopicId = location.hash.split('#')[1];
		if (defaultTopicId !== undefined) {
			topics.forEach(function (item) {
				if (item.id == defaultTopicId) {
					currentTopic = item;
					return;
				}
			})
			if (Object.keys(currentTopic).length === 0) {
				view.getRandomTopic();
				view.removeParameter('t');
			}
		}
		if (defaultTopicId == undefined) {
			view.getRandomTopic();
		}
	},
	getRandomTopic: function () {
		var topic = topics[Math.floor(Math.random() * topics.length)];
		currentTopic = topic;
		location.hash = currentTopic.id;
	},
	getParameter: function (variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
	},
	removeParameter: function (parameter) {
		var url = document.location.href;
		var urlparts = url.split('?');

		if (urlparts.length >= 2) {
			var urlBase = urlparts.shift();
			var queryString = urlparts.join("?");

			var prefix = encodeURIComponent(parameter) + '=';
			var pars = queryString.split(/[&;]/g);
			for (var i = pars.length; i-- > 0;)
				if (pars[i].lastIndexOf(prefix, 0) !== -1)
					pars.splice(i, 1);
			url = urlBase + '?' + pars.join('&');
			window.history.pushState('', document.title, url); // added this line to push the new url directly to url bar .
		}
		return url;
	},
	renderCardList: function () {
		var Li = []
		for (var i = 0; i < 12; i++) {
			Li.push(
				'<li><a data-card=' + (i + 1) + '>' + (i + 1) + '</a></li>'
			);
		}
		$('#cardList').html(Li);
	},
	renderOptionList: function () {
		var Li = []
		for (var i = 0; i < 12; i++) {
			Li.push(
				'<li><a></a></li>'
			);
		}
		$('#optionList').html(Li);
	},
	renderQuestion: function () {
		var opening = '<p>' + currentTopic.opening + '</p>';
		var question = '<p>' + (currentTopic.question ? currentTopic.question : '&nbsp;') + '</p>';
		$('#question').html(opening + question);
	},
	setImagePath: function () {
		path = 'url(img/topic/' + currentTopic.id + '_' + currentTopic.no + '.jpg';
		$('.game-answer-sample, .game-question-img, .game-option-img, .show-ans button.ans').css('background-image', path);
	},
	playClickSound: function () {
		var audio = new Audio("sound/click.wav");
		audio.play();
	},
	fullscreenHandler: function () {
		var isFullScreen = false;

		$('#openFullScreen').toggle();
		$('#exitFullScreen').toggle();

		var elem = document.documentElement;
		//openFullscreen
		if (!isFullScreen) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) { /* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) { /* IE/Edge */
				elem.msRequestFullscreen();
			}
			isFullScreen = !isFullScreen;
		}
		//closeFullscreen
		if (isFullScreen) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			isFullScreen = !isFullScreen;
		}
	}
}

$(function () {
	view.init();
});

