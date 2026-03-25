export const getMatchStatus = (statusShort: string) => {
      switch (statusShort) {
        case "LIVE":
        case "1H":
        case "HT":
        case "2H":
        case "ET":
        case "P":
          return "live";
        case "FT":
        case "AET":
        case "PEN":
          return "finished";
        case "NS":
        case "TBD":
        case "SUSP":
        case "PST":
        case "CANC":
        default:
          return "upcoming";
      }
    };