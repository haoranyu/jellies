import CodeEditorTranslation from '../configs/translation';
import THEMES from '../configs/themes';
export default {
  methods: {
    ////////////////////////////////
    // Configuration Functions /////
    ////////////////////////////////
    setEditorMode(mode) {
      if (mode === 'vim') {
        this.editorOptions.vimMode = true;
      } else {
        this.editorOptions.vimMode = false;
      }
      this.editorOptions.keyMap = mode;
    },
    setEditorIndentSize(indentSize) {
      indentSize = parseInt(indentSize);
      this.editorOptions.tabSize = indentSize;
      this.editorOptions.indentUnit = indentSize;
    },
    setEditorFontSize(fontSize) {
      this.editorFontSizeOption = fontSize;
    },
    setEditorAutoIndent(autoIndent) {
      delete this.editorOptions.extraKeys['Enter']
      this.editorOptions.smartIndent = true
      switch (autoIndent) {
        case 'force':
          this.editorOptions.extraKeys['Enter'] = (cm) => {
            if (cm.doc.mode.name !== 'python') {
              cm.execCommand('indentAuto')
            }
            cm.replaceSelection('\n', 'end')
            cm.execCommand('indentAuto')
          }
          break;
        case 'smart':
          break;
        default:
          this.editorOptions.smartIndent = false
      }
    }
  },
  computed: {
    editorTheme() {
      if (this.settings.theme) {
        return THEMES[this.settings.theme.toUpperCase()].codemirror;
      }
      return THEMES.LIGHT.codemirror;
    },
    editorFontSize() {
      let fontSizeMapping = {
        small: '14px',
        normal: '16px', 
        large: '20px',
        'extra-large': '24px'
      };
      if (this.editorFontSizeOption) {
        return fontSizeMapping[this.editorFontSizeOption];
      }
      return fontSizeMapping['normal'];
    },
    settingsContent() {
      if (this.codeEditorSettingsContent !== undefined) {
        return this.codeEditorSettingsContent;
      }
      return CodeEditorTranslation[this.codeEditorLanguage].settings;
    }
  }
};
