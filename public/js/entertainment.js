function handleEntertainment(command, terminal) {
  var res = command.split(' ');
  terminal.echo('You entered Casino');
  terminal.echo(
    'You can start a game or leave the Casino: blackjack, low-high, leave'
  );
  terminal.push(function(command) {
    if (command == 'blackjack') {
      var history = terminal.history();
      history.disable();
      // get initial cards from the server:
      var houseCardOne;
      var houseCardTwo;
      var playerCardOne;
      var playerCardTwo;
      terminal.echo('House card: ???? , Your card: ????');
      for (var i = 0; i < 5; ++i) {
        terminal.push(
          function(command) {
            if (command.match(/^(y|yes)$/i)) {
              terminal.echo('You hit this round');
              // Fetch card and add to your hand
              // Check if you bust
              terminal.pop();
              history.enable();
            } else if (command.match(/^(n|no)$/i)) {
              terminal.echo('You stand this round');
              terminal.echo('House will start drawing cards');
              // stop drawing when reach 17
              // Then compare house with user if user has not yet bust
              terminal.pop();
              history.enable();
            } else {
              terminal.echo('You must say yes or no');
            }
          },
          {
            prompt: 'Do you want to hit? ',
          }
        );
      }
    } else if (command == 'low-high') {
      return 'this is low-high';
    } else if (command == 'leave') {
      terminal.echo('You left the Casino');
      terminal.pop();
    } else {
      return 'Not support';
    }
  });
}
