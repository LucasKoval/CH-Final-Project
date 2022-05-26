//----------* IMPORTS *----------//
import { Router } from 'express'
import cartController from '../Controllers/cartController'
const router = new Router()

//----------* CART ROUTES *----------//
// Get Cart List
router.get('/', cartController.cartList)

// Get Cart by ID
router.get('/:id', cartController.getCartById)

// Get Cart Product List
router.get('/:id/productos', cartController.cartProductList)

// Create New Cart
router.post('/', cartController.createNewCart)

// Add Product to Cart
router.post('/:id/productos/:id_prod', cartController.addProductToCart)

// Delete Product from Cart
router.delete('/:id/productos/:id_prod', cartController.deleteProductFromCart)

// Empty Cart
router.delete('/:id', cartController.emptyCart)

//----------* EXPORTS ROUTER *----------//
export default router
