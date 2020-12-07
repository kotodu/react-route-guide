// https://app.quicktype.io/ を使用
export interface OdptBusroutePattern {
    "@context": string;
    "@type": string;
    "ow:sameAs": string;
    "dc:date": Date;
    "dc:title": string;
    "odpt:kana": string;
    "odpt:operator": string;
    "odpt:busroute": string;
    "odpt:pattern": string;
    "odpt:direction": string;
    "odpt:busstopPoleOrder": OdptBusstopPoleOrder[];
}

export interface OdptBusstopPoleOrder {
    "odpt:busstopPole": string;
    "odpt:index": number;
}

export interface OdptBusstopPole {
    "@context": string;
    "@type": string;
    "owl:sameAs": string;
    "dc:date": Date;
    "dc:title": string;
    "odpt:kana": string;
    "geo:long": number;
    "geo:lat": number;
    "odpt:busroutePattern": string[];
    "odpt:operator": string[];
    "odpt:busstopPoleNumber": string;
    "odpt:busstopTimetable": string[];
}
