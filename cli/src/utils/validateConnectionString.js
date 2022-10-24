import pgPromise from "pg-promise";

const initOptions = {
  error(error, e) {
    if (e.cn) {
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};

const pgp = pgPromise(initOptions);

export default async (connectionString) => {
  const db = pgp(connectionString);
  const c = await db.connect(); // try to connect
  c.done(); // success, release connection
  return c.client.serverVersion; // return server version
};
