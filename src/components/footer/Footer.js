import './footer.css'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer>
    <div className="container">
      <div className="social-media">
        <a href="https://www.facebook.com"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="https://www.twitter.com"><i className="fab fa-github fa-2x"></i></a>
        <a href="https://www.instagram.com"><i className="fab fa-instagram fa-2x"></i></a>
        <a href="https://www.linkedin.com"><i className="fab fa-linkedin fa-2x"></i></a>
      </div>
      <p>&copy; 2021 Example Company. All rights reserved.</p>
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer