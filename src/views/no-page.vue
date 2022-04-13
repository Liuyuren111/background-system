<template>
    <div class="container">
        <div class="ibox">
            <div class="ibox-content bxShadow unOpen">
                <h1>此界面暂未开放，敬请期待！</h1>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.ibox {
    width: 100%;
    clear: both;
    margin-bottom: 2em;
    margin-top: 0;
    padding: 0;
    border: none;
    &:after,
    &::before {
        display: table;
    }
    .unOpen {
        height: calc(100vh - 600px);
        font-size: 24px;
        text-align: center;
    }
    .ibox-title {
        -moz-border-bottom-colors: none;
        -moz-border-left-colors: none;
        -moz-border-right-colors: none;
        -moz-border-top-colors: none;
        background-color: #ffffff;
        color: inherit;
        margin-bottom: 0;
        padding: .7em 2em;
        color: #090909;
        font-size: 1.2em;
        font-weight: 500;
        border-top-left-radius: .5em;
        border-top-right-radius: .5em;
    }
    .ibox-content {
        clear: both;
        background-color: #ffffff;
        color: inherit;
        padding: 3.5em;
        border-color: #eff1f7;
        border-image: none;
        border-style: solid solid none;
        border-width: 1px 0;
        border-bottom-left-radius: .5em;
        border-bottom-right-radius: .5em;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
        .wrapSmall {
            max-width: 70%;
        }
        .wrapFull {
            max-width: 100%;
        }
        .wrap {
            margin: 0 auto;
            overflow: hidden; // 蓝底提示信息
            .alert-info {
                background: rgba(66, 119, 207, .2);
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
                text-align: left;
                color: #4277cf;
                border: none;
                border-radius: 5px;
                padding: .8em 1.25em;
                i {
                    margin-right: .5em;
                }
            } // 表单区域
            .form_box {
                max-width: 100%;
                margin: 3em;
            }
        }
    }
}
</style>