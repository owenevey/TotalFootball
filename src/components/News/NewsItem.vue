<template>
  <div class="newsContainer">
    <img :src="imageFile" />
    <div class="textContainer">
      <h3>{{ title }}</h3>
      <p>3 hrs ago</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  imageName: String,
});

import { ref, toRefs } from "vue";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const imageFile = ref(null);
const { imageName } = toRefs(props);

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
    Key: `news/${imageName.value}`,
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

  imageFile.value = dataUrl;
};

await fetchImage();
</script>

<style scoped>
.newsContainer {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
}

.newsContainer:hover {
  text-decoration-line: underline;
}

.newsContainer:hover img {
  opacity: 0.5;
}

.textContainer {
  padding: 0.5rem;
}

h3 {
  font-weight: 400;
  margin: 0rem;
}

p {
  color: gray;
  margin: 0rem;
  font-size: small;
}

img {
  object-fit: cover;
  width: 100%;
  height: 10rem;
}
</style>
