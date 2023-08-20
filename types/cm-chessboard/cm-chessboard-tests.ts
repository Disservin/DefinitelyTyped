import * as cm from 'cm-chessboard';

const div = document.createElement('div');

// $ExpectType Chessboard
const board = new cm.Chessboard(div, {});

// $ExpectType Promise<void>
board.setPiece('a2', 'wk');

// $ExpectType Promise<void>
board.movePiece('a2', 'a3');

// $ExpectType Piece
board.getPiece('a1');

// $ExpectType Promise<void>
board.setPosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');

// $ExpectType string
board.getPosition();

// $ExpectType Promise<void>
board.setOrientation('w');

// $ExpectType string | undefined
board.getOrientation();

// $ExpectType void
board.enableMoveInput((data: cm.MoveInputData) => {}, 'w');

// $ExpectType void
board.disableMoveInput();

// $ExpectType void
board.addExtension(cm.Persistence, { initialPosition: 'start' });

// $ExpectType Persistence | null
board.getExtension(cm.Persistence);

// $ExpectType ChessboardState | undefined
board.state;

// $ExpectType void
board.destroy();

// RenderVideo Extension

// $ExpectType Chessboard & { recorderInit(): Promise<void>; recorderStart(): Promise<void>; recorderStop(): Promise<void>; recorderPause(ms: number): Promise<void>; recorderResume(): Promise<void>; }
const boardRenderVideo = new cm.Chessboard(div, {
    extensions: [{ class: cm.RenderVideo }],
});

// $ExpectType Promise<void>
boardRenderVideo.recorderInit();

// $ExpectType Promise<void>
boardRenderVideo.recorderInit();

// $ExpectType Promise<void>
boardRenderVideo.recorderStart();

// $ExpectType Promise<void>
boardRenderVideo.recorderStop();

// $ExpectType Promise<void>
boardRenderVideo.recorderPause(1000);

// $ExpectType Promise<void>
boardRenderVideo.recorderResume();

// PromotionDialog Extension

// $ExpectType Chessboard & { showPromotionDialog(square: Square, color: "b" | "w", callback: (promotion: { square: Square; piece: Piece; }) => void): void; isPromotionDialogShown(): boolean; }
const boardPromotionDialog = new cm.Chessboard(div, {
    extensions: [{ class: cm.PromotionDialog }],
});

// $ExpectType void
boardPromotionDialog.showPromotionDialog('a1', 'w', piece => {});

// $ExpectType boolean
boardPromotionDialog.isPromotionDialogShown();

// Markers Extension

// Chessboard & { recorderInit(): Promise<void>; recorderStart(): Promise<void>; recorderStop(): Promise<void>; recorderPause(ms: number): Promise<void>; recorderResume(): Promise<void>; }
const boardM = new cm.Chessboard(div, {
    extensions: [{ class: cm.Markers }],
});

// $ExpectType void
boardM.addMarker({ class: 'marker-frame', slice: 'markerFrame' }, 'a1');

// $ExpectType Marker[]
boardM.getMarkers({ class: 'marker-frame', slice: 'markerFrame' }, 'a1');

// $ExpectType void
boardM.removeMarkers({ class: 'marker-frame', slice: 'markerFrame' }, 'a1');

// HTML Layer Extension

// $ExpectType Chessboard & { addHtml(htmlElement: string): HTMLDivElement; removeHtml(layer: string): void; }
const boardHtmlLayer = new cm.Chessboard(div, { extensions: [{ class: cm.HtmlLayer }] });

// $ExpectType HTMLDivElement
boardHtmlLayer.addHtml('<div>test</div>');

// $ExpectType void
boardHtmlLayer.removeHtml('<div>test</div>');

// Arrows Extension

const boardArrows = new cm.Chessboard(div, { extensions: [{ class: cm.Arrows }] });

// $ExpectType void
boardArrows.addArrow({ class: 'arrow-default', slice: 'arrowDefault', headSize: 7 }, 'a1', 'a2');

// $ExpectType Arrow[]
boardArrows.getArrows({ class: 'arrow-default', slice: 'arrowDefault', headSize: 7 }, 'a1', 'a2');

// $ExpectType void
boardArrows.removeArrows({ class: 'arrow-default', slice: 'arrowDefault', headSize: 7 }, 'a1', 'a2');

// Accessibility Extension

// $ExpectType Chessboard
const boardAccessibility = new cm.Chessboard(div, { extensions: [{ class: cm.Accessibility }] });
