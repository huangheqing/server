const career = ['farm', 'manufacture', 'science', 'hospitality'];
function handleCareer() {
  var user = $.get('/stats/career', function(data) {
    return data;
  });
  if (user.career == null) {
    return (
      "You don't have a career right now," +
      'please use one of the following command to pick a career(You can only pick once!): \n' +
      'Farm: -c -pick -farm \n' +
      'Manufacture: -c -pick -manufacture \n' +
      'Science: -c -pick -science \n' +
      'Hospitality: -c -pick -hospitality \n'
    );
  } else {
    return user.career;
  }
}
