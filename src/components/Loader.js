import React from 'react';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import './style/loader.css';
function Loader(){
    return (
        <div className="container-loader">
            <i className="fas fa-cog fa-spin loader"></i>
        </div>
    );
}

export default Loader;