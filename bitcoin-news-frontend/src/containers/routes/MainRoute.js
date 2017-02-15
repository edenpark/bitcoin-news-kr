import React, { Component } from 'react';
import Main, {
    LeftColumn,
    CenterColumn,
    RightColumn,
    Sorter,
    Favorite,
    ButtonSet,
    Write,
    EditorSelector,
    Editor
} from 'components/Main/Main';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as main from 'redux/modules/main';
import * as write from 'redux/modules/write';

import MetaInspector from 'node-metainspector';
import validator from 'validator';

class MainRoute extends Component {

    mainHandler = (() => {
        const { MainActions } = this.props;

        return {
            setSorter: (value) => {
                MainActions.setSorter(value);
            }
        }
    })()

    handleWrite = (() => {
        const { WriteActions } = this.props;
        return {
            open: () => {
                WriteActions.showWrite();
            },
            close: () => {
                WriteActions.hideWrite();
            },
            richEditor: () => {
                WriteActions.richEditor();
            },
            urlEditor: () => {
                WriteActions.urlEditor();
            }
        }
    })()

    // handleRichTitle = (e) => {
    //     const { WriteActions } = this.props;
    //     const value = e.target.value;
    //
    //     return WriteActions.setRichTitle(value);
    // }
    //
    // handleRichContent = (value) => {
    //     const { WriteActions } = this.props;
    //
    //     return WriteActions.setRichContent(value);
    // }

    handleRichEditor = (() => {
        const { WriteActions } = this.props;

        return {
            changeTitle: (title) => {
                WriteActions.setRichTitle(title);
            },
            changeContent: (value) => {
                WriteActions.setRichContent(value);
            }
        }
    })()

    handleRichValidate = ({title, content}) => {
        const { WriteActions } = this.props;
        const { handleRichSubmit } = this;

        if(title && content) {
            WriteActions.setRichValidity({
                valid: true,
                message: ''
            })
            return handleRichSubmit({title, content});
        }
        return WriteActions.setRichValidity({
            valid: false,
            message: '제목과 내용 모두 입력해주세요'
        })
    }

    handleRichSubmit = ({title, content}) => {
        console.log(title, content);
        // Save data
    }


    handleUrlData = (url) => {
        const { WriteActions } = this.props;
        const client = new MetaInspector(url, { timeout: 50000});

        client.on('fetch', () => {
            // Store data
            WriteActions.setUrlLink(url);
            const image = client.image || 'https://www.bitcoin.co.id/homev2-assets/img/p2pbg.jpg';
            WriteActions.setUrlMetadata({
                title: client.title,
                description: client.description,
                image: image,
                source: client.host
            });
            WriteActions.setUrlValidity({
                valid: true,
                message: null,
                fetching: false,
                fetched: true
            });
        }).on("error", function(err){
            // Show error message
            WriteActions.setUrlValidity({
                valid: false,
                message: '오류가 발생했습니다. 다시 시도해주세요',
                fetching: false,
                fetched: false
            });
        });
        client.fetch();
    }

    handleUrlValidate = (url) => {
        const { WriteActions} = this.props;
        console.log('url: ', url);

        if(validator.isURL(url)) {
            WriteActions.setUrlValidity({
                valid: true,
                message: null,
                fetching: true,
                fetched: false
            });
            this.handleUrlData(url);
        } else {
            WriteActions.setUrlValidity({
                valid: false,
                message: '유효한 URL이 아닙니다',
                fetching: false,
                fetched: false
            });

        }
    }

    handleRichSubmit = ({title, content}) => {
        console.log(title, content);
        // Save data
    }


    render () {
        const { mainHandler, handleWrite, handleRichEditor,
             handleRichValidate, handleUrlValidate } = this;
        const { status: { main, write } } = this.props;

        const sorterValue = main.getIn(['sorter', 'value']);

        const showWrite = write.getIn(['main', 'visible']);
        const activeEditor = write.getIn(['main', 'editor']);

        const richEditor = write.getIn(['richEditor']);
        const urlEditor = write.getIn(['urlEditor']);

        return (
            <Main>
                <LeftColumn>
                    <Sorter value={sorterValue} onSelect={mainHandler.setSorter}/>
                    <Favorite />
                    <ButtonSet />
                </LeftColumn>
                <CenterColumn>
                    <Write visible={showWrite}
                            onHide={handleWrite.close}
                            onShow={handleWrite.open}>
                        <EditorSelector activeEditor={activeEditor}
                            visible={showWrite}
                            onRichEditor={handleWrite.richEditor}
                            onUrlEditor={handleWrite.urlEditor}
                        />
                        <Editor activeEditor={activeEditor}
                                visible={showWrite}
                                richEditor={richEditor}
                                onRichTitle={handleRichEditor.changeTitle}
                                onRichContent={handleRichEditor.changeContent}
                                onValidate={handleRichValidate}
                                urlEditor={urlEditor}
                                onUrlData={handleUrlValidate}
                        />
                    </Write>
                </CenterColumn>
                <RightColumn>
                    3
                </RightColumn>
            </Main>
        )
    }
}

MainRoute = connect(
    state => ({
        status: {
            main: state.main,
            write: state.write
        }
    }),
    dispatch => ({
        MainActions: bindActionCreators(main, dispatch),
        WriteActions: bindActionCreators(write, dispatch)
    })
)(MainRoute);

export default MainRoute;
