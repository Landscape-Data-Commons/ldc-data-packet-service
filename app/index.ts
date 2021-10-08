import { FtpServerOptions, FtpSrv } from "ftp-srv";

const hostname = '0.0.0.0';
const port = 5100
const srvOpts:FtpServerOptions={
  pasv_url:'ftp://' + hostname + ':' + port
}
const ftpServer = new FtpSrv(srvOpts);

ftpServer.on('login', (data, resolve, reject) => {
  console.log("hm")
});


ftpServer.listen()
.then(() => {
  console.log(`running at http://${hostname}:${port}`)
});