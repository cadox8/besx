const webpack = require('webpack');
const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');

const commons = {
    entry: {
        user: './commons/api/User.ts',
        job: './commons/api/Job.ts',
        log: './commons/utils/Log.ts',
        updater: './commons/utils/Updater.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(buildPath, 'commons'),
    },
};

const server = {
    entry: {
        server: './server/Server.ts',
        database: './server/db/Database.ts',
        init: './server/db/Init.ts',
        userLoader: './server/db/UserLoader.ts',
        gameData: './server/api/GameData.ts',
        jobTask: './server/tasks/JobTask.ts',
        rEvents: './server/events/REvents.ts',
        sEvents: './server/events/SEvents.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({ 'global.GENTLY': false })
    ],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(buildPath, 'server')
    },
    target: 'node',
};

const client = {
    entry: {
        client: './client/Client.ts',
        rEvents: './client/events/REvents.ts',
        sEvents: './client/events/SEvents.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(buildPath, 'client'),
    },
};

module.exports = [commons, server, client];