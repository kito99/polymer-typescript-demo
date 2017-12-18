# Polymer App Toolbox - TypeScript Starter Kit

This is a TypeScript version of the Polymer 2 Starter Kit that uses the [Polymer Decorators](https://github.com/Polymer/polymer-decorators) project.

> NOTE The Polymer typings are currently in the `polymer-types` folder and are derived from the typings [in this branch](https://github.com/Polymer/polymer/tree/aomarks-typescript) of the Polymer project, and will be replaced with the official typings when they are available.

This template is a starting point for building apps using a drawer-based
layout. The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

Also have a custom gulp process leveraging [polymer-build](https://github.com/Polymer/polymer-build),
the library powering [Polymer CLI](https://github.com/Polymer/polymer-cli).

### Setup

##### Prerequisites

Since this project isn't yet a Polymer template (see [issue #1](https://github.com/virtua-tech/polymer-typescript-starter-kit/issues/1) to track progress), you need to clone the repo to use it.

If you haven't already, you'll also need to install the Polymer CLI:

    npm install polymer-cli -g

Assuming you have `node` and `bower` installed, once you clone the repo, install the dependencies:

    npm install
    bower install 
    
### Build

The included `gulpfile.js` relies on [the `polymer-build` library](https://github.com/Polymer/polymer-build),
the same library that powers Polymer CLI. Out of the box it will clean the
`build` directory, and provide image minification and compile your TypeScript code. Follow the comments in the
`gulpfile.js` to add additional steps like CSS preprocessors.

`gulpfile.js` also generates a `service-worker.js` file with code to pre-cache
the dependencies based on the entrypoint and fragments specified in
`polymer.json`.

    npm run build

### Watch file changes

To re-compile your files via TypeScript whenever there is change, run the `watch` task:

    npm run watch
    
> NOTE: Depending on your editor setup, it may already be doing this for you.

### Start the development server

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    polymer serve
    
### Preview the build

This command serves your app.

    polymer serve build/

### Run tests

This command will run [Web Component Tester](https://github.com/Polymer/web-component-tester)
against the browsers currently installed on your machine:

    polymer test

If running Windows you will need to set the following environment variables:

- LAUNCHPAD_BROWSERS
- LAUNCHPAD_CHROME

Read More here [daffl/launchpad](https://github.com/daffl/launchpad#environment-variables-impacting-local-browsers-detection)

### Adding a new build step

The `gulpfile.js` already contains an example build step that demonstrates how
to run image minification across your source files. For more examples, refer to
the section in [the polymer-build README on extracting inline sources](https://github.com/Polymer/polymer-build#extracting-inlined-cssjs).

### Adding a new view

You can extend the app by adding more views that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections of the
application. Each new demand-loaded fragment should be added to the list of
`fragments` in the included `polymer.json` file. This will ensure those
components and their dependencies are added to the list of pre-cached components
and will be included in the build.
