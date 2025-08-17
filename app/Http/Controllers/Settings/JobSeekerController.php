<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\JobSeeker\StoreCVUploadRequest;
use App\Services\FileParserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class JobSeekerController extends Controller
{

    public function index():Response
    {
        return Inertia::render('settings/jobseeker/cv-upload');
    }

    public function store(StoreCVUploadRequest $request,FileParserService $parser):RedirectResponse
    {
        $validated = $request->validated();


        return to_route('jobseeker.index');
    }
}
