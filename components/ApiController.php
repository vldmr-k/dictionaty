<?php

namespace app\components;

use app\models\User;
use yii\rest\ActiveController;

class ApiController extends ActiveController {

    /**
     * @var User
     */
    protected $authUser;


    public function beforeAction($action)
    {
        $parent = parent::beforeAction($action);

        $this->authUser = \Yii::$app->user->getIdentity();


        return $parent;
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className()
        ];
        return $behaviors;
    }
}