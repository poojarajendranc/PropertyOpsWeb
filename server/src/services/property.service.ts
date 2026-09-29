import pool from "../db/connection.js"

interface CreatePropertyRequest {
    name: string,
    location: string,
    latitude: string,
    longitude: string,
    countryCode: string,
    contactNumber: string,
}

export const getProperties = async () => {
    const [rows] = await pool.query(`SELECT id,
        name,
        location,
        latitude,
        longitude,
        countryCode,
        contactNumber FROM properties ORDER BY created_at DESC`);
    return rows;
}

export const createProperty = async (request: CreatePropertyRequest) => {
    const [result] = await pool.execute(`INSERT INTO properties(name,
        location,latitude, longitude,countryCode, contactNumber) VALUES (?,?,?,?,?,?)`,
        [request.name,
        request.location,
        request.latitude,
        request.longitude,
        request.countryCode,
        request.contactNumber
        ])

    return result;

}

export const deleteProperty = async (id: number) => {
    const [result] = await pool.execute(`DELETE FROM properties WHERE id= ?`, [id]);
    return result;

}

export const updateProperty = async () => {
    const [result] = await pool.execute(`UPDATE properties `);
    return result;
}

// export const updateMaintenanceStatus = async (id: number, status: CreateMaintenanceRequest["status"]) => {
//     const [result] = await pool.execute(`
//         UPDATE maintenance_requests SET status = ?
//         WHERE id = ?`, [status, id])
//     return result;
// }
