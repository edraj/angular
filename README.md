# Dmart

Angular Dmart

## Get started

Download nodejs (10+) and npm (6.5+), download this project (it's a boilerplate, it is designed to be decoupled from original), and in the root, run 

`npm install -g @angular/cli typescript`

You need gulp to run the gulp tasks to prepare css out of LESS and RTL files, in addition to post build for ssr. Always check what typescript is supported by angular and install a local version of it.

Run

`npm run install:all` will get you started with packages needed for this seed

## NPM commands

The following commands in npm to help you get going:

- `npm start`: starts with normal english angular development (then browse to localhost:5100)
    serves index.dev.html with localdata/config.json
- `npm run start:prod`: starts development server with production configuration and environment
    serves index.dev.prod.html with localdata/config.prod.json

- `npm run build` generates a client-side angular app in /host/client + /host/index/index.lang.html to be served
> this rewrites the baseHref to / or /lang/ depending on gulp configuration: isUrlBased, 
> if true, the project will appear under hosturl/en or hosturl/ar ... etc

> This also injects the right rtl css in header for rtl supported languages.

Notes:

- Do not rename `placeholder.html` to `index.html`, there is a limitation in ngExpressEngine that it favores the index.html in output folder, over the one provided to `render()` function.
- There are four route files in `host/server` folder, each with a different routing configuration to suit the project needs: 
    - routes (client side only)
    - routes-url (client side only, language switch via url)
    - routes-ssr (server side)
    - routes-ssr-url (server side, language switch via url)
- Known limitation with resources. I still depend on global `resources.keys` directly, to read resources on both client and server, depending on language cookie. This needs to be fixed so that the resources are fully loaded on server before use.
- Build ssr task also takes care of generating RTL css links for all languages that support RTL. Setup languages supported in `gulpfile/config.json`, under `languages` collection.

## Gulp commands for Angular

> Gulp tasks has been moved to its own package under [sekrab-gulpbin](https://www.npmjs.com/package/sekrab-gulpbin)

You can optionally use these instead of the angular cli packaged commands (or you can create files manually). Read on here:
[GulpBin Readme](https://github.com/ayyash/gulpbin)
