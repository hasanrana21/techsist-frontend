import UiTabs from "@/components/ui/tabs";
import MainLayout from "@/layouts/MainLayout";
import axios from "@/plugins/Axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Home() {
  const [categoryId, setCategoryId] = useState(1);
  console.log("pageId", categoryId);
  const getNavMenus = async () => {
    return await axios.get("/api/crops/category").then((res) => {
      console.log("resData", res.data);
      return res.data;
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menus"],
    queryFn: () => getNavMenus(),
  });
  return (
    <MainLayout>
      <UiTabs
        data={data}
        loading={isLoading}
        error={isError}
        setCategoryId={setCategoryId}
      />
    </MainLayout>
  );
}
