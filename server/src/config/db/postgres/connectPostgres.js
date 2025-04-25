const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT, DB_PORT, SSL } = require("../../config");

const postgres = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: DB_DIALECT || "postgres",
        port: DB_PORT,
        pool: {
          max: 10,      
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        logging: false,
        timezone: "+05:45",
        dialectOptions: {
          ssl: SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
        },
}) 

const testPostgresConnection = async ()=>{
    try {
        await postgres.authenticate();
        await postgres.sync({ alter: true });
        console.info("👾 Database Synced Successfully.");
        console.log("✅ Connected to Postgres Database...");
    } catch (error) {
        console.error("❌ Unable to connect to Postgres:", error);
    }
}

module.exports = { postgres, testPostgresConnection };