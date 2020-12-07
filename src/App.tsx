import React, { useState } from "react";
import { OdptBusroutePattern } from "./@types/odpt";
import InputConfig from "./components/InputConfig";
import { PdfDisplay } from "./components/PdfDisplay";
import { getBusroutePattern } from "./scripts/getDataFromOdpt";

// 現在は暫定的に事業者を都営に、路線を王57に設定
// TODO : OPERATORの選択や、定数の別ファイル化
const OPERATOR = "odpt.Operator:Toei" as const;
const ROUTE = "odpt.Busroute:Toei.Ou57" as const;

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

    /**
     * @var {OdptBusroutePattern[]} routePatterns
     */
    const [routePatterns, setPatterns] = useState<OdptBusroutePattern[]>();

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
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    getBusroutePattern(OPERATOR, ROUTE, consumerKey).then(
                        (routePatterns) => {
                            setPatterns(routePatterns);
                        }
                    );
                }}
            >
                GetData
            </button>
        </aside>
    );

    const rightArea = (
        <main className="col-6">
            {routePatterns !== undefined ? (
                <PdfDisplay routePatterns={routePatterns} />
            ) : (
                <span>アクセスキーを入力してください</span>
            )}
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
