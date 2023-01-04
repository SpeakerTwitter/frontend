import { Link } from 'react-router-dom'
 
const Header = (props) => {
   return (
       <header style={{ height: "300px", overflow: 'hidden' }}>
           <nav className="nav">
               <Link to='/'>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
               </Link>
           </nav>
           <img src="https://tse4.mm.bing.net/th?id=OIP.5yGbSisW4B8-BflHQXeO4QHaEo&pid=Api&P=0" />
       </header>
   )
}
 
export default Header