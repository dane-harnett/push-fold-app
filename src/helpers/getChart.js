var antes0 = require('../data/0-antes.json');
var antes10 = require('../data/10-antes.json');
var antes125 = require('../data/125-antes.json');
var antes20 = require('../data/20-antes.json');
const data = {
  '0': antes0,
  '10': antes10,
  '125': antes125,
  '20': antes20,
};

export default function(antes, stackSize, position) {
  var resetChart = function(chart) {
    for (var i = 0; i <= 12; i++) {
      for (var j = 0; j <= 12; j++) {
        chart[i][j] = 0;
      }
    }
    return chart;
  };

  var chart = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

  chart = resetChart(chart);

  var selectAllHands = function(chart) {
    for (var i = 0; i <= 12; i++) {
      for (var j = 0; j <= 12; j++) {
        chart[i][j] = 1;
      }
    }
    return chart;
  };

  var range = data[antes][stackSize][position];
  var split = range.split(',');
  var hands = split[1].split(' ');

  var selectColumnDown = function(col, row, chart) {
    for (var i = 0; i <= row; i++) {
      chart[i][col] = 1;
    }
    return chart;
  };
  var selectRowAcross = function(col, row, chart) {
    for (var i = 0; i <= col; i++) {
      chart[row][i] = 1;
    }
    return chart;
  };
  var selectSuitedHands = function(col, row, chart) {
    for (var i = col; i > row; i--) {
      chart[row][i] = 1;
    }
    return chart;
  };
  var selectSuitedRange = function(col1, row1, col2, row2, chart) {
    for (var i = col2; i >= col1; i--) {
      for (var j = row2; j >= row1; j--) {
        chart[j][i] = 1;
      }
    }
    return chart;
  };
  var selectOffSuitHands = function(col, row, chart) {
    for (var i = row; i > col; i--) {
      chart[i][col] = 1;
    }
    return chart;
  };
  var selectSingleHand = function(col, row, chart) {
    chart[row][col] = 1;
    return chart;
  };
  var selectPairs = function(rank, chart) {
    for (var i = rank; i >= 0; i--) {
      chart[i][i] = 1;
    }
    return chart;
  };
  var rankMap = {
    A:0,
    K:1,
    Q:2,
    J:3,
    T:4,
    '9':5,
    '8':6,
    '7':7,
    '6':8,
    '5':9,
    '4':10,
    '3':11,
    '2':12
  };

  hands.forEach(function(hand) {
    if (hand === 'Any-two') {
      return selectAllHands(chart);
    }

    if (hand[0] === hand[1]) {
      chart = selectPairs(rankMap[hand[0]], chart);
    }

    if (hand.indexOf('x+') > -1) {
      for (var i = rankMap[hand[0]]; i >= 0; i--) {
        chart = selectColumnDown(i, 12, chart);
        chart = selectRowAcross(12, i, chart);
      }
    }

    if (hand.indexOf('-') > -1) {
      chart = selectSuitedRange(rankMap[hand[1]], rankMap[hand[0]], rankMap[hand[5]], rankMap[hand[4]], chart);
    } else {
      if (hand.indexOf('s') === 2) {
        if (hand.indexOf('s+') === 2) {
          chart = selectSuitedHands(rankMap[hand[1]], rankMap[hand[0]], chart);
        } else {
          chart = selectSingleHand(rankMap[hand[1]], rankMap[hand[0]], chart);
        }
      }
      if (hand.indexOf('o') === 2) {
        if (hand.indexOf('o+') === 2) {
          chart = selectOffSuitHands(rankMap[hand[0]], rankMap[hand[1]], chart);
        } else {
          chart = selectSingleHand(rankMap[hand[0]], rankMap[hand[1]], chart);
        }
      }
    }
  });

  return chart;
};
