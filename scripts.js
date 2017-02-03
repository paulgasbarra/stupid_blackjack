
console.log( "Let's play blackjack!" );
var deck = createDeck();
var dealerHand = []; 
var yourHand = [];

function Card(suit, face, color, value) {
  this.suit = suit;
  this.face = face;
  this.color= color;
  this.value= value;
  this.html= "<div class='card' style='color:"+ this.color +"'>"+this.face + this.suit +"</div>";
  
}
Card.prototype.setTo1 = function() {
  console.log("value set to 1");
  this.value = 1;
};

var blank = new Card("&infin;", "", "green", "0");

function createDeck(){
  var suits = ["&clubs;","&diams;","&hearts;","&spades;"];
  var face = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
  var value = 0;
  var deck = [];
  var color = "";
  for (var i = 0; i < suits.length; i++){
    color = (suits[i] == "&diams;" || suits[i] == "&hearts;") ? "red" : "black";
    for (var j = 0; j < face.length; j++){
      if (isNaN(parseInt(face[j]))){  
        value = (face[j] == "A") ? 11 : 10;
      } else {
        value = parseInt(face[j]);
      }
      var card = new Card(suits[i], face[j], color, value);
      deck.push(card);
    }
  }
  return deck;
}

function drawCard(){
  var random = Math.floor(Math.random() * deck.length);
  var card = deck[random];
  deck.splice(random, 1);
  if (deck.length == 0){
    deck = createDeck()
  }
  return card;
}

function returnCards(){
  var card1 = drawCard();
  var card2 = drawCard();
  var cardArray = [card1, card2];
  return cardArray;
}

function findEleven(card) { 
  
    return card.value === 11;
}

function aceCheck(hand){
  var aceArray=[];
  hand.forEach(function(card){
    if (card.face == "A"){
      aceArray.push(card);
    }
  });
  var aceToChange = aceArray.find(findEleven);
  if (aceToChange){
    aceToChange.setTo1();
  };
  return sumHand(hand);;
}

function sumHand(hand){
  var sum = 0; 
  hand.forEach(function(card){
    sum = sum + card.value; 
  })
  return sum;
}

function readHand(hand){
  var handValue = 0
  handValue = sumHand(hand);
  if (handValue > 21) {
    handValue = aceCheck(hand);
  }
  return handValue;
}

function updateScores(dealer, player){
  var dealerScore = readHand(dealer);
  var yourScore = readHand(player);
  $('.dealerScore').text(dealerScore);
  $('.yourScore').text(yourScore);
}

function winCheck(action){
  var playerScore = $('.yourScore').text();
  var dealerScore = $('.dealerScore').text();
  var result = ""
   
  switch( action ) {
    case 'deal':
      if (dealerScore == 21){
        result = "Dealer has blackjack. You lose."
        $("#dealerHand").html(dealerHand[0].html + dealerHand[1].html);
      }  
      break;
    case 'hit':
      if (playerScore > 21){
        result = "Bust! You lose!";
      } else if (playerScore == 21){
        result = "Blackjack! You win!"
      }
      break;
    case 'stay':
      if (playerScore == dealerScore){
        result = 'Push';
      } else if (playerScore > dealerScore || dealerScore > 21) {
        result = 'You win!'
      } else if (playerScore < dealerScore) {
        result = 'You lose!'
      }
      break;
    default:
      result = "Keep playing!";
  }
  $('.result').text(result);
}

$("#deal").on('click', function(){
  console.log("deal clicked");
  dealerHand = returnCards(); 
  yourHand = returnCards();
 $("#dealerHand").html(dealerHand[0].html + blank.html);
 $("#yourHand").html(yourHand[0].html + yourHand[1].html);
  updateScores(dealerHand, yourHand);
  winCheck('deal');
});

$("#hit").on('click', function(){
  console.log("hit clicked");
  var card = drawCard();
  yourHand.push(card);
  $("#yourHand").append(card.html);
  $('.yourScore').text(readHand(yourHand));
  winCheck('hit');
})

$("#stay").on('click', function(){
  console.log("stay");
  $("#dealerHand").html(dealerHand[0].html + dealerHand[1].html);
  var score = sumHand(dealerHand);
  while (score < 21){
    console.log("dealer takes a card");
    if (score < 16){
      var card = drawCard();
      dealerHand.push(card);
      $("#dealerHand").append(card.html);
      score = readHand(dealerHand)
      $('.dealerScore').text(score);
    } else {
      break;
    }
  }
  winCheck('stay');
});
