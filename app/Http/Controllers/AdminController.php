<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        $roles = Role::all();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'is_admin' => 'boolean',
            'roles' => 'array'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_admin' => $request->is_admin,
        ]);

        $user->roles()->sync($request->roles);

        return Inertia::location(route('admin.users.index'));
    }

    public function destroy(User $user)
    {
        $user->roles()->detach();
        $user->delete();

        return Inertia::location(route('admin.users.index'));
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'is_admin' => 'boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'is_admin' => $validated['is_admin'],
        ]);

        $user->roles()->sync($validated['roles']);

        return back()->with('success', 'User updated successfully.');
    }

    public function rolesIndex()
    {
        $roles = Role::all();
        return Inertia::render('Admin/Roles', [
            'roles' => $roles
        ]);
    }

    public function rolesStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        Role::create([
            'name' => $request->name,
        ]);

        return Inertia::location(route('admin.roles.index'));
    }

    public function rolesUpdate(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
        ]);

        $role->update([
            'name' => $request->name,
        ]);

        return Inertia::location(route('admin.roles.index'));
    }

    public function rolesDestroy(Role $role)
    {
        $role->delete();

        return Inertia::location(route('admin.roles.index'));
    }
}
