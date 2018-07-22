import Categories from 'Sagas/Categories'
import Products from 'Sagas/Products'
import Cart from 'Sagas/Cart'
export default function* IndexSaga () {
  yield [
    Categories(),
    Products(),
    Cart()
  ]
}
