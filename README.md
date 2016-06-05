# miniature-funicular


1.``` npm install webpack -g```


2. Create an index.html and an app.js file in the root dir

3. Run ```webpack ./app.js bundle.js```
The first argument is the app.js file in the root dir, the second argument is the name of the file  webpack should create.

4. Define webpack config file.

Create a file called ``` webpack.config.js``` with the following code:
<code>  
  module.exports = {
    entry: "./app.js",
    output: {
      filename: "bundle.js"
    },
    watch: true
  }
</code>


()entry— name of the top level file or files (can be an array of files] to be included in the build.
()output— an object containing the output configuration. Here, the filename key (bundle.js) specifies the name of the file Webpack should build.
()watch—enables watchmode. Webpack will watch the files and when there is a change it will rebuild the bundle.js output file.

5. run the command ```webpack```, now that there is a webpack.config file this cmd will build the application based on this cofiguration

6. run ```webpack-dev-server``` and go to [http://localhost:8080/webpack-dev-server/] (http://localhost:8080/webpack-dev-server/) to see the app in the browser

While the Webpack dev server is running any changes made to the app can be seen in the browser automatically (hot-loading).

To disable hot-loading and remove the app status bar remove /webpack-dev-server/ from the url.

To enable hot-loading, but remove the status bar use ```webpack-dev-server --inline ``` in the terminal


npm install ...
```babel-core```
The babel npm package

```babel-loader```
The babel module loader for Webpack

```jshint```
A tool that helps to detect errors and potential problems in your JavaScript code

```jshint-loader```
The jshint loader module for Webpack

```node-libs-browser```
A peer dependency of Webpack. It provides certain Node libraries for browser usage.

```babel-preset-es2015```
A babel preset for all es2015 plugins.

```babel-preset-react```
A babel preset for all React plugins.