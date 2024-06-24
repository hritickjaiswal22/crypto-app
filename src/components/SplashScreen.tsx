import { View, Text } from "react-native";
import { Image } from "expo-image";
import Cryptocurrency from "@/assets/images/cryptocurrency.png";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

function SplashScreen() {
  return (
    <View className="w-full h-full px-4 flex justify-center items-center">
      <View className="w-20 h-20 overflow-hidden ">
        <Image
          source={Cryptocurrency}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={500}
          className="w-full h-full flex-1"
        />
      </View>
      <View className="w-full flex flex-row justify-center items-center">
        <Text className="text-neutral-600 text-2xl leading-[60px] font-semibold">
          Crypto
        </Text>
        <Text className="text-[#31aca3] text-2xl leading-[60px] font-semibold">
          Buzz
        </Text>
      </View>
    </View>
  );
}

export default SplashScreen;
