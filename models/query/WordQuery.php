<?php

namespace app\models\query;

use app\models\Answer;
use app\models\Language;
use app\models\Session;
use app\models\Word;

class WordQuery extends \yii\db\ActiveQuery {

    public function notUsable(Session $session) {
        $usable = Answer::find()->select('source_word_id')->bySession($session)->asArray()->all();

        return $this;

        $table = Answer::tableName();
        return $this->join('OUTER JOIN', $table, $table.'.source_word_id = '.Word::tableName().'.word_id')->andWhere([$table.'.session_id' => $session->session_id]);
    }

    public function exceptWord(Word $word) {
        return $this->andWhere('word_id != ' . $word->word_id);
    }

    public function exceptLanguage(Language $language) {
        return $this->andWhere('language_id != ' . $language->language_id);
    }

}