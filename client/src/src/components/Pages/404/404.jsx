// Node Modules
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Local Modules
import Layout from '../../Layout/Layout'

const NotFoundPage = () => {
    const { token, fullName } = useSelector(state => state.userInfo);
    
    return (
        <Layout 
            token={token}
            fullName={fullName} 
            text="404">
                <section>
                    <div style={{"paddingTop": "40px"}}>
                        <div className="w3-center">
                            <h1>Error 404: Page not found</h1>
                            <div style={{"textAlign": "center"}}>
                                <Link 
                                    to="/"
                                    className="w3-button w3-black w3-hover-grey w3-round"
                                    >
                                    {`< Back`}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
        </Layout>
    );
}

export default NotFoundPage
