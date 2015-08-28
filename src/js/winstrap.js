$(function () {
    // On mouse click and touch, add a class to <button> and <a> that removes focus rectangle
    $(document).on('mousedown touchstart', 'a, button', function () {
        $('.no-outline').removeClass('no-outline');
        $(this).addClass('no-outline');
    });

    // On keyboard navigation, remove the class that hides focus rectangle
    $(document).on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        var tabKeyCode = 9;

        if (keyCode === tabKeyCode) {
            $('.no-outline').removeClass('no-outline');
        }
    });
});
