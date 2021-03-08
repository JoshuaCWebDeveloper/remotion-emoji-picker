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
        emojiReferenceElement: null,
        emojiPickerActive: false,
        message: ""
    };
        
    // bind handlers
    #setEmojiReferenceRef = this.setEmojiReferenceRef.bind(this);
    #handleEditorChange = this.handleEditorChange.bind(this);
    #handleEmojiPickerClick = this.handleEmojiPickerClick.bind(this);
    #handleSelectEmoji = this.handleSelectEmoji.bind(this);
    
    getTextEditor () {
        return document.getElementById("text-editor");
    }
    
    render () {
        return (
            <section id="remotion-app">
                <form>
                    <textarea
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
                                referenceElement={this.state.emojiReferenceElement}
                                onSelectEmoji={this.#handleSelectEmoji}
                            /> :

                            null
                    }
                </form>
            </section>
        );
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
            // get current text
            curMsg = this.state.message,
            // create new message using cursor position/selected text
            message = curMsg.substring(0, editor.selectionStart) + 
                emoji.native +
                curMsg.substring(editor.selectionEnd, curMsg.length);
        // update state
        this.setState({message});
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
