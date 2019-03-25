<template>
  <div :class="['avatar', 'avatar-' + avatarType]" :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }">
    <img :src="avatarImage">
  </div>
</template>


<script>
export default {
  name: 'JskAvatar',
  props: {
    avatarImage: {
      type: String,
      default: '#'
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarType: {
      type: String,
      default: 'round'
    }
  }
}
</script>

<style scoped>
.avatar {
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(139, 154, 174, 0.4);
}
.avatar-radius {
  border-radius: 3px;
}
.avatar-round {
  border-radius: 100%;
}
.avatar > img {
  width: 100%;
  height: 100%;
}
</style>
