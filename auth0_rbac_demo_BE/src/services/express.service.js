import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import path from 'path';
import url from 'url';
import cors from 'cors';

/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeFiles = fs
  .readdirSync(__dirname + "/../routes/")
  .filter(
    (file) => file.endsWith(".js")
  );

let server;
let routes = [];

const expressService = {
  init: async () => {
    try {
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      server.use(bodyParser.json());
      server.use(cors());
      server.use(process.env.API_PRFIX, routes);
      server.listen(process.env.SERVER_PORT);
      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;
