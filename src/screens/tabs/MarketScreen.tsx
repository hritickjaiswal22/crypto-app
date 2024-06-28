import { getAllCoins } from "@/src/api/coinRankingApi";
import { HomeNavigation } from "@/types/navigation";

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

function MarketScreen() {
  const [filterState, setFilterState] = useState<"all" | "gainers" | "losers">(
    "all"
  );
  const [items, setItems] = useState<Array<Coin>>([]);

  const { navigate }: NavigationProp<HomeNavigation> = useNavigation();

  const renderItem = ({ index, item }: { item: Coin; index: number }) => {
    return (
      <Pressable
        className="flex-row w-full py-4 items-center"
        onPress={() =>
          navigate("CoinDetails", {
            coinUuid: item.uuid,
          })
        }
      >
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

  useEffect(() => {
    if (CoinsData.data.coins.length > 0) setItems(CoinsData.data.coins);
  }, [CoinsData]);

  function filter(choice: "all" | "gainers" | "losers") {
    switch (choice) {
      case "gainers":
        setFilterState(choice);
        const temp1 = CoinsData.data.coins.filter(
          (item: Coin) => Number(item.change) > 0
        );
        setItems(temp1);
        break;

      case "losers":
        setFilterState(choice);
        const temp2 = CoinsData.data.coins.filter(
          (item: Coin) => Number(item.change) < 0
        );
        setItems(temp2);
        break;

      case "all":
        setFilterState("all");
        setItems(CoinsData.data.coins);
        break;

      default:
        setFilterState("all");
        setItems(CoinsData.data.coins);
        break;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4  py-2">
        <View className="w-3/4 flex-row space-x-2">
          <View>
            <Text className="text-3xl font-bold">Market</Text>
          </View>
        </View>
      </View>

      <View className="relative">
        <View className="px-4 flex-row justify-between items-center pb-4">
          <Pressable
            onPress={() => filter("all")}
            className={`w-1/4 justify-center items-center ${
              filterState === "all" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Text
              className={`text-xl ${
                filterState === "all" ? "font-extrabold" : ""
              }`}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            onPress={() => filter("gainers")}
            className={`w-1/4 justify-center items-center ${
              filterState === "gainers" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Text
              className={`text-xl ${
                filterState === "gainers" ? "font-extrabold" : ""
              }`}
            >
              Gainers
            </Text>
          </Pressable>

          <Pressable
            onPress={() => filter("losers")}
            className={`w-1/4 justify-center items-center ${
              filterState === "losers" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Text
              className={`text-xl ${
                filterState === "losers" ? "font-extrabold" : ""
              }`}
            >
              Losers
            </Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4 py-2 items-center">
            {isAllCoinsLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={items}
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

export default MarketScreen;
