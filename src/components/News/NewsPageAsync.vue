<template>
  <main>
    <div id="newsContainer">
      <h1 id="newsTitle">News</h1>
      <NewsTopStory
        class="topStory"
        title="Newcastle thumps PSG in Group of Death Matchup"
        imageName="newcastle.jpg"
        @click="selectArticle()"
      />
      <div id="newsGridContainer">
        <NewsItem
          v-for="article in articles"
          class="gridItem"
          title="Newcastle thumps PSG in Group of Death Matchup"
          :imageName="article.imageName"
          @click="selectArticle()"
        />
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import NewsTopStory from "../News/NewsTopStory.vue";
import NewsItem from "./NewsItem.vue";
import BottomNav from "../Navigation/BottomNav.vue";

import { ref } from "vue";

const articles = ref(null);

/////////////////

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

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
console.log("Table Items:", response.Items);

/////////////////

// const testImage = ref(null);

// import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// const s3_client = new S3Client({
//   region: "us-east-1",
//   credentials: {
//     accessKeyId: "AKIA24CGRZVIGS5KDMH4",
//     secretAccessKey: "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",
//   },
// });

// const s3_command = new GetObjectCommand({
//   Bucket: "owenevey-totalfootball",
//   Key: "news/ronaldo.jpg",
// });

// const imageResponse = await s3_client.send(s3_command);

// const readableStream = imageResponse.Body;

// // Convert the ReadableStream to ArrayBuffer
// const buffer = [];
// const reader = readableStream.getReader();

// while (true) {
//   const { done, value } = await reader.read();

//   if (done) break;

//   buffer.push(value);
// }

// const arrayBuffer = new Uint8Array(
//   buffer.reduce((acc, chunk) => [...acc, ...chunk], [])
// ).buffer;

// // Create a Blob from the ArrayBuffer
// const blob = new Blob([arrayBuffer], { type: imageResponse.ContentType });

// // Create a data URL from the Blob
// const dataUrl = URL.createObjectURL(blob);

// // Set the dataUrl to the testImage ref
// testImage.value = dataUrl;

/////////////

import { useRouter } from "vue-router";

const router = useRouter();

const selectArticle = () => {
  router.push({
    name: "article",
    params: { id: 2 },
  });
};
</script>

<style scoped>
#newsTitle {
  margin: 0;
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

.gridItem {
  width: 100%;
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
    margin: 1rem 0;
  }
}
</style>
