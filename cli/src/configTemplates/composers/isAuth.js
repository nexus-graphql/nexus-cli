require("dotenv").config();

const { ADMIN_SECRET } = process.env;

function isAuth(next) {
  return (root, args, context, info) => {
    if (context.headers.authorization !== `${ADMIN_SECRET}`) {
      throw new Error("Unauthorized");
    }
    return next(root, args, context, info);
  };
}

module.exports = isAuth;
