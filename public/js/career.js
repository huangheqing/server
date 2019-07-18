const careers = ['farm', 'manufacture', 'science', 'hospitality'];
function handleCareer(command) {
  // If this is a create command then we are going to assgien career to this player
  var res = command.split(' ');
  if (res.length == 3 && res.includes('-c') && res.includes('-pick')) {
    var pickCareer = 'Not supported';
    careers.forEach(element => {
      if (res.includes(element)) {
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
  } else {
    var career = $.get('/stats/career', function(data) {
      return data;
    });
    if (career == null) {
      return (
        "You don't have a career right now," +
        'Farm: -c -pick farm \n' +
        'Manufacture: -c -pick manufacture \n' +
        'Science: -c -pick science \n' +
        'Hospitality: -c -pick hospitality \n'
      );
    } else {
      return career;
    }
  }
}
