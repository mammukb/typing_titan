import './footer.css'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer>
    <div className="container">
      <div className="social-media">
        <a href="https://www.facebook.com/muhammed.kb.39?mibextid=ZbWKwL"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="https://github.com/mammukb"><i className="fab fa-github fa-2x"></i></a>
        <a href="https://instagram.com/__mammu_kb__?igshid=ZDdkNTZiNTM="><i className="fab fa-instagram fa-2x"></i></a>
        <a href="http://www.linkedin.com/in/muhammedkb"><i className="fab fa-linkedin fa-2x"></i></a>
      </div>
      <p>&copy; 2023 Typing Titan. All rights reserved.</p>
      <ul>
        <li></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer