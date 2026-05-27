import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { getPendingFarms } from "../store/storage";
import { syncPendingFarms } from "../store/sync";
import { FarmRecord } from "../types/farm";

export default function PendingSyncScreen() {
  const [items, setItems] = useState<FarmRecord[]>([]);

  const load = async () => {
    const data = await getPendingFarms();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSync = async () => {
    await syncPendingFarms();
    await load();
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Pending Sync Queue</Text>

      <Button title="Sync Now" onPress={handleSync} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.farmerName}</Text>
            <Text>{item.nationalId}</Text>
            <Text>{item.commodity}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
