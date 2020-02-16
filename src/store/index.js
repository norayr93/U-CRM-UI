// import devStore from './store.development';
// import prodStore from './store.production';

// const store = process.env.NODE_ENV === 'development' ? devStore : prodStore;
// debugger;
// export default store;

// module.exports = require(`./store.${process.env.NODE_ENV}`);
export {default} from './store.development';