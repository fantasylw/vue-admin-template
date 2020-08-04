<template>
  <div class="diff-inputs">
    <div ref="leftInput" class="json-diff-input split">
      <textarea ref="leftTextarea"></textarea>
      <span class="input-buttons">
        <a class="input-collapse" href="#">–</a>
        <a class="input-split" href="#">◫</a>
        <a class="input-expand" href="#">☐</a>
      </span>
    </div>
    <div ref="rightInput" class="json-diff-input split">
      <textarea ref="rightTextarea"></textarea>
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
  name: 'json-diff',
  props: {
    left: Object,
    right: Object
  },
  data () {
    return {}
  },
  mounted () {
    let { getInputViews, compareJson } = initFunc(this.left, this.right, {
      leftTextarea: this.$refs.leftTextarea,
      rightTextarea: this.$refs.rightTextarea
    })
    localStorage.setItem('lighttheme', true)
    enableLightTheme();
    // var dontSaveDiffs = localStorage.getItem('dont-save-diffs');
    // if (dontSaveDiffs) {
    //   $('#localstorage-toggle').get(0).checked = false;
    // }

    // $('#localstorage-toggle').on('change', function (e) {
    //   if (!e.currentTarget.checked) {
    //     localStorage.setItem('dont-save-diffs', true);
    //     localStorage.removeItem('current-diff');
    //     localStorage.removeItem('diff-history');
    //   } else {
    //     localStorage.removeItem('dont-save-diffs');
    //   }

    // });

    $(this.$refs.leftInput).on('click', '.input-collapse,.input-split,.input-expand', onPaneResizeLeftClick.bind(this));
    $(this.$refs.rightInput).on('click', '.input-collapse,.input-split,.input-expand', onPaneResizeRightClick.bind(this));

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
      onResize.call(this, e, 'left');
    }

    function onPaneResizeRightClick(e) {
      onResize.call(this, e, 'right');
    }

    function onResize(e, side) {
      e.preventDefault();
      var otherSide = side === 'left' ? 'right' : 'left';
      var clickClass = e.currentTarget.className;
      const removeClass = function (dom) {
        dom.removeClass('split');
        dom.removeClass('expand');
        dom.removeClass('collapse');
      }
      removeClass($(this.$refs.leftInput))
      removeClass($(this.$refs.rightInput))
      var sideClass = 'split';
      var otherSideClass = 'split';
      if (clickClass === 'input-collapse') {
        sideClass = 'collapse';
        otherSideClass = 'expand';
      } else if (clickClass === 'input-expand') {
        sideClass = 'expand';
        otherSideClass = 'collapse';
      }
      $(this.$refs[`${side}Input`]).addClass(sideClass);
      $(this.$refs[`${otherSide}Input`]).addClass(otherSideClass);
    }
  }
}
</script>

<style lang="css" src="./static/css/codemirror.css"></style>
<style lang="css" src="./static/css/tomorrow-night.css"></style>
<style lang="css" src="./static/css/main.css" scoped></style>
