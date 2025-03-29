<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $logs = Log::with('roles')
            ->whereIn('role', $user->roles->pluck('name'))
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Logs/Index', [
            'logs' => $logs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string',
            'player_identifier' => 'required|string',
            'role' => 'required|string',
            'severity' => 'required|string',
            'message' => 'required|string',
            'data' => 'required',
        ]);

        if (!$validated) {
            return response()->json(['error' => 'Validation failed'], 422);
        }

        Log::create($validated);

        return response()->json(['message' => 'Log ontvangen'], 200);
    }
}
