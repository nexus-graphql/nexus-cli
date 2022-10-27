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
};