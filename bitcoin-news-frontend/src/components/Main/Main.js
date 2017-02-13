import React from 'react';
import Container from 'components/Common/Container';
import { Grid } from 'semantic-ui-react';

const Main = ({children}) => {
    return(
        <Container className="main">
            <Grid columns="equal">
                {children}
            </Grid>
        </Container>
    );
};

export { default as LeftColumn } from './Column/LeftColumn';
export { default as CenterColumn } from './Column/CenterColumn';
export { default as RightColumn } from './Column/RightColumn';

// Left-side column
export { default as Sorter } from './Sorter';
export { default as Favorite } from './Favorite';
export default Main;
