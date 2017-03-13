<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use app\models\Dictionary;
use app\models\Language;
use app\models\Word;
use Yii;
use yii\base\Exception;
use yii\console\Controller;
use yii\helpers\ArrayHelper;

/**
 * This command echoes the first argument that you have entered.
 *
 * This command is provided as an example for you to learn how to create console commands.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class GenerateController extends Controller
{

    const RUS_LANG_ID = 1;
    const ENG_LANG_ID = 2;
   
    public $languages = [
        self::RUS_LANG_ID => 'Русский',
        self::ENG_LANG_ID => 'English'
    ];
    
    public function actionLang() {
        foreach ($this->languages as $languageId => $value) {
            $lang = new Language();
            $lang->language_id = $languageId;
            $lang->value = $value;
            if($lang->validate() && $lang->save()) {
                echo sprintf("Language %s created!", $value) . PHP_EOL;
            } else {
                echo implode(PHP_EOL, $lang->getErrors()) . PHP_EOL;
            }
        }
    }
    
    public function actionDict()
    {
        $dictPath = \Yii::getAlias('@app').'/data/dictionary.json';

        if(!file_exists($dictPath)) {
            throw new Exception("File ". $dictPath. " not exist!");
        }

        $data = file_get_contents($dictPath);
        $dictionary = json_decode($data, true);

        $transaction = Yii::$app->db->beginTransaction();

        foreach ($dictionary as $engWord => $rusWord) {
            $sourceWord = new Word();
            $sourceWord->value = $engWord;
            $sourceWord->language_id = self::ENG_LANG_ID;

            $targetWord = new Word();
            $targetWord->value = $rusWord;
            $targetWord->language_id = self::RUS_LANG_ID;

            if(!$sourceWord->save() || !$targetWord->save()) {
                $transaction->rollBack();

                $errors = ArrayHelper::merge($sourceWord->getErrors(), $targetWord->getErrors());
                $message = "Word didn't created:" . PHP_EOL;
                $message .= print_r($errors, 1);
                throw new Exception($message);
            }

            $dict = new Dictionary();
            $dict->source_word_id = $sourceWord->word_id;
            $dict->translate_word_id = $targetWord->word_id;

            $dictReverse = new Dictionary();
            $dictReverse->source_word_id = $targetWord->word_id;
            $dictReverse->translate_word_id = $sourceWord->word_id;


            if(!($dict->save() && $dictReverse->save())) {
                $transaction->rollBack();
                $message = "Dictionary didn't created:" . PHP_EOL;
                $message .= print_r($dict->getErrors(), 1);
                throw new Exception($message);
            }
        }

        $transaction->commit();

    }
}
