import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UiTable from "../table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UiModal from "../modal";
import CropCreateForm from "@/components/modules/home/CropCreateForm";
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
          <div>{children}</div>
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

const UiTabs = ({ data, loading, error, setCategoryId, tableContent }) => {
  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCategoryId(newValue);
  };

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
            <UiTable tableContent={tableContent}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <h3>Crop List</h3>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    sx={{ mx: 2, height: "80%" }}
                  >
                    + Add Crop
                  </Button>
                  <UiModal open={openModal} setOpenModal={setOpenModal}>
                    <CropCreateForm />
                  </UiModal>
                </Box>

                <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  sx={{ height: "50%" }}
                />
              </Box>
            </UiTable>
          </CustomTabPanel>
        ))}
    </Box>
  );
};
export default UiTabs;
