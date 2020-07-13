# Making a single page app without a framework

The code in this repository is based on the javascript tutorial [Making a Single Page App Without a Framework](https://tutorialzine.com/2015/02/single-page-app-without-a-framework). The only differences here are:

- I use typescript instead of javascript.
- I take an objected oriented approach instead of a procedural one.
- I use the [Backbone.js](https://backbonejs.org/) library for routing instead of the jquery library. I stick to the older approach of using hash changes for URLs instead of the newer and prettier path based approach as I do not want to go through the effort of configuring a backend that always returns the index page for direct navigation.
- I roll out my own templating using [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of a template library like [Handlebars](https://handlebarsjs.com/).

## Running the code

Each individual part is treated as a separate `node` project. To execute the code in the `typescript` directory do the following:

1. Navigate to the `code/typescript` folder. The folder contain a `package.json` file indicating that this is a `node` project.
2. Run ```npm install``` to install the development dependencies. The dependencies will be installed locally when you execute this command.
3. Run ```npm run build``` to instruct [webpack](https://webpack.js.org/) to automatically watch for and compile changes in the typescript files in the project.
4. From a separate terminal run ```npm run start``` to launch the [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) development server in your default browser at http://localhost:8080/app/.
