import app from "./app";
import {sequelize}  from "./db";
import * as admin from 'firebase-admin';
async function main() {

  try {
    admin.initializeApp();
    await sequelize.authenticate();
    await sequelize.sync({force: false});
    console.log("db connected...");
  } catch (error) {
    console.error(error);
    process.abort();
  }
};

app.listen(process.env.PORT, () => {
  main();
})