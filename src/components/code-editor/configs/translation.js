export default {
  'zh-cn': {
    closeConfirm: {
      title: '已经被修改，是否保存？',
      content: '如果你在未保存修改的情况下关闭，将导致修改丢失。',
      buttons: ['不保存', '取消', '保存']
    },
    reloadConfirm: {
      title: '在外部被修改，是否重新加载？',
      content: '如果你选择加载外部修改，你当前做出的修改将丢失。',
      buttons: ['取消', '重新加载']
    },
    settings: {
      labels: {
        mode: '编辑模式',
        theme: '编辑器风格',
        indent: '缩进模式'
      },
      mode: {
        sublime: '默认',
        emacs: 'Emacs',
        vim: 'Vim'
      },
      theme: {
        dark: '深色风格',
        light: '浅色风格',
      },
      indent: {
        2: '2 个空格',
        4: '4 个空格',
        8: '8 个空格',
      }
    },
    hiddenLock: '这部分代码片段已被隐藏'
  },
  'en': {
    closeConfirm: {
      title: 'has changes, do you want to save them?',
      content: 'Your changes will be lost if you close this item without saving.',
      buttons: ['Don\'t save', 'Cancel', 'Save']
    },
    reloadConfirm: {
      title: 'has changed on disk. Do you want to reload it?',
      content: 'Your changes will be lost if you decide to reload the new version.',
      buttons: ['Cancel', 'Reload']
    },
    settings: {
      labels: {
        mode: 'Editor Mode',
        theme: 'Editor Theme',
        indent: 'Tab Spaces'
      },
      mode: {
        sublime: 'Normal',
        emacs: 'Emacs',
        vim: 'Vim'
      },
      theme: {
        dark: 'Dark',
        light: 'Light',
      },
      indent: {
        2: '2 spaces',
        4: '4 spaces',
        8: '8 spaces',
      }
    },
    hiddenLock: 'The code piece is hidden'
  }
};