<?php

use App\Http\Controllers\LogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/createLog', [LogController::class, 'store']);
