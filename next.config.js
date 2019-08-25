const optimizedImages = require("next-optimized-images")
const withPlugins = require("next-compose-plugins")
const webpack = require("webpack")
const withSASS = require("@zeit/next-sass")
const withCSS = require("@zeit/next-css")

function HACK_removeMinimizeOptionFromCssLoaders(config) {
  console.warn(
    "HACK: Removing `minimize` option from `css-loader` entries in Webpack config"
  )
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === "css-loader" && u.options) {
          delete u.options.minimize
        }
      })
    }
  })
}

const optimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: "images",
  imagesName: "[name]-[hash].[ext]",
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: "default",
    quality: 75
  }
}

const nextConfiguration = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        PC: JSON.stringify("pc")
      })
    )
    return config
  }
}

module.exports = withPlugins(
  [
    [optimizedImages, optimizedImagesConfig],
    [
      withSASS,
      {
        webpack(config) {
          HACK_removeMinimizeOptionFromCssLoaders(config)
          return config
        },
        cssLoaderOptions: {
          url: false
        }
      }
    ],
    [
      withCSS,
      {
        cssLoaderOptions: {
          url: false
        }
      }
    ]
  ],
  nextConfiguration
)
