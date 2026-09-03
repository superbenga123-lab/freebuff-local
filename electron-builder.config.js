module.exports = {
  appId: 'com.freebuff.local',
  productName: 'FREEBUFF',
  directories: {
    buildResources: 'assets',
    output: 'release'
  },
  files: [
    'electron-main.js',
    'electron-preload.js',
    'backend/src',
    'backend/package.json',
    'backend/node_modules',
    'frontend/dist',
    'models',
    'node_modules/electron-squirrel-startup'
  ],
  win: {
    target: [
      'nsis',
      'portable'
    ],
    artifactName: '${productName}-${version}.${ext}'
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'FREEBUFF'
  },
  portable: {
    artifactName: '${productName}-${version}-portable.${ext}'
  }
};
