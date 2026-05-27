import { StyleProp, TextStyle } from "react-native";

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
  // createdAt: string; //save the exact time the farmer created the record
}
