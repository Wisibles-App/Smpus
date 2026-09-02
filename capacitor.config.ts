import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wisibles.smpus',
  appName: 'SMPUS',
  webDir: 'build',
    plugins: {
    StatusBar: {
      style: 'dark',
      overlaysWebView: false ,
      bundledWebRuntime: false,
       // This will work with proper plugin installation
    },
    Keyboard: {
      resize: "none",   // 👈 prevents conten,t from being pushed
      resizeOnFullScreen: false,
      // adjustMarginsForEdgeToEdge: "force"
    }
  }

};

export default config;
