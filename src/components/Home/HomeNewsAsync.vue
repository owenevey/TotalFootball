<template>
  <div id="newsContainer">
    <h3 id="newsTitle">News</h3>
    <div id="newsItemsContainer">
      <NewsItemAsync
          v-for="article in articles.slice(0, 4)"
          :title="article.title"
          :imageName="article.imageName"
          :timestamp="article.timestamp"
          @click="selectArticle(article)"
        />
    </div>
  </div>
</template>

<script setup>
import NewsItemAsync from "../News/NewsItemAsync.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const articles = ref(null);

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
  articles.value = response.Items.sort(() => 0.5 - Math.random());;
};

const router = useRouter();

const selectArticle = (article) => {
  router.push({
    name: "article",
    params: { id: article.id, img: article.imageName.slice(0, -4) },
  });
};

await fetchArticles();
</script>

<style scoped>
#newsContainer {
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px #f0f0f0 solid;
  height: fit-content;
}

#newsTitle {
  font-weight: 500;
  padding: 1.3rem;
  margin: 0px;
}

#newsItemsContainer {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 0rem 1rem 1rem 1rem;
}
</style>
