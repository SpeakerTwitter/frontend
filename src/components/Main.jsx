import {Routes, Route } from 'react-router-dom'
import Tweet from '../pages/Tweet/Tweet'
import Show from '../pages/Show'
 
const Main = () => {
 return (
   <main>
       <Routes>
           <Route path='/' element={< Tweet />}/>
           <Route path='/tweet/:id' element={< Show />}/>
       </Routes>
 
   </main>
 )
}
 
export default Main