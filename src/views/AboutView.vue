<template>
  <main>
    <div id="columnContainer">
      <div id="aboutContainer">
        <img id="headshot" src="/about/owen.jpg" />
        <div id="textContainer">
          <div id="aboutTitleRow">
            <h2 id="aboutTitle">About Me</h2>
            <a class="linkedInImg" href="https://www.linkedin.com/in/owenevey/"
              ><img
                class="linkedInImg"
                src="/about/linkedin_logo.png"
                alt="linkedIn"
            /></a>
          </div>
          <p>
            Hi! My name is Owen, and I'm a full stack developer who recently
            graduated from Michigan State University studying computer science
            and Chinese. I have worked in many different areas of the industry
            such as a particle accelerator research facility, a machine learning
            research lab, and multiple Fortune 500 companies.
          </p>
          <p>
            Outside of programming, I love sports, fitness, and doing anything
            outside.
          </p>
          <p>
            The design for this website was heavily inspired from one of my
            favorite websites,
            <a href="https://www.fotmob.com">Fotmob</a>.
          </p>
        </div>
      </div>

      <div id="techStackContainer">
        <h2 id="techStackTitle">Tech Stack</h2>
        <div id="stackGrid">
          <div class="techStackItem">
            <img class="techStackImg" src="/about/vue.png" />
            <h3 class="techStackText">VueJS 3</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/html.png" />
            <h3 class="techStackText">HTML</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/css.png" />
            <h3 class="techStackText">CSS</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/javascript.png" />
            <h3 class="techStackText">Javascript</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/s3.png" />
            <h3 class="techStackText">AWS S3</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/dynamodb.png" />
            <h3 class="techStackText">AWS DynamoDB</h3>
          </div>
          <div class="techStackItem">
            <img class="techStackImg" src="/about/amplify.png" />
            <h3 class="techStackText">AWS Amplify</h3>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
main {
  margin: 1rem;
}

#columnContainer {
  padding-top: 1rem;
  margin: auto;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

#aboutContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

#headshot {
  height: 20rem;
  width: 20rem;
  object-fit: cover;
  border-radius: 50%;
}

#aboutTitleRow {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

#aboutTitle {
  font-weight: 500;
  margin: 0;
}

#textContainer {
  max-width: 40rem;
}

.linkedInImg {
  height: 1.5rem;
  width: 1.5rem;
  object-fit: contain;
}

#techStackContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#techStackTitle {
  font-weight: 500;
}

#stackGrid {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 3rem;
}

.techStackItem {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.techStackImg {
  height: 3rem;
  width: 3rem;
  object-fit: contain;
}

.techStackText {
  font-weight: 400;
  margin: 0;
}

@media (max-width: 900px) {
  #aboutContainer {
    flex-direction: column;
    gap: 1rem;
  }

  #headshot {
    height: 10rem;
    width: 10rem;
  }

  #aboutTitleRow {
    justify-content: center;
  }
}

@media (max-width: 650px) {
  #stackGrid {
    grid-template-columns: auto auto auto;
  }
}

@media (max-width: 500px) {
  #stackGrid {
    grid-template-columns: auto auto;
  }
}
</style>
