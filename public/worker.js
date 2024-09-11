  onmessage = function (e) {
      // onmessage获取传入的初始值
      let sum = e.data;
      for (let i = 0; i < 200000; i++) {
        for (let i = 0; i < 10000; i++) {
          sum += 10
        }
      }
      // 将计算的结果传递出去
      postMessage(sum);
  }
  