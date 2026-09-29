import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createPropertyData, deletePropertyData, getPropertiesList, updatePropertyData } from "../controllers/property.controller.js";

const propertyRoutes = Router();
propertyRoutes.post("/", authenticate, createPropertyData)
propertyRoutes.get("/", authenticate, getPropertiesList)
propertyRoutes.delete("/id", authenticate, deletePropertyData);
propertyRoutes.patch("/:id", authenticate, updatePropertyData)

export default propertyRoutes;