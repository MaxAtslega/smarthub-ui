// models/Radio.ts
export interface Station {
    changeuuid: string;
    stationuuid: string;
    name: string;
    url: string;
    url_resolved: string;
    homepage: string;
    favicon: string;
    tags: string;
    country: string;
    countrycode: string;
    state: string;
    language: string;
    languagecodes: string;
    votes: number;
    lastchangetime: string;
    codec: string;
    bitrate: number;
    hls: number;
    lastcheckok: number;
    lastchecktime: string;
    clicktimestamp: string;
    clickcount: number;
    clicktrend: number;
    ssl_error: number;
    geo_lat: number;
    geo_long: number;
    has_extended_info: boolean;
}

export interface StationCheck {
    checkuuid: string;
    stationuuid: string;
    source: string;
    codec: string;
    bitrate: number;
    hls: number;
    ok: number;
    timestamp: string;
    urlcache: string;
    metainfo_overrides_database: number;
    public: number;
    name: string;
    description: string;
    tags: string;
    countrycode: string;
    countrysubdivisioncode: string;
    homepage: string;
    favicon: string;
    loadbalancer: string;
    server_software: string;
    sampling: number;
    timing_ms: number;
    languagecodes: string;
    ssl_error: number;
    geo_lat: number;
    geo_long: number;
}

export interface Country {
    name: string;
    iso_3166_1: string;
    stationcount: number;
}

export interface Codec {
    name: string;
    stationcount: number;
}

export interface Language {
    name: string;
    iso_639: string | null;
    stationcount: number;
}

export interface Tag {
    name: string;
    stationcount: number;
}
