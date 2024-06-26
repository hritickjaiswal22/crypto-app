import Avatar from "@/src/components/Avatar";
import { supabase } from "@/supabaseConfig";
import useUserStore from "@/src/store/useUserStore";

import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getAllCoins } from "@/src/api/coinRankingApi";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import numeral from "numeral";

interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
  sparkline: string;
  coinrankingUrl: string;
  volume: string;
}

function HomeScreen() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { session } = useUserStore();

  async function handleGetProfile() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(`username, full_name,avatar_url, website`)
        .eq("id", session?.user?.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
        setUserName(data.username);
      }
    } catch (error) {
      console.log((error as any)?.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (session) handleGetProfile();
    }, [session])
  );

  const renderItem = ({ index, item }: { item: Coin; index: number }) => {
    return (
      <Pressable className="flex-row w-full py-4 items-center">
        <Animated.View
          entering={FadeInDown.duration(100)
            .delay(index * 200)
            .springify()}
          className="w-full flex-row items-center"
        >
          <View className="w-[16%]">
            <View>
              <View className="w-10 h-10">
                <Image
                  source={{ uri: item.iconUrl }}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
            </View>
          </View>

          <View className="w-[55%] justify-start items-start">
            <Text className="font-bold text-lg">{item.name}</Text>

            <View className="flex-row justify-center items-center space-x-2">
              <Text className={`font-medium text-sm text-neutral-500`}>
                {numeral(parseFloat(item?.price)).format("$0,0.00")}
              </Text>

              <Text
                className={`font-medium text-sm ${
                  Number(item.change) < 0
                    ? "text-red-600"
                    : Number(item.change) > 0
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {item.change}%
              </Text>
            </View>
          </View>

          <View className="w-[29%] justify-start items-end">
            <Text className="font-bold text-base">{item.symbol}</Text>

            <View className="flex-row justify-center items-center space-x-2">
              <Text className="font-medium text-sm text-neutral-500">
                {item.marketCap.length > 9
                  ? item.marketCap.slice(0, 9)
                  : item.marketCap}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  const { data: CoinsData, isLoading: isAllCoinsLoading } = useQuery({
    queryKey: ["allCoins"],
    queryFn: getAllCoins,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative">
        <View className="w-full flex-row justify-between items-center px-4">
          <View className="w-3/4 flex-row space-x-2">
            <View className="justify-center items-center">
              <View className="h-12 w-12 rounded-2xl overflow-hidden">
                <Avatar url={avatarUrl} size={50} />
              </View>
            </View>

            <View>
              <Text className="text-lg font-bold">
                Hi , {userName ? userName : "User"}
              </Text>
              <Text className="text-sm to-neutral-500">Have a good day</Text>
            </View>
          </View>

          <View className="py-6">
            <View className="bg-neutral-700 rounded-lg p-1">
              <Ionicons name="menu" size={24} color="white" />
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-4 items-center">
            {isAllCoinsLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={CoinsData.data.coins}
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
