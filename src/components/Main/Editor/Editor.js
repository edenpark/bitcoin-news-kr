import React, { Component } from 'react';
import {
    Input,
    TextArea,
    Form,
    Button,
    Icon,
    Message
} from 'semantic-ui-react';

import decode from 'ent/decode';
import debounce from 'lodash/debounce';


class UrlEditor extends Component {
    constructor(props) {
        super(props);

        this.delayedNoteChange = debounce(this.delayedNoteChange, 100);
    }

    handleChanageNote = (e) => {
        e.persist();
        this.delayedNoteChange(e);
    }

    delayedNoteChange = (e) => {
        const { onChangeNote } = this.props;
        onChangeNote(e.target.value);
    }

    handleChangeTitle = (e) => {
        const { onChangeTitle } = this.props;
        onChangeTitle(e.target.value);
    }

    handleChanageDescription = (e) => {
        const { onChangeDescription } = this.props;
        onChangeDescription(e.target.value);
    }

    handleChangeLink = (e) => {
        const { user, openLoginModal, onValidate, onChangeLink } = this.props;

        onChangeLink(e.target.value);

        if(!user.get('username')) {
            openLoginModal();
            return;
        }
        onValidate(e.target.value);
    }

    handleSubmit = (e) => {
        const { user, openLoginModal, onSubmit } = this.props;

        //Login Check
        if(!user.get('username')) {
            openLoginModal();
            return;

        }
        onSubmit();
    }

    render() {
        const { handleChangeLink, handleChanageNote, handleSubmit, handleChanageDescription, handleChangeTitle } = this;

        const { editor, visible } = this.props;
        const { fetching, fetched, valid, message } = editor.get('validity');
        const { title, description, source } = editor.get('metadata');

        return(
            <div className="url-editor">
                <div className="link">
                    <Input
                        fluid
                        icon='linkify'
                        iconPosition='left'
                        labelPosition='right'
                        placeholder="공유 할 페이지 주소를 넣어주세요. 한국어로 번역이 됩니다."
                        value={editor.get('link')}
                        loading={fetching}
                        onChange={handleChangeLink}
                    />
                </div>
                <div className={`extra ${visible ? 'show':''}`}>
                    {
                        !valid && message && (
                            <Message color="red" size="mini">
                                { message }
                            </Message>
                        )
                    }
                    {
                        fetched && (
                        <div>
                            <div className="input-description">
                                <Form>
                                     <TextArea
                                        placeholder="링크에 대한 설명을 덧붙여주세요"
                                        autoHeight
                                        onChange={handleChanageNote}
                                    />
                                </Form>
                            </div>
                            <div className="fetching-data">
                                <div className="wrapper">
                                    <div className="title">
                                        <Form>
                                            <TextArea
                                                value={decode(title)}
                                                autoHeight
                                                onChange={handleChangeTitle}
                                            />
                                         </Form>
                                    </div>
                                    <div className="description">
                                        <Form>
                                             <TextArea
                                                value={decode(description)}
                                                autoHeight
                                                onChange={handleChanageDescription}
                                            />
                                        </Form>
                                    </div>
                                    <div className="source">
                                        {source}
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <Button color="teal"
                                        size="small"
                                        onClick={handleSubmit}
                                        disabled={ !fetched || !valid}
                                >
                                    <Icon name='send' size='small'/>보내기
                                </Button>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default UrlEditor;
