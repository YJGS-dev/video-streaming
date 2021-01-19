const router=require('express').Router();
const fs=require('fs');

router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/video',(req,res)=>{
    const videoPath='./videos/video.mp4';
    const size=fs.statSync(videoPath).size;
    const range=req.headers.range.replace(/\D/g, "");
    const chunk=Number(process.env.CHUNK);
    const start=Number(range);
    const end=Math.min(start+chunk,size-1);
    const contentLength=end-start+1;
    const headers={
        'Content-Range':`bytes ${start}-${end}/${size}`,
        'Accept-Ranges':'bytes',
        'Content-type':'video/mp4',
        'Content-length':contentLength,
    }
    res.writeHead(206,headers);
    const rs=fs.createReadStream(videoPath,{start,end});
    rs.pipe(res);

});

module.exports=router;
