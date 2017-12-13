// import axios from 'axios';
window.alert('Running Extension');
const testExp = new RegExp(/\$\S+/g);
let rate = 17176.58; //current as of 12 DEC 17


// axios.get('https://blockchain.info/ticker')
//     .then((res)=>{
//        console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });



walkTheDOM(document.body);

function walkTheDOM(node)
{
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

function handleText(textNode) {
    let possibleDollarAmount = textNode.nodeValue;

    if (testExp.test(possibleDollarAmount)) {
       // console.log('Detected Dollar Sign');
        //console.log(possibleDollarAmount);
        //console.log(makeIntoBitcoinString(possibleDollarAmount));
    }

    //var btcString = makeIntoBitcoinString(possibleDollarAmount);

    possibleDollarAmount = possibleDollarAmount.replace(/\$\S+/g, "฿");

    textNode.nodeValue = possibleDollarAmount;
}

function makeIntoBitcoinString(currencyString) {
    let dollarValue = currencyString.slice(1,currencyString.length);
    let dollarFloat = parseFloat(dollarValue);
    let bitcoinFloat = rate / dollarFloat;
    let prettyBitcoinFloat = bitcoinFloat.toFixed(4)
    let bitcoinString = "฿" + JSON.stringify(prettyBitcoinFloat);
    return bitcoinString;
}



