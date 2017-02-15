import React, { Component } from 'react';
import {
    Input,
    TextArea,
    Form,
    Button,
    Icon,
    Message
} from 'semantic-ui-react';


class UrlEditor extends Component {
    handleData = (e) => {
        const value = e.target.value;
        const { onChangeData } = this.props;

        onChangeData(value);

    }

    render() {
        const { editor, visible, validity, metadata } = this.props;

        const fetching = validity.get('fetching');
        const fetched = validity.get('fetched');
        const valid = validity.get('valid');
        const message = validity.get('message');


        const { handleData } = this;

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
                        onChange={handleData}
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
                                    <div className="description">
                                        <Form>
                                             <TextArea
                                                placeholder="링크에 대한 설명을 덧붙여주세요"
                                                autoHeight
                                            />
                                        </Form>
                                    </div>
                                    <div className="fetching-data">
                                        <div className="wrapper">
                                            <div className="summary">
                                                <div className="text">
                                                    {metadata.get('title')}
                                                </div>
                                            </div>
                                            <div className="image" style={{backgroundImage: `url(${metadata.get('image')})`}}>
                                            </div>
                                        </div>
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
