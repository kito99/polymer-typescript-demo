# Polymer App Toolbox - TypeScript Starter Kit

This is a TypeScript version of the [Polymer 2 Starter Kit](https://github.com/PolymerElements/polymer-starter-kit) that 
uses the [Polymer Decorators](https://github.com/Polymer/polymer-decorators) project and the 
[typings that now ship with Polymer](https://github.com/Polymer/polymer/tree/master/types).

This project is an example of how to use TypeScript to build Polymer 2 applications. For examples of all of the 
possible decorators you can use, see the [Polymer Decorators README](https://github.com/Polymer/polymer-decorators/blob/master/README.md).

> NOTE: This project currently uses the [Metadata Reflection API](https://github.com/Polymer/polymer-decorators#metadata-reflection-api) 
in order to simplify the developer experience. It does require an additional dependency, though, so if you don't want to use it, 
just reverse the steps for including it (described in the link above).

---

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

## Setup

### Prerequisites

First, clone this repo (see [issue #1](https://github.com/virtua-tech/polymer-typescript-starter-kit/issues/1) 
if you want this to be a Polymer CLI template).

You will need to have [npm](https://www.npmjs.com/) installed. After you have installed `npm`, make sure you have the 
[Polymer CLI](https://github.com/Polymer/polymer-cli) and `bower` installed globally:

    npm install -g polymer-cli
    npm install -g bower

Next, install the dependencies:

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
