const careers = ['farm', 'manufacture', 'science', 'hospitality'];
function handleCareer(command, terminal) {
  // If this is a create command then we are going to assgien career to this player
  var career = $.ajax({
    type: 'GET',
    url: '/stats/career',
    async: false,
  }).responseText;
  // $.get('/stats/career', function(data) {
  //     return data;
  //   });
  debugger;
  if (career == null || career == '{}') {
    var history = terminal.history();
    careers.forEach(element => {
      terminal.echo(element);
    });
    terminal.push(
      function(command) {
        var pickedCareer;
        if (command.match(/^(farm)$/i)) {
          pickedCareer = pickACareer('farm');
          terminal.pop();
          history.enable();
        } else if (command.match(/^(manufacture)$/i)) {
          pickedCareer = pickACareer('manufacture');
          terminal.pop();
          history.enable();
        } else if (command.match(/^(science)$/i)) {
          pickedCareer = pickACareer('science');
          terminal.pop();
          history.enable();
        } else if (command.match(/^(hospitality)$/i)) {
          pickedCareer = pickACareer('hospitality');
          terminal.pop();
          history.enable();
        } else {
          terminal.echo('You must pick one');
        }
        terminal.echo(pickedCareer);
      },
      {
        prompt: "You don't have a career at this point, please pick one: ",
      }
    );
  } else {
    return career;
  }
}
function pickACareer(career) {
  var pickCareer = 'Not supported';
  careers.forEach(element => {
    if (career == element) {
      // Perform a create to user stats collection
      pickCareer = 'You are now doing: ' + element;
      $.ajax({
        url: '/stats/career',
        type: 'POST',
        data: { careerKind: element, level: 1 },
      });
    }
  });
  return pickCareer;
}
