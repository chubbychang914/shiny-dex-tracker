<template>
  <div class="no-data-layout">
    <div class="no-data-container">
      <div class="no-data-text">Psyduck is unhappy with your search query! Try a different one.</div>
      <div class="no-data-image-container">
        <img
          src="/src/assets/images/tiredPsyduck.webp"
          alt="no-data-image"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-data-layout {
  width: 100%;
  overflow: hidden;
}

.no-data-container {
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.no-data-text {
  color: $SystemWhite;
}

.no-data-image-container {
  width: 50%;
  // max-width: 150px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
