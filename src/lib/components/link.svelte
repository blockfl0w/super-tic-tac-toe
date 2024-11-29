<script lang="ts">
  import { cn } from '$lib/utils'
  import type { Snippet } from 'svelte'
  import { Link } from 'svelte-routing'

  let {
    href = '/',
    team = 'yellow',
    class: className = '',
    children,
  }: {
    href: string
    team?: 'yellow' | 'blue' | 'none'
    class?: string
    children: Snippet
  } = $props()

  let bgClass = $state('bg-brand-yellow')

  if (team === 'blue') {
    bgClass = 'bg-brand-blue text-white'
  } else if (team === 'none') {
    bgClass = 'bg-neutral-300'
  }
</script>

<Link
  to={href}
  class={cn('w-4/5 text-center font-semibold py-2 rounded', className, bgClass)}
>
  {@render children()}
</Link>
