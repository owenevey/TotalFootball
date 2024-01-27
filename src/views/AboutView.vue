<template>
  <main>
    <div id="container">
      <img src="/owen.jpeg" />
      <div id="textContainer">
        <h3>About Me</h3>
        <p>
          Hi! My name is Owen, and I'm a full stack developer who recently
          graduated from Michigan State University with a degree in computer
          science and minor in Chinese. I love programming and the sense of
          achievement that comes with building things. I have worked in
          different areas of the industry such as a federal particle accelerator
          research facility, a machine learning research lab, and multiple
          Fortune 500 companies.
        </p>
        <p>
          My love for soccer inspired me to make this website. The tech stack is
          a Vue 3 front end with the Composition API with pure HTML and CSS. The
          back end is run through AWS, with the data being stored in S3 and the
          server being hosted on Amplify.
        </p>
        <p><a href="https://www.linkedin.com/in/owenevey/">My LinkedIn Profile</a></p>
        <p>
          The design was heavily inspired from one of my favorite websites,
          <a href="https://www.fotmob.com">Fotmob</a>.
        </p>
        <p>
          <a href="https://www.youtube.com/watch?v=T3_UNFZHSQU">Click here</a>
          for lifechanging video.
        </p>
      </div>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
main {
  margin: 3rem 1.5rem;
}

#container {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

img {
  height: 30rem;
  width: 20rem;
  object-fit: cover;
  border-radius: 5px;
}

#textContainer {
  max-width: 40rem;
}

@media (max-width: 800px) {
  #container {
    flex-direction: column;
  }

  img {
    height: 15rem;
    width: 12rem;
  }
}
</style>
