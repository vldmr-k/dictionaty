<?php

namespace app\models\base;

use Yii;

/**
 * This is the model class for table "word".
 *
 * @property integer $word_id
 * @property string $value
 * @property integer $language_id
 */
class Word extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'word';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['value', 'language_id'], 'required'],
            [['language_id'], 'integer'],
            [['value'], 'string', 'max' => 255],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'word_id' => 'Word ID',
            'value' => 'Value',
            'language_id' => 'Language ID',
        ];
    }
}
