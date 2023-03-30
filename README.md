# Vue-typescript-example
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Raouf25_Vue-typescript-example&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Raouf25_Vue-typescript-example)

This is a simple blog application (with CRUD operation) that showcases the usage of the following technologies:

- Vue
- Vuex and Modules
- vue-router
- Typescript (Class based API)
- Axios
- Code splitting/ Lazy loading
- Mock server used https://jsonplaceholder.typicode.com/

### Styling

- SASS/SCSS pre-processor is used for CSS styling.
- Element UI library is used to enhance the look and feel of the app.
- Basic responsive design
- CSS Resets

### Vuex

Vuex is used to store common data and accessed using helpers in components. It also follows a modular approach by creating specific modules to store and access data.

### Typing

This application follows a class-based API approach. The `vue-property-decorator` is used to decorate modules in component files. The `vuex-module-decorators` is used to decorate Vuex modules, and the `vuex-class` library is used to access Vuex properties such as `state`, `actions`, `getters` etc. in components.

## Project setup
To install the project dependencies, run:
```
yarn install
```

### Development
To compile and hot-reload for development, run:
```
yarn serve
```

### Production
To compile and minify for production, run:
```
yarn build
```

### Deploy:
To deploy the application, run:
```
yarn deploy
```

### Tests
To run unit tests, run:
```
yarn test:unit
```

### Linting
To lint and fix files, run:
```
yarn lint
```

### Customization

For more information on customization, see [Configuration Reference](https://cli.vuejs.org/config/).
