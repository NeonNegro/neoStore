import { useMemo, useState } from 'react'
import { CartContext } from './cart-context.js'

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const value = useMemo(() => {
    const addItem = (product) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.id === product.id)

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        }

        return [...currentItems, { ...product, quantity: 1 }]
      })
      setIsCartOpen(true) // Abre o carrinho automaticamente ao adicionar item
    }

    const removeItem = (productId) => {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
          )
          .filter((item) => item.quantity > 0),
      )
    }

    const clearCart = () => setItems([])
    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return {
      addItem,
      clearCart,
      items,
      removeItem,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
    }
  }, [items, isCartOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
