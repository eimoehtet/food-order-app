import React, { useContext,useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [isCheckOut,setIsCheckOut] =useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSumit,setDidSubmit]=useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({item});
  };
  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const orderConfirmHandler = async(userData) => {
    setIsSubmitting(true);
    await fetch('https://react-http-57206-default-rtdb.firebaseio.com//orders.json',{
      method:"POST",
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items,
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true)
    cartCtx.clearCart();
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>
const cartModalContent=<React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut &&<CheckOut onConfirm={orderConfirmHandler} onCancel={props.onClose}/>}
      {!isCheckOut && modalActions}
</React.Fragment>

const isSubmittingModalContent=<p>Sending Order data...</p>
const didSubmitModalContent=<React.Fragment>
  <p>Successfully sent the order data!</p>
  <div className={classes.actions}>
  <button className={classes.button} onClick={props.onClose}>
    Close
  </button>
    </div>
  
  </React.Fragment>
  return (
   
    <Modal onClose={props.onClose}>
       
    {!isSubmitting && !didSumit && cartModalContent}
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && didSumit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;