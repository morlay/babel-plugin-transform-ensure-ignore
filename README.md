## babel-plugin-transform-ensure-ignore

[![Build Status](https://img.shields.io/travis/morlay/babel-plugin-transform-ensure-ignore.svg?style=flat-square)](https://travis-ci.org/morlay/babel-plugin-transform-ensure-ignore)
[![NPM](https://img.shields.io/npm/v/babel-plugin-transform-ensure-ignore.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-transform-ensure-ignore)
[![Dependencies](https://img.shields.io/david/morlay/babel-plugin-transform-ensure-ignore.svg?style=flat-square)](https://david-dm.org/morlay/babel-plugin-transform-ensure-ignore)
[![License](https://img.shields.io/npm/l/babel-plugin-transform-ensure-ignore.svg?style=flat-square)](https://npmjs.org/package/babel-plugin-transform-ensure-ignore)


`require.ensure` is cool, but we don't need it in Node env.

see more <https://webpack.github.io/docs/code-splitting.html#defining-a-split-point>

this plugin will help to transform code below:

```js
require.ensure([], (require) => {
  require.include('./some-module');
  require('./some-module');
});
```

to
```js
require('./some-module');
```

Configure it in `.babelrc` for node, we could ignore the requirement when run test in node or build server render app.
Then we run babel with `BABEL_ENV=node` will active this plugin;


```js
{
  "env": {
    "node": {
      "plugins": [
        "babel-plugin-transform-ensure-ignore"
      ]
    }
  }
}
```

or use with `babel-register` in require-hooks

```js
require('babel-register')({
  'plugins': [
     'babel-plugin-transform-ensure-ignore'
  ]
});
```

Or with cli like other plugin used.

**Notice:**

* Don't use this in webpack system
* make sure the correct usage of `require.ensure`
