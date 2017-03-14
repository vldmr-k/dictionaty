<?php

namespace app\models;

use app\models\query\WordQuery;
use yii\db\Query;

class Word extends \app\models\base\Word {


    public static function find() {
        return new WordQuery(get_called_class());
    }

    public function getTranslate() {
        return $this->hasOne(self::className(), ['word_id' => 'translate_word_id'])->viaTable('dictionary', ['source_word_id' => 'word_id']);
    }

    public function isTranslateCorrect(Word $word) {
        return $this->translate->word_id == $word->word_id;
    }

    public function getLanguage() {
        return $this->hasOne(Language::className(), ['language_id' => 'language_id']);
    }

    public function getVariants($limit = 4) {

        $limit = $limit <= 1 ? 1 : $limit-1;


        $translate = $this->translate;
        $variants = self::find()
            ->exceptWord($translate)
            ->exceptLanguage($this->language)
            ->limit($limit)->all();

        array_push($variants, $translate);

        shuffle($variants);

        return $variants;
    }
}