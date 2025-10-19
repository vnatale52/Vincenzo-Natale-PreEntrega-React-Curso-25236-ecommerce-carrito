import React, { createContext, useState, useEffect, useContext } from 'react'
const CartContext = createContext()

export const CartProvider = ({children})=>{
  const [cart, setCart] = useState(()=>{ try{ const r=localStorage.getItem('cart'); return r?JSON.parse(r):[] }catch{return []} })

  useEffect(()=>{ try{ localStorage.setItem('cart', JSON.stringify(cart)) }catch{} },[cart])

  const addToCart = (product)=>{
    setCart(prev=>{
      const ex = prev.find(p=>p.id===product.id)
      if(ex) return prev.map(p=> p.id===product.id ? {...p, quantity: (p.quantity||1)+1} : p)
      return [...prev, {...product, quantity:1}]
    })
  }

  const setQuantity = (id, qty) => setCart(prev=> prev.map(p=> p.id===id ? {...p, quantity: qty} : p))
  const removeFromCart = (id) => setCart(prev=> prev.filter(p=> p.id!==id))
  const clearCart = ()=> setCart([])

  const totalItems = cart.reduce((s,p)=> s + (p.quantity||0), 0)
  const totalPrice = cart.reduce((s,p)=> s + (p.quantity||0) * (Number(p.price)||0), 0)

  return <CartContext.Provider value={{cart,setCart,addToCart,setQuantity,removeFromCart,clearCart,totalItems,totalPrice}}>{children}</CartContext.Provider>
}

export const useCart = ()=> useContext(CartContext)
export default CartContext
