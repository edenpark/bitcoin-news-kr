import React from 'react';
import { Icon, } from 'semantic-ui-react';

const EditorSelector = ({activeEditor, visible, onRichEditor, onUrlEditor}) => {
    return(
        <div className={`editor-selector ${visible ? 'active': ''}`}>
            <div
                className={`option-item ${activeEditor==='rich' ? 'selected' : ''}`}
                onClick={onRichEditor}>
                <Icon name='write' fitted size="small" />
                <span>글쓰기</span>
            </div>
            <div
                className={`option-item ${activeEditor==='url' ? 'selected' : ''}`}
                onClick={onUrlEditor}>
                <Icon name='linkify' fitted size="small"/>
                <span>링크 공유하기</span>
            </div>
        </div>
    );
};

export default EditorSelector;
