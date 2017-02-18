import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Button, Icon, Form, TextArea, Message } from 'semantic-ui-react'

import debounce from 'lodash/debounce';

class RichEditor extends Component {
    constructor(props) {
        super(props);

        this.delayedTitleChange = debounce(this.delayedTitleChange, 100);
    }

    handleChangeTitle = (e) => {
        e.persist();
        this.delayedTitleChange(e);
    }

    delayedTitleChange = (e) => {
        const { onChangeTitle } = this.props;
        onChangeTitle(e.target.value);
    }

    onSubmit = () => {
        const { title, content, onValidate } = this.props;

        onValidate({title, content});
    }

    render() {
        const { editor, visible, title, content, validity, onChangeContent } = this.props;

        const valid = validity.get('valid');
        const errorMessage = validity.get('message');

        const { onSubmit, handleChangeTitle } = this;

        // setting for qiull editor
        const modules = {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
        }

        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ]


        return(
            <div className={`rich-editor ${editor==='rich' ? 'active': ''}`}>
                <div className="title">
                    <Form>
                        <TextArea
                            placeholder={title}
                            autoHeight
                            onChange={handleChangeTitle} />
                    </Form>
                </div>
                <div className={`extra ${visible ? 'show': ''}`}>
                    <div className="quill-wrapper">
                        <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange={onChangeContent}>
                            <div key="editor"
                                ref="editor"
                                className="quill-contents my-class-name"
                                dangerouslySetInnerHTML={{__html: content}}/>
                        </ReactQuill>
                    </div>
                    {
                        !valid && errorMessage && (
                            <Message color="red" size="mini">
                                { errorMessage }
                            </Message>
                        )
                    }
                    <div className="footer">
                        <Button color="teal"
                                size="small"
                                onClick={onSubmit}>
                            <Icon name='send' size='small'/>보내기
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RichEditor;
