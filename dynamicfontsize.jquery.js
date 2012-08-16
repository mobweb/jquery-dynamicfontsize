(function($) {
  $.fn.dynamicFontSize = function( globalRules ) {

    return this.each(function() {

        var current = $( this );

        // Reset the element specific rules that might've been set for an
        // earlier element
        var elemRules =  {};

        // A bit of a hack that enables us to check if any element rules
        // have been set. As soon as an element rule is set,
        // elemRules[ 'isSet' ] is set to 'true'...
        elemRules = {
            'isSet': false
        };

        // Check if this element has the rules added as a data-attribute
        // named data-dynamic-font-size (Note: $.attr() returns false
        // if the attribute exists but is empty or valued 0). If it
        // does, ignore what has been passed as an argument to the
        // function and use the 'inline' rules instead
        if( current.attr( 'data-dynamic-font-size' ) ) {

            // Convert the data-attribute into an array.
            // For this to work, the data-attribute has to be formatted
            // like this:
            //      rule,font-size;rule,font-size...
            //      (e.g. "<10:10em,<17:8em,17:4em,>20:2em")
            var inlineRules = current.attr( 'data-dynamic-font-size' );

            // First, split the rules separated by commas
            var inlineRulesSplit = inlineRules.split( ',' );

            // Loop through all the rules
            for( var i in inlineRulesSplit ) {
                var currentRule = inlineRulesSplit[ i ];
                var currentRuleSplit = currentRule.split( ':' );

                // At least one rule has been set, update isSet
                elemRules[ 'isSet' ] = true;

                // And save the rule in the object
                elemRules[ currentRuleSplit[ 0 ] ] = currentRuleSplit[ 1 ];
            }
        }

        // Determine which rules to use. If any element specific rules have
        // been set, use these. If not, use the global rules hopefully
        // passed as an argument
        var rules = elemRules[ 'isSet' ] ? elemRules : globalRules;

        // Get the current element's length
        var numberOfCharacters = current.html().length;

        // Compare the current element's length to each of the rules
        // that have been passed or set inline, by looping through
        // the rules
        for( var rule in rules ) {

            // Strip the comparing characters ('=', '<'...) from the rule
            // for comparison later on
            var numbersOnly = rule.replace(/^\D+/, '');

            // Determine the type of the current rule and check for
            // a match with the current element's length.
            // If there's a match, set the font size and move on to
            // the next element, and ignore the remaining rules
            if( rule.match( /^[0-9]+$/ ) ) {
                // Equal
                if( numberOfCharacters == numbersOnly ) {
                    current.css( 'fontSize', rules[ rule ] );
                    break;
                }
            } else if( rule.match( />=/ ) ) {
                // Greater than or equal
                if( numberOfCharacters >= numbersOnly ) {
                    current.css( 'fontSize', rules[ rule ] );
                    break;
                }
            } else if( rule.match( />/ ) ) {
                // Greater than
                if( numberOfCharacters > numbersOnly ) {
                    current.css( 'fontSize', rules[ rule ] );
                    break;
                }
            } else if( rule.match( /<=/ ) ) {
                // Smaller than or equal
                if( numberOfCharacters <= numbersOnly ) {
                    current.css( 'fontSize', rules[ rule ] );
                    break;
                }
            } else if( rule.match( /</ ) ) {
                // Smaller than
                if( numberOfCharacters < numbersOnly ) {
                    current.css( 'fontSize', rules[ rule ] );
                    break;
                }
            }
        }
    });
  };
})( jQuery );