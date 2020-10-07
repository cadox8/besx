/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const webpack = require('webpack');
const path = require('path');
const entry = require('webpack-glob-entry');

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
    entry: entry('./server/**/*.ts'),
/*    entry: {
        server: './server/Server.ts',
        database: './server/db/Database.ts',
        init: './server/db/Init.ts',
        userLoader: './server/db/UserLoader.ts',
        gameData: './server/api/GameData.ts',
        jobTask: './server/tasks/JobTask.ts',
        rEvents: './server/events/REvents.ts',
        sEvents: './server/events/SEvents.ts',
    },*/
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