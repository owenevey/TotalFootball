<template>
  <div class="pitch">
    <div v-if="hasLineups" class="leftPitch">
      <div
        class="pitchColumn"
        v-for="(players, key) of Object.entries(homeLineup)"
      >
        <div class="player" v-for="player in players[1].reverse()">
          <div
            class="playerCircle"
            :style="{
              'background-color': player.kitColor,
              fontWeight: 500,
            }"
          >
            <p :style="{ color: player.numberColor }">
              {{ player.number }}
            </p>
          </div>
          <p class="playerName">
            {{ player.name.split(" ").slice(-1)[0] }}
          </p>
        </div>
      </div>
    </div>
    <div class="pitchMark leftInnerBox"></div>
    <div class="pitchMark leftOuterBox"></div>
    <div class="leftCropper">
      <div class="pitchMark leftSemiCircle"></div>
    </div>
    <div class="pitchMark pitchHalfMark"></div>
    <div class="pitchMark pitchCircle"></div>
    <div class="pitchMark rightInnerBox"></div>
    <div class="pitchMark rightOuterBox"></div>
    <div class="rightCropper">
      <div class="pitchMark rightSemiCircle"></div>
    </div>
    <div v-if="hasLineups" class="rightPitch">
      <div
        class="pitchColumn"
        v-for="(players, key) of Object.entries(awayLineup).reverse()"
      >
        <div class="player" v-for="player in players[1]">
          <div
            class="playerCircle"
            :style="{ 'background-color': player.kitColor }"
          >
            <p
              class="playerNumber"
              :style="{ color: player.numberColor, fontWeight: 500 }"
            >
              {{ player.number }}
            </p>
          </div>
          <p class="playerName">
            {{ player.name.split(" ").slice(-1)[0] }}
          </p>
        </div>
      </div>
    </div>
    <p v-else class="noLineup">No lineup information yet</p>
  </div>
</template>
<script setup>
defineProps({
  homeLineup: Object,
  awayLineup: Object,
  hasLineups: Boolean,
});
</script>

<style scoped>
.pitch {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #00935c;
  height: 35rem;
  width: 100%;
  z-index: 1;
}

.noLineup {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: large;
  color: black;
  text-align: center;
}

.leftPitch,
.rightPitch {
  flex: 1;
  display: flex;
  height: 100%;
  width: 50%;
}

.pitchColumn {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.pitchMark {
  border: #0c9f67 5px solid;
  z-index: -1;
  position: absolute;
}

.pitchHalfMark {
  border-top: 0;
  border-bottom: 0;
  border-left: 0;
  height: 100%;
  left: 50%;
}

.pitchCircle {
  position: absolute;
  height: 8rem;
  width: 8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.leftInnerBox {
  position: absolute;
  height: 7rem;
  width: 3rem;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-left: 0;
}

.rightInnerBox {
  position: absolute;
  right: 0;
  height: 7rem;
  width: 3rem;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  border-right: 0;
}

.leftOuterBox {
  position: absolute;
  height: 15rem;
  width: 7rem;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  border-left: 0;
}

.rightOuterBox {
  position: absolute;
  right: 0;
  height: 15rem;
  width: 7rem;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  border-right: 0;
}

.leftCropper {
  position: absolute;
  overflow: hidden;
  left: 7rem;
}

.rightCropper {
  position: absolute;
  overflow: hidden;
  right: 7rem;
}

.leftSemiCircle {
  position: relative;
  height: 6rem;
  width: 3rem;
  border-top-right-radius: 8rem;
  border-bottom-right-radius: 8rem;
  border-left: 0;
  left: -50%;
}

.rightSemiCircle {
  position: relative;
  height: 6rem;
  width: 3rem;
  border-top-left-radius: 8rem;
  border-bottom-left-radius: 8rem;
  border-right: 0;
  right: -50%;
}

.player {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 5rem;
}

.playerCircle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  margin: 0.5rem;
  border-radius: 50%;
}

.playerName {
  color: white;
  margin: 0;
  white-space: nowrap;
  text-align: center;
}

@media (max-width: 50rem) {
  .pitch {
    flex-direction: column;
    height: 50rem;
  }

  .leftPitch,
  .rightPitch {
    height: 50%;
    width: 100%;
    flex-direction: column;
  }

  .pitchColumn {
    width: 100%;
    flex-direction: row;
  }

  .pitchHalfMark {
    border-right: 0;
    border-left: 0;
    border-bottom: 0;
    border-top: #0c9f67 5px solid;
    width: 100%;
    top: 50%;
    left: 0;
  }

  .leftInnerBox {
    height: 3rem;
    width: 7rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
    border-left: #0c9f67 5px solid;
    border-top: 0;
  }

  .rightInnerBox {
    height: 3rem;
    width: 7rem;
    border-top-right-radius: 0.75rem;
    border-bottom-left-radius: 0;
    border-right: #0c9f67 5px solid;
    border-bottom: 0;
    bottom: 0;
    right: unset;
  }

  .leftOuterBox {
    height: 7rem;
    width: 15rem;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0.75rem;
    border-top: 0;
    border-left: #0c9f67 5px solid;
  }

  .rightOuterBox {
    height: 7rem;
    width: 15rem;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0.75rem;
    border-bottom: 0;
    bottom: 0;
    right: unset;
    border-right: #0c9f67 5px solid;
  }

  .leftCropper {
    position: absolute;
    overflow: hidden;
    left: unset;
    top: 7rem;
  }

  .rightCropper {
    position: absolute;
    overflow: hidden;
    right: unset;
    bottom: 7rem;
  }

  .leftSemiCircle {
    position: relative;
    height: 3rem;
    width: 6rem;
    border-top-right-radius: unset;
    border-bottom-left-radius: 8rem;
    border-top: 0;
    border-left: #0c9f67 5px solid;
    left: unset;
    transform: translate(0, -50%);
  }

  .rightSemiCircle {
    position: relative;
    height: 3rem;
    width: 6rem;
    border-bottom-left-radius: unset;
    border-top-right-radius: 8rem;
    border-bottom: 0;
    border-right: #0c9f67 5px solid;
    right: unset;
    transform: translate(0, 50%);
  }
}
</style>
