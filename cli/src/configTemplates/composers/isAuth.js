const { cwd } = require("process");
const { readFileSync } = require("fs");

const { ADMIN_SECRET } = JSON.parse(readFileSync(`${cwd()}/env.json`));

function isAuth(next) {
  return (root, args, context, info) => {
    if (context.headers.authorization !== `${ADMIN_SECRET}`) {
      throw new Error("Unauthorized");
    }
    return next(root, args, context, info);
  };
}

module.exports = isAuth;
