import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.dark,
    width: "100%",
    fontSize: 18,
    paddingLeft: 10,
    fontFamily: Platform.OS === "andriod" ? "Roboto" : "Roboto",
  },
};
