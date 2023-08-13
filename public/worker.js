function htmlToSlim(htmlinput) {
  // Replace <br> tags with Slim's '|' character
  let html = htmlin.replace(/<br>/g, "|");

  // Match opening and closing tags
  const tagRegex = /<(\/)?(\w+)([^>]*)>/g;

  // Match attribute names and values
  const attrRegex = /(\w+)=["']([^"']*)["']/g;

  // Use an array to keep track of the tag hierarchy
  const stack = [];
  let slim = "";

  // Process each tag in the HTML string
  let match;
  while (match = tagRegex.exec(html)) {
    const isClosing = match[1];
    const tagName = match[2];
    const attributes = match[3];

    // Add the tag to the stack if it's an opening tag
    if (!isClosing) {
      stack.push(tagName);
    }

    // Construct the Slim syntax for the tag
    const indent = "  ".repeat(stack.length - 1);
    const attrs = attributes ? " " + attributes.replace(attrRegex, (match, name, value) => ` ${name}=${value}`) : "";
    const tag = `${indent}${isClosing ? "/" : ""}${tagName}${attrs}`;

    // Add the Slim syntax to the output string
    if (isClosing) {
      stack.pop();
    }
    slim += `${tag}\n`;
  }

  return slim;
}

onmessage = (e) => {
  const { workerType } = e.data;
  if (workerType === 'say_hello') {
    const { name } = e.data;
    const responseData = `Hello ${name}`;
    postMessage({ responseData });
  } else if (workerType === 'html2slim') {
    const { html } = e.data;
    const responseData = htmlToSlim(html);
    postMessage({ responseData });
  }
};
