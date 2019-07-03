jQuery(function($) {
  var currMenu = 'help';
  $.getScript('/js/commands.js');

  $('#terminal').terminal(
    function(command) {
      if (command == 'help') {
        return menu;
      } else {
        return parseCommand(command);
      }
    },
    {
      greetings: 'Hello, welcome to the City, use help to see the options',
      name: 'city_terminal',
      height: 500,
      width: 500,
      prompt: '$> ',
    }
  );
});
