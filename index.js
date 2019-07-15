const config = require('./config/config');
const axios = require('axios');
const os = require('os');
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');
const errLogger = require('./config/log').getLogger('err');
const reqLogger = require('./config/log').getLogger('req');

const { server, corpId, deviceNo, deviceType, debug } = config
// console.log(config);

const createWindow = () => {
  let win = new BrowserWindow({
    width: 350,
    height: 600,
    title: '设备注册助手',
    backgroundColor: '#5094ff',
    center: true, // 窗口居中
    frame: false, // 是否有边框
    resizable: false, // 是否允许修改窗口大小
    hasShadow: true, // 是否显示阴影仅mac有效
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('./index.html');
  if(debug) {
    win.webContents.openDevTools(); // 是否打开devtools
  }
}


const get_host_ip_mac = () => {
  let add = os.networkInterfaces();
  for (var devName in add) {
    // console.log(devName);
    if(devName==='WLAN' || devName==='en0' || devName==='本地连接 3') {
      var iface = add[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          // console.log(alias.address, alias.mac);
          return {ip: alias.address, mac: alias.mac}
        }
      }
    }
  }
}

/**
 *
 * @param {*} deviceNick
 */
const register =  async deviceNick => {
  let deviceMac = get_host_ip_mac().mac;
	// console.log(deviceMac);
	let result = await axios.get(server, {
    params: {
      deviceType,
      deviceNick,
      deviceMac,
      // deviceNo,
      corpId
    }
  })
  .then(res => {
    // console.log(res);
    if(res.code == 200) {
      reqLogger.info(res)
      alert('注册成功！');
    }
  })
  .catch(err=>{
    errLogger.error(err)
    alert('注册失败！详见日志');
    console.log(err);
  })
	// console.log(result);
}
// register()

app.on('ready', createWindow)
// app.quit()

ipcMain.on('quit', (e, arg) => {
  app.quit()
})

function quit () {
  ipcRenderer.send('quit')
}
