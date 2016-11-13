# 00 Boilerplate

In this sample we are going to setup the basic plumbing to "build" our project and launch it in a dev server.

We won't install anything related with react or redux, just some basic plumbing, in sample 01 we will start by importing
React and React-Dom.

We will setup an initial npm project, give support to es6, and install react.
Then we will create a helloworld.js sample.

Summary steps:

- Prerequisites: Install Node.js
- Intialize package.json (npm init)
- Install:
    - Webpack and webpack-dev-server.
    - Bootstrap.
- Setup webpack.config.js
- Create a test js file.
- Create a simple HTML file.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (once you have successfully fullfilled them a **package.json**
file we will generated).

  ````
  npm init
  ````

- Install **webpack** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

  ````
  npm install webpack --save-dev
  ````

- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

  ````
  npm install webpack-dev-server --save-dev
  ````

- Let's install a list of plugins and loaders that will add powers to
our webpack configuration (handling css...).

  ```
  npm install css-loader style-loader file-loader url-loader html-webpack-plugin --save-dev
  ```

- We also need to add babel support to handle ES6 syntax:

  ```
  npm install babel-core babel-loader babel-preset-es2015 --save-dev
  ```


- In order to launch webpack-dev-server, modify the **package.json** file an add the following property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

- Let's install bootstrap:

  ```
  npm install bootstrap --save
  ```

- Now, our **package.json** file should looks something like:

  ```json
  {
    "name": "sampleredux",
    "version": "1.0.0",
    "description": "In this sample we are going to setup the basic plumbing to \"build\" our project and launch it in a dev server.",
    "main": "index.js",
    "scripts": {
      "start": "webpack-dev-server",
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "babel-core": "^6.18.2",
      "babel-loader": "^6.2.7",
      "babel-preset-es2015": "^6.18.0",
      "css-loader": "^0.25.0",
      "file-loader": "^0.9.0",
      "html-webpack-plugin": "^2.24.1",
      "style-loader": "^0.13.1",
      "url-loader": "^0.5.7",
      "webpack": "^1.13.3",
      "webpack-dev-server": "^1.16.2"
    },
    "dependencies": {
      "bootstrap": "^3.3.7"
    }
  }
  ```

 - Let's create a subfolder called _src_.

 - Let's create a basic _main.js_ file (under src folder):

  ```javascript
  document.write('Hello from main.js!');
  ```

 - Let's create a basic _index.html_ file (under src folder):

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Redux-by-sample ES6</title>
    </head>
    <body>
      <h1>Sample app</h1>
    </body>
  </html>
  ```

 - Now it's time to create a basic _webpack.config.js_ file, this configuration will
 include plumbing for:

 - Launching a web dev server.
 - Transpiling from javascript ES6 to javascript ES5.
 - Setup twitter bootstrap (including, fonts etc...).
 - Generating the build under a _dist_ folder.

  ```javascript
  var path = require('path');
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');

  var basePath = __dirname;

  module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
      extensions: ['', '.js', '.jsx']
    },

    entry: [
      './main.js',
      '../node_modules/bootstrap/dist/css/bootstrap.css'
    ],
    output: {
      path: path.join(basePath, 'dist'),
      filename: 'bundle.js'
    },

    devtool: 'source-map',

    devServer: {
      contentBase: './dist', // Content base
      inline: true, // Enable watch and live reload
      host: 'localhost',
      port: 8080,
      stats: 'errors-only'
    },

    module: {
      loaders: [
        {
          test: /\.jsx$|\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
        // Using here url-loader and file-loader
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url?limit=10000&mimetype=image/svg+xml'
        }
      ]
    },
    plugins: [
      // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html', // Name of file in ./dist/
        template: 'index.html', // Name of template in ./src
        hash: true
      })
    ]
  }
  ```

- Let's give a try to the sample.

  ```
  npm start
  ```


### Optional step: Linter

**Optional step**: linting the code with an ECMAScript6 linter (ESLint) and the Airbnb JavaScript Style Guide

- Let's install airbnb special rules.

  ```sh
  (
    export PKG=eslint-config-airbnb;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
  )
  ```

- Let's install the webpack ESLint loader and babel-eslint:

  ```
  npm install eslint-loader eslint-plugin-react babel-eslint --save-dev
  ```

- Create an _.eslintignore file in root directory:

  ```
  webpack.config.js
  ```

- Add `eslint-loader` entry in a new `preLoaders` section before the `loaders` module and eslint configFile entry in _webpack.config.js_:

  ```javascript
  eslint: {
    configFile: './src/.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
  ```

- Create an _.eslintrc_ file in _src_ directory:

  ```json
  {
    parser: "babel-eslint",
    "extends": "airbnb",
    "rules": {
    }
  }
  ```

- Add the following line at the beggining in _src/main.js_:

  ```
  /* global document */

  ```

- If you use `atom` probably you will want the linter-eslint atom package. Install it with:

  ```
  apm install linter-eslint
  ```
