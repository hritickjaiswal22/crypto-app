import {
  getCoinDetails,
  getCoinHistory,
  CoinDetailsData,
  HistoryData,
  History,
  CoinDetails,
} from "@/src/api/coinRankingApi";
import { HomeNavigation } from "@/types/navigation";

import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import numeral from "numeral";
import { useQuery } from "@tanstack/react-query";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { CartesianChart, useChartPressState, Line } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, { FadeInDown, SharedValue } from "react-native-reanimated";

type ParamList = {
  CoinDetails: {
    coinUuid: string;
  };
};

function CoinDetailsScreen() {
  const [lineData, setLineData] = useState<Array<History>>([]);
  const [item, setItem] = useState<CoinDetails | null>(null);

  const { navigate }: NavigationProp<HomeNavigation> = useNavigation();

  const {
    params: { coinUuid },
  } = useRoute<RouteProp<ParamList, "CoinDetails">>();

  const { isActive, state } = useChartPressState({
    x: 0,
    y: {
      price: 0,
    },
  });

  function Tooltip({
    x,
    y,
  }: {
    x: SharedValue<number>;
    y: SharedValue<number>;
  }) {
    return <Circle cx={x} cy={y} r={8} color="red" />;
  }

  const { data: CoinDetails, isLoading: CoinDetailsLoading } =
    useQuery<CoinDetailsData>({
      queryKey: ["coinDetails", coinUuid],
      queryFn: () => coinUuid && getCoinDetails(coinUuid),
    });

  const { data: CoinHistory, isLoading: CoinHistoryLoading } =
    useQuery<HistoryData>({
      queryKey: ["coinHistory", coinUuid],
      queryFn: () => coinUuid && getCoinHistory(coinUuid),
    });

  useEffect(() => {
    if (CoinHistory && CoinHistory.data.history) {
      let prevPrice = 0;
      let prevTimestamp = 0;

      const datasets = CoinHistory.data.history.map((item) => {
        const price = parseFloat(item.price as string);
        const timestamp = item.timestamp;

        if (price) prevPrice = price;
        if (timestamp) prevTimestamp = timestamp;

        return {
          price: price || prevPrice,
          timestamp: timestamp || prevTimestamp,
        };
      });

      setLineData(datasets);
    }

    if (CoinDetails && CoinDetails.data.coin) {
      setItem(CoinDetails.data.coin);
    }
  }, [CoinHistory, CoinDetails]);

  return (
    <View className="flex-1 bg-white">
      {CoinDetailsLoading || CoinHistoryLoading ? (
        <View className="absolute z-50 h-full w-full justify-center items-center bg-black opacity-[0.45]">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>

          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      ) : (
        <SafeAreaView>
          <View className="flex-row items-center justify-between px-4">
            <Pressable
              onPress={() => navigate("HomeScreen")}
              className="border-2 border-neutral-500 rounded-full p-1"
            >
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="gray"
              />
            </Pressable>

            <View>
              <Text className="font-bold text-lg">{item?.symbol}</Text>
            </View>

            <View className="border-2 border-neutral-500 rounded-full p-1">
              <Entypo name="dots-three-horizontal" size={24} color="gray" />
            </View>
          </View>

          <View className="px-4 justify-center items-center py-2">
            <Text className={`font-extrabold text-2xl`}>
              {numeral(parseFloat(item?.price as string)).format("$0,0.00")}
            </Text>
          </View>

          {item && (
            <View className="flex-row justify-center items-center space-x-2 px-4 py-2">
              <View className="flex-row w-full py-4 items-center">
                <View className="w-[16%]">
                  <View className="w-10 h-10">
                    <Image
                      source={{ uri: item?.iconUrl }}
                      contentFit="cover"
                      transition={1000}
                      className="w-full h-full flex-1"
                    />
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
              </View>
            </View>
          )}
        </SafeAreaView>
      )}

      <View style={{ height: 400, paddingHorizontal: 10 }}>
        {lineData.length > 0 && (
          <CartesianChart
            chartPressState={state}
            axisOptions={{
              tickCount: 8,
              labelOffset: { x: -1, y: 0 },
              labelColor: "green",
            }}
            data={lineData}
            xKey="timestamp"
            yKeys={["price"]}
          >
            {({ points }) => (
              <>
                <Line points={points.price} strokeWidth={2} color="green" />
                {isActive && (
                  <Tooltip x={state.x.position} y={state.y.price.position} />
                )}
              </>
            )}
          </CartesianChart>
        )}
      </View>

      {item && (
        <>
          <View className="px-4 py-4">
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                All Time High
              </Text>
              <Text className={`font-medium text-base`}>
                {numeral(parseFloat(item?.allTimeHigh?.price)).format(
                  "$0,0.00"
                )}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                Number of Markets
              </Text>
              <Text className={`font-medium text-base`}>
                {numeral(item?.numberOfMarkets).format("$0,0.00")}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base font-bold text-neutral-500">
                Number of Exchanges
              </Text>
              <Text className={`font-medium text-base`}>
                {numeral(item?.numberOfExchanges).format("$0,0.00")}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default CoinDetailsScreen;
