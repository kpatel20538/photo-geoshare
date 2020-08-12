import fs from 'fs';

export default {
  expo: {
    name: "photo-geoshare",
    slug: "photo-geoshare",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: JSON.parse(fs.readFileSync("./extra.json", { encoding: 'utf-8' })),
  },
};
