import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService, AnswerService, AlertService } from "../_services/index";
import { TestCase, Word, Counter } from "../_models/index";
import { Answer } from "../_models/answer";

@Component({
    selector: 'app-test',
    template: `
        <div class="row test-header">
            <div class="col-lg-9">
                <h2 class="title"><span class="text-muted">Cлово</span> {{word?.value}}
                <span *ngIf="selected"><span class="text-muted">ваш выбор</span> {{selected.value}}</span>
                </h2>
            </div>
            <div class="col-lg-3 text-right counter">
                <small class="text-muted">
                    Пройдено {{counter?.passed_word_cnt}} из {{counter?.all_word_cnt}}
                </small>
            </div>
        </div>
        <div class="test-variant-list row">
            <variant-item *ngFor="let word of variants"
                [word]="word"
                (onSelectVariant)="onSelectVariant($event)"
                ([selected])="selected">    
            </variant-item>
        </div>
        <div class="test-control row text-center">
            <button class="btn btn-lg btn-success" (click)="addAnswer()" [class.disabled]="selected == null">Отправить</button>
        </div>
    `,
    styleUrls: ['./test.component.css'],
    providers: [ TestService, AnswerService, AlertService ]
})

export class TestComponent implements OnInit {

    private sub: any;
    private sessionId: number;

    word: Word;
    variants: Array<Word>;
    counter: Counter;

    selected: Word = null;

    onSelectVariant(word: Word) {
        this.selected = word;
    }

    constructor(private testService: TestService, private answerService: AnswerService, private activatedRoute: ActivatedRoute, private router : Router, private alertService: AlertService) { }

    ngOnInit() {
        console.log('TestComponent init!');

        this.nextWord()
    }

    addAnswer():void {

        this.alertService.success("Перевод указан не верно!");


        /*
        this.answerService.addAnswer(this.sessionId, this.word, this.selected)
            .then((res: Answer) => {
                if(res.result == false) {
                    this.alertService.error("Перевод указан не верно!", true);
                } else {
                    this.nextWord();
                }
            })
            */
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    nextWord(): void {
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.sessionId = params['sessionId'];
            this.testService.getFreeWord(this.sessionId)
                .then((res: TestCase) => {
                    this.word = res.word;
                    this.variants = res.variants;
                    this.counter = res.counter;
                })
        })
    }

}
