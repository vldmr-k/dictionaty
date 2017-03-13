<?php

namespace app\models\query;

use app\models\Answer;
use app\models\Session;

class AnswerQuery extends \yii\db\ActiveQuery {

    public function bySession(Session $session) {
        return $this->andWhere(['session_id' => $session->session_id]);
    }

}