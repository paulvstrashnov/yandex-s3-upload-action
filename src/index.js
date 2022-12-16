import { getInput, getBooleanInput } from "@actions/core";
import EasyYandexS3 from "easy-yandex-s3"; // https://github.com/powerdot/easy-yandex-s3

async function main() {
  // Get inputs from action.yml file

  const inputs = {
    accessKeyId: getInput("accessKeyId", { required: true }),
    secretAccessKey: getInput("secretAccessKey", { required: true }),
    bucket: getInput("bucket", { required: true }),
    localPath: getInput("localPath", { required: true }), // Relative path to files/folder to upload.
    remotePath: getInput("remotePath", { required: true }), // Relative path to upoload to.
    clearBucket: getBooleanInput("clearBucket", { required: false }), //clear bucket
  };

  const s3 = new EasyYandexS3({
    auth: {
      accessKeyId: inputs.accessKeyId,
      secretAccessKey: inputs.secretAccessKey,
    },
    Bucket: inputs.bucket,
    debug: false, // Дебаг в консоли, потом можете удалить в релизе
  });

  if (inputs.clearBucket) {
    const result = await s3.CleanUp(inputs.remotePath);
    console.log("Clear bucket result: ", result); //<- резултат очистки бакета
  } else {
    console.log("Skip clear");
  }

  // Относительный путь:
  const upload = await s3.Upload(
    {
      path: inputs.localPath, // относительный путь до папки
      save_name: true, // сохранять оригинальные названия файлов
    },
    inputs.remotePath
  );
  console.log(upload); // <- массив загруженных файлов
  // console.log('It works!');
}

main();
