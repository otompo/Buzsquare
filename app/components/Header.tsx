import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../utils/colors";

interface HeaderProps {
  navigation?: any;
  HeaderTitle: string;
  justifyContent?: "space-between" | "flex-start" | "flex-end";
  cartData?: number;
  onPress?: () => void;
  textLeft?: number;
  backIcon?: () => void;
}

const { width } = Dimensions.get("window");

function Header({
  navigation,
  HeaderTitle,
  justifyContent = "space-between",
  cartData,
  onPress,
  textLeft = 100,
  backIcon,
}: HeaderProps) {
  return (
    <SafeAreaView style={styles.headerMain}>
      <View style={[styles.headerInner, { justifyContent }]}>
        {
          <View className="flex flex-row gap-3">
            <TouchableOpacity onPress={backIcon} style={styles.backarrow}>
              {<Icon name="arrow-back" size={20} color="#fff" />}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{HeaderTitle}</Text>
          </View>
        }

        {/* <TouchableOpacity
          onPress={() => navigation.navigate()}
          style={styles.backarrow}
        >
          <Icon name="add-circle" size={20} color="#FFFFFF" />
        </TouchableOpacity>  */}

        {/* <Text style={styles.headerTitle}>{HeaderTitle}</Text> */}
        {/* {HeaderSubTitle && (
          <Text style={[styles.headerSubTitle, { left: textLeft }]}>
            {HeaderSubTitle}
          </Text>
        )} */}
      </View>
      {cartData !== undefined && (
        <TouchableOpacity style={styles.cartDataStyle} onPress={onPress}>
          <Text style={{ color: colors.white, fontWeight: "500" }}>
            {cartData}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerMain: {
    width: width,
    height: width / 4 - 35,
    backgroundColor: "#FFFFFF",
    // elevation: 8,
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: "relative",
    zIndex: 10,
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Added alignItems to center vertically
    textAlign: "center",
  },
  headerTitle: {
    color: "#93cd33",
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "500",
  },
  headerSubTitle: {
    position: "absolute",
    color: "#fff",
    textTransform: "uppercase",
    top: 0,
    left: 100,
  },
  cartDataStyle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 30,
  },
  backarrow: {
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: "#93cd33",
    justifyContent: "center",
    alignItems: "center",
  },
});
