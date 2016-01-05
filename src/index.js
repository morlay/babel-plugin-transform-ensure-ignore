// make sure require.ensure([], () => {});
function isRequireEnsureCallExpression(nodePath) {
  const callee = nodePath.get('callee');
  return callee.isMemberExpression() &&
    callee.get('property').equals('name', 'ensure') &&
    callee.get('object').equals('name', 'require') &&
    nodePath.get('arguments')[0].isArrayExpression() &&
    (
      nodePath.get('arguments')[1].isFunctionExpression() ||
      nodePath.get('arguments')[1].isArrowFunctionExpression()
    );
}

// make sure require.include('')
function isRequireIncludeCallExpression(nodePath) {
  const callee = nodePath.get('callee');
  return callee.isMemberExpression() &&
    callee.get('property').equals('name', 'include') &&
    callee.get('object').equals('name', 'require');
}


export default function () {
  const requireIncludeVisitor = {
    CallExpression(nodePath) {
      if (isRequireIncludeCallExpression(nodePath)) {
        nodePath.remove();
      }
    }
  };

  return {
    visitor: {
      CallExpression: {
        enter(nodePath) {
          if (isRequireEnsureCallExpression(nodePath)) {
            nodePath.replaceWith(nodePath.get('arguments')[1].get('body'));
            nodePath.traverse(requireIncludeVisitor);
          }
        }
      }
    }
  };
}
