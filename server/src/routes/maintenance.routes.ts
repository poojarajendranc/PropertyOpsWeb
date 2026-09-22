import { Router } from "express";
import { createMaintenance, deleteMaintenance, getMaintenance, updateMaintenance } from "../controllers/maintenance.controller.js";
import { createMaintenanceSchema, updateMaintenanceSchema } from "../schemas/maintenance.schema.js";
import validate from "../middleware/validate.js";
import authenticate from "../middleware/auth.middleware.js";

const maintenanceRoutes  = Router();
maintenanceRoutes.get("/",authenticate, getMaintenance);
maintenanceRoutes.post("/",authenticate, validate(createMaintenanceSchema), createMaintenance);
maintenanceRoutes.patch("/:id",authenticate,validate(updateMaintenanceSchema) ,updateMaintenance)
maintenanceRoutes.delete("/:id",authenticate,deleteMaintenance)

export default maintenanceRoutes;