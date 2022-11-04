import { useRef , useState} from 'react';
import classes from './CheckOut.module.css';


const isEmpty=(value)=>value.trim() === '';
const isFiveChars=(value)=>value.trim().length === 5;

const CheckOut = (props) => {
    const [formInputsValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true,
    });
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();

  const confirmHandler = event=>{
      event.preventDefault();

      const enteredName=nameInputRef.current.value;
      const enterdStreet=streetInputRef.current.value;
      const enteredPostal=postalInputRef.current.value;
      const enteredCity=cityInputRef.current.value;

      const enteredNameIsValid= !isEmpty(enteredName);
      const enteredStreetIsValid= !isEmpty(enterdStreet);
      const enteredCityIsValid=!isEmpty(enteredCity);
      const enteredPostalCodeIsValid=isFiveChars(enteredPostal);

      const formIsValid=
        enteredNameIsValid &&
        enteredStreetIsValid &&
        enteredCityIsValid && 
        enteredPostalCodeIsValid;
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
          });
      if(!formIsValid) {
          return;
      } 
      props.onConfirm({
        name:enteredName,
        street:enterdStreet,
        postalCode:enteredPostal,
        city:enteredCity,
      });
  };
  
      const nameControlClasses =`${classes.control} ${
        formInputsValidity.name ? '' :classes.invalid
      }`;
      const streetControlClasses =`${classes.control} ${
        formInputsValidity.street ? '' :classes.invalid
      }`;
      const postalControlClasses =`${classes.control} ${
        formInputsValidity.postalCode ? '' :classes.invalid
      }`;
      const cityControlClasses =`${classes.control} ${
        formInputsValidity.city ? '' :classes.invalid
      }`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
            <label htmlFor="name">Your name</label>
            <input type="text" name="name" ref={nameInputRef}/>
            {!formInputsValidity.name && <p>Please Enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
            <label htmlFor="street">Street</label>
            <input type="text" name="street" ref={streetInputRef}/>
            {!formInputsValidity.name && <p>Please Enter a valid street</p>}
            </div>
            <div className={postalControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" name="postal" ref={postalInputRef}/>
            {!formInputsValidity.name && <p>Please Enter a valid postal code</p>}
            </div>
            <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" name="city" ref={cityInputRef}/>
            {!formInputsValidity.name && <p>Please Enter a valid city</p>}
            </div>
            <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button  className={classes.submit}>Confirm</button>
            </div>
           
        </form>
    );
};
export default CheckOut;