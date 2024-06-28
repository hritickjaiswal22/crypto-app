import { NewsType } from "@/src/api/cryptoNewsApi";

import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import {
  BookmarkSquareIcon,
  ChevronLeftIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useState } from "react";

type ParamList = {
  NewsDetails: {
    newsItem: NewsType;
  };
};

const { height, width } = Dimensions.get("window");

function NewsDetails() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const {
    params: { newsItem },
  } = useRoute<RouteProp<ParamList, "NewsDetails">>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <Pressable onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} color="gray" strokeWidth={3} />
          </Pressable>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <View className="bg-gray-100 p-2 rounded-full">
            <Pressable onPress={() => navigation.goBack()}>
              <BookmarkSquareIcon size={25} color="gray" strokeWidth={3} />
            </Pressable>
          </View>

          <View className="bg-gray-100 p-2 rounded-full">
            <Pressable onPress={() => navigation.goBack()}>
              <ShareIcon size={25} color="gray" strokeWidth={3} />
            </Pressable>
          </View>
        </View>
      </View>

      {newsItem && newsItem.url && (
        <WebView
          source={{ uri: newsItem.url }}
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
        />
      )}

      {visible && (
        <ActivityIndicator
          size={"large"}
          color="green"
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </SafeAreaView>
  );
}

export default NewsDetails;
