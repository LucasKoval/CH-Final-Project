//----------* IMPORTS *----------//
import { productDAO } from '../Daos/products/index.js'
import { cartDAO } from '../Daos/carts/index.js'

//----------* CART CONTROLLER *----------//
const cartController = {
  cartList: async (req, res) => {
    try {
      const allCarts = await cartDAO.getAll()
      res.json(allCarts)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  getCartById: async (req, res) => {
    try {
      const cartId = req.params.id
      const cartFound = await cartDAO.getById(cartId)

      if (!cartFound) {
        res.send({ error: 'Cart not found.' })
      } else {
        res.json(cartFound)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  cartProductList: async (req, res) => {
    try {
      const cartId = req.params.id
      const cartFound = await cartDAO.getById(cartId)

      if (!cartFound) {
        res.send({ error: 'Cart not found.' })
      } else {
        res.json(cartFound.productos)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  createNewCart: async (req, res) => {
    try {
      const allCarts = await cartDAO.getAll()

      const getNewId = () => {
        let lastID = 0
        if (allCarts.length) {
          lastID = allCarts[allCarts.length - 1].id
        }
        return Number(lastID) + 1
      }

      const newCart = {
        id: getNewId(),
        productos: [],
      }

      await cartDAO.addItem(newCart)
      res.json(newCart.id)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  addProductToCart: async (req, res) => {
    try {
      const cartId = req.params.id
      const prodId = req.params.id_prod

      const cartFound = await cartDAO.getById(cartId)
      const productFound = await productDAO.getById(prodId)

      if (!cartFound || !cartFound.length) {
        res.send({ error: 'Cart not found.' })
      } else if (!productFound || !productFound.length) {
        res.send({ error: 'Product not found.' })
      } else {
        await cartDAO.addItemInto(cartId, productFound)
        const updatedCart = await cartDAO.getById(cartId)
        res.json(updatedCart)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  deleteProductFromCart: async (req, res) => {
    try {
      const cartId = req.params.id
      const prodId = req.params.id_prod

      const cartFound = await cartDAO.getById(cartId)
      const productFound = await productDAO.getById(prodId)

      if (!cartFound || !cartFound.length) {
        res.send({ error: 'Cart not found.' })
      } else if (!productFound || !productFound.length) {
        res.send({ error: 'Product not found.' })
      } else {
        await cartDAO.removeItemFrom(cartId, prodId)
        const updatedCart = await cartDAO.getById(cartId)
        res.json(updatedCart)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  emptyCart: async (req, res) => {
    try {
      const cartId = req.params.id
      const cartFound = await cartDAO.getById(cartId)

      if (!cartFound || !cartFound.length) {
        res.send({ error: 'Cart not found.' })
      } else {
        await cartDAO.emptyContainer(cartId)
        const updatedCart = await cartDAO.getById(cartId)
        res.json(updatedCart)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}

//----------* EXPORTS CONTROLLER *----------//
export default cartController
