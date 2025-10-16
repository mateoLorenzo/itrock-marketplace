import { Product } from "@/interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";

const PRODUCTS_PER_PAGE = 10;
const MIN_LOADING_TIME = 5000; // 500ms mínimo de loading
const API_URL = "https://api.escuelajs.co/api/v1";

interface FetchProductsParams {
  pageParam: number;
}

const fetchProducts = async ({
  pageParam = 0,
}: FetchProductsParams): Promise<Product[]> => {
  const offset = pageParam * PRODUCTS_PER_PAGE;

  // min loader of 750 ms to improve UX
  const minDelay = new Promise((resolve) =>
    setTimeout(resolve, MIN_LOADING_TIME)
  );

  const requestPromise = fetch(
    `${API_URL}/products?offset=${offset}&limit=${PRODUCTS_PER_PAGE}`
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    return response.json();
  });

  const [data] = await Promise.all([requestPromise, minDelay]);
  return data;
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PRODUCTS_PER_PAGE) {
        return undefined;
      }
      return allPages.length;
    },
  });
};
