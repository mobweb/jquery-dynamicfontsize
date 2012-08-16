# jquery-dynamicfontsize

This plugin allows you to set different font-sizes according to the length of a text.

A real life example of usage: setting up a stylesheet for a CMS, the length of the headlines entered by the editors is not always the same. This plugin allows you to set different font-sizes according to the length of the headline.

It is heavily inspired by this article: ["Made to Measure" by Allen Tan at contentsmagazine.com](http://contentsmagazine.com/articles/made-to-measure/).

## Usage

Applying the plugin to a selection of elements:

    $( 'h1' ).dynamicFontSize();

There are two ways to set the actual rules for the font-sizes:

By passing an array to the function:

    var rules = [
        '<10': '2em', // If the text is shorter than 10 characters (including spaces), set the font-size to 2em
        '<=15': '10px', // If the text is shorter than or exactly 15 characters long, set the font-size to 20px
        '>15': '50%' // If the text is longer than 15 characters, set the font-size to 50%
    ];

    $( 'h2' ).dynamicFontSize( rules );

Or inline as a HTML attribute (the rules in this example are exactly the same as above):

    <h3 data-dynamic-font-size="<10:2em,<=15:10px,>15:50%">Some Example Text</h3>

Keep in mind that in order for the rules set as HTML attributes to be applied, the function would still have to be called with the element passed as a selector, for example:

    $( 'h3' ).dynamicFontSize();

You can also mix the two methods of passing the rules, by setting the rules as data-attributes on some elements and also passing a JavaScript array when invoking the function. However, a ruleset that is passed as a HTML attribute will always overrule a ruleset that has been passed as a JavaScript array. Also, there is no way to combine two rulesets. An element can only obtain its rules from one source, either as a data-attribute or JavaScript array.

### Supported notations for the rules

- ```=``` (Equal to)
- ```>``` (Greater than)
- ```>=``` (Greather than or equal to)
- ```<``` (Smaller than or equal to)
- ```<=``` (Smaller than or equal to)

### Hierarchy of the rules

The rules are evaluated in the order that they are passed in. As soon as there is a match with the element's length and a rule that has been passed in, all subsequent rules will be ignored. For example:

    var rules = [
        '>10': '2em', // This will affect any text longer than 10 characters
        '>15': '3em' // This will not have any effect, since the first rule matches 100% of the matches of this rule: Any text that is longer than 15 characters is also longer than 10 characters!
    ];

And the same example as a data-attribute:

    <h4 data-dynamic-font-size=">10:2em,>=15:3em">Some Example Text</h4>

## Demo

[http://mobweb.ch/files/dynamicfontsize.jquery/](http://mobweb.ch/files/dynamicfontsize.jquery/)

## Support

Got a question or spotted a bug? Feel free to E-Mail me at [info@mobweb.ch](mailto:info@mobweb.ch) or send a pull request via GitHub.