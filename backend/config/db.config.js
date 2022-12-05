// Configuration for database connection - data comes from .env file included by docker compose

module.exports = {
  host: process.env.DB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: process.env.MARIADB_DATABASE
}
