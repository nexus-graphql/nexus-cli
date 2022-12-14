import { execSync } from "child_process";

export default (handlerName) => {
  const handlers = {
    postgres: "@graphql-mesh/postgraphile@0.21.22",
    graphql: "@graphql-mesh/graphql@0.31.24",
    openapi: "@graphql-mesh/openapi",
  };

  execSync(`npm install ${handlers[handlerName]} --loglevel=error`, {
    /* stdio: "inherit", */
    encoding: "utf-8",
  });
};
