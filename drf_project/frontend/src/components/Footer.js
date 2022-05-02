import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (

        <footer class=' fixed-bottom text-center bg-dark bg-opacity-25'>
           <div class='text-center p-3' >
             © {new Date().getFullYear()} Copyright: Kamenev Vladimir
           </div>
        </footer>
    
    )
 }

 export default Footer