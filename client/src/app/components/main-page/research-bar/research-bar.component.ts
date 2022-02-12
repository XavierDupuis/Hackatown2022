import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-research-bar',
    templateUrl: './research-bar.component.html',
    styleUrls: ['./research-bar.component.scss'],
})
export class ResearchBarComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    options: string[] = ['a', 'b', 'c'];

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.options.push(value);
        }

        // Clear the input value
        event.chipInput?.clear();
    }

    remove(option: string): void {
        const index = this.options.indexOf(option);

        if (index >= 0) {
            this.options.splice(index, 1);
        }
    }
}
