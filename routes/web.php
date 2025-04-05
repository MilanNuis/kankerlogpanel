<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::location((route('dashboard')));
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/logs', [LogController::class, 'index'])->name('logs.index');

Route::middleware('auth')->group(function () {
    Route::controller(AdminController::class)->prefix('admin')->name('admin')->group(function () {
        Route::get('/users', 'index')->name('.users.index');
        Route::post('/users', 'store')->name('.users.store');
        Route::post('/users/{user}', 'destroy')->name('.users.destroy');
        Route::put('/users/{user}', 'update')->name('.users.update');

        Route::get('/roles', 'rolesIndex')->name('.roles.index');
        Route::post('/roles', 'rolesStore')->name('.roles.store');
        Route::put('/roles/{role}', 'rolesUpdate')->name('.roles.update');
        Route::post('/roles/{role}/destroy', 'rolesDestroy')->name('.roles.destroy');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
