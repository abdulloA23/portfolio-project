<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\Employer\EditEmployerRequest;
use App\Http\Requests\Settings\Employer\PatchEmployerRequest;
use App\Models\Employer\Employer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use function Termwind\render;

class EmployerController extends Controller
{
    public function edit(EditEmployerRequest $request):Response
    {
        $validated = $request->validated();

        $employer = auth()->user()->employer;

        return Inertia::render('settings/employer/edit',['employer'=>$employer]);
    }

    public function patch(PatchEmployerRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = auth()->user();
        $employer = $user->employer;

        if ($employer) {
            $employer->update($validated);
        } else {
            $validated['user_id'] = $user->id;
            Employer::create($validated);
        }

        return to_route('employer.edit');
    }

}
