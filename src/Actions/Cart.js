export function addToCart(productId,categoryId,quantity){
	return{
		type: 'CART_ADD',
		productId,
		categoryId,
		quantity
	}
}

export function removeFromCart(productId){
	return{
		type: 'CART_REMOVE',
		productId
	}
}

export function updateCartItem(productId,updateObj){
	return{
		type: 'CART_UPDATE',
		productId,
		newValue:updateObj
	}
}
