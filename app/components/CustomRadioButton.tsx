import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Replace with your icon library

interface CustomRadioButtonProps {
  value: string;
  label: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  value,
  label,
  selectedValue,
  onChange,
}) => {
  const handlePress = () => {
    onChange(value);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: selectedValue === label ? "#93cd33" : "#888",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        {selectedValue === label && (
          <Icon name="check" size={12} color="#93cd33" />
        )}
      </View>
      <Text style={{ marginLeft: 8, marginBottom: 8 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
