import {
  trigger,
  transition,
  query,
  style,
  group,
  animate,
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition(':increment', slideTo('bottom')),
  transition(':decrement', slideTo('top')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          [direction]: 0,
          left: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(
      ' :leave',
      [
        style({
          'z-index': 100,
        }),
      ],
      optional
    ),
    // query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [
          animate(
            '400ms cubic-bezier(0.77, -0.05, 0.34, 1)',
            style({ [direction]: '100%' })
          ),
        ],
        optional
      ),
      //   query(':enter', [animate('600ms ease', style({ [direction]: '0%' }))]),
    ]),
  ];
}
