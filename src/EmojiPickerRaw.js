/* EmojiPickerRaw.js
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

const emojisList = [
    {
        name: "Smileys & People",
        representativeEmoji: "😀",
        emojis: [
            {
                name: "Grinning Face",
                emoji: "😀"
            },
            {
                name: "Sad Pensive Face",
                emoji: "😔"
            },
        ]
    },
    {
        name: "Animals & Nature",
        representativeEmoji: "🐶",
        emojis: [
            {
                name: "Dog Face",
                emoji: "🐶"
            },
            {
                name: "Cat Face",
                emoji: "🐱"
            },
        ]
    }
];

function EmojiCategory ({
    categorySpec,
    onEmojiClick = function () {}
}) {
    var {name, representativeEmoji, emojis} = categorySpec;
    
    function createClickHandler (emoji) {
        return (e) => {
            onEmojiClick(emoji);
        };
    }
    
    return (
        <section className="emoji-category">
            <h3>{representativeEmoji} {name}</h3>
        
            {
                emojis.map(it => (
                    <span key={it.name} className="emoji" onClick={createClickHandler(it)}>{it.emoji}</span>
                ))
            }
        </section>
    );
}

EmojiCategory.propTypes = {
    categorySpec: PropTypes.object.isRequired
};

function EmojiSelect ({
    onSelectEmoji = function () {}
}) {
    
    function handleEmojiClick (emoji) {
        emoji.native = emoji.emoji;
        onSelectEmoji(emoji);
    }
    
    return (
        <div className="emoji-picker">
            {
                emojisList.map(catSpec => (
                    <EmojiCategory key={catSpec.name} categorySpec={catSpec} onEmojiClick={handleEmojiClick} />
                ))
            }
        </div>
    );
}

//create our EmojiPickerRaw component
function EmojiPickerRaw ({
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
        
            <EmojiSelect onSelectEmoji={handleSelectEmoji} />
        </div>
    );
    
    
};
//define props
EmojiPickerRaw.propTypes = {
    containerElement: PropTypes.object,
    onSelectEmoji: PropTypes.func,
    referenceElement: PropTypes.object
};

//export EmojiPickerRaw component
export { EmojiPickerRaw };
