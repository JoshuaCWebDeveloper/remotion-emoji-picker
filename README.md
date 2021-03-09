Remotion Emoji Picker
====

Coding test for Remotion.

- [Development](#development)

## Summary

I was invited to use libraries as a I please, so in the interest of not re-inventing the wheel, I made a bold choice and chose to use a library which included most of the basic features of this project out of the box (Emoji Mart). In doing so, I planned to create an evolution of the original project of building an emoji picker and build a media rich message input. However, due to the complicated nature of the things I did complete, most of the planned features are as of yet not built.

Emoji Mart renders the emoji picker UI, but it was up to me to actually insert the selected emoji  into a textbox. This library of course supports emojis as images (and in fact uses image assets by default); however, displaying images in the textbox would require some sort of rich text editor, so the first trade-off I made was using slightly less attractive Unicode emojis in place of images. Inserting the emojis into the text turned out to be quite a bit more challenging than originally anticipated (lots of edge cases to solve for); however, the end result was an emoji picker that would reliably insert an emoji at the current cursor location. The one feature I was able to build on top of that was the ability to type an emoticon (i.e. `:)`) and have it automatically convert into an emoji. This presented similar challenges; however, should be fairly robust by now.

See [remotion-emoji-picker-planning.md](remotion-emoji-picker-planning.md) for details about the pre-planning I did for this project along with possible features and bugfixes that could be made.

### Time Tracking

I spent about 1 hour planning out possible features and researching libraries before starting to write code. This pre-planning can be seen in [remotion-emoji-picker-planning.md](remotion-emoji-picker-planning.md).

I spent about 3.5 hours from first initializing the project to my last code commit.

I spent an additional .5 hours writing up this summary.

## Running the App

### Requirements

NodeJS v12.x

### Install

`npm install`

### Run

`npm start`

## <a name="development"></a>Development

#### Building and testing

Run `npm install` to install/update dependencies.

Run `npm run build && npm run minify` to build and bundle app.

Run `npm start` to start the app in a server.

Run `npm test` to run the tests.
