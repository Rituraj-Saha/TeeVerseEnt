import React, { useState } from "react";
import styles from "./nav.module.css";
import { cartIcon, searchIcon, ShirtLOGO } from "../../assets/svgAssets";
import SvgStringRenderer from "../../reusableComponent/SvgReusableRenderer";
import { Badge, Chip, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../../../storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import { Link } from "react-router";
import useIsMobile from "app/src/customhook/useIsMobile";
import AuthDialog from "app/src/reusableComponent/userRegistration/AuthDialog";
import {
  authDialogClose,
  authDialogOpen,
} from "app/storeCofig/feature/authDialogController/AuthDialogController";

const NAVITEMS = [
  {
    label: "Home",
    path: "",
  },
  {
    label: "Product",
    path: "products",
  },
  {
    label: "orders",
    path: "orders",
  },
  {
    label: "Custom Tees",
    path: "",
  },
  {
    label: "Contact",
    path: "",
  },
];
// const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
// const base = env.VITE_BASE_PATH || "";
function withBase(path) {
  const base = import.meta.env.VITE_BASE_PATH || "";
  return `${base.replace(/\/$/, "")}/${path.replace(/^\/+/, "")}`;
}
function Nav() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart.totalItems);
  const isMobile = useIsMobile();
  console.log("isMobile", isMobile);

  const mopen = useSelector(
    (state) => state.authDialogControllerReducer.showAuthDialog
  );
  // const [mode, setMode] = useState("signin"); // "signup" or "signin"

  const handleOpen = (selectedMode) => {
    // setMode(selectedMode);
    dispatch(authDialogOpen());
  };

  const handleClose = () => {
    dispatch(authDialogClose());
  };

  const handleSubmit = (data) => {
    console.log("Final Auth Data:", data);
    // Here you would call your FastAPI API for signup/signin
    // fetch("/api/v1/auth/signup", { method: "POST", body: JSON.stringify(data) })
  };
  return !isMobile ? (
    <nav className={styles.parent}>
      <div className={styles.navBranding}>
        <div className={styles.logoWrapper}>
          <SvgStringRenderer svgString={ShirtLOGO} />
        </div>

        <span className={styles.brandingText}>TEE-VERSE</span>
      </div>

      <div className={styles.optionContainer}>
        <ul className={styles.ulStyle}>
          {NAVITEMS.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={withBase(item.path)}
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    label={item.label}
                    variant="outlined"
                    sx={{
                      background: theme.palette.custom.dark,
                      color: "#FFF",
                      px: "5px",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.searchCartContainer}>
        <div
          className={styles.scItem}
          onClick={() => {
            dispatch(open());
          }}
        >
          <Badge
            badgeContent={cartCount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: theme.palette.customGreen.main,
                color: theme.palette.customGreen.contrastText,
              },
            }}
          >
            <SvgStringRenderer svgString={cartIcon} width={"20%"} />
          </Badge>

          <span className={styles.menuItemAnxText}>Cart</span>
        </div>
        <div className={styles.scItem}>
          <SvgStringRenderer
            svgString={searchIcon}
            height={"30px"}
            width={"30px"}
          />
          <span className={styles.menuItemAnxText}>Search</span>
        </div>
        <Chip
          label={"Get Started"}
          onClick={() => handleOpen("signin")}
          variant="outlined"
          sx={{
            background: theme.palette.secondary.main,
            color: "#FFF",
          }}
        />
      </div>
      <AuthDialog
        open={mopen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        // mode={mode}
      />
    </nav>
  ) : (
    <nav className={styles.parent}>
      <div className={styles.optionContainer}>
        <ul className={styles.ulStyle}>
          {NAVITEMS.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={withBase(item.path)}
                  style={{ textDecoration: "none" }}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <div
            className={styles.scItem}
            onClick={() => {
              dispatch(open());
            }}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: theme.palette.customGreen.main,
                  color: theme.palette.customGreen.contrastText,
                },
              }}
            >
              <SvgStringRenderer svgString={cartIcon} width={"20%"} />
            </Badge>

            <span className={styles.menuItemAnxText}>Cart</span>
          </div>
        </ul>
      </div>
      <AuthDialog
        open={mopen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        // mode={mode}
      />
    </nav>
  );
}

export default Nav;
