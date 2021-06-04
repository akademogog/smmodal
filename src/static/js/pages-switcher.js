$(document).ready(function () {

	// Страницы и ссылки на них
	var pagesList = {
		"1. Главная": "index.html",
		"2. Направление": "direction.html",
		"3. Профессии": "professions.html",
		"3.01. Курсы": "courses.html",
		"3.02. Спец. Курсы": "courses-speshial.html",
		"3.03. Интенсивы": "intensives.html",
		"4. Профессия": "professiya.html",
		"4.01. Интенсив": "intensiv.html",
		"5. Мероприятия": "events.html",
		"6. Вебинар": "webinar.html",
		"7. О нас": "about.html",
		"11. Блог": "blog.html",
		"12. Статья": "article.html",
		"13. Контакты": "contacts.html",
		"14. Компаниям": "kompaniyam.html",
		"15. B2B": "b2b.html",
		"16. Сертификаты": "sertifikati.html",
		"17.01 Сертификат": "sertifikat.html",
		"17.02 Сертификат": "sertifikat2.html",
		"17.03 Сертификат": "sertifikat3.html",
		"18. 404": "404.html",
		"19. Персональные": "personal.html",
	};

	$('body').each(function () {
		var link = $('' +
			'<div class="pages">' +
			'<div class="pages-switcher">' +
			'<div class="pages-switcher-btn icon-pages">' +
			'	<div id="pages-menu"><span></span></div>' +
			'</div>' +
			'<div class="pages-swticher-header">' +
			'	<div class="pages-switcher-heading">Links to preview pages</div>' +
			'</div>' +
			'<div class="pages-swticher-body">' +
			'	<ul class="pages-swticher-list"></ul>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'<style>' +
			'	html {' +
			'	height: 100%;' +
			'}' +
			'body {' +
			'margin: 0;' +
			'min-height: 100%;' +
			'height: auto;' +
			'}' +
			'.pages {' +
			'direction: ltr;' +
			'font-family: "Arila", sans-serif;' +
			'font-size: 16px;' +
			'line-height: 1;' +
			'}' +
			'.pages-switcher-btn {' +
			'top: 81px;' +
			'position: absolute;' +
			'background: #202020;' +
			'border-bottom-left-radius: 10px;' +
			'border-top-left-radius: 10px;' +
			'margin-left: -20px;' +
			'width: 48px;' +
			'height: 48px;' +
			'cursor: pointer;' +
			'}' +
			'.pages-switcher-heading {' +
			'font-size: 18px;' +
			'text-align: center;' +
			'padding: 20px 20px 15px;' +
			'background-color: #191919;' +
			'}' +
			'.pages-swticher-body {' +
			'height: calc(100vh - 53px);' +
			'overflow: auto;' +
			'}' +
			'.pages-swticher-list {' +
			'padding-top: 20px;' +
			'}' +
			'.pages-swticher-list li a {' +
			'padding: 12px 30px;' +
			'display: block;' +
			'line-height: 1;' +
			'}' +
			'.pages-swticher-list li a {' +
			'color: #fff;' +
			'-webkit-transition: .3s;' +
			'-o-transition: .3s;' +
			'transition: .3s;	' +
			'}' +
			'.pages-swticher-list li a:hover {' +
			'color: #7a7a7a;' +
			'background-color: #191919;' +
			'}' +
			'#pages-menu  {' +
			'margin-top: 11px;' +
			'margin-left: 6px;' +
			'width: 40px;' +
			'height: 40px;' +
			'position: relative;' +
			'}' +
			'.cross #pages-menu span {' +
			'background-color: transparent;' +
			'}' +
			'.cross #pages-menu span:before {' +
			'transform: rotate(45deg);' +
			'top: 0;' +
			'}' +
			'.cross #pages-menu span:after {' +
			'transform: rotate(-45deg);' +
			'bottom: 0;' +
			'}' +
			'#pages-menu span {' +
			'display: inline-block;' +
			'width: 30px;' +
			'margin-left: 4px;' +
			'top: 1px;' +
			'height: 3px;' +
			'background-color: #fff;' +
			'border-radius: 1px;' +
			'position: relative;' +
			'}' +
			'#pages-menu span:before {' +
			'content: "";' +
			'position: absolute;' +
			'left: 0;' +
			'right: 0;' +
			'height: 3px;' +
			'background-color: #fff;' +
			'border-radius: 1px;' +
			'top: -8px;' +
			'transition: .6s;' +
			'}' +
			'#pages-menu span:after {' +
			'content: "";' +
			'position: absolute;' +
			'left: 0;' +
			'right: 0;' +
			'height: 3px;' +
			'background-color: #fff;' +
			'border-radius: 1px;' +
			'bottom: -8px;' +
			'transition: .6s;' +
			'}' +
			'.pages-switcher {' +
			'right: 0;' +
			'top: 0;' +
			'color: #fff;' +
			'width: 307px;' +
			'display: block;' +
			'z-index: 555555;' +
			'position: fixed;' +
			'background: #202020;' +
			'border-radius: 0;' +
			'height: 100%;' +
			'-webkit-transform: translateX(100%);' +
			'transform: translateX(100%);' +
			'-webkit-transition: all .3s ease;' +
			'transition: all .6s ease;   ' +
			'}' +
			'.pages-visible {' +
			'-webkit-transform: translateX(0);' +
			'transform: translateX(0)' +
			'}' +
			'</style>' +
			'');
		$('body').prepend(link);
	});


	var ul = document.createElement('ul');
	for (elem in pagesList) {
		var li = document.createElement('li');
		var a = document.createElement('a');
		$(a).appendTo(li).attr('href', pagesList[elem]).text(elem);
		$(li).appendTo(ul);
	}
	$(ul).addClass('pages-swticher-list no-style').appendTo('.pages-swticher-body');

	var panel = $('.pages-switcher');
	$('.pages-switcher-btn').on('click', function () {
		'use strict';
		$(this).toggleClass('cross');
		$('.pages-switcher').toggleClass('pages-visible');
	});

});
