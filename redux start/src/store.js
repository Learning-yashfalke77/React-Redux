import { createStore } from "redux";
// For tracing in developer tools install : npm i redux-devtools-extension
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from './reducer'

const store = createStore(reducer,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    devToolsEnhancer({ trace: true })
)

export default store