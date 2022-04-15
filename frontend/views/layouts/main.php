<?php
/* @var $this \yii\web\View */
/* @var $content string */

use common\widgets\Alert;
use frontend\assets\AppAsset;
use frontend\assets\ThemeAsset;
use yeesoft\models\Menu;
use yeesoft\widgets\LanguageSelector;
use yeesoft\widgets\Nav as Navigation;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use yeesoft\comment\widgets\RecentComments;


Yii::$app->assetManager->forceCopy = true;
AppAsset::register($this);
ThemeAsset::register($this);
$ver          = Yii::$app->params['ver'];

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- test favicon-->
    <link rel="shortcut icon" href="<?= Yii::$app->homeUrl ?>admin/favicon.ico?v=<?= $ver ?>">

    <!-- App css -->
    <link href="<?= Yii::$app->homeUrl ?>./material/css/bootstrap.min.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= Yii::$app->homeUrl ?>./material/css/icons.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>
    <link href="<?= Yii::$app->homeUrl ?>./material/css/style.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>

    <!--font awesome6  css-->
    <link href="<?= Yii::$app->homeUrl ?>./material/plugins/fontawesome/css/all.css?v=<?= $ver ?>" rel="stylesheet" type="text/css"/>






    <?= Html::csrfMetaTags() ?>
    <?= $this->renderMetaTags() ?>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>


<div >



<!--    navbar 前台開始-->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">賽馬娘玩家攻略網</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/site/index">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">

                    <a class="nav-link" href="#">角色</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">賽程</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">支援卡</a>
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
                    <a class="nav-link disabled" href="/auth/default/login" tabindex="-1" aria-disabled="true">登入</a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
    </nav>
    <!--    navbar 前台結束-->

</div>



<!-- view 內容開始-->
<?php echo $content ?>
<!-- view 內容結束-->



<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; <?= Html::encode(Yii::$app->settings->get('general.title', 'Yee Site', Yii::$app->language)) ?> <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?>, <?= yeesoft\Yee::powered() ?></p>
    </div>
</footer>

<!-- jQuery  -->
<script src="<?= Yii::$app->homeUrl ?>./material/js/jquery.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>./material/js/popper.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>./material/js/bootstrap.min.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>./material/js/modernizr.min.js?v=<?= $ver ?>"></script>

<script src="<?= Yii::$app->homeUrl ?>./material/js/jquery.slimscroll.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>./material/js/jquery.nicescroll.js?v=<?= $ver ?>"></script>
<script src="<?= Yii::$app->homeUrl ?>./material/js/jquery.scrollTo.min.js?v=<?= $ver ?>"></script>

<!--font awesome6  jquery-->
<script defer src="<?= Yii::$app->homeUrl ?>./material/plugins/fontawesome/js/all.js?v=<?= $ver ?>"></script>





<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>



