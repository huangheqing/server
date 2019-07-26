// JQuery file for items activities
function handleHunt(command, terminal) {
  var i = 0,
    size = 20;
  prompt = terminal.get_prompt();
  string = progress(0, size);
  terminal.set_prompt(progress);
  animation = true;
  (function loop() {
    string = progress(i++, size);
    terminal.set_prompt(string);
    if (i < 100) {
      timer = setTimeout(loop, 40);
    } else {
      terminal.echo(progress(i, size) + ' [[b;green;]OK]').set_prompt(prompt);
      animation = false;
      var huntedItems = $.ajax({
        type: 'GET',
        url: '/loot/items',
        async: false,
      }).responseJSON;
      if (huntedItems.amount > 0) {
        $.ajax({
          url: '/stats/items/add',
          type: 'PUT',
          data: { itemName: huntedItems.item, amount: huntedItems.amount },
        });
        terminal.echo(
          'You just found: ' + huntedItems.item + ' * ' + huntedItems.amount
        );
      } else {
        terminal.echo('Found nothing');
      }
    }
  })();
}

function progress(percent, width) {
  var size = Math.round((width * percent) / 100);
  var left = '',
    taken = '',
    i;
  for (i = size; i--; ) {
    taken += '=';
  }
  if (taken.length > 0) {
    taken = taken.replace(/=$/, '>');
  }
  for (i = width - size; i--; ) {
    left += ' ';
  }
  return '[' + taken + left + '] ' + percent + '%';
}
