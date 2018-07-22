import { combineReducers } from 'redux'
import CategoriesReducer from 'Reducers/Categories'
import ProductsReducer from 'Reducers/Products'


const IndexReducer = combineReducers({
	categories:CategoriesReducer,
	products:ProductsReducer,
})

export default IndexReducer
