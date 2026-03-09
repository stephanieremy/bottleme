const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql');

if (process.env.STORYBOOK === 'true') {
  const withStorybook = require('@storybook/react-native/metro/withStorybook');
  module.exports = withStorybook(config, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  });
} else {
  module.exports = config;
}
