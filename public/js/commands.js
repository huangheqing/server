const menu = {
  '-s': 'user_status',
  '-c': 'career',
  '-en': 'entertainment',
  '-i': 'investment',
  '-l': 'leaderboard',
  '-hu': 'hunt',
};
$.getScript('/js/stats.js');
$.getScript('/js/career.js');
$.getScript('/js/entertainment.js');
$.getScript('/js/items.js');
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
      return handleCareer(command, terminal);
    } else if (command.includes('-en')) {
      supported = true;
      return handleEntertainment(command, terminal);
    } else if (command.includes('-i')) {
      supported = true;
      return 'No Op';
    } else if (command == '-hu') {
      supported = true;
      return handleHunt(command, terminal);
    }
    if (supported == false) {
      return 'Command not supported';
    }
  } catch {
    return 'Something went wrong on side, please contact customer support';
  }
}
