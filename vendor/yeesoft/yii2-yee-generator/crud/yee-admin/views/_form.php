<?php

use yii\helpers\Inflector;
use yii\helpers\StringHelper;

/* @var $this yii\web\View */
/* @var $generator yii\gii\generators\crud\Generator */

/* @var $model \yeesoft\db\ActiveRecord */
$model = new $generator->modelClass();
$safeAttributes = $model->safeAttributes();
if (empty($safeAttributes)) {
    $safeAttributes = $model->attributes();
}

echo "<?php\n";
?>

use yeesoft\widgets\ActiveForm;
use <?= $generator->modelClass ?>;
use yeesoft\helpers\Html;

/* @var $this yii\web\View */
/* @var $model <?= ltrim($generator->modelClass, '\\') ?> */
/* @var $form yeesoft\widgets\ActiveForm */
?>

<div class="<?= Inflector::camel2id(StringHelper::basename($generator->modelClass)) ?>-form">

    <?= "<?php \n" ?>
    $form = ActiveForm::begin([
            'id' => '<?= Inflector::camel2id(StringHelper::basename($generator->modelClass)) ?>-form',
            'validateOnBlur' => false,
        ])
    ?>

    <div class="row">
        <div class="col-md-9">

            <div class="panel panel-default">
                <div class="panel-body">
                    <?php foreach ($generator->getColumnNames() as $attribute) {
                        if (in_array($attribute, $safeAttributes)) {
                            echo "\n                    <?= " . $generator->generateActiveField($attribute) . " ?>\n";
                        }
                    } ?>

                </div>

            </div>
        </div>

        <div class="col-md-3">

            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="record-info">
                        <div class="form-group clearfix">
                            <label class="control-label" style="float: left; padding-right: 5px;"><?= "<?= " ?> $model->attributeLabels()['id'] ?>: </label>
                            <span><?= "<?= " ?> $model->id ?></span>
                        </div>

                        <div class="form-group">
                            <?= "<?php " ?> if ($model->isNewRecord): ?>
                                <?= "<?= " ?>Html::submitButton(Yii::t('yee', 'Create'), ['class' => 'btn btn-primary']) ?>
                                <?= "<?= " ?>Html::a(Yii::t('yee', 'Cancel'), ['/<?= Inflector::camel2id(StringHelper::basename($generator->modelClass)) ?>/default/index'], ['class' => 'btn btn-default']) ?>
                            <?= "<?php " ?> else: ?>
                                <?= "<?= " ?>Html::submitButton(Yii::t('yee', 'Save'), ['class' => 'btn btn-primary']) ?>
                                <?= "<?= " ?>Html::a(Yii::t('yee', 'Delete'),
                                    ['/<?= Inflector::camel2id(StringHelper::basename($generator->modelClass)) ?>/default/delete', 'id' => $model->id], [
                                    'class' => 'btn btn-default',
                                    'data' => [
                                        'confirm' => Yii::t('yii', 'Are you sure you want to delete this item?'),
                                        'method' => 'post',
                                    ],
                                ]) ?>
                            <?= "<?php " ?>endif; ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <?= "<?php " ?> ActiveForm::end(); ?>

</div>
