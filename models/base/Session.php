<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "session".
 *
 * @property integer $session_id
 * @property integer $user_id
 * @property integer $word_cnt
 * @property integer $passed_word_cnt
 * @property integer $fail_answer_cnt
 * @property integer $is_complete
 *
 * @property Answer[] $answers
 */
class Session extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'session';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id'], 'required'],
            [['user_id', 'word_cnt', 'passed_word_cnt', 'fail_answer_cnt', 'is_complete'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'session_id' => 'Session ID',
            'user_id' => 'User ID',
            'word_cnt' => 'Word Cnt',
            'passed_word_cnt' => 'Passed Word Cnt',
            'fail_answer_cnt' => 'Fail Answer Cnt',
            'is_complete' => 'Is Complete',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAnswers()
    {
        return $this->hasMany(Answer::className(), ['session_id' => 'session_id']);
    }
}
