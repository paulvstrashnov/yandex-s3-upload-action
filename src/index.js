const core = require('@actions/core');
const EasyYandexS3 = require("easy-yandex-s3"); // https://github.com/powerdot/easy-yandex-s3

async function main() {
  // Get inputs from action.yml file
  try {
    const inputs = {
      accessKeyId: core.getInput("accessKeyId", { required: true }),
      secretAccessKey: core.getInput("secretAccessKey", { required: true }),
      bucket: core.getInput("bucket", { required: true }),
      localPath: core.getInput("localPath", { required: true }),  // Relative path to files/folder to upload. 
      remotePath: core.getInput("remotePath", { required: true }),  // Relative path to upoload to. 
      // clear: getBooleanFromString(core.getInput("clear", { required: false })),  // in case we'll need it in the future
    };
  } catch (error) {
    core.setFailed(error.message)
  }

  const s3 = new EasyYandexS3({
    auth: {
        // accessKeyId: inputs.accessKeyId,
        accessKeyId: core.getInput("accessKeyId", { required: true }),
        secretAccessKey: inputs.secretAccessKey,
    },
    Bucket: inputs.bucket, 
    debug: true // Дебаг в консоли, потом можете удалить в релизе
  });

    // Относительный путь:
  const upload = await s3.Upload({
    path: inputs.localPath,  // относительный путь до папки
    save_name: true // сохранять оригинальные названия файлов 
  }, inputs.remotePath);
  console.log(upload);    // <- массив загруженных файлов
  // console.log('It works!');
}

main();


