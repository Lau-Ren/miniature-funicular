# miniature-funicular

A guide for
  - getting started with webpack
  - configuring webpack to use with react and babel.


### To get started:

- [ ] ``` npm install webpack -g```


- [ ] Create an index.html and an app.js file in the root dir

- [ ] Run ```webpack ./app.js bundle.js```
The first argument is the app.js file in the root dir, the second argument is the name of the file  webpack should create.

### Define webpack config file

- [ ] Create a file called ``` webpack.config.js``` with the following code:

  '''
  |  module.exports = {
  |    entry: "./app.js",
  |    output: {
  |      filename: "bundle.js"
  |    },
  |    watch: true
  |  }
  '''


  - **entry** is the name of the top level file or files (can be an array of files] to be included in the build.
  - **output** is an object containing the output configuration. Here, the filename key (bundle.js) specifies the name of the file Webpack should build.
  - **watch** enables watchmode. Webpack will watch the files and when there is a change it will rebuild the bundle.js output file.

### Webpack dev server

- [ ] run the command ```webpack```, now that there is a webpack.config file this cmd will build the application based on this cofiguration

- [ ] run ```webpack-dev-server``` and go to [http://localhost:8080/webpack-dev-server/] (http://localhost:8080/webpack-dev-server/) to see the app in the browser

  While the Webpack dev server is running any changes made to the app can be seen in the browser automatically (hot-loading).

  To disable hot-loading and remove the app status bar remove /webpack-dev-server/ from the url.

  To enable hot-loading, but remove the status bar use ```webpack-dev-server --inline ``` in the terminal


### Adding multiple files to the build

- [ ] ```require('./file');``` include files in app.js
- [ ] add extra entry files to the webpack.config.js file

  ``` ["./anotherFile.js", "./app.js"]```


### Loaders and preloaders
Loaders allow files to be preprocessed as they are required or loaded in.

Babel is a loader, and jshint is a preloader

- [ ] ```npm install babel-core babel-loader jshint jshint-loader node-libs-browser babel-preset-es2015 babel-preset-react webpack strip-loader --save-dev```

  - **babel-core**.The babel npm package

  - **babel-loader**.The babel module loader for Webpack

  - **jshint**. A tool that helps to detect errors and potential problems in JavaScript code

  - **jshint-loader**. The jshint loader module for Webpack

  - **node-libs-browser**. A peer dependency of Webpack. It provides certain Node libraries for browser usage.

  - **babel-preset-es2015**. A babel preset for all es2015 plugins.

  - **babel-preset-react**. A babel preset for all React plugins.

  - **strip-loader**. Removes arbitrary functions in production code ie. console.log

#### Run Babel and JSHint with Webpack

- [ ] add babel loader and jshint preloader to the webpack config file:

  '''
    module.exports = {
      entry: "./app.js",
      output: {
        filename: "bundle.js"
      },
      **module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
          }
        ],
        loaders: [
          {
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              presets: ['react', 'es2015']
            }
          }
        ]
       },**
       resolve: {
         extensions: ['', '.js', '.es6']
       },
      watch: true
    }
  '''

  - **test**. States which kind of files may be run through the loader
  - **exclude**. States which files the loader should ignore
  - **loader**. The name of the loader being used
  - **query**. Options to be passed to the loader 
    - **cacheDirectory**. When true, the current dir will be used to cache the results of the loader
    - **presets**. Allows the use of the react and es2015 presets 
  - **resolve**. Specifies the filetypes that can be processed if  the files does not have a specific file extension ie. ```require('./fileName')```


- [ ] Create a new es6 file and require it in app.js. In the new file, write a es6 function that will console.log something.

- [ ] Relaunch the webpack dev server and check that the console.log was successful
  There should be a warning message in the terminal, this just means that JSHint it runnng.

- [ ] Create a start script. In the package.json add ```"start": "webpack-dev-server"``` to ```"scripts"```
  This means that the cmd ```npm start``` can be used now instead of ```webpack-dev-server```

  ### Separate production and development builds

  - [ ] Use different config files for production and development. Create a ```webpack.production.config.js``` file with the following code:
    ```
      var WebpackStripLoader = require('strip-loader');
      var devConfig = require('./webpack.config.js');
      var stripLoader = {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        **loader: WebpackStripLoader.loader('console.log')**
      }
      devConfig.module.loaders.push(stripLoader);
      module.exports = devConfig;
    ```

    - The arguments on the bolded line above (begining "loader:...") are the functions strip-loader will remove. Here it will remove all console.logs, but the loader can take more than one argument.

  - [ ] Run ```webpack --config webpack-production.config.js -p```. The config flag allows a config file to be specified and -p minifies the code.

  Congrats, webpack is configured!

## React and Webpack

- [ ] Run the cmd ```npm install react react-dom --save```

- [ ] Create a new component file with the following code: 
  
  ```
  import React from "react";

  export default React.createClass({

    render: function() {
      return (
        <div>
          Hello, {this.props.name}!
        </div>
      );
    },
  });

  ```

- [ ] Add the following code to the app.js file:

  ```
  import React from "react";
  import ReactDOM from "react-dom";
  import NewComponent from "./newComponent";

  ReactDOM.render(
    <NewComponent name="World" />,
    document.body
  );
  ```

  - [ ] in the webpack.config file, change the babel-loader test key to ```test: [/\.js$/, /\.es6$/]```. This  means that both js and es6 files can be passed to babel and allows jsx to be used.

- [ ] Run ```webpack-dev-server``` and check that Hello, World has been rendered to the page