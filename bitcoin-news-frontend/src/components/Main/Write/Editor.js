import React from 'react';
import RichEditor from './RichEditor';
import UrlEditor from './UrlEditor';

const Editor = ({activeEditor, visible, richEditor, onValidate,
                onRichTitle, onRichContent, urlEditor, onUrlData
                }) => {

    return(
        <div className="editor-wrapper">
            <RichEditor editor={activeEditor}
                        visible={visible}
                        title={richEditor.get('title')}
                        content={richEditor.get('content')}
                        validity={richEditor.get('validity')}
                        onChangeTitle={onRichTitle}
                        onChangeContent={onRichContent}
                        onValidate={onValidate}
            />
            <UrlEditor editor={activeEditor}
                        visible={visible}
                        validity={urlEditor.get('validity')}
                        metadata={urlEditor.get('metadata')}
                        onChangeData={onUrlData}
            />
        </div>
    );
};

export default Editor;
