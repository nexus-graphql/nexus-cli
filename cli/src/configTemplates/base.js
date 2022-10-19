export default {
  sources: [
    {
      name: null,
      handler: {
        postgraphile: {
          connectionString: null,
          options: { simpleCollections: "only" },
        },
      },
    },
  ],
};
