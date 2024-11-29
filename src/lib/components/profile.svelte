<script lang="ts">
  import mod from '$lib/icons/mod.svg'
  import crown from '$lib/icons/crown.svg'
  import { cn } from '$lib/utils'

  let {
    name = 'Guest',
    team = 'yellow',
    timer = '00:00',
    showTimer = 'left',
    owner = false,
    moderator = false,
    pfp = 'https://github.com/shadcn.png',
  }: {
    name: string
    team: 'yellow' | 'blue' | 'none'
    timer?: string
    showTimer?: 'left' | 'right' | 'none'
    owner?: boolean
    moderator?: boolean
  } = $props()

  let teamClass = $state('bg-brand-yellow')
  if (team === 'blue') {
    teamClass = 'bg-brand-blue text-white'
  } else if (team === 'none') {
    teamClass = 'bg-white'
  }
</script>

<div
  class={cn(
    'flex gap-4 pl-2 pr-4 py-2 w-fit rounded-full items-center',
    teamClass,
  )}
>
  <img src={pfp} alt="Profile picture" class="w-9 h-9 rounded-full" />
  <p class="font-semibold text-lg">{name}</p>
  {#if moderator}
    <div
      class="w-8 h-8 p-2 flex items-center justify-center bg-white rounded-full"
    >
      <img src={mod} alt="Moderator" class="w-full" />
    </div>
  {/if}
  {#if owner}
    <div
      class="w-8 h-8 p-1 flex items-center justify-center bg-white rounded-full"
    >
      <img src={crown} alt="Owner" class="w-full" />
    </div>
  {/if}
</div>
