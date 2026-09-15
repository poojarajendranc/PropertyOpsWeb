export type MaintenanceStatus = 
|'Open' |  'Assigned' | 'In Progress' | 'Completed';

export type PriorityStatus = | 'Low' | 'Medium' | 'High';

export interface MaintenanceRequest {
  id: number;
  title: string;
  priority: PriorityStatus;
  status: MaintenanceStatus;
}
