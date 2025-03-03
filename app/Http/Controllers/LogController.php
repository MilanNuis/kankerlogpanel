<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index(Request $request)
    {
        if($request->has('search') && $request->input('search') !== '') {
            return Inertia::render('Logs/Index', [
                'Logs' => Log::where('message', 'like', '%' . $request->input('search') . '%')
                    ->orderBy('created_at', 'desc')
                    ->get()
            ]);
        }

        return Inertia::render('Logs/Index', [
            'Logs' => Log::orderBy('created_at', 'desc')->get()
        ]);
    }
}
