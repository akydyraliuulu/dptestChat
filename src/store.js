import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducers";

  function _applyMiddleware(){
      const middleware = [];
      return applyMiddleware(...middleware);
  }

  export default function configureStore(intialState){  
    const store = compose(_applyMiddleware())
    (createStore)(reducer,intialState);
   return store;
}