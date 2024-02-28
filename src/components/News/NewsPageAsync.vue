<template>
  <main>
    <div id="newsContainer">
      <h1 id="newsTitle">News</h1>
      <NewsTopStory
        class="topStory"
        :title="articles[0].title"
        :imageName="articles[0].imageName"
        @click="selectArticle(articles[0])"
      />

      <div id="newsGridContainer">
        <NewsItemAsync
          v-for="article in articles.slice(1)"
          class="gridItem"
          :title="article.title"
          :imageName="article.imageName"
          :timestamp="article.timestamp"
          @click="selectArticle(article)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import NewsTopStory from "../News/NewsTopStory.vue";
import NewsItemAsync from "./NewsItemAsync.vue";

import { ref } from "vue";

const articles = ref(null);

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const fetchArticles = async () => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const docClient = DynamoDBDocumentClient.from(client);

  const command = new ScanCommand({
    TableName: "TotalFootball-News",
  });

  const response = await docClient.send(command);
  articles.value = response.Items;
};

await fetchArticles();

import { useRouter } from "vue-router";

const router = useRouter();

const selectArticle = (article) => {
  router.push({
    name: "article",
    params: { id: article.id, img: article.imageName.slice(0, -4) },
  });
};
</script>

<style scoped>
#newsTitle {
  margin: 0;
  font-weight: 500;
}

#newsContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  max-width: 80rem;
  margin: auto;
  box-sizing: border-box;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#newsGridContainer {
  display: grid;
  gap: 1rem;
  grid-template-columns: auto auto auto auto;
}

main {
  margin: 1rem;
}

@media (max-width: 1200px) {
  #newsGridContainer {
    grid-template-columns: auto auto auto;
  }
}

@media (max-width: 750px) {
  #newsGridContainer {
    grid-template-columns: auto auto;
  }

  .topStory {
    display: none;
  }
}

@media (max-width: 500px) {
  #newsGridContainer {
    grid-template-columns: auto;
  }
}

@media (max-width: 800px) {
  main {
    margin: 1rem 0.5rem;
  }
}
</style>
