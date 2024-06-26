import HomeScreen from "@/src/screens/tabs/HomeScreen";
import { screenOptions } from "../screenOptions";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CoinDetails" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
