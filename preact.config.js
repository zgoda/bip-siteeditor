import transformHookNames from 'babel-plugin-transform-hook-names';
import { DefinePlugin } from 'webpack';

export default (config, env, helpers) => {
  let { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  let babelConfig = rule.options;
  
  babelConfig.plugins.push(require.resolve('@babel/plugin-transform-react-jsx-source'));
  babelConfig.plugins.push(transformHookNames);

  config.plugins.push(
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  )

  config.node = {
    console: false,
    global: true,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true    
  }
}
