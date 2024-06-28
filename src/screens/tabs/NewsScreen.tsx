import { getNews, NewsType } from "@/src/api/cryptoNewsApi";
import { NewsNavigation } from "@/types/navigation";

import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import numeral from "numeral";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/outline";

function NewsScreen() {
  const { data: NewsData, isLoading: isNewsLoading } = useQuery<
    Array<NewsType>
  >({
    queryKey: ["cyrptonews"],
    queryFn: getNews,
  });

  const { navigate }: NavigationProp<NewsNavigation> = useNavigation();

  const handleClick = (item: NewsType) => {
    navigate("NewsDetails", {
      newsItem: item,
    });
  };

  const renderItem = ({ item, index }: { item: NewsType; index: number }) => {
    return (
      <Pressable
        key={index}
        onPress={() => handleClick(item)}
        className="mb-4 mx-4 space-y-1"
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: hp(9), height: hp(10) }}
              className="rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-black  text-gray-900">
              {item.description.length > 20
                ? item.description.slice(0, 20) + "..."
                : item.description}
            </Text>

            <Text className="capitalize max-w-[90%] text-neutral-800">
              {item.title.length > 30
                ? item.title.slice(0, 30) + "..."
                : item.description}
            </Text>

            <Text className="text-xs text-gray-700">{item.createdAt}</Text>
          </View>

          <View className="w-[10%] justify-center">
            <BookmarkSquareIcon color="gray" />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4  py-2">
        <View className="w-3/4 flex-row space-x-2">
          <View>
            <Text className="text-3xl font-bold">Crypto News</Text>
          </View>
        </View>
      </View>

      <View>
        {isNewsLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView className="">
            <FlatList
              nestedScrollEnabled={true}
              scrollEnabled={false}
              data={NewsData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

export default NewsScreen;
