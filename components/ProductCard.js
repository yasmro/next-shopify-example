import React from 'react'

import Link from 'next/link'

const ProductCard = ({ product }) => {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-5 w-full">
        <Link href="/[id]" as={`/${product.id}`}>
          <a>
            <a className="block relative h-48 rounded overflow-hidden">
              <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={product.images[0]?.src || "https://dummyimage.com/400x400"} />
            </a>
            <div className="mt-4">
              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category || `CATEGORY`}</h3>
              <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
              <p className="mt-1">{`¥ ${product.variants[0].price}` || `¥100`}</p>
            </div>
          </a>
        </Link>
      </div>
    )
}

export default ProductCard
