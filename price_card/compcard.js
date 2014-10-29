'use strict';

/**
 * @file Complimentary card problem for Intent Media
 * @author Jason Schapiro
 */

(function(config) {
  /**
   * This is the set of defaults that can be modified
   * depending on the page structure
   * This could also be passed into the function
   */
  var CONFIG = config || {
    numPrices: 5,
    insertAfter: 5,
    titleSelector: 'h3',
    priceSelector: '.price',
    linkSelector: 'a',
    cardSectionSelector: '#content',
    compCardDatatype: 'complimentary-price-card',
    compCardTitle: 'Best Prices'
  };


  /**
   * Parses DOM element containing price to a float
   * @param {Object|null} priceEl - Element containing price
   * @returns {Number|null}
   */
  function parsePrice(priceEl) {
    var priceStr;
    if (priceEl === null) {
      return null;
    }
    priceStr = priceEl.innerHTML;
    priceStr = priceStr.slice(1); // get rid of the $
    if (priceStr.indexOf(',') !== -1) {
      priceStr = priceStr.split(',').join(''); // get rid of any commas
    }
    return parseFloat(priceStr);
  }

  /**
   * Parses the information for a single card DOM element
   * @param {Object} el - Element containing card's HTML
   * @returns {Object}
   */
  function getCardInfo(el) {
    var card = {};
    card.title = el.querySelector(CONFIG.titleSelector).innerHTML;
    var priceEl = el.querySelector(CONFIG.priceSelector);
    card.price = parsePrice(priceEl);
    card.link = el.querySelector(CONFIG.linkSelector).href;
    return card;
  }

  /**
   * Custom comparator for card prices
   * @param {Object} a
   * @param {Object} b
   * @returns {Number}
   */
  function sortByPrice(a, b) {
    return (a.price - b.price);
  }

  /**
   * Extracts card elements from the page and parses them
   * @returns {Array} Sorted list of parsed card info by ascending price
   */
  function getAllCardsInfo() {
    var cards = document.querySelectorAll('div[data-card$="-card"]');
    var info = [];
    for (var i = 0; i < cards.length; i++) {
      info.push(getCardInfo(cards[i]));
    }
    return info.sort(sortByPrice);
  }

  /**
   * Uses info from a card to create a table row element for complimentary card
   * @param {Object} Card info with title, link and price
   * @returns {Object} Table row element with title, link and price
   */
  function createPriceCardEl(cardInfo) {
    // Create the row
    var rowEl = document.createElement('tr');

    // Create the title td and the anchor link
    var titleTdEl = document.createElement('td');
    var titleLinkEl = document.createElement('a');
    titleLinkEl.href = cardInfo.link;
    titleLinkEl.innerHTML = cardInfo.title;
    titleLinkEl.setAttribute('target', '_blank');
    titleTdEl.appendChild(titleLinkEl);
    rowEl.appendChild(titleTdEl);

    // Create the price
    var priceEl = document.createElement('td');
    priceEl.innerHTML = '$' + cardInfo.price;
    priceEl.style['font-weight'] = 'bold';
    priceEl.style['text-align'] = 'right';
    rowEl.appendChild(priceEl);

    return rowEl;
  }

  /**
   * Uses info from all cards to create the complimentary card
   * @param {Array} List of cards' info with title, link and price
   * @returns {Object} Complimentary card element
   */
  function createCompCard(cardsInfo) {
    var rows = 0;
    var cardEl = document.createElement('div');
    cardEl.setAttribute('data-card', CONFIG.compCardDatatype);

    // Card title
    var titleEl = document.createElement('h3');
    titleEl.innerHTML = CONFIG.compCardTitle;
    cardEl.appendChild(titleEl);

    // Create the table for the prices
    var tableEl = document.createElement('table');
    tableEl.style.width = '100%';

    // Loop and create rows with price info
    for (var i=0; i<cardsInfo.length; i++) {
      // Only add cards with price info
      if (cardsInfo[i].price === null) {
        continue;
      }

      var rowEl = createPriceCardEl(cardsInfo[i]);
      tableEl.appendChild(rowEl);

      // If you hit the max number of rows, you're done
      rows++;
      if (rows === CONFIG.numPrices) {
        break;
      }
    }
    cardEl.appendChild(tableEl);
    return cardEl;
  }

  /**
   * Main function - self-executing
   */
  (function() {
    var cards = getAllCardsInfo();
    var compCardEl = createCompCard(cards);
    var parentEl = document.querySelector(CONFIG.cardSectionSelector +' div[data-card$="-card"]').parentNode;
    // Get 6th card
    var nextSibling = document.querySelector(CONFIG.cardSectionSelector + ' div[data-card$="-card"]:nth-of-type(0n+'+ (CONFIG.insertAfter + 2) + ')');
    parentEl.insertBefore(compCardEl, nextSibling);
  })();

})();
