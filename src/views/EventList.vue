<template>
  <div>
    <h1>Events Listing for {{ user.user.name }}</h1>
    <event-card
      v-for="event in event.events"
      :key="event.id"
      :event="event"
    ></event-card>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Previous
      </router-link>
    </template>
    &nbsp;|&nbsp;
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
    >
      Next
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    'event-card': EventCard
  },
  created() {
    this.fetchEvents({
      perPage: 2,
      page: this.page
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  },
  methods: mapActions('event', ['fetchEvents'])
}
</script>

<style></style>
