<template>
  <div class="newsContainer">
    <img class="newsItemImage" :src="imageFile" />
    <div class="textContainer">
      <h3 class="newsItemTitle">{{ title }}</h3>
      <p class="newsItemTimestamp">3 hrs ago</p>
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

const { imageName } = toRefs(props);
const imageFile = ref(null);

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

  const convertToImage = async (data) => {
    const readableStream = data.Body;
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

    const blob = new Blob([arrayBuffer], { type: data.ContentType });
    const dataUrl = URL.createObjectURL(blob);

    return dataUrl;
  };

  imageFile.value = await convertToImage(imageResponse);
};

await fetchImage();
</script>

<style scoped>
.newsContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  height: fit-content;
  width: 100%;
}

.newsContainer:hover .newsItemTitle {
  text-decoration-line: underline;
}

.newsContainer:hover .newsItemImage {
  background-color: #ffffff;
  opacity: 0.5;
}

.textContainer {
  padding: 0.5rem 0;
}

.newsItemTitle {
  font-weight: 400;
  margin: 0rem;
}

.newsItemTimestamp {
  color: gray;
  margin: 0rem;
  font-size: small;
}

.newsItemImage {
  object-fit: cover;
  width: 100%;
  height: 10rem;
  border-radius: 15px;
}
</style>
