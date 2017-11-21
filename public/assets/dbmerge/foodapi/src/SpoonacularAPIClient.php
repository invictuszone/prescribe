<?php
/*
 * SpoonacularAPILib
 *
 * This file was automatically generated by APIMATIC v2.0 ( https://apimatic.io ).
 */

namespace SpoonacularAPILib;

use SpoonacularAPILib\Controllers;

/**
 * SpoonacularAPILib client class
 */
class SpoonacularAPIClient
{
    /**
     * Constructor with authentication and configuration parameters
     */
    public function __construct($xMashapeKey = NULL)
    {
        Configuration::$xMashapeKey = $xMashapeKey ? $xMashapeKey : Configuration::$xMashapeKey;
    }
 
    /**
     * Singleton access to API controller
     * @return Controllers\APIController The *Singleton* instance
     */
    public function getClient()
    {
        return Controllers\APIController::getInstance();
    }
}