/* RemotionApp.js
 * Main app component
 * Dependencies: react, prop-types modules, components, services, classes
 * Author: Joshua Carter
 * Created: March 8, 2021
 */
"use strict";
//import modules
import React from 'react';
import PropTypes from 'prop-types';
import { Emoji } from 'emoji-mart';
//import components
import { EmojiPicker } from './EmojiPicker.js';
//create our RemotionApp class
class RemotionApp extends React.Component {
    
    // init state
    state = {
        emojiContainerElement: null,
        emojiReferenceElement: null,
        emojiPickerActive: false,
        message: ""
    };

    // track selection operations
    #updateCursorPosition = null;
        
    // bind handlers
    #setEmojiContainerRef = this.setEmojiContainerRef.bind(this);
    #setEmojiReferenceRef = this.setEmojiReferenceRef.bind(this);
    #handleEditorChange = this.handleEditorChange.bind(this);
    #handleEmojiPickerClick = this.handleEmojiPickerClick.bind(this);
    #handleSelectEmoji = this.handleSelectEmoji.bind(this);
    
    getTextEditor () {
        return document.getElementById("text-editor");
    }

    componentDidUpdate () {
        // if we are to update cursor position
        if (this.#updateCursorPosition !== null) {
            let editor = this.getTextEditor();
            // then do so
            editor.selectionStart = this.#updateCursorPosition;
            editor.selectionEnd = this.#updateCursorPosition;
            // mark as done
            this.#updateCursorPosition = null;
        }
    }
    
    render () {
        return (
            <section id="remotion-app">
                <form>
                    <textarea
                        ref={this.#setEmojiContainerRef}
                        id="text-editor" value={this.state.message}
                        onChange={this.#handleEditorChange}
                    >

                    </textarea>

                    <footer id="add-content">
                        <button
                            className="emoji-picker" ref={this.#setEmojiReferenceRef}
                            onClick={this.#handleEmojiPickerClick}
                        >
                            <Emoji emoji=":smiley:" size={16} />
                        </button>
                    </footer>

                    {
                        this.state.emojiPickerActive ?

                            <EmojiPicker
                                containerElement={this.state.emojiContainerElement}
                                referenceElement={this.state.emojiReferenceElement}
                                onSelectEmoji={this.#handleSelectEmoji}
                            /> :

                            null
                    }
                </form>
            </section>
        );
    }

    setEmojiContainerRef (ref) {
        this.setState({emojiContainerElement: ref});
    }
    
    setEmojiReferenceRef (ref) {
        this.setState({emojiReferenceElement: ref});
    }

    handleEditorChange (e) {
        this.setState({message: e.target.value});
    }

    handleEmojiPickerClick (e) {
        e.preventDefault();
        
        // toggle emoji picker render state
        this.setState({emojiPickerActive: !this.state.emojiPickerActive});
    }

    handleSelectEmoji (emoji) {
        // get editor
        var editor = this.getTextEditor(),
            // get cursor position
            cursorPosition = editor.selectionStart,
            // get current text
            curMsg = this.state.message,
            // track end of text (to find new cursor position)
            textEnding = curMsg.substring(editor.selectionEnd, curMsg.length),
            // create new message using cursor position/selected text
            message = curMsg.substring(0, cursorPosition) + emoji.native + textEnding;
        // update state
        this.setState({message});
        // focus our editor (would have just lost it)
        editor.focus();
        // maintain cursor position (for next potential insert)
        //editor.selectionStart = cursorPosition + 1;
        this.#updateCursorPosition = message.indexOf(textEnding);
    }
};
//define default props
RemotionApp.defaultProps = {
    
};
//define props
RemotionApp.propTypes = {
    
};
//export RemotionApp class
export { RemotionApp };
