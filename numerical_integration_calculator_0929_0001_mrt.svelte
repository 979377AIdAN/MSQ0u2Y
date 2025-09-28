// 代码生成时间: 2025-09-29 00:01:38
 * Numerical Integration Calculator using Svelte and JavaScript
 *
 * This program calculates the numerical integration (approximation) of a given function
 * over a specified interval using the trapezoidal rule for simplicity.
 *
 * @author Your Name
 * @version 1.0.0
 *
 */

import { onMount } from 'svelte';

// Define a function to calculate the numerical integration using the trapezoidal rule
function trapezoidalRule(f, a, b, n) {
    // Calculate the width of each subinterval
    const width = (b - a) / n;
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        const x = a + i * width;
        sum += f(x);
    }
    // Return the approximated integral
    return (width / 2) * (sum - f(a) - f(b));
}

// Define a function to validate the input
function validateInput(a, b, n) {
    if (a > b) throw new Error('Lower bound must be less than upper bound');
    if (n <= 0) throw new Error('Number of subintervals must be a positive integer');
}

export default class NumericalIntegrationCalculator extends SvelteComponent {
    #a = 0;
    #b = 0;
    #n = 0;
    #result = 0;
    #error = null;
    #f = x => 0; // Default function is f(x) = 0

    // Update the function to integrate
    updateFunction(f) {
        this.#f = f;
    }

    // Integrate function
    integrate() {
        try {
            validateInput(this.#a, this.#b, this.#n);
            this.#result = trapezoidalRule(this.#f, this.#a, this.#b, this.#n);
            this.#error = null;
        } catch (error) {
            this.#error = error.message;
            this.#result = 0;
        }
    }

    // Input handlers
    onAChange(event) {
        this.#a = parseFloat(event.target.value);
    }

    onBChange(event) {
        this.#b = parseFloat(event.target.value);
    }

    onNChange(event) {
        this.#n = parseInt(event.target.value, 10);
    }

    onFunctionChange(event) {
        this.updateFunction(eval(event.target.value));
    }

    // Lifecycle function to call integrate when component mounts
    oncreate() {
        onMount(() => {
            this.integrate();
        });
    }
}

// Svelte markup for the numerical integration calculator
<script>
  export let a;
  export let b;
  export let n;
  export let functionExpression;
</script>

<main>
  <h1>Numerical Integration Calculator</h1>
  <div>
    <label for="a">Lower bound (a):</label>
    <input type="number" bind:value={a} on:change={onAChange} />
  </div>

  <div>
    <label for="b">Upper bound (b):</label>
    <input type="number" bind:value={b} on:change={onBChange} />
  </div>

  <div>
    <label for="n">Number of subintervals (n):</label>
    <input type="number" bind:value={n} on:change={onNChange} />
  </div>

  <div>
    <label for="function">Function to integrate (e.g., x^2):</label>
    <input type="text" bind:value={functionExpression} on:change={onFunctionChange} />
  </div>

  <div>
    <button on:click={integrate}>Integrate</button>
  </div>

  <div>
    {#if $error}
      <p class="error">Error: {$error}</p>
    {:else}
      <p>Result: {$result}</p>
    {/if}
  </div>
</main>

<style>
  .error {
    color: red;
  }
</style>
