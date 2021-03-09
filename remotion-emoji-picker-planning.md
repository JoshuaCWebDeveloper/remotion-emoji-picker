Remotion Emoji Picker
===

## Overview

Use the emoji-mart library to implement the picker functionality: https://github.com/missive/emoji-mart

Focus most of the 2-4 hours on adding features on top of it


## Remotion spec

### Requirements

Write a short summary of the project, include challenges and trade-offs:
 - keep these in mind while working on the project

### Web Details

1. Some way to be dynamically attached to a button/div:
    - div's position determines placement of picker
    

2. Send redux action with selected emoji when emoji is picked

3. Only needs to support modern versions of Chrome

4. Feel free to use libraries as you please. Suggest libraries include:
    a. react-popper - popover library
    b. alternates: react-popover, react-popple, react-tether
    c. lodash
    4. unicode-emoji-map
    
### Extra Credit Feature Ideas (optional, hard)

1. Emoji Search - **included in Emoji Mart**

2. Tooltips w/ names - **included in Emoji Mart**

3. Click out to exit

4. Emoji skin tone - **included in Emoji Mart**

5. Non-unicode emoji (images, emoji packs, etc)

6. Anything you can think of

### Examples for Inspiration

MacOS, Slack, Remotion



## Planning of Work

### Part 1: App Creation, Emoji Mart Inclusion and Setup

Emoji Mart doesn't actually include a lot of the basic details requested (such as connecting to a state library and the rendering logic)

By default, Emoji Mart renders images, but it offers a "native" option that uses Unicode, this would seem to be more in-line with the project

[x] Create an app with a text area to insert emojis into (text are should support rendering emojis).
    - The easiest option may be to just stick with native rendering (Unicode)

[x] Add emoji button on bar below text area (plan for additional tabs)
    - Rendering the emoji picker is up to us, attach it's render state to the click of the emoji button
    - Position the picker using react-popper

[x] When emoji is selected, add it to the text content of the text area (again, starting with Unicode is probably best)
    - It is suggested in the details that this be done using a state management library

### Part 1.5: In-Progress Feature Ideas and Bugfixes

[ ] Remove EmojiMart TM from picker
[ ] There is a delay between clicking button and picker showing up, doesn't feel responsive
[ ] React-popper doesn't update position on textarea resize
[ ] Add -_- emoticon support

### Part 2: Custom Features

This should be the bulk of the work, ideas:

[ ] Click out to exit:
    - Initially, the render state of the picker will be attached to the button

[x] Auto replace typed emoticons with emojis:
    - Emoji Mart advertises itself as the only emoji picker capable of returning emojis for emoticon searches
    - When a user finishes typing a word, search for that word if it is an emoticon
    - The big trick is figuring out how to identify text based emoticons:
        - The word "summer" will return a result from emoji mart, but shouldn't be replaced
        - this library contains a map that should help with that: https://www.npmjs.com/package/smile2emoji
    - This should be controllable: enabled/disabled
        - https://semantic-ui.com/modules/checkbox.html
        - Toggling this on/off wouldn't affect existing emojis/emoticons, only newly typed emoticons

[ ] Plain text mode that uses colons instead of images
    - Toggling this on/off would convert both existing and new emojis to colon words, and visa-versa

[ ] Make the picker resizable:
    - Use re-resizeable
    - The width is calculated by the picker using the `perLine` prop, will have to work around this
        - An `!important` 100% width would likely do
    
[ ] Additional media types:
    - GIFs:
        - Giphy: https://developers.giphy.com/dashboard/, https://www.npmjs.com/package/@giphy/react-components
        - Tenor: https://tenor.com/gifapi/documentation, https://github.com/CultureHQ/react-tenor
    - Stickers:
        - Looks like Giphy has some offering
        
        







