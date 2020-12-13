import React, { useState } from "react";
import { OdptBusroutePattern } from "./@types/odpt";
import InputConfig from "./components/InputConfig";
import { PdfDisplay } from "./components/PdfDisplay";
import StopOptions from "./components/StopOptions";
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
    const [routePatterns, setPatterns] = useState<OdptBusroutePattern[]>([]);

    /**
     * @var 選択している停留所ID
     * TODO : 停留所名を鍵にしては？
     */
    const [selectStopId, setStop] = useState<string>("");

    // consumerKey設定
    const inputConfig = (
        <InputConfig
            consumerKey={consumerKey}
            changeKey={(newKey) => {
                setConsumerKey(newKey);
            }}
        />
    );

    /**
     * @method getFirstStopId
     * @param {OdptBusroutePattern[]} patterns
     * @returns {string} 最初のパターンの最初の停留所ID
     */
    const getFirstStopId = (patterns: OdptBusroutePattern[]): string => {
        const pattern0orders = patterns?.[0]?.["odpt:busstopPoleOrder"];
        const firstStop = pattern0orders?.find((order) => {
            return order["odpt:index"] === 1;
        });
        const poleId = firstStop?.["odpt:busstopPole"] ?? "";
        return poleId;
    };

    // 取得ボタン
    const getButton = (
        <div className="my-3">
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    // routePatternsが変更された場合、最初のパターンのindex1のバス停をセットする
                    // なければ空文字
                    getBusroutePattern(OPERATOR, ROUTE, consumerKey).then(
                        (routePatterns) => {
                            setStop(getFirstStopId(routePatterns));
                            setPatterns(routePatterns);
                        }
                    );
                }}
            >
                GetData
            </button>
        </div>
    );

    // 停留所選択select
    const stopSelect = (
        <div className="my-3">
            <h3>停留所選択</h3>
            <StopOptions
                routePatterns={routePatterns}
                selectPoleId={selectStopId}
                setPole={(poleId) => {
                    setStop(poleId);
                }}
            />
        </div>
    );

    // 左サイドバー
    const leftArea = (
        <aside className="col-6 bg-light vh-100">
            <h1>React-Route-Guide</h1>
            <hr></hr>
            <h2>設定</h2>
            {inputConfig}
            {getButton}
            {stopSelect}
        </aside>
    );

    // PDF出力エリア
    const rightArea = (
        <main className="col-6">
            {routePatterns.length > 0 ? (
                <PdfDisplay
                    routePatterns={routePatterns}
                    selectStop={selectStopId ?? ""}
                />
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
