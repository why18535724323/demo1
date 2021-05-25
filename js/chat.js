$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
        // 给发送按钮绑定点击事件
    $('#btnSend').on('click', function() {
        var text = $('#ipt').val().trim();
        // 如果用户输入的内容为空的话  清空输入框的内容
        if (text.length <= 0) {
            return $('#ipt').val('');
        }
        //将用户输入的内容发送到 对话框中
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
            // 重置一下滚动条
        resetui();
        // 并将内容清空
        $('#ipt').val('');

        // 发起请求获取聊天内容
        getMsg(text);
    })

    // 获取机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    // 接受聊天消息
                    var msg = res.data.info.text;
                    $('#talk_list').append(' <li class="left_word"> <img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    resetui();

                    // 调用  getVoice()  将文本咋转换为语音
                    getVoice(msg);
                }
            }
        })
    }

    // 把文本转换为语音
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                console.log(res);
                if (res.status === 200) {
                    // 播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }

    // 使用回车发送消息
    $('#ipt').on('keyup', function(e) {
        // console.log(e.keyCode); //回车键 为 13
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }

    })
})