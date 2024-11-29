<script lang="ts">
  import Profile from '$lib/components/profile.svelte'
  import { pb, user, generateDummyAccount } from '$lib/pocketbase.svelte'
  import { onDestroy, onMount } from 'svelte'
  import { toast } from 'svelte-sonner'

  // The games record
  let gameRecord: any = $state({})

  // Data for the game
  let boardState = $state([0, 0, 0, 0, 0, 0, 0, 0, 0])
  let turn = $state(false)
  let winner: number | null = $state(null)

  let player = $state(0)
  onMount(async () => {
    // get url params
    const urlParams = new URLSearchParams(window.location.search)
    const game = urlParams.get('code')

    if (user.data === null) {
      toast.error('User is not logged in. Click here to log in as a guest', {
        action: {
          label: 'Log in',
          onClick: async () => {
            await generateDummyAccount()
          },
        },
      })

      throw new Error('User is not logged in')
    }

    try {
      gameRecord = await pb
        .collection('noughtAndCrossesGames')
        .getFirstListItem(`gameID = '${game}'`)

      console.log(gameRecord)

      updateBoardState(gameRecord.boardState)
      turn = gameRecord.turn

      if (gameRecord.player1ID === user.data.id) {
        // player 1
        console.log('player 1')
        player = 1
      } else if (gameRecord.player2ID === user.data.id) {
        // player 2
        console.log('player 2')
        player = 2
      } else if (
        gameRecord.player2ID === '' &&
        gameRecord.player1ID !== user.data.id
      ) {
        // Connect player 2
        await pb.collection('noughtAndCrossesGames').update(gameRecord.id, {
          player2ID: user.data.id,
        })

        player = 2
      } else {
        // spectator
        console.log('spectator')
      }
    } catch (error) {
      toast.error('Failed to find the game. Check the console for more details')
      console.error(error)
    }

    try {
      await pb.collection('noughtAndCrossesGames').subscribe('*', (e) => {
        // console.log(e.record)
        // console.log(e.action)
        if (e.action === 'update') {
          gameRecord = e.record
          updateBoardState(gameRecord.boardState)
          if (winner === null) {
            winner = checkForWinner(boardState)
          }

          if (winner !== null) {
            pb.collection('noughtAndCrossesGames').update(gameRecord.id, {
              winner:
                winner === 1 ? gameRecord.player1ID : gameRecord.player2ID,
            })
          }

          turn = gameRecord.turn
          console.log(gameRecord)
        }
      })
    } catch (e) {
      toast.error(
        'Failed to connect to the game. Check the console for more details',
      )
      console.error(e)
    }
  })

  function updateBoardState(string: string) {
    const arr = string.split('')
    const newArr = arr.map((e) => parseInt(e))
    boardState = newArr
  }

  function updateBoard(event: MouseEvent) {
    if (winner !== null) {
      return
    }
    const cell = event.target.dataset.cell

    console.log(player, turn)
    if (player === 1 && turn === false) {
      // player 1
      const newBoard = boardState
      newBoard[cell] = 1
      boardState = newBoard
      turn = true

      pb.collection('noughtAndCrossesGames').update(gameRecord.id, {
        boardState: boardState.join(''),
        turn: turn,
      })
    } else if (player === 2 && turn === true) {
      // player 2
      const newBoard = boardState
      newBoard[cell] = 2
      boardState = newBoard
      turn = false

      pb.collection('noughtAndCrossesGames').update(gameRecord.id, {
        boardState: boardState.join(''),
        turn: turn,
      })
    } else {
      toast.error('It is not your turn')
    }
  }

  function checkForWinner(board: number[]) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Return 0 for player 1 and 1 for player 2
        toast.success(`Player ${board[a]} wins!`)
        return board[a]
      }
    }

    return null
  }

  onDestroy(() => {
    pb.collection('noughtAndCrossesGames').unsubscribe('*')
  })
</script>

<div class="absolute z-10">
  {#if user.data !== null}
    <Profile name={user.data.name} team="yellow" owner moderator />
  {/if}

  {#if winner !== null}
    <div class="absolute z-50 top-0 bg-black/50 w-screen h-screen">
      <div>
        <h1 class="text-4xl text-white text-center">{winner === 1} wins!</h1>
      </div>
    </div>
  {/if}
  <div class="grid grid-cols-3 grid-rows-3 w-fit">
    {#each boardState as cell, i}
      <button
        class="w-16 h-16 bg-white border border-black flex items-center justify-center"
        data-cell={i}
        onclick={updateBoard}
      >
        {#if cell === 1}
          X
        {:else if cell === 2}
          O
        {/if}
      </button>
    {/each}
  </div>
</div>
