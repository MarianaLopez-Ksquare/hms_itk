import app from "./app";

import {sequelize}  from "./db";
async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({force: true});
    console.log("db connected...");
  } catch (error) {
    console.error(error);
    process.abort();
  }
};

app.listen(process.env.PORT, () => {
  main();
})