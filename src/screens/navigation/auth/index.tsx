import SplashScreen from "@/src/screens/auth/SplashScreen";
import LoginScreen from "@/src/screens/auth/LoginScreen";
import { screenOptions } from "@/src/contants/screenOptions";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
