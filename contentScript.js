getCurrentRate();

function getCurrentRate(cryptoType = 'btc-usd') {
  let url = "https://api.cryptonator.com/api/full/" + cryptoType;
  $.ajax({
    type: "GET",
    url: url,
    async: false,
    dataType: "json",
    success: function (data) {
      console.log('SUCCESS');
      let exchangeRate = data.ticker.price;
      changeToCrypto(exchangeRate);
    },
    error: function (errorMessage) {
      alert("Error: search failed")
      return null;
    }
  })

}

function changeToCrypto(exchangeRate) {
  walkTheDOM(document.body, exchangeRate);
  let time = new Date().toLocaleString();
  window.alert('Changed to current Bitcoin exchange Rate(' + exchangeRate + ') as of ' + time);
}

function walkTheDOM(node, exchangeRate) {
  let child, next;
  switch (node.nodeType) {
    case 1:
    case 9:
    case 11:
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walkTheDOM(child, exchangeRate);
        child = next;
      }
      break;
    case 3:
      handleText(node, exchangeRate);
      break;
  }
}

function handleText(textNode, exchangeRate) {
  let testExp = new RegExp(/\$\S+/g);
  let possibleDollarAmount = textNode.nodeValue;
  if (testExp.test(possibleDollarAmount) && possibleDollarAmount.length < 20) {
    let cryptoAmount;
    if (possibleDollarAmount.includes('-')) {
      possibleDollarAmount = handleRangeOfValues(possibleDollarAmount, exchangeRate);
    } else {
      cryptoAmount = makeIntoCryptoString(possibleDollarAmount, exchangeRate);
      possibleDollarAmount = possibleDollarAmount.replace(/\$\S+/g, cryptoAmount);
    }
  }
  textNode.nodeValue = possibleDollarAmount;
}

function makeIntoCryptoString(currencyString, exchangeRate) {
  let dollarValue = currencyString.slice(1, currencyString.length);
  let dollarFloat = parseFloat(dollarValue);
  let cryptoFloat = dollarFloat / exchangeRate;
  let prettycryptoFloat = cryptoFloat.toFixed(6);
  let cryptoString = "฿" + prettycryptoFloat;
  return cryptoString;
}

function handleRangeOfValues(currencyRangeString, rate) {
  let values = currencyRangeString.split("-");
  let trimmedValues = values.map((val) => {
    return val.trim();
  });
  let cryptoRange = makeIntoCryptoString(trimmedValues[0], rate) + ' - ' + makeIntoCryptoString(trimmedValues[1], rate);
  return cryptoRange;
}
