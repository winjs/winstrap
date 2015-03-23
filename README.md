# Bootstrap WinJS

## Development

### Install Node.js

http://nodejs.org/download/

Make sure Node.js is in your path environement variable.

### Install Grunt

In an Administrator PowerShell console:

```
npm install -g grunt-cli
```

### Clone the repo

In a user PowerShell console:

```
git clone https://winjs.visualstudio.com/DefaultCollection/_git/bootstrap-winjs
```

You should have a `bootstrap-winjs` folder.

### Installing npm packages

To install the required `npm` packages:

```
cd bootstrap-winjs
npm install
```

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