

$(window).on('load', function(){
    smModals['#your-selector2'].makeModal({
        modalSelector: '#your-selector2',
        adaptiveModal: 768,
    });

    smModals['#your-selector3'].makeModal({
        modalSelector: '#your-selector3',
        adaptiveModal: 1024,
    });

    $('.your-button').on('click', function(){
        smModals['#your-selector'].openModal();
    });
    
    document.querySelectorAll('.your-button2')[0].addEventListener('click', function () {
        smModals['#your-selector2'].openModal();
    });

    document.querySelectorAll('.your-button3')[0].addEventListener('click', function () {
        smModals['#your-selector3'].openModal();
    });
});