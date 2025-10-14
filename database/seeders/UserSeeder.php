<?php
//
//namespace Database\Seeders;
//
//use App\Models\Employer\Employer;
//use App\Models\User;
//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
//use Illuminate\Database\Seeder;
//use Illuminate\Support\Facades\Hash;
//
//class UserSeeder extends Seeder
//{
//    /**
//     * Run the database seeds.
//     */
//    public function run(): void
//    {
//        $admin = User::create([
//            'name' => 'Admin',
//            'email' => 'admin@admin.com',
//            'password' => Hash::make('password'),
//        ]);
//        $jobseeker = User::create([
//            'name' => 'Job Seeker',
//            'email' => 'jobseeker@jobseeker.com',
//            'password' => Hash::make('password'),
//        ]);
//        $employer = User::create([
//            'name' => 'Employer',
//            'email' => 'employer@employer.com',
//            'password' => Hash::make('password'),
//        ]);
//        Employer::create([
//            'user_id' => $employer->id,
//        ]);
//        $admin->assignRole('admin');
//        $jobseeker->assignRole('jobseeker');
//        $employer->assignRole('employer');
//    }
//
//}


namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        // Create employer users (IDs 1–7)
        $employerUsers = [
            ['id' => 1, 'email' => 'tajikitsolutions@example.tj', 'name' => 'Tajik IT Solutions'],
            ['id' => 2, 'email' => 'pamireducation@example.tj', 'name' => 'Pamir Education Center'],
            ['id' => 3, 'email' => 'sihatclinic@example.tj', 'name' => 'Sihat Medical Clinic'],
            ['id' => 4, 'email' => 'bunyod@example.tj', 'name' => 'Bunyod Construction'],
            ['id' => 5, 'email' => 'somonifinance@example.tj', 'name' => 'Somoni Finance'],
            ['id' => 6, 'email' => 'tajikagro@example.tj', 'name' => 'Tajik Agro Co'],
            ['id' => 7, 'email' => 'pamirtravel@example.tj', 'name' => 'Pamir Travel'],
        ];

        foreach ($employerUsers as $userData) {
            $user = User::updateOrCreate(
                ['id' => $userData['id']],
                [
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make('password123'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('employer');
        }

        // Create job seeker users (IDs 8–47 for 35–40 profiles)
        $maleFirstNames = ['Алишер', 'Фарход', 'Дилшод', 'Рустам', 'Саид', 'Джамшед', 'Фирдавс', 'Хуршед', 'Сафар', 'Икбол'];
        $femaleFirstNames = ['Зарина', 'Мехрангез', 'Шахло', 'Нодира', 'Гулноз', 'Мавлуда', 'Зухра', 'Парвина', 'Мубина', 'Сабрина'];
        $maleLastNames = ['Рахимов', 'Саидов', 'Нурматов', 'Мирзоев', 'Абдуллоев', 'Рахмонов', 'Исмоилов', 'Каримов'];
        $femaleLastNames = ['Холматова', 'Шарипова', 'Кодирова', 'Хайдарова', 'Алиева', 'Гафурова', 'Сафарова', 'Рахимова', 'Саидова', 'Нурматова', 'Мирзоева', 'Абдуллоева', 'Рахмонова', 'Исмоилова', 'Каримова'];

        for ($i = 8; $i <= 47; $i++) {
            // Randomly decide gender (50% chance for male or female)
            $isMale = rand(0, 1) === 0;
            $firstName = $isMale ? $maleFirstNames[array_rand($maleFirstNames)] : $femaleFirstNames[array_rand($femaleFirstNames)];
            $lastName = $isMale ? $maleLastNames[array_rand($maleLastNames)] : $femaleLastNames[array_rand($femaleLastNames)];
            $gender = $isMale ? 'male' : 'female';

            $user = User::updateOrCreate(
                ['id' => $i],
                [
                    'name' => $firstName . ' ' . $lastName,
                    'email' => 'jobseeker' . $i . '@example.tj',
                    'password' => Hash::make('password123'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole('jobseeker');
        }
    }
}
