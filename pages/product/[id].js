import Image from "next/image"
import { useState } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import styles from "../../styles/product.module.css";

const Product = ({ pizza }) => {
    const [size, setsize] = useState(0);
    const [price, setprice] = useState(pizza.prices[0]);
    const [quantity, setquantity] = useState(1);
    const [extras, setextras] = useState([]);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addProduct({...pizza, extras, price, quantity}))
    }

    const changePrice = (number) => {
        setprice(price + number)
    }

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size]
        setsize(sizeIndex);
        changePrice(difference)
    }

    const handleChange = (e, option)=> {
        const checked = e.target.checked
        if(checked) {
            changePrice(option.price)
            setextras(prev => [...prev, option])
        } else {
            changePrice(-option.price)
            setextras(extras.filter((extra) => extra._id !== option._id))
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} layout='fill' alt='' objectFit='contain' />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}> {pizza.title} </h1>
                <span className={styles.price}> ${price} </span>
                <p className={styles.desc}> {pizza.desc} </p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src='/images/size.png' alt='' layout="fill" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src='/images/size.png' alt='' layout="fill" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src='/images/size.png' alt='' layout="fill" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredeients</h3>
                <div className={styles.ingredents}>
                    {pizza.extraOptions.map(option => (
                        <div className={styles.option} key={option._id}>
                            <input type='checkbox' id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handleChange(e, option)} />
                            <label htmlFor='double'>{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <input type="number" onChange={(e) => setquantity(e.target.value)} defaultValue={1} className={styles.quantity} />
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product


export async function getServerSideProps({ params }) {
    const res = await axios.get(`http://localhost:3000/api/Products/${params.id}`)
    return {
        props: {
            pizza: res.data
        }
    }
}