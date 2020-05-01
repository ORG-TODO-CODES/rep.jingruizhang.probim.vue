var path = require('path')
var webpack = require('webpack')

// 获取当前是在测试环境(run dev)还是生产环境(run build)
// -------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;
console.log("-----NODE_ENV===",NODE_ENV);
console.log(`production == NODE_ENV ? => ${NODE_ENV == 'production'}`);

// !! 需要注意的是被替换部分适用于 npm run dev 下测试，如果使用“新的内容”中的代码，则无法在 npm run dev 下运行
/* 需要测试请打开此处 */
// module.exports = {
//   entry: './src/main.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     publicPath: '/dist/',
//     filename: 'build.js'
//   },
/* //需要测试请打开此处 */

/* 需要打包请打开此处 */
module.exports = {
  // 根据不同的执行环境配置不同的入口
  entry: NODE_ENV != 'production' ? './src/main.js' : './src/myPlugin/sumFunction/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: NODE_ENV != 'production'?'build.js': 'sumFunction.js',
    library: NODE_ENV != 'production'?undefined:'sumFunction', // 指定的就是你使用require时的模块名
    libraryTarget: NODE_ENV != 'production'?undefined:'umd', // 指定输出格式
    umdNamedDefine: NODE_ENV != 'production'?undefined:true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
  },
/* //需要打包请打开此处 */

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
