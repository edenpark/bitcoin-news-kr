import React from 'react';

import Dimmer from 'components/Common/Dimmer';

const Write = ({children, visible, onHide, onShow}) => {

    return(
        <div className="route write" onClick={!visible && onShow}>
            <div className="write-wrapper">
                <div className={`write-modal`}>
                    { visible && <div className="exit" onClick={onHide}>X</div> }
                    <div className="editor-contianer">
                        {children}
                    </div>
                </div>
            </div>
            { visible  && <Dimmer onClick={onHide} /> }
        </div>
    );
};

export default Write;
