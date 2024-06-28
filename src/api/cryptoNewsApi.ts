import axios from "axios";
import {
  RapidApiNewsUrl,
  RapidApiNewsHost,
  XRapidAPIKey,
} from "@/rapidApiConfig";

interface NewsType {
  url: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
}

async function getNews() {
  const options = {
    method: "GET",
    url: RapidApiNewsUrl,
    headers: {
      "x-rapidapi-key": XRapidAPIKey,
      "x-rapidapi-host": RapidApiNewsHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data?.data || response.data;
  } catch (error) {
    console.error(error);
  }
}

export { getNews };
export type { NewsType };
