import { execSync } from "child_process";

export default (handlerName) => {
  const handlers = {
    postgres: "@graphql-mesh/postgraphile@0.21.22",
    graphql: "@graphql-mesh/graphql@0.31.24",
  };

  execSync(`npm install ${handlers[handlerName]}`, {
    stdio: "inherit",
    encoding: "utf-8",
  });
};
