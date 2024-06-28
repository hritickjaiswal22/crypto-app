import { searchCoins } from "@/src/api/coinRankingApi";
import { HomeNavigation } from "@/types/navigation";

import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
import numeral from "numeral";

interface Coin {
  uuid: string;
  iconUrl: string;
  name: string;
  symbol: string;
  price: string;
}

function debounce(fn: Function, delay = 500) {
  let timerId: NodeJS.Timeout;

  return function () {
    clearTimeout(timerId);
    // @ts-ignore
    const ctx = this;
    const args = arguments;

    timerId = setTimeout(() => fn.apply(ctx, args), delay);
  };
}

function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Array<Coin>>([]);

  const { navigate }: NavigationProp<HomeNavigation> = useNavigation();

  async function handleSearch(query: string) {
    if (query && query.length > 3) {
      setLoading(true);
      try {
        const { data } = await searchCoins(query);

        if (data && data.coins) {
          setResults(data.coins);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }

  const debouncedSearchHandler = useCallback(debounce(handleSearch, 400), []);

  const renderItem = ({ index, item }: { item: Coin; index: number }) => {
    return (
      <Pressable
        className="flex-row w-full py-4 items-center px-4"
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
            </View>
          </View>

          <View className="w-[29%] justify-start items-end">
            <Text className="font-bold text-base">{item.symbol}</Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex-row justify-between items-center px-4  py-2">
        <View className="w-3/4 flex-row space-x-2">
          <View>
            <Text className="text-3xl font-bold">Search</Text>
          </View>
        </View>
      </View>

      <View className="mx-4 mb-3 flex-row border-2 p-2 justify-between items-center bg-white rounded-lg shadow-sm">
        <TextInput
          onChangeText={debouncedSearchHandler}
          placeholder="Search for coins"
          placeholderTextColor="gray"
          className="pl-2 flex-1 font-medium text-black tracking-wider"
        />

        <Pressable onPress={() => navigate("HomeScreen")}>
          <XMarkIcon size={25} color="black" />
        </Pressable>
      </View>

      <View className="mt-4">
        {loading ? (
          <View>
            <ActivityIndicator size={"large"} color="#164bd8" />
          </View>
        ) : (
          <View className="py-4">
            <FlatList
              renderItem={renderItem}
              data={results}
              keyExtractor={(item) => item.uuid}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;
