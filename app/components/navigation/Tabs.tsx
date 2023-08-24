import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../../screens/Home";
import GamesScreen from "../../screens/Games";
import RideScreen from "../../screens/Ride";
import ChatScreen from "../../screens/Chat";
import BusinessScreen from "../../screens/Business";

import colors from "../../utils/colors";
import { Dimensions } from "react-native";

var { width, height } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

export default AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="AmbulanceRequest"
    screenOptions={{
      tabBarStyle: { height: height / 8 - 20 },
      tabBarActiveTintColor: "#93cd33",
      tabBarInactiveTintColor: colors.inactive,
      tabBarLabelStyle: { fontSize: 12, fontWeight: "400" },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MIcon name="home" size={size} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Games"
      component={GamesScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="game-controller" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Ride"
      component={RideScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="bus" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="chatbubble-sharp" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Business"
      component={BusinessScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="briefcase" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
