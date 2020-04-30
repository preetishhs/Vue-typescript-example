# ts-vue-sample

Mock server used https://jsonplaceholder.typicode.com/

**This is a simple Blog (with CRUD Operation) to showcase the usage of:**

- Vue
- Vuex and Modules
- vue-router
- Typescript (Class based API)
- Axios
- Code splitting/ Lazy loading

### Styling

- SASS/SCSS pre-processor is used for CSS styling.
- Element UI library is used to enhance the look and feel of the app.
- Basic responsive design
- CSS Resets

### Vuex

Using Vuex to store some common data and accessing them using Helpers in components. Using modular approach by creating specific modules to store and access data.

### Typing

Class based API approach is used here. Using `vue-property-decorator` to decorate modules in Component files.
Using `vuex-module-decorators` to decorate Vuex modules and `vuex-class` library to access the Vuex properties such as `state`, `actions`, `getters` etc in components.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
