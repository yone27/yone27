'use strict';
//+------------------------------------------------------------------+
//| Selector share button                                            |
//+------------------------------------------------------------------+
let socialShare = $('.share');
if((socialShare).length) {
	let a = $('.share > a');
	let aClose = $('.share span.closer');
	a.click(function (e) {
		e.preventDefault();
		let socialIcons = $(this).parent().find('.content-social-icons');
		if(socialIcons.hasClass('active')) {
			socialIcons.removeClass('active');
		}
		else {
			socialIcons.addClass('active');
		}
	});
	aClose.click(function () {
		let socialIcons = $(this).parent();
		if(socialIcons.hasClass('active')) {
			socialIcons.removeClass('active');
		}
		else {
			socialIcons.addClass('active');
		}
	});
}
//+------------------------------------------------------------------+
//| Back to top                                                      |
//+------------------------------------------------------------------+
let backToTop = $('.back-to-top');
if(backToTop.length) {
	//hide or show the "back to top" link
	$(window).scroll(function () {
		$(this).scrollTop() > 300 ?
			backToTop.addClass('visible') :
			backToTop.removeClass('visible fade-out');
		if($(this).scrollTop() > 1200) {
			backToTop.addClass('fade-out');
		}
	});
	//smooth scroll to top
	backToTop.on('click', function (event) {
		event.preventDefault();
		$('body,html').animate({
				scrollTop : 0
			}, 700
		);
	});
}
//+------------------------------------------------------------------+
//| smooth scroll to href #                                          |
//+------------------------------------------------------------------+
if(window.location.hash) {
	$('html, body').stop().animate({scrollTop : 0});
}
$('a[href^="#"]:not([href="#"], [data-toggle="tab"], [data-toggle="collapse"], [data-slide="prev"], [data-slide="next"])').click(function (e) {
	e.preventDefault();
	if(location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
		let targets = $(this.hash),
			headerHeight = $('header[data-spy="affix"]').first().height(),
			target = targets.length ? targets : $('[name=' + this.hash.slice(1) + ']'),
			targetPos = target.offset().top - headerHeight;
		if(target.length) {
			$('html, body').animate({
				scrollTop : targetPos
			}, 1000);
			return false;
		}
	}
});
if(window.location.hash) {
	let targets = $(window.location.hash),
		headerHeight = $('header[data-spy="affix"]').first().height(),
		target = targets.length ? targets : $('[name=' + this.hash.slice(1) + ']'),
		targetPos = target.offset().top - headerHeight,
		uri = window.location.toString();
	if(uri.indexOf('#') > 0) {
		let clean_uri = uri.substring(0, uri.indexOf('#'));
		window.history.replaceState({}, document.title, clean_uri);
	}
	$('html, body').stop().animate({
		scrollTop : targetPos
	}, 1000);
}
//+------------------------------------------------------------------+
//| Activate hash menu and close meno on arrive target                                               |
//+------------------------------------------------------------------+
let hashMenu = $('#menu a[href^="#"]:not([href="#"])');
if(hashMenu.length) {
	let activeHashMenu = function () {
		let scrollPos = $(document).scrollTop() + $('header[data-spy="affix"]').first().height();
		hashMenu.each(function () {
			let currentHash = $(this),
				refElement = $(currentHash.attr('href'));
			if(refElement.length) {
				if(refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
					$('#menu ul li').removeClass('active');
					currentHash.parent().addClass('active');
				}
			}
		});
	};
	hashMenu.on('click', function (e) {
		$(document).off('scroll');
		$('a').each(function () {
			$(this).parent().removeClass('active');
		});
		$(this).parent().addClass('active');
		let target = $(this.hash),
			headerHeight = $('header[data-spy="affix"]').first().height(),
			targetPos = target.offset().top - headerHeight;
		if($('#menu').attr('aria-expanded') === 'true') {
			$('[data-target="#menu"]').trigger('click');
		}
		$('html, body').stop().animate({
			scrollTop : targetPos
		}, 1000, function () {
			$(document).on('scroll', activeHashMenu);
		});
	});
	$(document).on('scroll', activeHashMenu);
}
//+------------------------------------------------------------------+
//| Menu profile (open and close buttons)                            |
//+------------------------------------------------------------------+
if($('.menu-profile').length) {
	$('a.sub-menu').click((event) => {
		event.preventDefault();
		let parentDisplay = $(this).parent();
		if(parentDisplay.has('ul')) {
			if(!parentDisplay.attr('aria-expanded')) {
				parentDisplay.attr('aria-expanded', true);
				$(this).addClass('open');
			}
			else if(parentDisplay.attr('aria-expanded') === 'false') {
				parentDisplay.attr('aria-expanded', true);
				$(this).addClass('open');
			}
			else {
				parentDisplay.attr('aria-expanded', false);
				$(this).removeClass('open');
			}
		}
	});
}