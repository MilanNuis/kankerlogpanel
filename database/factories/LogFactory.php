<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Log>
 */
class LogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category' => $this->faker->word,
            'severity' => $this->faker->word,
            'steamname' => $this->faker->word,
            'message' => $this->faker->sentence,
            'data' => json_encode(['key' => $this->faker->sentence]),
        ];
    }
}
