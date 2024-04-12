import React from 'react'


const Footer = () => {
  return (
    <>
        <footer>
  <div className="footer-container">
    <div className="footer-left">
      <h3>Contact Us</h3>
      <p>Email: info@example.com</p>
      <p>Phone: +92-123-456-7890</p>
    </div>
    <div className="footer-right">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <a href="#">
          <img src="/images/facebook.png" alt="Facebook" />
        </a>
        <a href="#">
          <img src="/images/twitter.png" alt="Twitter" />
        </a>
        <a href="#">
          <img src="/images/instagram.jpeg" alt="Instagram" />
        </a>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer