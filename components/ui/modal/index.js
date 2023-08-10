import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #0f0f0",
  boxShadow: 24,
  px: 4,
  pt: 1,
  pb: 4,
};

const UiModal = ({ open, setOpenModal, children }) => {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpenModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Create New Crop</p>
            <CloseIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenModal(false)}
            />
          </Box>
          <div>{children}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default UiModal;
