import axios from 'axios';
import { useState } from 'react'
import styles from '../styles/Add.module.css'
import { serverUrl } from '../util/baseUrl';


const Add = ({setClose}) => {
    const [file, setfile] = useState(null);
    const [title, settitle] = useState(null);
    const [desc, setdesc] = useState(null);
    const [prices, setprices] = useState([]);
    const [extraOptions, setextraOptions] = useState([]);
    const [extra, setextra] = useState(null);


    const changePrice = (e, index) => {
        const currentPrice = prices;
        currentPrice[index] = e.target.value
        setprices(currentPrice);
    }

    const handleExtraInput = (e) => {
        setextra({ ...extra, [e.target.name]: e.target.value })
    }

    const handleExtra = (e) => {
        setextraOptions(prev => [...prev, extra])
    }


    const handleCreate = async () => {
        const data = new FormData();
        data.append('file', file);
        // I DID SOME SETTING IN MY CLOUDINARY THEN I APPEND THIS ('upload_preset', 'uploads')
        data.append('upload_preset', 'uploads')
        try {
            //DROPPING THE IMAGE TO MY CLOUDINARY
           const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/ayomikun/image/upload`, data);
           const { url } = uploadRes.data;
            // AT THIS POINT AM DONE SENDING THE IMAGE TO MY CLOUDINARY 

            // I WANT TO MAKE A POST REQUIEST TO MY DATABASE
            const newProduct = {
                title, desc, img: url, prices, extraOptions
            };
            await axios.post(`${serverUrl}/api/Products`, newProduct);
            console.log(newProduct)
            setClose(true);
        }
        catch(err) {
            console.log(err)
        }

    }



    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span className={styles.close} onClick={() => setClose(true)}>X</span>
                <h1>Add a new pizza</h1>
                <label className={styles.label}>Choose an Image</label>
                <input type="file" onChange={(e) => setfile(e.target.files[0])} />
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input type="text" className={styles.input} onChange={(e) => settitle(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea rows="4" onChange={(e) => setdesc(e.target.value)}></textarea>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                        <input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder='Small' onChange={(e) => changePrice(e, 0)} />
                        <input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder='Medium' onChange={(e) => changePrice(e, 1)} />
                        <input type="number" className={`${styles.input} ${styles.inputSm}`} placeholder='Large' onChange={(e) => changePrice(e, 2)} />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input type="text" className={`${styles.input} ${styles.inputSm}`} placeholder='Item' name='text' onChange={handleExtraInput} />
                        <input type="text" className={`${styles.input} ${styles.inputSm}`} placeholder='price' name='price' onChange={handleExtraInput} />
                        <button className={styles.extraButton} onClick={handleExtra}>Add</button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map((option, i) => (
                            <span key={i} className={styles.extraItem}>{option.text} </span>
                        ))}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}

export default Add