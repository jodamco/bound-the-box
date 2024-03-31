import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { delay } from '../splash-screen/splash-screen.component';

@Component({
  selector: 'btb-canva-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canva-page.component.html',
  styleUrl: './canva-page.component.scss',
})
export class CanvaPageComponent {
  @ViewChild('shadowImg')
  shadowImg!: ElementRef<HTMLImageElement>;

  @ViewChild('code')
  codeComponent!: ElementRef;

  public displayCanvas: boolean = false;
  public base64Img: string = '';
  public ratio: number = 1;

  public boundingBox?: BoundingBox = undefined;
  private isMouseDown: boolean = false;

  public isCopySuccess: boolean = false;

  public async uploadImg(event: any) {
    try {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.base64Img = reader.result as string;

        const img = document.getElementById('uploadedImg') as HTMLImageElement;
        const shadowImg = document.getElementById(
          'shadowImg'
        ) as HTMLImageElement;

        img.src = this.base64Img;
        shadowImg.src = this.base64Img;

        const image = new Image();
        image.src = this.base64Img;

        image.onload = () => {
          this.ratio = image.naturalWidth / image.naturalHeight;
        };
      };
    } catch (e) {
      console.error(e);
    }

    this.displayCanvas = true;
  }

  public clearImg() {
    this.displayCanvas = false;
    this.boundingBox = undefined;
    this.base64Img = '';
  }

  public onMouseDown(event: any) {
    this.boundingBox = new BoundingBox();

    const offset = event.target.getBoundingClientRect();

    this.boundingBox.left = event.pageX - offset.left;
    this.boundingBox.top = event.pageY - offset.top;

    this.isMouseDown = true;
  }

  public onMouseMove(event: any) {
    if (!this.isMouseDown) return;

    const offset = event.target.getBoundingClientRect();

    const finX = event.pageX;
    const finY = event.pageY;
    this.boundingBox!.width = finX - this.boundingBox!.left - offset.left;
    this.boundingBox!.height = finY - this.boundingBox!.top - offset.top;
  }

  public onMouseUp(event: MouseEvent) {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;

    if (this.boundingBox!.width > this.shadowImg.nativeElement.width)
      this.boundingBox!.width = this.shadowImg.nativeElement.width;
    if (this.boundingBox!.height > this.shadowImg.nativeElement.height)
      this.boundingBox!.height = this.shadowImg.nativeElement.height;
    this.setBoundingBoxCode();
  }

  private setBoundingBoxCode() {
    this.codeComponent.nativeElement.textContent = JSON.stringify(
      this.boundingBox!.getPercentages(
        this.shadowImg.nativeElement.width,
        this.shadowImg.nativeElement.height
      ),
      null,
      '  '
    );
  }

  public copyText() {
    this.copyFn(
      JSON.stringify(
        this.boundingBox!.getPercentages(
          this.shadowImg.nativeElement.width,
          this.shadowImg.nativeElement.height
        ),
        null,
        '  '
      )
    );
  }

  private async copyFn(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.isCopySuccess = true;
    await delay(1200);
    this.isCopySuccess = false;
  }
}

export class BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;

  constructor() {
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
  }

  public getPercentages(width: number, height: number) {
    return {
      top: this.top / height,
      left: this.left / width,
      width: this.width / width,
      height: this.height / height,
    };
  }
}
