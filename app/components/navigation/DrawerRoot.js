import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../../screens/Home";
import HistoryScreen from "../../screens/History";
import ProfileScreen from "../../screens/Profile";
import DraftScreen from "../../screens/Draft";
import HelpScreen from "../../screens/Help";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../utils/colors";
import DrawerItems from "./DrawerItems";

const Drawer = createDrawerNavigator();
function DrawerRoot(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
      drawerContent={(props) => <DrawerItems {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="speedometer"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="history"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Draft"
        component={DraftScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="format-page-break"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="account"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Icon
              name="help-circle"
              size={25}
              style={{ marginBottom: 3, alignSelf: "center" }}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerRoot;

const styles = StyleSheet.create({});
