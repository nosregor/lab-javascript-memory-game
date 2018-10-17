class MemoryGame {
  constructor(_cards) {
    this.cards = []
    for (let i = 0; i < _cards.length; i++) {
      this.cards.push({
        name: _cards[i].name,
        img: _cards[i].img,
        isVisible: false
      })
    }
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      // temp is a placeholder for current card
      let temp = this.cards[i];
      // current card ....
      this.cards[i] = this.cards[randomIndex];
      // assign current card a new index
      this.cards[randomIndex] = temp;
    }
  }
  checkIfPair(firstCard, secondCard) {
    this.pairsClicked++
    if (firstCard === secondCard) {
      this.pairsGuessed++
    }
    return firstCard === secondCard
  }
  isFinished() {
    return this.pairsGuessed === this.cards.length / 2
  }

  render() {
    if (this.isFinished()) {
      $('#memory_board').html('<h2>Game over</h2>')
      return
    }

    var html = '';

    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i]

      html += '<div class="card" data-index="' + i + '">';
      if (card.isVisible)
        html += '  <img src="img/' + card.img + '">';
      html += '</div>';
    }

    $('#memory_board').html(html)

    $('#pairs_clicked').text(this.pairsClicked)
    $('#pairs_guessed').text(this.pairsGuessed)

    var that = this

    $('.card').click(function () {
      // var index = $(this).attr('data-index')
      var index = $(this).data('index')

      if (that.cards[index].isVisible) return;

      if (that.pickedCards.length < 2) {
        that.pickedCards.push(index)
        that.cards[index].isVisible = true
      }
      if (that.pickedCards.length === 2) {
        var firstCard = that.cards[that.pickedCards[0]].img
        var secondCard = that.cards[that.pickedCards[1]].img
        if (that.checkIfPair(firstCard, secondCard)) {
          that.pickedCards = []
        }
        else {
          setTimeout(function () {
            console.log("0", that.cards[that.pickedCards[0]])
            console.log("1", that.cards[that.pickedCards[1]])
            that.cards[that.pickedCards[0]].isVisible = false
            that.cards[that.pickedCards[1]].isVisible = false
            that.pickedCards = []
            that.render()
          }, 1000)
        }
      }
      that.render()
    });
  }
}

// var MemoryGame = function (cards) {
//   this.cards = cards;
// };

// MemoryGame.prototype.shuffleCards = function () {
// };

// MemoryGame.prototype.checkIfPair = function (firstCard, secondCard) {
// }

// MemoryGame.prototype.isFinished = function () {
// };
