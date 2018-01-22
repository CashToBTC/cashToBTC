window.alert('Running Extension');
const testExp = new RegExp(/\$\S+/g);

var rate;
getCurrentRate();

if (rate) {
  console.log('RATE EXISTS');
  walkTheDOM(document.body);
}

function walkTheDOM(node) {
  var child, next;
  switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      child = node.firstChild;
      while (child) {
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
  if (testExp.test(possibleDollarAmount) && possibleDollarAmount.length < 20) {
    console.log('Detected Dollar Sign');
    console.log(possibleDollarAmount);
    let cryptoAmount = makeIntoCryptoString(possibleDollarAmount);
    console.log(cryptoAmount);
    possibleDollarAmount = possibleDollarAmount.replace(/\$\S+/g, "฿" + cryptoAmount);
  }

  textNode.nodeValue = possibleDollarAmount;
}

function makeIntoCryptoString(currencyString) {
  let dollarValue = currencyString.slice(1, currencyString.length);
  let dollarFloat = parseFloat(dollarValue);
  let cryptoFloat = dollarFloat / rate;
  let prettycryptoFloat = cryptoFloat.toFixed(6);
  let cryptoString = "฿" + prettycryptoFloat;
  console.log('PARSED DOLLAR VAL', prettycryptoFloat);
  return prettycryptoFloat;
}

function getCurrentRate() {

  var url = "https://api.cryptonator.com/api/full/btc-usd";
  //JSON CALL
  $.ajax({
    type: "GET",
    url: url,
    async: false,
    dataType: "json",
    success: function(data) {
      console.log('SUCCESS');
      rate = data.ticker.price;
      console.log(rate);
      return rate;
    },
    error: function(errorMessage) {
      alert("Error: search failed")
      return null;
    }
  })

}