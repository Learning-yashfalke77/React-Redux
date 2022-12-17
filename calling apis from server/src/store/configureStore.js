import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from './middleware/logger'
import api from './middleware/api'
import reducer from "./reducer";

export default function () {
    return configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware(),
            logger("console"),
            api

        ]
    })
}