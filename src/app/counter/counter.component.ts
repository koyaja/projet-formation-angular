import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <h2>
      Compteur {{nomDuCompteur}}: <i>{{ counter }}</i>
    </h2>
    <button (click)="increment()">click moi</button>
  `,
 styles:`
 button {
            background-color: #4CAF50; /* Green background */
            border: none; /* Remove borders */
            color: white; /* White text */
            padding: 15px 32px; /* Some padding */
            text-align: center; /* Center the text */
            text-decoration: none; /* Remove underline */
            display: inline-block; /* Make the button inline */
            font-size: 16px; /* Increase font size */
            font-family: 'Arial', sans-serif; /* Use a nice font */
            border-radius: 12px; /* Rounded corners */
            transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transition */
            cursor: pointer; /* Pointer cursor on hover */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add a shadow */
        }

        .stylish-button:hover {
            background-color: #45a049; /* Darker green on hover */
            transform: scale(1.05); /* Slightly enlarge the button */
        }

        .stylish-button:active {
            background-color: #3e8e41; /* Even darker green on click */
            transform: scale(0.95); /* Slightly shrink the button */
        }

        .stylish-button:focus {
            outline: none; /* Remove the default focus outline */
            box-shadow: 0 0 0 3px rgba(72, 207, 173, 0.5); /* Custom focus outline */
        }
 `
})
export class CounterComponent {
  @Input()
  counter: number = 0;
  @Input()
  nomDuCompteur ='C 1';

  @Output() 
  getValue = new EventEmitter<number>()

  increment() {
    this.counter = this.counter + 1;
    this.getValue.emit(this.counter)
  }
}
