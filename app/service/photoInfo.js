/*const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
class PhotoInfoService extends Service {

    async getBase64(filePath, dest) {
        let imgurl = path.dirname(__dirname) + dest + path.basename(filePath);   
        // 读取图片
        let imageData = fs.readFileSync(imgurl);
        // 将读取的图片转为base64
        let bufferData = Buffer.from(imageData).toString("base64");        
        return bufferData;
    }
    async base64(filePath, dest) {
        // 将临时图片存到upload中
        //获取要存取的路径
        let toPath = path.dirname(__dirname) + dest + path.basename(filePath);
        // 将临时路径中的图片拷贝到目标路径

        await fs.copyFileSync(filePath, toPath);
        // 删除临时图片
        fs.unlinkSync(filePath);
        console.log(toPath);

        // 读取图片
        let imageData = fs.readFileSync(toPath);
        // 将读取的图片转为base64
        let bufferData = Buffer.from(imageData).toString("base64");
        return bufferData;
    }

}

module.exports = PhotoInfoService */