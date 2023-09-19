import React from 'react'
import working from '../images/working.png'

import Footer from './Footer'

const Working = () => {
  return (
    <div>
        <br></br>
        <br></br>
        <br></br>
      <div className="container-fluid text-center" style={{ backgroundColor: '#eeeeee',height:'95vh'}}>
      <h1 className="pt-3 text-center"style={{ color: '#4455a4'}}>HOW PROCONNECT WORKS</h1>
            <div className='pt-3'>
                <img src={working} alt="" style={{height:'77vh',width:'90%'}}/>
            </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Working
