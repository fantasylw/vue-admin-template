var isLightTheme = localStorage.getItem('lighttheme');
if (isLightTheme) {
    enableLightTheme();
}
else {
    enableLightTheme();
}
var dontSaveDiffs = localStorage.getItem('dont-save-diffs');
if (dontSaveDiffs) {
    $('#localstorage-toggle').get(0).checked = false;
}
$('#lighttheme-toggle').on('change', function (e) {
    toggleLightTheme();
});

$('#localstorage-toggle').on('change', function (e) {
    if (!e.currentTarget.checked) {
        localStorage.setItem('dont-save-diffs', true);
        localStorage.removeItem('current-diff');
        localStorage.removeItem('diff-history');
    } else {
        localStorage.removeItem('dont-save-diffs');
    }

});

$('#left-input').on('click', '.input-collapse,.input-split,.input-expand', onPaneResizeLeftClick);
$('#right-input').on('click', '.input-collapse,.input-split,.input-expand', onPaneResizeRightClick);


function toggleLightTheme() {
    var isLightTheme = localStorage.getItem('lighttheme');
    if (isLightTheme) {
        disableLightTheme();
    } else {
        enableLightTheme();
    }
}

function enableLightTheme() {
    localStorage.setItem('lighttheme', true);
    $('body').addClass('lighttheme');
    $('#lighttheme-toggle').get(0).checked = true;
    setTheme('default');
}

function disableLightTheme() {
    localStorage.removeItem('lighttheme');
    $('body').removeClass('lighttheme');
    $('#lighttheme-toggle').get(0).checked = false;
    setTheme('tomorrow-night');
}

function setTheme(theme) {
    var views = getInputViews();
    views.left.codemirror.setOption('theme', theme);
    views.right.codemirror.setOption('theme', theme);
    compareJson();
}

function onPaneResizeLeftClick(e) {
    onResize(e, 'left');
}

function onPaneResizeRightClick(e) {
    onResize(e, 'right');
}

function onResize(e, side) {
    e.preventDefault();
    var otherSide = side === 'left' ? 'right' : 'left';
    var clickClass = e.currentTarget.className;
    $('.json-diff-input').removeClass('split');
    $('.json-diff-input').removeClass('expand');
    $('.json-diff-input').removeClass('collapse');
    var sideClass = 'split';
    var otherSideClass = 'split';
    if (clickClass === 'input-collapse') {
        sideClass = 'collapse';
        otherSideClass = 'expand';
    } else if (clickClass === 'input-expand') {
        sideClass = 'expand';
        otherSideClass = 'collapse';
    }
    $('#' + side + '-input').addClass(sideClass);
    $('#' + otherSide + '-input').addClass(otherSideClass);
}