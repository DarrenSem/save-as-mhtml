{
  const selection = window.getSelection();
  if (selection && selection.rangeCount && selection.toString().trim().length > 1) {
    let range;
    if (selection.getRangeAt) {
      range = selection.getRangeAt(0);
    }
    else {
      range = document.createRange();
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
    }
    const doc = document.implementation.createHTMLDocument(document.title);

    const article = doc.body.appendChild(doc.createElement('article'));
    let start = range.startContainer;
    if (start.nodeType === Element.TEXT_NODE) {
      start = start.parentElement;
    }
    range.setStart(start, 0);
    let end = range.endContainer;
    if (end.nodeType === Element.TEXT_NODE) {
      end = end.parentElement;
    }
    range.setEnd(end, end.childNodes.length);
    article.appendChild(range.cloneContents());

    if (article.textContent.length > 20) {
      document.replaceChild(article, document.documentElement);
    }
    else {
      alert('Selected area is too small');
    }
  }
  else {
    alert('Selected area is too small');
  }
}
