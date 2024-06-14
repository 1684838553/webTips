[视频文档 B站](https://www.bilibili.com/video/BV1Wv411z7LG/?p=5&spm_id_from=pageDriver)

[学习笔记](https://blog.csdn.net/hancoder/article/details/120748968)

**git diff**

![image](https://github.com/1684838553/webTips/assets/41181666/ec96802e-2378-4b02-be61-48f2ddab91db)

**删除无用对象**

```
1. git -c gc.reflogExpire=0 -c gc.reflogExpireUnreachable=0 \
  -c gc.rerereresolved=0 -c gc.rerereunresolved=0 \
  -c gc.pruneExpire=now gc "$@"

2. git fsck

3. git prune
```

**git submodule**
![image](https://github.com/1684838553/webTips/assets/41181666/6c212d2a-5f2e-482f-a12f-1222664d2c58)

