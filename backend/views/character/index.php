<?php

use yii\helpers\Url;
use yii\widgets\Pjax;
use yeesoft\grid\GridView;
use yeesoft\grid\GridQuickLinks;
use common\models\Character;
use yeesoft\helpers\Html;
use yeesoft\grid\GridPageSize;
use yii\web\View;

/* @var $this yii\web\View */
/* @var $searchModel common\models\CharacterSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Characters';
$this->params['breadcrumbs'][] = $this->title;
?>






<div class="character-index" style="margin: 1% 0% 0% 1%;">




    <div class="card">
        <div class="card-body">

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Library</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Data</li>
                </ol>
            </nav>

            <div class="row">
                <div class="col-sm-12">
                    <h3 class="lte-hide-title page-title">角色列表</h3>
                </div>
            </div>


        </div>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>



    <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

    <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
        <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div class="toast-header">
                <img src="..." class="rounded mr-2" alt="...">
                <strong class="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="toast-body">
                已成功更新.
            </div>
        </div>
    </div>






    <!-- 測試-->


</div>





<?php

$js= <<<JS
 

 
 
JS;

$this->registerJS($js, View::POS_READY);



?>
