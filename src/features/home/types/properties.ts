export interface PropertyRequest {
    id?: number;
    name: string,
    location: string,
    latitude?: string | null,
    longitude?: string | null,
    contact_number: string,
    isSelected?:boolean
}
