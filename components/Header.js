import React from 'react'

import Link from 'next/link'
import { useSelector } from 'react-redux';

function Header() {
    const cart = useSelector((state) => state.cart)
    var totalQuantity = 0;
    cart.forEach((product) => totalQuantity += product.quantity)
    return (
        <header className="flex justify-between items-center text-white bg-gray-600 px-6 py-4">
        <Link href="/" as={`/`}>
            <a>
                <h1 className="text-4xl font-semibold">Next js x shopify</h1>
            </a>
        </Link>
        
        <div className="flex">
          <Link href="/cart" as={`/cart`}>
              <a className="flex">
                <span className="mr-3 mt-0">Cart</span>
                {
                    totalQuantity > 0 && 
                    <span class="bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700">{totalQuantity}</span>
                }
              </a>
          </Link>
        </div>
      </header>
    )
}

export default Header
