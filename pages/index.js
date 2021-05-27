import { useState, useEffect } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { client } from '../utils/shopify'
import ProductCard from '../components/ProductCard'

export default function Home(props) {


  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        

        <div className="flex flex-wrap">
          {props.products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>

      </main>
    </div>
  )
}

export const getStaticProps = async () => {  
  const products = await client.product.fetchAll();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
