import pool from '../db/connection.js';
import type { MaintenanceStatus, PriorityStatus } from '../types/maintenance.js';

interface CreateMaintenanceRequest {
    title: string;
    priority: PriorityStatus;
    status: MaintenanceStatus;
    description?: string;
}

export const getMaintenanceRequests = async () => {
    const [rows] = await pool.query(`
        SELECT 
        id,
        title,
         priority,
          status,
           description
        FROM maintenance_requests 
        ORDER BY created_at DESC`);
    return rows;
}

export const createMaintenanceRequest = async (request: CreateMaintenanceRequest) => {
    const [result] = await pool.execute(`INSERT INTO maintenance_requests
        (title,priority,status,description)
        VALUES (?,?,?,?)`,
        [
            request.title,
            request.priority,
            request.status,
            request.description ?? null,

        ])
    return result;

}

export const updateMaintenanceStatus = async (id: number, status: CreateMaintenanceRequest["status"]) => {
    const [result] = await pool.execute(`
        UPDATE maintenance_requests SET status = ?
        WHERE id = ?`, [status, id])
    return result;
}

export const deleteMaintenanceRequest = async (id:number) => {
    const [result] = await pool.execute(`DELETE FROM maintenance_requests
        WHERE id= ?`,
    [id])
    return result;
}