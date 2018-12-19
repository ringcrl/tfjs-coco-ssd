# TF.js 图片物件识别

通过 tensorflow.js 的 [coco-ssd](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) 项目修改得到图片物件识别小 DEMO，支持自己添加本地图片进行识别，不涉及到训练库，只是纯前端项目，需要梯子拉取训练集。

![demo.png](https://qiniu.chenng.cn/2018-12-19-22-13-49.png)

# 线上体验

<https://static.chenng.cn/tfjs-coco-ssd/index.html>

# 本地调试

```sh
# 克隆项目
git clone https://github.com/ringcrl/tfjs-coco-ssd

# 本地运行调试
yarn && yarn watch

# 打包代码
yarn && yarn build
```
