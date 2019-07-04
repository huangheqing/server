const menu = ['-s', '-j', '-en', '-i', '-ed'];
function parseCommand(command) {
  try {
    for (var i = 0; i < menu.length; ++i) {
      if (command == menu[i]) {
        // command supported
        // Going to proceed for next step
        if (command == '-s') {
          return $.get('/stats', function(data) {
            return data;
          });
        }
        return 'not support';
      }
    }
  } catch {
    return 'not support';
  }
}
