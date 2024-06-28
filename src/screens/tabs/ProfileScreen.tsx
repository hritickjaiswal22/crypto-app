import { supabase } from "@/supabaseConfig";
import useUserStore from "@/src/store/useUserStore";

import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthNavigation } from "@/types/navigation";

async function getProfileDetails() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) throw error;
    else
      return {
        email: user.email,
      };
  } catch (error) {
    console.log(error);
  }
}

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    console.log("Logged out");

    if (error) throw error.message;
  } catch (error) {
    console.log(error);
  }
}

function ProfileNavigation() {
  const [user, setUser] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn, setSession, setUser: setLoggedUser } = useUserStore();

  const { navigate }: NavigationProp<AuthNavigation> = useNavigation();

  function handleSignOut() {
    signOut().then(() => {
      setIsLoggedIn(false);
      setSession(null);
      setLoggedUser(null);

      navigate("Login");
    });
  }

  useEffect(() => {
    setLoading(true);
    getProfileDetails()
      .then((data) => {
        setUser((temp) => {
          return {
            ...temp,
            email: data?.email || "",
          };
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View>
        <View className="justify-center items-center py-14 pb-20 bg-[#2ab07c]">
          <View className="overflow-hidden border-2 border-white rounded-3xl"></View>

          <View className="w-full py-3 items-center">
            <Text className="text-lg font-bold text-white">{user.email}</Text>
          </View>
        </View>

        <View
          className="bg-white px-4 -mt-8 pt-8"
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <Text className="text-lg font-bold pb-2">Account overview</Text>
        </View>

        <View className="p-2 py-3 bg-gray-100 rounded-xl border-2 border-gray-300 my-3 mx-2">
          <Pressable
            onPress={handleSignOut}
            className="flex-row justify-between items-center"
          >
            <View className="flex-row justify-between items-center space-x-2">
              <View className="bg-[#2ab07c] p-1 rounded-lg">
                <MaterialIcons name="logout" size={24} color={"white"} />
              </View>

              <Text className="text-lg text-gray-600 font-semibold">
                Log Out
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={20} color={"black"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ProfileNavigation;
