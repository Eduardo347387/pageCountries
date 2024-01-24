export interface valuePaginate{
    page_Size: number,
    page_Number: number
}

export interface Icountrys {
    name:         Name;
    tld?:         string[];
    cca2:         string;
    ccn3?:        string;
    cca3:         string;
    cioc?:        string;
    independent?: boolean;
    status:       Status;
    unMember:     boolean;
    currencies?:  Currencies;
    idd:          Idd;
    capital?:     string[];
    altSpellings: string[];
    region:       Region;
    subregion?:   string;
    languages?:   { [key: string]: string };
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms?:    Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   Continent[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
    gini?:        { [key: string]: number };
}

export interface CapitalInfo {
    latlng?: number[];
}

export interface Car {
    signs?: string[];
    side:   Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum Continent {
    Africa = "Africa",
    Antarctica = "Antarctica",
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "North America",
    Oceania = "Oceania",
    SouthAmerica = "South America",
}

export interface Currencies {
    EUR?: Aed;
    LAK?: Aed;
    CAD?: Aed;
    NGN?: Aed;
    VUV?: Aed;
    CZK?: Aed;
    MWK?: Aed;
    XOF?: Aed;
    ISK?: Aed;
    NOK?: Aed;
    XCD?: Aed;
    CLP?: Aed;
    BMD?: Aed;
    KWD?: Aed;
    USD?: Aed;
    XAF?: Aed;
    LKR?: Aed;
    CNY?: Aed;
    BDT?: Aed;
    SEK?: Aed;
    TRY?: Aed;
    GNF?: Aed;
    TZS?: Aed;
    RWF?: Aed;
    SGD?: Aed;
    MAD?: Aed;
    IQD?: Aed;
    BND?: Aed;
    GBP?: Aed;
    IMP?: Aed;
    KPW?: Aed;
    IRR?: Aed;
    ANG?: Aed;
    PYG?: Aed;
    ALL?: Aed;
    TJS?: Aed;
    BOB?: Aed;
    COP?: Aed;
    BZD?: Aed;
    MMK?: Aed;
    XPF?: Aed;
    BRL?: Aed;
    SOS?: Aed;
    AFN?: Aed;
    CKD?: Aed;
    NZD?: Aed;
    DZD?: Aed;
    MRU?: Aed;
    ERN?: Aed;
    KHR?: Aed;
    BSD?: Aed;
    BYN?: Aed;
    AUD?: Aed;
    TVD?: Aed;
    SHP?: Aed;
    BGN?: Aed;
    MZN?: Aed;
    INR?: Aed;
    PEN?: Aed;
    BIF?: Aed;
    HNL?: Aed;
    TOP?: Aed;
    SAR?: Aed;
    SRD?: Aed;
    QAR?: Aed;
    GIP?: Aed;
    MUR?: Aed;
    BBD?: Aed;
    SYP?: Aed;
    EGP?: Aed;
    STN?: Aed;
    KID?: Aed;
    LSL?: Aed;
    ZAR?: Aed;
    SBD?: Aed;
    LYD?: Aed;
    KRW?: Aed;
    CHF?: Aed;
    NIO?: Aed;
    MVR?: Aed;
    KGS?: Aed;
    KES?: Aed;
    CUC?: Aed;
    CUP?: Aed;
    PLN?: Aed;
    ETB?: Aed;
    BAM?: BAM;
    UYU?: Aed;
    CVE?: Aed;
    HTG?: Aed;
    YER?: Aed;
    SZL?: Aed;
    ZWL?: Aed;
    ILS?: Aed;
    FJD?: Aed;
    UAH?: Aed;
    HKD?: Aed;
    BTN?: Aed;
    NPR?: Aed;
    AED?: Aed;
    GGP?: Aed;
    DOP?: Aed;
    RSD?: Aed;
    BWP?: Aed;
    GHS?: Aed;
    KMF?: Aed;
    AZN?: Aed;
    JOD?: Aed;
    TWD?: Aed;
    DJF?: Aed;
    DKK?: Aed;
    PGK?: Aed;
    MGA?: Aed;
    HUF?: Aed;
    TTD?: Aed;
    GMD?: Aed;
    ARS?: Aed;
    CDF?: Aed;
    IDR?: Aed;
    LBP?: Aed;
    MYR?: Aed;
    KYD?: Aed;
    AMD?: Aed;
    MNT?: Aed;
    JPY?: Aed;
    PHP?: Aed;
    JMD?: Aed;
    MOP?: Aed;
    FOK?: Aed;
    GYD?: Aed;
    SDG?: BAM;
    RUB?: Aed;
    LRD?: Aed;
    MXN?: Aed;
    TND?: Aed;
    AWG?: Aed;
    KZT?: Aed;
    OMR?: Aed;
    TMT?: Aed;
    SLL?: Aed;
    WST?: Aed;
    GEL?: Aed;
    NAD?: Aed;
    SSP?: Aed;
    THB?: Aed;
    BHD?: Aed;
    FKP?: Aed;
    JEP?: Aed;
    VND?: Aed;
    GTQ?: Aed;
    MDL?: Aed;
    MKD?: Aed;
    UZS?: Aed;
    RON?: Aed;
    UGX?: Aed;
    ZMW?: Aed;
    PKR?: Aed;
    PAB?: Aed;
    AOA?: Aed;
    VES?: Aed;
    CRC?: Aed;
    SCR?: Aed;
}

export interface Aed {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root?:     string;
    suffixes?: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:      string;
    official:    string;
    nativeName?: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex?: string;
}

export enum Region {
    Africa = "Africa",
    Americas = "Americas",
    Antarctic = "Antarctic",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania",
}

export enum StartOfWeek {
    Monday = "monday",
    Saturday = "saturday",
    Sunday = "sunday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}


