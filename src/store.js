import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/reducers";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/sagas";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
