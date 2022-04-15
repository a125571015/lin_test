<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "skill_category".
 *
 * @property int $id 技能類別編號
 * @property string $name 技能類別名稱
 * @property string $img 技能類別圖片
 * @property int $status 技能類別狀態
 */
class SkillCategory extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'skill_category';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id'], 'required'],
            [['id', 'status'], 'integer'],
            [['name', 'img'], 'string', 'max' => 255],
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
            'name' => 'Name',
            'img' => 'Img',
            'status' => 'Status',
        ];
    }
}
