export class AppMessage {
    
    title: string;
    message: string;
    description: string;
    advice: string;
    
    constructor() {  }

    public UseNotConnectedMessage() {
        this.title = "Aucune connection Internet n'a été détectée.";
        this.description = "Vous n'êtes pas connecté à Internet. "
        this.advice = "Assurez-vous que la Wi-Fi ou les données mobiles sont activées."
    }


}