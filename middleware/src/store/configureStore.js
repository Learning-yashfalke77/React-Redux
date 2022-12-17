import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from './middlewares/logger'
// import func from './middlewares/func'
import reducer from "./reducer";
export default function () {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            logger("console"),
            // func,
        ]
    })
}