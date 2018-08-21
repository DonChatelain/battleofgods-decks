import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
 
@Directive({
  selector: '[absolute-drag]'
})
export class AbsoluteDrag {
 
    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;
    @Input('pan-type') panType: string; 
    lowerThreshold: number;
    upperThreshold: number;
 
    constructor(
      public element: ElementRef,
      public renderer: Renderer,
      public domCtrl: DomController
    ) {
 
    }
 
    ngAfterViewInit() {

        // this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        // this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + '%'); // % 
        // this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        const direction = this.panType === 'vertical' ? window['Hammer'].DIRECTION_VERTICAL : window['Hammer'].DIRECTION_HORIZONTAL;
        this.lowerThreshold = this.panType === 'vertical' ? 44 : 0;
        this.upperThreshold = this.panType === 'vertical' ? 120 : 300;

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction });
 
        hammer.on('panmove', (ev) => {
          this.handlePan(ev);
        });
        hammer.on('panend', (ev) => {
          console.log('off pan')
          this.resetDraggable(ev);
        });
    }

    resetDraggable(ev) {
      this.renderer.setElementStyle(this.element.nativeElement, 'left', 50 + '%'); // % 
      this.renderer.setElementStyle(this.element.nativeElement, 'top', 55 + 'px');
    }
 
    handlePan(ev){
        const topThreshold = 44;
        const bottomThreshold = 120;
        // let newLeft = ev.center.x;
        let newTop = ev.center.y - 20;

 
        this.domCtrl.write(() => {
            // this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
            if (newTop > topThreshold && newTop < bottomThreshold) {
              this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
            }
            else if (newTop > bottomThreshold) {
              console.log('draw card')
            }
        });
 
    }
 
}