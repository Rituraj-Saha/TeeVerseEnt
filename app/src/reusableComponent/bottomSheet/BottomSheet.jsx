import React from "react";
import { Modal, Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const MotionBox = motion(Box);

const BottomSheet = ({ children, onClose }) => {
  const open = useSelector((state) => state.bottomSheetControllerReducer.show);
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") return;
    if (onClose) onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={handleClose}>
          <MotionBox
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: "background.paper",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              boxShadow: 24,
              p: 2,
              height: "90vh",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            {children}
          </MotionBox>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
