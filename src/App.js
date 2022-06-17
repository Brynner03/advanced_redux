import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {

  const showCart = useSelector((state) => state.ui.cartIsVisible )
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const sendCartData = async () => {

      const response = await fetch(
        'https://redux-practice-8e7e6-default-rtdb.firebaseio.com/cart.json',
        { 
          method: 'PUT', 
          body: JSON.stringify(cart),
        }
      )

      if (!response.ok) {
        throw new Error('Sending cart failed..')
      }

      const responseData = await response.json()
    }
  },[cart])

  return (
    <Layout>
      {showCart &&<Cart />}
      <Products />
    </Layout>
  );
}

export default App;
