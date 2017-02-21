import React from 'react';
import { Button } from 'semantic-ui-react';


const UpVote = () => {
    return(
        <span className="post-info-item upvote">
            <Button
              content='읽기를 추천'
              icon='thumbs up'
              label={{ as: 'a', basic: true, content: '2,048' }}
              labelPosition='right'
              size='small'
            />
        </span>
    );
};

export default UpVote;

// <Button
//   color='red'
//   content='Like'
//   icon='heart'
//   label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
// />
