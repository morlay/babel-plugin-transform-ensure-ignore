import babelEql from './helpers/babelEql';
import babelPluginTransformEnsureIgnore from '../.';

describe(__filename, () => {
  context('only require.ensure', () => {
    it('should remove require.ensure call expression', () => {
      babelEql(`
        require.ensure([], function (require) {
          require('./some-module');
        });
      `, {
        plugins: [
          babelPluginTransformEnsureIgnore
        ]
      }).eql(`
        require('./some-module');
      `);
    });
    it('should remove require.ensure call expression', () => {
      babelEql(`
        require.ensure([], (require) => {
          require('./some-module');
        });
      `, {
        plugins: [
          babelPluginTransformEnsureIgnore
        ]
      }).eql(`
        require('./some-module');
      `);
    });
  });

  context('with require.include', () => {
    it('should remove require.ensure call expression', () => {
      babelEql(`
        require.ensure([], function (require) {
          require.include('./some-module');
          require('./some-module');
        });
      `, {
        plugins: [
          babelPluginTransformEnsureIgnore
        ]
      }).eql(`
        require('./some-module');
      `);
    });
  });
});
