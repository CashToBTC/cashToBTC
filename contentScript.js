

walkTheDOM(document.body);

function walkTheDOM(node)
{
    // I stole this function from here:
    // http://is.gd/mwZp7E
    var child, next;

    switch ( node.nodeType )
    {
        case 1:
        case 9:
        case 11:
            child = node.firstChild;
            while ( child )
            {
                next = child.nextSibling;
                walkTheDOM(child);
                child = next;
            }
            break;

        case 3:
            handleText(node);
            break;
    }
}

function handleText(textNode)
{
    let convertedBTC = textNode.nodeValue;

    if (convertedBTC)
    convertedBTC = convertedBTC.replace(/\$\S+/g, "NEW VAL");

    textNode.nodeValue = convertedBTC;
}

window.alert('Running content');

