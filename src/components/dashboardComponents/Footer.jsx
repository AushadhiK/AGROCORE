import React from 'react';
import '../dashboardcss/footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright{' '}
        <strong>
          <span>Department of Agrarian Developmet- Sri Lanka</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="#">Aushadhi Kahapalaarachchi</a>
      </div>
    </footer>
  );
}

export default Footer