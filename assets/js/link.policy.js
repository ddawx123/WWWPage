function linkmonitor() {
    alert('well');
    var linkbtn = document.getElementsByTagName("a");
    linkbtn.mousedown = function () {
        this.href = this.href + '#ref=' + escape(document.location);
    }
}