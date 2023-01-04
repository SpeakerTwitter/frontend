import { Link } from 'react-router-dom'
 
const Header = (props) => {
   return (
       <header style={{overflow: 'hidden' }}>
           <nav className="nav">
               <Link to='/'>
                    <h1>Home</h1>
               </Link>
           </nav>
       </header>
   )
}
 
export default Header