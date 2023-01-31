const path = require('path')

const resolvePath = p => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@api': resolvePath('./src/api'),
      '@assets': resolvePath('./src/assets'),
      '@components': resolvePath('./src/components'),
      '@store': resolvePath('./src/store'),
      '@styles': resolvePath('./src/styles'),
      '@helpers': resolvePath('./src/utils/helpers'),
      '@constants': resolvePath('./src/utils/constants'),
      '@views': resolvePath('./src/views'),
      '@hooks': resolvePath('./src/hooks'),
    }
  }
}
