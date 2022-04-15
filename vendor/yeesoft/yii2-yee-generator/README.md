# yii2-yee-generator

## Gii CRUD generator for Yee CMS

This generator generates Yee styled controller and views that implement CRUD (Create, Read, Update, Delete) operations for the specified data model.

Installation
------------

Either run

```
composer require --prefer-dist yeesoft/yii2-yee-generator "~0.1.0"
```

or add

```
"yeesoft/yii2-yee-generator": "~0.1.0"
```

to the require section of your `composer.json` file.

Configuration
------
- In your common config file

```php
'modules' => [
    'gii' => [
        'class' => 'yii\gii\Module',
        'allowedIPs' => ['*'],
        'generators' => [
            'yee-crud' => [
                'class' => 'yeesoft\generator\crud\Generator',
                'templates' => [
                    'default' => '@vendor/yeesoft/yii2-yee-generator/crud/yee-admin',
                ]
            ],
        ],
    ],
],
```
