const path = require('path');

module.exports = {
    stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    staticDirs: ['../public'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        {
            name: '@storybook/preset-scss',
            options: {
                cssLoaderOptions: {
                    modules: { localIdentName: '[name]__[local]--[hash:base64:5]' },
                },
            },
        },
    ],
    core: {
        builder: 'webpack5',
    },
    webpackFinal: config => {
        /**
         * Add support for alias-imports
         * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
         */
        config.resolve.alias = {
            ...config.resolve?.alias,
            '@': [path.resolve(__dirname, '../')],
        };

        /**
         * Fixes font import with /
         * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
         */
        config.resolve.roots = [path.resolve(__dirname, '../public'), 'node_modules'];

        return config;
    },
};
