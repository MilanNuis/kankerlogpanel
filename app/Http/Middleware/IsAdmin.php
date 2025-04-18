<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user() && !Auth::user()->is_admin) {
            return Inertia::render('Errors/NoAcces', [
                'message' => 'You do not have permission to access this page.',
            ])->toResponse($request)->setStatusCode(403);
        }

        return $next($request);
    }
}
