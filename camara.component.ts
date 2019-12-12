import { Component, OnInit, ViewChild, ElementRef,Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CamaraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CamaraComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any) { 
    
  }

  ngOnInit() {
  }

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public foto:any;

  camara:boolean=true;


 ngAfterViewInit() {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream;
              this.video.nativeElement.play();
          });
      }
  }

 capture() {
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
      this.foto=this.canvas.nativeElement.toDataURL("image/png");
      this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop())
      this.camara=false;
  }

  retomar(){
    this.camara=true;
    this.foto=null    
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      });
  
  }

  guardar(){
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.video.nativeElement.srcObject.getTracks().forEach(track => track.stop())
    
    this.dialogRef.close();
    
  }
  

}
