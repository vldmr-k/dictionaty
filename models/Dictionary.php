<?php

namespace app\models;

use app\models\Word;

class Dictionary extends \app\models\base\Dictionary {

    public function isCorrect(Word $sourceWord, Word $targetWord) {
        return (bool)self::find()->where(['source_word_id' => $sourceWord->word_id, 'target_word_id' => $targetWord->word_id])->count();
    }

}