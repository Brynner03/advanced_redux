import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice'

function App() {

  const dispatch = useDispatch()
  const showCart = useSelector((state) => state.ui.cartIsVisible )
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending',
        message: 'Sending cart data!'
      }))
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

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success',
        message: 'Sent cart successfully!'
      }))
    }
    sendCartData().catch((error) => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data has failed!!'
      }))
    })
  },[cart, dispatch])

  return (
    <Layout>
      {showCart &&<Cart />}
      <Products />
    </Layout>
  );
}

export default App;
