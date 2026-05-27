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

export const card = {
  padding: 16,
  borderRadius: 12,
  backgroundColor: "#fff",
  marginBottom: 12,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 6,
  elevation: 3,
};
