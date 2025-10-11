import GUTTERS from '../configs/gutters';

export default {
  methods: {
    getBreakpoints(index) {
      return this.files[index].doc.breakpoints;
    },

    hasBreakpoint(line, cm) {
      if (cm === undefined) {
        cm = this.$refs.codemirror.cminstance;
      }
      let gutterMarkers = cm.lineInfo(line).gutterMarkers;
      let hasBreakpoint = gutterMarkers !== null;
      if (gutterMarkers !== null) {
        if (!gutterMarkers[GUTTERS.BREAKPOINTS]) {
          hasBreakpoint = false;
        }
      }
      return hasBreakpoint;
    },

    setBreakpoint(cm, line) {
      let doc = cm.getDoc();
      if (doc.breakpoints === undefined) {
        doc.breakpoints = [];
      }
      if (this.hasBreakpointControl) {
        if (this.hasBreakpoint(line, cm)) {
          this.removeBreakpoint(doc, line);
        } else {
          this.addBreakpoint(doc, line);
        }
      }
    },

    addBreakpoint(doc, line) {
      let element = document.createElement('div');
      element.className = 'jsk-code-editor-breakpoint';
      element.innerHTML = '●';
      doc.setGutterMarker(line, GUTTERS.BREAKPOINTS, element);
      doc.breakpoints.push(line);
    },

    removeBreakpoint(doc, line) {
      doc.setGutterMarker(line, GUTTERS.BREAKPOINTS, null);
      doc.breakpoints = doc.breakpoints.filter(function(value) {
        return value !== line;
      });
    }
  }
};
