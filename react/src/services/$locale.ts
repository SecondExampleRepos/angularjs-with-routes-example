// react/src/services/$locale.ts

export interface Locale {
  id: string;
  NUMBER_FORMATS: {
    DECIMAL_SEP: string;
    GROUP_SEP: string;
    PATTERNS: Array<{
      minInt: number;
      minFrac: number;
      maxFrac: number;
      posPre: string;
      posSuf: string;
      negPre: string;
      negSuf: string;
      gSize: number;
      lgSize: number;
    }>;
    CURRENCY_SYM: string;
  };
  DATETIME_FORMATS: {
    MONTH: string[];
    SHORTMONTH: string[];
    DAY: string[];
    SHORTDAY: string[];
    AMPMS: string[];
    medium: string;
    short: string;
    fullDate: string;
    longDate: string;
    mediumDate: string;
    shortDate: string;
    mediumTime: string;
    shortTime: string;
  };
  pluralCat: (num: number) => string;
}

const $locale: Locale = {
  id: "en-us",
  NUMBER_FORMATS: {
    DECIMAL_SEP: ".",
    GROUP_SEP: ",",
    PATTERNS: [
      {
        minInt: 1,
        minFrac: 0,
        maxFrac: 3,
        posPre: "",
        posSuf: "",
        negPre: "-",
        negSuf: "",
        gSize: 3,
        lgSize: 3,
      },
      {
        minInt: 1,
        minFrac: 2,
        maxFrac: 2,
        posPre: "\u00a4",
        posSuf: "",
        negPre: "(\u00a4",
        negSuf: ")",
        gSize: 3,
        lgSize: 3,
      },
    ],
    CURRENCY_SYM: "$",
  },
  DATETIME_FORMATS: {
    MONTH: "January February March April May June July August September October November December".split(" "),
    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
    AMPMS: ["AM", "PM"],
    medium: "MMM d, y h:mm:ss a",
    short: "M/d/yy h:mm a",
    fullDate: "EEEE, MMMM d, y",
    longDate: "MMMM d, y",
    mediumDate: "MMM d, y",
    shortDate: "M/d/yy",
    mediumTime: "h:mm:ss a",
    shortTime: "h:mm a",
  },
  pluralCat: (num: number) => {
    return num === 1 ? "one" : "other";
  },
};

export default $locale;