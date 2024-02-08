import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();
const { Pool } = pkg;

// Database connection parameters
const dbParams = {
  user: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  // TODO without this, I got error "no pg_hba.conf entry for host "99.22.221.157", user "postgres", database "code_test", no encryption"
  ssl: {
    rejectUnauthorized: false
  }
};

// Create a new instance of the Pool
const pool = new Pool(dbParams);

export default pool;