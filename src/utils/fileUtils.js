import axios from "axios";
const getFile = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url,
      responseType: "arraybuffer",
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};


const getBlob = ({ method = "GET", url }) => {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
  
      xhr.open(method, url, true);
      xhr.responseType = "blob";
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };
  
      xhr.send();
    });
  };
  
  const saveAs = (blob, filename) => {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      const body = document.querySelector("body");
  
      // 通过调用 URL.createObjectURL() 创建的 URL 对象
      link.href = window.URL.createObjectURL(blob); // 创建对象url
      link.download = filename;
  
      // fix Firefox
      link.style.display = "none";
      body.appendChild(link);
  
      link.click();
      body.removeChild(link);
  
      window.URL.revokeObjectURL(link.href); 
    }
  };
  
  // 下载
  export const download = (url, filename = "") => {
    getBlob({ url }).then((blob) => {
      saveAs(blob, filename);
    });
  };

  // 批量下载  需要安装jszip 和 file-saver
  export const batchDownload = () => {
    const urls = ["url", "url"]; //需要下载的路径
    const zip = new JSZip();
    const cache = {};
    const promises = [];
    urls.forEach((item) => {
      const promise = getBlob(item).then((data) => {
        // 下载文件, 并存成ArrayBuffer对象
        zip.file("下载文件名", data, { binary: true }); // 逐个添加文件
        cache[item.fileName] = data;
      });
      promises.push(promise);
    });
  
    Promise.all(promises).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        // 生成二进制流
        FileSaver.saveAs(content, `打包下载.zip`); // 利用file-saver保存文件
      });
    });
  };
  
  