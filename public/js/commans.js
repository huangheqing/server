const menu = ['-s', '-j', '-en', '-i', '-ed'];
function parseCommand(command) {
  for (var i = 0; i < menu.length; ++i) {
    if (command == menu[i]) {
      return command;
    }
  }
  return 'not support';
}
