<?php

use backend\assets\AppAsset;
use yeesoft\assets\MetisMenuAsset;
use yeesoft\assets\YeeAsset;
use yeesoft\models\Menu;
use yeesoft\widgets\LanguageSelector;
use yeesoft\widgets\Nav;
use yii\bootstrap\NavBar;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;

/* @var $this \yii\web\View */
/* @var $content string */


$ver          = Yii::$app->params['ver'];


AppAsset::register($this);
$assetBundle = YeeAsset::register($this);
MetisMenuAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- test favicon-->
    <link rel="shortcut icon" href="<?= Yii::$app->homeUrl ?>/favicon.ico?v=<?= $ver ?>">

    <!-- App css -->
    <link href="<?= Yii::$app->homeUrl ?>/material/css/bootstrap.min.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= Yii::$app->homeUrl ?>/material/css/icons.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= Yii::$app->homeUrl ?>/material/css/style.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>

    <!--font awesome6  css-->
    <link href="<?= Yii::$app->homeUrl ?>/material/plugins/fontawesome/css/fontawesome.min.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= Yii::$app->homeUrl ?>/material/plugins/fontawesome/css/all.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>


    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>
<div class="wrap">

    <!--後台navbar 開始-->
    <nav class="navbar navbar-expand-lg navbar-light " style="background-color: #b6d2ea;">
            <a class="navbar-brand" href="#">賽馬娘後台</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/admin">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/character/index">角色</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">賽程</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-regular fa-tree-city"></i>支援卡</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/admin/skill/index"><i class="fa-solid fa-rss"></i></i>技能</a>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="dropdown-item" href="<?= Yii::$app->urlManager->hostInfo ?>/auth/logout" data-method="post"><i class="dripicons-exit text-muted"></i> 登出</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    <!--後台navbar 結束-->






    <!-- 後台主頁 開始 -->
    <?php echo $content ?>
    <!-- 後台主頁 結束 -->


</div>


<!-- jQuery  -->
<script src="<?= Yii::$app->homeUrl ?>/material/js/jquery.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/js/popper.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/js/bootstrap.min.js?v=<?= $ver ?>"></script>


<script src="<?= Yii::$app->homeUrl ?>/material/js/jquery.slimscroll.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/js/jquery.nicescroll.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/js/jquery.scrollTo.min.js?v=<?= $ver ?>"></script>

<!--font awesome6  jquery-->
<script defer src="<?= Yii::$app->homeUrl ?>/material/plugins/fontawesome/js/all.js?v=<?= $ver ?>"></script>

<!--Morris Chart-->
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/morris/morris.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/raphael/raphael-min.js?v=<?= $ver ?>"></script>

<!-- Jquery-Ui -->
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/jquery-ui/jquery-ui.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/moment/moment.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/fullcalendar/js/fullcalendar.min.js?v=<?= $ver ?>"></script>

<!-- Sweet-Alert  -->
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/sweet-alert2/sweetalert2.min.js?v=<?= $ver ?>"></script>

<!-- Required datatable js -->
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/datatables/jquery.dataTables.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>/material/plugins/datatables/dataTables.bootstrap4.min.js?v=<?= $ver ?>"></script>
<script type="text/javascript" src="<?= Yii::$app->homeUrl ?>/material/plugins/datatables/dataTables.checkboxes.min.js?v=<?= $ver ?>"></script>


<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
