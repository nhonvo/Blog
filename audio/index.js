const https = require('https');
const fs = require('fs');

const audioList = [
    {
        fileName: "sheep.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece7c3b6dc0c1e61532347/1609361348764/01+sheep.mp3/original/01+sheep.mp3"
      },
      {
        fileName: "ship.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece7d80f96794605698a8c/1609361369965/02+ship.mp3/original/02+ship.mp3"
      },
      {
        fileName: "good.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece7ec10ee9f59220a149c/1609361389009/03+good.mp3/original/03+good.mp3"
      },
      {
        fileName: "shoot.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece80117af6f5d19d32e16/1609361410973/04+shoot.mp3/original/04+shoot.mp3"
      },
      {
        fileName: "bed.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece815a6a0ae63d683eab5/1609361430206/05+bed.mp3/original/05+bed.mp3"
      },
      {
        fileName: "teacher.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece82adac66e1e167201ed/1609361451658/06+teacher.mp3/original/06+teacher.mp3"
      },
      {
        fileName: "bird.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece83c89898a72c703ae58/1609361469900/07+bird.mp3/original/07+bird.mp3"
      },
      {
        fileName: "door.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece85c89898a72c703b2f7/1609361501586/08+door.mp3/original/08+door.mp3"
      },
      {
        fileName: "cat.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece886ac5ecf06b6bc7778/1609361543257/09+cat.mp3/original/09+cat.mp3"
      },
      {
        fileName: "up.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece897461d8d43a374cad7/1609361561332/10+up.mp3/original/10+up.mp3"
      },
      {
        fileName: "far.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece8b1289de731b355ae71/1609361586941/11+far.mp3/original/11+far.mp3"
      },
      {
        fileName: "on.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece8d1673a147fcc3bf8eb/1609361618818/12+on.mp3/original/12+on.mp3"
      },
      {
        fileName: "here.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece8ed673a147fcc3bfd4d/1609361646460/13+here.mp3/original/13+here.mp3"
      },
      {
        fileName: "wait.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece8ffefa5e06e3cb2ec1f/1609361665188/14+wait.mp3/original/14+wait.mp3"
      },
      {
        fileName: "tourist.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5feda52017af6f5d19e9f4ad/1609409826025/15b+tourist.mp3/original/15b+tourist.mp3"
      },
      {
        fileName: "boy.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece9728268c96dbbe3c3b7/1609361780286/16+boy.mp3/original/16+boy.mp3"
      },
      {
        fileName: "show.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece985673a147fcc3c2162/1609361799104/17+show.mp3/original/17+show.mp3"
      },
      {
        fileName: "hair.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece99c2547c5214a852490/1609361821488/18+hair.mp3/original/18+hair.mp3"
      },
      {
        fileName: "my.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece9b1fc8ee327ddacc271/1609361842531/19+my.mp3/original/19+my.mp3"
      },
      {
        fileName: "cow.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece9d018d44937a97a580f/1609361873592/20+cow.mp3/original/20+cow.mp3"
      },
      {
        fileName: "pea.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fece9f7ac5ecf06b6bcc9ec/1609361912798/21+pea.mp3/original/21+pea.mp3"
      },
      {
        fileName: "boat.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecea138268c96dbbe3e369/1609361940262/22+boat.mp3/original/22+boat.mp3"
      },
      {
        fileName: "tea.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecef812547c5214a865e91/1609363331501/23+tea.mp3/original/23+tea.mp3"
      },
      {
        fileName: "dog.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecefcda6a0ae63d6858140/1609363406443/24+dog.mp3/original/24+dog.mp3"
      },
      {
        fileName: "cheese.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecefe6289de731b357495a/1609363431589/25+cheese.mp3/original/25+cheese.mp3"
      },
      {
        fileName: "june.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5feceff6289de731b3574e5c/1609363447861/26+June.mp3/original/26+June.mp3"
      },
      {
        fileName: "car.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf0102fb5c129f2acd333/1609363473758/27+car.mp3/original/27+car.mp3"
      },
      {
        fileName: "go.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf02b232e037c66266f10/1609363500294/28+go.mp3/original/28+go.mp3"
      },
      {
        fileName: "fly.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf0500e058f15c9156755/1609363537853/29+fly.mp3/original/29+fly.mp3"
      },
      {
        fileName: "video.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf06417af6f5d19d4d02a/1609363557357/30+video.mp3/original/30+video.mp3"
      },
      {
        fileName: "think.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf091dac66e1e1673b1a8/1609363602417/31+think.mp3/original/31+think.mp3"
      },
      {
        fileName: "thisaud.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf0a7673a147fcc3d9c37/1609363624684/32+this.mp3/original/32+this.mp3"
      },
      {
        fileName: "see.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf0bfa6a0ae63d685b242/1609363649058/33+see.mp3/original/33+see.mp3"
      },
      {
        fileName: "zoo.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf0d617af6f5d19d4e6ea/1609363671001/34+zoo.mp3/original/34+zoo.mp3"
      },
      {
        fileName: "shall.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf12318d44937a97bc816/1609363748825/35+shall.mp3/original/35+shall.mp3"
      },
      {
        fileName: "television.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1532fb5c129f2ad0e1e/1609363796288/36+television.mp3/original/36+television.mp3"
      },
      {
        fileName: "man.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1688268c96dbbe530b8/1609363817290/37+man.mp3/original/37+man.mp3"
      },
      {
        fileName: "now.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf17d2547c5214a86d62d/1609363839374/38+now.mp3/original/38+now.mp3"
      },
      {
        fileName: "sing.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf19517af6f5d19d51b15/1609363862096/39+sing.mp3/original/39+sing.mp3"
      },
      {
        fileName: "hat.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1b20e058f15c915ae5b/1609363891936/40+hat.mp3/original/40+hat.mp3"
      },
      {
        fileName: "love.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1c52fb5c129f2ad1f3c/1609363911623/41+love.mp3/original/41+love.mp3"
      },
      {
        fileName: "red.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1eb634c4829a832804a/1609363948730/42+red.mp3/original/42+red.mp3"
      },
      {
        fileName: "wet.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf1ff89898a72c70593c9/1609363968457/43+wet.mp3/original/43+wet.mp3"
      },
      {
        fileName: "yes.mp3", 
        audioUrl: "https://static1.squarespace.com/static/5f57c8da5b4e905978984460/t/5fecf2102fb5c129f2ad2b22/1609363986068/44+yes.mp3/original/44+yes.mp3"
      },
];

function downloadAndRenameAudio(audioObj) {
  const file = fs.createWriteStream(audioObj.fileName);

  https.get(audioObj.audioUrl, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        console.log(`Downloaded and renamed ${audioObj.fileName}`);
      });
    });
  }).on('error', (err) => {
    fs.unlink(audioObj.fileName, () => {
      console.error(`Error downloading file (${audioObj.fileName}): ${err.message}`);
    });
  });
}

// Iterate through the list and initiate downloads
audioList.forEach(downloadAndRenameAudio);
