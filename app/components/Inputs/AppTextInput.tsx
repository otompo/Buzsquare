import React from "react";
import { View, TextInput, StyleSheet, TextStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import defaultStyles from "../../utils/styles";

interface AppTextInputProps {
  icon?: string;
  placeholder?: string;
  value: string;
  setValue: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "none";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  width?: string | number;
  textContentType?:
    | "none"
    | "username"
    | "password"
    | "emailAddress"
    | "telephoneNumber";
  editable?: boolean;
}

function AppTextInput({
  icon,
  placeholder,
  value,
  setValue,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  width = "100%",
  textContentType = "none",
  editable = true,
}: AppTextInputProps) {
  return (
    <View style={[styles.container, { width: width }]}>
      {icon && (
        <Icon
          name={icon}
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={styles.input} // Use styles.input for TextInput style
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType} // Use the correct type for keyboardType
        textContentType={textContentType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
        editable={editable}
        autoCompleteType="off"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 1,
    flexDirection: "row",
    height: 50,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderColor: "#5C5C5CEA",
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    color: defaultStyles.colors.black,
    width: "100%",
    fontSize: 18,
    paddingLeft: 10,
  },
});

export default AppTextInput;
