function extractTextBetweenThirdAndFourthBackticks(markdownContent) {
            // 使用正则表达式匹配第三个和第四个连续的反引号之间的字符串
            const regex = /```[^`]*```[^`]*```([^`]*)```/s; // 加了/s标志以匹配换行符
            const match = regex.exec(markdownContent);

            // 如果匹配成功，则返回第三个和第四个反引号之间的字符串
            if (match && match.length > 1) {
                const text = match[1].trim(); // 去除前后空白
                const lines = text.split('\n'); // 将文本按行分割
                const remainingLines = lines.slice(9); // 删除前9行
                return remainingLines.join('\n'); // 将剩余的行重新组合成文本
            } else {
                return "No match found";
            }
        }

        fetch('https://api.github.com/repos/tolinkshare/freenode/contents/README.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.content) {
                    const markdownContent = atob(data.content); // 解码Base64
                    const extractedText = extractTextBetweenThirdAndFourthBackticks(markdownContent); // 正则匹配节点信息
                    return extractedText;
                } else {
                    throw new Error('No content found in the response');
                }
            })
            .then(text => {
                // 将文本内容显示在页面上
                const outputElement = document.getElementById('output');
                outputElement.textContent = text;
            })
            .catch(error => console.error('Error fetching and processing README.md:', error));
