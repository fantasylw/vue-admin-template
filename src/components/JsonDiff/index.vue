<template>
  <div>
  <body>
    <link rel="stylesheet" href="https://json-diff.com/www/lib/codemirror/lib/codemirror.csss" charset="utf-8">
    <link rel="stylesheet" href="https://json-diff.com/www/lib/codemirror/theme/tomorrow-night.css" charset="utf-8">
    <link rel="stylesheet" href="https://json-diff.com/css/main.css?cachebust=1" charset="utf-8">
    <div class="right" hidden="true">
      <span id="error-message" style="display:none;"></span>
      <label class="menu-item">light theme <input id="lighttheme-toggle" type="checkbox"/></label>

    </div>
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
   
  </body>
</div>

</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="https://json-diff.com/www/lib/fast-json-patch/dist/json-patch-duplex.min.js" charset="utf-8"></script>
<script src="https://json-diff.com/www/lib/backbone-events-standalone/backbone-events-standalone.min.js" charset="utf-8"></script>
<script src="https://json-diff.com/www/lib/codemirror/lib/codemirror.js" charset="utf-8"></script>
<script src="https://json-diff.com/www/lib/codemirror/lib/util/formatting.js" charset="utf-8"></script>
<script src="https://json-diff.com/www/lib/codemirror/mode/javascript/javascript.js" charset="utf-8"></script>
<script src="https://json-diff.com/www/lib/codemirror/addon/edit/matchbrackets.js" charset="utf-8"></script>
<script src="https://json-diff.com/js/main.js" charset="utf-8"></script>
<script>
export default {
  name: 'json-diff',
  data() {return {}}
}
</script>