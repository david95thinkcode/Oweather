export module ReadableDay {
    
    /**
     * 
     * @param dayIndex Represents index of a day. Exemple : 0 => Monday
     * @param language The language we want to parse the readable day string
     */
    export function getReadableDayByIndex(dayIndex: number, language: string) {
        
        let dayString: string;

        switch (language) {
            case 'fr':
                switch (dayIndex) {
                    case 0:
                      dayString = "Lundi";
                      break;
                    case 1:
                      dayString = "Mardi";
                      break;
                    case 2:
                      dayString = "Mercredi";
                      break;
                    case 3:
                      dayString = "Jeudi";
                      break;
                    case 4:
                      dayString = "Vendredi";
                      break;
                    case 5:
                      dayString = "Samedi";
                      break;
                    case 6:
                      dayString = "Dimanche";
                      break;
                    default:
                      break;
                }
                break;
        
            case 'en':
                switch (dayIndex) {
                    case 0:
                      dayString = "Monday";
                      break;
                    case 1:
                      dayString = "Tuesday";
                      break;
                    case 2:
                      dayString = "Wednesday"
                      break;
                    case 3:
                      dayString = "Thusday";
                      break;
                    case 4:
                      dayString = "Friday";
                      break;
                    case 5:
                      dayString = "Saturday";
                      break;
                    case 6:
                      dayString = "Sunday";
                      break;
                    default:
                      break;
                }
                break;
            
            default:
                break;
        }

        return dayString;
    }
}