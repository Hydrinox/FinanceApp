import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const transitionAnimation = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate(300, style({ opacity: 0 }))
    ])
]);