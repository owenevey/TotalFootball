<template>
  <main>
    <div id="articleContainer">
      <img id="articleImage" src="../assets/news/ronaldo.jpg" />
      <div id="articleBody">
        <h2 id="articleTitle">Ronaldo nets hat trick in win vs Uruguay</h2>
        <p id="articleSubtext">
          Note: every article was written by AI and rigged to include a Peter
          Crouch last minute goal
        </p>
        <div v-for="paragraph in text">
          <p class="articleText">{{ paragraph }}</p>
          <!-- <br /> -->
        </div>
      </div>
    </div>
  </main>
  <BottomNav />
</template>
<script setup>
import BottomNav from "../components/BottomNav.vue";

const text = [
  "In a thrilling soccer match that left fans on the edge of their seats, Cristiano Ronaldo showcased his unparalleled skill and goal-scoring prowess as he netted an impressive hat-trick against Uruguay. The match, held at the iconic stadium, unfolded into a spectacular display of football brilliance that will be etched in the memories of fans for years to come.",
  "The opening minutes of the game saw both teams vying for control of the ball, with Uruguay's solid defense posing a formidable challenge for Ronaldo and his teammates. However, it didn't take long for the Portuguese superstar to make his mark. In the 20th minute, Ronaldo found himself in the perfect position to capitalize on a well-executed through ball, slotting it past the Uruguayan goalkeeper with finesse.",
  "As the first half progressed, Uruguay fought back with determination, attempting to break through Portugal's defense. The tension in the stadium was palpable, with both sets of supporters eagerly anticipating the next breakthrough. Ronaldo, however, had other plans. In a stunning turn of events, he netted his second goal with a powerful header from a perfectly delivered corner kick, leaving the opposition stunned.",
  "The second half saw a resilient Uruguay attempting to mount a comeback, but Ronaldo's brilliance proved to be too much to handle. In the 65th minute, he completed his hat-trick with a clinical finish after a swift counter-attack orchestrated by his teammates. The stadium erupted in cheers as Ronaldo celebrated his remarkable achievement, cementing his status as one of the greatest footballers of all time.",
  "Just when fans thought the excitement had reached its peak, the unexpected happened. In a move that left everyone bewildered, Portugal's manager made a seemingly outrageous decision to substitute Ronaldo with none other than the lanky and charismatic Peter Crouch. The towering striker, known for his unique playing style, entered the pitch with a grin that hinted at mischief.",
  "As the clock ticked down, and with the game seemingly secured, Peter Crouch received an audacious pass from the midfield. In a moment that defied all expectations, Crouch executed a bicycle kick from outside the penalty area, sending the ball soaring into the top corner of the net. The stadium erupted into a cacophony of cheers as Crouch wheeled away in celebration, completing a fairytale ending to an already unforgettable match.",
  "Uruguay, despite their valiant efforts, couldn't find a way to contain the unexpected brilliance of Peter Crouch. The final whistle blew, and Portugal emerged victorious with a stunning scoreline of 4-0. Ronaldo's exceptional hat-trick, coupled with Crouch's last-minute worldly goal, created a truly magical night in the world of football, leaving fans in awe of the beautiful and unpredictable nature of the game.",
];
</script>
<style scoped>
main {
  margin: 2rem;
}

#articleContainer {
  max-width: 70rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#articleImage {
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 10px;
}

#articleBody {
  max-width: 48rem;
  margin-top: -10rem;
  position: relative;
  z-index: 1;
  background-color: white;
  border-radius: 10px;
  padding: 3rem;
}

#articleTitle {
  font-weight: 500;
  margin-top: 0;
}

#articleSubtext {
  color: gray;
  font-style: italic;
}

.articleText {
  font-size: larger;
}

@media (max-width: 700px) {
  main {
    margin: 1rem 0;
  }

  #articleImage {
    object-fit: contain;
    height: unset;
    border-radius: unset;
  }

  #articleBody {
    margin-top: 0rem;
    padding: 2rem;
    border-radius: unset;
  }
}
</style>
