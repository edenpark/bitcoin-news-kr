import React, { Component } from 'react';
import {
    Input,
    TextArea,
    Form,
    Button,
    Icon,
    Message
} from 'semantic-ui-react';

import { Link } from 'react-router'

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

    handleChangeLink = (e) => {
        const { onChangeData } = this.props;
        onChangeData(e.target.value);

    }
    render() {
        const { editor, visible, validity, metadata, link } = this.props;

        const fetching = validity.get('fetching');
        const fetched = validity.get('fetched');
        const valid = validity.get('valid');
        const message = validity.get('message');

        const image = metadata.get('image');

        const { handleChangeLink, handleChanageNote } = this;

        return(
            <div className={`url-editor ${editor==='url' ? 'active': ''}`}>
                <div className="link">
                    <Input
                        fluid
                        icon='linkify'
                        iconPosition='left'
                        labelPosition='right'
                        placeholder="페이지 주소를 넣어주세요"
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

                                        <Link to={link} target="_blank">
                                            <div className="wrapper">
                                                <div className={`title ${image?'':'no-image'}`}>
                                                    <div className="text">
                                                        {metadata.get('title')}
                                                    </div>
                                                    <div className="source">
                                                        {metadata.get('source')}
                                                    </div>
                                                </div>
                                                {
                                                    image && (
                                                        <div className="image" style={{backgroundImage: `url(${metadata.get('image')})`}}>
                                                        </div>
                                                    )
                                                }
                                                <div className="description">
                                                    {metadata.get('description')}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="footer">
                                        <Button color="teal" size="small"><Icon name='send' size='small'/>보내기</Button>
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
