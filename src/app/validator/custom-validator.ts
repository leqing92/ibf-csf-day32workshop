import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    static notPast = (ctrl : AbstractControl) => {
        let today : Date = new Date();
        today.setHours(0, 0, 0, 0);
        
        if(new Date(ctrl.value) >= today){
            return null
        }else{
            return {notPast : true} as ValidationErrors
        }
    }
}
