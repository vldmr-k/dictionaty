<?php

namespace app\models\query;

use app\models\Answer;
use app\models\Language;
use app\models\Session;
use app\models\Word;

class WordQuery extends \yii\db\ActiveQuery {

    public function notUsable(Session $session) {
        return $this->andWhere('word_id not in (select source_word_id from answer where session_id = :session_id)', [':session_id' => $session->session_id]);
    }

    public function exceptWord(Word $word) {
        return $this->andWhere('word_id != ' . $word->word_id);
    }

    public function exceptLanguage(Language $language) {
        return $this->andWhere('language_id != ' . $language->language_id);
    }

}