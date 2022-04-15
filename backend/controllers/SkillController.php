<?php

namespace backend\controllers;

use Yii;
use yeesoft\controllers\admin\BaseController;

/**
 * SkillController implements the CRUD actions for common\models\Skill model.
 */
class SkillController extends BaseController 
{
    public $modelClass       = 'common\models\Skill';
    public $modelSearchClass = 'common\models\SkillSearch';

    protected function getRedirectPage($action, $model = null)
    {
        switch ($action) {
            case 'update':
                return ['update', 'id' => $model->id];
                break;
            case 'create':
                return ['update', 'id' => $model->id];
                break;
            default:
                return parent::getRedirectPage($action, $model);
        }
    }
}