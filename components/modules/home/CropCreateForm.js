import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";

const CropCreateForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgIndex, setImgIndex] = useState(null);
  const [diseases, setDiseases] = useState([
    {
      name: "",
      image: "",
    },
  ]);
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  const addDisease = () => {
    let item = {
      name: "",
      image: "",
    };
    setDiseases([...diseases, item]);
  };
  const handleImageChange = async (event) => {
    let file = event.target.files[0];
    // const reader = new FileReader();
    // let url = reader.readAsDataURL(file);
    let image = URL.createObjectURL(file);
    diseases.map((item, index) => {
      if (imgIndex === index) {
        return (item.image = image);
      }
    });
    // setSelectedImage(image);
  };
  const diseaseDelete = (id) => {
    let filteredList = diseases.filter((item, key) => id !== key);
    setDiseases(filteredList);
  };
  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file-1"
        type="file"
      />
      <label htmlFor="raised-button-file-1">
        <Button variant="contained" color="warning" component="span">
          Upload
        </Button>
      </label>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300, ml: 3 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </Box>
      <hr />
      <img src={selectedImage} alt="" />
      <Grid container spacing={4}>
        {diseases &&
          diseases.map((item, key) => (
            <Grid key={key} xs={6}>
              <Typography sx={{ my: 2 }} level="title-lg">
                <span>{key + 1}.</span> Crop Disease Name
              </Typography>
              <TextField
                size="sm"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                sx={{ width: "100%" }}
              />
              <Typography sx={{ my: 2 }} level="title-md">
                Crop's Disease Image
              </Typography>
              <Card
                orientation="horizontal"
                variant="outlined"
                sx={{ width: "90%", verticalAlign: "center" }}
              >
                <CardOverflow>
                  <AspectRatio ratio="1" sx={{ width: 100 }}>
                    <img src={item?.image} loading="lazy" alt="Image" />
                  </AspectRatio>
                </CardOverflow>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      color="warning"
                      component="span"
                      onClick={() => setImgIndex(key)}
                    >
                      Upload
                    </Button>
                  </label>
                </CardContent>
                <DeleteOutlineIcon
                  sx={{ mx: 1, mt: 3, cursor: "pointer" }}
                  color="warning"
                  onClick={() => diseaseDelete(key)}
                />
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* FORM SUMBIT */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <div>
          <Button
            onClick={addDisease}
            sx={{ m: 2 }}
            size="md"
            variant="contained"
            color="success"
          >
            Add Disease
          </Button>
          <Button sx={{ m: 2 }} size="md" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default CropCreateForm;
