
function HighscoreEntry(name, score) {
	this.score = score;
	this.name = name;
}
function highscoreCompare(a,b) {
  if (a.score > b.score)
    return -1;
  if (a.score < b.score)
    return 1;
  return 0;
}
function addHighscoreEntry(entry) {
	highscores.push(entry);
	highscores.sort(highscoreCompare);
}
addHighscoreEntry(new HighscoreEntry('TEST', 88));

addHighscoreEntry(new HighscoreEntry('TOBI', 9999));

