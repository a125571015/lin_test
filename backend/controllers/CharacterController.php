<?php

namespace backend\controllers;

use Yii;
use yeesoft\controllers\admin\BaseController;

/**
 * CharacterController implements the CRUD actions for common\models\Character model.
 */
class CharacterController extends BaseController 
{
    public $modelClass       = 'common\models\Character';
    public $modelSearchClass = 'common\models\CharacterSearch';

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