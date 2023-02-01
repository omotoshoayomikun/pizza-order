import axios from "axios"
import Image from "next/image"
import styles from '../../styles/Order.module.css'

const Order = ({order}) => {


    // I JUST USE THIS TO POST STATIC DATA TO THE DATABASE INSTEAD OF USING POSTMAN SINCE HAVE NOT DESIGN LAYOUT FOR INPUT YET 
    // const handlePostProduct = async () => {
    //     const res = await axios.post('http://localhost:3000/api/Products', {
    //         title: "pizza4",
    //         img: "/images/pizza.png",
    //         desc: "desc4",
    //         prices: [12, 13, 14],
    //         extraOptions: [
    //             {
    //                 text: "Spicy sauce",
    //                 price: 2
    //             },
    //             {
    //                 text: "Galic sauce",
    //                 price: 3
    //             },
    //         ]
    //     })
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))

    // }


    const status = order.status

    const statusClass = (index) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.row}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={styles.tr}>
                                <td>
                                    <span className={styles.id}>{order._id}</span>
                                </td>
                                <td>
                                    <span className={styles.name}>
                                        {order.customer}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.address}>{order.address}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>{order.total}</span>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image src='/images/paid.png' width={30} height={30} alt='' />
                        <span>Payment</span>
                        <div className={styles.checkedIcon}>
                            <Image src='/images/checked.png' className={styles.checkedIcon} width={20} height={20} alt='' />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src='/images/bake.png' width={30} height={30} alt='' />
                        <span>Preparing</span>
                        <div className={styles.checkedIcon}>
                            <Image src='/images/checked.png' className={styles.checkedIcon} width={20} height={20} alt='' />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src='/images/bike.png' width={30} height={30} alt='' />
                        <span>On the way</span>
                        <div className={styles.checkedIcon}>
                            <Image src='/images/checked.png' className={styles.checkedIcon} width={20} height={20} alt='' />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src='/images/delivered.png' width={30} height={30} alt='' />
                        <span>Delivered</span>
                        <div className={styles.checkedIcon}>
                            <Image src='/images/checked.png' className={styles.checkedIcon} width={20} height={20} alt='' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>CART TOTAL</div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            subTotal: <b>${order.total}</b>
                        </div>
                    </div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            Discount: <b>$0.00</b>
                        </div>
                    </div>
                    <div className={styles.totalText}>
                        <div className={styles.totalTextTitle}>
                            Total: <b>${order.total}</b>
                        </div>
                        <button disabled className={styles.button}>PAID</button>
                    </div>

                </div>
            </div>


            {/* <button onClick={handlePostProduct}>Post Product</button> */}
        </div>
    )
}

export default Order

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/Orders/${params.id}`)

    return {
        props: {
            order: res.data
        }
    }
}