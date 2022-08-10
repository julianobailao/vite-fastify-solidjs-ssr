import path from "path";

export default {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@client": path.resolve(__dirname, "./src/client"),
      "@server": path.resolve(__dirname, "./src/server"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
};
