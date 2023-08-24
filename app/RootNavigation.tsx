import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/native-stack";
import SigninScreen from "./screens/Signin";
import AddFeedScreen from "./screens/AddFeed";
import SingleFeedScreen from "./screens/SingleFeed";
import { AuthContext } from "./context/authContext";
import TabNavigatorScreen from "./components/navigation/Tabs";

export type RootStackParamList = {
  Login: undefined;
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <ScreensNav />
    </NavigationContainer>
  );
};
function ScreensNav() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const [auth, setAuth] = useContext(AuthContext);

  const authenticated = auth && auth?.token !== "";
  // console.log(auth);
  return (
    <Stack.Navigator
      options={{
        cardStyleInterpolator: CardStyleInterpolators?.forHorizontalIOS,
      }}
      initialRouteName="Signin"
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="TabsRoot"
            component={TabNavigatorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddFeed"
            component={AddFeedScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SingleFeed"
            component={SingleFeedScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={SigninScreen}
          />
          {/* <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgetPassword"
          component={ForgetPasswordScreen}
        /> */}
        </>
      )}
    </Stack.Navigator>
  );
}
export default RootNavigation;
