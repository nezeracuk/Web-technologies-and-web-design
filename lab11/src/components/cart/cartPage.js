import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, updateCartItemCount, loadCartFromLocalStorage } from '../../redux/cartAction';
import Button from './Button';
import './cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadCartFromLocalStorage());
    }, [dispatch]);

    const handleRemove = (id, selectedage, selectedRarity) => {
        dispatch(removeFromCart({ id, selectedage, selectedRarity }));
    };

    const handleUpdateCount = (id, selectedage, selectedRarity, newCount) => {
        dispatch(updateCartItemCount({ id, selectedage, selectedRarity, newCount }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedage}-${item.selectedRarity}`} className="cart-item">
                                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.title}</h4>
                                    <p className="cart-item-color">Age: {item.selectedage}</p>
                                    <p className="cart-item-size">Rarity: {item.selectedRarity}</p>
                                    <p className="cart-item-price">Price per item: ${item.price.toFixed(2)}</p>
                                    <div className="cart-item-quantity">
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.selectedage, item.selectedRarity, item.count - 1)
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.count}</span>
                                        <button
                                            className="quantity-button"
                                            onClick={() =>
                                                handleUpdateCount(item.id, item.selectedage, item.selectedRarity, item.count + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="cart-item-total">
                                        Total: ${(item.price * item.count).toFixed(2)}
                                    </p>
                                    <Button
                                        className="remove-button"
                                        onClick={() => handleRemove(item.id, item.selectedage, item.selectedRarity)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Price: ${getTotalPrice()}</p>
                        <Button className="clear-cart-button" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                        <Button className="checkout-button" onClick={handleProceedToCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
