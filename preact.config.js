import transformHookNames from 'babel-plugin-transform-hook-names';

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  let babelConfig = rule.options;
  
  babelConfig.plugins.push(require.resolve('@babel/plugin-transform-react-jsx-source'));
  babelConfig.plugins.push(transformHookNames);
};
