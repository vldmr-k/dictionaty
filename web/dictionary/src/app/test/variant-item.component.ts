import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  Word } from "../_models/index";

@Component({
    selector: 'variant-item',
    template: `
        <div (click)="selectVariant(word)" class="b-variant-item bg-info">
            {{word.value}}
        </div>
    `,
    styleUrls: ['./variant.component.css']
})

export class VariantItemComponent {

    @Input() word: Word;

    @Output() onSelectVariant = new EventEmitter<Word>();

    
    selectVariant(word: Word) {
        this.onSelectVariant.emit(word);
    }


}
