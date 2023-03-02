import { Component ,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmojipickerService } from '../services/emojipicker.service';

@Component({
  selector: 'app-emojipicker',
  templateUrl: './emojipicker.component.html',
  styleUrls: ['./emojipicker.component.scss']
})
export class EmojipickerComponent implements OnInit {

constructor(
  public dialogRef: MatDialogRef<EmojipickerComponent>,
  public emojipicker: EmojipickerService
) {}

ngOnInit(): void {
  
}


addEmoji(event) {
  console.log(event.emoji.colons);
  this.dialogRef.close()
}

}
