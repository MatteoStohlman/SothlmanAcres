import { combineReducers } from 'redux'
import CategoriesReducer from 'Reducers/Categories'
import ProductsReducer from 'Reducers/Products'
import CartReducer from 'Reducers/Cart'


const IndexReducer = combineReducers({
	categories:CategoriesReducer,
	products:ProductsReducer,
	cart:CartReducer,
})

export default IndexReducer
