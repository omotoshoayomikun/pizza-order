import Image from 'next/image'
import axios from 'axios'
import styles from '../../styles/Admin.module.css'
import { useState } from 'react'
import { serverUrl } from '../../util/baseUrl'

const Admin = ({products, orders}) => {

    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)

    const [status, setstatus] = useState(['Preparing', 'on the way', 'delivered'])

    const handleStatus = async (id) => {

        const item = orderList.filter(order => order._id === id)[0]
        const currentStatus = item.status

        try {
            const res = await axios.put(`${serverUrlerUrl}/api/Orders/`+id, {status: currentStatus + 1});
            setOrderList([
                res.data, 
                ...orderList.filter(order => order._id !== id)
            ])
        }
        catch(err) {
            console.log(err)
        }
    }
    
    const handleDelete = async (id) => {
        try {
           const res = await axios.delete(`${serverUrl}/api/Products/`+id);
            setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzaList.map(product => (
                        <tr className={styles.trTitle} key={product._id}>
                            <td>
                                <Image src={product.img} alt='' width={50} height={50} objectFit="cover" />
                            </td>
                            <td> {product._id.slice(0,5).concat('....')} </td>
                            <td>{product.title}</td>
                            <td>${product.prices[0]}</td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                        </tbody>
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderList.map(order => (
                        <tr className={styles.trTitle} key={order._id}>
                            <td>{order._id.slice(0, 5).concat('....')}</td>
                            <td>{order.customer}</td>
                            <td>${order.total}</td>
                            <td>{order.method === 0? (<span>Cash</span>): (<span>Paid</span>)}</td>
                            <td> {status[order.status]} </td>
                            <td>
                                <button className={styles.button} onClick={() => handleStatus(order._id)}>Next Stage</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  console.log(myCookie);

  if(myCookie.token !== process.env.TOKEN) {
      return {
          redirect: {
              destination: '/admin/login',
              permanent: false
          }
      }
  }
    const productRes = await axios.get(`${serverUrl}/api/Products/`);
    const ordersRes = await axios.get(`${serverUrl}/api/Orders`)

    return {
        props: {
            products: productRes.data,
            orders: ordersRes.data
        }
    }
}
