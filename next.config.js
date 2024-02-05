module.exports = {
  async rewrites() {
    return [
      {
        source: "/memo/:id",
        destination: "/memo/page", // Proxy to another server
      },
    ];
  },
};
