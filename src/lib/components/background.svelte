<script lang="ts">
  let { team = 'yellow' }: { team: 'yellow' | 'blue' | 'blank' } = $props()
</script>

{#if team === 'yellow'}
  <div class="bg-brand-yellow noughts"></div>
{:else if team === 'blue'}
  <div class="bg-brand-blue crosses"></div>
{:else}
  <div class="bg-transparent"></div>
{/if}

<style>
  .noughts {
    background-image: url('$lib/icons/circleBg.svg');
    background-size: 100%;
  }
  .crosses {
    background-image: url('$lib/icons/crossBg.svg');
    background-size: 100%;
  }
  div {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -1;
    rotate: -35deg;
    scale: 2.1;
  }
</style>
