import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Cart.module.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import OrderDetail from '../components/OrderDetail';


const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const [cash, setcash] = useState(false)

    const router = useRouter();

    const creatOrder = async (data) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/Orders`, data)

            res.status === 201 && router.push("/orders/" + res.data._id)
            dispatch(reset())
        }
        catch (err) {
            console.log(err)
        }
    }
    /// THIS BELONG TO PAYPAL DONT GET CONFUSED
    const [open, setopen] = useState(false)
    const amount = cart.total;
    const currency = "USD";
    const style = { "layout": "vertical" };

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        creatOrder({ customer: shipping.name.full_name, address: shipping.address.address_line_1, total: cart.total, method: 1 })
                    });
                }}
            />
        </>
        );
    }


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products.map(product => (

                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image src={product.img} alt='' layout='fill' objectFit='contain' />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}> {product.title} </span>
                                </td>
                                <td>
                                    {product.extras.map(extra => (
                                        <span key={extra._id} className={styles.extras}>
                                            {extra.text},
                                        </span>
                                    ))}
                                </td>
                                <td>
                                    <span className={styles.price}>${product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>${product.price * product.quantity}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>CART TOTAL</div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            subTotal: <b>${cart.total}</b>
                        </div>
                    </div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            Discount: <b>$0.00</b>
                        </div>
                    </div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            Total: <b>${cart.total}</b>
                        </div>
                        {open ? (
                            <div className={styles.paymentMethods}>
                                <button className={styles.payButton} onClick={() => setcash(true)}>CASH ON DELIVERY</button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "ATzeSs5STwgEIXp8WohqebjvD8HkicnZCNjY5owivPugq-yaliwi9DbKmjDdFXAvwDf5HZongBazmwXn",
                                        components: "buttons",
                                        currency: "USD",
                                        // "disable-funding": "credit, card, p24",
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        ) : (
                            <button className={styles.button} onClick={() => setopen(true)}>CHECKOUT NOW!</button>
                        )}
                    </div>
                </div>
            </div>
                {cash && (<OrderDetail total={cart.total} creatOrder={creatOrder}/>)}
        </div>
    )
}

export default Cart