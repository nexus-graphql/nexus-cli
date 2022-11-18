module.exports = {
  name: null,
  handler: {
    postgraphile: {
      connectionString: null,
      options: { simpleCollections: "only" },
      appendPlugins: ["postgraphile-plugin-connection-filter"],
    },
  },
};
