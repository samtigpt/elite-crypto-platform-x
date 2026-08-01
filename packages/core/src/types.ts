export type ID = string;

export type Timestamp = string;

export interface EntityMetadata {
  id: ID;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface HealthStatus {
  service: string;
  healthy: boolean;
  timestamp: Timestamp;
}