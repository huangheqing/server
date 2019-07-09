function handleStats() {
  return $.get('/stats', function(data) {
    return data;
  });
}
