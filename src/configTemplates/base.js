export default {
  sources: [
    {
      name: null,
      handler: {
        postgraphile: {
          connectionString: null,
          options: { simpleCollections: "only" },
          appendPlugins: ["postgraphile-plugin-connection-filter"],
        },
      },
    },
  ],
  transforms: [
    {
      resolversComposition: {
        mode: "wrap",
        compositions: [
          { resolver: "Query.*", composer: "./src/composers/isAuth.js#isAuth" },
          {
            resolver: "Mutation.*",
            composer: "./src/composers/isAuth.js#isAuth",
          },
          {
            resolver: "Subscription.*",
            composer: "./src/composers/isAuth.js#isAuth",
          },
        ],
      },
    },
  ],
  additionalResolvers: null,
  additionalTypeDefs: null,
  serve: { browser: false, playgroundTitle: "Nexus" },
};
