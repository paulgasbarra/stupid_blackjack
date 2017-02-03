function Deck () {

	this.suits = ["C", "D", "H", "S"];
	this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
	

	this.buildDeck = function(suits, ranks) {
		var deck = new Deck();
		for (i = 0; i < suits.length; i++) {
			for (j = 0; j < ranks.length; j++) {
				var card = suits[i] + ranks[j];
				deck.push(card);
			}
		}
		return deck;
	}

	this.deck = this.buildDeck(this.suits, this.rank);

	this.drawCard = function (){
		var index = Math.floor(Math.random() * deck.length - 1)
		var card = this.deck[index];
		return card;
	}
}


var deck = new Deck();

console.log(deck);
console.log("Random card: " + deck.drawCard());