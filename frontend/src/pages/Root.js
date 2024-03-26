import { Outlet, useLoaderData, useSubmit} from 'react-router-dom';
import { useEffect } from 'react';

import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
const token = useLoaderData();
const submit = useSubmit();
  useEffect(() => {
   if(!token) {
    return
   } 

   const tokenDuration =getTokenDuration();
   console.log(tokenDuration);

   if(token === 'EXPIRED') {
    submit(null, { action: '/logout', method: 'post'});
    return
   }
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post'});
    }, tokenDuration)
   
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
