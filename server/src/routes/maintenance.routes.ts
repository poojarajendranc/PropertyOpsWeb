import { Router } from "express";
import { createMaintenance, deleteMaintenance, getMaintenance, updateMaintenance } from "../controllers/maintenance.controller.js";
import { createMaintenanceSchema, updateMaintenanceSchema } from "../schemas/maintenance.schema.js";
import validate from "../middleware/validate.js";

const maintenanceRoutes  = Router();
maintenanceRoutes.get("/",getMaintenance);
maintenanceRoutes.post("/", validate(createMaintenanceSchema), createMaintenance);
maintenanceRoutes.patch("/:id",validate(updateMaintenanceSchema) ,updateMaintenance)
maintenanceRoutes.delete("/:id",deleteMaintenance)

export default maintenanceRoutes;