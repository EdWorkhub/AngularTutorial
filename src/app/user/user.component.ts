import { Component, Output, Input, EventEmitter } from "@angular/core";


@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {
    @Input() id!: string;
    @Input({ required: true }) avatar!: string;
    @Input({ required: true }) name!: string; 
    @Output() select = new EventEmitter<string>(); 


    get imagePath() {
        return 'assets/users/' + this.avatar;
    }

    onSelectUserEmit() {
        this.select.emit(this.id);
    }

}