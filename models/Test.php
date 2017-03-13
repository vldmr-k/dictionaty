<?php

namespace app\models;

use yii\base\Model;

class Test extends Model {


    public function getVariants() {

        $translate = $this->translate;
        $variants = self::find()->exceptWord($this->translate)->exceptLanguage($this->language)->limit(3)->all();

        $variants[] = $translate;

        //make translate of word position random
        shuffle($variants);

        return $variants;
    }
}