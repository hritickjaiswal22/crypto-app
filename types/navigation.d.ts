import { NewsType } from "@/src/api/cryptoNewsApi";

// Types
type SplashNavigation = {
  Welcome: undefined;
};

type AuthNavigation = {
  Login: undefined;
  Register: undefined;
};

type HomeNavigation = {
  HomeScreen: undefined;
  CoinDetails: {
    coinUuid: string;
  };
};

type NewsNavigation = {
  NewsScreen: undefined;
  NewsDetails: {
    newsItem: NewsType;
  };
};
