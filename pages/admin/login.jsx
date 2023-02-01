import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../../styles/Login.module.css'

const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        try {
            await axios.post(`http://localhost:3000/api/login`,{
                username,password
            })
            await router.push('/admin')
        }
        catch(err) {
            setError(true)
            
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Admin Dashboard</h1>
                <input type="text" className={styles.input} value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className={styles.input} value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button className={styles.button} onClick={handleClick}>Sign in</button>
                {error && (<span className={styles.error}>Wrong Credentials!</span>)}
            </div>
        </div>
    )
}

export default Login