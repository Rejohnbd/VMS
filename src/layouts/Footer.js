import React from 'react';
import { connect } from "react-redux";
const Footer = () => {
    function showYear(){
        return new Date().getFullYear()
    }
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
            <div className="copyright text-center my-auto">
                <span>Copyright &copy; 2019 to {showYear()}</span>
            </div>
            </div>
      </footer>
    );
}
 
export default connect()(Footer);