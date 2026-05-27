export type Commodity = "cocoa" | "cashew" | "coffee" | "shea" | "sesame";

export interface FarmRecord {
  id: string;
  farmerName: string;
  nationalId: string;
  gps: {
    latitude: number;
    longitude: number;
  } | null;
  commodity: Commodity;
  farmSize: number; //hectares
  consent: boolean;
  status: "PENDING_SYNC" | "SYNCED";
  createdAt: string; //
}
