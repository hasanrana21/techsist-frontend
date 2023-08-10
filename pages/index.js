import UiTabs from "@/components/ui/tabs";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/plugins/Axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const [categoryId, setCategoryId] = useState(1);
  const getNavMenus = async () => {
    return await axios.get("/api/crops/category").then((res) => {
      return res.data;
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menus"],
    queryFn: () => getNavMenus(),
  });

  // CATEGORY CROPS LISTS
  const fetchCategoryCrops = async () => {
    let query = `category=${categoryId}&is_archived=false&page=${1}&page_size=${10}`;
    return await axios.get(`/api/crops/?${query}`).then((res) => {
      return res.data.results;
    });
  };
  const {
    data: cropsData,
    isLoading: cropsListLoading,
    isError: cropsListError,
  } = useQuery({
    queryKey: ["categoryCrops", categoryId],
    queryFn: () => fetchCategoryCrops(),
  });
  return (
    <MainLayout>
      <UiTabs
        data={data}
        loading={isLoading}
        error={isError}
        setCategoryId={setCategoryId}
        tableContent={cropsData}
      />
    </MainLayout>
  );
}
