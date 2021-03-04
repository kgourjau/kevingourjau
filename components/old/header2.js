

import Link from 'next/link'

function Header2({ user, loading }) {
    return (
        <header2>
        <nav className="navbar navbar-default navbar-fixed white no-background bootsnav navbar-scrollspy"
     data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">


    <div className="container">


        <div className="navbar-header">

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">

                <i className="fa fa-bars"></i>

            </button>

            <a className="navbar-brand" href="#brand">

                <img src="assets/img/logo.png" className="logo" alt="logo"/>

            </a>

        </div>



        <div className="collapse navbar-collapse" id="navbar-menu">

            <ul className="nav navbar-nav navbar-right">

                <li className="active scroll"><a href="#home">Home</a></li>

                <li className="scroll"><a href="#about">About</a></li>

                <li className="scroll"><a href="#services">Services</a></li>

                <li className="scroll"><a href="#price">Price</a></li>

                <li className="scroll"><a href="#team">Team</a></li>

                <li className="scroll"><a href="#clients">Clients</a></li>

                <li className="scroll"><a href="#contact">Contact</a></li>

                <li className="button-holder">

                    <button type="button" className="btn btn-blue navbar-btn" data-toggle="modal"
                            data-target="#SignIn">Sign in
                    </button>

                </li>

            </ul>

        </div>


    </div>

</nav>
        </header2>
        )}

export default Header2