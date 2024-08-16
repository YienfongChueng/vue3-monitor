export function validateFile(file,accepts,size) {
    size = size || 1*1024*1024 // 1M = 1024KB, 1KB = 1024B
    accepts = accepts || ['.jpg','.jpeg','.bmp','.webp','.gif','.png']
    // 是否符合文件类型
    const name = file.name.toLowerCase()
    if(!accepts.some(ext => name.endsWith(ext))){
        ElNotification({
            type: 'warning',
            title: '提示',
            message: '文件类型不正确',
            duration: 1000,
        });
        return false
    }

    // 是否符合文件大小
    if(file.size > size) {
        ElNotification({
            type: 'warning',
            title: '提示',
            message: '文件尺寸过大',
            duration: 1000,
        });
        return false
    }
    return true
}

export function useCanvas(file) {
    const cvs = document.createElement('canvas')
    

}