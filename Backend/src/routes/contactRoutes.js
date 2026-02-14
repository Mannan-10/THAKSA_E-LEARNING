import express from "express";
import { submitContactForm } from "../controller/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/contact", submitContactForm);

export default contactRouter;
