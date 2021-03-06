import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer } from './reducers/productsReducers'
import { productDetailsReducer } from "./reducers/productsReducers";
import { cartReducer } from "./reducers/CartReducers";
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    userUpdateProfileReducer,
    userDeleteReducer,
    userUpdateReducer
} from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
localStorage.getItem('userInfo')) : null;

const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: {userInfo: userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store