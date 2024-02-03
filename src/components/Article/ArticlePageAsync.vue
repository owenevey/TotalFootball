<template>
  <main>
    <div id="articleContainer">
      <img id="articleImage" :src="imageFile" />
      <div id="articleBody">
        <h2 id="articleTitle">{{ articleTitle }}</h2>
        <p id="articleSubtext">
          Note: every article was written by AI and rigged to include a Peter
          Crouch last minute goal
        </p>
        <div v-for="paragraph in articleBody">
          <p class="articleText">{{ paragraph.S }}</p>
        </div>
      </div>
    </div>
  </main>
  <BottomNav />
</template>

<script setup>
import BottomNav from "../Navigation/BottomNav.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const route = useRoute();
const imageFile = ref(null);
const articleTitle = ref("");
const articleBody = ref("");

const fetchArticles = async () => {
  const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetItemCommand({
    TableName: "TotalFootball-News",
    Key: {
      id: { N: route.params.id },
    },
  });

  const response = await client.send(command);
  console.log(response.Item);
  articleTitle.value = response.Item.title.S;
  articleBody.value = response.Item.body.L;
};

const fetchImage = async () => {
  const s3_client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const s3_command = new GetObjectCommand({
    Bucket: "owenevey-totalfootball",
    Key: `news/${route.params.img}.jpg`,
  });


  const imageResponse = await s3_client.send(s3_command);

  const readableStream = imageResponse.Body;

  const buffer = [];
  const reader = readableStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer.push(value);
  }

  const arrayBuffer = new Uint8Array(
    buffer.reduce((acc, chunk) => [...acc, ...chunk], [])
  ).buffer;

  const blob = new Blob([arrayBuffer], { type: imageResponse.ContentType });

  const dataUrl = URL.createObjectURL(blob);
  console.log(dataUrl)

  imageFile.value = dataUrl;
};

await fetchImage();

await fetchArticles();
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
