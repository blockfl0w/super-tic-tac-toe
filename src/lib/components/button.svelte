<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'
  import { Link } from 'svelte-routing'

  let {
    team = 'yellow',
    class: className = '',
    onclick: onClick,
    children,
    type = 'button',
  }: {
    team?: 'yellow' | 'blue' | 'none'
    class?: string
    children: Snippet
    onclick?: () => void
    type?: 'button' | 'submit' | 'reset' | null | undefined
  } = $props()

  let bgClass = $state('bg-brand-yellow text-black')

  if (team === 'blue') {
    bgClass = 'bg-brand-blue text-white'
  } else if (team === 'none') {
    bgClass = 'bg-neutral-300'
  }
</script>

<button
  onclick={onClick}
  class={cn(
    'w-4/5 text-center font-semibold py-2 rounded text-black',
    className,
    bgClass,
  )}
  {type}
>
  {@render children()}
</button>
