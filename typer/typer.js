//Will type out the given message whenever the user clicks. Perfect for fake hacking.

var lettersAtATime = 10
var pos = 0
var fakeCode = "pixelID up_trees_find(pixelID parentID[ROWS][COLS], unsigned int w, pixelID idx) {\n\n\t pixelID loc = idx;\n\t while (parentID[get_y_coord(loc,w)][get_x_coord(loc,w)] != -1) {\n\t\tloc = parentID[get_y_coord(loc,w)][get_x_coord(loc,w)];\n\t\tif (parentID[get_y_coord(loc,w)][get_x_coord(loc,w)] == -1) return loc;\n\t }\n\n\t return idx; //returns this only if this node is the root of its equivalence class\n}\n\nsub\t $0x18,%rsp\nmov\t %fs:0x28,%rax\nmov\t %rax,0x8(%rsp)\nxor\t %eax,%eax\nlea\t 0x4(%rsp),%rcx\n\n/* Merge the two groups to which pixel p1 and pixel p2 belong. */\nvoid up_trees_union(pixelID parentID[ROWS][COLS], unsigned int w, pixelID p1, pixelID p2) {\n\t pixelID parentp1 = up_trees_find(parentID, w, p1);\n\t pixelID parentp2 = up_trees_find(parentID, w, p2);\n\t if (parentp1==parentp2) return;\n\t else if (parentp1<parentp2) {\n\t\tparentID[get_y_coord(parentp2,w)][get_x_coord(parentp2,w)] = parentp1;\n\t }\n\t else {\n\t\tparentID[get_y_coord(parentp1,w)][get_x_coord(parentp1,w)] = parentp2;\n\t }\n\t return;\n}\n\nmov\t %rsp,%rdx\nmov\t $0x402bde,%esi\ncallq  0x400d00 <__isoc99_sscanf@plt>\ncmp\t $0x2,%eax\njne\t 0x4011ac <phase_4+49>\ncmpl\t$0xe,(%rsp)\njbe\t 0x4011b1 <phase_4+54>\ncallq  0x4018f5 <explode_bomb>\n\n/* Store forest of up-trees in the array parentID, given the graph G. */\nvoid up_trees_new(graph G, pixelID parentID[ROWS][COLS]) {\n\t for (unsigned int i = 0; i < G->image_height; i++) {\n\t\tfor (unsigned int j = 0; j < G->image_width; j++) {\n\t\t  parentID[i][j] = -1;\n\t\t}\n\t }\n\t return;\n}\n\nmov\t $0xe,%edx\nmov\t $0x0,%esi\nmov\t (%rsp),%edi\ncallq  0x401148 <func4>\ncmp\t $0x2b,%eax\njne\t 0x4011cf <phase_4+84>\ncmpl\t$0x2b,0x4(%rsp)\n\n/*\n * Run UNION-FIND, and store the final forest of up-trees in array parentID,\n * where count is a boolean flag indicating whether to print out the count.\n */\nvoid run_union_find(graph G, pixelID parentID[ROWS][COLS], bool count) {\n\t int w = G->image_width;\n\t int h = G->image_height;\n\t int timesUF = 0;\n\t for (int i = 0; i < h; i++) {\n\t\tfor (int j = 0; j < w; j++) {\n\n\t\t  pixelID root = up_trees_find(parentID, w, get_pixel_id(j, i, w));\n\t\t  pixelID rootright = up_trees_find(parentID, w, get_pixel_id(j+1, i, w));\n\t\t  pixelID rootup = up_trees_find(parentID, w, get_pixel_id(j, i+1, w));\n\n\t\t  if (root != rootup && i<h-1 && (G->edges)[i][j][0]==1) {\n\t\t\t up_trees_union(parentID, w, get_pixel_id(j, i, w), get_pixel_id(j, i+1, w));\n\t\t\t timesUF++;\n\t\t  }\n\n\t\t  if (root != rootright && j<w-1 && (G->edges)[i][j][1]==1) {\n\t\t\t up_trees_union(parentID, w, get_pixel_id(j, i, w), get_pixel_id(j+1, i, w));\n\t\t\t timesUF++;\n\t\t  }\n\t\t}\n\t }\n\t if (count==true) printf(\"The number of times that the method union was called for this image is: %d\n\", timesUF);\n\n\t return;\n}\n\nje\t  0x4011d4 <phase_4+89>\ncallq  0x4018f5 <explode_bomb>\nmov\t 0x8(%rsp),%rax\nxor\t %fs:0x28,%rax\nje\t  0x4011e9 <phase_4+110>\ncallq  0x400c40 <__stack_chk_fail@plt>\nadd\t $0x18,%rsp\nretq\n\n"



document.onkeypress = () =>
{
	var paragraph = document.getElementById("hackerText");
  var wordEnd = Math.min(pos+lettersAtATime, fakeCode.length);
	var text = document.createTextNode(fakeCode.substring(pos, wordEnd));
	paragraph.appendChild(text);
  pos += lettersAtATime;
  if (pos >= fakeCode.length) pos = 0;

	var bottom = document.getElementById("textBottom");
	bottom.scrollIntoView(false)
}
