import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Platform,
  AlertIOS,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import colors from "../utils/colors";
import SubmitButton from "../components/Button/SubmitButton";
import CustomRadioButton from "../components/CustomRadioButton";
import * as ImagePicker from "expo-image-picker";
import { makeRequest } from "../api/axios";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { API_URL } from "../api/baseURL";

interface AddFeedProps {
  navigation: any;
}
function AddFeed({ navigation }: AddFeedProps) {
  const [auth, setAuth] = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedValue, setSelectedValue] = useState<string>("Yes");
  const [addProject, setAddProject] = useState<string>("Yes");
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  console.log(image);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };
  const handleAddProjectChange = (value: string) => {
    setAddProject(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    // formData.append("file", selectedFile);
    // post_type: "activity_post",
    // tagged_friends: [null],
    // category: "Academic leader",
    // name: "",
    // biography: "",
    // impact: "",
    // notify_nominee: "no",
    // add_project: "no",
    // project: "",
    // user_status: "",
    // privacy: 4,
    formData.append("name", "");
    formData.append("biography", "photo");
    formData.append("biography", "photo");
    formData.append("category", "photo");
    formData.append("post_type", uploadImage);
    formData.append("notify_nominee", "no");
    formData.append("project", "no");
    formData.append("notify_nominee", "no");
    formData.append("user_status", "no");
    formData.append("privacy", "4");
    formData.append("photo_type", "photo");

    // if (uploadImage) {
    //   const localUri = uploadImage;
    //   const filename = localUri.split("/").pop();
    //   formData.append("file", {
    //     uri: localUri,
    //     name: filename,
    //     type: "image/jpeg",
    //   });

    try {
      const { data } = await makeRequest.post(`/feed`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.token}`,
        },
      });

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
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      // alert(err);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    setUploadImageLoading(true);
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      // console.log(permissionResult);
      if (permissionResult.granted !== true) {
        alert("Camera access is required");
        return;
      }
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
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
      const formData = new FormData();
      setUploadImage(selectedUri);
      if (uploadImage) {
        const localUri = uploadImage;
        const filename = localUri.split("/").pop();
        // formData.append("file", localUri);
        formData.append("file", {
          uri: selectedUri,
          name: filename,
          type: "image/jpeg",
        });
        // console.log(localUri);
        const response = await axios.post(
          API_URL + `/file`,
          {
            file: localUri,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setImage(response.data);
        setUploadImageLoading(false);
      }
    } catch (error) {
      console.log(error?.response.data.message);
      setUploadImageLoading(false);
    }
  };
  return (
    <>
      <Header
        backIcon={() => navigation.goBack()}
        HeaderTitle="Honor / Gratitude"
      />
      <SafeAreaView className="flex-1 bg-[#ffffff] p-4">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex flex-col gap-11"
        >
          <View style={styles.container}>
            <Picker
              mode="dropdown"
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Categories..." value="" />
              <Picker.Item label="Public" value="public" />
              <Picker.Item label="Community" value="community" />
              <Picker.Item label="Friends" value="friends" />
              <Picker.Item
                label="Friends of Friends"
                value="friendsoffriends"
              />
              <Picker.Item label="Only Me" value="onlyme" />
            </Picker>
          </View>

          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 8,
              fontSize: 16,
              borderColor: colors.black,
              textAlignVertical: "top",
              height: 50,
              width: 320,
              marginTop: 10,
            }}
            multiline
            placeholder="Name..."
            // value={value}
            // onChangeText={onChange}
            editable
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 8,
              fontSize: 16,
              borderColor: colors.black,
              textAlignVertical: "top",
              height: 50,
              width: 320,
              marginTop: 10,
            }}
            multiline
            placeholder="Calebrant's Biography."
            // value={value}
            // onChangeText={onChange}
            editable
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              padding: 8,
              fontSize: 16,
              borderColor: colors.black,
              textAlignVertical: "top",
              height: 50,
              width: 320,
              marginTop: 10,
            }}
            multiline
            placeholder="Calebrant's Impact."
            // value={value}
            // onChangeText={onChange}
            editable
          />

          <View className="flex flex-row ml-8">
            <Text className=" text-base font-semibold text-center mb-3">
              Add Media
            </Text>
            <View className="ml-2 flex flex-row">
              <TouchableOpacity onPress={() => handleUpload()}>
                <Icon name="add-circle" size={30} color="#93cd33" />
              </TouchableOpacity>
            </View>
            <View className="ml-2">
              {uploadImage ? (
                <>
                  <View className="bg-white p-2 rounded-full  shadow-xl shadow-gray-500 ml-2 mr-2">
                    <Image
                      source={{ uri: uploadImage }}
                      className=" w-[40px] h-[40px] rounded-full"
                    />
                  </View>
                  {uploadImageLoading ? <Text>Uploading...</Text> : ""}
                </>
              ) : (
                ""
              )}
            </View>
          </View>
          <View className="flex flex-row ml-8">
            <Text className=" text-base font-semibold text-center mb-3">
              Notify Calebrant
            </Text>
            <View className="ml-2 flex flex-row">
              <CustomRadioButton
                value="Yes"
                label="Yes"
                selectedValue={selectedValue} // Pass selectedOption
                onChange={handleValueChange}
              />
              <CustomRadioButton
                value="No"
                label="No"
                selectedValue={selectedValue} // Pass selectedOption
                onChange={handleValueChange}
              />
            </View>
          </View>
          <View className="flex flex-row ml-8">
            <Text className=" text-base font-semibold text-center mb-3">
              Add a project
            </Text>
            <View className="ml-2 flex flex-row">
              <CustomRadioButton
                value="Yes"
                label="Yes"
                selectedValue={addProject} // Pass selectedOption
                onChange={handleAddProjectChange}
              />
              <CustomRadioButton
                value="No"
                label="No"
                selectedValue={addProject} // Pass selectedOption
                onChange={handleAddProjectChange}
              />
            </View>
          </View>
          <View className="flex justify-center items-center">
            <SubmitButton
              title="Post"
              onPress={handleSubmit}
              loading={loading}
              bwidth="100%"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    borderRadius: 13,
    backgroundColor: "#DEDEDE",
    color: "#fff",
  },
});

export default AddFeed;
