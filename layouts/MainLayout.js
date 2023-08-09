import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
// import Button from "@mui/material/Button"
import Box, { BoxProps } from "@mui/material/Box";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [pathName, setPathName] = useState(router.pathname);

  const sideMenu = [
    { id: 1, title: "ফসল", link: "/" },
    { id: 2, title: "আর্কাইভ", link: "/archive" },
  ];

  return (
    <main className="layout__wrapper" style={{ minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          sx={{ bgcolor: "#14304a" }}
          style={{ height: "100%" }}
        >
          <div style={{ padding: "0 20px", height: "100vh" }}>
            <Typography variant="h4" sx={{ color: "#fff" }}>
              Techsist Ltd
            </Typography>
            <ul>
              {sideMenu.map((item) => (
                <Link key={item.id} href={item?.link}>
                  <li
                    style={{
                      cursor: "pointer",
                      margin: "10px 0",
                      padding: "10px",
                      color: pathName != item?.link ? "#fff" : "",
                      backgroundColor: pathName == item?.link ? "#fff" : "",
                    }}
                  >
                    <span>{item?.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </Grid>
        <Grid item xs={10} sx={{ px: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4>{pathName == "/" ? "Foshol" : pathName.toUpperCase}</h4>
            <p>Home / {pathName == "/" ? "Foshol" : pathName.toUpperCase}</p>
          </Box>
          <div>{children}</div>
        </Grid>
      </Grid>
    </main>
  );
};

export default MainLayout;
