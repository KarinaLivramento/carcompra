import React, { useState, createContext } from "react";
import Products from "../components/Products";

export const CarContext = createContext({});

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);


    function addItemCart(newItem) {
        // Ver se esse item ja esta no seu carrinho e ai adicionar +1 quantidade
        // Se nao estiver no carrinho, adicionar
        const indexItem = cart.findIndex(item => item.id === newItem.id);

        if (indexItem !== -1) {
           // Se entrou quer dizer que temos que adicionar +1 quantidade porque ele ja esta na sua lista  
           let cartList = cart;
           cartList[indexItem].amount = cartList[indexItem].amount +1;
           cartList[indexItem].total =  cartList[indexItem].amount *  cartList[indexItem].price;

           setCart(cartList);
           totalResultCart(cartList);
           return;
        }

        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data]);
        totalResultCart([...cart, data]);
        
    }

    function removeItemCart(product) {
        const indexItem = cart.findIndex(item => item.id === product.id);

        if (cart[indexItem]?.amount > 1) {
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount -1;

            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList);
            return;
        }

        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem);
        totalResultCart(removeItem);
    }

    function totalResultCart(items) {
        let myCart = items;
        let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0);

        setTotal(result.toFixed(2)); // toFixed(2) duas casas decimais
        
    }

    return(
        <CarContext.Provider
        value={{ 
            cart, 
            addItemCart,
            removeItemCart, 
            total,
        }}
        >
            {children}
        </CarContext.Provider>
    );
}

export default CartProvider;