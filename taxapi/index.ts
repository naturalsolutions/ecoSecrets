import express from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { expressRouter, docSwagger, root } from "./tapis";
import "./taxrefCtrl";
import fs from "fs";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cors());

// documentation complete
docSwagger.servers.push({
  url: "http://localhost:5666/",
  description: "Local server",
});

app.use(expressRouter);
app.use("/doc", swaggerUi.serve, swaggerUi.setup(docSwagger));

fs.writeFile("./openapi.json", JSON.stringify(docSwagger), () => {});

app.listen(5666, "0.0.0.0", () => {
  console.log(`Server Up on localhost:5666`);
});
