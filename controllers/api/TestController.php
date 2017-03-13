<?php

namespace app\controllers\api;

use app\components\ApiController;
use app\models\Word;
use app\traits\PrivateApiController;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

class TestController extends ApiController
{
    use PrivateApiController;

    public $modelClass = 'app\models\Word';

    public function actionNextWord($sessionId) {
        $this->checkAccess($sessionId);

        $session = $this->authUser->activeSession;

        //find unusable word
        $word = Word::find()->notUsable($session)->one();
        $variants = $word->getVariants();

        return [
            'word' => $word,
            'variants' => $variants,
            'counter' => [
                'all_word_cnt' => $session->word_cnt,
                'passed_word_cnt' => $session->passed_word_cnt
            ]
        ];
    }


    public function checkAccess($sessionId) {
        $activeSession = $this->authUser->activeSession;

        if(is_null($activeSession) || $activeSession->session_id != $sessionId) {
            throw new ForbiddenHttpException("Unauthorized access");
        }

    }

}
