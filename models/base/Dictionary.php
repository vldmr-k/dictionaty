<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "dictionary".
 *
 * @property integer $dictionary_id
 * @property integer $source_word_id
 * @property integer $target_word_id
 */
class Dictionary extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'dictionary';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['source_word_id', 'translate_word_id'], 'required'],
            [['source_word_id', 'translate_word_id'], 'integer'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'dictionary_id' => 'Dictionary ID',
            'source_word_id' => 'Source Word ID',
            'translate_word_id' => 'Source Word ID',
        ];
    }
}
