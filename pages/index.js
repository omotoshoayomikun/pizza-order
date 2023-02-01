
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'
import Slider from '../components/Slider';
import PizzaList from '../components/PizzaList';
import axios from 'axios';
import AddButton from '../components/AddButton';
import { useState } from 'react';
import Add from '../components/Add';
import { serverUrl } from '../util/baseUrl';

export default function Home({pizzaList, admin}) {
  const [close, setclose] = useState(true)
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pizza Resturant in Nigeria</title>
        <meta name='description' content='Best pizza in Nigeria' />
      </Head>
      <Slider />
      {admin && (<AddButton  setClose={setclose} />)}
      {
        pizzaList && <PizzaList PizzaList={pizzaList} />
      }
      {!close && (<Add setClose={setclose}/>)}
    </>
  )
}

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;

  if(myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get(`${serverUrl}/api/Products`)
  return {
    props: {
      pizzaList: res.data,
      admin
    }
  }
}

