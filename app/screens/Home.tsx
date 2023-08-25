import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { makeRequest } from "../api/axios";
import Loader from "../components/Loader";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import { Image } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
interface HomeProps {
  navigation: any;
}

function Home({ navigation }: HomeProps) {
  const [feeds, setFeeds] = useState([]);
  const [initLoading, setInitLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [showFullContent, setShowFullContent] = useState(false);

  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );

  const [layoutProvider] = useState(
    new LayoutProvider(
      (index) => {
        return index;
      },
      (type, dim) => {
        dim.width = Dimensions.get("window").width;
        dim.height = (width * 1) / 2;
      }
    )
  );

  useEffect(() => {
    setDataProvider((prevState) => prevState.cloneWithRows(feeds));
  }, [feeds]);

  //dev.buzsquare.com/api/v1/feed
  useEffect(() => {
    loadFeeds();
  }, []);
  const loadFeeds = async () => {
    setInitLoading(true);
    try {
      const { data } = await makeRequest.get(`/feed`);
      setFeeds(data.data);

      setInitLoading(false);
    } catch (error) {
      console.log(error);
      setInitLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadFeeds();
      setRefreshing(false);
    }, 2000);
  };

  const rowRenderer = (type: any, item: any, index: any) => {
    // console.log(item.url);
    // console.log(item.user.url);
    const toggleContent = () => {
      setShowFullContent(!showFullContent);
    };
    const limitedContent = item?.status.slice(0, 100);
    const isContentTooLong = item?.status?.length > 100;

    return (
      <>
        <View className="m-3">
          <View className="flex flex-row gap-3">
            <Image
              source={{ uri: item?.user?.avatar?.origin }}
              className=" w-[60px] h-[60px] rounded-full"
            />
            <Text className="py-5 text-base font-semibold">
              {item.user.full_name}
            </Text>
          </View>
          <Text>{limitedContent}</Text>

          {isContentTooLong && (
            <TouchableOpacity
              onPress={() => navigation.navigate("SingleFeed", item)}
            >
              <Text className="text-[#93cd33] font-medium text-base">
                {showFullContent ? "Read Less" : "Read More..."}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  // if (initLoading) {
  //   return <Loader message="Loading Forms..." />;
  // }
  // if (!feeds?.length) return null;
  return (
    <>
      <View className=" relative">
        <Header
          backIcon={() => navigation.goBack()}
          HeaderTitle="Honor / Gratitude"
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("AddFeed")}
          className=" absolute z-10 right-5 top-4"
        >
          <Icon name="add-circle" size={30} color="#93cd33" />
        </TouchableOpacity>
      </View>
      <SafeAreaView style={{ flex: 1 }} className="bg-[#ffffff]">
        {/* <ScrollView>
          {feeds.map((feed, i) => (
            <View key={i}>
              <Text>{feed.user.full_name}</Text>
            </View>
          ))}
        </ScrollView> */}
        {feeds?.length > 0 ? (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={rowRenderer}
            scrollViewProps={{
              refreshControl: (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              ),
            }}
          />
        ) : (
          ""
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
});

export default Home;
