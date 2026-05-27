import AsyncStorage from "@react-native-async-storage/async-storage";
import { FarmRecord } from "../types/farm";

const KEY = "PENDING_FARMS";

export const getPendingFarms = async (): Promise<FarmRecord[]> => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const savePendingFarm = async (farm: FarmRecord) => {
  const existingFarms = await getPendingFarms();
  const updatedFarms = [...existingFarms, farm];
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedFarms));
};

export const removePendingFarm = async (id: string) => {
  const existingFarms = await getPendingFarms();
  const updatedFarms = existingFarms.filter((farm) => farm.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedFarms));
};

export const clearPendingFarms = async () => {
  await AsyncStorage.removeItem(KEY);
};
