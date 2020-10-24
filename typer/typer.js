//Will type out the given message whenever the user clicks. Perfect for fake hacking.

var lettersAtATime = 10
var pos = 0
//var msg = "Did you ever hear the Tragedy of Darth Plagueis the wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. It's ironic he could save others from death, but not himself. "
var msg = "pixelID up_trees_find(pixelID parentID[ROWS][COLS], unsigned int w, pixelID idx) {\n\n\t pixelID loc = idx;\n\t while (parentID[get_y_coord(loc,w)][get_x_coord(loc,w)] != -1) {\n\t\tloc = parentID[get_y_coord(loc,w)][get_x_coord(loc,w)];\n\t\tif (parentID[get_y_coord(loc,w)][get_x_coord(loc,w)] == -1) return loc;\n\t }\n\n\t return idx; //returns this only if this node is the root of its equivalence class\n}\n\n/* Merge the two groups to which pixel p1 and pixel p2 belong. */\nvoid up_trees_union(pixelID parentID[ROWS][COLS], unsigned int w, pixelID p1, pixelID p2) {\n\t pixelID parentp1 = up_trees_find(parentID, w, p1);\n\t pixelID parentp2 = up_trees_find(parentID, w, p2);\n\t if (parentp1==parentp2) return;\n\t else if (parentp1<parentp2) {\n\t\tparentID[get_y_coord(parentp2,w)][get_x_coord(parentp2,w)] = parentp1;\n\t }\n\t else {\n\t\tparentID[get_y_coord(parentp1,w)][get_x_coord(parentp1,w)] = parentp2;\n\t }\n\t return;\n}\n\n/* Store forest of up-trees in the array parentID, given the graph G. */\nvoid up_trees_new(graph G, pixelID parentID[ROWS][COLS]) {\n\t for (unsigned int i = 0; i < G->image_height; i++) {\n\t\tfor (unsigned int j = 0; j < G->image_width; j++) {\n\t\t  parentID[i][j] = -1;\n\t\t}\n\t }\n\t return;\n}\n\n/*\n * Run UNION-FIND, and store the final forest of up-trees in array parentID,\n * where count is a boolean flag indicating whether to print out the count.\n */\nvoid run_union_find(graph G, pixelID parentID[ROWS][COLS], bool count) {\n\t int w = G->image_width;\n\t int h = G->image_height;\n\t int timesUF = 0;\n\t for (int i = 0; i < h; i++) {\n\t\tfor (int j = 0; j < w; j++) {\n\n\t\t  pixelID root = up_trees_find(parentID, w, get_pixel_id(j, i, w));\n\t\t  pixelID rootright = up_trees_find(parentID, w, get_pixel_id(j+1, i, w));\n\t\t  pixelID rootup = up_trees_find(parentID, w, get_pixel_id(j, i+1, w));\n\n\t\t  if (root != rootup && i<h-1 && (G->edges)[i][j][0]==1) {\n\t\t\t up_trees_union(parentID, w, get_pixel_id(j, i, w), get_pixel_id(j, i+1, w));\n\t\t\t timesUF++;\n\t\t  }\n\n\t\t  if (root != rootright && j<w-1 && (G->edges)[i][j][1]==1) {\n\t\t\t up_trees_union(parentID, w, get_pixel_id(j, i, w), get_pixel_id(j+1, i, w));\n\t\t\t timesUF++;\n\t\t  }\n\t\t}\n\t }\n\t if (count==true) printf(\"The number of times that the method union was called for this image is: %d\\n\", timesUF);\n\n\t return;\n}"

document.onkeypress = addText

function addText() {
	var paragraph = document.getElementById("hackerText");
  var wordEnd = Math.min(pos+lettersAtATime, msg.length);
	var text = document.createTextNode(msg.substring(pos, wordEnd));
	paragraph.appendChild(text);
  pos += lettersAtATime
  if (pos >= msg.length) pos = 0

	var bottom = document.getElementById("textBottom");
	bottom.scrollIntoView(false)
}
