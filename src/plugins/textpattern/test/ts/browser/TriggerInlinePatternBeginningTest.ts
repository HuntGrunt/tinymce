import { Pipeline, Step, Log } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock';
import { TinyApis, TinyLoader } from '@ephox/mcagar';

import TextpatternPlugin from 'tinymce/plugins/textpattern/Plugin';
import Theme from 'tinymce/themes/silver/Theme';

import Utils from '../module/test/Utils';

UnitTest.asynctest(
  'browser.tinymce.plugins.textpattern.TriggerInlinePatternBeginningTest', (success, failure) => {

    Theme();
    TextpatternPlugin();

    TinyLoader.setup(function (editor, onSuccess, onFailure) {
      const tinyApis = TinyApis(editor);
      // var tinyActions = TinyActions(editor);

      const steps = Utils.withTeardown([
        Log.stepsAsStep('TBA', 'TextPattern: enter after first * in *a*', [
          tinyApis.sSetContent('<p>*a*</p>'),
          tinyApis.sFocus,
          tinyApis.sSetCursor([0, 0], 1),
          Step.sync(function () {
            editor.fire('keydown', { keyCode: 13 });
          }),
          tinyApis.sAssertContent('<p>*</p><p>a*</p>')
        ]),
        Log.stepsAsStep('TBA', 'TextPattern: enter after first * in *a*', [
          tinyApis.sSetContent('<p><strong>a</strong>*b*</p>'),
          tinyApis.sFocus,
          tinyApis.sSetCursor([0, 1], 1),
          Step.sync(function () {
            editor.fire('keydown', { keyCode: 13 });
          })
        ])
      ], tinyApis.sSetContent(''));

      Pipeline.async({}, steps, onSuccess, onFailure);
    }, {
      plugins: 'textpattern',
      toolbar: 'textpattern',
      indent: false,
      skin_url: '/project/js/tinymce/skins/ui/oxide'
    }, success, failure);
  }
);