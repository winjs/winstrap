# Bootstrap WinJS

## Development

### Install Node.js

http://nodejs.org/download/

Make sure Node.js is available in your path.

### Install Grunt

```
npm install -g grunt-cli
```

### Clone the repo

```
git clone https://github.com/winjs/bootstrap-winjs.git
```

You should have a `bootstrap-winjs` folder.

### Installing npm packages

To install the required `npm` packages:

```
cd bootstrap-winjs
npm install
```

### Installing external dependencies

You need:

- The SASS version of bootstrap in `external/bootstrap/`
- jquery.min.js in `external/jquery/`
- respond.min.js in `external/respond/`
- html5shiv.min.js in `external/html5shiv/`im gon

## Building bootstrap-winjs

Just run:

```
grunt
```

This will compile the generated files into the `dist` folder.

### Launching a local server

Just run this task to display the demo pages in your browser:

```
grunt server
```

Launch this URL in your brower: http://localhost:9001/

The changes you make to the Sass files `*.scss` or source documentation files `*.hbs` will be automatically recompiled. Just refresh your browser window.