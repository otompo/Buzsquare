import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import AppTextInput from "../components/Inputs/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Entypo";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { API_URL } from "../api/baseURL";

interface SigninProps {
  navigation: any;
}
export default function Signin({ navigation }: SigninProps) {
  const fadeValue = React.useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fadeIn = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => navigation.navigate("ForgetPassword"));
  };
  const fadeOut = () => {
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => navigation.navigate("Signup"));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "All fields are required",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("All fields are required");
      }
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(API_URL + `/user/login`, {
        username: email,
        password,
      });
      setAuth(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setLoading(false);

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "Success",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("Success");
      }
    } catch (err) {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          err?.response?.data?.message,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert(err?.response?.data?.message);
      }
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary relative">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={require("../assets/logo.png")}
            className=" w-[240px] h-[110px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex justify-center items-center">
          <Image
            source={require("../assets/welcome.jpg")}
            className=" w-[300px] h-80"
            resizeMode="cover"
          />
          <Text className="text-black font-bold text-3xl py-2">
            Welcome Back
          </Text>
        </View>
        <View className="p-5 relative">
          <AppTextInput
            autoCapitalize="none"
            placeholder="Username or Email *"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            setValue={setEmail}
          />

          <AppTextInput
            autoCapitalize="none"
            value={password}
            setValue={setPassword}
            placeholder="Password..."
            secureTextEntry={!showPassword}
            textContentType="password"
          />
          <TouchableOpacity className="absolute inset-y-0 right-5 top-28 flex items-center pr-2">
            {showPassword ? (
              <Icon
                name="eye-with-line"
                size={25}
                className="text-gray-400 cursor-pointer"
                onPress={togglePasswordVisibility}
              />
            ) : (
              <Icon
                name="eye"
                size={25}
                className="text-gray-400 cursor-pointer"
                onPress={togglePasswordVisibility}
              />
            )}
          </TouchableOpacity>
          <SubmitButton
            title="Sign in"
            onPress={handleSubmit}
            loading={loading}
            bwidth="100%"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={fadeIn}>
              <Text className="text-gray-600">Forget Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fadeOut}>
              <Text className="text-gray-600">Do not have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
