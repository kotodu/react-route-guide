// https://github.com/typescript-cheatsheets/react#the-types-i-need-dont-exist
// typedec.d.tsは自動で読み込まれる
// declarationsもだっけ……あとで調べる

/**
 * .ttfのアンビエント宣言
 */
declare module "*.ttf" {
    const content: any;
    export default content;
}

/**
 * .otfのアンビエント宣言
 */
declare module "*.otf" {
    const content: any;
    export default content;
}