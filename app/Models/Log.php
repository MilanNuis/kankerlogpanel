<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Log extends Model
{
    use HasFactory;

    protected $fillable = [
        'action',
        'player_identifier',
        'role',
        'severity',
        'message',
        'data',
    ];

    protected $casts = [
        'data' => 'json',
    ];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'log_role');
    }
}
