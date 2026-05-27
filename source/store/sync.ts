import NetInfo from "@react-native-community/netinfo";
import { getPendingFarms, removePendingFarm } from "./storage";
import { registerFarm } from "./api";

export const syncPendingFarms = async () => {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    throw new Error(
      "No internet connection. Please connect to the internet to sync pending farms.",
    );
  }

  const pending = await getPendingFarms();

  for (const farm of pending) {
    try {
      await registerFarm(farm);
      await removePendingFarm(farm.id);
    } catch (error) {
      console.error(`Failed to sync farm for ${farm.farmerName}:`, error);
    }
  }
};
