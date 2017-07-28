<template>
  <div>
  <q-slider arrows dots class="text-white full-height">
      <div slot="slide" v-for="photo in vote.user_challenges" class="bg-primary centered" style="position:relative;">
            <div class="position-relative" :class="{isCurrentUser : 'disabled'}">
            <button class="dark glossy absolute-top-left" @click="$refs.newVoteGallery.close()"><i>close</i></button>
            <div class="row">
                <h2>{{vote.challenge.title}}</h2>
                </div>
                <div class="row">
                <p>{{vote.challenge.description}}</p>

            </div>
            <div class="row">
                <span class="fixed" style="left: 45%; top: 50%;"><i v-bind:class="{ 'animate-pop': cast, 'invisible': isInvisible}" style="font-size: 65px;">plus_one_large</i></span>
                <img :src="photo.photo" class="fit" v-touch-swipe="handleSwipe"/>
            </div>
            <div class="row">
            
                
            </div>
            
                
            </div>
            
        </div>
        </q-slider>
        <div class="row">
        <p>Swipe up to vote for a photo you have {{vote.totalBallots}}</p> <br><br>
                <span v-for="user in vote.users" v-if="user.pivot.has_voted == true">
                {{user.name}} has voted
                </span>
                <span v-for="user in vote.users" v-if="user.pivot.has_voted == false">
                {{user.name}} has not voted
                </span>
            </div>
  </div>
</template>

<script>
export default {
  props: ['voteId'],
  data () {
    return {
      isInvisible: true,
      cast: false,
      user_id: 1,
      isCurrentUser: false,
      vote: {
        challenge: {
          title: 'Best Jesus thing',
          description: 'Maybe its a coozie, maybe a g-string, find the most original thing with the big JC on it.'
        },
        users: [
          {
            id: 1,
            name: 'Andy',
            pivot: {
              has_voted: true
            }
          },
          {
            id: 2,
            name: 'George',
            pivot: {
              has_voted: false
            }
          },
          {
            id: 3,
            name: 'Amanda',
            pivot: {
              has_voted: true
            }
          }
        ],
        user_challenges: [
          {
            id: 1,
            photo: 'http://104.236.125.53/app/images/1499894417.png',
            user_id: 1
          },
          {
            id: 2,
            photo: 'http://104.236.125.53/app/images/1499879630.png',
            user_id: 2
          },
          {
            id: 3,
            photo: 'http://104.236.125.53/app/images/1499879511.png',
            user_id: 3
          }
        ],
        totalBallots: 2
      },
      ballots: []
    }
  },
  methods: {
    getVoteData () {

    },
    checkCurrentUser (loopId) {
      if (loopId === this.user_id) {
        this.isCurrentUser = true
      }
      else {
        this.isCurrentUser = false
      }
    },
    castBallot () {
      if (this.totalBallots === 0) {
        alert('You have maxed your ballots for this vote')
        return
      }
        // alert('You swiped up')
      this.isInvisible = false
      this.cast = true
      this.vote.totalBallots = this.vote.totalBallots - 1
      setTimeout(() => {
        this.isInvisible = true
        this.cast = false
      }, 500)
      if (this.vote.totalBallots === 0) {
            // show the overlay that completes this vote
        this.closeVote(this.vote.id)
      }
    },
    closeVote () {

    },
    handleSwipe (swipe) {
      console.log(swipe)
      if (swipe.direction === 'up') {
        // cast a ballot and play a +1 animation
        this.castBallot()
      }
    }
  }
}
</script>

<style>
</style>
