<?php

namespace app\models;

use app\models\query\AnswerQuery;

class Answer extends \app\models\base\Answer {
    
    public static function find()
    {
        return new AnswerQuery(get_called_class());
    }
}