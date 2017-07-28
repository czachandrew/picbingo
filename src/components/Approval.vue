<template>
  <div class="card">
  <div class="card-title">
      <p>Remaining Approvals: {{approvals.length}} <i style="float:right;" @click="closeWindow()">close</i></p>
  </div>
  <div class="card-title">
      <h5>{{activeApproval.title}}</h5>
  <p>{{activeApproval.description}}</p>
  <img :src="activeApproval.image" class="responsive"/>
  <p>Does this fit the challenge described above?</p>
 <button class="primary" @click="approve()">Approve</button>
  <button class="green">Deny</button>
  <p>Is this image inappropriate?</p>
  <button class="red">Report User <i>report</i></button>
  
  </div>
  
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      approvals: [
        {
          title: 'Approve this challenge',
          description: 'Here is the challenge description for some help',
          image: 'http://104.236.125.53/app/images/1499955037.png'
        }
      ],
      activeApproval: {
        title: 'The Corner of a laptop',
        description: 'Get a sweet pic of the corner of a laptop, this is not a real challenge just the test shit',
        image: 'http://104.236.125.53/app/images/1499955037.png'
      }
    }
  },
  methods: {
    getApprovals () {

    },
    approve () {
      console.log('approve of me!')
      this.approvals.splice(0, 1)
    },
    deny () {

    },
    closeWindow () {
      this.$emit('approvalClose')
    }
  },
  mounted () {

  }
}
</script>

<style>
</style>
