import pgPromise from "pg-promise";

const pgp = pgPromise();

export default async (connectionString) => {
  try {
    const db = pgp(connectionString);
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return { isValid: true };
  } catch (e) {
    return { isValid: false, message: e.message };
  }
};
