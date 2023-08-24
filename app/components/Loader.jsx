import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../utils/colors";

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = "Loading..." }: LoaderProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  message: {
    color: colors.white,
    marginTop: 10,
  },
});

export default Loader;
