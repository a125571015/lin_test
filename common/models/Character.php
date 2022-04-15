<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "character".
 *
 * @property int $id 角色id
 * @property string $name 中文名稱
 * @property string $japan_name 日文名稱
 * @property string $other_name 別名
 * @property string $ablility 能力值
 * @property int $rank 角色等級
 * @property string $target_game 目標賽事
 * @property string $info 生平介紹
 * @property string $house_img 馬娘照片
 * @property int $unique_skill 固有技能
 * @property int $common_skill_1 技能1
 * @property int $common_skill_2 技能2
 * @property int $common_skill_3 技能3
 * @property int $common_skill_4 技能4
 */
class Character extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'character';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ablility', 'target_game', 'info'], 'string'],
            [['rank', 'unique_skill', 'common_skill_1', 'common_skill_2', 'common_skill_3', 'common_skill_4'], 'integer'],
            [['name', 'japan_name', 'other_name', 'house_img'], 'string', 'max' => 255],
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
            'japan_name' => 'Japan Name',
            'other_name' => 'Other Name',
            'ablility' => 'Ablility',
            'rank' => 'Rank',
            'target_game' => 'Target Game',
            'info' => 'Info',
            'house_img' => 'House Img',
            'unique_skill' => 'Unique Skill',
            'common_skill_1' => 'Common Skill 1',
            'common_skill_2' => 'Common Skill 2',
            'common_skill_3' => 'Common Skill 3',
            'common_skill_4' => 'Common Skill 4',
        ];
    }
}
