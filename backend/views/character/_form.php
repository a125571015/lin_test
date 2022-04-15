<?php

use yeesoft\widgets\ActiveForm;
use common\models\Character;
use yeesoft\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Character */
/* @var $form yeesoft\widgets\ActiveForm */
?>

<div class="character-form">



    <div class="container">
        <div class="row">
            <div class="col-sm-2">
                <label>中文名稱:</label>
            </div>
            <div class="col-sm-4">
                <input id="name" type="text">
            </div>
        </div>

        <div class="row">
            <div class="col-sm-2">
                <label>日文名稱:</label>
            </div>
            <div class="col-sm-4">
                <input id="japan_name" type="text">
            </div>
        </div>

        <div class="row">
            <div class="col-sm-2">
                <label>別名:</label>
            </div>
            <div class="col-sm-4">
                <input id="other_name" type="text">
            </div>
        </div>


        <canvas id="canvas" width="150" height="150"></canvas>
    </div>


</div>

<script type="application/javascript">
    function draw() {
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect (0,0, 55, 50);

            ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillRect (30, 30, 55, 50);
        }
    }
    draw();
</script>