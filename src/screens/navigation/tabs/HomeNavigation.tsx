import HomeScreen from "@/src/screens/tabs/HomeScreen";
import { screenOptions } from "../screenOptions";
import CoinDetailsScreen from "@/src/screens/stacks/CoinDetails";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
