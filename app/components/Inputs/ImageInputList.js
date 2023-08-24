import React, { useRef } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef();

  return (
    <ScrollView
      ref={scrollView}
      horizontal
      contentContainerStyle={styles.container} // Use contentContainerStyle instead of wrapping in a View
      onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
      {imageUris.map((uri, i) => (
        <View key={i} style={styles.image}>
          <ImageInput
            imageUri={uri}
            onChangeImage={() => onRemoveImage(uri)}
          />
        </View>
      ))}
      <View style={styles.image}>
        <Text>
          <ImageInput onChangeImage={(uri, file) => onAddImage(uri, file)} />
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20, // Add margin to the bottom of the container
  },
  image: {
    marginRight: 15,
  },
});


export default ImageInputList;
