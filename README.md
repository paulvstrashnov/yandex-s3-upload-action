# yandex-s3-upload-action

A simple Github Action for uploading files, e.g. a static website, to Yandex Cloud Object Storage.
Based on @actions/core and [easy Yandex.S3](https://github.com/powerdot/easy-yandex-s3).

### Requirements

- Yandex Cloud service account `Key ID` and `Secret key`
- Name of existing bucket

### Usage

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v3
    with:
      persist-credentials: false
  - name: Create dir and file
    run: |
      mkdir -p slides/
      echo "Test" > ./slides/file.txt
  - name: Deploy to Yandex Cloud Object Storage
    uses: paulvstrashnov/yandex-s3-upload-action@main
    with:
      accessKeyId: ${{ secrets.YC_ACCESS_KEY_ID }}
      secretAccessKey: ${{ secrets.YC_SECRET_ACCESS_KEY }}
      bucket: ${{ secrets.BUCKET }}
      localPath: "./slides"
      remotePath: "./slides"
      clear: false
```
