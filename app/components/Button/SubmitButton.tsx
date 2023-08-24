import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "../../utils/colors";

interface SubmitButtonProps {
  title: string;
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
  bwidth?: number | string;
  bcolor?: string;
}

function SubmitButton({
  title,
  loading = false,
  onPress,
  disabled = false,
  bwidth = "100%",
  bcolor = "#1bc10d",
}: SubmitButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 0.5 : 1}
      style={[styles.button, { backgroundColor: bcolor, width: bwidth }]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    color: colors.white,
    // textTransform: "uppercase",
    fontWeight: "bold",
  },
});
