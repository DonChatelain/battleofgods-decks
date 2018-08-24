import { Directive, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';
import { DomController } from 'ionic-angular';
 
@Directive({
  selector: '[slidable-card]'
})
export class AbsoluteDrag {
  @Output() onExit: EventEmitter<any> = new EventEmitter();

  isDragging: boolean = false;
  threshold: number = 120;
 
    constructor(
      public element: ElementRef,
      public renderer: Renderer,
      public domCtrl: DomController
    ) {
      
    }
 /**
  * Needs major refactor!
  */
    ngAfterViewInit() {
        const direction = window['Hammer'].DIRECTION_HORIZONTAL;

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction, threshold: 0, pointers: 0 });

        this.style('transition', 'min-height 200ms ease, opacity 200ms ease, margin 200ms ease, transform 200ms ease');

        hammer.on('press', (ev) => {
          this.isDragging = true;
          this.style('transform', 'scale(1.1)')
        })

        hammer.on('pressup', (ev) => {
          this.isDragging = false;
          this.style('transform', 'scale(1)')
        })
 
        hammer.on('panmove', (ev) => {
          ev.preventDefault(); // prevent page scrolling where we can
          this.handlePan(ev);
        });
        hammer.on('panend', (ev) => {
          this.handlePanEnd(ev);
        });
    }

    handlePan(ev){
      if (!this.isDragging || ev.deltaX < 0) return; // no swipe left

      const change = ev.deltaX;
      this.domCtrl.write(() => {
          this.style('transform', 'scale(1.1)')
          this.style('left', `${change}px`)
      });
      if (change > this.threshold) {
        this.domCtrl.write(() => {
          this.style('opacity', `${0.6 - 0.005 * (change - this.threshold)}`);
        });
      } else {
        this.domCtrl.write(() => {
          this.style('opacity', `${ 1 }`);
        });
      }
    }

    handlePanEnd(ev) {
      if (!this.isDragging) return;
      this.isDragging = false;

      if (ev.deltaX < this.threshold) {

        let start = null;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          this.domCtrl.write(() => {
            this.style('transform', 'scale(1)');
            this.style('left', `${ Math.max(ev.deltaX - progress, 0) }px`)
          });
          if (progress < 150) {
            window.requestAnimationFrame(step);
          }
        }
        window.requestAnimationFrame(step);
      }
      else {
        let start = null;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          var progress = timestamp - start;
          this.domCtrl.write(() => {
            this.style('transform', 'scale(1.1');
            this.style('left', `${ ev.deltaX + Math.min(progress, 200) }px`)
          });
          if (progress < 400) {
            window.requestAnimationFrame(step);
            if (progress > 200) {
              this.domCtrl.write(() => {
                this.style('min-height', '0');
                this.style('height', '0px');
                this.style('margin', '0');
              });
            }
          } else {
            this.onExit.emit();
          }
        }
        window.requestAnimationFrame(step);
      }
    }

    style(key: string, value: string) {
      this.renderer.setElementStyle(this.element.nativeElement, key, value);
    }
}