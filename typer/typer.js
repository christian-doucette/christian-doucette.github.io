//Will type out the given message whenever the user clicks. Perfect for fake hacking.

var lettersAtATime = 3
var pos = 0
//var msg = "Did you ever hear the Tragedy of Darth Plagueis the wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. It's ironic he could save others from death, but not himself. "
var msg = "All work and no play makes Jack a dull boy. "

document.onkeypress = addText

function addText() {
	var paragraph = document.getElementById("hackerText");
  var wordEnd = Math.min(pos+lettersAtATime, msg.length);
	var text = document.createTextNode(msg.substring(pos, wordEnd));
	paragraph.appendChild(text);
    pos += lettersAtATime
    if (pos >= msg.length) pos = 0
}
