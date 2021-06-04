// Класс модального окна
var smModals = [];
var overModal = [];

class SmModal {
    constructor(modalSettings) {
        // Стандатные настройки плагина
        var modalSettingsDefault = {
            closeSelector: '.modal-close',
            modalSpeed: 500,
            openAnimate: 'smFade',
            closeAnimate: 'smFade',
            transitionTimingFunction: 'ease',
            backgroundBlur: false,
            backgroundBlurValue: '5px',
            overlay: 'background-color: rgba(0, 0, 0, 0.7)',
            verticalCenter: true,
            closeEsc: true,
        };
        
        this.modalSettingsDefault = modalSettingsDefault;

        this.makeModal(modalSettings);
    }
    // Метод создания модального окна
    makeModal(modalSettings) {
        // Установка пользовательских переменых экземпляра плагина
        this.beforeOpenVar = false;
        this.afterOpenVar = false;
        this.beforeCloseVar = false;
        this.afterCloseVar = false;
        this.modalSelector = modalSettings.modalSelector;
        this.closeSelector = modalSettings.closeSelector;
        this.modalSpeed = modalSettings.modalSpeed;
        this.openAnimate = modalSettings.openAnimate;
        this.closeAnimate = modalSettings.closeAnimate;
        this.transitionTimingFunction = modalSettings.transitionTimingFunction;
        this.beforeOpen = modalSettings.beforeOpen;
        this.afterOpen = modalSettings.afterOpen;
        this.beforeClose = modalSettings.beforeClose;
        this.afterClose = modalSettings.afterClose;        
        this.currentPadding = parseInt($(this.modalSelector).find('.sm-modal-body').css('padding-top').replace('px', ''));
        this.backgroundBlur = modalSettings.backgroundBlur;
        this.backgroundBlurValue = modalSettings.backgroundBlurValue;
        this.overlay = modalSettings.overlay;
        this.verticalCenter = modalSettings.verticalCenter;
        this.closeEsc = modalSettings.closeEsc;
        this.sideModal = modalSettings.sideModal;
        this.adaptiveModal = modalSettings.adaptiveModal;
        // Установка стандартных переменных если нету пользовательских
        if (this.closeSelector === undefined) {
            this.closeSelector = this.modalSettingsDefault.closeSelector;
        }
        if (this.modalSpeed === undefined) {
            this.modalSpeed = this.modalSettingsDefault.modalSpeed;
        }
        if (this.openAnimate === undefined) {
            this.openAnimate = this.modalSettingsDefault.openAnimate;
        }
        if (this.closeAnimate === undefined) {
            this.closeAnimate = this.modalSettingsDefault.closeAnimate;
        }
        if (this.transitionTimingFunction === undefined) {
            this.transitionTimingFunction = this.modalSettingsDefault.transitionTimingFunction;
        }
        if (this.backgroundBlur === undefined) {
            this.backgroundBlur = this.modalSettingsDefault.backgroundBlur;
        }
        if (this.backgroundBlurValue === undefined) {
            this.backgroundBlurValue = this.modalSettingsDefault.backgroundBlurValue;
        }
        if (this.overlay === undefined) {
            this.overlay = this.modalSettingsDefault.overlay;
        }
        if (this.verticalCenter === undefined) {
            this.verticalCenter = this.modalSettingsDefault.verticalCenter;
        }
        if (this.closeEsc === undefined) {
            this.closeEsc = this.modalSettingsDefault.closeEsc;
        }

        // Боковая модалка
        if (this.sideModal === 'left') {
            $(this.modalSelector).addClass('leftModal');
        } else if (this.sideModal === 'right') {
            $(this.modalSelector).addClass('rightModal');
        }
        // Отмена вертикального центрирования для всех браузеров кроме IE
        if (this.verticalCenter === false) {
            $(this.modalSelector).find('.sm-modal-wrap').css('align-items', 'flex-start');
        }
        // Применить стили к подложке
        $(this.modalSelector).find('.sm-modal-overlay').attr('style', this.overlay);
        // Инициализация классов анимации
        $(this.modalSelector).css('transition', 'all 0s ' + this.transitionTimingFunction);
        $(this.modalSelector).find('.sm-modal-contant').css('transition', 'all 0s ' + this.transitionTimingFunction);
        $(this.modalSelector).removeClass(this.closeAnimate);
        $(this.modalSelector).addClass(this.openAnimate);
        // Закрытие при нажатии на Esc
        if (this.closeEsc === true) {
            $(document).on('keyup', (e) => {
                if (e.keyCode === 27 && $(this.modalSelector).hasClass('active')) {
                    this.closeModal();
                };
            });
        }
        // Закрытие при клике на overlay
        $(this.modalSelector).on('click', '.sm-modal-overlay', (e) => {
            this.closeModal();
        });
        // Закрытие при клике на кнопку закрытия (параметр - "closeSelector")
        $(this.modalSelector + ' ' + this.closeSelector).off('click').on('click', () => {
            this.closeModal();
        });

        // Адаптивная модалка
        if (this.adaptiveModal !== undefined) {
            if ($(window).width() + scrollbarWidth() <= this.adaptiveModal) {
                $(this.modalSelector).removeClass('sm-adaptive');
            }

            $(window).on('resize', function(){
                if ($(window).width() + scrollbarWidth() <= modalSettings.adaptiveModal) {
                    $(modalSettings.modalSelector).removeClass('sm-adaptive');
                } else {
                    $(modalSettings.modalSelector).addClass('sm-adaptive');
                }
            });
        }
    }
    // Метод открытия с проверкой на адаптивность модального окна
    openModal() {
        if (this.adaptiveModal !== undefined) {
            if ($(window).width() + scrollbarWidth() <= this.adaptiveModal) {
                this.openSm();
            }
        } else {
            this.openSm();
        }
    }
    // Метод открытия модального окна
    openSm() {
        // Выполнить функцию beforeOpen, если она была задана
        if (this.beforeOpen !== undefined) {
            this.beforeOpen();
        }
        // Открываем модальное окно с z-index 5000 или выше уже открытого модального окна
        if (overModal.length === 0) {
            $(this.modalSelector).css('z-index', '5000');
        } else {
            $(this.modalSelector).css('z-index', parseInt(overModal[overModal.length - 1]) + 1);
        }
        // Устанавливаем сколл моадльного окна в 0
        $(this.modalSelector).find(".sm-modal-body").scrollTop(0);
        // Центрируем блок модалки по вертикале на IE
        if (this.verticalCenter === true) {
            this.fixCenterOnIE();
        }
        // Включить блюр заднего фона
        if (this.backgroundBlur === true) {
            $(this.modalSelector).css('backdrop-filter', 'blur(' + this.backgroundBlurValue + ')');
        }
        // Анимация появления
        $(this.modalSelector).css('transition', 'all ' + this.modalSpeed + 'ms ' + this.transitionTimingFunction);
        $(this.modalSelector).find('.sm-modal-contant').css('transition', 'all ' + this.modalSpeed + 'ms ' + this.transitionTimingFunction);
        // Открытие модалки
        $(this.modalSelector).removeClass(this.openAnimate).addClass('active');
        // Срытие скролл бара body при открытии
        if (overModal.length === 0) {
            $('body').css({
                'overflow': 'hidden',
                'padding-right': scrollbarWidth(),
            });
        }
        // Модалка поверх модалки
        overModal.push($(this.modalSelector).css('z-index'));
        // Выполнить функцию afterOpen, если она была задана
        setTimeout(() => {
            if (this.afterOpen !== undefined) {
                this.afterOpen();
            }
        }, this.modalSpeed);
    }
    // Метод закрытия модального окна
    closeModal() {
        // Выполнить функцию beforeClose, если она была задана
        if (this.beforeClose !== undefined) {
            this.beforeClose();
        }
        overModal.pop();
        // Выключить блюр заднего фона
        if (this.backgroundBlur === true) {
            $(this.modalSelector).css('backdrop-filter', 'blur(0px)');
        }
        // Закрытие модалки
        $(this.modalSelector).removeClass(this.openAnimate);
        $(this.modalSelector).addClass(this.closeAnimate).removeClass('active');
        // Вернуть скролл бар body
        setTimeout(() => {
            if (overModal.length === 0) {
                $('body').css({
                    'overflow': 'auto',
                    'padding-right': '',
                });
            }
            $(this.modalSelector).css('transition', 'all 0s ' + this.transitionTimingFunction);
            $(this.modalSelector).find('.sm-modal-contant').css('transition', 'all 0s ' + this.transitionTimingFunction);
            $(this.modalSelector).removeClass(this.closeAnimate);
            $(this.modalSelector).addClass(this.openAnimate);
            // Выполнить функцию afterClose, если она была задана
            if (this.afterClose !== undefined) {
                this.afterClose();
            }
        }, this.modalSpeed);
    }
    // Метод вертикального центрирования окна в браузере IE
    fixCenterOnIE() {
        // Переменные для определения браузера IE
        var ua = window.navigator.userAgent.toLowerCase(),
            is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
        // Проверка на IE
        if (is_ie == true) {
            // Расчет необходимой величины padding-top b для центрирования
            var windowHeight = $(window).outerHeight();
            var contentHeight = $(this.modalSelector).find('.sm-modal-contant').outerHeight();
            var paddingTop = (windowHeight - contentHeight) / 2;
            // Если пользовательский паддинг меньше расчетного то центрировать блок
            if (this.currentPadding < paddingTop) {
                $(this.modalSelector).find('.sm-modal-body').css('padding', paddingTop + 'px 0px');
            } else { // В противном случае не меняем паддинг и даем блоку margin-bottom для фикса нижнего отступа на IE
                $(this.modalSelector).find('.sm-modal-contant').css('margin-bottom', this.currentPadding + 'px');
            }
        }
    }
}

$('.sm-modal').each(function(e){
    smModals['#' + $(this).attr('id')] = new SmModal({
        modalSelector: '#' + $(this).attr('id'),
    });
});

// Функция расчета ширины скроллбара
function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    return scrollbarWidth;
}