const MODULE_RESOLVER = [
  "module-resolver",
  {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: {
      "@components": "./src/components",
      "@screens": "./src/screens",
      "@utils": "./src/utils",
      "@constants": "./src/constants",
      "@navigation": "./src/navigation",
      "@fonts": "./src/assets/fonts",
      "@images": "./src/assets/images",
      "@hooks": "./src/hooks",
      "@store": "./src/store",
      "@api": "./src/api",
      "@contexts": "./src/contexts",
      "@themes": "./src/themes",
      "@environments": "./src/environments",
    },
  },
];
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [MODULE_RESOLVER],
  };
};
