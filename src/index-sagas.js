import Categories from 'Sagas/Categories'
import Products from 'Sagas/Products'
export default function* IndexSaga () {
  yield [
    Categories(),
    Products(),
  ]
}
