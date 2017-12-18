/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
'use strict';
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gulpIgnore = require('gulp-ignore');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');
// Here we add tools that will be used to process our source files.
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const util = require('gulp-util');

// Additional plugins can be used to optimize your source files after splitting.
// Before using each plugin, install with `npm i --save-dev <package-name>`
// const uglify = require('gulp-uglify');
// const cssSlam = require('css-slam').gulp;
// const htmlMinifier = require('gulp-html-minifier');
const swPrecacheConfig = require('./sw-precache-config.js');
const polymerJson = require('./polymer.json');
const polymerProject = new polymerBuild.PolymerProject(polymerJson);
const buildDirectory = 'build';
const sourceDirectory = 'src';
const testDirectory = 'src';

/** True if any errors have been sent to handleError() */
let haveErrors = false;
/** Set to true to fail as soon as an error is handled by handleError instead of just toggling the haveErrors flag. **/
let hardFail = false;


/**
 * Waits for the given ReadableStream
 */
function waitFor(stream) {
    return new Promise(function(resolve, reject) {
        stream.on('end', resolve);
        stream.on('error', reject);
    });
}

/** Standard error handler, for use with the plumber plugin or on() function. */
function handleError(error) {
    if (hardFail) {
        const errorMessage = error ? ': ' + error.message : '';
        util.log('Error(s) found (ending current task)', errorMessage);
        if (this && this.emit) {
            this.emit('end'); //End function
        }
        process.exit(1);
    }else{
        haveErrors = true;
    }
}

/** Handles TypeScript errors; this version decorates the gulp-typescript LongReporter and adds error tracking. */
function typeScriptReporter() {
    const longReporter = ts.reporter.longReporter();
    return {
        error: function(error) {
            longReporter.error(error);
            handleError(error);
        },
        finish: function(results) {
            longReporter.finish(results);
            if (haveErrors) {
                hardFail = true;
                handleError();
            }
        }
    };
}

function typescript() {
    const tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: handleError}))
        .pipe(tsProject(typeScriptReporter()));
    return tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest(sourceDirectory));
}

function build() {
    return new Promise(function(resolve, reject) {
        // Lets create some inline code splitters in case you need them later in your build.
        const sourcesStreamSplitter = new polymerBuild.HtmlSplitter();
        const dependenciesStreamSplitter = new polymerBuild.HtmlSplitter();
        // Okay, so first thing we do is clear the build directory
        console.log("Deleting " + buildDirectory + " directory...");
        del([buildDirectory])
            .then(function() {
                // Let's start by getting your source files. These are all the files
                // in your `src/` directory, or those that match your polymer.json
                // "sources"  property if you provided one.
                const sourcesStream = polymerProject.sources()
                    .pipe(gulpif(/\.(png|gif|jpg|svg)$/, imagemin()))
                    .pipe(sourcesStreamSplitter.split())
                    .pipe(sourcesStreamSplitter.rejoin());
                // Similarly, you can get your dependencies seperately and perform
                // any dependency-only optimizations here as well.
                const dependenciesStream = polymerProject.dependencies()
                    .pipe(dependenciesStreamSplitter.split())
                    .pipe(dependenciesStreamSplitter.rejoin());
                // Okay, now let's merge your sources & dependencies together into a single build stream.
                let buildStream = mergeStream(sourcesStream, dependenciesStream)
                    .once('data', function() {
                        console.log('Analyzing build dependencies...');
                    });
                // If you want bundling, pass the stream to polymerProject.bundler.
                // This will bundle dependencies into your fragments so you can lazy
                // load them.
                buildStream = buildStream.pipe(polymerProject.bundler());
                // Now let's generate the HTTP/2 Push Manifest
                buildStream = buildStream.pipe(polymerProject.addPushManifest());
                // Okay, time to pipe to the build directory
                buildStream = buildStream.pipe(gulp.dest(buildDirectory));
                // waitFor the buildStream to complete
                return waitFor(buildStream);
            })
            .then(function() {
                // Okay, now let's generate the Service Worker
                console.log('Generating the Service Worker...');
                return polymerBuild.addServiceWorker({
                    project: polymerProject,
                    buildRoot: buildDirectory,
                    bundled: true,
                    swPrecacheConfig: swPrecacheConfig
                });
            })
            .then(function() {
                // You did it!
                console.log('Build complete!');
                resolve();
            });
    });
}

function watch() {
    gulp.watch([sourceDirectory + '/**/*.ts'], ['typescript']);
    gulp.watch([testDirectory + '/**/*.ts'], ['typescript']);
    gulp.watch(['tsconfig.json'], ['typescript']);
}

gulp.task('typescript', typescript);
gulp.task('watch', ['typescript'], watch);
gulp.task('build', ['typescript'], build);
