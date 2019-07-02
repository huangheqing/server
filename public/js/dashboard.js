function terminalFun() {
  $('#terminal').terminal(
    function(command) {
      if (command !== '') {
        try {
          var result = window.eval(command);
          if (result !== undefined) {
            this.echo(new String(result));
          }
        } catch (e) {
          this.error(new String(e));
        }
      } else {
        this.echo('');
      }
    },
    {
      greetings: 'Hello, welcome to the City, use -h to see the options',
      name: 'city_terminal',
      height: 500,
      width: 500,
      prompt: '$> ',
    }
  );
}

function menu() {}

function parseCommand() {}
