import axios from "axios";
import { XRapidAPIKey, RapidApiCoinsrankingHost } from "@/rapidApiConfig";

const baseUrl = "https://coinranking1.p.rapidapi.com";

async function CoinsApiCall(endPoint: string, params?: any) {
  const options = {
    method: "GET",
    url: endPoint,
    params: params ? params : {},
    headers: {
      "x-rapidapi-key": XRapidAPIKey,
      "x-rapidapi-host": RapidApiCoinsrankingHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

// const options = {
//   method: "GET",
//   url: baseUrl,
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     timePeriod: "24h",
//     tiers: "1",
//     orderBy: "marketCap",
//     orderDirection: "desc",
//     limit: "30",
//     offset: "0",
//   },
//   headers: {
//     "x-rapidapi-key": XRapidAPIKey,
//     "x-rapidapi-host": RapidApiCoinsrankingHost,
//   },
// };

async function getAllCoins() {
  return await CoinsApiCall(`${baseUrl}/coins`, {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    tiers: "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "30",
    offset: "0",
  });
}

interface CoinDetails {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  websiteUrl: string;
  links: string;
  supply: string;
  volume: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  change: string;
  rank: number;
  numberOfMarkets: number;
  numberOfExchanges: number;
  sparkline: string;
  allTimeHigh: {
    price: string;
  };
  coinrankingUrl: string;
}

interface CoinDetailsData {
  data: {
    coin: CoinDetails;
  };
}

async function getCoinDetails(coinUuid: string): Promise<CoinDetails> {
  return await CoinsApiCall(`${baseUrl}/coin/${coinUuid}`, {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
  });
}

interface History {
  price: string | number;
  timestamp: number;
}

interface HistoryData {
  data: {
    history: Array<History>;
  };
}

async function getCoinHistory(coinUuid: string): Promise<HistoryData> {
  return await CoinsApiCall(`${baseUrl}/coin/${coinUuid}/history`, {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
  });
}

export { getAllCoins, getCoinDetails, getCoinHistory };
export type { CoinDetails, CoinDetailsData, History, HistoryData };
