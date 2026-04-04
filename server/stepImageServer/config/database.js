const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("OperatorGuidenceHandleBar", "postgres", "bajaj", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;

// npm install sequelize    -----is a ORM
// npm install pg pg-hstore -----is driver 

// The pg package is the official PostgreSQL client for Node.js. It allows your Node.js app to communicate with a PostgreSQL database.

// Sequelize is an ORM (Object Relational Mapper), which means it talks to databases for you,
//  but it still needs a database driver under the hood. For PostgreSQL, that driver is pg.

// pg → the core PostgreSQL client.

// pg-hstore → a small helper package that lets Sequelize store JSON objects in PostgreSQL hstore format.

// Without pg, Sequelize cannot connect to a PostgreSQL database, which is why you see:

