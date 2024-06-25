import Button from "@/src/components/Button";
import { supabase } from "@/supabaseConfig";
import { validateEmail } from "@/src/utils/validationUtils";
import useUserStore from "@/src/store/useUserStore";

import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
  AppState,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useState } from "react";

const { height } = Dimensions.get("window");

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setUser, setSession, setIsLoggedIn } = useUserStore();

  const { navigate }: NavigationProp<AuthNavigation> = useNavigation();

  async function signInWithEmail() {
    setLoading(true);

    const { error, data } = await supabase.auth.signInWithPassword(form);

    if (error) Alert.alert("Error", error.message);

    if (data.session && data.user) {
      setSession(data.session);
      setUser(data.user);
      setIsLoggedIn(true);
    }

    setLoading(false);
  }

  function signinHandler() {
    if (!validateEmail(form.email)) {
      Alert.alert("Invalid email");
      return;
    }

    signInWithEmail();
  }

  return (
    <>
      <StatusBar style="auto" />
      <View className="flex-1">
        {loading && (
          <View className="absolute z-50 h-full w-full justify-center items-center">
            <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>
            <View className="absolute">
              <ActivityIndicator size={"large"} color="white" />
            </View>
          </View>
        )}
        <View className="flex-1 justify-center items-center relative">
          <View
            className="justify-center w-full px-4 space-y-4"
            style={{
              height: height * 0.75,
            }}
          >
            <Animated.View
              className={"justify-center items-center"}
              entering={FadeInDown.duration(100).springify()}
            >
              <Text className="text-neutral-800 font-semibold text-4xl leading-[60px]">
                Welcome Back
              </Text>
              <Text className="text-neutral-500 font-medium text-sm">
                Please enter your details
              </Text>
            </Animated.View>
            <Animated.View
              className="py-8 space-y-8"
              entering={FadeInDown.delay(200).duration(100).springify()}
            >
              <View className="border-2 border-gray-400 rounded-lg">
                <TextInput
                  className="px-4 py-2"
                  value={form.email}
                  onChangeText={(inp) =>
                    setForm((prev) => {
                      return {
                        ...prev,
                        email: inp,
                      };
                    })
                  }
                  placeholder="Email*"
                  autoCapitalize="none"
                />
              </View>
              <View className="border-2 border-gray-400 rounded-lg">
                <TextInput
                  className="px-4 py-2"
                  value={form.password}
                  onChangeText={(inp) =>
                    setForm((prev) => {
                      return {
                        ...prev,
                        password: inp,
                      };
                    })
                  }
                  placeholder="Password*"
                  autoCapitalize="none"
                />
              </View>
              <Animated.View
                className="py-4"
                entering={FadeInDown.delay(300).duration(100).springify()}
              >
                <Button text="Login" onPressHandler={signinHandler} />
              </Animated.View>
            </Animated.View>
          </View>
          <Animated.View
            className={"flex-row justify-center items-center"}
            entering={FadeInDown.duration(100).delay(700).springify()}
          >
            <Text className="text-neutral-500 text-lg font-medium leading-[38px] text-center">
              Don't have an account yet?
            </Text>
            <Pressable onPress={() => navigate("Register")}>
              <Text className="text-neutral-800 text-lg font-medium leading-[38px] text-center">
                &nbsp;Register
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </>
  );
}

export default LoginScreen;
