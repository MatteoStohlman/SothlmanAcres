import Categories from 'Sagas/Categories'
import Products from 'Sagas/Products'
import Cart from 'Sagas/Cart'
import CuringRoom from 'CuringRoom/sagas.js'
export default function* IndexSaga () {
  yield [
    Categories(),
    Products(),
    Cart(),
    CuringRoom(),
  ]
}
