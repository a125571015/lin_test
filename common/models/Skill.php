<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "skill".
 *
 * @property int $id 技能編號
 * @property int $category 技能類別
 * @property string $kind 技能種類
 * @property string $name 技能名稱
 * @property string $info 技能效果
 * @property string $japan_info 技能日文效果
 */
class Skill extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'skill';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'category'], 'integer'],
            [['kind'], 'string', 'max' => 4],
            [['name', 'info', 'japan_info'], 'string', 'max' => 255],
            [['id'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'category' => 'Category',
            'kind' => 'Kind',
            'name' => 'Name',
            'info' => 'Info',
            'japan_info' => 'Japan Info',
        ];
    }
}
