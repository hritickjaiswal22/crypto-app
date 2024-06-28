import { screenOptions } from "../screenOptions";
import NewsDetails from "@/src/screens/stacks/NewsDetails";
import NewsScreen from "@/src/screens/tabs/NewsScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function NewsNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="NewsScreen" component={NewsScreen} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
}

export default NewsNavigation;
