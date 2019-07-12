const menu = {
  '-s': 'user_status',
  '-c': 'career',
  '-en': 'entertainment',
  '-i': 'investment',
};
$.getScript('/js/stats.js');
$.getScript('/js/career.js');
function parseCommand(command, terminal) {
  try {
    var supported = false;
    // command supported
    // Going to proceed for next step
    if (command == '-s') {
      supported = true;
      return handleStats();
    } else if (command.includes('-c')) {
      supported = true;
      return handleCareer(command);
    } else if (command.includes('-en')) {
      supported = true;
      return 'No Op';
    } else if (command.includes('-i')) {
      supported = true;
      return 'No Op';
    }
    if (supported == false) {
      return 'Command not supported';
    }
  } catch {
    return 'Something went wrong on side, please contact customer support';
  }
}
