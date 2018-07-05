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