"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cm = require("cm-chessboard");
var div = document.createElement('div');
// $ExpectType Chessboard
var board = new cm.Chessboard(div, {
    extensions: [{ class: cm.RenderVideo }, { class: cm.Accessibility }],
});
