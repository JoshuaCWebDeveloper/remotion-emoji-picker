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
import { Emoji, emojiIndex  } from 'emoji-mart';
import { Checkbox } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { emojiMap } from 'smile2emoji';
//import components
import { EmojiPicker } from './EmojiPicker.js';
//create our RemotionApp class
class RemotionApp extends React.Component {
    
    // init state
    state = {
        convertEmoticons: true,
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
    #handleEmoticonSettingChange = this.handleEmoticonSettingChange.bind(this);
    
    // characters that trigger emoticon conversion
    #EMOTE_TRIGGERS = " .,!?\n";
    
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
                        <p className="tabs">
                            <button
                                className="emoji-picker" ref={this.#setEmojiReferenceRef}
                                onClick={this.#handleEmojiPickerClick}
                            >
                                <Emoji emoji=":smiley:" size={16} />
                            </button>
                        </p>
                
                        <p className="settings">
                            <Checkbox
                                className="convert-emoticons" toggle label="Convert :) :( :|"
                                checked={this.state.convertEmoticons}
                                onChange={this.#handleEmoticonSettingChange}
                            />
                        </p>
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
        var v = e.target.value,
            // get editor
            editor = this.getTextEditor(),
            // split message on cursor position
            preCursor = v.substring(0, editor.selectionStart),
            postCursor = v.substring(editor.selectionEnd, v.length),
            // focus on the message before the cursor
            lastChar = preCursor.substr(-1);
        // if the user just typed a space AND if we are to convert emoticons
        if (
            this.#EMOTE_TRIGGERS.includes(lastChar) &&
            this.state.convertEmoticons
        ) {
            // if the last word is an emoticon
            let words = preCursor.substr(0, preCursor.length-1).split(" "),
                lastWord = words.slice(-1)[0],
                lastWordNewline = lastWord.includes("\n");
            // if last word contains newline
            if (lastWordNewline) {
                // move newline and text before it to previous word
                let previousWord = words.slice(-2)[0],
                    [lastWordPrefix, lastWordSuffix] = lastWord.split("\n");
                words.splice(-2, 1, previousWord + " " + lastWordPrefix + "\n");
                lastWord = lastWordSuffix;
            }
            if (emojiMap.hasOwnProperty(lastWord)) {
                //update value with inserted emoji
                preCursor = words.slice(0, -1).join(" ");
                if (!lastWordNewline) {
                    preCursor += " ";
                }
                preCursor += emojiMap[lastWord] + lastChar;
                v = preCursor + postCursor;
                //changing the message will move the cursor position, maintain cursor position
                this.#updateCursorPosition = preCursor.length;
            }
        }
        this.setState({message: v});
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
            // split text by cursor position, append emoji before cursor
            preCursor = curMsg.substring(0, editor.selectionStart) + emoji.native,
            postCursor = curMsg.substring(editor.selectionEnd, curMsg.length),
            // create new message using cursor position/selected text
            message = preCursor + postCursor;
        // update state
        this.setState({message});
        // focus our editor (would have just lost it)
        editor.focus();
        // maintain cursor position (for next potential insert)
        //editor.selectionStart = cursorPosition + 1;
        //this.#updateCursorPosition = message.indexOf(textEnding);
        this.#updateCursorPosition = preCursor.length;

    }
                
    handleEmoticonSettingChange (e) {
        // toggle setting
        this.setState({convertEmoticons: !this.state.convertEmoticons});
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
