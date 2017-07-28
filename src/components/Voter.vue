<template>
  <div>
      <h4>Let's cast some votes</h4>
      <button class="primary" @click="openSheet()">Open</button>
      <div>
      <p>Here are the votes for your game {{game.title}} or {{game.category}}</p>
      <button class="green"> All votes</button>
      <!-- get all the votable squares and display in a list --> 
      <button class="primary">Speed Voting</button>
      <div class="list item-delimiter">
          <div class="item" v-for="vote in votes">
            <div class="item-content" @click="openVoteGallery(vote.id)">
                {{vote.title}}
            </div>
          </div>
      </div>

      </div>
      <q-modal ref="oldVoteGallery">
      <h4>Challenge Header</h4>
      <p>Cahllenge description will go here lorem ipsum bull shit fart</p>
      <p>(double tap the image to vote for it, you have 3 votes to cast)</p>
        <q-gallery-slider :src="activeVote.photos" @slide="slideChange()"></q-gallery-slider>
      </q-modal>
      <q-modal ref="newVoteGallery">
          <q-slider arrows dots class="text-white full-height">
            <div slot="slide" v-for="photo in activeVote.photos" class="bg-primary centered" style="position:relative;">
            <div class="position-relative">
            <button class="dark glossy absolute-top-left" @click="$refs.newVoteGallery.close()"><i>close</i></button>
            <div class="row">
                <h2>{{photo.title}}</h2>
                </div>
                <div class="row">
                <p>{{photo.description}}</p>

            </div>
            <div class="row">
                <span class="fixed" style="left: 45%; top: 50%;"><i v-bind:class="{ 'animate-pop': cast, 'invisible': isInvisible}" style="font-size: 65px;">plus_one_large</i></span>
                <img :src="photo.url" class="fit" v-touch-swipe="handleSwipe"/>
            </div>
            <div class="row">
            <p>Swipe up to vote for a photo you have {{activeVote.totalBallots}}</p> <br><br>
                
            </div>
                
            </div>
            
            </div>
          </q-slider>
      </q-modal>
  </div>
</template>

<script>
import { ActionSheet, Toast } from 'quasar'

export default {
  props: ['gameId', 'userId'],
  data () {
    return {
      cast: false,
      isInvisible: true,
      votes: [
        {title: 'Best looking cocktail'},
        {title: 'Most disgusting food item'},
        {title: 'Best back sweat design'}
      ],
      activeVote: {
        photos: [
          { url: 'http://104.236.125.53/app/images/1499955037.png', title: 'This is the title photo', description: 'Here you go here is the description' },
          { url: 'http://104.236.125.53/app/images/1499954150.png', title: 'Here is the second photo', description: 'Here is the second description' },
          { url: 'http://104.236.125.53/app/images/1499969760.png', title: 'Here is the third photo', description: 'Here is the third description' }
        ],
        totalBallots: 3,
        ballot: []
      },
      game: {
        title: '',
        category: ''
      }
    }
  },
  methods: {
    castBallot () {
      // cast a Ballot
    },
    getData () {
      // get pending votes
    },
    openVoteGallery () {
      this.$refs.newVoteGallery.open()
    },
    randomJudge () {
      // randomize a result
    },
    repotPhoto () {
      // report this photo for a terms of service violation
    },
    handleSwipe (swipe) {
      console.log(swipe)
      if (swipe.direction === 'up') {
        // cast a ballot and play a +1 animation
        if (this.activeVote.totalBallots === 0) {
          alert('You have maxed your ballots for this vote')
          return
        }
        // alert('You swiped up')
        this.isInvisible = false
        this.cast = true
        this.activeVote.totalBallots = this.activeVote.totalBallots - 1
        setTimeout(() => {
          this.isInvisible = true
          this.cast = false
        }, 500)
        if (this.activeVote.totalBallots === 0) {
            // show the overlay that completes this vote
          this.closeVote(this.activeVote.id)
        }
      }
    },
    closeVote (voteId) {
      // show the vote breakdown
      this.$refs.newVoteGallery.close()
      this.activeVote = {}
      Toast.create.positive({
        icon: 'check',
        html: 'Damn you so democratic, vote complete',
        timeout: 2000
      })
      // show a toast
      // update the status of the current vote
      // clear the activeVote Object
    },
    double () {
      alert('Here is the double')
    },
    slideChange () {
      // update the text and description
    },
    openSheet () {
      ActionSheet.create({
        title: 'Test Sheet',
        gallery: true,
        actions: [
          {
            label: 'Delete',
            icon: 'delete',
            avatar: '',
            handler: function () {
              console.log('something happened')
            }
          }
        ],
        dismiss: {
          label: 'Cancel',
          icon: 'cancel',
          classes: 'text-primary',
          handler: function () {
            console.log('Hello')
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
