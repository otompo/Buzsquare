import { LogBox, StatusBar } from "react-native";
import RootNavigation from "./app/RootNavigation";
import { AuthProvider } from "./app/context/authContext";
import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";

LogBox.ignoreAllLogs(true);
export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#1bc10d" style="dark" />

      <RootNavigation />
    </AuthProvider>
  );
}
