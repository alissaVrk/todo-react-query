import { useState } from 'react';
import { QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";
import './App.css';
import { createQueryClient } from './core/queryClient';
import Todos from './todo/components/Todos';
import { CurrentUser } from './user/components/CurrentUser';

const queryClient = createQueryClient()

function App() {
  const [show, setShow] = useState(true);
  
  return (
    <div className='rtw'>
      <QueryClientProvider client={queryClient}>
        <CurrentUser />
        <button onClick={() => setShow(!show)}>toggle</button>
        {show && <Todos/>}

        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
