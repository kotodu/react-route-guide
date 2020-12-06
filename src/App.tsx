import React, { useState } from "react";
import InputConfig from "./components/InputConfig";
import { PdfDisplay } from "./components/PdfDisplay";

/**
 * Appコンポーネント
 */
const App: React.FC = () => {
    /**
     * @var {string} consumerKey
     * @description 東京公共交通オープンデータチャレンジにアクセスするconsumerKey
     * 完全クライアントサイドで完結させる為、毎回入力させる
     * 本当は他の方法が好ましい
     * setConsumerKeyを経由して値を設定する
     * @see {@link setConsumerKey }
     * @default "" 既定値は空文字列(アクセス不能)
     */
    const [consumerKey, setConsumerKey] = useState<string>("");

    const inputConfig = (
        <InputConfig
            consumerKey={consumerKey}
            changeKey={(newKey) => {
                setConsumerKey(newKey);
            }}
        />
    );
    const leftArea = (
        <aside className="col-6 bg-light vh-100">
            <h1>React-Route-Guide</h1>
            <hr></hr>
            <h2>設定</h2>
            {inputConfig}
            <button type="button" className="btn btn-primary">
                GetData
            </button>
        </aside>
    );

    const rightArea = (
        <main className="col-6">
            <PdfDisplay />
        </main>
    );

    return (
        <div className="container-fluid vh-100">
            <div className="row">
                {leftArea}
                {rightArea}
            </div>
        </div>
    );
};

export default App;
