import pgPromise from "pg-promise";

const pgp = pgPromise();

export default async (connectionString) => {
  try {
    const db = pgp(connectionString);
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return true;
  } catch (e) {
    throw new Error(e.message);
  } finally {
    pgp.end();
  }
};
