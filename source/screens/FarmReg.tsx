import React, { useMemo, useState } from "react";
import { Alert, Switch, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Picker } from "@react-native-picker/picker";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { registerFarm } from "../store/api";
import { savePendingFarm } from "../store/storage";
import { getCurrentLocation } from "../store/location";
import { Commodity, FarmRecord } from "../types/farm";
import { card } from "../components/types";
import { styles } from "./styles";

export default function FarmReg() {
  const [loading, setLoading] = useState(false);

  const [farmerName, setFarmerName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [commodity, setCommodity] = useState<Commodity>("cocoa");
  const [farmSize, setFarmSize] = useState("");
  const [consent, setConsent] = useState(false);

  const [gps, setGps] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [errors, setErrors] = useState<any>({});

  const validateNationalId = (id: string) => {
    return /^NG-\d{10}$/.test(id);
  };

  const clearError = (field: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!farmerName.trim()) {
      newErrors.farmerName = "Farmer name is required.";
    }

    if (!validateNationalId(nationalId)) {
      newErrors.nationalId = "National ID must follow the format NG-1234567890";
    }

    if (!commodity) {
      newErrors.commodity = "Commodity is required.";
    }

    const farmSizeNumber = Number(farmSize);

    if (!farmSize || isNaN(farmSizeNumber)) {
      newErrors.farmSize = "Valid farm size is required.";
    } else if (farmSizeNumber <= 0) {
      newErrors.farmSize = "Farm size must be greater than 0.";
    } else if (farmSizeNumber > 100) {
      newErrors.farmSize = "Farm size cannot exceed 100 hectares.";
    }

    if (!consent) {
      newErrors.consent = "Consent is required.";
    }

    if (!gps) {
      newErrors.gps = "Farm location is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCaptureLocation = async () => {
    try {
      const location = await getCurrentLocation();
      setGps(location);
      clearError("gps");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const record: FarmRecord = {
      id: Date.now().toString(),
      farmerName,
      nationalId,
      commodity,
      farmSize: Number(farmSize),
      consent,
      gps: gps!,
      status: "PENDING_SYNC",
    };

    setLoading(true);

    try {
      const net = await NetInfo.fetch();

      if (net.isConnected) {
        await registerFarm(record);

        Alert.alert("Success", "Farm registered successfully");
      } else {
        await savePendingFarm(record);

        Alert.alert(
          "Saved Offline",
          "No internet. Record saved and will sync later.",
        );
      }

      // reset
      setFarmerName("");
      setNationalId("");
      setCommodity("cocoa");
      setFarmSize("");
      setConsent(false);
      setGps(null);
      setErrors({});
    } catch (err) {
      Alert.alert("Error", "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  // disable logic
  const isFormIncomplete = useMemo(() => {
    return (
      !farmerName.trim() ||
      !validateNationalId(nationalId) ||
      !farmSize ||
      isNaN(Number(farmSize)) ||
      Number(farmSize) <= 0 ||
      Number(farmSize) > 100 ||
      !consent ||
      !gps
    );
  }, [farmerName, nationalId, farmSize, consent, gps]);

  return (
    <View style={[card, { flex: 1 }]}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Farm Registration
      </Text>

      <FormInput
        label="Farmer Name"
        value={farmerName}
        onChangeText={(text) => {
          setFarmerName(text);
          clearError("farmerName");
        }}
        error={errors.farmerName}
      />

      <FormInput
        label="National ID (NG-1234567890)"
        value={nationalId}
        onChangeText={(text) => {
          let cleaned = text.toUpperCase();
          if (!cleaned.startsWith("NG-")) {
            cleaned = "NG-" + cleaned.replace(/[^0-9]/g, "");
          } else {
            const numericPart = cleaned
              .replace("NG-", "")
              .replace(/[^0-9]/g, "")
              .slice(0, 10);

            cleaned = `NG-${numericPart}`;
          }

          setNationalId(cleaned);
          clearError("nationalId");
        }}
        error={errors.nationalId}
      />

      <FormInput
        label="Farm Size (hectares)"
        value={farmSize}
        keyboardType="numeric"
        onChangeText={(text) => {
          const cleaned = text.replace(/[^0-9.]/g, "");

          if (Number(cleaned) <= 100 || cleaned === "") {
            setFarmSize(cleaned);
          }

          clearError("farmSize");
        }}
        error={errors.farmSize}
      />

      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Commodity</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 16,
        }}
      >
        <Picker
          selectedValue={commodity}
          onValueChange={(value) => {
            setCommodity(value);
            clearError("commodity");
          }}
        >
          <Picker.Item label="Cocoa" value="cocoa" />
          <Picker.Item label="Cashew" value="cashew" />
          <Picker.Item label="Coffee" value="coffee" />
          <Picker.Item label="Shea" value="shea" />
          <Picker.Item label="Sesame" value="sesame" />
        </Picker>
      </View>

      <Button title="Capture Location" onPress={handleCaptureLocation} />

      {gps && (
        <Text
          style={{
            marginTop: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          GPS: {gps.latitude.toFixed(5)}, {gps.longitude.toFixed(5)}
        </Text>
      )}

      {errors.gps && (
        <Text style={{ color: "red", marginBottom: 10 }}>{errors.gps}</Text>
      )}

      <View style={[card, { marginVertical: 12 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={consent}
            onValueChange={(value) => {
              setConsent(value);
              clearError("consent");
            }}
          />

          <Text style={{ marginLeft: 10, flex: 1 }}>
            I confirm this farmer has given verbal consent to data collection
          </Text>
        </View>
      </View>

      {errors.consent && (
        <Text style={{ color: "red", marginBottom: 10 }}>{errors.consent}</Text>
      )}

      <View style={{ marginTop: 10 }}>
        <Button
          title={loading ? "Submitting..." : "Submit"}
          onPress={handleSubmit}
          style={[
            styles.button,
            {
              opacity: isFormIncomplete || loading ? 0.5 : 1,
            },
          ]}
          disabled={isFormIncomplete || loading}
        />
      </View>
    </View>
  );
}
