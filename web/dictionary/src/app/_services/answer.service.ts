import { Injectable }       from '@angular/core';
import { Response }   from '@angular/http';
import { Answer, Word } from '../_models/index';

import 'rxjs/add/operator/toPromise';
import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AnswerService {

    private apiUrl = baseApiUrl + '/api/answer';

    constructor (private http: HttpService, private authService: AuthService) {}

    addAnswer(sessionId:number, sourceWord: Word, selectableWord: Word): Promise<Answer> {
        
        return this.http.post(this.apiUrl,
            {
                    user_id: this.authService.getUser().user_id,
                    session_id: sessionId,
                    source_word_id: sourceWord.word_id,
                    selected_word_id: selectableWord.word_id
            }).toPromise()
            .then((res: any) => {
                return res.json() as Answer;
            })
    }

}