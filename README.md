# Winstrap
##### The official Bootstrap theme for Windows
﻿
http://bootstrap-winjs.azurewebsites.net/

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
git clone https://github.com/winjs/winstrap.git winstrap
```

You should have a `winstrap` folder.

### Installing npm packages

To install the required `npm` packages:

```
cd winstrap
npm install
```

## Building winstrap

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
