import React from 'react';
import Container from 'components/Common/Container';
import { Grid } from 'semantic-ui-react';

const Admin = ({children}) => {
    return(
        <Container className="main single-post-wrapper">
            <Grid columns="equal">
                {children}
            </Grid>
        </Container>
    );
};

export { default as FeedContainer } from './FeedContainer';
export default Admin;
