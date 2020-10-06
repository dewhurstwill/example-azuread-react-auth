// Node Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Layout Component
const Layout = ({token, fullName, text, children, ...rest}) => {

    const menuState = useState({
        isMenuOpen: false,
        mainStyle: { "marginTop": "50px" },
        mainClasses: "w3-container",
        menuStyle: {},
        menuClasses: "w3-hide",
        menuItemClasses: "w3-bar-item w3-button w3-xlarge w3-hover-grey"
    });

    const triggerMenu = () => {
        menuState[0].isMenuOpen ? (
            menuState[1](prevInputState => ({
                ...prevInputState, 
                isMenuOpen: false,
                mainStyle: { "marginTop": "50px", "marginLeft": "0px", "backgroundColor": "#e7e7e7" },
                mainClasses: "w3-container",
                menuStyle: { "width": "0px" },
                menuClasses: "w3-hide"
            }))
        ) : (
            menuState[1](prevInputState => ({
                ...prevInputState, 
                isMenuOpen: true,
                mainStyle: { "marginTop": "50px", "marginLeft": "250px", "backgroundColor": "#e7e7e7" },
                mainClasses: "w3-container w3-animate-left",
                menuStyle: { "width": "250px", "marginTop": "4px" },
                menuClasses: "w3-sidebar w3-black w3-animate-left w3-bar-block"
            }))
        )
    }

    return (
        <>
            <div className="w3-top">
                <div className="w3-bar w3-black">
                    { token ? (
                        <a 
                            href="/" 
                            className="w3-bar-item w3-hover-grey w3-button w3-padding-16"
                            onClick={e => {
                                e.preventDefault();
                                return triggerMenu();
                            }}
                        >
                            <b>{ menuState[0].isMenuOpen ? "Close" : "Menu" }</b>
                        </a> 
                    ) : null }
                    { token ? (
                        <>
                            <a href="https://portal.office.com/account/" className="w3-hide-small w3-hover-grey w3-bar-item w3-button w3-padding-16">
                                <b>{fullName}</b>
                            </a>
                        </>
                    ) : (
                        <Link
                            className="w3-bar-item w3-hover-grey w3-button w3-padding-16 "
                            to="/login">
                            <b>Login</b>
                        </Link>
                    )
                    }
                    <div className="w3-bar-item w3-padding-16 w3-hide-small w3-right">
                        <b>{ text ? `${text} | Example App` : "Example App" }</b>
                    </div>        
                </div>
            </div>
            <div className={menuState[0].menuClasses} style={{...menuState[0].menuStyle}}>
                <div className="w3-bar-item" style={{"float": "top"}}></div>
                <Link 
                    className={menuState[0].menuItemClasses}
                    style={{"float": "top"}} 
                    to="/"
                    >
                        <div className="w3-left">Home</div>
                </Link>
                <Link
                    className={menuState[0].menuItemClasses} 
                    style={{"float": "bottom"}}
                    to="/logout"
                    >
                        <div className="w3-left">Logout</div>
                </Link>
            </div>
            <div className={menuState[0].mainClasses} style={{...menuState[0].mainStyle}} onClick={e => {
                e.preventDefault();
                if(menuState[0].isMenuOpen){
                    return triggerMenu();
                }
                return;
            }}>
                { 
                    token || (text === "Error") ? children : (
                        <section>
                            <div style={{"paddingTop": "40px"}}>
                                { (text === "404") ? (
                                        <>
                                            <div className="w3-center">
                                                <h1 className="w3-black">Error 404: Page not found</h1>
                                                <Link
                                                    to="/"
                                                    className="w3-button w3-black w3-hover-grey w3-round">
                                                    {`< Back`}
                                                </Link>
                                            </div>
                                        </>
                                    ) : null
                                }
                            </div>
                        </section>
                    )
                }
            </div>
        </>
    );
};

export default Layout;