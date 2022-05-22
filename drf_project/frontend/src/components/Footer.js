import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (

        <footer className=' fixed-bottom text-center bg-dark bg-opacity-25'>
           <div className='text-center p-3' >
             © {new Date().getFullYear()} Copyright: Kamenev Vladimir
           </div>
        </footer>
    
    )
 }

 export default Footer