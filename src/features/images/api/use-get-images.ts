import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

const useGetImages = () => {
    const query = useQuery({
        queryKey: ['images'],
        queryFn: async () => {
            const res = await client.api.images.$get();

            if (!res.ok) throw new Error('Failed to fetch images');

            const { data } = await res.json();
            return data;
        }
    });

    return query;
};

export default useGetImages;