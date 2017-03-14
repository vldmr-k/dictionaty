<?php

namespace app\models;


use app\models\base\Word;
use yii\base\Exception;

class Session extends \app\models\base\Session {

    public function rules()
    {
        $rules = parent::rules();
        $rules[] = ['user_id', 'exist', 'targetClass' => User::className(), 'targetAttribute' => 'user_id'];
        $rules[] = ['fail_answer_cnt', 'max' => \Yii::$app->param['testCase']['maxFailAnswer']];

        return $rules;
    }

    public function fields() {
        return ['session_id', 'user_id', 'is_complete'];
    }

    public function beforeSave($insert) {

        if($this->isNewRecord) {
            $count = self::find()->where(['user_id' => $this->user_id, 'is_complete' => 0])->count();
            if($count > 0) {
                throw new Exception("Error create new Session, because previous session not complete");
            }

            $this->word_cnt = Word::find()->count();
        }

        if($this->word_cnt == $this->passed_word_cnt) {
            $this->is_complete = 1;
        }

        return parent::beforeSave($insert);
    }

}