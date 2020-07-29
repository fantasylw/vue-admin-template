<template>
  <div class="diff-inputs">
    <div id="left-input" class="json-diff-input split">
      <textarea id="json-diff-left"></textarea>
      <span class="input-buttons">
        <a class="input-collapse" href="#">–</a>
        <a class="input-split" href="#">◫</a>
        <a class="input-expand" href="#">☐</a>
      </span>
    </div>
    <div id="right-input" class="json-diff-input split">
      <textarea id="json-diff-right"></textarea>
      <span class="input-buttons">
        <a class="input-collapse" href="#">–</a>
        <a class="input-split" href="#">◫</a>
        <a class="input-expand" href="#">☐</a>
      </span>
    </div>
  </div>
</template>

<script>
import initFunc from './static/js/main.js'
export default {
  name: 'Jsondiff',
  props: {
    left: Object,
    right: Object
  },
  data () {
    return {}
  },
  mounted () {
    initFunc(this.left, this.right)
    localStorage.setItem('lighttheme', true)
    enableLightTheme();
    var dontSaveDiffs = localStorage.getItem('dont-save-diffs');
    if (dontSaveDiffs) {
      $('#localstorage-toggle').get(0).checked = false;
    }

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

    function enableLightTheme() {
      localStorage.setItem('lighttheme', true);
      $('body').addClass('lighttheme');
      setTheme('default');
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
  }
}
</script>

<style lang="css" src="./static/css/codemirror.css"></style>
<style lang="css" src="./static/css/tomorrow-night.css"></style>
<style lang="css" src="./static/css/main.css"></style>
