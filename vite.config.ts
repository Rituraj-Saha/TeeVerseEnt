import { reactRouter } from "@react-router/dev/vite";
// import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
// });
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: mode === "production" ? "/prodassets/" : "/",
    build: {
      outDir: "build/client",
      assetsDir: "", // prevents nested "assets" folder, keeps clean URLs
    },
    define: {
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME),
      __BASE_PATH__: JSON.stringify(env.VITE_BASE_PATH),
      __BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
    },
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    server: {
      host: "0.0.0.0",
      hmr: true,
      fs: {
        allow: ["."],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    ssr: {
      noExternal: ["@mui/material", "@emotion/react", "@emotion/styled"],
    },
  };
});
