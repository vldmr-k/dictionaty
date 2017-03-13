<?php

namespace app\controllers\api;

use app\components\ApiController;

use app\models\Session;
use app\traits\PrivateApiController;
use yii\data\ActiveDataProvider;
use yii\web\ForbiddenHttpException;

class SessionController extends ApiController
{
    use PrivateApiController;

    public $modelClass = 'app\models\Session';

    public function checkAccess($action, $model = null) {
        $userId = \Yii::$app->request->getBodyParam('user_id');

        if($userId !== \Yii::$app->user->getId()) {
            throw new ForbiddenHttpException("Unauthorized access");
        }

    }

}
