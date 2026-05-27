import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmReg from "./source/screens/FarmReg";
import PendingSyncScreen from "./source/screens/PendingSyncScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={FarmReg} />
        <Stack.Screen name="Pending" component={PendingSyncScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
