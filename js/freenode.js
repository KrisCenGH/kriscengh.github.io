fetch('https://api.github.com/repos/tolinkshare/freenode/contents/README.md')
    .then(response => response.json())
    .then(data => {
        const markdownContent = atob(data.content); // 解码Base64编码的Markdown内容
        const extractedText = extractTextBetweenThirdAndFourthBackticks(markdownContent);
        const base64EncodedContent = btoa(unescape(encodeURIComponent(extractedText))); // 对 Markdown 内容进行 Base64 编码
        document.getElementById('content').innerText = base64EncodedContent; // 输出文本内容
    })
    .catch(error => console.error('Error fetching README.md:', error));

    function extractTextBetweenThirdAndFourthBackticks(markdownContent) {
        // 使用正则表达式匹配第三个和第四个连续的反引号之间的字符串
        const regex = /```[^`]*```[^`]*```([^`]*)```/;
        const match = regex.exec(markdownContent);
    
        // 如果匹配成功，则返回第三个和第四个反引号之间的字符串
        if (match && match.length > 1) {
            return match[1];
        } else {
            return "No match found";
        }
    }
