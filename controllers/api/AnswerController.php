<?php

namespace app\controllers\api;

use app\components\ApiController;

use app\models\Answer;
use app\models\Session;
use app\traits\PrivateApiController;
use yii\data\ActiveDataProvider;
use yii\web\ForbiddenHttpException;

class AnswerController extends ApiController
{
    use PrivateApiController;

    public $modelClass = 'app\models\Answer';

    public $createScenario = Answer::SCENARIO_MAKE_ANSWER;

    public function checkAccess($action, $model = null) {
        

    }

}
