import { TransitionPresets } from "@react-navigation/stack";

export const screenOptions = {
  headerShown: false,
  animationEnabled: true,
  gestureEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
};
