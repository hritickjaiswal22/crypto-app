import { screenOptions } from "../screenOptions";
import HomeNavigation from "./HomeNavigation";
import NewsNavigation from "./NewsNavigation";
import MarketScreen from "@/src/screens/tabs/MarketScreen";
import SearchScreen from "@/src/screens/tabs/SearchScreen";
import ProfileScreen from "@/src/screens/tabs/ProfileScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let iconname:
              | "home"
              | "stats-chart-outline"
              | "search-outline"
              | "newspaper-outline"
              | "person-outline";

            if (route.name === "Home") iconname = "home";
            else if (route.name === "Market") iconname = "stats-chart-outline";
            else if (route.name === "Search") iconname = "search-outline";
            else if (route.name === "News") iconname = "newspaper-outline";
            else iconname = "person-outline";

            const customSize = 25;

            return (
              <Ionicons
                name={iconname}
                size={customSize}
                color={focused ? "#164b48" : "gray"}
              />
            );
          },
          tabBarActiveTintColor: "#164b48",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          ...screenOptions,
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigation} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="News" component={NewsNavigation} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigation;
