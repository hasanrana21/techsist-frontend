import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import axios from "@/plugins/Axios";
// import { useQuery } from "react-query";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UiTabs = ({ data, loading, error, setCategoryId }) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategoryId(newValue);
  };

  //   const getNavMenus = async () => {
  //     return await axios.get("/api/crops/category").then((res) => {
  //       console.log("resData", res.data);
  //       return res.data;
  //     });
  //   };
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["menus"],
  //     queryFn: () => getNavMenus(),
  //   });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {data &&
            data.map((menu) => (
              <Tab
                key={menu?.id}
                {...a11yProps(menu?.id)}
                label={menu?.title}
                value={menu?.id}
              />
            ))}
        </Tabs>
      </Box>
      {data &&
        data.map((menu) => (
          <CustomTabPanel key={menu?.id} value={value} index={menu?.id}>
            {menu?.title}
          </CustomTabPanel>
        ))}
    </Box>
  );
};
export default UiTabs;
