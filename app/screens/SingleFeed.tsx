import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import colors from "../utils/colors";

import { AuthContext } from "../context/authContext";

interface AddFeedProps {
  navigation: any;
  route: any;
}
function SingleFeed({ route, navigation }: AddFeedProps) {
  const [auth, setAuth] = useContext(AuthContext);
  const feed = route.params;

  return (
    <>
      <Header
        backIcon={() => navigation.goBack()}
        HeaderTitle="Honor / Gratitude"
      />
      <SafeAreaView className="flex-1 bg-[#ffffff] p-4">
        <View className="my-2 z-10 bg-white">
          <View>
            <Text className="text-base font-semibold">
              By: <Text className=" font-normal">{feed?.user?.full_name}</Text>
            </Text>
          </View>
          <Image
            source={{ uri: feed?.user?.avatar?.origin }}
            className=" w-full h-72 rounded-md"
          />
          <View className="flex flex-row justify-between">
            <View className="flex flex-row space-x-2">
              <Icon name="heart-outline" size={30} color="#93cd33" />
              <Text className="text-lg font-medium">
                {feed.statistic.total_like}
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Icon name="chatbubble-outline" size={30} color="#93cd33" />
              <Text className="text-lg font-medium">
                {feed.statistic.total_comment}
              </Text>
            </View>
            <View className="flex flex-row space-x-2">
              <Icon name="share-social" size={30} color="#93cd33" />
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex flex-col gap-11"
        >
          <View style={styles.container}>
            {/* <Text>{JSON.stringify(feed, null, 2)}</Text> */}
            <Text>{feed.status}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    // backgroundColor: "#DEDEDE",
    color: "#fff",
  },
});

export default SingleFeed;
