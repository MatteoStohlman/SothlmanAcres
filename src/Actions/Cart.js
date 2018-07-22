export function addToCart(productId,categoryId,quantity){
	return{
		type: 'CART_ADD',
		productId,
		categoryId,
		quantity
	}
}
