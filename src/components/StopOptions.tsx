import { OdptBusroutePattern } from "../@types/odpt";
export interface Pole {
    "odpt:busstopPole": string;
    "odpt:note"?: string;
}
type Props = {
    routePatterns: OdptBusroutePattern[];
    selectPoleId: string;
    setPole: (poleid: string) => void;
};

/**
 * @summary 停留所を選択肢にしたselectを返す
 * @param param0
 */
const StopOptions = ({ routePatterns, selectPoleId, setPole }: Props) => {
    // すべての停留所を格納するMapを作る
    const poleMap = new Map<Pole["odpt:busstopPole"], Pole>();
    routePatterns.forEach((pattern) => {
        const orders = pattern["odpt:busstopPoleOrder"];
        orders.forEach((order) => {
            const pole = {
                "odpt:busstopPole": order["odpt:busstopPole"],
                "odpt:note": order["odpt:note"],
            };

            poleMap.set(pole["odpt:busstopPole"], pole);
        });
    });
    const poles = Array.from(poleMap.values());

    // poleのSetから選択肢を作成する
    const options = poles.map((pole) => {
        const optionValue = pole["odpt:busstopPole"];
        const poleText = pole["odpt:note"] ?? pole["odpt:busstopPole"];
        return (
            <option value={optionValue} key={optionValue}>
                {poleText}
            </option>
        );
    });

    // 停留所を選択するselectを返す
    return (
        <select
            name="selectedPole"
            value={selectPoleId}
            onChange={(e) => {
                setPole(e.target.value);
            }}
        >
            {options}
        </select>
    );
};

export default StopOptions;
