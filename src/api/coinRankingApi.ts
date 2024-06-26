import axios from "axios";
import { XRapidAPIKey, RapidApiCoinsrankingHost } from "@/rapidApiConfig";

const baseUrl = "https://coinranking1.p.rapidapi.com/coins";

const options = {
  method: "GET",
  url: baseUrl,
  params: {
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
    tiers: "1",
    orderBy: "marketCap",
    orderDirection: "desc",
    limit: "30",
    offset: "0",
  },
  headers: {
    "x-rapidapi-key": XRapidAPIKey,
    "x-rapidapi-host": RapidApiCoinsrankingHost,
  },
};

async function getAllCoins() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { getAllCoins };
