import "dotenv/config";

export default {
  expo: {
    name: "Sportified",
    slug: "Sportified",
    version: "1.0.0",
    sdkVersion: "52.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    // splash: {
    //   image: "./assets/splash-icon.png",
    //   resizeMode: "contain",
    //   backgroundColor: "#ffffff",
    // },
    scheme: "sportified", // Added scheme for deep linking
    ios: {
      bundleIdentifier: "com.oldstager01.sportified",
      supportsTablet: true,
    },
    android: {
      package: "com.oldstager01.sportified",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      geminiAPIKey: process.env.GEMINI_API_KEY,
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-secure-store",
    ],
    extra: {
      eas: {
        projectId: "70b4c064-ea72-4d93-868f-50f9f44612ce",
      },
    },
    entryPoint: "./index.tsx",
  },
  experiments: {
    typedRoutes: true,
  },
};
