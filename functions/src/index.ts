/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import "reflect-metadata";
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "@config/inversify.config";
import { errorHandlingMiddleware } from "@shared/middleware/error-handling-middleware";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
});

server.setErrorConfig((app) => {
  app.use(errorHandlingMiddleware);
});

const app = server.build();

export const apiV2 = onRequest(app);
