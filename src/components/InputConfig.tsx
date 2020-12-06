import React from "react";

type Props = {
    consumerKey: string;
    changeKey: (key: string) => void;
};

/**
 * @constant VIEW テキスト
 */
const VIEW = {
    LABEL: "東京公共交通オープンデータへアクセスするconsumerKey",
} as const;

/**
 * @method InputConfig
 * @param {Props} param0
 * @returns
 */
const InputConfig: React.FC<Props> = ({ consumerKey, changeKey }: Props) => {
    return (
        <>
            <label htmlFor="consumerKeyInput" className="form-label">
                {VIEW.LABEL}
            </label>
            <div className="input-group mb-3">
                <span className="input-group-text" id="consumerKeyLabel">
                    acl:consumerKey=
                </span>
                <input
                    type="text"
                    className="form-control"
                    id="consumerKeyInput"
                    aria-describedby="consumerKeyLabel"
                    value={consumerKey}
                    onChange={(e) => changeKey(e.target.value)}
                    required
                />
            </div>
        </>
    );
};

export default InputConfig;
