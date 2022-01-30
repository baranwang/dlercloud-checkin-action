# DlerCloud Checkin Action

DlerCloud 自动签到 Action

## 使用方法

Github 创建一个仓库，[配置加密机密](https://docs.github.com/cn/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)，并添加一个 `.github/workflows/checkin.yml` 文件，内容如下：

```yaml
name: DlerCloud Checkin

on:
  schedule:
    - cron: '0 * * * *'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: DlerCloud Checkin Action
        uses: baranwang/dlercloud-checkin-action@v1.3.0
        with:
          email: ${{ secrets.DLERCLOUD_EMAIL }}
          password: ${{ secrets.DLERCLOUD_PASSWORD }}
```
