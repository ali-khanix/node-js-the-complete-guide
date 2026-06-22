import { Pool } from "pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  database: "node_complete",
  password: "Ali$#6152168",
});

export default pool;
