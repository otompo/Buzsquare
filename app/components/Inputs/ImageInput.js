import React, { useEffect } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import colors from "../../utils/colors";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onChangeImage }) {
  // useEffect(() => {
  //   requestPermission();
  // }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (result.canceled) {
        // User cancelled the image selection
        return;
      }

      let selectedUri = null;

      if (result.assets && result.assets.length > 0) {
        // Use the first asset's uri
        selectedUri = result.assets[0].uri;
      }

      onChangeImage(selectedUri);
    } catch (error) {
      console.error('Error reading an image', error);
    }
  };




  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <Icon
            color={colors.medium}
            name="image"
            size={70}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri.uri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
