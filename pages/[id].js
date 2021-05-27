import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'

import { client } from '../utils/shopify'

const useCart = () => {
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const addCart = (variant, quantity=1) =>
    dispatch({
      type: 'ADD_CART',
      payload: {
        variantId: variant.id,
        quantity: quantity
      }
    })

  return {  cart, addCart }
}

export default function Detail(props) {

  const [quantity, setQuantity] = useState(1);
  const [productVariant, setProductVariant] = useState(props.product.variants[0]);

  var initialOptions = {};
  props.product.variants[0].selectedOptions.forEach((option) => {
    initialOptions[option.name] = option.value
  })
  const [options, setOptions] = useState(initialOptions);


  useEffect(() => {
    setProductVariant(client.product.helpers.variantForOptions(props.product, options));
  }, [options])


  const handleOptionChange = (optionIndex, { target }) => {
    const { name, value } = target
    var currentOptions = options
    currentOptions[name] = value

    console.log(currentOptions)

    setOptions(currentOptions)
    setProductVariant(client.product.helpers.variantForOptions(props.product, options));
    // currentOptions[optionIndex] = {
    //   ...currentOptions[optionIndex],
    //   value,
    // }

    // const selectedVariant = find(variants, ({ selectedOptions }) =>
    //   isEqual(currentOptions, selectedOptions)
    // )

    // setOptions({ ...selectedVariant })
  }

  const { cart, addCart } = useCart()

  return (
    <div>
      <Head>
        <title>{props.product.title} - Next.js x Shopify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={props.product.images[0]?.src || "https://dummyimage.com/400x400"} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{props.product.vendor || `Vendor-name`}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">{props.product.title || `Title`}</h1>
                
                <p className="leading-relaxed">{props.product.description}</p>

                <div>
                  
                  {
                    props.product.options.map(({ id, name, values }, index) => 
                      <div className="flex mt-6 items-center pb-5  border-gray-100 mb-5" key={id}>
                          <label htmlFor={name} className="mr-3">{name} </label>
                          <select
                            name={name}
                            key={id}
                            onBlur={(e) => handleOptionChange(index, e)}
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                          >
                            {values.map(({value}) => (
                              <option
                                value={value}
                                key={`${name}-${value}`}
                              >
                                {value}
                              </option>
                            ))}
                          </select>
                          <br />
                      </div>
                    )
                  }
                </div>

                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mr-6">
                    Quantity 
                  </label>

                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 pl-3 pr-1"
                      value={quantity}
                      onChange={(e) => {setQuantity(parseInt(e.target.value)); }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    { `${productVariant.priceV2.currencyCode === 'JPY' ? '¥' : productVariant.priceV2.currencyCode} ${productVariant.price * quantity}` || `¥1,000`}
                  </span>
                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={() => {addCart(productVariant, quantity); setQuantity(1)}}>
                      Add Cart
                  </button>
                </div>
              </div>
            </div>
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

export const getStaticPaths = async () => {
    const products = await client.product.fetchAll();
    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }))
    return { paths, fallback: false }
  }

export const getStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        if(!id) {
          return { props: { errors: "not found" } };
        }
        const productRes = await client.product.fetch(id);
        const product = JSON.parse(JSON.stringify(productRes));
        return { props: { product: product } }
    } catch (err) {
        return { props: { errors: "unexpected error" } };
    }
};