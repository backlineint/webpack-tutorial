const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host, // defaults to localhost
    port, // defaults to 8080
    open: true,
    overlay: true,
    hotOnly: true,
  },
});

exports.purifyCSS = ({ paths }) => ({ 
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [ 
      {
        test: /\.css$/,
        include,
        exclude,
          use: ["style-loader", "css-loader"],
        },
      ], },
});

exports.loadSCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include, 
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")()],
            },
          },
          'sass-loader',
        ],
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return { 
    module: {
      rules: [ 
        {
          test: /\.css$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ], 
    },
    plugins: [plugin],
  };
};

exports.extractSCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
  });

  return { 
    module: {
      rules: [ 
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")()],
              },
            },
            'sass-loader',
          ]
        },
      ], 
    },
    plugins: [plugin],
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});