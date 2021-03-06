const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    contentBase: '.',
    inline: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: path.resolve(__dirname, 'static')
  },
  externals: {
    'MorphSVGPlugin': true,
    'TweenLite': true,
    'TweenMax': true,
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      modules: path.resolve(__dirname, 'src/modules'),
      views: path.resolve(__dirname, 'src/views'),
      services: path.resolve(__dirname, 'src/services'),
      gsap: path.resolve(__dirname, 'src/gsap')
    },
    modules: [
      __dirname,
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('stylelint'),
                require('precss'),
                require('postcss-cssnext')
              ]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loaders: ['babel-loader', 'svg-react-loader']
      }
    ]
  }
};
