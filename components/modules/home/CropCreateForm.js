import React, { useState } from "react";
import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import axios from "@/plugins/Axios";

const CropCreateForm = () => {
  const [imgIndex, setImgIndex] = useState(null);
  const [cropImage, setCropImage] = useState(null);
  const [diseases, setDiseases] = useState([
    {
      title: "",
      image: "",
      url: "",
    },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    category: null,
    description: "",
    disease: [],
  });
  const top100Films = [
    { id: 1, label: "The Shawshank Redemption", year: 1994 },
    { id: 2, label: "The Godfather", year: 1972 },
    { id: 3, label: "The Godfather: Part II", year: 1974 },
    { id: 4, label: "The Dark Knight", year: 2008 },
    { id: 5, label: "12 Angry Men", year: 1957 },
    { id: 6, label: "Schindler's List", year: 1993 },
    { id: 7, label: "Pulp Fiction", year: 1994 },
  ];
  const addDisease = async () => {
    let item = {
      title: "",
      image: "",
      url: "",
    };
    setDiseases([...diseases, item]);
  };
  const handleImageChange = async (event, type) => {
    let file = event.target.files[0];
    // const reader = new FileReader();
    // let url = reader.readAsDataURL(file);
    let image = URL.createObjectURL(file);
    if (type) {
      setCropImage(image);
    } else {
      diseases.map((item, index) => {
        if (imgIndex === index) {
          item.url = image;
          item.image = file;
        }
      });
    }
  };
  const diseaseDelete = (id) => {
    let filteredList = diseases.filter((item, key) => id !== key);
    setDiseases(filteredList);
  };

  const handleTextField = async (e, index) => {
    let name = e.target?.name;
    if (index == 0 || index) {
      await diseases.map((item, key) => {
        if (key == index) return (item.title = e.target?.value);
      });
    } else {
      formData[name] = e.target?.value;
    }
  };
  const handleDropdownField = (event) => {
    formData.category = parseInt(event.target.value);
  };
  //   FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    formData.disease = diseases;
    let form = new FormData();
    // let dis = new FormData();

    // form.append(formData.disease[0], formData.disease[0].title);
    // form.append(formData.disease[0], formData.disease[1].image);
    // form.append(formData.disease[0], formData.disease[2].url);
    Object.keys(formData).map((i) => {
      form.append(i, formData[i]);
    });

    // formData.disease.map((item) => {
    //   Object.keys(item).map((key, i) => {
    //     dis.append(`item[${i}]`, item[key]);
    //   });
    // });
    // form.append("diseas", dis);
    console.log("submit", form);
    axios.post("/api/crops/", form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <AspectRatio ratio="1" sx={{ width: 100 }}>
          <img src={cropImage} loading="lazy" alt="Image" />
        </AspectRatio>
        <input
          onChange={(e) => handleImageChange(e, "cropImage")}
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
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <TextField
          id="outlined-basic"
          name="title"
          label="Crop Name"
          variant="outlined"
          onChange={handleTextField}
        />

        {/* <Autocomplete
          onInputChange={(event, newInputValue) => {
            handleDropdownField(newInputValue);
          }}
          name="category"
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300, ml: 3 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        /> */}
        <select
          style={{
            width: 300,
            height: "55px",
            marginLeft: "20px",
            padding: "10px",
            fontSize: "16px",
          }}
          name="category"
          onChange={handleDropdownField}
        >
          {top100Films &&
            top100Films.map((option) => (
              <option key={option?.id} value={option?.id}>
                {option?.label}
              </option>
            ))}
        </select>
      </Box>
      <FormControl sx={{ mb: 3 }}>
        <FormLabel>Crops Description</FormLabel>
        <Textarea name="description" minRows={6} onChange={handleTextField} />
      </FormControl>
      <hr />
      <Grid container spacing={4}>
        {diseases &&
          diseases.map((item, key) => (
            <Grid key={key} xs={6}>
              <Typography sx={{ my: 2 }} level="title-lg">
                <span>{key + 1}.</span> Crop Disease Name
              </Typography>
              <TextField
                size="sm"
                id={`disease_${key}`}
                label="Disease Name"
                variant="outlined"
                name="title"
                sx={{ width: "100%" }}
                onChange={(e) => handleTextField(e, key)}
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
                    <img src={item?.url} loading="lazy" alt="Image" />
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
                  <label
                    htmlFor="raised-button-file"
                    onClick={() => setImgIndex(key)}
                  >
                    <Button
                      variant="contained"
                      color="warning"
                      component="span"
                      id="disease-button"
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
          <Button
            type="submit"
            sx={{ m: 2 }}
            size="md"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default CropCreateForm;
