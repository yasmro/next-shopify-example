import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { client } from '../utils/shopify'

export default function Home(props) {

  const cart = useSelector((state) => state.cart)

  const [checkoutLink, setCheckoutLink] = useState("");
  useEffect(() => {
      client.checkout.create().then((checkout) => {
        setCheckoutLink(checkout.webUrl);
          client.checkout.addLineItems(checkout.id, cart)
          .then((checkout) => {
              console.log(checkout.lineItems); 
              setCheckoutLink(checkout.webUrl);
          });
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-6xl mb-12 font-semibold">Cart</h1> 
            <table className="min-w-full mb-12 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    VariantId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Qty
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.map((product) => (
                  <tr key={product.variantId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.variantId}</div>
                          <div className="text-sm text-gray-500">{product.variantId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.quantity}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href={checkoutLink}>
                <button className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Checkout
                </button>
            </Link>
          </div>
          <Link href="/" as={`/`}>
            <button className="flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
              Back
            </button>
          </Link>    
        </section>
        
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
