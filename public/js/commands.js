const menu = {
  '-s': 'user_status',
  '-c': 'career',
  '-en': 'entertainment',
  '-i': 'investment',
};
$.getScript('/js/stats.js');
$.getScript('/js/career.js');
function parseCommand(command) {
  try {
    var supported = false;
    for (var key in menu) {
      if (command == key) {
        // command supported
        // Going to proceed for next step
        if (command == '-s') {
          supported = true;
          return handleStats();
        } else if (command.includes('-c')) {
          supported = true;
          return handleCareer();
        }
      }
    }
    if (supported == false) {
      return 'Command not supported';
    }
  } catch {
    return 'Something went wrong on side, please contact customer support';
  }
}
