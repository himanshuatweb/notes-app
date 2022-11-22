import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
  return (
    <div className='about-main'>
        <div className="card">
            <h2>Version : <b>0.0.1</b> </h2>
            <div className="button-back">
                <Link to='/'>
                    Back To Home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default About