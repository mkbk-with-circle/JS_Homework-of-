document.addEventListener('DOMContentLoaded', () => {
    const main_menu = [
        {
            name: '小吃系列',
            description: "一般50以下差不多",
            super_href: "小吃系列/snack.html",
        },
        {
            name: "中餐系列",
            description: "火锅、炒菜、烧烤等",
            super_href: "中餐系列/China_food.html",
        },
        {
            name: "洋餐系列",
            description: "披萨、日料等",
            super_href: "洋餐系列/foreign_food.html",
        },
        {
            name: "自助系列",
            description: "花了钱随便吃！",
            super_href: "自助系列/help_yourself.html",
        }
    ];

    const content = document.getElementById('content');

    main_menu.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';

        const foodName = document.createElement('h2');
        const foodLink = document.createElement('a');
        foodLink.textContent = food.name;
        foodLink.href = food.super_href;
        foodName.appendChild(foodLink);
        foodItem.appendChild(foodName);

        const foodDescription = document.createElement('p');
        foodDescription.textContent = food.description;
        foodItem.appendChild(foodDescription);
        // 为 foodItem 添加点击事件监听器
        foodItem.addEventListener('click', () => {
            window.location.href = food.super_href;
        });
        content.appendChild(foodItem);
    });

    // 创建并添加一个文本框到页面底部
    const textBox = document.createElement('textarea');
    textBox.placeholder = '在此输入您的评论,您的评论会被保存到当地缓存中，只要您不清除缓存记录就不会消失！';
    textBox.className = 'text-box';
    content.appendChild(textBox);
    textBox.rows = 4; // 设置文本框的行数
    textBox.cols = 50; // 设置文本框的列数

    // 创建一个容器来放置按钮
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    content.appendChild(buttonContainer);

    // 创建发送邮件按钮
    const button_save = document.createElement('button');
    button_save.textContent = '保存评论';
    button_save.className = 'button-save';
    buttonContainer.appendChild(button_save);
    
    // 给按钮添加点击事件监听器
    button_save.addEventListener('click', function() {
        saveText();
    });
    // 显示按钮
    button_save.classList.add('show');
    
    // 生成评论框
    generateCommentBox();
    // 初始加载显示已保存的评论
    displaySavedComments();
    // 创建删除的按钮
    const button_delete = document.createElement('button');
    button_delete.textContent= '删除所有评论';
    button_delete.className = 'button-delete';
    buttonContainer.appendChild(button_delete);
    button_delete.addEventListener('click',function(){
        delete_all_text();
    })
    button_delete.classList.add('show');

    
});

function delete_all_text(){
    // 清空 localStorage 中的评论数据
    localStorage.removeItem('comments');

    // 更新显示评论
    displaySavedComments();

    alert('所有评论已被清除！');
}

function generateCommentBox() {
    const commentBox = document.createElement('div');
    commentBox.className = 'comment-box';
    commentBox.id = 'commentBox';

    // 创建标题元素
    const title = document.createElement('h2');
    title.textContent = '评论区';
    title.style.textAlign = 'center'; // 设置标题居中

    // 将标题和 commentBox 依次添加到适当的父元素中
    document.body.appendChild(title);
    document.body.appendChild(commentBox);
}



function saveText() {
    const textBox = document.querySelector('.text-box');
    const emailContent = textBox.value;

    // 构造要保存的数据结构
    const comment = {
        timestamp: new Date().toISOString(),
        content: emailContent.trim() // 去除首尾空白字符
    };

    // 从 localStorage 中获取之前的评论，如果没有则创建一个空数组
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // 将新评论添加到数组中
    comments.push(comment);

    // 将评论数组保存到 localStorage 中
    localStorage.setItem('comments', JSON.stringify(comments));

    alert('评论已保存到本地！');

    // 清空文本框内容
    textBox.value = '';

    // 更新显示评论
    displaySavedComments();
}

function displaySavedComments() {
    const commentBox = document.getElementById('commentBox');
    commentBox.innerHTML = ''; // 清空之前的内容

    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        const timestampElement = document.createElement('p');

        // 将ISO时间字符串转换为Date对象
        const date = new Date(comment.timestamp);

        // 使用toLocaleString方法格式化时间为北京时间
        const options = { timeZone: 'Asia/Shanghai', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('zh-CN', options);

        timestampElement.textContent = formattedDate;
        timestampElement.style.fontWeight = 'bold';
        
        const contentElement = document.createElement('p');
        contentElement.textContent = comment.content;

        commentElement.appendChild(timestampElement);
        commentElement.appendChild(contentElement);
        commentBox.appendChild(commentElement);
    });
}
