import { Provider } from 'react-redux'
import { useStore } from '../store'

import 'tailwindcss/tailwind.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Header />
      <div className="container md:mx-12">
        <Component {...pageProps} />
      </div>
      <Footer />
    </Provider>
  )
}
