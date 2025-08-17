<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jon_seeker_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_seeker_profile_id')->constrained('job_seeker_profiles')->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name');
            $table->enum('file_type',[
                'resume','certificate','portfolio','diploma','image'
            ]);
            $table->enum('mime_type',[
                'pdf','docx','images/png','images/jpg','images/jpeg',
            ]);
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jon_seeker_files');
    }
};
