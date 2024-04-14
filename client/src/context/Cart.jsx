import { createContext, useContext, useEffect, useState } from "react"


const CartContext=createContext()
const CartProvider=({children})=>{
    const [cart,setCart]=useState([])

useEffect(()=>{
    let existItem=localStorage.getItem('cart')
    if(existItem){
        setCart(JSON.parse(existItem))
    }
},[])
return(
    <CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>
)
}
const useCart=()=>useContext(CartContext)

export {useCart,CartProvider}