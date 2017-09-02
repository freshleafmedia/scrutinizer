<?php namespace App;

class AppController
{

    public function __construct($app)
    {
        $this->app = $app;
    }

    public function index()
    {
        return $this->app['twig']->render('index.twig');
    }
}