/* EmojiPicker.js
 * Emoji picker UI
 * Dependencies: react, prop-types modules, components, services, classes
 * Author: Joshua Carter
 * Created: March 8, 2021
 */
"use strict";
//import modules
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { usePopper } from 'react-popper';

//create our EmojiPicker component
function EmojiPicker ({
    containerElement=null,
    onSelectEmoji=function () {},
    referenceElement=null
}) {
    const [popperElement, setPopperElement] = useState(null),
        [arrowElement, setArrowElement] = useState(null),
        { styles, attributes } = usePopper(referenceElement, popperElement, {
            modifiers: [
                { name: 'arrow', options: { element: arrowElement } },
                { name: 'offset', options: { offset: [20, 20] } },
                { name: 'preventOverflow', options: { boundary: containerElement } }
            ]
        });
    
    function handleSelectEmoji (emoji) {
        onSelectEmoji(emoji);
    }
    
    function handlePickerClick (emoji, e) {
        e.preventDefault();
    }
    
    return (
        <div
            id="emoji-picker" ref={setPopperElement}
            style={styles.popper} {...attributes.popper}
        >
            <div className="arrow" ref={setArrowElement} style={styles.arrow} />
        
            <Picker onSelect={handleSelectEmoji} onClick={handlePickerClick} />    
        </div>
    );
    
    
};
//define props
EmojiPicker.propTypes = {
    containerElement: PropTypes.object,
    onSelectEmoji: PropTypes.func,
    referenceElement: PropTypes.object
};

//export EmojiPicker component
export { EmojiPicker };
