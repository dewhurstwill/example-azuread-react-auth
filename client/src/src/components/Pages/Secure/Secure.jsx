// Node Modules
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Local
// Components
import Layout from '../../Layout/Layout';

// Home Component
const Home = () => {
    const { token, fullName } = useSelector(state => state.userInfo);

    return(
        <Layout 
            token={token}
            fullName={fullName}
            text={token ? "Secure Page" : null } >
            <section>
                    <div style={{"paddingTop": "40px"}}>
                        <div className="w3-center">
                            <h1>Secure Page</h1>
                        </div>
                        <div style={{"textAlign": "center"}}>
                                <Link 
                                    to="/"
                                    className="w3-button w3-black w3-hover-grey w3-round"
                                    >
                                    {`< Home`}
                                </Link>
                            </div>
                    </div>
                </section>
        </Layout>
    )
};

export default Home;