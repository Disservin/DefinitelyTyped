// Type definitions for cm-chessboard 7.8
// Project: https://github.com/shaack/cm-chessboard
// Definitions by: Max Allendorf <https://github.com/Disservin>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 4.7

/**
 * One of the possible squares on a chess board in san format,
 * e.g. "a8" to "h1".
 */
export type Square =
    | 'a8'
    | 'b8'
    | 'c8'
    | 'd8'
    | 'e8'
    | 'f8'
    | 'g8'
    | 'h8'
    | 'a7'
    | 'b7'
    | 'c7'
    | 'd7'
    | 'e7'
    | 'f7'
    | 'g7'
    | 'h7'
    | 'a6'
    | 'b6'
    | 'c6'
    | 'd6'
    | 'e6'
    | 'f6'
    | 'g6'
    | 'h6'
    | 'a5'
    | 'b5'
    | 'c5'
    | 'd5'
    | 'e5'
    | 'f5'
    | 'g5'
    | 'h5'
    | 'a4'
    | 'b4'
    | 'c4'
    | 'd4'
    | 'e4'
    | 'f4'
    | 'g4'
    | 'h4'
    | 'a3'
    | 'b3'
    | 'c3'
    | 'd3'
    | 'e3'
    | 'f3'
    | 'g3'
    | 'h3'
    | 'a2'
    | 'b2'
    | 'c2'
    | 'd2'
    | 'e2'
    | 'f2'
    | 'g2'
    | 'h2'
    | 'a1'
    | 'b1'
    | 'c1'
    | 'd1'
    | 'e1'
    | 'f1'
    | 'g1'
    | 'h1';

export const COLOR: {
    white: 'w';
    black: 'b';
};

export const INPUT_EVENT_TYPE: {
    moveInputStarted: string;
    movingOverSquare: string;
    validateMoveInput: string;
    moveInputCanceled: string;
    moveInputFinished: string;
};

export const SQUARE_SELECT_TYPE: {
    primary: string;
    secondary: string;
};

export const BORDER_TYPE: {
    none: string;
    thin: string;
    frame: string;
};

export const PIECE: {
    wp: string;
    wb: string;
    wn: string;
    wr: string;
    wq: string;
    wk: string;
    bp: string;
    bb: string;
    bn: string;
    br: string;
    bq: string;
    bk: string;
};

export const PIECES_FILE_TYPE: {
    svgSprite: string;
};

export const FEN: {
    start: string;
    empty: string;
};

export type ExtensionPoint =
    | 'positionChanged'
    | 'boardChanged'
    | 'moveInputToggled'
    | 'moveInput'
    | 'redrawBoard'
    | 'animation'
    | 'destroy';

export type Piece = 'wp' | 'wb' | 'wn' | 'wr' | 'wq' | 'wk' | 'bp' | 'bb' | 'bn' | 'br' | 'bq' | 'bk' | null;

export type PieceType = 'p' | 'b' | 'n' | 'r' | 'q' | 'k';

export interface MARKER_TYPE {
    class:
        | 'marker-frame'
        | 'marker-frame-primary'
        | 'marker-frame-danger'
        | 'marker-circle'
        | 'marker-circle-primary'
        | 'marker-circle-danger'
        | 'marker-square'
        | 'marker-dot'
        | 'marker-bevel';
    slice: 'markerFrame' | 'markerCircle' | 'markerSquare' | 'markerDot' | 'markerBevel';
}

export interface MoveInputData {
    chessboard: any;
    type: keyof typeof INPUT_EVENT_TYPE;
    square?: Square;
    squareFrom: Square;
    squareTo?: Square;
    piece: Piece;
    moveInputCallbackResult?: any;
}

export interface RenderVideoProps {
    mediaType?: string;
    safariMode?: boolean;
}

export interface PersistenceProps {
    initialPosition?: string;
}

export interface MarkersProps {
    autoMarkers?: {
        class?: string;
        slice?: string;
    };
    sprite?: string;
}

export interface ArrowsProps {
    sprite?: string;
}

export interface AccessibilityProps {
    brailleNotationInAlt?: boolean;
    movePieceForm?: boolean;
    boardAsTable?: boolean;
    piecesAsList?: boolean;
    visuallyHidden?: boolean;
}

export class Position {
    squares: Array<string | null>;

    constructor(fen: string);

    setFen(fen: string): void;

    getFen(): string;

    getPieces(sortBy: PieceType[]): Array<{
        name: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
        color: (typeof COLOR)[keyof typeof COLOR];
        position: Square;
    }>;

    movePiece(squareFrom: Square, squareTo: Square): void;

    setPiece(square: Square, piece: Piece): void;

    getPiece(square: Square): Piece;

    static squareToIndex(square: Square): number;

    static indexToSquare(index: number): Square;

    static squareToCoordinates(square: Square): number[];

    static coordinatesToSquare(coordinates: number[]): Square;

    clone(): Position;
}

export class ChessboardState {
    position: Position;
    orientation: string | undefined;
    markers: any[];
    inputWhiteEnabled: boolean;
    inputBlackEnabled: boolean;
    inputEnabled: boolean;
    squareSelectEnabled: boolean;
    extensionPoints: Record<ExtensionPoint, Array<() => void>>;
    moveInputProcess: Promise<any>;

    invokeExtensionPoints(name: ExtensionPoint, data: Record<any, any>): boolean;
}

/*
Helper types to enable the library to be extended with custom extensions.
This is a bit tricky since the extensions added in the Chessboard constructor add new methods to the original
Chessboard class. Multiple extensions can be added to the Chessboard, and each extension can add new methods to the
Chessboard class.
*/

type U2I<U> = (U extends U ? (u: U) => 0 : never) extends (i: infer I) => 0 ? Extract<I, U> : never;
export {};

declare const __type: unique symbol;
export {};

declare class Extension<T> {
    props?: Record<string, any>;
    private declare [__type]: T;
    constructor(chessboard: Chessboard);
    registerExtensionPoint(name: ExtensionPoint, callback: (data: any) => void): void;
}
export {};

interface ExtensionOption {
    class: typeof Extension<unknown>;
}

type ExtractExtension<T extends ExtensionOption> = U2I<
    T extends T ? (T['class'] extends typeof Extension<infer T> ? T : never) : never
>;

export const Chessboard: {
    new <T extends ExtensionOption>(
        context: HTMLElement,
        props?: {
            position?: string;
            orientation?: string;
            responsive?: boolean;
            language?: string;
            assetsUrl?: string;
            assetsCache?: boolean;
            style?: {
                cssClass?: string;
                showCoordinates?: boolean;
                borderType?: string;
                aspectRatio?: number;
                pieces?: {
                    type?: string;
                    file?: string;
                    tileSize?: number;
                };
                animationDuration?: number;
            };
            extensions?: Array<T & { props?: T['class']['prototype']['props'] }>;
        },
    ): Chessboard & ExtractExtension<T>;
};

// end of helper types

export interface Chessboard {
    state: ChessboardState | undefined;

    setPiece(square: Square, piece: Piece, animated?: boolean): Promise<void>;

    movePiece(from: Square, to: Square, animated?: boolean): Promise<void>;

    getPiece(square: Square): Piece;

    setPosition(fen: string, animated?: boolean): Promise<void>;

    getPosition(): string;

    setOrientation(color: (typeof COLOR)[keyof typeof COLOR], animated?: boolean): Promise<void>;

    getOrientation(): string | undefined;

    enableMoveInput(eventHandler: (data: MoveInputData) => void, color?: (typeof COLOR)[keyof typeof COLOR]): void;

    disableMoveInput(): void;

    addExtension<
        T extends
            | Extension<any>
            | RenderVideo
            | PromotionDialog
            | Persistence
            | Markers
            | HtmlLayer
            | Arrows
            | Accessibility,
    >(
        extensionClass: new (chessboard: Chessboard, props?: T extends Extension<any> ? T['props'] : any) => T,
        props?: T extends Extension<any> ? T['props'] : any,
    ): void;

    getExtension<
        T extends
            | Extension<any>
            | RenderVideo
            | PromotionDialog
            | Persistence
            | Markers
            | HtmlLayer
            | Arrows
            | Accessibility,
    >(
        extensionClass: new (chessboard: Chessboard, props?: T extends Extension<any> ? T['props'] : any) => T,
    ): T | null;

    destroy(): void;
}

// Extensions

export class RenderVideo extends Extension<{
    recorderInit(): Promise<void>;
    recorderStart(): Promise<void>;
    recorderStop(): Promise<void>;
    recorderPause(ms: number): Promise<void>;
    recorderResume(): Promise<void>;
}> {
    props: RenderVideoProps;

    constructor(chessboard: Chessboard, props?: RenderVideoProps);
    cloneImageAndRender(): Promise<void>;
    transferComputedStyle(element: Element): void;
    makeSpriteInline(): void;
}

export class PromotionDialog extends Extension<{
    showPromotionDialog(
        square: Square,
        color: (typeof COLOR)[keyof typeof COLOR],
        callback: (promotion: { square: Square; piece: Piece }) => void,
    ): void;
    isPromotionDialogShown(): boolean;
}> {
    constructor(chessboard: Chessboard);

    showPromotionDialog(
        square: Square,
        color: (typeof COLOR)[keyof typeof COLOR],
        callback: (promotion: { square: Square; piece: Piece }) => void,
    ): void;
    isPromotionDialogShown(): boolean;

    private extensionPointRedrawBoard(): void;
    drawPieceButton(piece: Piece, point: { x: number; y: number }): void;
    redrawDialog(): void;
    promotionDialogOnClickPiece(event: MouseEvent): void;
    promotionDialogOnCancel(event: MouseEvent): void;
    contextMenu(event: MouseEvent): void;
    setDisplayState(state: 'hidden' | 'shown' | 'displayRequested'): void;
}

export class Persistence extends Extension<{}> {
    props: PersistenceProps;
    constructor(chessboard: Chessboard, props?: PersistenceProps);
    savePosition(): void;
    loadPosition(): void;
}

export class Marker {
    square: Square;
    type: MARKER_TYPE;
}

export class Markers extends Extension<{
    addMarker(type: MARKER_TYPE, square: Square): void;
    getMarkers(type: MARKER_TYPE, square: Square): Marker[];
    removeMarkers(type: MARKER_TYPE, square: Square): void;
}> {
    props: MarkersProps;
    constructor(chessboard: Chessboard, props?: MarkersProps);

    drawAutoMarkers(event: MoveInputData): void;

    onRedrawBoard(): void;
    drawMarkers(marker: Marker): void;

    addMarker(type: MARKER_TYPE, square: Square): void;
    getMarkers(type: MARKER_TYPE, square: Square): Marker[];
    removeMarkers(type: MARKER_TYPE, square: Square): void;

    getSpriteUrl(): string;
}

export class HtmlLayer extends Extension<{
    addHtml(htmlElement: string): HTMLDivElement;
    removeHtml(layer: string): void;
}> {
    constructor(chessboard: Chessboard);

    addHtml(htmlElement: string): HTMLDivElement;
    removeHtml(layer: string): void;
}

export interface ARROW_TYPE {
    class: 'arrow-default' | 'arrow-danger' | 'arrow-pointy';
    slice: 'arrowDefault' | 'arrowPointy';
    headSize: number;
}

export class Arrow {
    from: Square;
    to: Square;
    type: keyof ARROW_TYPE;
}

export class Arrows extends Extension<{
    addArrow(type: ARROW_TYPE, from: Square, to: Square): void;
    getArrows(type: ARROW_TYPE, from?: Square, to?: Square): Arrow[];
    removeArrows(type?: ARROW_TYPE, from?: Square, to?: Square): void;
}> {
    props: ArrowsProps;
    constructor(chessboard: Chessboard, props?: ArrowsProps);

    onRedrawBoard(): void;

    drawArrow(arrow: Arrow): void;

    addArrow(type: ARROW_TYPE, from: Square, to: Square): void;

    getArrows(type: ARROW_TYPE, from?: Square, to?: Square): Arrow[];
    removeArrows(type?: ARROW_TYPE, from?: Square, to?: Square): void;

    getSpriteUrl(): string;
}

export class Accessibility extends Extension<{}> {
    props: AccessibilityProps;
    constructor(chessboard: Chessboard, props?: AccessibilityProps);
}
