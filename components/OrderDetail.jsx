import { useState } from 'react'
import styles from '../styles/OrderDetail.module.css'


const OrderDetail = ({total, creatOrder}) => {

    const [customer, setcustomer] = useState('');
    const [address, setaddress] = useState('')

    const handleClick = () => {
        creatOrder({ customer, address, total, method: 0 })
    }

    return (
        <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You will pay ${total} after delivery</h1>
            <div className={styles.item}>
                <label className={styles.label}>Name Surname</label>
                <input type="text" placeholder='John Doe' className={styles.input} onChange={(e) => setcustomer(e.target.value)} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Phone Number</label>
                <input type="text" placeholder='+234 567 432' className={styles.input} />
            </div>
            <div className={styles.item}>
                <label className={styles.label}>Address</label>
                <textarea placeholder='Owode area offa' rows="5"  onChange={(e) => setaddress(e.target.value)}></textarea>
            </div>
            <button className={styles.button} onClick={handleClick}>Order</button>
        </div>

        </div>
    )
}

export default OrderDetail