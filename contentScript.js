window.alert('Running Extension');
const testExp = new RegExp(/\$\S+/g);
let rate = 17176.58; //current as of 12 DEC 17

walkTheDOM(document.body);
getCurrentRate();

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

function getCurrentRate() {

  var url = "https://api.cryptonator.com/api/full/btc-usd";
      //JSON CALL
      $.ajax({
        type:"GET",
        url:url,
        async:false,
        dataType: "json",
        success: function(data){
          console.log(data.ticker.price)

        },
        error: function(errorMessage){
          alert("Error: search failed")
        }
      })

}
