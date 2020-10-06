// Node Modules
import React from 'react';
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
            text={token ? "Home" : null } >
            <section>
                    <div style={{"paddingTop": "40px"}}>
                        <div className="w3-center">
                            <h1>Home</h1>
                        </div>
                    </div>
                </section>
        </Layout>
    )
};

export default Home;