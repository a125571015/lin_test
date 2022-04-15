<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "skill_kind".
 *
 * @property int $id 技能總類編號
 * @property string $name 技能總類名稱
 * @property string $img 技能總類圖片
 * @property int $status 顯示/不顯示
 */
class SkillKind extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'skill_kind';
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
